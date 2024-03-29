import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRecord } from 'firebase-admin/auth'
import { Repository } from 'typeorm'

import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import { createSlug } from '../common/utils/create-slug'
import { PaginatedRestaurantsOutput } from '../restaurants/dtos'
import { Category } from './category.entity'
import { CategoryRequest } from './category.interface'
import {
  AdminCreateCategoryInput,
  AdminCreateCategoryOutput,
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  AllCategoriesOutput,
  PaginationCategoriesOutput,
} from './dtos'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getCategoryBySlug(slug: string) {
    return this.categoryRepo.findOne({ where: { slug } })
  }

  async getOrCreateCategory(request: CategoryRequest): Promise<Category> {
    const { name, coverImageUrl, iconUrl } = request
    const slug = createSlug(name)
    let category = await this.categoryRepo.findOneBy({ slug })
    if (!category) {
      const entity = this.categoryRepo.create({
        name,
        slug,
        coverImageUrl,
        iconUrl,
      })
      category = await this.categoryRepo.save(entity)
    }
    return category
  }

  getOrCreateCategories(requests: CategoryRequest[]): Promise<Category[]> {
    return Promise.all<Category>(
      requests.map(request => this.getOrCreateCategory(request)),
    )
  }

  async countRestaurantByEachCategoryId(
    categoryIds: number[],
  ): Promise<{ count: number; categoryId: number }[]> {
    if (categoryIds.length === 0) {
      return []
    }
    const result: { count: number; category_id: number }[] =
      await this.categoryRepo.query(
        `SELECT COUNT(*)::int, category_id
      FROM restaurant_categories
      WHERE category_id IN (${new Array(categoryIds.length)
        .fill(null)
        .map((_, index) => `$${index + 1}`)
        .join(', ')})
      GROUP BY category_id`,
        categoryIds,
      )

    // since postgres doesn't return the camel case key, we need to do our conversion
    return result.map(item => ({
      count: item.count,
      categoryId: item.category_id,
    }))
  }

  async countRestaurantsByCategory(category: Category): Promise<number> {
    const countProperty = 'restaurantCount'
    const entity = await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.id = :id', { id: category.id })
      .loadRelationCountAndMap(
        `category.${countProperty}`,
        'category.restaurants',
        'restaurant',
      )
      .cache(true)
      .getOne()
    return entity?.[countProperty] || 0
  }

  async findAllCategories(): Promise<AllCategoriesOutput> {
    const categories = await this.categoryRepo.find({
      order: { name: 'ASC' },
      cache: true,
    })
    return { ok: true, data: categories }
  }

  async findCategories(
    args: PaginationWithSearchArgs,
  ): Promise<PaginationCategoriesOutput> {
    const {
      pageOptions: { take, skip },
      searchQuery,
    } = args

    const queryBuilder = this.categoryRepo.createQueryBuilder('category')
    if (searchQuery) {
      queryBuilder.where(`category.name ILIKE :searchQuery`, { searchQuery })
    }

    const matchedCount = await queryBuilder.cache(true).getCount()
    const categories = await queryBuilder
      .orderBy('category.name', 'ASC')
      .skip(skip)
      .take(take) //
      .cache(true) //
      .getMany() //

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return { ...paginatedOutput, data: categories }
  }

  async deleteCategoryByAdmin(
    adminId: UserRecord['uid'],
    categoryId: number,
  ): Promise<CoreOutput> {
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) {
      return { ok: false, error: '[App] Category not found' }
    }
    existing.deletedBy = adminId
    const saved = await this.categoryRepo.save(existing)
    await this.categoryRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async createCategoryByAdmin(
    adminId: UserRecord['uid'],
    input: AdminCreateCategoryInput,
  ): Promise<AdminCreateCategoryOutput> {
    const [category] = await this.getOrCreateCategories([input])
    category.updatedBy = adminId

    // TODO: Make it just one insert query
    const saved = await this.categoryRepo.save(category)
    return { ok: true, category: saved }
  }

  async updateCategoryByAdmin(
    adminId: UserRecord['uid'],
    input: AdminUpdateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    const { categoryId, ...updatePayload } = input
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) {
      return { ok: false, error: '[App] Category not found' }
    }

    const slug = createSlug(updatePayload.name || existing.name)
    const category = Object.assign(existing, updatePayload)
    category.updatedBy = adminId
    category.slug = slug
    const saved = await this.categoryRepo.save(category)
    return { ok: true, category: saved }
  }
}

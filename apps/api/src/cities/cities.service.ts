import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRecord } from 'firebase-admin/auth'
import slugify from 'slugify'
import { Repository } from 'typeorm'

import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import { PaginatedRestaurantsOutput } from '../restaurants/dtos'
import { City } from './city.entity'
import { CityRequest } from './city.interface'
import {
  PaginationCitiesOutput,
  AdminCreateCityOutput,
  AdminCreateCityInput,
  AdminUpdateCityOutput,
  AllCitiesOutput,
  AdminUpdateCityInput,
} from './dtos'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  getCityBySlug(slug: string) {
    return this.cityRepo.findOne({ where: { slug } })
  }

  async getOrCreateCity(request: CityRequest): Promise<City> {
    const { name, nameInKhmer } = request
    const slug = slugify(name, { lower: true })
    let city = await this.cityRepo.findOneBy({ slug })
    if (!city) {
      const entity = this.cityRepo.create({ name, slug, nameInKhmer })
      city = await this.cityRepo.save(entity)
    }
    return city
  }

  getOrCreateCities(requests: CityRequest[]): Promise<City[]> {
    return Promise.all<City>(
      requests.map(request => this.getOrCreateCity(request)),
    )
  }

  async countRestaurantsByCity(city: City): Promise<number> {
    const entity = await this.cityRepo //
      .createQueryBuilder('city')
      .where('city.id = :id', { id: city.id })
      .loadRelationCountAndMap(
        'city.restaurantCount',
        'city.restaurants',
        'restaurant',
      )
      .cache(true)
      .getOne()
    return entity?.restaurantCount as number
  }

  async findAllCities(): Promise<AllCitiesOutput> {
    const cities = await this.cityRepo.find({
      order: { name: 'ASC' },
      relations: { location: true },
      cache: true,
    })
    return { ok: true, data: cities }
  }

  async findCities(
    args: PaginationWithSearchArgs,
  ): Promise<PaginationCitiesOutput> {
    const {
      pageOptions: { take, skip },
      searchQuery,
    } = args

    const queryBuilder = this.cityRepo.createQueryBuilder('city')
    if (searchQuery) {
      queryBuilder
        .where(
          `
            city.name ILIKE :searchQuery
            OR
            city.nameInKhmer ILIKE :searchQuery
    `,
          { searchQuery },
        )
        .leftJoinAndSelect('city.location', 'location')
    }

    const matchedCount = await queryBuilder.cache(true).getCount()
    const cities = await queryBuilder
      .orderBy('city.name', 'ASC')
      .skip(skip)
      .take(take) //
      .cache(true)
      .getMany() //

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return { ...paginatedOutput, data: cities }
  }

  async deleteCityByAdmin(
    adminId: UserRecord['uid'],
    cityId: number,
  ): Promise<CoreOutput> {
    const existing = await this.cityRepo.findOneBy({ id: cityId })
    if (!existing) {
      return { ok: false, error: '[App] City not found' }
    }
    existing.deletedBy = adminId
    const saved = await this.cityRepo.save(existing)
    await this.cityRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async createCityByAdmin(
    adminId: UserRecord['uid'],
    input: AdminCreateCityInput,
  ): Promise<AdminCreateCityOutput> {
    const [city] = await this.getOrCreateCities([input])
    city.updatedBy = adminId

    // TODO: Make it just one insert query
    const saved = await this.cityRepo.save(city)
    return { ok: true, city: saved }
  }

  async updateCityByAdmin(
    adminId: UserRecord['uid'],
    input: AdminUpdateCityInput,
  ): Promise<AdminUpdateCityOutput> {
    const { cityId, ...updatePayload } = input
    const existing = await this.cityRepo.findOneBy({ id: cityId })
    if (!existing) {
      return { ok: false, error: '[App] City not found' }
    }

    const slug = slugify(updatePayload.name || existing.name, { lower: true })
    const city = Object.assign(existing, updatePayload)
    city.updatedBy = adminId
    city.slug = slug
    const saved = await this.cityRepo.save(city)
    return { ok: true, city: saved }
  }
}

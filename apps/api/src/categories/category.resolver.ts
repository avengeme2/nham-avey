import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'
import { GraphQLResolveInfo } from 'graphql/index'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from '../common/utils/parse-graphql-resolve-info'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { RestaurantService } from '../restaurants/restaurant.service'
import { UserRole } from '../users/entities/user.entity'
import { Category } from './category.entity'
import { CategoryLoader } from './category.loader'
import { CategoryService } from './category.service'
import {
  AdminCreateCategoryInput,
  AdminCreateCategoryOutput,
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  AllCategoriesOutput,
  PaginationCategoriesOutput,
} from './dtos'

@Resolver(of => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly restaurantService: RestaurantService,
    private readonly categoryLoader: CategoryLoader,
  ) {}

  @ResolveField(returns => Int)
  async restaurantCount(@Parent() category: Category): Promise<number> {
    const count =
      await this.categoryLoader.countRestaurantByEachCategoryId.load(
        category.id,
      )
    return count || 0
  }

  @Query(returns => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.categoryService.findAllCategories()
  }

  @ResolveField(returns => [Restaurant])
  restaurants(
    @Parent() category: Category,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Restaurant[] | []> {
    const parsedInfo = parseResolveInfo(info) as ResolveTree
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType,
    )
    const restaurantFields = simplifiedInfo.fields

    const neededJoinedColumns: string[] = []

    const allOptionalJoinColumns = [
      'coverImages',
      'reviews',
      'categories',
      'vendors',
      'orders',
      'menu',
    ]
    allOptionalJoinColumns.forEach(column => {
      if (column in restaurantFields) {
        neededJoinedColumns.push(column)
      }
    })
    return this.restaurantService.findAllByCategoryIds(
      [category.id],
      neededJoinedColumns,
    )
  }

  @Query(returns => PaginationCategoriesOutput)
  categories(
    @Args() args: PaginationWithSearchArgs,
  ): Promise<PaginationCategoriesOutput> {
    return this.categoryService.findCategories(args)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.categoryService.deleteCategoryByAdmin(
      decodedIdToken.uid,
      arg.id,
    )
  }

  @Mutation(returns => AdminCreateCategoryOutput)
  @Roles(UserRole.Admin)
  adminCreateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: AdminCreateCategoryInput,
  ): Promise<AdminCreateCategoryOutput> {
    return this.categoryService.createCategoryByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(returns => AdminUpdateCategoryOutput)
  @Roles(UserRole.Admin)
  adminUpdateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: AdminUpdateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    return this.categoryService.updateCategoryByAdmin(decodedIdToken.uid, input)
  }
}

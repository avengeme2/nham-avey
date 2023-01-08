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
import { RESTAURANT_OPTIONAL_JOIN_COLUMNS } from '../restaurants/restaurant.utils'
import { User, UserRole } from '../users/entities/user.entity'
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

    RESTAURANT_OPTIONAL_JOIN_COLUMNS.forEach(column => {
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
    @GraphqlAuthUser() authUser: User,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.categoryService.deleteCategoryByAdmin(authUser.id, arg.id)
  }

  @Mutation(returns => AdminCreateCategoryOutput)
  @Roles(UserRole.Admin)
  adminCreateCategory(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: AdminCreateCategoryInput,
  ): Promise<AdminCreateCategoryOutput> {
    return this.categoryService.createCategoryByAdmin(authUser.id, input)
  }

  @Mutation(returns => AdminUpdateCategoryOutput)
  @Roles(UserRole.Admin)
  adminUpdateCategory(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: AdminUpdateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    return this.categoryService.updateCategoryByAdmin(authUser.id, input)
  }
}

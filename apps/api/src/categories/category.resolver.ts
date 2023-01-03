import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
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

  // TODO: use conditional join instead
  // @ResolveField(returns => [Restaurant])
  restaurants(@Parent() category: Category): Promise<Restaurant[] | []> {
    return this.restaurantService.findAllByCategoryIds([category.id])
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

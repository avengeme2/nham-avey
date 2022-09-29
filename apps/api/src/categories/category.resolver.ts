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
import { UserRole } from '../users/entities/user.entity'
import { CategoryService } from './categories.service'
import { Category } from './category.entity'
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
  constructor(private readonly categoryService: CategoryService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.categoryService.countRestaurantsByCategory(category)
  }

  @Query(returns => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.categoryService.findAllCategories()
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

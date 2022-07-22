import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  DeleteCategoryArgs,
  DeleteCategoryOutput,
  PaginationCategoriesArgs,
  PaginationCategoriesOutput,
} from "src/restaurants/dtos"
import { AdminCreateCategoryInput, AdminCreateCategoryOutput } from "src/restaurants/dtos/admin-create-category.dto"
import {
  AllCategoriesOutput,
  PaginatedCategoryRestaurantOutput,
  PaginationCategoryRestaurantArgs,
} from "src/restaurants/dtos/categories.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurantsByCategory(category)
  }

  @Query(returns => AllCategoriesOutput)
  getAllCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.getAllCategories()
  }

  @Query(returns => PaginationCategoriesOutput)
  getCategories(@Args() args: PaginationCategoriesArgs): Promise<PaginationCategoriesOutput> {
    return this.restaurantService.getCategories(args)
  }

  @Query(returns => PaginatedCategoryRestaurantOutput)
  getRestaurantsByCategorySlug(@Args() args: PaginationCategoryRestaurantArgs): Promise<PaginatedCategoryRestaurantOutput> {
    return this.restaurantService.findRestaurantsByCategorySlug(args)
  }

  @Mutation(returns => DeleteCategoryOutput)
  @Roles(UserRole.Admin)
  adminDeleteCategory(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: DeleteCategoryArgs): Promise<DeleteCategoryOutput> {
    return this.restaurantService.deleteCategoryByAdmin(decodedIdToken.uid, args)
  }
  @Mutation(returns => AdminCreateCategoryOutput)
  @Roles(UserRole.Admin)
  adminCreateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminCreateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    return this.restaurantService.createCategoryByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(returns => AdminUpdateCategoryOutput)
  @Roles(UserRole.Admin)
  adminUpdateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    return this.restaurantService.updateCategoryByAdmin(decodedIdToken.uid, input)
  }
}

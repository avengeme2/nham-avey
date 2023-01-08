import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { User, UserRole } from '../users/entities/user.entity'
import { DishService } from './dish.service'
import { DishOutput, CreateDishInput, UpdateDishInput } from './dto'

@Resolver()
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Mutation(() => DishOutput)
  @Roles(UserRole.Vendor)
  vendorCreateDish(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: CreateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.createDishByVendor(authUser.id, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Admin)
  adminCreateDish(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: CreateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.createDishByAdmin(authUser.id, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateDish(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: UpdateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.updateDishByVendor(authUser.id, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Admin)
  adminUpdateDish(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: UpdateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.updateDishByAdmin(authUser.id, input)
  }

  @Mutation(() => CoreOutput)
  @Roles(UserRole.Vendor)
  vendorDeleteDish(
    @GraphqlAuthUser() authUser: User,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.dishService.deleteDishByVendor(authUser.id, arg.id)
  }

  @Mutation(() => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteDish(
    @GraphqlAuthUser() authUser: User,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.dishService.deleteDishByAdmin(authUser.id, arg.id)
  }
}

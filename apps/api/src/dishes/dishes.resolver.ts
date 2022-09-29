import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { UserRole } from '../users/entities/user.entity'
import { DishService } from './dishes.service'
import { DishOutput, CreateDishInput, UpdateDishInput } from './dto'

@Resolver()
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Mutation(() => DishOutput)
  @Roles(UserRole.Vendor)
  vendorCreateDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: CreateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.createDishByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Admin)
  adminCreateDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: CreateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.createDishByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: UpdateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.updateDishByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => DishOutput)
  @Roles(UserRole.Admin)
  adminUpdateDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: UpdateDishInput,
  ): Promise<DishOutput> {
    return this.dishService.updateDishByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(() => CoreOutput)
  @Roles(UserRole.Vendor)
  vendorDeleteDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.dishService.deleteDishByVendor(decodedIdToken.uid, arg.id)
  }

  @Mutation(() => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.dishService.deleteDishByAdmin(decodedIdToken.uid, arg.id)
  }
}

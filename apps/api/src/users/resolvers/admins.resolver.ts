import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Roles } from '../../auth/role.decorator'
import { UserRole } from '../entities/user.entity'
import {
  AdminUpdateUserInput,
  AdminUpdateUserOutput,
  CreateAccountInput,
  CreateAccountOutput,
  DeleteAccountOutput,
  PaginatedUsersOutput,
  PaginationUserArgs,
  UserArgs,
} from '../users.dto'
import { UserService } from '../users.service'

@Resolver()
export class AdminResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(returns => CreateAccountOutput)
  adminCreateAdmin(
    @Args('input') input: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAdmin(input)
  }

  @Roles(UserRole.Admin)
  @Mutation(returns => DeleteAccountOutput)
  adminDeleteUser(@Args() { userId }: UserArgs): Promise<DeleteAccountOutput> {
    return this.userService.deleteUser(userId)
  }

  @Roles(UserRole.Admin)
  @Mutation(returns => AdminUpdateUserOutput)
  adminUpdateUser(
    @Args('input') input: AdminUpdateUserInput,
  ): Promise<AdminUpdateUserOutput> {
    return this.userService.updateUserByAdmin(input)
  }

  @Query(returns => PaginatedUsersOutput)
  @Roles(UserRole.Admin)
  adminGetUsers(
    @Args() args: PaginationUserArgs,
  ): Promise<PaginatedUsersOutput> {
    return this.userService.getUsersByAdmin(args)
  }
}

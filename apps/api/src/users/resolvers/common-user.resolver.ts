import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'

import { GraphqlAuthGuard } from '../../auth/graphql-auth-guard.service'
import { GraphqlAuthUser } from '../../auth/graphql-auth-user.decorator'
import { AnyRoles } from '../../auth/role.decorator'
import { User } from '../entities/user.entity'
import { UpdateProfileInput, UpdateProfileOutput } from '../user.dto'
import { UserService } from '../user.service'

@Resolver()
export class CommonUserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  @UseGuards(GraphqlAuthGuard)
  @AnyRoles()
  me(@GraphqlAuthUser() authUser: DecodedIdToken): Promise<User | null> {
    return this.userService.findUserById(authUser.uid)
  }

  @AnyRoles()
  @Mutation(returns => UpdateProfileOutput)
  updateMe(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    return this.userService.updateProfile(authUser.id, input)
  }
}

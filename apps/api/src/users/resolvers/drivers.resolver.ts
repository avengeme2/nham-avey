import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { SignUpAccountInput, SignUpAccountOutput } from '../users.dto'
import { UserService } from '../users.service'

@Resolver()
export class DriverResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  driverSignUp(
    @Args('input') input: SignUpAccountInput,
  ): Promise<SignUpAccountOutput> {
    return this.userService.signUpDriver(input)
  }
}

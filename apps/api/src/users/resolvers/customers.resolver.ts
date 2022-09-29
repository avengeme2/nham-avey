import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { SignUpAccountInput, SignUpAccountOutput } from '../users.dto'
import { UserService } from '../users.service'

@Resolver()
export class CustomerResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  customerSignUp(
    @Args('input') input: SignUpAccountInput,
  ): Promise<SignUpAccountOutput> {
    return this.userService.signUpCustomer(input)
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { SignUpAccountInput, SignUpAccountOutput } from '../user.dto'
import { UserService } from '../user.service'

@Resolver()
export class VendorResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  vendorSignUp(
    @Args('input') input: SignUpAccountInput,
  ): Promise<SignUpAccountOutput> {
    return this.userService.signUpVendor(input)
  }
}

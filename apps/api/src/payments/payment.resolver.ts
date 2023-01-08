import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { User, UserRole } from '../users/entities/user.entity'
import {
  CreatePaymentInput,
  CreatePaymentOutput,
  GetPaymentsOutput,
} from './payment.dto'
import { Payment } from './payment.entity'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Roles(UserRole.Vendor)
  createPayment(
    @GraphqlAuthUser() authUser: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(authUser.id, createPaymentInput)
  }

  @Query(() => GetPaymentsOutput)
  @Roles(UserRole.Vendor)
  getPayments(@GraphqlAuthUser() authUser: User): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(authUser.id)
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { UserRole } from '../users/entities/user.entity'
import { Payment } from './payment.entity'
import {
  CreatePaymentInput,
  CreatePaymentOutput,
  GetPaymentsOutput,
} from './payments.dto'
import { PaymentService } from './payments.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Roles(UserRole.Vendor)
  createPayment(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(
      decodedIdToken.uid,
      createPaymentInput,
    )
  }

  @Query(() => GetPaymentsOutput)
  @Roles(UserRole.Vendor)
  getPayments(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
  ): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(decodedIdToken.uid)
  }
}

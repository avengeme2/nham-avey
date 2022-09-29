import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'
import { PubSub } from 'graphql-subscriptions'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDER,
  PUB_SUB,
} from '../common/constants/common.constants'
import { User, UserRole } from '../users/entities/user.entity'
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto'
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto'
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto'
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto'
import { OrderUpdatesInput } from './dtos/order-updates.dto'
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto'
import { Order } from './entities/order.entity'
import { OrderService } from './orders.service'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly ordersService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => CreateOrderOutput)
  @Roles(UserRole.Customer)
  createOrder(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(decodedIdToken.uid, createOrderInput)
  }

  @Query(() => GetOrdersOutput)
  @Roles(UserRole.Customer, UserRole.Admin, UserRole.Vendor, UserRole.Driver)
  getOrders(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(decodedIdToken.uid, getOrdersInput)
  }

  @Query(() => GetOrderOutput)
  getOrder(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(decodedIdToken.uid, getOrderInput)
  }

  @Mutation(() => EditOrderOutput)
  updateOrder(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.ordersService.updateOrder(decodedIdToken.uid, editOrderInput)
  }

  @Subscription(() => Order, {
    filter: ({ pendingOrders: { vendorId } }, _, { user }) => {
      return vendorId === user.id
    },
    resolve: ({ pendingOrders: { order } }) => {
      return order
    },
  })
  @Roles(UserRole.Vendor)
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER)
  }

  @Subscription(() => Order)
  @Roles(UserRole.Driver)
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER)
  }

  @Subscription(() => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput },
      { user }: { user: User },
    ) => {
      if (
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        !order.restaurant?.vendorIds?.includes(user.id)
      ) {
        return false
      }
      return order.id === input.id
    },
  })
  orderUpdates(@Args('input') _orderUpdatesInput: OrderUpdatesInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE)
  }

  @Mutation(() => TakeOrderOutput)
  @Roles(UserRole.Driver)
  takeOrder(
    @GraphqlAuthUser() driver: User,
    @Args('input') takeOrderInput: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    return this.ordersService.takeOrder(driver, takeOrderInput)
  }
}

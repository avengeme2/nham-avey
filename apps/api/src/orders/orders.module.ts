import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Dish } from '../dishes/dish.entity'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { UsersModule } from '../users/users.module'
import { OrderItem } from './entities/order-item.entity'
import { Order } from './entities/order.entity'
import { OrderResolver } from './orders.resolver'
import { OrderService } from './orders.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish]),
    UsersModule,
  ],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}

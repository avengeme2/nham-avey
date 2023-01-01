import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Dish } from '../dishes/dish.entity'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { UserModule } from '../users/user.module'
import { OrderItem } from './entities/order-item.entity'
import { Order } from './entities/order.entity'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish]),
    UserModule,
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}

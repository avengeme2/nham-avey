import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { Dish } from './dish.entity'
import { DishResolver } from './dish.resolver'
import { DishService } from './dish.service'

@Module({
  imports: [TypeOrmModule.forFeature([Dish, Restaurant])],
  providers: [DishService, DishResolver],
})
export class DishModule {}

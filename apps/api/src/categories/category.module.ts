import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RestaurantModule } from '../restaurants/restaurant.module'
import { Category } from './category.entity'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), RestaurantModule],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}

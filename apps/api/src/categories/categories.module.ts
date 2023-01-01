import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RestaurantsModule } from '../restaurants/restaurants.module'
import { CategoryService } from './categories.service'
import { Category } from './category.entity'
import { CategoryResolver } from './category.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), RestaurantsModule],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}

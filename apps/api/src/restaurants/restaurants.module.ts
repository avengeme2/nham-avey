import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from '../categories/categories.module'
import { CityModule } from '../cities/cities.module'
import { ImagesModule } from '../images/images.module'
import { UsersModule } from '../users/users.module'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantResolver } from './restaurants.resolver'
import { RestaurantService } from './restaurants.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    UsersModule,
    CategoryModule,
    CityModule,
    ImagesModule,
  ],
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantsModule {}

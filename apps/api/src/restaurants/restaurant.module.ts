import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from '../categories/category.module'
import { CityModule } from '../cities/city.module'
import { GeoLocationModule } from '../geo-locations/geo-location.module'
import { ImageModule } from '../images/image.module'
import { UserModule } from '../users/user.module'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantResolver } from './restaurant.resolver'
import { RestaurantService } from './restaurant.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    UserModule,
    forwardRef(() => CategoryModule),
    GeoLocationModule,
    CityModule,
    ImageModule,
  ],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
})
export class RestaurantModule {}

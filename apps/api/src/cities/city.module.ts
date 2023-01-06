import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GeoLocation } from '../geo-locations/geo-location.entity'
import { GeoLocationModule } from '../geo-locations/geo-location.module'
import { City } from './city.entity'
import { CityLoader } from './city.loader'
import { CityResolver } from './city.resolver'
import { CityService } from './city.service'

@Module({
  imports: [TypeOrmModule.forFeature([City, GeoLocation]), GeoLocationModule],
  providers: [CityService, CityResolver, CityLoader],
  exports: [CityService, CityLoader],
})
export class CityModule {}

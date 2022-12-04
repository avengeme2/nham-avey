import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Location } from '../locations/location.entity'
import { CityResolver } from './cities.resolver'
import { CityService } from './cities.service'
import { City } from './city.entity'

@Module({
  imports: [TypeOrmModule.forFeature([City, Location])],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule {}

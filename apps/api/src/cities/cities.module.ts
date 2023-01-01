import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Location } from '../locations/location.entity'
import { LocationModule } from '../locations/locations.module'
import { CitiesLoaders } from './cities.loaders'
import { CityResolver } from './cities.resolver'
import { CityService } from './cities.service'
import { City } from './city.entity'

@Module({
  imports: [TypeOrmModule.forFeature([City, Location]), LocationModule],
  providers: [CityService, CityResolver, CitiesLoaders],
  exports: [CityService],
})
export class CityModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Location } from '../locations/location.entity'
import { LocationModule } from '../locations/location.module'
import { City } from './city.entity'
import { CityLoader } from './city.loader'
import { CityResolver } from './city.resolver'
import { CityService } from './city.service'

@Module({
  imports: [TypeOrmModule.forFeature([City, Location]), LocationModule],
  providers: [CityService, CityResolver, CityLoader],
  exports: [CityService],
})
export class CityModule {}

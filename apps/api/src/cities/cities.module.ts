import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CityResolver } from './cities.resolver'
import { CityService } from './cities.service'
import { City } from './city.entity'

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule {}

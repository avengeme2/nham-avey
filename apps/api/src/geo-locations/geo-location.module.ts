import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GeoLocation } from './geo-location.entity'
import { GeoLocationService } from './geo-location.service'

@Module({
  imports: [TypeOrmModule.forFeature([GeoLocation])],
  providers: [GeoLocationService],
  exports: [GeoLocationService],
})
export class GeoLocationModule {}

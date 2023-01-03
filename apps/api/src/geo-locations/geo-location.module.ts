import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GeoLocation } from './geo-location.entity'
import { GeoLocationLoader } from './geo-location.loader'
import { GeoLocationService } from './geo-location.service'

@Module({
  imports: [TypeOrmModule.forFeature([GeoLocation])],
  providers: [GeoLocationService, GeoLocationLoader],
  exports: [GeoLocationService, GeoLocationLoader],
})
export class GeoLocationModule {}

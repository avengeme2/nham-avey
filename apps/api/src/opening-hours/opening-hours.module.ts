import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OpeningHours } from './opening-hours.entity'
import { OpeningHoursLoader } from './opening-hours.loader'
import { OpeningHoursResolver } from './opening-hours.resolver'
import { OpeningHoursService } from './opening-hours.service'

@Module({
  imports: [TypeOrmModule.forFeature([OpeningHours])],
  providers: [OpeningHoursResolver, OpeningHoursService, OpeningHoursLoader],
  exports: [OpeningHoursLoader],
})
export class OpeningHoursModule {}

import { Resolver } from '@nestjs/graphql'

import { OpeningHours } from './opening-hours.entity'

@Resolver(of => OpeningHours)
export class OpeningHoursResolver {}

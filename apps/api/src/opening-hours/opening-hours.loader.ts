import { Injectable, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'

import { OpeningHoursService } from './opening-hours.service'

@Injectable({ scope: Scope.REQUEST })
export class OpeningHoursLoader {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  readonly findAllOpeningHoursByIds = new DataLoader(
    async (openingHourIds: readonly number[]) => {
      const openingHours = await this.openingHoursService.findAllByIds(
        openingHourIds as number[],
      )

      const resultMap = new Map(openingHours.map(result => [result.id, result]))
      return openingHourIds.map(openingHoursId => resultMap.get(openingHoursId))
    },
  )
}

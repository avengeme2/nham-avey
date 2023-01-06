import { Injectable, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'

import { CityService } from './city.service'

@Injectable({ scope: Scope.REQUEST })
export class CityLoader {
  constructor(private readonly cityService: CityService) {}

  readonly findCitiesAllByIds = new DataLoader(
    async (cityIds: readonly number[]) => {
      const cities = await this.cityService.findAllByIds(cityIds as number[])

      const resultMap = new Map(cities.map(result => [result.id, result]))
      return cityIds.map(cityId => resultMap.get(cityId))
    },
  )
}

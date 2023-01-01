import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

import { LocationsService } from '../locations/locations.service'

@Injectable()
export class CitiesLoaders {
  constructor(private readonly locationService: LocationsService) {}

  createLocationsLoader() {
    return new DataLoader(async (locationIds: readonly number[]) => {
      const locations = await this.locationService.findAllLocationsByIds(
        locationIds,
      )

      const locationsMap = new Map(
        locations.map(location => [location.id, location]),
      )
      return locationIds.map(authorId => locationsMap.get(authorId))
    })
  }
}

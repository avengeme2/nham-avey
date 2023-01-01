import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

import { LocationService } from '../locations/location.service'

@Injectable()
export class CityLoader {
  constructor(private readonly locationService: LocationService) {}

  createLocationsLoader() {
    return new DataLoader(async (locationIds: readonly number[]) => {
      const locations = await this.locationService.findAllLocationsByIds(
        locationIds,
      )

      const locationsMap = new Map(
        locations.map(location => [location.id, location]),
      )
      return locationIds.map(locationId => locationsMap.get(locationId))
    })
  }
}

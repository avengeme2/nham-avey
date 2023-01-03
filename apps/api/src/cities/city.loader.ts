import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

import { GeoLocation } from '../geo-locations/geo-location.entity'
import { GeoLocationService } from '../geo-locations/geo-location.service'

@Injectable()
export class CityLoader {
  constructor(private readonly geoLocationService: GeoLocationService) {}

  readonly findAllLocationsByIds = new DataLoader<number, GeoLocation>(
    async (locationIds: readonly number[]) => {
      const locations = await this.geoLocationService.findAllLocationsByIds(
        locationIds,
      )

      const locationsMap = new Map(
        locations.map(location => [location.id, location]),
      )
      return locationIds.map(
        locationId => locationsMap.get(locationId) as GeoLocation,
      )
    },
  )
}

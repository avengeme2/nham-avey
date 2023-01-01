import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import { GeoLocation } from '../geo-locations/geo-location.entity'
import { GeoLocationService } from '../geo-locations/geo-location.service'
import { UserRole } from '../users/entities/user.entity'
import { City } from './city.entity'
import { CityLoader } from './city.loader'
import { CityService } from './city.service'
import {
  PaginationCitiesOutput,
  AdminCreateCityOutput,
  AdminCreateCityInput,
  AdminUpdateCityOutput,
  AllCitiesOutput,
  AdminUpdateCityInput,
} from './dtos'

@Resolver(of => City)
export class CityResolver {
  constructor(
    private readonly cityService: CityService,
    private readonly geoLocationService: GeoLocationService,
    private readonly cityLoader: CityLoader,
  ) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() city: City): Promise<number> {
    return this.cityService.countRestaurantsByCity(city)
  }

  @ResolveField(returns => GeoLocation)
  async location(@Parent() city: City): Promise<GeoLocation | null> {
    const { locationId } = city
    if (locationId) {
      const locations = await this.cityLoader
        .createLocationsLoader()
        .load(locationId)
      return locations || null
    }
    return null
  }

  @Query(returns => AllCitiesOutput)
  allCities(): Promise<AllCitiesOutput> {
    return this.cityService.findAllCities()
  }

  @Query(returns => PaginationCitiesOutput)
  cities(
    @Args() args: PaginationWithSearchArgs,
  ): Promise<PaginationCitiesOutput> {
    return this.cityService.findCities(args)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteCity(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.cityService.deleteCityByAdmin(decodedIdToken.uid, arg.id)
  }

  @Mutation(returns => AdminCreateCityOutput)
  @Roles(UserRole.Admin)
  adminCreateCity(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: AdminCreateCityInput,
  ): Promise<AdminCreateCityOutput> {
    return this.cityService.createCityByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(returns => AdminUpdateCityOutput)
  @Roles(UserRole.Admin)
  adminUpdateCity(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: AdminUpdateCityInput,
  ): Promise<AdminUpdateCityOutput> {
    return this.cityService.updateCityByAdmin(decodedIdToken.uid, input)
  }
}

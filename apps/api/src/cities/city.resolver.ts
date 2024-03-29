import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import { GeoLocation } from '../geo-locations/geo-location.entity'
import { GeoLocationLoader } from '../geo-locations/geo-location.loader'
import { User, UserRole } from '../users/entities/user.entity'
import { City } from './city.entity'
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
    private readonly geoLocationLoader: GeoLocationLoader,
  ) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() city: City): Promise<number> {
    return this.cityService.countRestaurantsByCity(city)
  }

  @ResolveField(returns => GeoLocation, { nullable: true })
  async location(@Parent() city: City): Promise<GeoLocation | null> {
    const { locationId } = city
    if (locationId) {
      const locations = await this.geoLocationLoader.findAllLocationsByIds.load(
        locationId,
      )
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
    @GraphqlAuthUser() authUser: User,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.cityService.deleteCityByAdmin(authUser.id, arg.id)
  }

  @Mutation(returns => AdminCreateCityOutput)
  @Roles(UserRole.Admin)
  adminCreateCity(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: AdminCreateCityInput,
  ): Promise<AdminCreateCityOutput> {
    return this.cityService.createCityByAdmin(authUser.id, input)
  }

  @Mutation(returns => AdminUpdateCityOutput)
  @Roles(UserRole.Admin)
  adminUpdateCity(
    @GraphqlAuthUser() authUser: User,
    @Args('input') input: AdminUpdateCityInput,
  ): Promise<AdminUpdateCityOutput> {
    return this.cityService.updateCityByAdmin(authUser.id, input)
  }
}

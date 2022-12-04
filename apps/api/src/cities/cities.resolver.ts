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
import { Location } from '../locations/location.entity'
import { UserRole } from '../users/entities/user.entity'
import { CityService } from './cities.service'
import { City } from './city.entity'
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
  constructor(private readonly cityService: CityService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() city: City): Promise<number> {
    return this.cityService.countRestaurantsByCity(city)
  }

  @ResolveField(returns => Location)
  location(@Parent() city: City): Promise<Location | null> | null {
    return this.cityService.findLocationByCity(city)
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

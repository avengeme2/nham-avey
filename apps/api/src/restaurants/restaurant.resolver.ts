import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { DecodedIdToken } from 'firebase-admin/auth'
import { GraphQLResolveInfo } from 'graphql'

import { GraphqlAuthUser } from '../auth/graphql-auth-user.decorator'
import { Roles } from '../auth/role.decorator'
import { City } from '../cities/city.entity'
import { CityLoader } from '../cities/city.loader'
import { IdArg } from '../common/dtos/id.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import { PaginationWithSearchArgs } from '../common/dtos/pagination.dto'
import { SlugArg } from '../common/dtos/slug.dto'
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from '../common/utils/parse-graphql-resolve-info'
import { GeoLocation } from '../geo-locations/geo-location.entity'
import { GeoLocationLoader } from '../geo-locations/geo-location.loader'
import { OpeningHours } from '../opening-hours/opening-hours.entity'
import { OpeningHoursLoader } from '../opening-hours/opening-hours.loader'
import { UserRole } from '../users/entities/user.entity'
import {
  AdminCreateRestaurantInput,
  AdminUpdateRestaurantInput,
  PaginatedCategoryRestaurantsOutput,
  PaginatedCityRestaurantsOutput,
  PaginatedRestaurantsOutput,
  PaginationCategoryRestaurantsArgs,
  PaginationCityRestaurantsArgs,
  RestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from './dtos'
import {
  AllRestaurantsSlugArgs,
  AllRestaurantsSlugOutput,
} from './dtos/all-restaurants-slug.dto'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantService } from './restaurant.service'

@Resolver(of => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly geoLocationLoader: GeoLocationLoader,
    private readonly cityLoader: CityLoader,
    private readonly openingHoursLoader: OpeningHoursLoader,
  ) {}

  @Query(returns => AllRestaurantsSlugOutput)
  allRestaurantsSlug(
    @Args() args: AllRestaurantsSlugArgs,
  ): Promise<AllRestaurantsSlugOutput> {
    return this.restaurantService.findAllRestaurantsSlug(args)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  restaurants(
    @Args() args: PaginationWithSearchArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PaginatedRestaurantsOutput> {
    const parsedInfo = parseResolveInfo(info) as ResolveTree
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType,
    )
    const restaurantFields =
      simplifiedInfo.fields?.['data']?.['fieldsByTypeName']?.['Restaurant'] ||
      {}

    const neededJoinedColumns: string[] = []

    const allOptionalJoinColumns = [
      'reviews',
      'categories',
      'vendors',
      'orders',
      'menu',
    ]
    allOptionalJoinColumns.forEach(column => {
      if (column in restaurantFields) {
        neededJoinedColumns.push(column)
      }
    })

    return this.restaurantService.findRestaurants(args, neededJoinedColumns)
  }

  @Query(returns => RestaurantOutput)
  restaurant(@Args() arg: IdArg): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(arg.id)
  }

  @Query(returns => RestaurantOutput)
  restaurantBySlug(@Args() arg: SlugArg): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantBySlug(arg.slug)
  }

  @ResolveField(returns => GeoLocation, { nullable: true })
  async location(
    @Parent() restaurant: Restaurant,
  ): Promise<GeoLocation | null> {
    const { locationId } = restaurant
    if (locationId) {
      const locations = await this.geoLocationLoader.findAllLocationsByIds.load(
        locationId,
      )
      return locations || null
    }
    return null
  }

  @ResolveField(returns => City, { nullable: true })
  async city(@Parent() restaurant: Restaurant): Promise<City | null> {
    const { cityId } = restaurant
    if (cityId) {
      const city = await this.cityLoader.findCitiesAllByIds.load(cityId)
      return city || null
    }
    return null
  }

  @ResolveField(returns => OpeningHours, { nullable: true })
  async openingHours(
    @Parent() restaurant: Restaurant,
  ): Promise<OpeningHours | null> {
    const { openingHoursId } = restaurant
    if (openingHoursId) {
      const openingHours =
        await this.openingHoursLoader.findAllOpeningHoursByIds.load(
          openingHoursId,
        )
      return openingHours || null
    }
    return null
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  async vendorCreateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: VendorCreateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return await this.restaurantService.createRestaurantByVendor(
      decodedIdToken.uid,
      input,
    )
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Admin)
  async adminCreateRestaurant(
    @GraphqlAuthUser() admin: DecodedIdToken,
    @Args('input') input: AdminCreateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return await this.restaurantService.createRestaurantByAdmin(admin, input)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Vendor)
  myRestaurants(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() args: PaginationWithSearchArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByVendor(
      decodedIdToken.uid,
      args,
    )
  }

  @Query(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantByIdAndVendorId(
      decodedIdToken.uid,
      arg.id,
    )
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(
    @Args() args: PaginationWithSearchArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByAdmin(args)
  }

  @Query(returns => PaginatedCategoryRestaurantsOutput)
  restaurantsByCategorySlug(
    @Args() args: PaginationCategoryRestaurantsArgs,
  ): Promise<PaginatedCategoryRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByCategorySlug(args)
  }

  @Query(returns => PaginatedCityRestaurantsOutput)
  restaurantsByCitySlug(
    @Args() args: PaginationCityRestaurantsArgs,
  ): Promise<PaginatedCityRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByCitySlug(args)
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: VendorUpdateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.updateRestaurantByVendor(
      decodedIdToken.uid,
      input,
    )
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Admin)
  adminUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args('input') input: AdminUpdateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.updateRestaurantByAdmin(input)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Vendor, UserRole.Admin)
  deleteRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() arg: IdArg,
  ): Promise<CoreOutput> {
    return this.restaurantService.deleteRestaurant(decodedIdToken, arg.id)
  }
}

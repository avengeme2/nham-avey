import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { City } from '../../cities/city.entity'
import {
  PaginationArgs,
  PaginationOutput,
} from '../../common/dtos/pagination.dto'
import { Restaurant } from '../entities/restaurant.entity'

@ArgsType()
export class PaginationCityRestaurantsArgs extends PaginationArgs {
  @Field(type => String)
  readonly slug: string
}

@ObjectType()
export class PaginatedCityRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  readonly restaurants?: Restaurant[]

  @Field(type => City, { nullable: true })
  readonly city?: City
}

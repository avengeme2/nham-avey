import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { Category } from '../../categories/category.entity'
import {
  PaginationArgs,
  PaginationOutput,
} from '../../common/dtos/pagination.dto'
import { Restaurant } from '../entities/restaurant.entity'

@ArgsType()
export class PaginationCategoryRestaurantsArgs extends PaginationArgs {
  @Field(type => String)
  readonly slug: string
}

@ObjectType()
export class PaginatedCategoryRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  readonly restaurants?: Restaurant[]

  @Field(type => Category, { nullable: true })
  readonly category?: Category
}

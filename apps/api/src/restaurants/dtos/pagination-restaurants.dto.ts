import { Field, ObjectType } from '@nestjs/graphql'

import { PaginationOutput } from '../../common/dtos/pagination.dto'
import { Restaurant } from '../entities/restaurant.entity'

@ObjectType()
export class PaginatedRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  data?: Restaurant[]
}

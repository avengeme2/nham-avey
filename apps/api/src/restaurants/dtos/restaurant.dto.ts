import { Field, ObjectType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { Restaurant } from '../entities/restaurant.entity'

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  data?: Restaurant
}

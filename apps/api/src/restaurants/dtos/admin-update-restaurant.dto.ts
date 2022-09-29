import { Field, InputType, PartialType } from '@nestjs/graphql'

import { AdminCreateRestaurantInput } from './admin-create-restaurant.dto'

@InputType()
export class AdminUpdateRestaurantInput extends PartialType(
  AdminCreateRestaurantInput,
) {
  @Field(type => Number)
  restaurantId: number
}

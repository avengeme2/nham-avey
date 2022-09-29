import { Field, InputType, PartialType } from '@nestjs/graphql'

import { VendorCreateRestaurantInput } from './vendor-create-restaurant.dto'

@InputType()
export class VendorUpdateRestaurantInput extends PartialType(
  VendorCreateRestaurantInput,
) {
  @Field(type => Number)
  restaurantId: number
}

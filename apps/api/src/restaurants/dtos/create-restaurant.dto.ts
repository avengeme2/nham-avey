import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, ["name", "coverImg", "address"]) {
  @Field(type => String)
  categoryName: string
}

@InputType()
export class CreateRestaurantByAdminInput extends CreateRestaurantInput {
  @Field(type => String)
  ownerId: string
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Int)
  restaurantId?: number
}

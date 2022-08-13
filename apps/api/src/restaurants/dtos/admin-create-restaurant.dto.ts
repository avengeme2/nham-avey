import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"
import { VendorCreateRestaurantInput } from "src/restaurants/dtos/vendor-create-restaurant.dto"

@InputType()
export class AdminCreateRestaurantInput extends VendorCreateRestaurantInput {
  @Field(type => [String])
  @IsString({ each: true })
  vendorIds: string[]

  @Field(type => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  coverImageUrls?: string[]
}

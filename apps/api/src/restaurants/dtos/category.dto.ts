import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
import { PaginationArgs, PaginationOutput } from "src/common/dtos/pagination.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ArgsType()
export class PaginationCategoryRestaurantArgs extends PaginationArgs {
  @Field(type => String)
  slug: string
}

@ObjectType()
export class PaginatedRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]
}

@ObjectType()
export class PaginatedCategoryRestaurantOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]

  @Field(type => Category, { nullable: true })
  category?: Category
}

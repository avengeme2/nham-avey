import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm"

@InputType("ImageInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "images" })
export class Image extends CoreEntity {
  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 255 })
  @IsString()
  url: string

  @Field(() => String, { nullable: false })
  @Column({ nullable: true, type: "varchar", length: 50 })
  @IsString()
  blurhash?: string

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, restaurant => restaurant.coverImages)
  @JoinColumn({ name: "restaurant_id", referencedColumnName: "id" })
  restaurant: Restaurant

  @RelationId((image: Image) => image.restaurant)
  restaurantId: number
}

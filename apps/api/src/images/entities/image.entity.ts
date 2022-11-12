import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm'

import { CoreEntity } from '../../common/entities/core.entity'
import { Restaurant } from '../../restaurants/entities/restaurant.entity'

@InputType('ImageInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'images' })
export class Image extends CoreEntity {
  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 255 })
  @IsString()
  url: string

  @Field(() => String, { nullable: false })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsString()
  blurhash?: string

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, restaurant => restaurant.coverImages, {
    nullable: true,
  })
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  restaurant?: Restaurant

  @RelationId((image: Image) => image.restaurant)
  restaurantId?: number
}

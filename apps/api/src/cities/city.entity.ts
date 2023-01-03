import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm'

import { CoreEntity } from '../common/entities/core.entity'
import { GeoLocation } from '../geo-locations/geo-location.entity'
import { Restaurant } from '../restaurants/entities/restaurant.entity'

@InputType('CityInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'cities' })
export class City extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  name: string

  @Field(type => String)
  @Column({ nullable: false })
  @IsString()
  slug: string

  @Field(type => String, { nullable: true })
  @Column()
  @IsString()
  @IsOptional()
  nameInKhmer?: string

  @OneToOne(() => GeoLocation, { nullable: true })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location?: GeoLocation

  @RelationId((city: City) => city.location)
  locationId?: number

  @OneToMany(() => Restaurant, restaurant => restaurant.city, {
    nullable: true,
  })
  restaurants?: Restaurant[]

  // non-column field for custom query
  public restaurantCount?: number
}

import { Field, Float, InputType, ObjectType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'
import { Column, Entity } from 'typeorm'

import { CoreEntity } from '../common/entities/core.entity'

@InputType('LocationInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'geo_locations' })
export class GeoLocation extends CoreEntity {
  @Field(() => Float)
  @Column({ type: 'float' })
  @IsNumber()
  latitude: number

  @Field(() => Float)
  @Column({ type: 'float' })
  @IsNumber()
  longitude: number
}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { City } from '../city.entity'

@InputType()
export class AdminCreateCityInput extends PickType(City, [
  'name',
  'nameInKhmer',
]) {}

@ObjectType()
export class AdminCreateCityOutput extends CoreOutput {
  @Field(type => City, { nullable: true })
  city?: City
}

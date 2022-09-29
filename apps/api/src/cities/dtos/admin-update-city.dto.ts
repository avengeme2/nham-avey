import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { City } from '../city.entity'

@InputType()
export class AdminUpdateCityInput extends PartialType(
  PickType(City, ['name', 'nameInKhmer']),
) {
  @Field(type => Int)
  readonly cityId: number
}

@ObjectType()
export class AdminUpdateCityOutput extends CoreOutput {
  @Field(type => City, { nullable: true })
  city?: City
}

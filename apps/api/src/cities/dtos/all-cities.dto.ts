import { Field, ObjectType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { City } from '../city.entity'

@ObjectType()
export class AllCitiesOutput extends CoreOutput {
  @Field(type => [City], { nullable: true })
  readonly data?: City[]
}

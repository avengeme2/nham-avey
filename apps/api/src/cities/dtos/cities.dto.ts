import { Field, ObjectType } from '@nestjs/graphql'

import { PaginationOutput } from '../../common/dtos/pagination.dto'
import { City } from '../city.entity'

@ObjectType()
export class PaginationCitiesOutput extends PaginationOutput {
  @Field(type => [City], { nullable: true })
  readonly data?: City[]
}

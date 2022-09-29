import { Field, ObjectType } from '@nestjs/graphql'

import { PaginationOutput } from '../../common/dtos/pagination.dto'
import { Category } from '../category.entity'

@ObjectType()
export class PaginationCategoriesOutput extends PaginationOutput {
  @Field(type => [Category], { nullable: true })
  readonly data?: Category[]
}

import { Field, ObjectType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { Category } from '../category.entity'

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field(type => [Category], { nullable: true })
  readonly data?: Category[]
}

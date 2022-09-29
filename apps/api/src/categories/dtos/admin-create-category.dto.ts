import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { Category } from '../category.entity'

@InputType()
export class AdminCreateCategoryInput extends PickType(Category, [
  'name',
  'coverImageUrl',
  'iconUrl',
]) {}

@ObjectType()
export class AdminCreateCategoryOutput extends CoreOutput {
  @Field(type => Category, { nullable: true })
  category?: Category
}

import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { Category } from '../category.entity'

@InputType()
export class AdminUpdateCategoryInput extends PartialType(
  PickType(Category, ['name', 'coverImageUrl', 'iconUrl']),
) {
  @Field(type => Int)
  readonly categoryId: number
}

@ObjectType()
export class AdminUpdateCategoryOutput extends CoreOutput {
  @Field(type => Category, { nullable: true })
  category?: Category
}

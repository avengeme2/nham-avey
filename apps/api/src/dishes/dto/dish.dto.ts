import { Field, ObjectType } from '@nestjs/graphql'

import { CoreOutput } from '../../common/dtos/output.dto'
import { Dish } from '../dish.entity'

@ObjectType()
export class DishOutput extends CoreOutput {
  @Field(type => Dish, { nullable: true })
  dish?: Dish
}

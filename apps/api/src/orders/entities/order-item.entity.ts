import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import { CoreEntity } from '../../common/entities/core.entity'
import { Dish } from '../../dishes/dish.entity'

@InputType('OrderItemOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  choice?: string
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'order_items' })
export class OrderItem extends CoreEntity {
  @Field(() => Dish)
  @ManyToOne(() => Dish, { nullable: true })
  dish?: Dish

  @Field(() => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[]
}

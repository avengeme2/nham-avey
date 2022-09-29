import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsEnum, IsNumber } from 'class-validator'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm'

import { CoreEntity } from '../../common/entities/core.entity'
import { Restaurant } from '../../restaurants/entities/restaurant.entity'
import { User } from '../../users/entities/user.entity'
import { OrderItem } from './order-item.entity'

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' })

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'orders' })
export class Order extends CoreEntity {
  @Field(type => User, { nullable: true })
  @ManyToOne(type => User, user => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  customer?: User

  @RelationId((order: Order) => order.customer)
  customerId: string

  @Field(type => User, { nullable: true })
  @ManyToOne(type => User, user => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  driver?: User

  @RelationId((order: Order) => order.driver)
  driverId: string

  @Field(type => Restaurant, { nullable: true })
  @ManyToOne(type => Restaurant, restaurant => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  restaurant?: Restaurant

  @Field(type => [OrderItem])
  @ManyToMany(type => OrderItem, {
    eager: true,
  })
  @JoinTable({
    name: 'order_order_items',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_item_id', referencedColumnName: 'id' },
  })
  items: OrderItem[]

  @Column({ nullable: true })
  @Field(type => Float, { nullable: true })
  @IsNumber()
  total?: number

  @Column({
    type: 'enum',
    enumName: 'order_status',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  @Field(type => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus
}

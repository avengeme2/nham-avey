import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'
import { Column, Entity } from 'typeorm'

import { CoreEntity } from '../../common/entities/core.entity'

@InputType('OpeningHoursInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'opening_hours' })
export class OpeningHours extends CoreEntity {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  mondayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  tuesdayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  wednesdayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  thursdayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  fridayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  saturdayHours?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  sundayHours?: string
}

import { IsString } from 'class-validator'
import { Column, Entity } from 'typeorm'

import { CoreEntity } from '../common/entities/core.entity'

@Entity({ name: 'disposable_mail_domains' })
export class DisposableDomainEmail extends CoreEntity {
  @Column()
  @IsString()
  domain: string
}

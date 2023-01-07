import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

import { OpeningHours } from './opening-hours.entity'

export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHours)
    private readonly openingHoursRepo: Repository<OpeningHours>,
  ) {}

  findAllByIds(ids: number[]) {
    return this.openingHoursRepo.findBy({ id: In(ids) })
  }
}

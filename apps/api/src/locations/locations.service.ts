import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Location } from './location.entity'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  findAllLocationsByIds(ids: readonly number[]): Promise<Location[]> {
    return this.locationRepo.find({ where: { id: In(ids) } })
  }
}

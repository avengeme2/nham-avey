import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { GeoLocation } from './geo-location.entity'

@Injectable()
export class GeoLocationService {
  constructor(
    @InjectRepository(GeoLocation)
    private readonly locationRepo: Repository<GeoLocation>,
  ) {}

  findAllLocationsByIds(ids: readonly number[]): Promise<GeoLocation[]> {
    return this.locationRepo.find({ where: { id: In(ids) } })
  }
}

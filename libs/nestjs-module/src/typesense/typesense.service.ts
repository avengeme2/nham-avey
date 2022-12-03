import { Client } from 'typesense'
import { Inject, Injectable, Optional } from '@nestjs/common'
import { TYPESENSE_MODULE_OPTIONS } from './typesense.constants'

@Injectable()
export class TypesenseService extends Client {
  constructor(
    @Optional()
    @Inject(TYPESENSE_MODULE_OPTIONS)
    options: Client['configuration'],
  ) {
    super(options)
  }
}

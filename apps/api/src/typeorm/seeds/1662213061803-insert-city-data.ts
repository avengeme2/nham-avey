import { MigrationInterface, QueryRunner } from 'typeorm'

import { City } from '../../cities/city.entity'
import { GeoLocation } from '../../geo-locations/geo-location.entity'
import cities from '../data/cities.data.json'

export class insertCityData1662213061803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const city of cities) {
      const location = await queryRunner.manager.save(
        queryRunner.manager.create<GeoLocation>(GeoLocation, city.location),
      )
      await queryRunner.manager.save(
        queryRunner.manager.create<City>(City, { ...city, location }),
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM cities`)
  }
}

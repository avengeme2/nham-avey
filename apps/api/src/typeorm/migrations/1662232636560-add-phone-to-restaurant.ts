import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPhoneToRestaurant1662232636560 implements MigrationInterface {
  name = 'addPhoneToRestaurant1662232636560'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD "phone" character varying
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP COLUMN "phone"
          `)
  }
}

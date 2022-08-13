import { MigrationInterface, QueryRunner } from "typeorm"

export class restaurantCoverImage1660365509727 implements MigrationInterface {
  name = "restaurantCoverImage1660365509727"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "restaurants" DROP COLUMN "cover_image_urls"
        `)
    await queryRunner.query(`
            ALTER TABLE "images"
            ADD "restaurant_id" integer
        `)
    await queryRunner.query(`
            ALTER TABLE "images"
            ADD CONSTRAINT "FK_fd96ef146b6e8f70e6acc032f08" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "images" DROP CONSTRAINT "FK_fd96ef146b6e8f70e6acc032f08"
        `)
    await queryRunner.query(`
            ALTER TABLE "images" DROP COLUMN "restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD "cover_image_urls" character varying array
        `)
  }
}

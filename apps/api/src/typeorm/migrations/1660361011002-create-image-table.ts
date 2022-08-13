import { MigrationInterface, QueryRunner } from "typeorm"

export class createImageTable1660361011002 implements MigrationInterface {
  name = "createImageTable1660361011002"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "images" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "url" character varying(255) NOT NULL,
                "blurhash" character varying(50),
                CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "images"
        `)
  }
}

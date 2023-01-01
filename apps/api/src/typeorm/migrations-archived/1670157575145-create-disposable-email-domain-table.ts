import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDisposableEmailDomainTable1670157575145
  implements MigrationInterface
{
  name = 'CreateDisposableEmailDomainTable1670157575145'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "disposable_mail_domains" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "domain" character varying NOT NULL,
                CONSTRAINT "PK_01588c85d1bb775ca8083c1e9b2" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "disposable_mail_domains"
        `)
  }
}

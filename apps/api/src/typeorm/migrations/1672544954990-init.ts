import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1672544954990 implements MigrationInterface {
  name = 'init1672544954990'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "geo_locations" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "latitude" double precision NOT NULL,
                "longitude" double precision NOT NULL,
                CONSTRAINT "pk_geo_locations__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "cities" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "name_in_khmer" character varying NOT NULL,
                "location_id" integer,
                CONSTRAINT "rc_cities__location_id" UNIQUE ("location_id"),
                CONSTRAINT "pk_cities__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "dishes" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "price" integer NOT NULL,
                "photo" character varying,
                "description" character varying NOT NULL,
                "options" json,
                "restaurant_id" integer,
                CONSTRAINT "pk_dishes__id" PRIMARY KEY ("id")
            )
        `)
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
                "restaurant_id" integer,
                CONSTRAINT "pk_images__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "payments" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "transaction_id" character varying NOT NULL,
                "user_id" character varying,
                "restaurant_id" integer,
                CONSTRAINT "pk_payments__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('Admin', 'Customer', 'Vendor', 'Driver')
        `)
    await queryRunner.query(`
            CREATE TABLE "users" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" character varying NOT NULL,
                "first_name" character varying,
                "last_name" character varying,
                "email" character varying NOT NULL,
                "photo_url" character varying,
                "roles" "public"."user_role_enum" array NOT NULL DEFAULT '{Customer}',
                "is_verified" boolean NOT NULL DEFAULT false,
                CONSTRAINT "pk_users__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "order_items" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "options" json,
                "dish_id" integer,
                CONSTRAINT "pk_order_items__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum" AS ENUM(
                'Pending',
                'Cooking',
                'Cooked',
                'PickedUp',
                'Delivered'
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "orders" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "total" integer,
                "status" "public"."order_status_enum" NOT NULL DEFAULT 'Pending',
                "customer_id" character varying,
                "driver_id" character varying,
                "restaurant_id" integer,
                CONSTRAINT "pk_orders__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "opening_hours" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "monday_hours" character varying,
                "tuesday_hours" character varying,
                "wednesday_hours" character varying,
                "thursday_hours" character varying,
                "friday_hours" character varying,
                "saturday_hours" character varying,
                "sunday_hours" character varying,
                CONSTRAINT "pk_opening_hours__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "reviews" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "stars" integer NOT NULL,
                "text" character varying,
                "customer_id" integer NOT NULL,
                "restaurant_id" integer,
                CONSTRAINT "rc_reviews__customer_id" UNIQUE ("customer_id"),
                CONSTRAINT "pk_reviews__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "restaurants" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "description" character varying(255),
                "logo_image_url" character varying,
                "address" character varying,
                "neighborhood" character varying,
                "street" character varying,
                "website" character varying,
                "is_promoted" boolean NOT NULL DEFAULT false,
                "promoted_until" TIMESTAMP WITH TIME ZONE,
                "phone" character varying,
                "city_id" integer,
                "location_id" integer,
                "opening_hours_id" integer,
                CONSTRAINT "rc_restaurants__location_id" UNIQUE ("location_id"),
                CONSTRAINT "rc_restaurants__opening_hours_id" UNIQUE ("opening_hours_id"),
                CONSTRAINT "pk_restaurants__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "categories" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_by" character varying(255),
                "updated_by" character varying(255),
                "deleted_by" character varying(255),
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "icon_url" character varying,
                "cover_image_url" character varying,
                "slug" character varying NOT NULL,
                CONSTRAINT "pk_categories__id" PRIMARY KEY ("id")
            )
        `)
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
                CONSTRAINT "pk_disposable_mail_domains__id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "order_order_items" (
                "order_id" integer NOT NULL,
                "order_item_id" integer NOT NULL,
                CONSTRAINT "pk_order_order_items__order_id__order_item_id" PRIMARY KEY ("order_id", "order_item_id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_order_order_items__order_id" ON "order_order_items" ("order_id")
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_order_order_items__order_item_id" ON "order_order_items" ("order_item_id")
        `)
    await queryRunner.query(`
            CREATE TABLE "restaurant_categories" (
                "restaurant_id" integer NOT NULL,
                "category_id" integer NOT NULL,
                CONSTRAINT "pk_restaurant_categories__restaurant_id__category_id" PRIMARY KEY ("restaurant_id", "category_id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_restaurant_categories__restaurant_id" ON "restaurant_categories" ("restaurant_id")
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_restaurant_categories__category_id" ON "restaurant_categories" ("category_id")
        `)
    await queryRunner.query(`
            CREATE TABLE "restaurant_vendors" (
                "restaurant_id" integer NOT NULL,
                "vendor_id" character varying NOT NULL,
                CONSTRAINT "pk_restaurant_vendors__restaurant_id__vendor_id" PRIMARY KEY ("restaurant_id", "vendor_id")
            )
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_restaurant_vendors__restaurant_id" ON "restaurant_vendors" ("restaurant_id")
        `)
    await queryRunner.query(`
            CREATE INDEX "idx_restaurant_vendors__vendor_id" ON "restaurant_vendors" ("vendor_id")
        `)
    await queryRunner.query(`
            ALTER TABLE "cities"
            ADD CONSTRAINT "fk_cities__geo_locations__location_id" FOREIGN KEY ("location_id") REFERENCES "geo_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "dishes"
            ADD CONSTRAINT "fk_dishes__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "images"
            ADD CONSTRAINT "fk_images__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "fk_payments__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "fk_payments__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "fk_order_items__dishes__dish_id" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "fk_orders__users__customer_id" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "fk_orders__users__driver_id" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "fk_orders__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "fk_reviews__geo_locations__customer_id" FOREIGN KEY ("customer_id") REFERENCES "geo_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "reviews"
            ADD CONSTRAINT "fk_reviews__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "fk_restaurants__cities__city_id" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "fk_restaurants__geo_locations__location_id" FOREIGN KEY ("location_id") REFERENCES "geo_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants"
            ADD CONSTRAINT "fk_restaurants__opening_hours__opening_hours_id" FOREIGN KEY ("opening_hours_id") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "order_order_items"
            ADD CONSTRAINT "fk_order_order_items__orders__order_id" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "order_order_items"
            ADD CONSTRAINT "fk_order_order_items__order_items__order_item_id" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_categories"
            ADD CONSTRAINT "fk_restaurant_categories__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_categories"
            ADD CONSTRAINT "fk_restaurant_categories__categories__category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_vendors"
            ADD CONSTRAINT "fk_restaurant_vendors__restaurants__restaurant_id" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_vendors"
            ADD CONSTRAINT "fk_restaurant_vendors__users__vendor_id" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "fk_restaurant_vendors__users__vendor_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "fk_restaurant_vendors__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_categories" DROP CONSTRAINT "fk_restaurant_categories__categories__category_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurant_categories" DROP CONSTRAINT "fk_restaurant_categories__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "order_order_items" DROP CONSTRAINT "fk_order_order_items__order_items__order_item_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "order_order_items" DROP CONSTRAINT "fk_order_order_items__orders__order_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "fk_restaurants__opening_hours__opening_hours_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "fk_restaurants__geo_locations__location_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "restaurants" DROP CONSTRAINT "fk_restaurants__cities__city_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews__geo_locations__customer_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__driver_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "fk_orders__users__customer_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_items__dishes__dish_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "fk_payments__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "fk_payments__users__user_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "images" DROP CONSTRAINT "fk_images__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "dishes" DROP CONSTRAINT "fk_dishes__restaurants__restaurant_id"
        `)
    await queryRunner.query(`
            ALTER TABLE "cities" DROP CONSTRAINT "fk_cities__geo_locations__location_id"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_restaurant_vendors__vendor_id"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_restaurant_vendors__restaurant_id"
        `)
    await queryRunner.query(`
            DROP TABLE "restaurant_vendors"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_restaurant_categories__category_id"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_restaurant_categories__restaurant_id"
        `)
    await queryRunner.query(`
            DROP TABLE "restaurant_categories"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_order_order_items__order_item_id"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."idx_order_order_items__order_id"
        `)
    await queryRunner.query(`
            DROP TABLE "order_order_items"
        `)
    await queryRunner.query(`
            DROP TABLE "disposable_mail_domains"
        `)
    await queryRunner.query(`
            DROP TABLE "categories"
        `)
    await queryRunner.query(`
            DROP TABLE "restaurants"
        `)
    await queryRunner.query(`
            DROP TABLE "reviews"
        `)
    await queryRunner.query(`
            DROP TABLE "opening_hours"
        `)
    await queryRunner.query(`
            DROP TABLE "orders"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "order_items"
        `)
    await queryRunner.query(`
            DROP TABLE "users"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "payments"
        `)
    await queryRunner.query(`
            DROP TABLE "images"
        `)
    await queryRunner.query(`
            DROP TABLE "dishes"
        `)
    await queryRunner.query(`
            DROP TABLE "cities"
        `)
    await queryRunner.query(`
            DROP TABLE "geo_locations"
        `)
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class renameLocationToGeoLocation1672544058706
  implements MigrationInterface
{
  name = 'renameLocationToGeoLocation1672544058706'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE "cities" DROP CONSTRAINT "FK_6dc840c57fe076d3bb23dddcf15"
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes" DROP CONSTRAINT "FK_70771174ec44463b0478c85915b"
          `)
    await queryRunner.query(`
              ALTER TABLE "images" DROP CONSTRAINT "FK_fd96ef146b6e8f70e6acc032f08"
          `)
    await queryRunner.query(`
              ALTER TABLE "payments" DROP CONSTRAINT "FK_d19273a0dd01a303a5d8fcba583"
          `)
    await queryRunner.query(`
              ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items" DROP CONSTRAINT "FK_ee9bb257017dd6202e7c95ef5fe"
          `)
    await queryRunner.query(`
              ALTER TABLE "orders" DROP CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6"
          `)
    await queryRunner.query(`
              ALTER TABLE "orders" DROP CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee"
          `)
    await queryRunner.query(`
              ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews" DROP CONSTRAINT "FK_2269110d10df8d494b99e1381d2"
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews" DROP CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_f01e40603039b0ea7afdb8f9064"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_2a011b00d912f08e65cb10d46fe"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants" DROP CONSTRAINT "FK_60f31869e557e8d6d49aaa1b1a1"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_800aa63d0f4dfdc8396be33e384"
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items" DROP CONSTRAINT "FK_b8de50eae8b76e02a14782da30b"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories" DROP CONSTRAINT "FK_58d6d92d6ed0c45e64dea538204"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "FK_a77d567e09e742029bfa790f7b2"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_vendors" DROP CONSTRAINT "FK_7b3eea4758cfe1589012236f3a9"
          `)
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
                  CONSTRAINT "PK_7a01c2056cca1c74e5f1c14c7b0" PRIMARY KEY ("id")
              )
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
              DROP TABLE "geo_locations"
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_vendors"
              ADD CONSTRAINT "FK_7b3eea4758cfe1589012236f3a9" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_vendors"
              ADD CONSTRAINT "FK_a77d567e09e742029bfa790f7b2" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_58d6d92d6ed0c45e64dea538204" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
              SET NULL ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurant_categories"
              ADD CONSTRAINT "FK_0614424df3d0d9faf8a79cb49df" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_b8de50eae8b76e02a14782da30b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "order_order_items"
              ADD CONSTRAINT "FK_800aa63d0f4dfdc8396be33e384" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_60f31869e557e8d6d49aaa1b1a1" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_2a011b00d912f08e65cb10d46fe" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "restaurants"
              ADD CONSTRAINT "FK_f01e40603039b0ea7afdb8f9064" FOREIGN KEY ("opening_hours_id") REFERENCES "opening_hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews"
              ADD CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b" FOREIGN KEY ("customer_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "reviews"
              ADD CONSTRAINT "FK_2269110d10df8d494b99e1381d2" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "orders"
              ADD CONSTRAINT "FK_85fdda5fcce2f397ef8f117a2c6" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE
              SET NULL ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "order_items"
              ADD CONSTRAINT "FK_ee9bb257017dd6202e7c95ef5fe" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "payments"
              ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "payments"
              ADD CONSTRAINT "FK_d19273a0dd01a303a5d8fcba583" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "images"
              ADD CONSTRAINT "FK_fd96ef146b6e8f70e6acc032f08" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "dishes"
              ADD CONSTRAINT "FK_70771174ec44463b0478c85915b" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION
          `)
    await queryRunner.query(`
              ALTER TABLE "cities"
              ADD CONSTRAINT "FK_6dc840c57fe076d3bb23dddcf15" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          `)
  }
}

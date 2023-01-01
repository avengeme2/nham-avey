import { MigrationInterface, QueryRunner } from 'typeorm'

import { Category } from '../../categories/category.entity'
import { City } from '../../cities/city.entity'
import { createSlug } from '../../common/utils/create-slug'
import { GeoLocation } from '../../geo-locations/geo-location.entity'
import { Image } from '../../images/entities/image.entity'
import { OpeningHours } from '../../restaurants/entities/opening-hours.entity'
import { Restaurant } from '../../restaurants/entities/restaurant.entity'
import restaurants from '../data/restaurants.data.json'

export class insertRestaurantData1662230967074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const restaurant of [
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
      ...restaurants,
    ]) {
      // setup image
      const coverImages: Image[] = []
      for (const imageUrl of restaurant.imageUrls) {
        const image = await queryRunner.manager.save(
          queryRunner.manager.create(Image, {
            url: imageUrl,
          }),
        )
        coverImages.push(image)
      }
      // setup location
      const location = await queryRunner.manager.save(
        queryRunner.manager.create<GeoLocation>(GeoLocation, {
          latitude: restaurant.location.lat,
          longitude: restaurant.location.lng,
        }),
      )
      // set up opening hours
      const openingHours = await queryRunner.manager.save(
        queryRunner.manager.create<OpeningHours>(OpeningHours, {
          mondayHours: restaurant.openingHours.find(item =>
            item.day.includes('Monday'),
          )?.hours,
          tuesdayHours: restaurant.openingHours.find(item =>
            item.day.includes('Tuesday'),
          )?.hours,
          wednesdayHours: restaurant.openingHours.find(item =>
            item.day.includes('Wednesday'),
          )?.hours,
          thursdayHours: restaurant.openingHours.find(item =>
            item.day.includes('Thursday'),
          )?.hours,
          fridayHours: restaurant.openingHours.find(item =>
            item.day.includes('Friday'),
          )?.hours,
          saturdayHours: restaurant.openingHours.find(item =>
            item.day.includes('Saturday'),
          )?.hours,
          sundayHours: restaurant.openingHours.find(item =>
            item.day.includes('Sunday'),
          )?.hours,
        }),
      )
      // setup category
      const categories: Category[] = []
      for (const categoryName of restaurant.categories) {
        let category = await queryRunner.manager.findOneBy(Category, {
          name: categoryName,
        })
        if (!category) {
          category = await queryRunner.manager.save(
            queryRunner.manager.create(Category, {
              name: categoryName,
              slug: createSlug(categoryName),
            }),
          )
        }
        categories.push(category as Category)
      }
      // get one city for restaurant
      const city = await queryRunner.manager.findOneBy(City, {
        name: 'Phnom Penh Capital', // base on insert city seed
      })
      // save restaurant
      const { title, address, neighborhood, street, website, phone } =
        restaurant
      await queryRunner.manager.save(
        queryRunner.manager.create<Restaurant>(Restaurant, {
          name: title,
          address,
          coverImages,
          slug: createSlug(title, true),
          neighborhood,
          street,
          website: website || undefined,
          city: city as City,
          location,
          openingHours,
          phone,
          categories,
        }),
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM restaurants`)
  }
}

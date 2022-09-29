import axios from 'axios'
import { encode } from 'blurhash'
import * as sharp from 'sharp'
import slugify from 'slugify'
import { MigrationInterface, QueryRunner } from 'typeorm'

import { Category } from '../../categories/category.entity'
import { City } from '../../cities/city.entity'
import { randomId } from '../../common/utils/random-id.util'
import { Image } from '../../images/entities/image.entity'
import { Location } from '../../locations/location.entity'
import { OpeningHours } from '../../restaurants/entities/opening-hours.entity'
import { Restaurant } from '../../restaurants/entities/restaurant.entity'
import * as restaurants from '../data/restaurants.data.json'

async function generateBlurhashFromBuffer(
  imageFileBuffer: Buffer,
): Promise<string> {
  const componentX = 4
  const componentY = 4
  const { data: forBlurhash, info } = await sharp(imageFileBuffer)
    .flatten({ background: '#FFFFFF' })
    .resize(componentX * 5, componentY * 5, {
      fit: sharp.fit.cover,
    })
    .clone()
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true })

  return encode(
    new Uint8ClampedArray(forBlurhash),
    info.width,
    info.height,
    componentX,
    componentY,
  )
}

async function generateBlurhashFromURL(url: string): Promise<string> {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const buffer = Buffer.from(data, 'utf-8')
  return generateBlurhashFromBuffer(buffer)
}

export class insertRestaurantData1662230967074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const restaurant of restaurants) {
      // setup image
      const coverImages: Image[] = []
      for (const imageUrl of restaurant.imageUrls) {
        const blurhash = await generateBlurhashFromURL(imageUrl)
        const image = await queryRunner.manager.save(
          queryRunner.manager.create(Image, {
            blurhash,
            url: imageUrl,
          }),
        )
        coverImages.push(image)
      }
      // setup location
      const location = await queryRunner.manager.save(
        queryRunner.manager.create<Location>(Location, {
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
              slug: slugify(categoryName, { lower: true }),
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
          slug: slugify(`${title}--${randomId(3)}`, { lower: true }),
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

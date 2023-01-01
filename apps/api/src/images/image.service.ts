import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Image } from './entities/image.entity'
import {
  generateBlurhashFromBuffer,
  generateBlurhashFromURL,
} from './image.util'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
  ) {}

  getOrCreateImages(imageUrls: string[]): Promise<Image[]> {
    return Promise.all<Image>(
      imageUrls.map(async url => {
        const image = await this.imageRepo.findOneBy({ url })
        if (image) {
          return image
        }
        const blurhash = await generateBlurhashFromURL(url)
        return this.imageRepo.save(this.imageRepo.create({ url, blurhash }))
      }),
    )
  }

  async saveImage(file: Express.Multer.File, url: string): Promise<Image> {
    const blurhash = await generateBlurhashFromBuffer(file.buffer)
    const image = this.imageRepo.create({ blurhash, url })
    return this.imageRepo.save(image)
  }
}

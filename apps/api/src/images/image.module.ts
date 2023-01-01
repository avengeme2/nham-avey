import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Image } from './entities/image.entity'
import { ImageService } from './image.service'

@Module({
  imports: [TypeOrmModule.forFeature([Image]), HttpModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}

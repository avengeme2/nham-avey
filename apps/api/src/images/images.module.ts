import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Image } from "src/images/entities/image.entity"
import { ImageService } from "src/images/images.service"

@Module({
  imports: [TypeOrmModule.forFeature([Image]), HttpModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImagesModule {}

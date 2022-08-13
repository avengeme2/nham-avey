import { Module } from "@nestjs/common"
import { FileUploadsController } from "src/file-uploads/file-uploads.controller"
import { FileUploadsService } from "src/file-uploads/file-uploads.service"
import { ImagesModule } from "src/images/images.module"

@Module({
  imports: [ImagesModule],
  controllers: [FileUploadsController],
  providers: [FileUploadsService],
})
export class FileUploadsModule {}

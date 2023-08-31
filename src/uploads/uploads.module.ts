import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ImageProcessingModule } from 'src/image-processing/image-processing.module';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, ImageProcessingService],
})
export class UploadsModule {}

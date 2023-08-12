import { Controller, Post, Request } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FastifyRequest } from 'fastify';
import fastifyMultipart, { MultipartFile } from '@fastify/multipart';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  @Post('/')
  public async upload2Files(@Request() request: FastifyRequest) {
    // extract the files from the request object
    const file: MultipartFile = await request.file();

    return await this.uploadsService.uploadStream(file);
    return 'good';
  }
}

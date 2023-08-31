import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  async trimImage(file: Buffer) {
    return await sharp(file).png().trim();
  }
}

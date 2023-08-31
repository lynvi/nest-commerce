import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as stream from 'stream';
import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile } from '@fastify/multipart';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';

@Injectable()
export class UploadsService {
  client = null;
  constructor(private imageProcessingService: ImageProcessingService) {
    this.client = new S3Client({
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async uploadStream(readableStream: MultipartFile) {
    const trimedPng = await this.imageProcessingService.trimImage(
      await readableStream.toBuffer(),
    );
    const Key = readableStream.filename;
    const Bucket = 'profit';
    const passThroughStream = new stream.PassThrough();
    const client = this.client;

    let res;

    try {
      const parallelUploads3 = new Upload({
        client,
        params: {
          Bucket,
          Key,
          ContentType: readableStream.mimetype,
          Body: passThroughStream,
          ACL: 'public-read',
        },
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });

      trimedPng.pipe(passThroughStream);
      res = await parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }

    return res;
  }
}

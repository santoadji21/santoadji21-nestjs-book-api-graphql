import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });

    this.s3 = new AWS.S3();
  }

  async uploadImageToS3(
    fileBuffer: Buffer,
    filename: string,
    fileExtension: string,
  ): Promise<string> {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: filename,
        Body: fileBuffer,
        ContentEncoding: 'base64',
        ContentType: `image/${fileExtension}`,
      })
      .promise();

    return uploadResult.Location;
  }
}

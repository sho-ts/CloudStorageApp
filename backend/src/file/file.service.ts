import { Injectable } from '@nestjs/common';
import aws = require('aws-sdk');

@Injectable()
export class FileService {
  s3upload(file: Express.Multer.File): Promise<aws.S3.ManagedUpload.SendData | Error> {
    aws.config.update({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    })
    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${new Date().getTime()}-${process.env.S3_BUCKET_KEY_PREFIX}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
      }, (err, data) => {
        err && reject(err);

        resolve(data);
      })
    })
  }

  s3download(Key: string) {
    aws.config.update({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    })
    const s3 = new aws.S3();

    const s3downloadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
    }

    return new Promise<string | Error>((resolve, reject) => {
      s3.getSignedUrl('getObject', s3downloadParams, (err, url) => {
        err && reject(err);

        resolve(url);
      });
    });
  }
}

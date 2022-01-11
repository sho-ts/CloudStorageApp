import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import aws = require('aws-sdk');
import { User } from '@entity/user.entity';
import { UserService } from '@/user/user.service';
import { PLAN_TYPE, STORAGE_TYPE } from '@const'
import translateByte from '@/utils/translateByte';

@Injectable()
export class FileService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async s3upload({ file, cognitoId }: {
    file: Express.Multer.File,
    cognitoId: string,
  }): Promise<aws.S3.ManagedUpload.SendData | Error> {
    const user = await this.userRepository.findOne({ cognito_id: cognitoId });

    aws.config.update({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    })
    const s3 = new aws.S3();

    return new Promise((resolve, reject) => {
      file.size >= 524288000 && reject('ファイルサイズが制限を超えています');
      this.checkStorage(user, file) || reject('ストレージの容量が制限に達しています')

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

  /** 空き容量の確認 */
  checkStorage = (user: User, file: Express.Multer.File) => {
    const nextStorage = user.storage + translateByte(file.size, 'kb');

    switch (user.plan) {
      case PLAN_TYPE.GUEST:
        return nextStorage < STORAGE_TYPE.GUEST;
      case PLAN_TYPE.FREE:
        return nextStorage < STORAGE_TYPE.FREE;
      case PLAN_TYPE.PREMIUM:
        return nextStorage < STORAGE_TYPE.PREMIUM;
      default:
        return false;
    }
  }
}

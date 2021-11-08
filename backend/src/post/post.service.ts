import { Injectable } from '@nestjs/common';
import { Post } from './../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isDeleted } from '../utils';
import aws = require('aws-sdk');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) { }

  create(postData: {
    description: string,
    fileSize: string,
    filePath: string,
  }) {
    const post = new Post();
    post.description = postData.description;
    post.file_size = postData.fileSize;
    post.file_path = postData.filePath;

    return this.postRepository.insert(post);
  }

  async read(id: number) {
    const post = await this.postRepository.findOne({ id });

    return !isDeleted(post) ? post : null;
  }

  async readAll() {
    const posts = await this.postRepository.find();

    return posts.filter(post => !isDeleted(post));
  }

  async update(description: string, id: number) {
    const post = await this.postRepository.findOne({ id });

    /** del_flgが1のものは処理しない */
    if (isDeleted(post)) return;

    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ description })
      .where('id = :id', { id })
      .execute();
  }

  delete(id: number) {
    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ del_flg: 1 })
      .where('id = :id', { id })
      .execute();
  }

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

  s3download(Key: string): Promise<aws.S3.GetObjectOutput | Error> {
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

    return new Promise((resolve, reject) => {
      s3.getObject(s3downloadParams,(err, data) => {
        err && reject(err);

        resolve(data);
      })
    });
  }
}

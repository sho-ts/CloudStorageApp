import { Injectable } from '@nestjs/common';
import { Post } from './../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isDeleted } from '../utils';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) { }

  create(postData: {
    description: string,
    fileSize: string,
  }) {
    const post = new Post();
    post.description = postData.description;
    post.file_size = postData.fileSize;

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
}

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

  async readAll(page = 1) {
    // 投稿件数の合計を取得
    const count = await this.postRepository
      .createQueryBuilder()
      .select('COUNT(id)', 'count')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .execute()

    // 投稿件数からページ数を計算
    const pages = Math.ceil(Number(count[0].count) / 10);

    // 検索のスタート位置を指定
    const offset = (page - 1) * 10;

    const posts = await this.postRepository
      .createQueryBuilder()
      .select('*')
      .where('del_flg = :del_flg', {
        del_flg: 0
      })
      .limit(10)
      .offset(offset)
      .execute()

    return {
      posts: posts,
      pages,
      current: Number(page),
    };
  }

  async update(description: string, id: number) {
    const post = await this.postRepository.findOne({ id });

    return await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ description })
      .where('id = :id', { id })
      .andWhere('del_flg = :del_flg', { del_flg: 0 })
      .execute();
  }

  async delete(id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ del_flg: 1 })
      .where('id = :id', { id })
      .execute();
  }
}

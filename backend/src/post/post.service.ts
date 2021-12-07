import { Injectable } from '@nestjs/common';
import { Post } from './../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    uid: string,
    disclosureRange: number,
    allowedEmail?: string,
    password?: string,
  }) {
    const post = new Post();
    post.description = postData.description;
    post.file_size = postData.fileSize;
    post.file_path = postData.filePath;
    post.uid = postData.uid;
    post.disclosure_range = postData.disclosureRange;
    post.allowed_email = postData.allowedEmail;
    post.password = postData.password;

    return this.postRepository.insert(post);
  }

  async read(user: any, id: number) {
    const posts = await this.postRepository.
      createQueryBuilder()
      .select('*')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('id = :id', { id })
      .execute();

    const post = posts[0] ?? null;

    if (!post) return;

    // 投稿のユーザーIDと一致しているか確認
    if (post.uid === user.uid) {
      return post;
    } else {
      // ユーザーIDが一致していない場合は公開条件を確認する
      // 投稿が全体公開の場合は取得する
      if (post.disclosure_range === 0) return post;

      return;
    }
  }

  async readAll(uid: string, page = 1, s: string = '') {
    // 投稿件数の合計を取得
    const count = await this.postRepository
      .createQueryBuilder()
      .select('COUNT(id)', 'count')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .andWhere('description like :description', { description: `%${s}%` })
      .execute()

    // 投稿件数からページ数を計算
    const pages = Math.ceil(Number(count[0].count) / 10);

    // 検索のスタート位置を指定
    const offset = (page - 1) * 10;

    const posts = await this.postRepository
      .createQueryBuilder()
      .select('*')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .andWhere('description like :description', { description: `%${s}%` })
      .limit(10)
      .offset(offset)
      .execute()

    return {
      posts: posts,
      pages,
      current: Number(page),
    };
  }

  async update(uid: string, description: string, id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ description })
      .where('id = :id', { id })
      .andWhere('uid = :uid', { uid })
      .andWhere('del_flg = :del_flg', { del_flg: 0 })
      .execute();
  }

  async delete(uid: string, id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ del_flg: 1 })
      .where('id = :id', { id })
      .andWhere('uid = :uid', { uid })
      .execute();
  }
}

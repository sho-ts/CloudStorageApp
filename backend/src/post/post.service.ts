import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@entity/post.entity';
import { Directory } from '@entity/directory.entity';
import { UserService } from '@/user/user.service';
import { SORT_TYPE, ORDER_BY } from '@/utils/const';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
    private readonly userService: UserService
  ) { }

  async create({
    description, fileSize, filePath, dir,
    allowedEmail, password, disclosureRange, uid
  }: {
    description: string,
    fileSize: number,
    filePath: string,
    uid: string,
    disclosureRange: number,
    allowedEmail?: string,
    password?: string,
    dir?: number,
  }) {
    const directory = await this.directoryRepository.findOne({ id: dir });

    const post = this.postRepository.create({
      description,
      file_size: fileSize,
      file_path: filePath,
      uid,
      disclosure_range: disclosureRange,
      allowed_email: allowedEmail,
      password,
      directory
    });

    // ストレージ情報を更新
    this.userService.updateStorage({
      cognitoId: uid,
      fileSize,
      type: 'inc'
    })

    return this.postRepository.save(post);
  }

  async read(user: any, id: number) {
    const post = await this.postRepository.findOne({
      id,
      del_flg: 0
    })

    // 投稿のユーザーIDと一致しているか確認
    if (post.uid === user.sub) {
      return post;
    } else {
      // ユーザーIDが一致していない場合は公開条件を確認する
      // 投稿が全体公開の場合は取得する
      if (post.disclosure_range === 0) return post;

      return;
    }
  }

  async readAll(uid: string, page = 1, s: string = '', directoryId?: number, limit?: number, sort?: SORT_TYPE, order?: ORDER_BY) {
    // 投稿件数の合計を取得
    const count = await this.postRepository
      .createQueryBuilder()
      .select('COUNT(id)', 'count')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .andWhere(directoryId ? 'directoryId = :directoryId' : '1 = 1', { directoryId })
      .andWhere(s ? 'description like :description' : '1 = 1', { description: `%${s}%` })
      .orderBy(sort, order)
      .execute();

    // 投稿件数からページ数を計算
    const pages = Math.ceil(Number(count[0].count) / (limit ?? 10));

    // 検索のスタート位置を指定
    const offset = (page - 1) * (limit ?? 10);

    const posts = await this.postRepository
      .createQueryBuilder()
      .select('*')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .andWhere(directoryId ? 'directoryId = :directoryId' : '1 = 1', { directoryId })
      .andWhere(s ? 'description like :description' : '1 = 1', { description: `%${s}%` })
      .limit(limit ?? 10)
      .offset(offset)
      .orderBy(sort, order)
      .execute();

    return {
      posts: posts,
      pages,
      current: Number(page),
    };
  }

  async update({ id, uid, description, disclosureRange, dir }: {
    id: number,
    uid: string,
    description: string,
    dir: number,
    disclosureRange: number
  }) {

    const directory = await this.directoryRepository.findOne({ id: dir });

    const post = await this.postRepository.findOne({ uid, id, del_flg: 0 });
    post.description = description;
    post.directory = directory;
    post.disclosure_range = disclosureRange;

    return await this.postRepository.save(post);
  }

  async delete(uid: string, id: number) {
    const post = await this.postRepository.findOne({ uid, id });
    post.del_flg = 1;

    return await this.postRepository.save(post);
  }
}

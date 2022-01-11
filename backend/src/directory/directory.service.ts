import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Directory } from '@entity/directory.entity';
import { Post } from '@entity/post.entity';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectConnection()
    private readonly connection: Connection,
  ) { }

  async create(uid: string, name: string) {
    const dir = this.directoryRepository.create({ uid, name })

    return await this.directoryRepository.save(dir);
  }

  async read(uid: string, id: number) {
    return await this.directoryRepository.findOne({
      id, uid, del_flg: 0
    })
  }

  async readAll(uid: string) {
    return await this.directoryRepository.find({ uid, del_flg: 0 })
  }

  async update(uid: string, name: string, id: number) {
    const dir = await this.directoryRepository.findOne({
      id, uid, del_flg: 0
    });
    dir.name = name;

    return await this.directoryRepository.save(dir)
  }

  async delete(uid: string, id: number) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //queryBuilderでtransction実行する際、第二引数にqueryRunnerを渡す必要がある
      await this.postRepository
        .createQueryBuilder(null, queryRunner)
        .update(Post)
        .set({ del_flg: 1 })
        .where('directoryId = :directoryId', { directoryId: id })
        .andWhere('uid = :uid', { uid })
        .execute();

      await this.directoryRepository
        .createQueryBuilder(null, queryRunner)
        .update(Directory)
        .set({ del_flg: 1 })
        .where('id = :id', { id })
        .andWhere('uid = :uid', { uid })
        .execute();

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

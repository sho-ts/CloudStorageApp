import { Injectable } from '@nestjs/common';
import { Directory } from './../entities/directory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>
  ) { }

  async create(uid: string, dirName: string) {
    const dir = new Directory();
    dir.name = dirName;
    dir.uid = uid;

    return await this.directoryRepository.insert(dir);
  }

  async read(uid: string, id: number) {
    const dir = await this.directoryRepository
      .createQueryBuilder()
      .select('*')
      .where('id = :id', { id })
      .andWhere('uid = :uid', { uid })
      .andWhere('del_flg = :del_flg', { del_flg: 0 })
      .execute();

    return dir[0] ?? null;
  }

  async readAll(uid: string) {
    return await this.directoryRepository
      .createQueryBuilder()
      .select('*')
      .where('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .execute();
  }

  async update(uid: string, name: string, id: number) {
    return await this.directoryRepository
      .createQueryBuilder()
      .update(Directory)
      .set({ name })
      .where('id = :id', { id })
      .andWhere('del_flg = :del_flg', { del_flg: 0 })
      .andWhere('uid = :uid', { uid })
      .execute();
  }

  async delete(uid: string, id: number) {
    return await this.directoryRepository
      .createQueryBuilder()
      .update(Directory)
      .set({ del_flg: 1 })
      .where('id = :id', { id })
      .andWhere('uid = :uid', { uid })
      .execute();
  }
}

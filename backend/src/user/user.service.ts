import { Injectable } from '@nestjs/common';
import { User } from '@entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create({ cognitoId, name }: {
    cognitoId: string,
    name: string
  }) {
    const registeredUser = await this.userRepository.findOne({
      cognito_id: cognitoId,
      del_flg: 0
    })

    // 既に登録済みの場合は新規作成せずにユーザー情報を返す
    if(registeredUser) {
      return registeredUser;
    }

    const user = this.userRepository.create({
      name,
      cognito_id: cognitoId
    });

    return await this.userRepository.save(user);
  }

  async read({ cognitoId, uid }: {
    cognitoId: string,
    uid?: number
  }) {
    // uidを指定した場合は指定ユーザーを、そうでない場合はログイン中のユーザー情報を返す
    return uid ?
      await this.userRepository.findOne({
        id: uid,
        del_flg: 0
      }) :
      await this.userRepository.findOne({
        cognito_id: cognitoId,
        del_flg: 0
      });
  }

  async updateProfile({ cognitoId, name }: {
    cognitoId: string,
    name: string,
  }) {
    const user = await this.userRepository.findOne({
      cognito_id: cognitoId,
      del_flg: 0
    });

    user.name = name;

    return await this.userRepository.save(user);
  }

  async updatePlan({ cognitoId, plan }: {
    cognitoId: string,
    plan: number,
  }) {
    const user = await this.userRepository.findOne({
      cognito_id: cognitoId,
      del_flg: 0
    });

    user.plan = plan;

    return await this.userRepository.save(user);
  }

  async updateStorage({ cognitoId, fileSize, type }: {
    cognitoId: string,
    fileSize: number,
    type: 'inc' | 'dec'
  }) {
    const user = await this.userRepository.findOne({
      cognito_id: cognitoId,
      del_flg: 0
    });

    switch (type) {
      case 'inc':
        user.storage = user.storage + fileSize;
        break;
      case 'dec':
        user.storage = user.storage - fileSize;
        break;
      default:
        user.storage = user.storage + fileSize;
        break;
    }

    return await this.userRepository.save(user);
  }

  async delete({ cognitoId }: {
    cognitoId: string
  }) {
    const user = await this.userRepository.findOne({
      cognito_id: cognitoId,
      del_flg: 0
    });

    user.del_flg = 1;

    return await this.userRepository.save(user);
  }
}
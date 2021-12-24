import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from './../entities/user.entity';
import { Directory } from './../entities/directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service'

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Directory])],
  providers: [UserService, AuthService],
})
export class UserModule {}

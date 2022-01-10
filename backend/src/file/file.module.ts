import { Module } from '@nestjs/common';
import { User } from './../entities/user.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AuthService } from './../auth/auth.service'
import { UserService } from './../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FileController],
  providers: [FileService, AuthService, UserService],
})
export class FileModule { }

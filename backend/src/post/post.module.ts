import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { Post } from './../entities/post.entity';
import { User } from './../entities/user.entity';
import { Directory } from './../entities/directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service'

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post, Directory, User])],
  providers: [PostService, UserService, AuthService],
})
export class PostModule { }

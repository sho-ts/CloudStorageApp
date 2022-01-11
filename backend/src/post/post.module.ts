import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@entity/post.entity';
import { User } from '@entity/user.entity';
import { Directory } from '@entity/directory.entity';
import { PostController } from '@/post/post.controller';
import { PostService } from '@/post/post.service';
import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service'

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post, Directory, User])],
  providers: [PostService, UserService, AuthService],
})
export class PostModule { }

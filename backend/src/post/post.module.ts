import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { Post } from './../entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
})
export class PostModule {}

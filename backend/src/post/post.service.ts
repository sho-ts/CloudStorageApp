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

  create(description: string) {
    const post = new Post();
    post.description = description;

    return this.postRepository.insert(post);
  }

  read(id: number) {
    return this.postRepository.findOne({ id });
  }

  readAll() {
    return this.postRepository.find();
  }

  update(description: string, id: number) {
    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ description })
      .where('id = :id', { id })
      .execute();
    }
}

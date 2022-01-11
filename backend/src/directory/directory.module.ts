import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@entity/post.entity';
import { Directory } from '@entity/directory.entity';
import { DirectoryController } from '@/directory/directory.controller';
import { DirectoryService } from '@/directory/directory.service';
import { AuthService } from '@/auth/auth.service'

@Module({
  controllers: [DirectoryController],
  imports: [TypeOrmModule.forFeature([Post, Directory])],
  providers: [DirectoryService, AuthService]
})
export class DirectoryModule { }

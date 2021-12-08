import { Module } from '@nestjs/common';
import { DirectoryController } from './directory.controller';
import { Directory } from './../entities/directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoryService } from './directory.service';
import { AuthService } from './../auth/auth.service'

@Module({
  controllers: [DirectoryController],
  imports: [TypeOrmModule.forFeature([Directory])],
  providers: [DirectoryService, AuthService]
})
export class DirectoryModule {}

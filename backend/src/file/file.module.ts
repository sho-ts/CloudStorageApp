import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '@entity/user.entity';
import { FileController } from '@/file/file.controller';
import { FileService } from '@/file/file.service';
import { AuthService } from '@/auth/auth.service'
import { UserService } from '@/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FileController],
  providers: [FileService, AuthService, UserService],
})
export class FileModule { }

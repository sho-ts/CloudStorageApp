import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AuthService } from './../auth/auth.service'

@Module({
  controllers: [FileController],
  providers: [FileService, AuthService],
})
export class FileModule {}

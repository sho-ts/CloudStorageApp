import { Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';
import { User } from '@entity/user.entity';
import { Directory } from '@entity/directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service'

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Directory])],
  providers: [UserService, AuthService],
})
export class UserModule {}

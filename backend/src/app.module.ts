import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [
        'dist/entities/**/*.entity.js'
      ],
      migrations: [
        "dist/migration/**/*.js"
      ],
      /** ↓本番環境では使用しない(https://docs.nestjs.com/techniques/database) */
      synchronize: true,
    }),
    PostModule,
    FileModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

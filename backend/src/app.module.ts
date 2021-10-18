import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [
        'dist/model/**/*.js'
      ],
      migrations: [
        "dist/migration/**/*.js"
    ],
      /** ↓本番環境では使用しない(https://docs.nestjs.com/techniques/database) */
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

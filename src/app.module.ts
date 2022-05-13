import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostsModule} from "./posts/posts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //entities: [__dirname + '/../**/*.entity{.ts,.js}', 'dist/**/*.entity.js'],
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

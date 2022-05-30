import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostsModule} from "./posts/posts.module";
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SubscribersGrpcModule } from './subscribers-grpc/subscribers-grpc.module';
import { CommentsModule } from './comments/comments.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductsModule } from './products/products.module';
import { EmailModule } from './email/email.module';
import {ScheduleModule} from "@nestjs/schedule";
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';
import { ChatModule } from './chat/chat.module';
import {GraphQLModule} from "@nestjs/graphql";
import { join } from 'path';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().empty(''),
        DB_DATABASE: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        S3_ENDPOINT: Joi.string().empty(''),
        S3_DEFAULT_REGION: Joi.string().required(),
        S3_ACCESS_KEY_ID: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_BUCKET: Joi.string().required(),
        SUBSCRIBERS_SERVICE_HOST: Joi.string(),
        SUBSCRIBERS_SERVICE_PORT: Joi.number(),
        RABBITMQ_USER: Joi.string(),
        RABBITMQ_PASSWORD: Joi.string(),
        RABBITMQ_HOST: Joi.string(),
        RABBITMQ_QUEUE_NAME: Joi.string(),
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.string(),
        REDIS_USERNAME: Joi.string(),
        REDIS_PASSWORD: Joi.string(),
        GRAPHQL_PLAYGROUND: Joi.number(),
      }),
      validationOptions: {
        abortEarly: true,
      },
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
        namingStrategy: new SnakeNamingStrategy()
      })
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true
      })
    }),
    ScheduleModule.forRoot(),
    PostsModule,
    UsersModule,
    AuthenticationModule,
    CategoriesModule,
    FilesModule,
    SubscribersModule,
    SubscribersGrpcModule,
    CommentsModule,
    ProductCategoriesModule,
    ProductsModule,
    EmailModule,
    EmailSchedulingModule,
    ChatModule,
    PubSubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {CacheModule, Module} from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import Post from "./entities/post.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        /*CacheModule.register({
            ttl: 5,
            max: 100
        }),*/
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                auth_pass: configService.get('REDIS_PASSWORD'),
                ttl: 120
            }),
        }),
        TypeOrmModule.forFeature([Post])
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
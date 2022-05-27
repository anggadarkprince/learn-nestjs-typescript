import {CacheModule, Module} from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import Post from "./entities/post.entity";

@Module({
    imports: [
        CacheModule.register({
            ttl: 5,
            max: 100
        }),
        TypeOrmModule.forFeature([Post])
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
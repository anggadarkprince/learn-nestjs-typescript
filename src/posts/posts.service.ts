import {CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
import Post from './entities/post.entity';
import UpdatePostDto from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, MoreThan, Repository} from "typeorm";
import PostNotFoundException from "./exceptions/post-not-found.exception";
import User from "../users/entities/user.entity";
import {GET_POSTS_CACHE_KEY} from "./constants/post-cache-key.constant";
import { Cache } from 'cache-manager';

@Injectable()
export default class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async clearCache() {
        const keys: string[] = await this.cacheManager.store.keys();
        keys.forEach((key) => {
            if (key.startsWith(GET_POSTS_CACHE_KEY)) {
                this.cacheManager.del(key);
            }
        })
    }

    async getAllPosts(page: number = 1, limit: number = 10, startId?: number) {
        const where: FindManyOptions<Post>['where'] = {};
        let separateCount = 0;
        if (startId) {
            where.id = MoreThan(startId);
            separateCount = await this.postsRepository.count();
        }

        const offset = (page - 1) * limit;
        const [items, count] = await this.postsRepository.findAndCount({
            relations: ['author'],
            order: {
                id: 'ASC'
            },
            skip: offset,
            take: limit
        });

        return {
            items,
            countData: items.length,
            totalData: startId ? separateCount : count,
            currentPage: Number(page),
            totalPage: Math.ceil((startId ? separateCount : count) / limit)
        }
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id, { relations: ['author']});
        if (post) {
            return post;
        }
        throw new PostNotFoundException(id);
    }

    async createPost(post: CreatePostDto, user: User) {
        const newPost = await this.postsRepository.create({
            ...post,
            author: user
        });
        await this.postsRepository.save(newPost);

        await this.clearCache();

        return newPost;
    }

    async updatePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOne(id, { relations: ['author']});
        if (updatedPost) {
            await this.clearCache();

            return updatedPost;
        }
        throw new PostNotFoundException(id);
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new PostNotFoundException(id);
        }
        await this.clearCache();
    }
}
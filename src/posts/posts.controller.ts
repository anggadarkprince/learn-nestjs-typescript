import {
    Body, CacheInterceptor, CacheKey, CacheTTL,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import FindOneParams from "../utils/find-one-params";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {PaginationParams} from "../utils/types/pagination-params";
import {GET_POSTS_CACHE_KEY} from "./constants/post-cache-key.constant";
import {HttpCacheInterceptor} from "./interceptors/http-cache.interceptor";

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    //@UseInterceptors(CacheInterceptor)
    @UseInterceptors(HttpCacheInterceptor)
    @CacheKey(GET_POSTS_CACHE_KEY)
    @CacheTTL(120)
    getPosts(
        @Query('search') search: string,
        @Query() { page, limit, startId }: PaginationParams
    ) {
        if (search) {
            //return this.postsService.searchForPosts(search, page, limit, startId);
        }
        return this.postsService.getPosts(page, limit, startId);
    }

    @Get(':id')
    getPostById(@Param() { id }: FindOneParams) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
        return this.postsService.createPost(post, req.user);
    }

    @Put(':id')
    @UseGuards(JwtAuthenticationGuard)
    async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    @UseGuards(JwtAuthenticationGuard)
    async deletePost(@Param() { id }: FindOneParams) {
        return this.postsService.deletePost(Number(id));
    }
}
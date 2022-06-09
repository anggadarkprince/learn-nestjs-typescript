import {
    Body, CacheInterceptor, CacheKey, CacheTTL,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param, ParseIntPipe,
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
import FindOneParams from "../utils/types/find-one-params";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {PaginationParams} from "../utils/types/pagination-params";
import {GET_POSTS_CACHE_KEY} from "./constants/post-cache-key.constant";
import {HttpCacheInterceptor} from "./interceptors/http-cache.interceptor";
import JwtTwoFactorGuard from "../authentication/guards/jwt-two-factor.guard";
import {EmailConfirmationGuard} from "../email-confirmation/guards/email-confirmation.guard";
import RoleGuard from "../users/guards/role.guard";
import Role from "../users/enums/role.enum";
import {ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Posts')
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
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a post that exists in the database',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'A post has been successfully fetched',
        type: Post
    })
    @ApiResponse({
        status: 404,
        description: 'A post with given id does not exist.'
    })
    //@ApiNotFoundResponse()
    getPostById(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(EmailConfirmationGuard)
    @UseGuards(JwtTwoFactorGuard)
    async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
        return this.postsService.createPost(post, req.user);
    }

    @Put(':id')
    @UseGuards(JwtAuthenticationGuard)
    async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    @UseGuards(RoleGuard(Role.Admin))
    async deletePost(@Param() { id }: FindOneParams) {
        return this.postsService.deletePost(Number(id));
    }
}
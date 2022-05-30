import {Args, Context, Info, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Post} from './models/post.model';
import PostsService from './posts.service';
import {UseGuards} from "@nestjs/common";
import {GraphqlJwtAuthGuard} from "../authentication/guards/graphql-jwt-auth.guard";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {CreatePostInput} from "./inputs/post.input";
import {GraphQLResolveInfo} from "graphql";
import {parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType} from "graphql-parse-resolve-info";

@Resolver(() => Post)
export class PostsResolver {
    constructor(private postsService: PostsService) {
    }

    @Query(() => [Post])
    async posts(@Info() info: GraphQLResolveInfo) {
        const parsedInfo = parseResolveInfo(info) as ResolveTree;
        const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
            parsedInfo,
            info.returnType
        );

        const posts = 'author' in simplifiedInfo.fields
            ? await this.postsService.getPostsWithAuthors()
            : await this.postsService.getPosts();

        return posts.items;
    }

    @Mutation(() => Post)
    @UseGuards(GraphqlJwtAuthGuard)
    async createPost(
        @Args('input') createPostInput: CreatePostInput,
        @Context() context: { req: RequestWithUser },
    ) {
        return this.postsService.createPost(createPostInput, context.req.user);
    }
}
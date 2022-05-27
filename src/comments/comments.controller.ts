import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import CreateCommentDto from "./dto/create-comment.dto";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {CreateCommentCommand} from "./commands/implementations/create-comment.command";
import GetCommentsDto from "./dto/get-comments.dto";
import {GetCommentsQuery} from "./queries/implementations/get-comments.query";

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {

    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createComment(@Body() comment: CreateCommentDto, @Req() req: RequestWithUser) {
        const user = req.user;

        // can be moved into a service
        return this.commandBus.execute(
            new CreateCommentCommand(comment, user)
        )
    }

    @Get()
    async getComments(@Query() {postId}: GetCommentsDto) {

        // can be moved into a service
        return this.queryBus.execute(
            new GetCommentsQuery(postId)
        )
    }
}

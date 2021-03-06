import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetCommentsQuery} from '../implementations/get-comments.query';
import {InjectRepository} from '@nestjs/typeorm';
import Comment from '../../entities/comment.entity';
import {Repository} from 'typeorm';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
    constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>) {
    }

    async execute(query: GetCommentsQuery) {
        if (query.postId) {
            return this.commentsRepository.find({
                post: {
                    id: query.postId
                }
            });
        }
        return this.commentsRepository.find();
    }
}
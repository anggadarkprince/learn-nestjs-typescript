import {Field, Int, ObjectType} from '@nestjs/graphql';
import User from "../../users/entities/user.entity";
import {Author} from "./author.model";

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field(() => String)
    content: string;

    @Field(() => Author)
    author?: Author
}
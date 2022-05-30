import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Author} from "./author.model";
import {User} from "../../users/models/user.model";

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field(() => String)
    content: string;

    //@Field(() => Author)
    //author?: Author

    @Field(() => Int)
    authorId: number;

    @Field()
    author: User;

    @Field()
    createdAt: Date;

    @Field({nullable: true})
    scheduledDate?: Date;
}
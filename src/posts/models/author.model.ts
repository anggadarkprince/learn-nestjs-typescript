import {Field, Int, ObjectType} from '@nestjs/graphql';
import User from "../../users/entities/user.entity";

@ObjectType()
export class Author {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    email: string;

    @Field(() => String)
    name: string;
}
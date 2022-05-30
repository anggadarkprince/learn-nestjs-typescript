import {InputType, Field} from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field()
    title: string;

    @Field(() => String)
    content: string;

    @Field({nullable: true})
    scheduledDate?: Date;
}
import {IsString, IsNotEmpty, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import ObjectWithId from "../../utils/types/object-with-id";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @ValidateNested()
    @Type(() => ObjectWithId)
    post: ObjectWithId;
}

export default CreateCommentDto;
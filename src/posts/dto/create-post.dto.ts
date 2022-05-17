import {IsString, IsNotEmpty, IsOptional} from 'class-validator';

class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  categories: object[];
}

export default CreatePostDto;
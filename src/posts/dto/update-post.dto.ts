import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  title: string;
}

export default UpdatePostDto;
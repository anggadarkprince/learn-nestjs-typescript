import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;
}

export default RegisterDto;
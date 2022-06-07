import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {FileInterceptor} from "@nestjs/platform-express";
import {Express, Response} from 'express';
import FindOneParams from "../utils/types/find-one-params";
import LocalFilesInterceptor from "../utils/interceptors/local-file.interceptor";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
    }

    @Delete('avatar')
    @UseGuards(JwtAuthenticationGuard)
    async deleteAvatar(@Req() request: RequestWithUser) {
        return this.usersService.deleteAvatarWithQueryRunner(request.user.id);
    }

    @Post('cover')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addCover(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addCover(request.user.id, file.buffer, file.originalname);
    }

    @Post('status')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file',
        path: '/statuses',
        fileFilter: (request, file, callback) => {
            if (!file.mimetype.includes('image')) {
                return callback(new BadRequestException('Provide a valid image'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: Math.pow(1024, 2) // 1MB
        }
    }))
    async addImageStatus(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return this.usersService.addStatus(request.user.id, {
            path: file.path,
            filename: file.originalname,
            mimetype: file.mimetype
        });
    }

    @Get('files')
    @UseGuards(JwtAuthenticationGuard)
    async getAllPrivateFiles(@Req() request: RequestWithUser) {
        return this.usersService.getAllPrivateFiles(request.user.id);
    }

    @Post('files')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addPrivateFile(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addPrivateFile(request.user.id, file.buffer, file.originalname);
    }

    @Get('files/:id')
    @UseGuards(JwtAuthenticationGuard)
    async getPrivateFile(@Req() request: RequestWithUser, @Param() { id }: FindOneParams, @Res() res: Response) {
        const file = await this.usersService.getPrivateFile(request.user.id, Number(id));
        file.stream.pipe(res);
    }
}

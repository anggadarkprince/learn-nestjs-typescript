import {
    BadRequestException,
    Controller,
    Delete,
    Get, NotFoundException,
    Param, ParseIntPipe,
    Post,
    Req,
    Res, StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import {FileInterceptor} from "@nestjs/platform-express";
import {Express, Response, Request} from 'express';
import FindOneParams from "../utils/types/find-one-params";
import LocalFilesInterceptor from "../utils/interceptors/local-file.interceptor";
import {LocalFilesService} from "../local-files/local-files.service";
import {join} from 'path';
import * as etag from 'etag';
import * as filesystem from 'fs';
import * as util from 'util';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import FileUploadDto from "./dto/file-upload.dto";

const readFile = util.promisify(filesystem.readFile);

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly localFilesService: LocalFilesService) {
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
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'A new avatar for the user',
        type: FileUploadDto,
    })
    async addImageStatus(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.addStatus(request.user.id, {
            path: file.path,
            filename: file.originalname,
            mimetype: file.mimetype
        });
    }

    @Get(':userId/status')
    async getStatus(
        @Param('userId', ParseIntPipe) userId: number,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        const user = await this.usersService.getById(userId);
        const fileId = user.status;
        if (!fileId) {
            throw new NotFoundException();
        }
        const fileMetadata = await this.localFilesService.getFileById(user.status.id);

        const pathOnDisk = join(process.cwd(), fileMetadata.path);

        const file = await readFile(pathOnDisk);

        //const tag = `W/"file-id-${fileId}"`; // weak etag with custom id
        const tag = etag(file);

        response.set({
            'Content-Disposition': `inline; filename="${fileMetadata.filename}"`,
            'Content-Type': fileMetadata.mimetype,
            ETag: etag(file)
        });

        if (request.headers['if-none-match'] === tag) {
            response.status(304)
            return;
        }

        return new StreamableFile(file);
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
    async getPrivateFile(@Req() request: RequestWithUser, @Param() {id}: FindOneParams, @Res() res: Response) {
        const file = await this.usersService.getPrivateFile(request.user.id, Number(id));
        file.stream.pipe(res);
    }
}

import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Res,
    StreamableFile,
    UseInterceptors
} from '@nestjs/common';
import {DatabaseFilesService} from "./database-files.service";
import {Readable} from "stream";
import {Response} from 'express';
import * as mime from 'mime-types';

@Controller('database-files')
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFilesController {
    constructor(private readonly databaseFilesService: DatabaseFilesService) {
    }

    @Get(':id')
    async getDatabaseFileById(
        @Param('id', ParseIntPipe) id: number,
        @Res({passthrough: true}) response: Response
    ) {
        const file = await this.databaseFilesService.getFileById(id);

        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': mime.lookup(file.filename) || 'application/octet-stream'
        })

        return new StreamableFile(stream);
    }
}

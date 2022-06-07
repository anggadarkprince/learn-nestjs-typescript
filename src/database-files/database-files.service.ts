import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import DatabaseFile from "./entities/database-file.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class DatabaseFilesService {
    constructor(
        @InjectRepository(DatabaseFile)
        private databaseFilesRepository: Repository<DatabaseFile>,
    ) {
    }

    async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
        const newFile = await this.databaseFilesRepository.create({
            filename,
            data: dataBuffer
        })
        await this.databaseFilesRepository.save(newFile);
        return newFile;
    }

    async getFileById(fileId: number) {
        const file = await this.databaseFilesRepository.findOne(fileId);
        if (!file) {
            throw new NotFoundException();
        }
        return file;
    }
}

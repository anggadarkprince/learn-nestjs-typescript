import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import PublicFile from "./entities/public-file.entity";
import PrivateFile from "./entities/private-file.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicFile, PrivateFile]),
  ],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}

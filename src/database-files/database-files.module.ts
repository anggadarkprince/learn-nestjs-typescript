import { Module } from '@nestjs/common';
import { DatabaseFilesService } from './database-files.service';
import { DatabaseFilesController } from './database-files.controller';
import DatabaseFile from "./entities/database-file.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  providers: [DatabaseFilesService],
  controllers: [DatabaseFilesController],
  exports: [DatabaseFilesService],
})
export class DatabaseFilesModule {}

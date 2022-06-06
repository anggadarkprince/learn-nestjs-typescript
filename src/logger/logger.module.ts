import { Module } from '@nestjs/common';
import LogsService from "./logs.service";
import {ConfigModule} from "@nestjs/config";
import CustomLogger from "./custom-logger";
import {TypeOrmModule} from "@nestjs/typeorm";
import Log from "./entities/log.entity";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
    providers: [CustomLogger, LogsService],
    exports: [CustomLogger],
})
export class LoggerModule {}

import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import DatabaseLogger from "./database.logger";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                //entities: [__dirname + '/../**/*.entity{.ts,.js}', 'dist/**/*.entity.js'],
                autoLoadEntities: true,
                synchronize: true,
                namingStrategy: new SnakeNamingStrategy(),
                logger: new DatabaseLogger(),
            })
        }),
    ]
})
export class DatabaseModule {}

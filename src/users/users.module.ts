import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "./entities/user.entity";
import Address from "./entities/address.entity";
import {FilesModule} from "../files/files.module";
import { UsersController } from './users.controller';
import {StripeModule} from "../stripe/stripe.module";
import {DatabaseFilesModule} from "../database-files/database-files.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Address]),
        FilesModule,
        DatabaseFilesModule,
        StripeModule
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {
}

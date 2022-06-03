import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import {ConfigModule} from "@nestjs/config";
import {EmailModule} from "../email/email.module";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import { EmailConfirmationController } from './email-confirmation.controller';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}

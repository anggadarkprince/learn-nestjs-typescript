import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    UsersModule
  ],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}

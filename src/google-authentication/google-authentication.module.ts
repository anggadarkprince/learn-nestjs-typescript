import { Module } from '@nestjs/common';
import { GoogleAuthenticationController } from './google-authentication.controller';
import { GoogleAuthenticationService } from './google-authentication.service';
import {AuthenticationModule} from "../authentication/authentication.module";
import {UsersModule} from "../users/users.module";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [ConfigModule, UsersModule, AuthenticationModule, JwtModule.register({})],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService]
})
export class GoogleAuthenticationModule {}

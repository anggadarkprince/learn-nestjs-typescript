import {Module} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {AuthenticationController} from './authentication.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtRefreshTokenStrategy} from "./strategies/jwt-refresh-token.strategy";
import {TwoFactorAuthenticationController} from "./two-factor/two-factor-authentication.controller";
import {TwoFactorAuthenticationService} from "./two-factor/two-factor-authentication.service";
import {JwtTwoFactorStrategy} from "./strategies/jwt-two-factor.strategy";
import {EmailConfirmationModule} from "../email-confirmation/email-confirmation.module";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
                },
            }),
        }),
        EmailConfirmationModule
    ],
    providers: [
        AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy,
        TwoFactorAuthenticationService, JwtTwoFactorStrategy
    ],
    controllers: [AuthenticationController, TwoFactorAuthenticationController],
    exports: [AuthenticationService]
})
export class AuthenticationModule {
}

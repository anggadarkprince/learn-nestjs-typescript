import {Injectable} from '@nestjs/common';
import {authenticator} from 'otplib';
import User from '../../users/entities/user.entity';
import {UsersService} from '../../users/users.service';
import {ConfigService} from "@nestjs/config";
import {toFileStream} from "qrcode";
import {Response} from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {
    }

    public async generateTwoFactorAuthenticationSecret(user: User) {
        const secret = authenticator.generateSecret();

        const otpAuthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);

        await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

        return {
            secret,
            otpAuthUrl
        }
    }

    public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorAuthenticationSecret
        })
    }

    public async pipeQrCodeStream(stream: Response, otpAuthUrl: string) {
        return toFileStream(stream, otpAuthUrl);
    }
}
import {
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    Body,
    UnauthorizedException, HttpCode,
} from '@nestjs/common';
import {TwoFactorAuthenticationService} from './two-factor-authentication.service';
import {Response} from 'express';
import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import RequestWithUser from '../interfaces/request-with-user.interface';
import {UsersService} from '../../users/users.service';
import {TwoFactorAuthenticationCodeDto} from './dto/two-factor-authentication-code.dto';
import {AuthenticationService} from '../authentication.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
        private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
        private readonly usersService: UsersService,
        private readonly authenticationService: AuthenticationService
    ) {
    }

    @Post('generate')
    @UseGuards(JwtAuthenticationGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
        const {otpAuthUrl} = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

        return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpAuthUrl);
    }

    @Post('turn-on')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async turnOnTwoFactorAuthentication(
        @Req() request: RequestWithUser,
        @Body() {twoFactorAuthenticationCode}: TwoFactorAuthenticationCodeDto
    ) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
    }

    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    async authenticate(
        @Req() request: RequestWithUser,
        @Body() {twoFactorAuthenticationCode}: TwoFactorAuthenticationCodeDto
    ) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
            twoFactorAuthenticationCode, request.user
        );
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }

        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);

        request.res.setHeader('Set-Cookie', [accessTokenCookie]);

        return request.user;
    }
}
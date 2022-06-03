import {Body, ClassSerializerInterceptor, Controller, Post, Req, UseInterceptors} from '@nestjs/common';
import {GoogleAuthenticationService} from "./google-authentication.service";
import TokenVerificationDto from "./dto/token-verification.dto";
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService,
        private readonly jwtService: JwtService,
    ) {
    }

    @Post()
    async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
        const credentials: any = this.jwtService.decode(tokenData.token)!!;
        console.log(credentials)
        const {
            accessTokenCookie,
            refreshTokenCookie,
            user
        } = await this.googleAuthenticationService.authenticateUserData(credentials.name, credentials.email);

        /*
        const {
            accessTokenCookie,
            refreshTokenCookie,
            user
        } = await this.googleAuthenticationService.authenticate(tokenData.token);
         */

        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        return user;
    }
}

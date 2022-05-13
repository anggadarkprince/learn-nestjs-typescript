import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import {AuthenticationService} from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import {LocalAuthenticationGuard} from "./guards/local-authentication.guard";
import RequestWithUser from "./interfaces/request-with-user.interface";
import JwtAuthenticationGuard from "./guards/jwt-authentication.guard";

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser, @Res({ passthrough: true }) response: Response) {
        const user = request.user;

        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);

        user.password = undefined;

        // return response.send(user); if not passing { passthrough: true } then use this response

        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('me')
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}

import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {Response} from 'express';
import {AuthenticationService} from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import {LocalAuthenticationGuard} from "./guards/local-authentication.guard";
import RequestWithUser from "./interfaces/request-with-user.interface";
import JwtAuthenticationGuard from "./guards/jwt-authentication.guard";
import {UsersService} from "../users/users.service";
import JwtRefreshGuard from "./guards/jwt-refresh.guard";

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser/*, @Res({ passthrough: true }) response: Response*/) {
        const user = request.user;

        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const {
            cookie: refreshTokenCookie,
            token: refreshToken
        } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        // response.setHeader('Set-Cookie', cookie);
        // return response.send(user); if not passing { passthrough: true } then use this response

        return user;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    refresh(@Req() request: RequestWithUser) {
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id);

        request.res.setHeader('Set-Cookie', accessTokenCookie);

        return request.user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    @HttpCode(200)
    async logout(@Req() request: RequestWithUser/*, @Res() response: Response*/) {
        //response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        //return response.sendStatus(200);

        await this.usersService.removeRefreshToken(request.user.id);
        request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('me')
    authenticate(@Req() request: RequestWithUser) {
        return request.user;
    }
}

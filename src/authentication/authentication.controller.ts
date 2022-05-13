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

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser/*, @Res({ passthrough: true }) response: Response*/) {
        const user = request.user;

        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        request.res.setHeader('Set-Cookie', cookie);

        // response.setHeader('Set-Cookie', cookie);

        // return response.send(user); if not passing { passthrough: true } then use this response

        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    @HttpCode(200)
    async logOut(@Req() request: RequestWithUser/*, @Res() response: Response*/) {
        //response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        //return response.sendStatus(200);

        request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('me')
    authenticate(@Req() request: RequestWithUser) {
        return request.user;
    }
}

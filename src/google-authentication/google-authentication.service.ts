import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";
import {google, Auth} from 'googleapis';
import {AuthenticationService} from "../authentication/authentication.service";
import User from "../users/entities/user.entity";

@Injectable()
export class GoogleAuthenticationService {
    oauthClient: Auth.OAuth2Client;

    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly authenticationService: AuthenticationService
    ) {
        const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async getUserData(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;

        this.oauthClient.setCredentials({
            access_token: token
        })

        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient
        });

        return userInfoResponse.data;
    }

    async getCookiesForUser(user: User) {
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const {
            cookie: refreshTokenCookie,
            token: refreshToken
        } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

        return {
            accessTokenCookie,
            refreshTokenCookie
        }
    }

    async handleRegisteredUser(user: User) {
        if (!user.isRegisteredWithGoogle) {
            throw new UnauthorizedException('The user is registered with password');
        }

        const {
            accessTokenCookie,
            refreshTokenCookie
        } = await this.getCookiesForUser(user);

        return {
            accessTokenCookie,
            refreshTokenCookie,
            user
        }
    }

    async registerUser(token: string, email: string) {
        const userData = await this.getUserData(token);
        const name = userData.name;

        const user = await this.usersService.createWithGoogle(email, name);

        return this.handleRegisteredUser(user);
    }

    async registerUserDirect(name: string, email: string) {
        const user = await this.usersService.createWithGoogle(email, name);

        return this.handleRegisteredUser(user);
    }

    async authenticate(token: string) {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);

        const email = tokenInfo.email;

        try {
            const user = await this.usersService.getByEmail(email);

            return this.handleRegisteredUser(user);
        } catch (error) {
            if (error.status !== 404) {
                throw new error;
            }

            return this.registerUser(token, email);
        }
    }

    async authenticateUserData(name: string, email: string) {
        try {
            const user = await this.usersService.getByEmail(email);

            // handle registered user
            // 1. user has flag registered with google -> sign in
            // 2. user doesn't has the flag -> response unauthorized, they should login with password
            return this.handleRegisteredUser(user);
        } catch (error) {
            // if not found then create new user and set flag as registered with google
            if (error.status !== 404) {
                throw new error;
            }

            return this.registerUserDirect(name, email);
        }
    }
}

import {AuthenticationService} from "../authentication.service";
import {UsersService} from "../../users/users.service";
import {Repository} from "typeorm";
import User from "../../users/entities/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Test} from "@nestjs/testing";
import {UsersModule} from "../../users/users.module";
import * as Joi from "joi";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';

describe('The AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    beforeEach(async () => {
        /*authenticationService = new AuthenticationService(
            new UsersService(
                new Repository<User>()
            ),
            new JwtService({
                secretOrPrivateKey: 'Secret key'
            }),
            new ConfigService()
        );*/

        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                AuthenticationService,
                {
                    provide: ConfigService,
                    useValue: mockedConfigService
                },
                {
                    provide: JwtService,
                    useValue: mockedJwtService
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                }
            ],
        }).compile();

        authenticationService = await module.get<AuthenticationService>(AuthenticationService);
    })
    describe('when creating a cookie', () => {
        it('should return a string', () => {
            const userId = 1;
            expect(typeof authenticationService.getCookieWithJwtToken(userId)).toEqual('string')
        })
    })
});
import {Module} from '@nestjs/common';
import {SmsController} from './sms.controller';
import {SmsService} from './sms.service';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [SmsController],
    providers: [SmsService],
    exports: [SmsService]
})
export class SmsModule {
}

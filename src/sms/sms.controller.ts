import {BadRequestException, Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {SmsService} from "./sms.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";
import CheckVerificationCodeDto from "./dto/check-verification-code.dto";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {
    }

    @Post('initiate-verification')
    @UseGuards(JwtAuthenticationGuard)
    async initiatePhoneNumberVerification(@Req() request: RequestWithUser) {
        if (request.user.isPhoneNumberConfirmed) {
            throw new BadRequestException('Phone number already confirmed');
        }
        await this.smsService.initiatePhoneNumberVerification(request.user.phoneNumber);
    }

    @Post('check-verification-code')
    @UseGuards(JwtAuthenticationGuard)
    async checkVerificationCode(@Req() request: RequestWithUser, @Body() verificationData: CheckVerificationCodeDto) {
        if (request.user.isPhoneNumberConfirmed) {
            throw new BadRequestException('Phone number already confirmed');
        }
        await this.smsService.confirmPhoneNumber(request.user.id, request.user.phoneNumber, verificationData.code);
    }
}

import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {EmailConfirmationService} from "./email-confirmation.service";
import ConfirmEmailDto from "./dto/confirm-emai.dto";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";

@Controller('email-confirmation')
export class EmailConfirmationController {
    constructor(private readonly emailConfirmationService: EmailConfirmationService) {
    }

    @Post('confirm')
    async confirm(@Body() confirmationData: ConfirmEmailDto) {
        const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
        await this.emailConfirmationService.confirmEmail(email);
    }

    @Post('resend-confirmation-link')
    @UseGuards(JwtAuthenticationGuard)
    async resendConfirmationLink(@Req() request: RequestWithUser) {
        await this.emailConfirmationService.resendConfirmationLink(request.user.id);
    }
}

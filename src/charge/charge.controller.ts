import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {StripeService} from "../stripe/stripe.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import CreateChargeDto from "./dto/create-charge.dto";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";

@Controller('charge')
export class ChargeController {
    constructor(private readonly stripeService: StripeService) {
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createCharge(@Body() charge: CreateChargeDto, @Req() request: RequestWithUser) {
        return this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
    }
}

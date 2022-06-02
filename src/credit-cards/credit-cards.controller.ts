import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {StripeService} from "../stripe/stripe.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import AddCreditCardDto from "./dto/add-credit-card.dto";
import RequestWithUser from "../authentication/interfaces/request-with-user.interface";

@Controller('credit-cards')
export class CreditCardsController {
    constructor(private readonly stripeService: StripeService) {}

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async addCreditCard(@Body() creditCard: AddCreditCardDto, @Req() request: RequestWithUser) {
        return this.stripeService.attachCreditCard(creditCard.paymentMethodId, request.user.stripeCustomerId);
    }

    @Get()
    @UseGuards(JwtAuthenticationGuard)
    async getCreditCards(@Req() request: RequestWithUser) {
        return this.stripeService.listCreditCards(request.user.stripeCustomerId);
    }
}

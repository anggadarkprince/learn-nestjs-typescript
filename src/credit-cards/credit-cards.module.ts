import { Module } from '@nestjs/common';
import { CreditCardsController } from './credit-cards.controller';
import {StripeModule} from "../stripe/stripe.module";

@Module({
  imports: [StripeModule],
  controllers: [CreditCardsController]
})
export class CreditCardsModule {}

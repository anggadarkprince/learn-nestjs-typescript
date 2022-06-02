import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import {StripeModule} from "../stripe/stripe.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [StripeModule, ConfigModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService]
})
export class SubscriptionModule {}

import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import {TerminusModule} from "@nestjs/terminus";
import {ElasticsearchHealthIndicator} from "./elasticsearch-health-indicator";

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [/*ElasticsearchHealthIndicator*/]
})
export class HealthModule {}

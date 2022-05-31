import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';

@Module({
    controllers: [OptimizeController]
})
export class OptimizeModule {}

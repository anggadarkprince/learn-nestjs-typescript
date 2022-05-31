import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import {BullModule} from "@nestjs/bull";
import {ImageProcessor} from "./image.processor";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'image',
        })
    ],
    controllers: [OptimizeController],
    providers: [ImageProcessor],
})
export class OptimizeModule {}

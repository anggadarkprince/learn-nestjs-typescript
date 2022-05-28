import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {EmailSchedulingService} from "./email-scheduling.service";
import JwtAuthenticationGuard from "../authentication/guards/jwt-authentication.guard";
import EmailScheduleDto from "./dto/email-schedule.dto";

@Controller('email-scheduling')
export class EmailSchedulingController {
    constructor(private readonly emailSchedulingService: EmailSchedulingService) {
    }

    @Post('schedule')
    @UseGuards(JwtAuthenticationGuard)
    async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
        this.emailSchedulingService.scheduleEmail(emailSchedule);
    }
}

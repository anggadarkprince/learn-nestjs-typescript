import { Injectable } from '@nestjs/common';
import {EmailService} from "../email/email.service";
import EmailScheduleDto from "./dto/email-schedule.dto";
import {Cron, Interval, SchedulerRegistry, Timeout} from "@nestjs/schedule";
import {CronJob} from "cron";

@Injectable()
export class EmailSchedulingService {
    constructor(
        private readonly emailService: EmailService,
        private readonly schedulerRegistry: SchedulerRegistry
    ) {}

    @Cron('* * * * * *')
    log1() {
        //console.log('Hello world!');
    }

    @Interval(60000)
    log2() {
        //console.log('Called every minute');
    }

    @Timeout(60000)
    log3() {
        console.log('Called once after a minute');
    }

    scheduleEmail(emailSchedule: EmailScheduleDto) {
        const date = new Date(emailSchedule.date);
        const job = new CronJob(date, () => {
            this.emailService.sendMail({
                to: emailSchedule.recipient,
                subject: emailSchedule.subject,
                text: emailSchedule.content
            })
        });

        this.schedulerRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);
        job.start();
    }
}

import {Injectable} from '@nestjs/common';
import {createTransport} from 'nodemailer';
import {ConfigService} from "@nestjs/config";
import * as Mail from "nodemailer/lib/mailer";

@Injectable()
export class EmailService {
    private nodemailerTransport: Mail;

    constructor(private readonly configService: ConfigService) {
        this.nodemailerTransport = createTransport({
            //service: configService.get('MAIL_SERVICE'),
            host: configService.get('MAIL_HOST'),
            port: configService.get('MAIL_PORT'),
            secure: false,
            requireTLS: true,
            auth: {
                user: configService.get('MAIL_USERNAME'),
                pass: configService.get('MAIL_PASSWORD'),
            }
        });
    }

    sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options);
    }
}

import {Injectable, ConsoleLogger} from '@nestjs/common';
import {ConsoleLoggerOptions} from '@nestjs/common/services/console-logger.service';
import {ConfigService} from '@nestjs/config';
import getLogLevels from '../utils/get-log-levels';
import LogsService from './logs.service';

@Injectable()
class CustomLogger extends ConsoleLogger {
    private readonly logsService: LogsService;

    constructor(
        context: string,
        options: ConsoleLoggerOptions,
        configService: ConfigService,
        logsService: LogsService
    ) {
        const environment = configService.get('NODE_ENV');

        super(
            context,
            {
                ...options,
                logLevels: getLogLevels(environment === 'production')
            }
        );

        this.logsService = logsService;
    }

    log(message: string, context?: string) {
        super.log.apply(this, [message, context]);

        this.logsService.createLog({
            message,
            context: context || this.context || 'NO CONTEXT',
            level: 'log'
        })
    }

    error(message: string, stack?: string, context?: string) {
        super.error.apply(this, [message, stack, context]);

        this.logsService.createLog({
            message,
            context: context || this.context || 'NO CONTEXT',
            level: 'error'
        })
    }

    warn(message: string, context?: string) {
        super.warn.apply(this, [message, context]);

        this.logsService.createLog({
            message,
            context: context || this.context || 'NO CONTEXT',
            level: 'error'
        })
    }

    debug(message: string, context?: string) {
        super.debug.apply(this, [message, context]);

        this.logsService.createLog({
            message,
            context: context || this.context || 'NO CONTEXT',
            level: 'error'
        })
    }

    verbose(message: string, context?: string) {
        super.debug.apply(this, [message, context]);

        this.logsService.createLog({
            message,
            context: context || this.context || 'NO CONTEXT',
            level: 'error'
        })
    }
}

export default CustomLogger;
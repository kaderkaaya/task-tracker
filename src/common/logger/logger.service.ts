import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
    log(message: string, context?: string): void {
        super.log(message, context);
    }
    error(message: string, stack?: string, context?: string): void {
        super.error(message, context, stack);
    }
    warn(message: string, context?: string): void {
        super.warn(message, context)
    }
}
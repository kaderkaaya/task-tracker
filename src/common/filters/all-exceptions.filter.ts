import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        console.log(
            'This is a log of exception object {} from Http Exception Filter !',
        );
        console.log(
            '**************************************************************',
        );
        console.log(exception);
        console.log(
            '*************************************************************',
        );

        response.status(status).json({
            success: false,
            statusCode: status,
            message: exception.message || 'Unexpected',
            error: exception.name,
        });
    }
}
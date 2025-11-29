import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import ApiError from '../errors/api-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status: number;
        let message: string;
        let error: string;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message,
                error = exception.name
        }
        if (exception instanceof ApiError) {
            status = exception.statusCode
            message = exception.message,
                error = exception.name
        }

        response.status(status!).json({
            success: false,
            statusCode: status!,
            message: exception.message,
            error: exception.name
        });
    }
}
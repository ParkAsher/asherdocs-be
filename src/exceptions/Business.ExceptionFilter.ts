import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { BusinessException, ErrorDomain } from './Business.Exception';
import { Response } from 'express';

export interface ApiError {
    domain: ErrorDomain;
    message: string;
    timestamp: Date;
    path: string;
}

@Catch(Error)
export class BusinessExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        let status: HttpStatus;
        let body: ApiError;

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof BusinessException) {
            status = exception.status;
            body = {
                domain: exception.domain,
                message: exception.message,
                timestamp: exception.timestamp,
                path: exception.path,
            };
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            body = new BusinessException('generic', exception.message, status);
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR; // 500
            body = new BusinessException('generic', '서버 내부 에러', status);
        }

        response.status(status).json(body);
    }
}

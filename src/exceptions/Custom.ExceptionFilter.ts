import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
        }

        const status = exception.getStatus();
        const response = exception.getResponse(); // 예외 응답 객체

        const body = {
            path: req.url,
            timestamp: new Date().toISOString(),
            response,
        };

        console.log(body);

        res.status(status).json(body);
    }
}

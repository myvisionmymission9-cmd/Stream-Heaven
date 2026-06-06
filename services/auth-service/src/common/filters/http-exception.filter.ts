import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { requestId?: string }>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof exceptionResponse === 'object' && exceptionResponse !== null
          ? (exceptionResponse as { message?: string | string[] }).message
          : 'Internal server error';

    const code =
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'code' in exceptionResponse
        ? String((exceptionResponse as { code: string }).code)
        : HttpStatus[status] ?? 'INTERNAL_ERROR';

    response.status(status).json({
      statusCode: status,
      code,
      message: Array.isArray(message) ? message.join(', ') : message,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: request.requestId ?? request.headers['x-request-id'] ?? 'unknown',
    });
  }
}

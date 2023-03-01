import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLoggingService } from './custom-logging.service';
import * as process from 'process';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private _httpAdapterHost: HttpAdapterHost,
    private _loggingService: CustomLoggingService,
  ) {
    process.on('uncaughtException', async () => {
      await this._loggingService.error(
        `Service internal error on uncaughtException`,
      );
      process.exit(1);
    });
    process.on('unhandledRejection', async () => {
      await this._loggingService.error(
        `Service internal error on unhandledRejection`,
      );
      process.exit(1);
    });
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this._httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()['message'] ?? exception.getResponse()
        : 'Internal server error';

    const responseBody = {
      statusCode: httpStatus,
      message: message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (exception instanceof HttpException)
      await this._loggingService.error(JSON.stringify(responseBody));

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

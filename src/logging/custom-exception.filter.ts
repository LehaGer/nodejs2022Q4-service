import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { CustomLoggingService } from './custom-logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private _httpAdapterHost: HttpAdapterHost,
    private _loggingService: CustomLoggingService,
  ) {
    process.on('uncaughtException', (error) => {
      this._loggingService.error(error);
      process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
      this._loggingService.error(reason, promise);
      process.exit(1);
    });
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';
    const { httpAdapter } = this._httpAdapterHost;

    const responsePayload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg,
    };

    await this.writeHttpLog(responsePayload);

    httpAdapter.reply(ctx.getResponse(), responsePayload, status);
  }

  private async writeHttpLog(data: Record<string, any>) {
    const LOGS_DIR = resolve('logs/', `${Date.now()}-log.json`);

    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (err) {
      return;
    }
  }
}

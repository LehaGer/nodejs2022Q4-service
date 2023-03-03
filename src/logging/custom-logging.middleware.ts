import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggingService } from './custom-logging.service';

@Injectable()
export class CustomLoggingMiddleware implements NestMiddleware {
  constructor(private _loggingService: CustomLoggingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    await this._loggingService.log(
      JSON.stringify({
        request: {
          url: req.baseUrl,
          method: req.method,
          params: Object.values(req.params),
          query: req.query,
          body: req.body,
        },
        response: {
          statusCode: res.statusCode,
        },
      }),
    );
    next();
  }
}

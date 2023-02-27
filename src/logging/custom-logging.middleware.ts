import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggingService } from './custom-logging.service';

@Injectable()
export class CustomLoggingMiddleware implements NestMiddleware {
  constructor(private _loggingService: CustomLoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this._loggingService.log({
      url: req.baseUrl,
      method: req.method,
      params: Object.values(req.params),
      body: req.body,
    });
    next();
  }
}

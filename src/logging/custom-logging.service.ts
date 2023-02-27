import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggingService implements LoggerService {
  error(message: any, ...optionalParams: any[]): any {
    console.error(message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    console.log(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    console.warn(message, optionalParams);
  }
}

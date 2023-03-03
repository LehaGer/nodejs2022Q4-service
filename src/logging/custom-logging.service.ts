import { Injectable, LoggerService } from '@nestjs/common';
import * as process from 'process';
import { appendFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggingService implements LoggerService {
  private _configService = new ConfigService();
  private readonly _MAX_LOG_FILE_SIZE: number;
  private readonly _LOG_LVL: number;

  constructor() {
    this._MAX_LOG_FILE_SIZE = Number(
      this._configService.get('MAX_LOG_FILE_SIZE'),
    );
    this._LOG_LVL = Number(this._configService.get('LOG_LVL'));
  }

  private async _getFileLogPath(logsType: 'logs' | 'errors') {
    const dirPath = resolve('logs/');
    const dirFiles = await readdir(dirPath);
    const dirFilesNumbers = dirFiles
      .filter((fileName) => fileName.startsWith(`${logsType}-`))
      .map((fileName) => {
        return Number(
          fileName.substring(`${logsType}-`.length, -'.txt'.length),
        );
      });
    const lastLogFileNumber =
      dirFilesNumbers.length ?? Math.max(...dirFilesNumbers);
    const lastLogFileName = lastLogFileNumber
      ? dirFiles.find(
          (fileName) => fileName === `${logsType}-${lastLogFileNumber}.txt`,
        )
      : `${logsType}.txt`;
    const path = resolve(dirPath, lastLogFileName);

    const fileSize = await (async () => {
      try {
        return (await stat(path)).size;
      } catch (e) {
        return 0;
      }
    })();

    return fileSize < this._MAX_LOG_FILE_SIZE
      ? path
      : resolve(dirPath, `${logsType}-${lastLogFileNumber + 1}.txt`);
  }

  private _logToStdout(message) {
    process.stdout.write(message + '\n');
  }

  private async _logToFile(logsType: 'logs' | 'errors', message) {
    const path = await this._getFileLogPath(logsType);

    try {
      await appendFile(path, `${new Date().toJSON()} - ${message} \n`);
    } catch (e) {
      throw e;
    }
  }

  async error(message: any): Promise<any> {
    if (this._LOG_LVL >= 1) {
      this._logToStdout(`Error: ${message}`);
      await this._logToFile('errors', message);
    }
  }

  async warn(message: any): Promise<any> {
    if (this._LOG_LVL >= 2) {
      this._logToStdout(`Warning: ${message}`);
      await this._logToFile('logs', message);
    }
  }

  async log(message: any): Promise<any> {
    if (this._LOG_LVL >= 3) {
      this._logToStdout(`Log: ${message}`);
      await this._logToFile('logs', message);
    }
  }

  async debug?(message: any): Promise<any> {
    if (this._LOG_LVL >= 4) {
      this._logToStdout(`Debug: ${message}`);
      await this._logToFile('logs', message);
    }
  }

  async verbose?(message: any): Promise<any> {
    if (this._LOG_LVL == 5) {
      this._logToStdout(`Verbose: ${message}`);
      await this._logToFile('logs', message);
    }
  }
}

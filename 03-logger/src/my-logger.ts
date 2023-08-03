import { ConsoleLogger, Inject, LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string, context: string) {
    console.log(`---log---[${context}]`, message);
  }
  error(message: string, context: string) {
    console.log(`---log---[${context}]`, message);
  }
  warn(message: string, context: string) {
    console.log(`---log---[${context}]`, message);
  }
}

export class MyLogger2 extends ConsoleLogger {
  @Inject('LOG_OPTIONS')
  public options: Record<string, any>;

  log(message: string, context: string) {
    console.log('options: ', this.options);
    console.log(`[${context}]`, message);
  }
}

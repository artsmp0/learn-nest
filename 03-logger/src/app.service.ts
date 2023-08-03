import { Inject, Injectable } from '@nestjs/common';
import { MyLogger2 } from './my-logger';

@Injectable()
export class AppService {
  @Inject(MyLogger2)
  private logger: MyLogger2;

  getHello(): string {
    this.logger.log('yyy', AppService.name);
    return 'Hello World!xxxx';
  }
}

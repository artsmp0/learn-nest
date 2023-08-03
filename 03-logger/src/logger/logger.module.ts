import { Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/my-logger';

@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}

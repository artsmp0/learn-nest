import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger, MyLogger2 } from './my-logger';
import { MyLogger3 } from './my-logger3';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 默认开启，关闭后日志就消失了
    // logger: false,
    // 自定义输出的日志级别
    // logger: ['warn', 'error'],
    // logger: new MyLogger2(),
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger3));
  await app.listen(3000);
}
bootstrap();

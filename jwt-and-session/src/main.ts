import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'artsmp',
      /** 是否指定每次访问都要更新 session，指定为 false 时，是只有内容变了才去更新 */
      resave: false,
      /** 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象 */
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();

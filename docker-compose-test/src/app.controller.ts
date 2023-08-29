import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType } from 'redis';

@Controller()
export class AppController {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  constructor(private readonly appService: AppService) {}
  @Get()
  async getHello() {
    const keys = await this.redisClient.keys('*');
    console.log('keys: ', keys);
    return this.appService.getHello();
  }
}

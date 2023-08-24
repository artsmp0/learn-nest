import {
  Controller,
  Get,
  Headers,
  Inject,
  Res,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';

@Controller()
export class AppController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sss')
  sss(@Session() session) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('ttt')
  ttt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('authorization: ', authorization);
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });
        res.setHeader('token', newToken);
        return data.count + 1;
      } catch (e) {
        throw new UnauthorizedException();
      }
    }
    const newToken = this.jwtService.sign({
      count: 1,
    });
    res.setHeader('token', newToken);
    return 1;
  }
}

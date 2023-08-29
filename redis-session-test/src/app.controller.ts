import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
  @Inject(SessionService)
  private sessionService: SessionService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async count(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sid = req.cookies?.sid;
    console.log('sid: ', sid);

    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );
    console.log('session: ', session);

    const curCount = session.count ? parseInt(session.count) + 1 : 1;
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });
    res.cookie('sid', curSid, { maxAge: 180000 });

    return curCount;
  }
}

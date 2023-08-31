import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Inject, Post, Query } from '@nestjs/common/decorators';
import { RegisterUserDto } from './dto/register.dto';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return await this.userService.register(user);
  }

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    console.log('code: ', code);
    try {
      await this.redisService.set(`captcha_${address}`, code, 5 * 60);

      await this.emailService.sendEmail({
        to: address,
        subject: '注册验证码',
        html: `<p>你的注册验证码是 ${code}</p>`,
      });
      return '发送成功！';
    } catch (error) {
      console.log('error: ', error);
    }
  }
}

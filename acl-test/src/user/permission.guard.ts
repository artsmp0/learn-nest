import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;

    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }
    const key = `user_${user.username}_permissions`;
    let permissions = await this.redisService.listGet(key);
    if (!permissions.length) {
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map((p) => p.name);
      this.redisService.listSet(key, permissions, 60 * 30);
    }
    const targetPermission = this.reflector.get(
      'permission',
      context.getHandler(),
    );
    if (permissions.some((p) => p === targetPermission)) {
      return true;
    }
    throw new UnauthorizedException('无权访问该接口');
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginAuthService: LoginAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.loginAuthService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("very not a user");
    }
    return user;
}

}
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('local strategy');
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('from validate : ', username, password);
    const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   console.log('error no user found');
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}

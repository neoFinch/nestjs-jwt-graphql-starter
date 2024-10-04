import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('from auth service :: ', user);
    if (user && user.pass == pass) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('from login :: ', user);
    const payload = { name: user.name, sub: user.id };
    // consoe
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

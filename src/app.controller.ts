import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JWTAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log('inside login ffunc');
    // return req.user;
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

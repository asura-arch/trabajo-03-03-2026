import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.authService.register(body.username, body.password);
    return { id: user.id, username: user.username };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const validated = await this.authService.validateUser(body.username, body.password);
    if (!validated) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(validated);
  }
}

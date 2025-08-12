import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(@Body() loginDto: LoginRequestBodyDTO) {
    return await this.authService.login(loginDto);
  }
}

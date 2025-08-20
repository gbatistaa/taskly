import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';
import { type LogoutRequest } from './interfaces/logout-request.interface';
import { type RefreshRequest } from './interfaces/refresh-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginRequestBodyDTO, @Res() res: Response) {
    return await this.authService.login(loginDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: LogoutRequest, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refresh(@Req() req: RefreshRequest, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }
}

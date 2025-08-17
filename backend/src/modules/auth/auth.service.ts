import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserDTO } from '../user/dto/user-dto';
import { UserService } from '../user/user.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';
import { treatKnownErrors } from './errors/treatErrorCustomized';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async login(
    loginDto: LoginRequestBodyDTO,
    res: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { email } = loginDto;
      const user = await this.userService.findOneByEmail(email, true);

      // Tokens generation business logic:
      const accessTokenPayload: Partial<UserDTO> = {
        username: user.username,
        firstName: user.firstName,
      };
      const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: '15m',
      });

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
      });

      // Generate the refresh token:
      const refreshTokenPayload: Partial<UserDTO> = {
        ...accessTokenPayload,
        lastName: user.lastName,
      };
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        { expiresIn: '7d' },
      );

      // Store the refresh token on the database:
      await this.refreshTokenService.create({
        userId: user.id,
        tokenHash: refreshToken,
      });

      res.status(200).send({ accessToken, refreshToken });

      return { accessToken, refreshToken };
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}

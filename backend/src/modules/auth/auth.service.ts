import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserDTO } from '../user/dto/user-dto';
import { UserService } from '../user/user.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';
import { generateAccessToken } from './tokens/generate-access-code';
import { generateRefreshToken } from './tokens/generate-refresh-token';

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

      const [accessTokenPayload, accessToken] = await generateAccessToken(
        user,
        this.jwtService,
        res,
      );

      const refreshToken = await generateRefreshToken(
        user,
        this.jwtService,
        accessTokenPayload as Partial<UserDTO>,
        this.refreshTokenService,
      );

      res.status(200).send({ accessToken, refreshToken });

      return { accessToken: accessToken as string, refreshToken };
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}

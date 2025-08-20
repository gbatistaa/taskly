import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserDTO } from '../user/dto/user-dto';
import { UserService } from '../user/user.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { LogoutRequest } from './interfaces/logout-request.interface';
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

      throw new InternalServerErrorException('Unexpected error on user login');
    }
  }

  async logout(req: LogoutRequest, res: Response) {
    const { accessToken } = req.cookies;
    const payload: AccessTokenPayload = this.jwtService.decode(accessToken);

    try {
      const user: UserDTO = await this.userService.findOne(
        'username',
        payload.username,
      );

      // Removing the refresh token from the database:
      await this.refreshTokenService.remove(user.id);

      // Removing the access token from the cookies:
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.json({ message: 'Logout made successfully' });
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on the user logout',
      );
    }
  }
}

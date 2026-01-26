import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDTO } from 'src/modules/user/dto/user-dto';
import { AccessTokenPayload } from '../interfaces/access-token-payload.interface';

export const generateAccessToken = async (
  user: AccessTokenPayload,
  jwtService: JwtService,
  res: Response,
): Promise<(string | Partial<UserDTO>)[]> => {
  const accessTokenPayload: Partial<UserDTO> = {
    username: user.username,
    id: user.id,
  };
  const accessToken = await jwtService.signAsync(accessTokenPayload, {
    expiresIn: '15m',
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24,
  });

  return [accessTokenPayload, accessToken];
};

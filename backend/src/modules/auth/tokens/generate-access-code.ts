import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDTO } from 'src/modules/user/dto/user-dto';

export const generateAccessToken = async (
  user: UserDTO,
  jwtService: JwtService,
  res: Response,
): Promise<(string | Partial<UserDTO>)[]> => {
  const accessTokenPayload: Partial<UserDTO> = {
    username: user.username,
    firstName: user.firstName,
  };
  const accessToken = await jwtService.signAsync(accessTokenPayload, {
    expiresIn: '15m',
  });

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24,
  });

  return [accessTokenPayload, accessToken];
};

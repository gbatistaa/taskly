import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { UserDTO } from 'src/modules/user/dto/user-dto';

export const generateRefreshToken = async (
  user: UserDTO,
  jwtService: JwtService,
  accessTokenPayload: Partial<UserDTO>,
  refreshTokenService: RefreshTokenService,
) => {
  const refreshTokenPayload: Partial<UserDTO> = {
    ...accessTokenPayload,
    lastName: user.lastName,
  };
  const refreshToken = await jwtService.signAsync(refreshTokenPayload, {
    expiresIn: '7d',
  });

  await refreshTokenService.create({
    userId: user.id,
    tokenHash: refreshToken,
  });

  return refreshToken;
};

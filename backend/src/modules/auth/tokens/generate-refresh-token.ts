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
    firstName: user.firstName,
    lastName: user.lastName,
  };

  console.log(refreshTokenPayload);

  const refreshToken = await jwtService.signAsync(refreshTokenPayload, {
    expiresIn: '7d',
  });

  console.log(refreshToken);

  await refreshTokenService.create({
    userId: user.id,
    tokenHash: refreshToken,
  });

  return refreshToken;
};

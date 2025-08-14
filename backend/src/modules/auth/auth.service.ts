import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptographyUtils } from '../common/utils/cryptography-utils';
import { UserDTO } from '../user/dto/user-dto';
import { UserService } from '../user/user.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';
import { treatKnownErrors } from './errors/treatErrorCustomized';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestBodyDTO) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOneByEmail(email, true);

      // User existence middleware:
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Password validation middleware:
      const isPasswordCorrect = await CryptographyUtils.validateHash(
        password,
        user.password,
        user.salt,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Incorrect password');
      }

      // Tokens generation business logic:
      const accessTokenPayload: Partial<UserDTO> = {
        username: user.username,
        firstName: user.firstName,
      };

      const refreshTokenPayload: Partial<UserDTO> = {
        ...accessTokenPayload,
        lastName: user.lastName,
      };

      const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        { expiresIn: '7d' },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}

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

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordCorrect = await CryptographyUtils.validateHash(
        password,
        user.password,
        user.salt,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Incorrect password');
      }

      const payload: Partial<UserDTO> = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      });

      return {
        accessToken,
      };
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}

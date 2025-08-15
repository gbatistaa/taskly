import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CryptographyUtils } from 'src/modules/common/utils/cryptography-utils';
import { UserService } from 'src/modules/user/user.service';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';

@Injectable()
export class PasswordValidationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: LoginRequestInterface, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.userService.findOneByEmail(email, true);

    const isPasswordCorrect = await CryptographyUtils.validateHash(
      password,
      user.password,
      user.salt,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    next();
  }
}

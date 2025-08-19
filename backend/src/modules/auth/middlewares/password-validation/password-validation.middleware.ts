import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { treatKnownErrors } from 'src/modules/common/errors/treatErrorCustomized';
import { CryptographyUtils } from 'src/modules/common/utils/cryptography-utils';
import { UserService } from 'src/modules/user/user.service';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';

@Injectable()
export class PasswordValidationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: LoginRequestInterface, res: Response, next: NextFunction) {
    try {
      const { email, password, salt } = req.body;

      const user = await this.userService.findOneByEmail(email, true);

      const isPasswordCorrect = await CryptographyUtils.validateHash(
        password,
        user.password,
        salt,
      );

      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Incorrect password');
      }
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on user password validation',
      );
    }

    next();
  }
}

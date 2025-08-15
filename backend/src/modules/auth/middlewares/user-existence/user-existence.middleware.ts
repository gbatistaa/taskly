import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { treatKnownErrors } from '../../errors/treatErrorCustomized';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';

@Injectable()
export class UserExistenceMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: LoginRequestInterface, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await this.userService.findOneByEmail(email, true);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      req.body['user'] = user;

      next();
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}

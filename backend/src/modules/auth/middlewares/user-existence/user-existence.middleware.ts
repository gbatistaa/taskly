import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { treatKnownErrors } from 'src/modules/common/errors/treatErrorCustomized';
import { UserService } from 'src/modules/user/user.service';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';

@Injectable()
export class UserExistenceMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: LoginRequestInterface, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const user = await this.userService.findOneByEmail(email, true);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      req.body['salt'] = user.salt;
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Error on the user existence verification',
      );
    }

    next();
  }
}

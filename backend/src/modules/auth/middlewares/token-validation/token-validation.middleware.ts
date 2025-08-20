import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, type Response } from 'express';
import { treatKnownErrors } from 'src/modules/common/errors/treatErrorCustomized';
import { AccessTokenPayload } from '../../interfaces/access-token-payload.interface';
import { RefreshRequest } from '../../interfaces/refresh-request.interface';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: RefreshRequest, res: Response, next: NextFunction) {
    // Global middleware to validate request access token:

    const { accessToken } = req.cookies;

    try {
      const payload: AccessTokenPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: process.env.JWT_SECRET,
        },
      );
      console.log(payload);

      next();
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on access token validation',
      );
    }
  }
}

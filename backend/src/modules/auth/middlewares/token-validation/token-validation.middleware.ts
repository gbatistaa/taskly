import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { NextFunction, type Response } from 'express';
import { treatKnownErrors } from 'src/modules/common/errors/treatErrorCustomized';
import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { AccessTokenPayload } from '../../interfaces/access-token-payload.interface';
import { RefreshRequest } from '../../interfaces/refresh-request.interface';
import { generateAccessToken } from '../../tokens/generate-access-token';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async use(req: RefreshRequest, res: Response, next: NextFunction) {
    // Global middleware to validate request access token:

    const { accessToken } = req.cookies;

    try {
      const payload: AccessTokenPayload = await this.jwtService.verifyAsync(
        accessToken,
        { secret: process.env.JWT_SECRET },
      );

      // console.log(payload);
      req.payload = payload;

      next();
    } catch (error: unknown) {
      // In case of token expired:
      if (error instanceof TokenExpiredError) {
        try {
          const payload: AccessTokenPayload =
            await this.jwtService.decode(accessToken);

          console.log(payload);

          // Trying to find a refresh token of the payload user on the database
          const refreshTokenFound = await this.refreshTokenService.findOne(
            'userId',
            payload.id,
          );

          if (!refreshTokenFound) {
            throw new UnauthorizedException(
              'The user refresh token does not exist in the database',
            );
          }

          const [, newAccessToken] = await generateAccessToken(
            payload,
            this.jwtService,
            res,
          );

          return res.json({
            message: 'The access token was refreshed',
            newAccessToken,
            statusCode: 200,
          });
        } catch (error: unknown) {
          console.log(error);
        }
      }

      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on the access token validation middleware',
      );
    }
  }
}

import { HttpException, UnauthorizedException } from '@nestjs/common';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';
import { postgresErrorMap } from 'src/modules/common/utils/postgres-error-map';

export const treatKnownErrors = (error: unknown) => {
  // 1. Httpexception already released elsewhere
  if (error instanceof HttpException) {
    throw error;
  }

  // 2. Jwt errors
  if (error instanceof TokenExpiredError) {
    throw new UnauthorizedException('Expired token');
  }
  if (error instanceof JsonWebTokenError) {
    throw new UnauthorizedException('Invalid token');
  }
  if (error instanceof NotBeforeError) {
    throw new UnauthorizedException('Token not yet valid');
  }

  // 3. Postgres errors
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string' &&
    postgresErrorMap[(error as { code: string }).code]
  ) {
    throw postgresErrorMap[(error as { code: string }).code](
      (error as { detail?: string }).detail,
    );
  }
};

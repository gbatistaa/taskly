import { HttpException } from '@nestjs/common';
import { postgresErrorMap } from 'src/modules/common/utils/postgres-error-map';

export const treatKnownErrors = (error: unknown) => {
  // Treat Http exception errors:
  if (error instanceof HttpException) {
    throw error;
  }

  // Treat database errors:
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

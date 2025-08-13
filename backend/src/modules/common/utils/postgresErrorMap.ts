import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';

export const postgresErrorMap: Record<
  string,
  (detail?: string) => HttpException
> = {
  '23505': (detail) =>
    new ConflictException('Duplicate record: ' + (detail ?? '')),
  '23503': (detail) =>
    new BadRequestException('Foreign key violation: ' + (detail ?? '')),
  '23514': (detail) =>
    new BadRequestException('Violation of constraint check: ' + (detail ?? '')),
  '42501': (detail) =>
    new ForbiddenException('Permission denied: ' + (detail ?? '')),
};

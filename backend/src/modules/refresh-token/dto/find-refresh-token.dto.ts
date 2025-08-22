// find-refresh-token.dto.ts
import { IsString } from 'class-validator';

export class FindRefreshTokenDto {
  @IsString()
  prop: string;

  @IsString()
  value: string;
}

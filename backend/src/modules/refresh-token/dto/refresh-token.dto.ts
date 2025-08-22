import { IsString } from 'class-validator';
import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

export class RefreshTokenDto implements RefreshTokenInterface {
  @IsString()
  userId: string;

  @IsString()
  tokenHash: string;
}

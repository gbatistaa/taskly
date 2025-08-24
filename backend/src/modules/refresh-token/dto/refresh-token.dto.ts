import { IsString, IsUUID } from 'class-validator';
import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

export class RefreshTokenDto implements RefreshTokenInterface {
  @IsUUID()
  userId: string;

  @IsString()
  tokenHash: string;
}

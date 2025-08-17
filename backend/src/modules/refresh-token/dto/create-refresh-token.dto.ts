import { IsString, IsUUID } from 'class-validator';
import { CreatRefreshTokenInterface } from '../interfaces/creatable-refresh-token.interface';

export class CreateRefreshTokenDto implements CreatRefreshTokenInterface {
  @IsUUID()
  userId: string;

  @IsString()
  tokenHash: string;
}

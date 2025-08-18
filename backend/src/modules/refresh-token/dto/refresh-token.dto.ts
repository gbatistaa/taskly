import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

export class RefreshTokenDto implements RefreshTokenInterface {
  userId: string;
  tokenHash: string;
}

import { Request } from 'express';
import { AccessTokenPayload } from './access-token-payload.interface';

export interface RefreshRequest extends Request {
  cookies: {
    accessToken: string;
  };

  payload?: AccessTokenPayload;
}

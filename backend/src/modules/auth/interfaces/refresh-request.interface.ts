import { Request } from 'express';

export interface RefreshRequest extends Request {
  cookies: {
    accessToken: string;
  };
}

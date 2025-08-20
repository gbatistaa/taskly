import { Request } from 'express';

export interface LogoutRequest extends Request {
  cookies: {
    accessToken: string;
  };
}

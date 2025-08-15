import { Request } from 'express';
import { LoginRequestBodyInterface } from './login-reqbody.interface';

export interface LoginRequestInterface extends Request {
  body: LoginRequestBodyInterface;
}

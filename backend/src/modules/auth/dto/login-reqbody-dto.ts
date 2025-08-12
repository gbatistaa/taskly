import { LoginRequestBodyInterface } from '../interfaces/login-reqbody.interface';

export class LoginRequestBodyDTO implements LoginRequestBodyInterface {
  email: string;
  password: string;
}

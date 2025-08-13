import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequestBodyInterface } from '../interfaces/login-reqbody.interface';

export class LoginRequestBodyDTO implements LoginRequestBodyInterface {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

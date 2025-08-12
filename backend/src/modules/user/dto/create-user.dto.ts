import { IsDateString, IsEmail, IsString, Length } from 'class-validator';
import { CreatableUserInterface } from '../interfaces/creatable-user.interface';

export class CreateUserDto implements CreatableUserInterface {
  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsDateString()
  birthDate: Date;
}

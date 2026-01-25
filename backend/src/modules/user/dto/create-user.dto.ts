import { IsDateString, IsEmail, IsString, Length } from 'class-validator';
import { CreatableUserInterface } from '../interfaces/creatable-user.interface';

export class CreateUserDto implements CreatableUserInterface {
  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 128)
  password: string;

  @IsString()
  @Length(3, 32)
  firstName: string;

  @IsString()
  @Length(3, 32)
  lastName: string;

  @IsString()
  @Length(3, 32)
  username: string;

  @IsDateString()
  birthDate: Date;
}

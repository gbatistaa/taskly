import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '../interfaces/user.interface';

@Exclude()
export class UserDTO implements UserInterface {
  id: string;
  cpf: string;

  @Expose()
  email: string;

  @Expose({ groups: ['withPassword'] })
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  salt: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

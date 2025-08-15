import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '../interfaces/user.interface';

@Exclude()
export class UserDTO implements UserInterface {
  @Expose({ groups: ['withCredentials'] })
  id: string;

  cpf: string;

  @Expose()
  email: string;

  @Expose({ groups: ['withCredentials'] })
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose({ groups: ['withCredentials'] })
  salt: string;

  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

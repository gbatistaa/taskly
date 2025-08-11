import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { Entity } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
export class User extends CommonEntity implements UserInterface {
  cpf: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

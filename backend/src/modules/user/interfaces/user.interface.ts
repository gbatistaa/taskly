import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';

export interface UserInterface extends CommonEntityInterface {
  cpf: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  salt: string;
  birthDate: Date;
}

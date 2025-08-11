import { CreatableUserInterface } from '../interfaces/creatable-user.interface';

export class CreateUserDto implements CreatableUserInterface {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

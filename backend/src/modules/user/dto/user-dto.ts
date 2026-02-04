import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '../interfaces/user.interface';

export class UserTeamMembershipDTO {
  @Expose()
  id: string;

  @Expose()
  role: string;

  @Expose()
  teamId: string;

  @Expose()
  userId: string;
}

@Exclude()
export class UserDTO implements UserInterface {
  @Expose()
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

  @Expose()
  birthDate: Date;

  createdAt: Date;
  updatedAt: Date;

  @Expose()
  teamMemberships: UserTeamMembershipDTO[];
}

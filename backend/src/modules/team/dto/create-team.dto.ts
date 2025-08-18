import { CreateTeamInterface } from '../interfaces/creatable-team.interface';

export class CreateTeamDto implements CreateTeamInterface {
  name: string;
  company?: string | undefined;
  description: string;
}

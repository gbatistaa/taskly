import { TeamInterface } from '../interfaces/team.interface';

export class TeamDTO implements Partial<TeamInterface> {
  name: string;
  company: string;
  description: string;
}

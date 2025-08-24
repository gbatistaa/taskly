import { Exclude, Expose } from 'class-transformer';
import { TeamInterface } from '../interfaces/team.interface';

@Exclude()
export class TeamDTO implements Partial<TeamInterface> {
  @Expose()
  name: string;

  @Expose()
  company: string;

  @Expose()
  description: string;
}

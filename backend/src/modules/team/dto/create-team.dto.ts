import { IsString, IsUUID } from 'class-validator';
import { CreateTeamInterface } from '../interfaces/creatable-team.interface';

export class CreateTeamDto implements CreateTeamInterface {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  description: string;

  @IsUUID()
  userId: string;
}

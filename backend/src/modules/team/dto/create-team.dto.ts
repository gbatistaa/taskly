import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTeamInterface } from '../interfaces/creatable-team.interface';

export class CreateTeamDto implements CreateTeamInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

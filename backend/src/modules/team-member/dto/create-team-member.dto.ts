import { IsUUID } from 'class-validator';
import { TeamRoles } from 'src/modules/common/enums/Roles';
import { IsEnumValue } from 'src/modules/common/pipes/is-enum-value.pipe';
import { CreateTeamMemberInterface } from '../interfaces/createble-team-member.interface';

export class CreateTeamMemberDto implements CreateTeamMemberInterface {
  @IsUUID()
  userId: string;

  @IsUUID()
  teamId: string;

  @IsEnumValue(TeamRoles)
  teamRole: TeamRoles;
}

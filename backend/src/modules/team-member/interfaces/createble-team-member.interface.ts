import { TeamRoles } from 'src/modules/common/enums/Roles';

export interface CreateTeamMemberInterface {
  teamId: string;
  teamRole: TeamRoles;
}

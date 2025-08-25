import { TeamRoles } from 'src/modules/common/enums/Roles';

export interface CreateTeamMemberInterface {
  userId: string;
  teamId: string;
  teamRole: TeamRoles;
}

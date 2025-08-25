import { TeamRoles } from 'src/modules/common/enums/Roles';
import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';

export interface TeamMemberInterface extends CommonEntityInterface {
  teamId: string;
  userId: string;
  teamRole: TeamRoles;
}

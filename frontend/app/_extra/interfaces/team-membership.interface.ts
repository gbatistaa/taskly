import { TeamRoles } from "../enums/TeamRoles.enum";

export interface TeamMembership {
  id: string;
  teamId: string;
  userId: string;
  teamRole: TeamRoles;
}

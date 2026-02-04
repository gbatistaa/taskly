import { TeamMembership } from "./team-membership.interface";

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  teamMemberships: TeamMembership[];
}

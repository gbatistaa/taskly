import React from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import TeamMember from "./TeamMemberItem";
import { TeamRoles } from "@/app/_extra/enums/TeamRoles.enum";

function TeamMembers({ members, teamId }: { members: UserData[]; teamId: string }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {members.map((member, index) => (
        <TeamMember
          key={index}
          member={member}
          currentRole={
            member.teamMemberships.find((teamMembership) => teamMembership.teamId === teamId)?.teamRole as TeamRoles
          }
          teamId={teamId}
        />
      ))}
    </div>
  );
}

export default TeamMembers;

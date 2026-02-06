import React from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import TeamMember from "./TeamMemberItem";

function TeamMembers({ members }: { members: UserData[] }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {members.map((member, index) => (
        <TeamMember key={index} member={member} />
      ))}
    </div>
  );
}

export default TeamMembers;

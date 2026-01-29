import React from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";

function TeamMembers({ members }: { members: UserData[] }): React.JSX.Element {
  return (
    <div>
      {members.map((member) => {
        return (
          <div key={member.id} className="bg-slate-800 p-6">
            <div className="flex items-center gap-4">
              <div className="flex bg-blue-500/20 rounded-full w-auto h-14 aspect-square"></div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg">{`${member.firstName} ${member.lastName}`}</p>
                <span>{member?.email}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamMembers;

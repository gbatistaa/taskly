import React from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { LuCrown, LuUser } from "react-icons/lu";
import { TeamRoles } from "@/app/_extra/enums/TeamRoles.enum";

function TeamMembers({ members }: { members: UserData[] }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {[...members, ...members, ...members].map((member, index) => {
        return (
          <div key={index} className="bg-slate-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-auto h-14 aspect-square">
                {member.teamMemberships[0].teamRole === TeamRoles.OWNER ? (
                  <LuCrown className="w-6 h-auto text-blue-500" />
                ) : (
                  <LuUser className="w-6 h-auto text-blue-500" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg">{`${member.firstName} ${member.lastName}`}</p>
                <span className="text-gray-400 text-sm">{member?.email}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamMembers;

import React, { useState } from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { LuCrown, LuTrash, LuUser } from "react-icons/lu";
import { TeamRoles } from "@/app/_extra/enums/TeamRoles.enum";
import api from "@/app/_extra/api/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IoIosArrowUp } from "react-icons/io";

interface TeamMemberItemProps {
  member: UserData;
}

function TeamMember({ member }: TeamMemberItemProps): React.JSX.Element {
  const isOwner = member.teamMemberships[0].teamRole === TeamRoles.OWNER;
  const currentRole = member.teamMemberships[0].teamRole;
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as TeamRoles;

    try {
      const { status } = await api.patch(`/team-member/${member.id}`, {
        teamRole: newRole,
      });

      if (status === 200) {
        toast.success("Role updated successfully");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error on role update");
      }
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-auto h-14 aspect-square">
          {isOwner ? <LuCrown className="w-6 h-auto text-blue-500" /> : <LuUser className="w-6 h-auto text-blue-500" />}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg">{`${member.firstName} ${member.lastName}`}</p>
          <span className="text-gray-400 text-sm">{member?.email}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            name="role"
            id="role"
            className="bg-slate-900 p-3 pr-10 rounded-xl appearance-none cursor-pointer"
            defaultValue={currentRole}
            onChange={handleRoleChange}
            onFocus={() => setIsSelectOpen(true)}
            onBlur={() => setIsSelectOpen(false)}
          >
            <option value={TeamRoles.OWNER}>Owner</option>
            <option value={TeamRoles.ADMIN}>Admin</option>
            <option value={TeamRoles.MEMBER}>Member</option>
          </select>
          <IoIosArrowUp
            className={`absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out ${
              isSelectOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        <button type="button" className="flex justify-center items-center bg-red-500 p-3 rounded-xl h-full">
          <LuTrash className="w-6 h-auto text-white" />
        </button>
      </div>
    </div>
  );
}

export default TeamMember;

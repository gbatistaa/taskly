import React, { useState } from "react";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { LuCrown, LuTrash, LuUser, LuUserCog } from "react-icons/lu";
import { TeamRoles } from "@/app/_extra/enums/TeamRoles.enum";
import api from "@/app/_extra/api/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IoIosArrowUp } from "react-icons/io";
import { useAtom } from "jotai";
import { userDataAtom } from "@/app/_extra/atoms/auth";
import { useRouter } from "next/navigation";
import RemoveMemberModal from "../modals/RemoveMemberModal";

interface TeamMemberItemProps {
  member: UserData;
  currentRole: TeamRoles;
  teamId: string;
}

function TeamMember({ member, currentRole, teamId }: TeamMemberItemProps): React.JSX.Element {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [role, setRole] = useState<TeamRoles>(currentRole);
  const [loggedUser, _] = useAtom(userDataAtom);
  const router = useRouter();

  const loggedUserRole = loggedUser?.teamMemberships.find((teamMembership) => teamMembership.teamId === teamId)
    ?.teamRole as TeamRoles;
  const isOwnCard = loggedUser?.id === member.id;

  const canEditRole = isOwnCard
    ? [TeamRoles.OWNER, TeamRoles.ADMIN].includes(role) && role !== TeamRoles.OWNER
    : [TeamRoles.OWNER, TeamRoles.ADMIN].includes(loggedUserRole) && role !== TeamRoles.OWNER;

  const canRemoveMember =
    isOwnCard || ([TeamRoles.OWNER, TeamRoles.ADMIN].includes(loggedUserRole) && role !== TeamRoles.OWNER);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as TeamRoles;

    try {
      const { status } = await api.patch(`/team-member/${member.id}`, {
        teamRole: newRole,
      });

      if (status === 200) {
        toast.success("Role updated successfully");
        setRole(newRole);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error on role update");
      }
    }
  };

  const handleRemoveMember = async () => {
    try {
      const { status } = await api.delete(`/team-member/${member.id}`);

      if (status === 200) {
        toast.success("Member removed successfully");

        if (isOwnCard) {
          router.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected error on member removal");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-auto h-14 aspect-square">
            {role === TeamRoles.OWNER && <LuCrown className="w-6 h-auto text-blue-500" />}
            {role === TeamRoles.ADMIN && <LuUserCog className="w-6 h-auto text-blue-500" />}
            {role === TeamRoles.MEMBER && <LuUser className="w-6 h-auto text-blue-500" />}
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
              className={`bg-slate-900 p-3 pr-10 rounded-xl appearance-none ${
                canEditRole ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              value={role}
              onChange={handleRoleChange}
              onFocus={() => setIsSelectOpen(true)}
              onBlur={() => setIsSelectOpen(false)}
              disabled={!canEditRole}
            >
              {role === TeamRoles.OWNER && <option value={TeamRoles.OWNER}>Owner</option>}
              {role !== TeamRoles.OWNER && <option value={TeamRoles.ADMIN}>Admin</option>}
              <option value={TeamRoles.MEMBER}>Member</option>
            </select>
            <IoIosArrowUp
              className={`absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out ${
                isSelectOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {canRemoveMember && (
            <button
              type="button"
              onClick={() => setIsRemoveDialogOpen(true)}
              className="flex justify-center items-center bg-red-500 hover:bg-red-500/70 p-3 rounded-xl h-full transition-colors duration-300 ease-out cursor-pointer"
            >
              <LuTrash className="w-6 h-auto text-white" />
            </button>
          )}
        </div>
      </div>
      {isRemoveDialogOpen && (
        <RemoveMemberModal
          memberName={`${member.firstName} ${member.lastName}`}
          isOwnCard={isOwnCard}
          onClose={() => setIsRemoveDialogOpen(false)}
          onConfirm={handleRemoveMember}
        />
      )}
    </>
  );
}

export default TeamMember;

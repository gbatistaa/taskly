import { Team } from "@/app/_extra/interfaces/team.interface";
import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdPeopleAlt, MdPersonAdd } from "react-icons/md";
import api from "@/app/_extra/api/api";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { toast } from "sonner";
import TeamConfiguration from "./TeamConfiguration";
import TeamMembers from "./members/TeamMembers";

interface TeamContentProps {
  team: Team;
}

enum TeamTab {
  TASKS,
  MEMBERS,
  CONFIGURATION,
}

interface UserMember extends UserData {
  role: string;
}

export default function TeamContent({ team }: TeamContentProps): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState<TeamTab>(TeamTab.TASKS);
  const [teamMembers, setTeamMembers] = useState<UserMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (team && selectedTab === TeamTab.MEMBERS) {
        try {
          const { data } = await api.get(`/team/find-team-members/${team?.id}`);
          setTeamMembers(data);
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error ocurred on fetching team members");
          }
        }
      }
    };

    void fetchTeamMembers();
  }, [selectedTab]);

  return (
    <section className="w-full h-full">
      <div className="flex justify-between items-center px-20 h-30">
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-3xl">{team.name}</h2>
          <p className="text-gray-400 wrap-break-word">{team.company}</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-linear-to-r from-blue-400 to-blue-500 hover:brightness-120 px-4 py-2 rounded-xl duration-300 ease-out hover:cursor-pointer"
        >
          <MdPersonAdd />
          Invite members
        </button>
      </div>
      <main className="flex flex-col gap-4 px-20 pt-10">
        <div className="flex gap-2 bg-slate-800 p-2 rounded-xl w-fit">
          <label
            htmlFor="tasks"
            className={`flex cursor-pointer items-center gap-1 px-2 py-1.5 rounded-xl duration-200 ease-out ${selectedTab === TeamTab.TASKS ? "bg-blue-500" : "text-gray-400"}`}
          >
            <input
              type="radio"
              id="tasks"
              checked={selectedTab === TeamTab.TASKS}
              onChange={() => setSelectedTab(TeamTab.TASKS)}
              name="team-tab"
              value={TeamTab.TASKS}
              className="sr-only"
            />
            <FaTasks className="w-4 h-auto" />
            <span className="font-semibold text-sm">Tasks</span>
          </label>
          <label
            htmlFor="members"
            className={`flex cursor-pointer items-center gap-1 px-2 py-1.5 rounded-xl duration-200 ease-out ${selectedTab === TeamTab.MEMBERS ? "bg-blue-500" : "text-gray-400"}`}
          >
            <input
              type="radio"
              id="members"
              checked={selectedTab === TeamTab.MEMBERS}
              onChange={() => setSelectedTab(TeamTab.MEMBERS)}
              name="team-tab"
              value={TeamTab.MEMBERS}
              className="sr-only"
            />
            <MdPeopleAlt className="w-4 h-auto" />
            <span className="font-semibold text-sm">Members</span>
          </label>
          <label
            htmlFor="configuration"
            className={`flex cursor-pointer items-center gap-1 px-2 py-1.5 rounded-xl duration-200 ease-out ${selectedTab === TeamTab.CONFIGURATION ? "bg-blue-500" : " text-gray-400"}`}
          >
            <input
              type="radio"
              id="configuration"
              checked={selectedTab === TeamTab.CONFIGURATION}
              onChange={() => setSelectedTab(TeamTab.CONFIGURATION)}
              name="team-tab"
              value={TeamTab.CONFIGURATION}
              className="sr-only"
            />
            <IoIosSettings className="w-4 h-auto" />
            <span className="font-semibold text-sm">Configuration</span>
          </label>
        </div>
        {selectedTab === TeamTab.MEMBERS && <TeamMembers members={teamMembers} teamId={team.id} />}{" "}
        {selectedTab === TeamTab.CONFIGURATION && <TeamConfiguration name={team.name} description={team.description} />}
      </main>
    </section>
  );
}

"use client"

import { useAtom } from "jotai";
import React, { useState } from "react";
import { userDataAtom } from "../../_extra/atoms/auth";
import TeamCard from "./components/TeamCard";
import { FaPlus } from "react-icons/fa";
import { userTeamsAtom } from "@/app/_extra/atoms/teams";
import CreateTeamModal from "./components/CreateTeamModal";

function DashBoard(): React.JSX.Element {
  const [userData, setUserData] = useAtom(userDataAtom);
  const [userTeams, setUserTeams] = useAtom(userTeamsAtom);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const { data }: { data: UserData } = await api.get("/auth/me");
  //     console.log(data)
  //     setUserData(data);
  //   }

  //   const fetchUserTeams = async () => {
  //     const { data } = await api.get(`user/find-user-teams/${userData?.id}`);
  //     console.log(data);
  //     setUserTeams(data);
  //   }

  //   const fetchData = async () => {
  //     await fetchUserData();
  //     await fetchUserTeams();
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <section className="border-2 solid border-blue-500 h-full w-full">
        <div className="h-30 border px-20 flex justify-between items-center">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-3xl">Your teams</h2>
            <p className="text-gray-400">Manage your teams and colaborate with them</p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="items-center flex duration-300 rounded-xl hover:cursor-pointer hover:brightness-120 ease-out gap-2 px-4 bg-linear-to-r from-blue-400 to-blue-500 py-2"
          >
            <FaPlus />
            Create team
          </button>
        </div>
        <main className="grid grid-cols-3 gap-8 px-20 pt-10">
          {userTeams.length > 0 ? (
            userTeams.map((team, index) => (
              <TeamCard key={index} team={team} />
            ))
          ) : "sem times"};
        </main>
      </section>
      {isCreateTeamModalOpen && <CreateTeamModal />}
    </>
  );
}

export default DashBoard;
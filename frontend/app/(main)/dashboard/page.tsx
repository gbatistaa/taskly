"use client";

import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userDataAtom } from "../../_extra/atoms/auth";
import TeamCard from "./components/TeamCard";
import { FaPlus } from "react-icons/fa";
import { userTeamsAtom } from "@/app/_extra/atoms/teams";
import CreateTeamModal from "./components/CreateTeamModal";
import EmptyTeamsState from "./components/EmptyTeamsState";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import api from "@/app/_extra/api/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Team } from "@/app/_extra/interfaces/team.interface";

function DashBoard(): React.JSX.Element {
  const [userData, setUserData] = useAtom(userDataAtom);
  const [userTeams, setUserTeams] = useAtom(userTeamsAtom);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data }: { data: UserData } = await api.get("/auth/me");
        setUserData(data);
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if ([401, 403, 404].includes(error.response?.status as number)) {
            router.push("/login");
          }
          toast.error(error.response?.data.message, { duration: 5000 });
        }
      }
    };

    const fetchUserTeams = async (userId: string) => {
      try {
        const { data }: { data: Team[] } = await api.get(`user/find-user-teams/${userId}`);
        setUserTeams(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { duration: 5000 });
        }
      }
    };

    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData?.id) {
        await fetchUserTeams(userData.id);
      }
    };

    void fetchData();
  }, []);

  return (
    <>
      <section className="w-full h-full">
        <div className="flex justify-between items-center px-20 h-30">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-3xl">Your teams</h2>
            <p className="text-gray-400">Manage your teams and colaborate with them</p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="flex items-center gap-2 bg-linear-to-r from-blue-400 to-blue-500 hover:brightness-120 px-4 py-2 rounded-xl duration-300 ease-out hover:cursor-pointer"
          >
            <FaPlus />
            Create team
          </button>
        </div>
        <main className="gap-8 grid grid-cols-3 px-20 pt-10">
          {userTeams.length > 0 ? (
            userTeams.map((team, index) => <TeamCard key={index} team={team} />)
          ) : (
            <EmptyTeamsState />
          )}
        </main>
      </section>
      {isCreateTeamModalOpen && <CreateTeamModal onClose={() => setIsCreateTeamModalOpen(false)} />}
    </>
  );
}

export default DashBoard;

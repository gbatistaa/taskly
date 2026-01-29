"use client";

import api from "@/app/_extra/api/api";
import { Team } from "@/app/_extra/interfaces/team.interface";
import React, { useEffect, useState } from "react";
import TeamContent from "./components/TeamContent";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function TeamPage({ params }: { params: Promise<{ id: string }> }): React.JSX.Element {
  const unwrappedParams = React.use(params);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: Team } = await api.get(`/team/${unwrappedParams.id}`);
        setTeam(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Team not found</p>
      </div>
    );
  }

  return <TeamContent team={team} />;
}

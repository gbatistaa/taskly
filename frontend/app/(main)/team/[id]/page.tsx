"use client";

import api from "@/app/_extra/api/api";
import { Team } from "@/app/_extra/interfaces/team.interface";
import React, { useEffect, useState } from "react";
import TeamContent from "./components/TeamContent";

export default function TeamPage({ params }: { params: Promise<{ id: string }> }): React.JSX.Element {
  const unwrappedParams = React.use(params);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: Team } = await api.get(`/team/${unwrappedParams.id}`);
        console.log(data);
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  if (!team) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Team not found</p>
      </main>
    );
  }

  return <TeamContent team={team} />;
}

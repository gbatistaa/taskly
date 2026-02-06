import api from "@/app/_extra/api/api";
import { selectedTeamAtom, userTeamsAtom } from "@/app/_extra/atoms/teams";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DeleteTeamModal from "./modals/DeleteTeamModal";

export default function TeamConfiguration({ name, description }: { name?: string; description?: string }) {
  const [teamConfiguration, setTeamConfiguration] = useState({
    name,
    description,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [_, setTeam] = useAtom(selectedTeamAtom);
  const [__, setTeams] = useAtom(userTeamsAtom);

  const { id: teamId } = useParams();
  const router = useRouter();

  const handleTeamConfigurationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeamConfiguration((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamConfigurationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let config = {};

      if (teamConfiguration.name !== name && teamConfiguration.name !== "") {
        config = { ...config, name: teamConfiguration.name };
      }

      if (teamConfiguration.description !== description && teamConfiguration.description !== "") {
        config = { ...config, description: teamConfiguration.description };
      }

      const { data } = await api.patch(`/team/${teamId}`, config);
      setTeam(data);
      toast.success("Team configuration updated successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unknown error ocurred on updating team configuration");
      }
    }
  };

  const handleTeamDeletion = async () => {
    try {
      await api.delete(`/team/${teamId}`);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
      setTeam(null);
      router.push("/dashboard");
      toast.success("Team deleted successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unknown error ocurred on deleting team");
      }
    } finally {
      setTeam(null);
    }
  };

  return (
    <section className="flex flex-col gap-4 bg-slate-800 p-6 rounded-xl">
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl">Team configuration</h1>
        <span className="text-gray-400 text-sm">Manage your team settings</span>
      </header>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleTeamConfigurationSubmit(e)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-sm">
            Team name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-slate-900 px-3 py-2 border border-slate-700 rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300 ease-out"
            value={teamConfiguration.name}
            onChange={(e) => handleTeamConfigurationChange(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium text-sm">
            Team description
          </label>
          <textarea
            name="description"
            id="description"
            className="bg-slate-900 px-3 py-2 border border-slate-700 rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300 ease-out resize-none"
            value={teamConfiguration.description}
            onChange={(e) => handleTeamConfigurationChange(e)}
            rows={5}
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-medium text-white duration-300 ease-out cursor-pointer"
          >
            Save changes
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-red-500 text-xl">Danger zone</h2>
          <p className="text-gray-400 text-sm">
            Delete your team will remove all the related data. This action cannot be undone.
          </p>
          <button
            type="button"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-500/70 px-4 py-2 rounded-xl w-fit font-medium text-white duration-300 ease-out cursor-pointer"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete team
          </button>
        </div>
      </form>
      {isDeleteModalOpen && (
        <DeleteTeamModal
          teamName={teamConfiguration.name ?? ""}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleTeamDeletion}
        />
      )}
    </section>
  );
}

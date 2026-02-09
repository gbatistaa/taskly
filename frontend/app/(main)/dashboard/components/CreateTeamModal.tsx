import api from "@/app/_extra/api/api";
import { TeamRoles } from "@/app/_extra/enums/TeamRoles.enum";
import { Team } from "@/app/_extra/interfaces/team.interface";
import { AxiosError } from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { Vortex } from "react-loader-spinner";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userTeamsAtom } from "@/app/_extra/atoms/teams";
import { userDataAtom } from "@/app/_extra/atoms/auth";

function CreateTeamModal({ onClose }: { onClose: () => void }): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [userTeams, setUserTeams] = useAtom(userTeamsAtom);
  const [userData] = useAtom(userDataAtom);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const company = formData.get("company");
      const description = formData.get("description");

      if (!name || !company || !description) {
        toast.error("Please fill all the fields", { duration: 5000 });
        return;
      }

      setLoading(true);

      const { data: createdTeam }: { data: Team } = await api.post("/team", {
        name,
        company,
        description,
      });

      await api.post(`/team-member`, {
        teamId: createdTeam.id,
        teamRole: TeamRoles.OWNER,
      });

      const { data: teams }: { data: Team[] } = await api.get(`user/find-user-teams/${userData?.id}`);
      setUserTeams(teams);

      toast.success("Team created successfully!", { duration: 5000 });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 5000 });
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <section
      className={`top-0 z-50 fixed flex justify-center items-center bg-black/70 w-screen h-screen transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropClick}
    >
      <main
        className={`box-border flex flex-col gap-8 bg-slate-900 p-6 border border-slate-700 rounded-xl w-125 solid transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <header className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Create new team</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">Fill the information of your team</span>
        </header>
        <form className="flex flex-col gap-5" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="name">Team name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80 duration-300 ease-out"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80 duration-300 ease-out"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80 min-h-20 duration-300 ease-out"
            />
          </div>
          <button
            type="submit"
            className="box-border flex justify-center items-center bg-blue-500 hover:bg-blue-500/60 rounded-lg h-12 font-medium cursor-pointer"
          >
            {loading ? (
              <Vortex
                visible={true}
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="h-5/6"
                colors={["#1E40AF"]}
              />
            ) : (
              <span>Create team</span>
            )}
          </button>
        </form>
      </main>
    </section>
  );
}

export default CreateTeamModal;

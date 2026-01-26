import { Team } from "@/app/_extra/interfaces/team.interface";
import Link from "next/link";
import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";

function TeamCard({ team }: { team: Team }): React.JSX.Element {
  return (
    <Link
      href={`/team/${team.id}`}
      className="group flex flex-col gap-4 col-span-1 bg-slate-900 hover:shadow-[0_0_50px_rgba(96,165,250,0.3)] p-6 border border-slate-700 rounded-xl w-full text-gray-400 duration-300 ease-out cursor-pointer solid"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex bg-blue-500/30 p-2 rounded-xl w-fit aspect-square">
          <MdPeopleAlt className="w-8 h-auto text-blue-500" />
        </div>
        <BsArrowRight className="opacity-0 group-hover:opacity-100 w-5 h-auto text-white duration-300 ease-out" />
      </div>
      <h3 className="font-semibold text-white text-2xl">{team.name}</h3>
      <div className="flex items-center gap-2 text-gray-400">
        <LuBuilding2 />
        <span>Empresa</span>
      </div>
      <p className="wrap-break-word">{team.description}</p>
      <div className="flex items-center gap-2">
        <MdPeopleAlt />
        <span>8 members</span>
      </div>
    </Link>
  );
}

export default TeamCard;

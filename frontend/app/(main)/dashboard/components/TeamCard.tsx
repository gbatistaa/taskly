import { Team } from "@/app/_extra/interfaces/team.interface";
import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";

function TeamCard({ team }: { team: Team }): React.JSX.Element {
  return (
    <div className="flex cursor-pointer duration-300 ease-out text-gray-400 flex-col group hover:shadow-[0_0_50px_rgba(96,165,250,0.3)] gap-4 border solid border-slate-700 w-full rounded-xl p-6 bg-slate-900 col-span-1">
      <div className="flex w-full items-center justify-between">
        <div className="w-fit flex aspect-square p-2 rounded-xl bg-blue-500/30">
          <MdPeopleAlt className="w-8 h-auto text-blue-500" />
        </div>
        <BsArrowRight className="text-white h-auto w-5 opacity-0 group-hover:opacity-100 duration-300 ease-out" />
      </div>
      <h3 className="font-semibold text-2xl text-white">Nome</h3>
      <div className=" flex gap-2 items-center text-gray-400">
        <LuBuilding2 />
        <span>Empresa</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi distinctio delectus a accusamus voluptatum quibusdam, dolor, corporis dignissimos beatae quisquam pariatur qui eligendi? Obcaecati officia eaque alias eveniet quaerat!</p>
      <div className="flex gap-2 items-center">
        <MdPeopleAlt />
        <span>8 membros</span>
      </div>
    </div>
  );
}

export default TeamCard;
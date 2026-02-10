import { TaskType } from "@/app/_extra/interfaces/task.interface";
import { BiCalendar } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { useState } from "react";
import TaskModal from "./modals/TaskModal";

function Task({ task, columnId }: { task: TaskType; columnId: string }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-slate-900 p-4 border border-slate-700 hover:border-slate-600 rounded-xl w-full h-fit duration-300 hover:cursor-pointer"
        onClick={() => setIsUpdateModalOpen(true)}
      >
        <h2 className="font-semibold text-gray-200">{task.title}</h2>
        <p className="mt-2 text-gray-500 text-xs">{task.description}</p>
        <div className="flex items-center gap-2">
          <BiCalendar className="w-3 h-auto" />
          <h1 className="font-semibold text-gray-500 text-xs">
            {new Date(task.createdAt).toLocaleDateString("pt-BR")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <BsPerson className="w-3 h-auto" />
          <h1 className="font-semibold text-gray-500 text-xs">Cléber</h1>
        </div>
      </div>
      {isUpdateModalOpen && (
        <TaskModal onClose={() => setIsUpdateModalOpen(false)} mode="edit" columnId={columnId} task={task} />
      )}
    </>
  );
}

export default Task;

import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";
import TaskColumnModal from "./modals/TaskColumnEditModal";
import TaskColumnDeleteModal from "./modals/TaskColumnDeleteModal";

const fixedColumns = ["To Do", "In Progress", "Done"];

function TaskColumn({ id, name, color, position, teamId }: TaskColumnType) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-slate-800 border border-slate-700 rounded-xl w-72 min-h-96">
      <div className="flex flex-col flex-1 border-t-2 rounded-xl" style={{ borderTopColor: color }}>
        <div className="flex justify-between items-center gap-2 px-4 py-3 border-slate-700 border-b">
          <div className="flex items-center gap-2">
            <span className="rounded-full w-3 aspect-square" style={{ backgroundColor: color || "#ef4444" }}></span>
            <h1 className="font-semibold text-sm">{name || "To Do"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex justify-center items-center hover:bg-slate-700 rounded-md w-7 h-7 duration-300 hover:cursor-pointer"
            >
              <FaPencil className="w-3 h-auto" />
            </button>
            {!fixedColumns.includes(name) && (
              <button
                type="button"
                className="flex justify-center items-center hover:bg-red-500/20 rounded-md w-7 h-7 duration-300 hover:cursor-pointer"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <FaTrashAlt className="w-3 h-auto text-red-500" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2 p-2"></div>
        <button className="flex items-center gap-2 px-4 py-3 border-slate-700 border-t hover:cursor-pointer">
          <FaPlus className="w-3 h-auto" />
          <span>Add Task</span>
        </button>

        {isEditModalOpen && (
          <TaskColumnModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            mode="edit"
            taskColumn={{ id, name, color, position, teamId }}
          />
        )}
        {isDeleteModalOpen && (
          <TaskColumnDeleteModal
            taskColumn={{ id, name, color, position, teamId }}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default TaskColumn;

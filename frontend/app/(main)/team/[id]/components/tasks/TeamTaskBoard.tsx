import { FaPlus } from "react-icons/fa";
import TaskColumn from "./TaskColumn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";
import api from "@/app/_extra/api/api";
import { AxiosError } from "axios";
import { toast } from "sonner";

function TeamTaskBoard() {
  const [taskColumns, setTaskColumns] = useState<TaskColumnType[]>([]);
  const { id: teamId } = useParams();

  useEffect(() => {
    const fetchTaskColumns = async () => {
      try {
        const { data } = await api.get<TaskColumnType[]>(`/task-column/${teamId}`);
        setTaskColumns(data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
          toast.error(error.response?.data.message);
        } else {
          toast.error("Unexpected error on task column find");
        }
      }
    };

    fetchTaskColumns();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Task Board</h1>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-500/70 px-4 py-2 rounded-xl text-white duration-300 cursor-pointer">
          <FaPlus className="w-3 h-auto" />
          <span>Add Column</span>
        </button>
      </div>
      <div className="flex gap-4">
        {taskColumns.map((taskColumn) => (
          <TaskColumn
            key={taskColumn.id}
            id={taskColumn.id}
            name={taskColumn.name}
            color={taskColumn.color}
            position={taskColumn.position}
            teamId={taskColumn.teamId}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamTaskBoard;

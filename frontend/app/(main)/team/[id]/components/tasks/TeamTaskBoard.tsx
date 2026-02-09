import { FaPlus } from "react-icons/fa";
import TaskColumn from "./TaskColumn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";
import api from "@/app/_extra/api/api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import TaskColumnModal from "./TaskColumnEditModal";
import { createSocketClient } from "@/app/_extra/socket";
import { io } from "socket.io-client";

function TeamTaskBoard() {
  const [taskColumns, setTaskColumns] = useState<TaskColumnType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  useEffect(() => {
    if (!teamId) return;

    const socket = io("http://localhost:4000/task-column", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ SOCKET CONECTADO! ID:", socket.id);
      const room = Array.isArray(teamId) ? teamId[0] : teamId;
      console.log("Tentando entrar na sala:", room);
      socket.emit("join-team", room);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ ERRO DE CONEXÃO:", err.message);
    });

    socket.on("create", (data) => {
      console.log("Evento Create recebido:", data);
      setTaskColumns((prev) => [...prev, data]);
    });

    socket.on("update", (data) => {
      console.log("Column updated:", data);
      setTaskColumns((prev) => prev.map((col) => (col.id === data.id ? { ...col, ...data } : col)));
    });

    socket.on("delete", (id: string) => {
      console.log("Column deleted:", id);
      setTaskColumns((prev) => prev.filter((col) => col.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, [teamId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Task Board</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-500/70 px-4 py-2 rounded-xl text-white duration-300 cursor-pointer"
        >
          <FaPlus className="w-3 h-auto" />
          <span>Add Column</span>
        </button>
      </div>
      <div className="flex gap-4">
        {taskColumns.map((taskColumn) => {
          return (
            <TaskColumn
              key={taskColumn.id}
              id={taskColumn.id}
              name={taskColumn.name}
              color={taskColumn.color}
              position={taskColumn.position}
              teamId={taskColumn.teamId}
            />
          );
        })}
      </div>
      {isAddModalOpen && (
        <TaskColumnModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          mode="create"
          taskColumn={{ teamId: Array.isArray(teamId) ? teamId[0] : teamId! }}
        />
      )}
    </div>
  );
}

export default TeamTaskBoard;

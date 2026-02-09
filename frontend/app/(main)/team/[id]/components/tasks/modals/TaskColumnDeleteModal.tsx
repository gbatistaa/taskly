import { IoClose, IoWarning } from "react-icons/io5";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/app/_extra/api/api";
import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";

interface TaskColumnDeleteModalProps {
  taskColumn: TaskColumnType;
  onClose: () => void;
}

function TaskColumnDeleteModal({ taskColumn, onClose }: TaskColumnDeleteModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/task-column/${taskColumn?.id}`);
      toast.success("Column deleted successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }

    handleClose();
  };

  return (
    <section
      className={`top-0 left-0 z-50 fixed inset-0 flex justify-center items-center bg-black/70 w-screen h-screen transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropClick}
    >
      <main
        className={`box-border flex flex-col gap-6 bg-slate-900 p-6 border border-slate-700 rounded-xl w-125 solid transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <header className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Delete Column</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">This action cannot be undone</span>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-red-500/10 p-3 border border-red-500/30 rounded-lg">
            <IoWarning className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-red-500 text-sm">Warning</p>
              <p className="text-gray-300 text-sm">
                Deleting <span className="font-semibold">{taskColumn?.name}</span> will permanently remove the column
                and all its tasks. This action is irreversible.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="box-border flex flex-1 justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="box-border flex flex-1 justify-center items-center bg-red-500 hover:bg-red-500/60 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default TaskColumnDeleteModal;

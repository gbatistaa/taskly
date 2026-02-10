import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/app/_extra/api/api";
import { AxiosError } from "axios";
import { TaskType } from "@/app/_extra/interfaces/task.interface";

interface TaskModalProps {
  onClose: () => void;
  mode: "create" | "edit";
  columnId: string;
  task?: TaskType;
}

interface TaskModalState {
  title: string;
  description: string;
}

function TaskModal({ onClose, mode, columnId, task }: TaskModalProps) {
  const isEditMode = mode === "edit";

  const [isClosing, setIsClosing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formState, setFormState] = useState<TaskModalState>({
    title: isEditMode && task ? task.title : "",
    description: isEditMode && task ? task.description : "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      if (isEditMode && task) {
        await api.patch(`/task/${task.id}`, {
          title: formState.title,
          description: formState.description,
        });
        toast.success("Task updated successfully!");
      } else {
        await api.post(`/task`, {
          title: formState.title,
          description: formState.description,
          columnId,
        });
        toast.success("Task created successfully!");
      }
      handleClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.message)) {
          error.response?.data.message.forEach((message: string) => {
            toast.error(message);
          });
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error(isEditMode ? "Failed to update task" : "Failed to create task");
      }
    } finally {
      setIsPending(false);
    }
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
            <h1 className="font-semibold text-2xl">{isEditMode ? "Edit Task" : "Create Task"}</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">
            {isEditMode ? "Update your task details" : "Configure your new task"}
          </span>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-300 text-sm">
              Task title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              placeholder="Enter task title..."
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              className="bg-slate-950 px-3 py-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80 duration-300 ease-out"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-xs">Task Description</span>
              <textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="bg-slate-950 px-3 py-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80 min-h-20 duration-300 ease-out resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="box-border flex flex-1 justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="box-border flex flex-1 justify-center items-center bg-emerald-500 hover:bg-emerald-500/60 disabled:opacity-50 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              {isPending ? (isEditMode ? "Saving..." : "Creating...") : isEditMode ? "Save" : "Create Task"}
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}

export default TaskModal;

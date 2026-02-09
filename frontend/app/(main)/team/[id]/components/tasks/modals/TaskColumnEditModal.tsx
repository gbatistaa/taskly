import api from "@/app/_extra/api/api";
import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";
import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];
const fixedColumns = ["To Do", "In Progress", "Done"];

interface TaskColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  taskColumn?: Partial<TaskColumnType>;
}

interface TaskColumnModalState {
  name: string;
  color: string;
}

function TaskColumnModal({ isOpen, onClose, mode, taskColumn }: TaskColumnModalProps) {
  const isEditMode = mode === "edit";

  const [isClosing, setIsClosing] = useState(false);
  const [formState, setFormState] = useState<TaskColumnModalState>({
    name: isEditMode && taskColumn ? (taskColumn.name ?? "") : "",
    color: isEditMode && taskColumn ? (taskColumn.color ?? colors[0]) : colors[0],
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

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await api.patch(`/task-column/${taskColumn?.id}`, {
          name: formState.name,
          color: formState.color,
        });
        toast.success("Column updated successfully!");
      } else {
        await api.post(`/task-column`, {
          name: formState.name,
          color: formState.color,
          teamId: taskColumn?.teamId,
        });
        toast.success("Column created successfully!");
      }
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
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
            <h1 className="font-semibold text-2xl">{isEditMode ? "Edit Column" : "Create Column"}</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">
            {isEditMode ? "Update your column settings" : "Configure your new column"}
          </span>
        </header>

        <div className="flex flex-col gap-4">
          {!fixedColumns.includes(formState.name) && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-300 text-sm">
                Column Name
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter column name..."
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="bg-slate-950 px-3 py-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80 duration-300 ease-out"
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <label htmlFor="color" className="text-gray-300 text-sm">
              Column Color
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormState({ ...formState, color })}
                  className={`rounded-full w-8 h-8 duration-300 ease-out cursor-pointer hover:scale-110 ${formState.color === color ? "ring-2 ring-white/80" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Customized colors</span>
              <label
                htmlFor="color"
                className="rounded-lg w-16 h-8 duration-300 ease-out cursor-pointer"
                style={{ backgroundColor: formState.color }}
              >
                <input
                  type="color"
                  id="color"
                  value={formState.color}
                  onChange={(e) => setFormState({ ...formState, color: e.target.value })}
                  className="sr-only"
                />
              </label>
              <input
                type="text"
                value={formState.color}
                onChange={(e) => setFormState({ ...formState, color: e.target.value })}
                className="bg-slate-950 px-3 py-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80 w-30 duration-300 ease-out"
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
              type="button"
              onClick={handleSave}
              className="box-border flex flex-1 justify-center items-center bg-emerald-500 hover:bg-emerald-500/60 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              {isEditMode ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default TaskColumnModal;

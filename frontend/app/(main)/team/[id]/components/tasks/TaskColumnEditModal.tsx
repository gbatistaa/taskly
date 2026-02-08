import { TaskColumnType } from "@/app/_extra/interfaces/task-column.interface";
import { IoClose } from "react-icons/io5";

interface TaskColumnEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskColumn: TaskColumnType;
}

function TaskColumnEditModal({ isOpen, onClose, taskColumn }: TaskColumnEditModalProps) {
  const handleSave = () => {
    // TODO: Implementar lógica de salvar
    onClose();
  };

  const handleDelete = () => {
    // TODO: Implementar lógica de deletar
    onClose();
  };

  return (
    <section className="top-0 left-0 z-50 fixed inset-0 flex justify-center items-center bg-black/70 w-screen h-screen">
      <main className="box-border flex flex-col gap-6 bg-slate-900 p-6 border border-slate-700 rounded-xl w-125 solid">
        <header className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Edit Column</h1>
            <button type="button" onClick={onClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">Update your column settings</span>
        </header>

        <div className="flex flex-col gap-4">
          {/* Conteúdo interno será adicionado depois */}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="box-border flex flex-1 justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="box-border flex flex-1 justify-center items-center bg-emerald-500 hover:bg-emerald-500/60 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default TaskColumnEditModal;

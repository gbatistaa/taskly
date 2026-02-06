import { FaPlus } from "react-icons/fa";
import TaskColumn from "./TaskColumn";

function TeamTaskBoard() {
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
        <TaskColumn id="1" name="To Do" color="#ef4444" position={0} teamId="1" />
        <TaskColumn id="2" name="In Progress" color="#f59e0b" position={1} teamId="1" />
        <TaskColumn id="3" name="Done" color="#10b981" position={2} teamId="1" />
      </div>
    </div>
  );
}

export default TeamTaskBoard;

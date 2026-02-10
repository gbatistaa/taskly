import { TaskType } from "@/app/_extra/interfaces/task.interface";

function Task({ task }: { task: TaskType }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="font-semibold text-lg">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
    </div>
  );
}

export default Task;

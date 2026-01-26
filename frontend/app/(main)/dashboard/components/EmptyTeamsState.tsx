import React from "react";
import { FaUsers } from "react-icons/fa";

function EmptyTeamsState(): React.JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-4 col-span-3 py-20">
      <div className="flex justify-center items-center bg-slate-800 rounded-full w-24 h-24">
        <FaUsers size={40} className="text-slate-500" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-slate-300 text-xl">No teams yet</h3>
        <p className="max-w-md text-slate-400 text-sm text-center">
          You haven't joined or created any teams yet. Create your first team to start collaborating!
        </p>
      </div>
    </div>
  );
}

export default EmptyTeamsState;

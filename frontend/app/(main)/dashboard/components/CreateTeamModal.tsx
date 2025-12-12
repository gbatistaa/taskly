import React, { useState } from "react";
import { Vortex } from "react-loader-spinner";

function CreateTeamModal(): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  return (
    <section className="flex justify-center items-center fixed h-screen w-screen z-50 bg-black/70 top-0">
      <main className="flex flex-col gap-8 w-125 bg-slate-900 border solid border-slate-700 rounded-xl p-6 box-border">
        <header>
          <h1 className="font-semibold text-2xl">Create new team</h1>
          <span className="text-sm text-gray-400">Fill the information of your team</span>
        </header>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="name">Team name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 focus:ring-blue-500/80 duration-300 ease-out"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 focus:ring-blue-500/80 duration-300 ease-out"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 focus:ring-blue-500/80 duration-300 ease-out min-h-20"
            />
          </div>
          <button
            type="submit"
            className="flex box-border justify-center items-center h-12 bg-blue-500 rounded-lg hover:bg-blue-500/60 
            font-medium cursor-pointer"
          >
            {loading ? (
              <Vortex
                visible={true}
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="h-5/6"
                colors={["#1E40AF"]}
              />
            ) : <span>Create team</span>}
          </button>
        </form>
      </main>
    </section>
  );
}

export default CreateTeamModal;
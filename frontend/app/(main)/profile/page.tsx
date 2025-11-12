"use client"

import React, { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";

function ProfilePage(): React.JSX.Element {
  const [updatingUserData, setUpdatingUserData] = useState({ username: "", name: "", lastName: "" });

  return (
    <main
      className="flex flex-col items-center min-w-190 h-full border-amber-200 solid border
        box-border gap-3"
    >
      <div
        className="h-23 aspect-square flex items-center justify-center rounded-full
        bg-linear-to-r from-blue-500 to-blue-600"
      >
        <MdOutlinePerson className="h-4/7 w-auto" />
      </div>
      <h2 className="text-3xl font-bold">My Profile</h2>
      <p className="text-gray-400">Manage your personal informations</p>
      <section className="flex flex-col w-5/6 p-6 rounded-xl bg-slate-900 gap-6">
        <div className="flex flex-col gap-0.5 w-full">
          <h3 className="text-2xl font-semibold">Personal Informations</h3>
          <p className="text-sm text-gray-400">Update your register data</p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 *:text-sm">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="outline-none border rounded-xl p-2 border-slate-700 ring-2 ring-transparent
              bg-slate-950 focus:ring-blue-500/80"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-10">
            <div className="flex flex-col gap-2 *:text-sm">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="outline-none border rounded-xl p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 focus:ring-blue-500/80"
              />
            </div>
            <div className="flex flex-col gap-2 *:text-sm">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="outline-none border rounded-xl p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 focus:ring-blue-500/80"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 *:text-sm">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              className="outline-none border rounded-xl p-2 border-slate-700 ring-2 ring-transparent
              bg-slate-950 focus:ring-blue-500/80 cursor-not-allowed"
            />
          </div>
          <button
            className="flex box-border justify-center items-center h-12 w-fit px-4 mt-2 bg-blue-500 rounded-lg hover:bg-blue-500/60 
            font-medium cursor-pointer"
          >
            Update information
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProfilePage;
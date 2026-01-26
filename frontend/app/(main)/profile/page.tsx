"use client";

import api from "@/app/_extra/api/api";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import React, { FormEvent, useEffect, useState } from "react";
import { MdOutlinePerson } from "react-icons/md";

function ProfilePage(): React.JSX.Element {
  const [updatingUserData, setUpdatingUserData] = useState<Partial<UserData> | null>({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get("/auth/me");
      setUpdatingUserData({
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    };
    fetchUser();
    return () => {};
  }, []);

  const handleUpdateUserData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.patch(`/user/update/${updatingUserData?.id}`, {
      username: updatingUserData?.username,
      firstName: updatingUserData?.firstName,
      lastName: updatingUserData?.lastName,
    });
    console.log(response.data);
  };

  return (
    <main className="box-border flex flex-col items-center gap-3 pt-12 min-w-190 h-full solid">
      <div className="flex justify-center items-center bg-linear-to-r from-blue-500 to-blue-600 rounded-full h-23 aspect-square">
        <MdOutlinePerson className="w-auto h-4/7" />
      </div>
      <h2 className="font-bold text-3xl">My Profile</h2>
      <p className="text-gray-400">Manage your personal informations</p>
      <section className="flex flex-col gap-6 bg-slate-900 p-6 rounded-xl w-5/6">
        <div className="flex flex-col gap-0.5 w-full">
          <h3 className="font-semibold text-2xl">Personal Informations</h3>
          <p className="text-gray-400 text-sm">Update your register data</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleUpdateUserData(e)}>
          <div className="flex flex-col gap-2 *:text-sm *:duration-200 *:ease-out">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={updatingUserData?.username || ""}
              onChange={(e) => setUpdatingUserData((prev) => ({ ...prev, username: e.target.value }))}
              className="bg-slate-950 p-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80"
            />
          </div>
          <div className="gap-x-10 grid grid-cols-2">
            <div className="flex flex-col gap-2 *:text-sm *:duration-200 *:ease-out">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={updatingUserData?.firstName || ""}
                onChange={(e) => setUpdatingUserData((prev) => ({ ...prev, firstName: e.target.value }))}
                className="bg-slate-950 p-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80"
              />
            </div>
            <div className="flex flex-col gap-2 *:text-sm *:duration-200 *:ease-out">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={updatingUserData?.lastName || ""}
                onChange={(e) => setUpdatingUserData((prev) => ({ ...prev, lastName: e.target.value }))}
                className="bg-slate-950 p-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 *:text-sm">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={updatingUserData?.email || ""}
              disabled
              className="bg-slate-950 p-2 border border-slate-700 rounded-xl outline-none ring-2 ring-transparent focus:ring-blue-500/80 cursor-not-allowed"
            />
          </div>
          <button className="box-border flex justify-center items-center bg-blue-500 hover:shadow-[0_0_12px_rgba(96,165,250,0.6)] hover:brightness-110 mt-2 px-4 rounded-lg w-fit h-12 font-medium duration-200 ease-out cursor-pointer">
            Update information
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProfilePage;

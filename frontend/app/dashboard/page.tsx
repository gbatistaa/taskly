"use client"

import { useAtom } from "jotai";
import React, { MouseEvent, useEffect, useState } from "react";
import { userDataAtom } from "../atoms/auth";
import api from "../api/api";
import { UserData } from "../interfaces/user-data.interface";
import { BiCheckSquare } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

function DashBoard(): React.JSX.Element {
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data }: { data: UserData } = await api.get("/auth/me");
      setUserData(data);
    }

    fetchUserData();
  }, []);


  const handleLogoutButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      await api.post("/auth/logout");
      router.push("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full w-full">
      <header className="flex items-center justify-between w-full h-20 px-20
        shadow-[0px_0px_5px] shadow-slate-700">
        <div className="flex justify-between items-center gap-2 h-full">
          <BiCheckSquare className="h-10 w-auto text-green-600" />
          <h1 className="text-4xl font-bold">Taskly</h1>
        </div>
        <div className="flex justify-between items-center h-full aspect-square *:duration-200 *:ease-out">
          <button>

          </button>
          <button
            type="button"
            className="flex justify-center items-center h-1/2 aspect-square cursor-pointer
            rounded-lg hover:bg-blue-400/30"
            onClick={(e) => handleLogoutButtonClick(e)}
          >
            <IoIosLogOut className="h-6 w-auto text-white" />
          </button>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default DashBoard;
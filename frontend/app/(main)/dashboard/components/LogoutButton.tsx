"use client"

import api from "@/app/_extra/api/api";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

function LogoutButton(): React.JSX.Element {
  const router = useRouter()

  const handleLogoutButtonClick = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      type="button"
      className="flex justify-center items-center h-1/2 aspect-square cursor-pointer
            rounded-lg hover:bg-blue-400/30"
      onClick={() => handleLogoutButtonClick()}
    >
      <IoIosLogOut className="h-6 w-auto text-white" />
    </button>
  );
}

export default LogoutButton;
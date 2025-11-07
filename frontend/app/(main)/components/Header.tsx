import Link from "next/link";
import React from "react";
import { BiCheckSquare } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import LogoutButton from "../dashboard/components/LogoutButton";

function Header(): React.JSX.Element {
  return (
    <header className="flex items-center justify-between w-full h-20 px-20
        shadow-[0px_0px_5px] shadow-slate-700">
      <div className="flex justify-between items-center gap-2 h-full">
        <BiCheckSquare className="h-10 w-auto p-1 text-white bg-blue-500 border-box rounded-lg" />
        <h1 className="text-4xl font-bold">Taskly</h1>
      </div>
      <div className="flex justify-between items-center gap-2 h-full aspect-square *:duration-200 *:ease-out">
        <Link
          href="/profile"
          className="flex justify-center items-center h-1/2 aspect-square cursor-pointer
            rounded-lg hover:bg-blue-400/30"
        >
          <BsPersonCircle className="h-6 w-auto text-white" />
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Header;
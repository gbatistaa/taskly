import Link from "next/link";
import React from "react";
import { BiCheckSquare } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import LogoutButton from "../dashboard/components/LogoutButton";
function Header(): React.JSX.Element {
  return (
    <header className="flex justify-between items-center shadow-[0px_0px_5px] shadow-slate-700 px-20 w-full h-20">
      <Link href="/dashboard" className="flex justify-center items-center gap-2 h-full cursor-pointer">
        <BiCheckSquare className="bg-blue-500 p-1 border-box rounded-lg w-auto h-10 text-white" />
        <h1 className="font-bold text-4xl">Taskly</h1>
      </Link>
      <div className="flex justify-center items-center gap-2 h-full aspect-square *:duration-200 *:ease-out">
        <Link
          href="/profile"
          className="flex justify-center items-center hover:bg-blue-400/30 rounded-lg h-1/2 aspect-square cursor-pointer"
        >
          <BsPersonCircle className="w-auto h-6 text-white" />
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Header;

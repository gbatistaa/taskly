"use client"

import { useState } from "react";
import { UserInterface } from "/root/gbatistadev/personal-projects/taskly/backend/src/modules/user/interfaces/user.interface";

export default function Home() {
  const [users, setUsers] = useState([] as UserInterface[])

  const handleButtonClick = async () => {
    const data = await fetch('http://localhost:3004/');
    const response = await data.json();

    setUsers(response);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button type="button" onClick={handleButtonClick} className="cursor-pointer">
          BOTÃO
          <div>
            {JSON.stringify(users)}
          </div>
        </button>
      </main>
    </div>
  );
}

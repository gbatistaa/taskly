"use client"

import { MouseEvent, useState } from "react";
import api from "./api/api";
import { useRouter } from "next/navigation";
import { Vortex } from "react-loader-spinner";



export default function Home() {
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const handleDatabaseButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await api.get("/");
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      className="flex justify-center items-center h-12 bg-blue-500 rounded-lg w-80 px-3 py-2 hover:bg-blue-500/60 cursor-pointer"
      onClick={(e) => handleDatabaseButtonClick(e)}
    >
      {loading ?
        <Vortex
          visible={true}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="h-5/6"
          colors={['#000000']}
        /> : "Gerar Banco de Dados"}
    </button>

  );
}

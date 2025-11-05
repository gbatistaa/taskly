"use client"

import { MouseEvent, useEffect, useState } from "react";
import api from "./api/api";
import { useRouter } from "next/navigation";
import { Vortex } from "react-loader-spinner";
import Error from "next/error";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { userDataAtom } from "./atoms/auth";



export default function Home() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const handleSiteAccess = async () => {
      try {
        const { data } = await api.get("/auth/me");
        router.push("/dashboard");
      } catch (error: unknown) {
        if ((error as AxiosError).status === 401) {
          router.push("/login");
        }
      }
      finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    }

    handleSiteAccess();
    return () => { };
  }, []);

  return (
    <div>
      {loading ? (
        <Vortex
          visible={true}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="h-40"
          colors={['#ffffff']}
        />
      ) : <span></span>}
    </div>

  );
}

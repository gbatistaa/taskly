"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Vortex } from "react-loader-spinner";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { userDataAtom } from "./_extra/atoms/auth";
import api from "./_extra/api/api";



export default function Home() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const handleSiteAccess = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUserData(data);
        router.push("/dashboard");
      } catch (error: unknown) {
        if ((error as AxiosError).status === 401) {
          router.push("/login");
        }
      }
      finally {
        setLoading(false);
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

"use client";

import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vortex } from "react-loader-spinner";
import { toast } from "sonner";
import api from "./_extra/api/api";
import { userDataAtom } from "./_extra/atoms/auth";
import { UserData } from "./_extra/interfaces/user-data.interface";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [_, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const handleSiteAccess = async () => {
      try {
        const { data }: { data: UserData } = await api.get("/auth/me");
        setUserData(data);
        router.push("/dashboard");
      } catch (error: unknown) {
        const e = error as AxiosError;
        if (e.status === 401) {
          toast.error(e.message);
        }
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    handleSiteAccess();
  }, []);

  return (
    <div>
      {loading ? (
        <Vortex visible={true} ariaLabel="vortex-loading" wrapperStyle={{}} wrapperClass="h-40" colors={["#ffffff"]} />
      ) : (
        <span>Olá</span>
      )}
    </div>
  );
}

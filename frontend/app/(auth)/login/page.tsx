"use client";

import { atom, useAtom } from "jotai";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Vortex } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../_extra/api/api";
import { loginDataAtom, userDataAtom } from "../../_extra/atoms/auth";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { toast } from "sonner";
import { AxiosError } from "axios";

function login(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useAtom(loginDataAtom);
  const [_, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data }: { data: { accessToken: string; user: UserData } } = await api.post("/auth/login", loginData);
      setUserData(data.user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.status === 404 ? "User not found" : error.response?.data.message, {
          duration: 5000,
        });

        if (error.response?.status === 404) {
          setTimeout(() => {
            router.push("/signup");
          }, 1000);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-5 bg-slate-900 shadow-[0_0_12px_rgba(96,165,250,0.6)] p-6 rounded-xl w-120">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-2xl">Login</h1>
        <p className="text-neutral-400 text-sm">Enter your credentials to access your account</p>
      </div>
      <form
        className="flex flex-col gap-5 *:text-sm *:transition-all *:duration-200 *:ease-out"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex flex-col gap-1 *:transition-all *:duration-200 *:ease-out">
          <label htmlFor="email" className="font-medium text-gray-200">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            id="email"
            onChange={(e) => handleChangeInputValue(e)}
            className="bg-slate-950 px-2 py-2.5 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
          />
        </div>
        <div className="flex flex-col gap-1 *:transition-all *:duration-200 *:ease-out">
          <label htmlFor="password" className="font-medium text-gray-200">
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChangeInputValue(e)}
            className="bg-slate-950 px-2 py-2.5 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
          />
        </div>
        <button
          type="submit"
          className="box-border flex justify-center items-center bg-blue-500 hover:bg-blue-500/60 rounded-lg h-12 font-medium cursor-pointer"
        >
          {loading ? (
            <Vortex
              visible={true}
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="h-5/6"
              colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
            />
          ) : (
            <span>Sign in</span>
          )}
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}

export default login;

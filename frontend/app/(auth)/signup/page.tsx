"use client"

import api from "@/app/_extra/api/api";
import { signupDataAtom, userDataAtom } from "@/app/_extra/atoms/auth";
import { SignupData } from "@/app/_extra/interfaces/signup-data.interface";
import { UserData } from "@/app/_extra/interfaces/user-data.interface";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Vortex } from "react-loader-spinner";
import { toast } from "sonner";

function Signup(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useAtom(signupDataAtom);
  const [_, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setSignupData((prev: SignupData) => ({ ...prev, [name]: value }));
  }

  const formatDateToBrazilian = (dateString: string): string => {
    if (!dateString) return "Selecione uma data";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log(signupData);

      await api.post("/user/create", signupData);

      const { data }: { data: { accessToken: string, user: UserData } } = await api.post("/auth/login", {
        email: signupData.email,
        password: signupData.password,
      });
      setUserData(data.user);
      router.push("/dashboard");

      toast.success(`Welcome ${signupData.firstName} ${signupData.lastName}`);

      setSignupData({
        cpf: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        birthDate: "",
      });
    } catch (e: unknown) {
      console.log(e);
      const error = e as AxiosError;
      toast.error((error.response?.data as { message?: string })?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col p-6 gap-5 w-150 rounded-xl bg-slate-900 shadow-[0_0_12px_rgba(96,165,250,0.6)]">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-2xl">Sign up</h1>
        <p className="text-neutral-400 text-sm">Fill your data to start</p>
      </div>
      <form className="flex flex-col *:duration-200 *:ease-out *:transition-all *:text-sm gap-5" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all w-1/2">
            <label htmlFor="firstName" className="text-gray-200 font-medium">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => handleChangeInputValue(e)}
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
            />
          </div>
          <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all w-1/2">
            <label htmlFor="lastName" className="text-gray-200 font-medium">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => handleChangeInputValue(e)}
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all">
          <label htmlFor="username" className="text-gray-200 font-medium">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => handleChangeInputValue(e)}
            className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
          />
        </div>
        <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all">
          <label htmlFor="email" className="text-gray-200 font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => handleChangeInputValue(e)}
            className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all w-1/2">
            <label htmlFor="cpf" className="text-gray-200 font-medium">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              onChange={(e) => handleChangeInputValue(e)}
              className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
            />
          </div>
          <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all w-1/2">
            <label htmlFor="birthDate" className="text-gray-200 font-medium">Birth date</label>
            <div className="relative">
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => handleChangeInputValue(e)}
                className="sr-only"
              />
              <div
                onClick={() => document.getElementById('birthDate')?.click()}
                className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
                bg-slate-950 hover:ring-blue-500/80 cursor-pointer duration-200 ease-out transition-all"
              >
                {formatDateToBrazilian(signupData.birthDate?.toString() || "")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all ">
          <label htmlFor="password" className="text-gray-200 font-medium">Your Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChangeInputValue(e)}
            className="outline-none border rounded-lg p-2 border-slate-700 ring-2 ring-transparent
            bg-slate-950 focus:ring-blue-500/80"
          />
        </div>
        <button
          type="submit"
          className="flex box-border justify-center items-center h-12 bg-blue-500 rounded-lg hover:bg-blue-500/60
            font-medium cursor-pointer"
        >
          {loading ? (
            <Vortex
              visible={true}
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="h-5/6"
              colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
            />
          ) : <span>Sign up</span>}
        </button>
        <p className="text-center">Already have an account?
          {" "}<Link href="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Signup;

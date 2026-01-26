"use client";

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
    setSignupData((prev: SignupData) => ({ ...prev, [name]: value }));
  };

  const formatDateToBrazilian = (dateString: string): string => {
    if (!dateString) return "Selecione uma data";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      await api.post("/user/create", signupData);

      const { data }: { data: { accessToken: string; user: UserData } } = await api.post("/auth/login", {
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
  };

  return (
    <main className="flex flex-col gap-5 bg-slate-900 shadow-[0_0_12px_rgba(96,165,250,0.6)] p-6 rounded-xl w-150">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-2xl">Sign up</h1>
        <p className="text-neutral-400 text-sm">Fill your data to start</p>
      </div>
      <form
        className="flex flex-col gap-5 *:text-sm *:transition-all *:duration-200 *:ease-out"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2 *:transition-all *:duration-200 *:ease-out">
            <label htmlFor="firstName" className="font-medium text-gray-200">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => handleChangeInputValue(e)}
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2 *:transition-all *:duration-200 *:ease-out">
            <label htmlFor="lastName" className="font-medium text-gray-200">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => handleChangeInputValue(e)}
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 *:transition-all *:duration-200 *:ease-out">
          <label htmlFor="username" className="font-medium text-gray-200">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => handleChangeInputValue(e)}
            className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
          />
        </div>
        <div className="flex flex-col gap-1 *:transition-all *:duration-200 *:ease-out">
          <label htmlFor="email" className="font-medium text-gray-200">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => handleChangeInputValue(e)}
            className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2 *:transition-all *:duration-200 *:ease-out">
            <label htmlFor="cpf" className="font-medium text-gray-200">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              onChange={(e) => handleChangeInputValue(e)}
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2 *:transition-all *:duration-200 *:ease-out">
            <label htmlFor="birthDate" className="font-medium text-gray-200">
              Birth date
            </label>
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
                onClick={() => document.getElementById("birthDate")?.click()}
                className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent hover:ring-blue-500/80 transition-all duration-200 ease-out cursor-pointer"
              >
                {formatDateToBrazilian(signupData.birthDate?.toString() || "")}
              </div>
            </div>
          </div>
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
            className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-blue-500/80"
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
            <span>Sign up</span>
          )}
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Signup;

"use client"

import { atom, useAtom } from "jotai";
import React, { ChangeEvent, FormEvent, useState } from "react";
import api from "../api/api";
import { Vortex } from "react-loader-spinner";
import Link from "next/link";

const loginDataAtom = atom({ email: "", password: "" });

function login(): React.JSX.Element {
  const [loginData, setLoginData] = useAtom(loginDataAtom);
  const [loading, setLoading] = useState(false);

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", loginData);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col p-6 gap-6 w-120 rounded-xl bg-slate-900 shadow-[0_0_12px_rgba(96,165,250,0.6)]">
      <h1 className="font-semibold text-2xl">Login</h1>
      <p className="text-neutral-400 text-sm">Enter your credentials to access your account</p>
      <form className="flex flex-col *:duration-200 *:ease-out *:transition-all  *:text-sm gap-4" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all ">
          <label htmlFor="email" className="text-gray-200">Your Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            id="email"
            onChange={(e) => handleChangeInputValue(e)}
            className="outline-none border-2 rounded-lg py-2.5 px-2 border-slate-700 ring-3 ring-transparent
                focus:ring-blue-500/80"
          />
        </div>
        <div className="flex flex-col gap-1 *:duration-200 *:ease-out *:transition-all ">
          <label htmlFor="password" className="text-gray-200">Your Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChangeInputValue(e)}
            className="outline-none border-2 rounded-lg py-2.5 px-2 border-slate-700 ring-3 ring-transparent
                focus:ring-blue-500/80"
          />
        </div>
        <button type="submit" className="flex box-border justify-center items-center h-12 bg-blue-500 rounded-lg hover:bg-blue-500/60 cursor-pointer">
          {loading ?
            <Vortex
              visible={true}
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="h-5/6"
              colors={['#000000']}
            /> : "Sign in"}
        </button>
        <p className="text-center">Don't have an account?
          {" "}<Link href="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </form>
    </main>
  );
}

export default login;
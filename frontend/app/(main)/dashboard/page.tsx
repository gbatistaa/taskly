"use client"

import { useAtom } from "jotai";
import React, { MouseEvent, useEffect, useState } from "react";
import { BiCheckSquare } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { UserData } from "../../_extra/interfaces/user-data.interface";
import api from "../../_extra/api/api";
import { userDataAtom } from "../../_extra/atoms/auth";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import Header from "../components/Header";

function DashBoard(): React.JSX.Element {
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data }: { data: UserData } = await api.get("/auth/me");
      setUserData(data);
    }

    fetchUserData();
  }, []);

  return (
    <main></main>
  );
}

export default DashBoard;
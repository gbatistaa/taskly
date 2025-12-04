import { atom } from "jotai";
import { UserData } from "../interfaces/user-data.interface";
import { atomWithStorage } from "jotai/utils";

export const userDataAtom = atomWithStorage<UserData | null>("userData", null);

export const loginDataAtom = atom({ email: "", password: "" });

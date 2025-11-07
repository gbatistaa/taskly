import { atom } from "jotai";
import { UserData } from "../interfaces/user-data.interface";
import { atomWithStorage } from "jotai/utils";

export const userDataAtom = atom<UserData | null>(null);

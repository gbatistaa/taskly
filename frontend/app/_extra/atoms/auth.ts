import { atom } from "jotai";
import { UserData } from "../interfaces/user-data.interface";
import { LoginData } from "../interfaces/login-data.interface";
import { SignupData } from "../interfaces/signup-data.interface";
import { atomWithStorage } from "jotai/utils";

export const userDataAtom = atomWithStorage<UserData | null>("userData", null);
export const loginDataAtom = atom<LoginData>({ email: "", password: "" });
export const signupDataAtom = atom<SignupData>({
  cpf: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  username: "",
  birthDate: "",
});

import { atom } from "jotai";
import { Team } from "../interfaces/team.interface";

export const userTeamsAtom = atom<Team[]>([]);

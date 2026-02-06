import { atom } from "jotai";
import { Team } from "../interfaces/team.interface";

export const userTeamsAtom = atom<Team[]>([]);
export const selectedTeamAtom = atom<Team | null>(null);

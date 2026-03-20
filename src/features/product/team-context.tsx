"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type ProductTeam = { name: string; role: string };

export const productInitialTeams: ProductTeam[] = [
  { name: "Dine Team", role: "Owner" },
  { name: "Personal", role: "Member" },
];

const DASHBOARD_USER_NAME = "Youcai Zhang";

type TeamContextValue = {
  teams: ProductTeam[];
  setTeams: Dispatch<SetStateAction<ProductTeam[]>>;
  activeTeam: string;
  setActiveTeam: (name: string) => void;
  userName: string;
};

const TeamContext = createContext<TeamContextValue | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<ProductTeam[]>(productInitialTeams);
  const [activeTeam, setActiveTeam] = useState("Dine Team");

  const value = useMemo(
    () => ({
      teams,
      setTeams,
      activeTeam,
      setActiveTeam,
      userName: DASHBOARD_USER_NAME,
    }),
    [teams, activeTeam],
  );

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) {
    throw new Error("useTeam must be used within TeamProvider");
  }
  return ctx;
}

/** For shared components (e.g. Navbar) that render both inside and outside product layout. */
export function useTeamOptional() {
  return useContext(TeamContext);
}

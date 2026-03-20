"use client";

import { useState } from "react";
import ChevronDown from "@/images/chevron-down.svg";
import {
  teamContextBadgeClass,
  TeamPickerRows,
} from "@/features/product/components/team-picker-rows";
import { useTeam } from "@/features/product/team-context";

export function ProductTeamSwitcher() {
  const { activeTeam, setActiveTeam, teams, userName } = useTeam();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Switch team"
        aria-expanded={open}
        className="bg-surface hover:bg-foreground/10 flex h-8 cursor-pointer items-center gap-1.5 rounded-xs px-2 text-sm font-normal transition-colors duration-150"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="text-foreground max-w-32 truncate">
            {activeTeam === "Personal" ? userName : activeTeam}
          </span>
          <span className={teamContextBadgeClass}>
            {activeTeam === "Personal" ? "Personal" : "Team"}
          </span>
        </span>
        <ChevronDown
          className={`text-foreground/60 size-4 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-50 pt-2">
          <div className="border-foreground/5 bg-background flex w-56 flex-col rounded-xs border py-1 shadow-lg">
            <TeamPickerRows
              activeTeam={activeTeam}
              teams={teams}
              userName={userName}
              onSelectTeam={(name) => {
                setActiveTeam(name);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

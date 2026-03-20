export const teamContextBadgeClass =
  "text-foreground/60 shrink-0 rounded-xs bg-foreground/10 px-1.5 py-0.5 text-xs font-medium leading-none";

function TeamPickerCheckmark() {
  return (
    <svg
      className="text-foreground size-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8.5L6.5 12L13 4" />
    </svg>
  );
}

type TeamPickerRowsProps = {
  activeTeam: string;
  teams: { name: string; role: string }[];
  userName: string;
  onSelectTeam: (team: string) => void;
};

export function TeamPickerRows({
  activeTeam,
  teams,
  userName,
  onSelectTeam,
}: TeamPickerRowsProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onSelectTeam("Personal")}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left transition-colors duration-150 ${
          activeTeam === "Personal"
            ? "bg-foreground/5"
            : "hover:bg-foreground/5"
        }`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-1.5">
          <span className="text-foreground truncate text-sm font-normal">
            {userName}
          </span>
          <span className={teamContextBadgeClass}>Personal</span>
        </span>
        {activeTeam === "Personal" && <TeamPickerCheckmark />}
      </button>
      {teams
        .filter((t) => t.name !== "Personal")
        .map((team) => (
          <button
            key={team.name}
            type="button"
            onClick={() => onSelectTeam(team.name)}
            className={`flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left transition-colors duration-150 ${
              activeTeam === team.name
                ? "bg-foreground/5"
                : "hover:bg-foreground/5"
            }`}
          >
            <span className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className="text-foreground truncate text-sm font-normal">
                {team.name}
              </span>
              <span className={teamContextBadgeClass}>Team</span>
            </span>
            {activeTeam === team.name && <TeamPickerCheckmark />}
          </button>
        ))}
    </>
  );
}

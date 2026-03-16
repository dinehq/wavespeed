function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: string | undefined;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="tracking-lg flex cursor-pointer items-center gap-1.5 font-mono text-xs text-white/40 uppercase transition-colors hover:text-white"
    >
      {theme === "dark" ? (
        <>
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
              stroke="none"
            />
            <line x1="19" y1="2" x2="19" y2="5" />
            <line x1="17.5" y1="3.5" x2="20.5" y2="3.5" />
          </svg>
          Dark
        </>
      ) : theme === "light" ? (
        <>
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="5" stroke="none" />
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
          Light
        </>
      ) : (
        <>
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="2"
              y="3"
              width="20"
              height="14"
              rx="2"
              fill="currentColor"
              stroke="none"
            />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          System
        </>
      )}
    </button>
  );
}

export { ThemeToggle };

import Logo from "@/images/logo.svg";
import SearchIcon from "@/images/search-icon.svg";
import ChevronDown from "@/images/chevron-down.svg";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 h-16 w-full">
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center transition-opacity duration-150 hover:opacity-70"
        >
          <Logo className="h-6 w-auto text-black" />
        </Link>
      </div>

      <div className="flex items-center gap-8">
        {["Models", "Pricing", "Enterprise"].map((item) => (
          <a
            key={item}
            href="#"
            className="font-mono text-sm text-foreground tracking-[1.2px] leading-4 transition-colors duration-150 hover:text-black/50"
          >
            {item}
          </a>
        ))}
        <a
          href="#"
          className="flex items-center gap-1 font-mono text-sm text-foreground tracking-[1.2px] leading-4 transition-colors duration-150 hover:text-black/50"
        >
          Resources
          <ChevronDown className="size-4" />
        </a>
      </div>

      <div className="flex-1 flex items-center justify-end gap-2">
        <button className="bg-surface rounded-xs size-8 flex items-center justify-center transition-colors duration-150 hover:bg-black/10 cursor-pointer">
          <svg
            className="size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M1.5 8h13M8 1.5c-2 2-3 4.2-3 6.5s1 4.5 3 6.5M8 1.5c2 2 3 4.2 3 6.5s-1 4.5-3 6.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="bg-surface rounded-xs px-2 py-2 flex items-center gap-2 transition-colors duration-150 hover:bg-black/10">
          <SearchIcon className="size-[14px] opacity-40" />
          <input
            type="text"
            placeholder="SEARCH MODEL..."
            className="font-mono text-sm text-foreground tracking-[1.2px] uppercase bg-transparent outline-none placeholder:text-faint w-[140px]"
          />
        </div>
        <a
          href="#"
          className="bg-black text-white rounded-xs px-4 py-2 font-mono text-sm tracking-[1.2px] uppercase flex items-center justify-center transition-colors duration-150 hover:bg-black/80"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
}

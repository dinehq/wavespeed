"use client";

import { useState } from "react";
import Logo from "@/images/logo.svg";
import SearchIcon from "@/images/search-icon.svg";
import ChevronDown from "@/images/chevron-down.svg";
import Link from "next/link";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex h-16 w-full items-center justify-between px-4">
      <div className="flex-1">
        <Link
          href="/"
          aria-label="WaveSpeed home"
          className="inline-flex items-center transition-opacity duration-150 hover:opacity-70"
        >
          <Logo className="h-6 w-auto text-black" />
        </Link>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {["Models", "Pricing", "Enterprise"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-foreground font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150 hover:text-black/50"
          >
            {item}
          </a>
        ))}
        <a
          href="#"
          className="text-foreground flex items-center gap-1 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150 hover:text-black/50"
        >
          Resources
          <ChevronDown className="size-4" />
        </a>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <button
          aria-label="Language"
          className="bg-surface hidden size-8 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150 hover:bg-black/10 md:flex"
        >
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
        <div className="bg-surface hidden items-center gap-2 rounded-xs px-2 py-2 transition-colors duration-150 hover:bg-black/10 md:flex">
          <SearchIcon className="size-[14px] opacity-40" />
          <input
            type="text"
            placeholder="SEARCH MODEL..."
            className="text-foreground placeholder:text-faint w-[140px] bg-transparent font-mono text-sm tracking-[1.2px] uppercase outline-none"
          />
        </div>
        <a
          href="#"
          className="flex items-center justify-center rounded-xs bg-black px-4 py-2 font-mono text-sm tracking-[1.2px] text-white uppercase transition-colors duration-150 hover:bg-black/80"
        >
          Sign In
        </a>

        {/* Hamburger button — mobile only */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-8 cursor-pointer items-center justify-center md:hidden"
        >
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 border-t border-black/5 bg-white p-4 shadow-lg md:hidden">
          {["Models", "Pricing", "Enterprise", "Resources"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-foreground py-2 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150 hover:text-black/50"
            >
              {item}
            </a>
          ))}
          <div className="bg-surface flex items-center gap-2 rounded-xs px-2 py-2">
            <SearchIcon className="size-[14px] opacity-40" />
            <input
              type="text"
              placeholder="SEARCH MODEL..."
              className="text-foreground placeholder:text-faint flex-1 bg-transparent font-mono text-sm tracking-[1.2px] uppercase outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

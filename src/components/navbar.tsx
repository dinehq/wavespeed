"use client";

import { useEffect, useState } from "react";
import Logo from "@/images/logo.svg";
import SearchIcon from "@/images/search-icon.svg";
import ChevronDown from "@/images/chevron-down.svg";
import Link from "next/link";

const resourceGroups = [
  {
    label: "Products",
    items: [
      { name: "Desktop", href: "/download" },
      { name: "Studio", href: "/studio" },
      { name: "Tools", href: "/tools" },
    ],
  },
  {
    label: "Developers",
    items: [
      { name: "Doc", href: "/docs" },
      { name: "GitHub", href: "/github" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "Contact Sales", href: "/contact" },
      { name: "Customer Stories", href: "/customers" },
      { name: "Affiliate", href: "/affiliate" },
    ],
  },
  {
    label: "Community",
    items: [
      { name: "Support", href: "/support" },
      { name: "Inspiration", href: "/inspiration" },
      { name: "Be a Creator", href: "/creators" },
    ],
  },
];

const teams = [
  { name: "Dine Team", role: "Owner" },
  { name: "Personal", role: "Member" },
];

const languages = [
  "English",
  "Bahasa Indonesia",
  "Français",
  "Español",
  "Português",
  "Deutsch",
  "한국어",
  "日本語",
  "简体中文",
  "繁體中文",
];

type NavbarProps = {
  mode?: "default" | "dashboard";
  overlay?: boolean;
};

export function Navbar({ mode = "default", overlay }: NavbarProps) {
  const isDashboardMode = mode === "dashboard";
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");
  const [activeTeam, setActiveTeam] = useState("Dine Team");
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOverlay = overlay && !scrolled;

  return (
    <nav
      className={`sticky top-0 z-40 flex h-16 w-full items-center justify-center px-6 transition-all duration-300 md:px-12 lg:px-20 ${
        isOverlay ? "text-white" : "bg-background shadow-sm"
      }`}
    >
      <div className="flex w-full max-w-7xl items-center justify-between gap-6">
        {/* Left: Logo + Nav links */}
        <div className="flex min-w-0 items-center gap-10">
          <Link
            href="/"
            aria-label="WaveSpeed home"
            className="inline-flex items-center transition-opacity duration-150 hover:opacity-70"
          >
            <Logo
              className={`h-6 w-auto ${isOverlay ? "text-white" : "text-foreground"}`}
            />
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {[
              { label: "Explore", href: "/explore" },
              { label: "Pricing", href: "/pricing" },
              { label: "Enterprise", href: "/enterprise" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`tracking-xl font-mono text-sm leading-4 font-medium transition-colors duration-150 ${isOverlay ? "text-white hover:text-white/70" : "text-foreground hover:text-foreground/50"}`}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="group relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className={`tracking-xl flex cursor-pointer items-center gap-1 font-mono text-sm leading-4 font-medium transition-colors duration-150 ${isOverlay ? "text-white hover:text-white/70" : "text-foreground hover:text-foreground/50"}`}
              >
                Resources
                <ChevronDown
                  className={`size-4 transition-transform duration-150${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full -left-5 z-50 pt-4">
                  <div className="border-foreground/5 bg-background grid w-105 grid-cols-2 gap-x-6 gap-y-4 rounded-xs border p-3 shadow-lg">
                    {resourceGroups.map((group) => (
                      <div key={group.label} className="flex flex-col">
                        <p className="text-foreground/40 tracking-xl mb-1 px-2 font-mono text-xs">
                          {group.label}
                        </p>
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-xs px-2 py-1.5 font-mono text-sm transition-colors duration-150"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Search + Team + Utility buttons */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            href="/explore"
            aria-label="Search"
            className={`hidden size-8 items-center justify-center rounded-xs transition-colors duration-150 md:flex xl:hidden ${isOverlay ? "bg-white/25 hover:bg-white/35" : "bg-surface hover:bg-foreground/10"}`}
          >
            <SearchIcon className={isOverlay ? "text-white" : "opacity-60"} />
          </Link>
          <div
            className={`hidden items-center gap-1.5 rounded-xs px-2 py-1.5 transition-colors duration-150 xl:flex ${isOverlay ? "bg-white/25 hover:bg-white/35" : "bg-surface hover:bg-foreground/10"}`}
          >
            <SearchIcon
              className={isOverlay ? "text-white/70" : "opacity-40"}
            />
            <input
              type="text"
              placeholder="Search model..."
              className={`tracking-xl w-35 bg-transparent font-mono text-sm outline-none ${isOverlay ? "text-white placeholder:text-white/70" : "text-foreground placeholder:text-faint"}`}
            />
          </div>
          <div
            className="relative hidden lg:flex"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              aria-label="Language"
              className={`flex size-8 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150 ${isOverlay ? "bg-white/25 text-white hover:bg-white/35" : "bg-surface hover:bg-foreground/10"}`}
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
            {langOpen && (
              <div className="absolute top-full right-0 z-50 pt-4">
                <div className="border-foreground/5 bg-background flex w-50 flex-col rounded-xs border py-2 shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        setLangOpen(false);
                      }}
                      className="text-foreground/80 hover:bg-foreground/5 flex cursor-pointer items-center justify-between px-4 py-2 text-left font-mono text-sm transition-colors duration-150"
                    >
                      {lang}
                      {activeLang === lang && (
                        <svg
                          className="text-foreground size-4 shrink-0"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8.5L6.5 12L13 4" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {isDashboardMode ? (
            <>
              <Link
                href="/billing"
                aria-label="Billing"
                className="group hidden h-8 items-center gap-px lg:inline-flex"
              >
                <span className="bg-surface group-hover:bg-foreground/10 text-foreground tracking-sm inline-flex h-8 items-center rounded-xs px-2 font-sans text-sm font-medium transition-colors duration-150">
                  $6.186
                </span>
                <span className="bg-surface group-hover:bg-foreground/10 text-foreground/70 inline-flex size-8 items-center justify-center rounded-xs transition-colors duration-150">
                  <svg
                    className="size-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3.5v9M3.5 8h9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setUserOpen(true)}
                onMouseLeave={() => setUserOpen(false)}
              >
                <button
                  aria-label="User profile"
                  className="bg-surface hover:bg-foreground/10 flex size-8 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150"
                >
                  <svg
                    className="text-foreground size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="5.2"
                      r="2.2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M3.5 12.8c0-2.1 2-3.4 4.5-3.4s4.5 1.3 4.5 3.4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                {userOpen && (
                  <div className="absolute top-full right-0 z-50 pt-4">
                    <div className="border-foreground/5 bg-background flex w-56 flex-col rounded-xs border shadow-lg">
                      <div className="border-foreground/5 border-b px-4 py-3">
                        <p className="text-foreground text-sm font-medium">
                          user@wavespeed.ai
                        </p>
                      </div>
                      <div className="border-foreground/5 border-b py-2">
                        <p className="text-foreground/50 px-4 py-1 text-xs">
                          Teams
                        </p>
                        {teams.map((team) => (
                          <button
                            key={team.name}
                            onClick={() => {
                              setActiveTeam(team.name);
                              setUserOpen(false);
                            }}
                            className="text-foreground/80 hover:bg-foreground/5 flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-sm transition-colors duration-150"
                          >
                            <span className="flex items-center gap-2">
                              <span className="bg-foreground/10 inline-block size-5 rounded-full" />
                              <span className="text-foreground text-sm font-medium">
                                {team.name}
                              </span>
                            </span>
                            {activeTeam === team.name && (
                              <svg
                                className="text-foreground size-4 shrink-0"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 8.5L6.5 12L13 4" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="py-2">
                        <Link
                          href="/settings"
                          className="text-foreground/80 hover:bg-foreground/5 block cursor-pointer px-4 py-2 text-sm transition-colors duration-150"
                        >
                          Settings
                        </Link>
                        <Link
                          href="/sign-in"
                          className="text-foreground/80 hover:bg-foreground/5 block cursor-pointer px-4 py-2 text-sm transition-colors duration-150"
                        >
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/sign-in"
              className={`tracking-xl flex items-center justify-center rounded-xs px-4 py-1.5 font-mono text-sm font-medium transition-colors duration-150 ${isOverlay ? "bg-white text-black hover:bg-white/90" : "bg-foreground text-background hover:bg-foreground/80"}`}
            >
              Sign In
            </Link>
          )}

          {/* Hamburger button — mobile only */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-8 cursor-pointer items-center justify-center lg:hidden"
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
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="border-foreground/5 bg-background absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 border-t p-4 shadow-lg lg:hidden">
          {isDashboardMode && (
            <div className="flex flex-col gap-1">
              {teams.map((team) => (
                <button
                  key={team.name}
                  onClick={() => setActiveTeam(team.name)}
                  className={`flex cursor-pointer items-center justify-between rounded-xs px-2 py-2 text-left transition-colors duration-150 ${
                    activeTeam === team.name
                      ? "bg-foreground/5"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-foreground/10 inline-block size-5 rounded-full" />
                    <span>
                      <span className="text-foreground block text-sm font-medium">
                        {team.name}
                      </span>
                      <span className="text-foreground/50 block text-xs">
                        {team.role}
                      </span>
                    </span>
                  </span>
                  {activeTeam === team.name && (
                    <svg
                      className="text-foreground size-4 shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5L6.5 12L13 4" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
          {[
            { label: "Explore", href: "/explore" },
            { label: "Pricing", href: "/pricing" },
            { label: "Enterprise", href: "/enterprise" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground hover:text-foreground/50 tracking-xl py-2 font-mono text-sm leading-4 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="text-foreground hover:text-foreground/50 tracking-xl flex cursor-pointer items-center gap-1 py-2 font-mono text-sm leading-4 transition-colors duration-150"
          >
            Resources
            <ChevronDown
              className={`size-4 transition-transform duration-150${resourcesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {resourcesOpen && (
            <div className="grid grid-cols-2 gap-4 pl-2">
              {resourceGroups.map((group) => (
                <div key={group.label} className="flex flex-col">
                  <p className="text-foreground/40 tracking-xl mb-1 font-mono text-xs uppercase">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground/80 hover:text-foreground py-1.5 font-mono text-sm transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
          {isDashboardMode && (
            <Link
              href="/billing"
              className="text-foreground hover:text-foreground/50 tracking-xl flex items-center gap-2 py-2 font-mono text-sm leading-4 transition-colors duration-150"
            >
              <span>Balance</span>
              <span className="text-foreground/60 font-sans text-sm font-medium">
                $6.186
              </span>
            </Link>
          )}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-foreground hover:text-foreground/50 tracking-xl flex cursor-pointer items-center gap-1 py-2 font-mono text-sm leading-4 transition-colors duration-150"
            >
              Language
              <span className="text-foreground/50 text-xs">({activeLang})</span>
              <ChevronDown
                className={`size-4 transition-transform duration-150${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            {langOpen && (
              <div className="flex flex-col gap-1 pl-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setActiveLang(lang);
                      setLangOpen(false);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xs px-2 py-1.5 text-left font-mono text-sm transition-colors duration-150 ${
                      activeLang === lang
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {lang}
                    {activeLang === lang && (
                      <svg
                        className="text-foreground size-4 shrink-0"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5L6.5 12L13 4" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bg-surface flex items-center gap-2 rounded-xs px-2 py-2">
            <SearchIcon className="opacity-40" />
            <input
              type="text"
              placeholder="Search model..."
              className="text-foreground placeholder:text-faint tracking-xl flex-1 bg-transparent font-mono text-sm outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

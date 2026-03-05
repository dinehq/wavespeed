"use client";

import { useState } from "react";
import Logo from "@/images/logo.svg";
import SearchIcon from "@/images/search-icon.svg";
import ChevronDown from "@/images/chevron-down.svg";
import Link from "next/link";

const resourceGroups = [
  {
    label: "Products",
    items: [
      { name: "Studio", desc: "Create with AI models" },
      { name: "Tools", desc: "Image & video utilities" },
      { name: "Download App", desc: "Desktop application" },
    ],
  },
  {
    label: "Developers",
    items: [
      { name: "Doc", desc: "API reference & guides" },
      { name: "GitHub", desc: "Open source repos" },
      { name: "Blog", desc: "Engineering updates" },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "Contact Sales", desc: "Talk to our team" },
      { name: "Customer Stories", desc: "Case studies" },
      { name: "Affiliate", desc: "Partner program" },
    ],
  },
  {
    label: "Community",
    items: [
      { name: "Support", desc: "Help & troubleshooting" },
      { name: "Inspiration", desc: "Gallery & showcases" },
      { name: "Be a Creator", desc: "Join the creator program" },
    ],
  },
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
};

export function Navbar({ mode = "default" }: NavbarProps) {
  const isDashboardMode = mode === "dashboard";
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");

  return (
    <nav className="relative flex h-16 w-full items-center justify-between px-4">
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          aria-label="WaveSpeed home"
          className="inline-flex items-center transition-opacity duration-150 hover:opacity-70"
        >
          <Logo className="text-foreground h-6 w-auto" />
        </Link>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {["Explore", "Pricing", "Enterprise"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-foreground hover:text-foreground/50 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150"
          >
            {item}
          </a>
        ))}
        <div
          className="group relative"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <button className="text-foreground hover:text-foreground/50 flex cursor-pointer items-center gap-1 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150">
            Resources
            <ChevronDown
              className={`size-4 transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {resourcesOpen && (
            <div className="absolute top-full right-0 z-50 pt-4">
              <div className="border-foreground/5 bg-background grid w-[420px] grid-cols-2 gap-6 rounded-xs border p-5 pt-3 shadow-lg">
                {resourceGroups.map((group) => (
                  <div key={group.label} className="flex flex-col gap-1">
                    <p className="text-foreground/40 mb-1 font-mono text-[10px] tracking-[1.2px]">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <a
                        key={item.name}
                        href="#"
                        className="hover:bg-foreground/5 rounded-xs px-2 py-1.5 transition-colors duration-150"
                      >
                        <p className="text-foreground font-mono text-xs leading-4 tracking-[1.2px]">
                          {item.name}
                        </p>
                        <p className="text-foreground/40 font-mono text-[10px] leading-4">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <div
          className="relative hidden md:flex"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button
            aria-label="Language"
            className="bg-surface hover:bg-foreground/10 flex size-8 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150"
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
              <div className="border-foreground/5 bg-background flex w-[200px] flex-col rounded-xs border py-2 shadow-lg">
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
        <div className="bg-surface hover:bg-foreground/10 hidden items-center gap-2 rounded-xs px-2 py-1.5 transition-colors duration-150 md:flex">
          <SearchIcon className="opacity-40" />
          <input
            type="text"
            placeholder="Search model..."
            className="text-foreground placeholder:text-faint w-[140px] bg-transparent font-mono text-sm tracking-[1.2px] outline-none"
          />
        </div>
        {isDashboardMode ? (
          <>
            <Link
              href="/product/billing"
              aria-label="Billing"
              className="group hidden h-8 items-center gap-px md:inline-flex"
            >
              <span className="bg-surface group-hover:bg-foreground/10 text-foreground inline-flex h-8 items-center rounded-xs px-2 font-mono text-sm tracking-[0.6px] transition-colors duration-150">
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
          </>
        ) : (
          <a
            href="#"
            className="bg-foreground text-background hover:bg-foreground/80 flex items-center justify-center rounded-xs px-4 py-1.5 font-mono text-sm tracking-[1.2px] transition-colors duration-150"
          >
            Sign In
          </a>
        )}

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
        <div className="border-foreground/5 bg-background absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 border-t p-4 shadow-lg md:hidden">
          {!isDashboardMode &&
            ["Explore", "Pricing", "Enterprise"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-foreground hover:text-foreground/50 py-2 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="text-foreground hover:text-foreground/50 flex cursor-pointer items-center gap-1 py-2 font-mono text-sm leading-4 tracking-[1.2px] transition-colors duration-150"
          >
            Resources
            <ChevronDown
              className={`size-4 transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {resourcesOpen && (
            <div className="grid grid-cols-2 gap-4 pl-2">
              {resourceGroups.map((group) => (
                <div key={group.label} className="flex flex-col gap-1">
                  <p className="text-foreground/40 mb-1 font-mono text-[10px] tracking-[1.2px]">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="text-foreground hover:text-foreground/50 py-1 font-mono text-xs leading-4 tracking-[1.2px] transition-colors duration-150"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="bg-surface flex items-center gap-2 rounded-xs px-2 py-2">
            <SearchIcon className="opacity-40" />
            <input
              type="text"
              placeholder="Search model..."
              className="text-foreground placeholder:text-faint flex-1 bg-transparent font-mono text-sm tracking-[1.2px] outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

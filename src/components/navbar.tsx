"use client";

import { type FormEvent, useEffect, useState } from "react";
import Logo from "@/images/logo.svg";
import SearchIcon from "@/images/search-icon.svg";
import ChevronDown from "@/images/chevron-down.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearFakeSignedIn } from "@/lib/fake-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Coins,
  CreditCard,
  Globe,
  KeyRound,
  LogOut,
  type LucideIcon,
  Plus,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { TeamPickerRows } from "@/features/product/components/team-picker-rows";
import { useTeamOptional } from "@/features/product/team-context";

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

type MembershipTier = "Bronze" | "Silver" | "Gold" | "Ultra";

const userProfile = {
  name: "Youcai Zhang",
  email: "youcai@wavespeed.ai",
  credits: "-$0.08",
  tier: "Gold" as MembershipTier,
};

const membershipTierBadgeClass: Record<MembershipTier, string> = {
  Bronze: "bg-amber-100 text-amber-800",
  Silver: "bg-slate-200 text-slate-700",
  Gold: "bg-yellow-100 text-yellow-800",
  Ultra: "bg-violet-100 text-violet-800",
};

type NavIconProps = {
  icon: LucideIcon;
  className?: string;
};

function NavIcon({ icon: Icon, className = "size-4 shrink-0" }: NavIconProps) {
  return (
    <Icon
      className={className}
      strokeWidth={1.75}
      absoluteStrokeWidth
      aria-hidden="true"
    />
  );
}

type NavbarProps = {
  mode?: "default" | "dashboard";
  overlay?: boolean;
};

export function Navbar({ mode = "default", overlay }: NavbarProps) {
  const router = useRouter();
  const isDashboardMode = mode === "dashboard";
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");
  const team = useTeamOptional();
  const [userTeamSubmenuOpen, setUserTeamSubmenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const trimmedTeamName = newTeamName.trim();

  const closeUserMenu = () => {
    setUserOpen(false);
    setUserTeamSubmenuOpen(false);
  };

  const handleCreateTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedTeamName || !team) {
      return;
    }

    const existingTeam = team.teams.find(
      (t) => t.name.toLowerCase() === trimmedTeamName.toLowerCase(),
    );

    if (existingTeam) {
      team.setActiveTeam(existingTeam.name);
      setCreateTeamOpen(false);
      setNewTeamName("");
      closeUserMenu();
      return;
    }

    team.setTeams((prev) => [
      { name: trimmedTeamName, role: "Owner" },
      ...prev,
    ]);
    team.setActiveTeam(trimmedTeamName);
    setCreateTeamOpen(false);
    setNewTeamName("");
    closeUserMenu();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOverlay = overlay && !scrolled;

  return (
    <nav
      className={`z-50 flex h-16 w-full items-center justify-center px-6 transition-colors duration-150 md:px-12 lg:px-20 ${
        overlay ? "sticky top-0" : "relative"
      } ${isOverlay ? "text-white" : "bg-background"}`}
    >
      <div className="flex w-full max-w-7xl items-center justify-between gap-6">
        {/* Left: Logo + Nav links */}
        <div className="flex min-w-0 items-center gap-10">
          <Link
            href="/"
            aria-label="WaveSpeed home"
            className="inline-flex shrink-0 items-center transition-opacity duration-150 hover:opacity-70"
          >
            <Logo
              className={`h-6 w-auto ${isOverlay ? "text-white" : "text-foreground"}`}
            />
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {[
              { label: "Explore", href: "/models" },
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

        {/* Right: Search + Utility buttons */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            href="/models"
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
              <NavIcon icon={Globe} className="size-4" />
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
                  <NavIcon icon={Plus} className="size-4" />
                </span>
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setUserOpen(true)}
                onMouseLeave={closeUserMenu}
              >
                <button
                  aria-label="User profile"
                  className="bg-surface hover:bg-foreground/10 flex size-8 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150"
                >
                  <NavIcon icon={User} className="text-foreground size-4" />
                </button>
                {userOpen && (
                  <div className="absolute top-full right-0 z-50 pt-2">
                    <div className="border-foreground/5 bg-background flex w-72 flex-col rounded-xs border shadow-lg">
                      <div className="border-foreground/5 flex items-center gap-3 border-b px-4 py-4">
                        <div className="text-background flex size-11 shrink-0 items-center justify-center rounded-xs bg-blue-600 text-xl font-semibold">
                          Y
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="text-foreground truncate text-sm font-semibold">
                              {userProfile.name}
                            </p>
                            <span
                              className={`shrink-0 rounded-xs px-1.5 py-0.5 text-xs leading-none font-medium ${membershipTierBadgeClass[userProfile.tier]}`}
                            >
                              {userProfile.tier}
                            </span>
                          </div>
                          <p className="text-foreground/50 truncate text-xs">
                            {userProfile.email}
                          </p>
                        </div>
                      </div>

                      <div className="border-foreground/5 border-b py-1.5">
                        <Link
                          href="/settings"
                          onClick={closeUserMenu}
                          className="text-foreground/80 hover:bg-foreground/5 flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150"
                        >
                          <NavIcon icon={Settings} />
                          <span>Settings</span>
                        </Link>
                        <Link
                          href="/api-keys"
                          onClick={closeUserMenu}
                          className="text-foreground/80 hover:bg-foreground/5 flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150"
                        >
                          <NavIcon icon={KeyRound} />
                          <span>API Keys</span>
                        </Link>
                        <Link
                          href="/billing"
                          onClick={closeUserMenu}
                          className="text-foreground/80 hover:bg-foreground/5 flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150"
                        >
                          <NavIcon icon={CreditCard} />
                          <span>Billing</span>
                        </Link>
                        <Link
                          href="/billing"
                          onClick={closeUserMenu}
                          className="text-foreground/80 hover:bg-foreground/5 flex items-center justify-between gap-3 px-4 py-2 text-sm transition-colors duration-150"
                        >
                          <span className="flex items-center gap-3">
                            <NavIcon icon={Coins} />
                            <span>Credits</span>
                          </span>
                          <span className="text-foreground/60 bg-foreground/5 rounded-xs px-1.5 py-0.5 text-xs">
                            {userProfile.credits}
                          </span>
                        </Link>
                      </div>

                      <div className="border-foreground/5 border-b py-1.5">
                        <div
                          className="relative"
                          onMouseEnter={() => setUserTeamSubmenuOpen(true)}
                          onMouseLeave={() => setUserTeamSubmenuOpen(false)}
                        >
                          <div className="text-foreground/80 hover:bg-foreground/5 flex cursor-default items-center justify-between gap-3 px-4 py-2 text-sm">
                            <span className="flex items-center gap-3">
                              <NavIcon icon={Users} />
                              <span>Select team</span>
                            </span>
                            <ChevronRight
                              className="text-foreground/50 size-4 shrink-0"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </div>
                          {userTeamSubmenuOpen && team && (
                            <div className="absolute top-0 right-full z-60 pr-2">
                              <div className="border-foreground/5 bg-background flex w-56 flex-col rounded-xs border py-1 shadow-lg">
                                <TeamPickerRows
                                  activeTeam={team.activeTeam}
                                  teams={team.teams}
                                  userName={team.userName}
                                  onSelectTeam={(name) => {
                                    team.setActiveTeam(name);
                                    closeUserMenu();
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setCreateTeamOpen(true)}
                          className="text-foreground/80 hover:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm transition-colors duration-150"
                        >
                          <NavIcon icon={Plus} />
                          <span>Create Team</span>
                        </button>
                      </div>

                      <div className="py-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            clearFakeSignedIn();
                            router.push("/sign-in");
                          }}
                          className="text-foreground/80 hover:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm transition-colors duration-150"
                        >
                          <NavIcon icon={LogOut} />
                          <span>Sign Out</span>
                        </button>
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
          {isDashboardMode && team && (
            <div className="flex flex-col gap-1">
              {team.teams.map((t) => (
                <button
                  key={t.name}
                  onClick={() => team.setActiveTeam(t.name)}
                  className={`flex cursor-pointer items-center justify-between rounded-xs px-2 py-2 text-left transition-colors duration-150 ${
                    team.activeTeam === t.name
                      ? "bg-foreground/5"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-foreground/10 inline-block size-5 rounded-full" />
                    <span>
                      <span className="text-foreground block text-sm font-medium">
                        {t.name}
                      </span>
                      <span className="text-foreground/50 block text-xs">
                        {t.role}
                      </span>
                    </span>
                  </span>
                  {team.activeTeam === t.name && (
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
            { label: "Explore", href: "/models" },
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
            <>
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground flex items-center gap-3 py-2 text-sm transition-colors duration-150"
              >
                <NavIcon icon={Settings} />
                <span>Settings</span>
              </Link>
              <Link
                href="/api-keys"
                onClick={() => setMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground flex items-center gap-3 py-2 text-sm transition-colors duration-150"
              >
                <NavIcon icon={KeyRound} />
                <span>API Keys</span>
              </Link>
              <Link
                href="/billing"
                onClick={() => setMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground flex items-center gap-3 py-2 text-sm transition-colors duration-150"
              >
                <NavIcon icon={CreditCard} />
                <span>Billing</span>
              </Link>
              <Link
                href="/billing"
                onClick={() => setMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground flex items-center justify-between gap-3 py-2 text-sm transition-colors duration-150"
              >
                <span className="flex items-center gap-3">
                  <NavIcon icon={Coins} />
                  <span>Credits</span>
                </span>
                <span className="text-foreground/60 bg-foreground/5 rounded-xs px-1.5 py-0.5 text-xs">
                  {userProfile.credits}
                </span>
              </Link>
              <Link
                href="/billing"
                onClick={() => setMenuOpen(false)}
                className="text-foreground hover:text-foreground/50 tracking-xl flex items-center gap-2 py-2 font-mono text-sm leading-4 transition-colors duration-150"
              >
                <span>Balance</span>
                <span className="text-foreground/60 font-sans text-sm font-medium">
                  $6.186
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setCreateTeamOpen(true);
                }}
                className="text-foreground/80 hover:text-foreground flex w-full cursor-pointer items-center gap-3 py-2 text-left text-sm transition-colors duration-150"
              >
                <NavIcon icon={Plus} />
                <span>Create Team</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  clearFakeSignedIn();
                  router.push("/sign-in");
                }}
                className="text-foreground/80 hover:text-foreground flex w-full cursor-pointer items-center gap-3 py-2 text-left text-sm transition-colors duration-150"
              >
                <NavIcon icon={LogOut} />
                <span>Sign Out</span>
              </button>
            </>
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

      <Dialog
        open={createTeamOpen}
        onOpenChange={(open) => {
          setCreateTeamOpen(open);
          if (!open) {
            setNewTeamName("");
          }
        }}
      >
        <DialogContent className="border-foreground/5 bg-background w-[min(92vw,28rem)] rounded-xs border p-0 shadow-lg">
          <form onSubmit={handleCreateTeam}>
            <DialogHeader className="px-4 pt-3">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-sm font-semibold">
                  Create Team
                </DialogTitle>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Close"
                    className="text-foreground/70 hover:bg-foreground/5 h-8 w-8 rounded-xs"
                  >
                    <X className="size-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="px-4 py-4">
              <label
                htmlFor="team-name"
                className="text-foreground/70 mb-2 block text-xs font-medium"
              >
                Team name
              </label>
              <Input
                id="team-name"
                value={newTeamName}
                onChange={(event) => setNewTeamName(event.target.value)}
                placeholder="Enter team name"
                className="h-8 rounded-xs text-xs"
                autoFocus
              />
            </div>
            <DialogFooter className="px-4 pb-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-foreground/10 h-8 rounded-xs px-3 text-xs font-bold"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!trimmedTeamName}
                className="bg-foreground text-background hover:bg-foreground/80 h-8 rounded-xs px-3 text-xs font-bold"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo from "@/images/logo.svg";
import { useMounted } from "@/hooks/use-mounted";
import { ChevronRight, ExternalLink, Menu, X, AlignLeft } from "lucide-react";

type NavItem = {
  title: string;
  href?: string;
  external?: boolean;
  children?: NavItem[];
};

const BASE = "#";

const tocItems = [
  { id: "why-wavespeedai", label: "Why WaveSpeed" },
  { id: "account-levels", label: "Account Levels" },
  { id: "support", label: "Support" },
];

const sidebarNav: { section?: string; items: NavItem[] }[] = [
  {
    items: [
      { title: "Overview", href: "#" },
      { title: "Why WaveSpeed?", href: "#why-wavespeedai" },
      { title: "Quick Start", href: "#account-levels" },
    ],
  },
  {
    section: "Getting Started",
    items: [
      { title: "Get Started with Web", href: `${BASE}/get-started-with-web` },
      { title: "Get Started with API", href: `${BASE}/get-started-with-api` },
      { title: "API Authentication", href: `${BASE}/api-authentication` },
    ],
  },
  {
    section: "Ways to Use",
    items: [
      { title: "Web Interface", href: `${BASE}/web-interface` },
      { title: "Desktop App", href: `${BASE}/desktop-app` },
      { title: "Python SDK", href: `${BASE}/python-sdk` },
      { title: "JavaScript SDK", href: `${BASE}/javascript-sdk` },
      { title: "ComfyUI Integration", href: `${BASE}/comfyui-integration` },
      { title: "N8N Integration", href: `${BASE}/n8n-integration` },
      { title: "REST API", href: `${BASE}/rest-api` },
    ],
  },
  {
    section: "Core Concepts",
    items: [
      { title: "How WaveSpeed Works", href: `${BASE}/how-wavespeedai-works` },
      { title: "What are Models", href: `${BASE}/what-are-models` },
      { title: "What are Predictions", href: `${BASE}/what-are-predictions` },
      { title: "How to Use Webhooks", href: `${BASE}/how-to-use-webhooks` },
      { title: "How to Use Streaming", href: `${BASE}/how-to-use-streaming` },
    ],
  },
  {
    section: "Advanced Features",
    items: [
      {
        title: "LoRA Training & Usage",
        href: `${BASE}/lora-training-and-usage`,
      },
      { title: "How to Upload Files", href: `${BASE}/how-to-upload-files` },
    ],
  },
  {
    section: "Examples",
    items: [
      {
        title: "How to Generate an Image",
        href: `${BASE}/how-to-generate-an-image`,
      },
      {
        title: "How to Create Video from Image",
        href: `${BASE}/how-to-create-video-from-image`,
      },
      {
        title: "How to Generate Speech",
        href: `${BASE}/how-to-generate-speech`,
      },
      {
        title: "How to Create a Digital Human",
        href: `${BASE}/how-to-create-a-digital-human`,
      },
      {
        title: "Complete Workflow Tutorial",
        href: `${BASE}/complete-workflow-tutorial`,
      },
    ],
  },
  {
    section: "LLM Service",
    items: [
      { title: "LLM Service Overview", href: `${BASE}/llm-service-overview` },
      { title: "LLM Quick Start", href: `${BASE}/llm-quick-start` },
      { title: "Supported LLM Models", href: `${BASE}/supported-llm-models` },
    ],
  },
  {
    section: "Serverless",
    items: [
      { title: "Serverless Overview", href: `${BASE}/serverless-overview` },
      { title: "GPU Pricing", href: `${BASE}/gpu-pricing` },
      { title: "Quick Start", href: `${BASE}/serverless-quick-start` },
      { title: "Create Endpoint", href: `${BASE}/create-endpoint` },
      { title: "Build Worker", href: `${BASE}/build-worker` },
    ],
  },
  {
    section: "API Reference",
    items: [
      { title: "API Reference", href: `${BASE}/api-reference` },
      { title: "How to Submit Task", href: `${BASE}/how-to-submit-task` },
      { title: "How to Get Result", href: `${BASE}/how-to-get-result` },
      { title: "How to Delete Task", href: `${BASE}/how-to-delete-task` },
      { title: "How to Upload Files", href: `${BASE}/api-how-to-upload-files` },
      { title: "How to List Models", href: `${BASE}/how-to-list-models` },
      { title: "How to Check Balance", href: `${BASE}/how-to-check-balance` },
      { title: "How to Check Usage", href: `${BASE}/how-to-check-usage` },
      { title: "How to Check Billings", href: `${BASE}/how-to-check-billings` },
      { title: "Verifying Webhooks", href: `${BASE}/verifying-webhooks` },
      { title: "Error Codes", href: `${BASE}/error-codes` },
    ],
  },
  {
    section: "Model Library",
    items: [
      {
        title: "Browse Models",
        href: `${BASE}/browse-models`,
        children: [
          { title: "OpenAI", href: `${BASE}/models/openai` },
          { title: "Google", href: `${BASE}/models/google` },
          { title: "ByteDance", href: `${BASE}/models/bytedance` },
          { title: "WaveSpeed AI", href: `${BASE}/models/wavespeed-ai` },
          { title: "Kwaivgi", href: `${BASE}/models/kwaivgi` },
          { title: "Alibaba", href: `${BASE}/models/alibaba` },
          { title: "Vidu", href: `${BASE}/models/vidu` },
          { title: "Minimax", href: `${BASE}/models/minimax` },
          { title: "Midjourney", href: `${BASE}/models/midjourney` },
          { title: "ElevenLabs", href: `${BASE}/models/elevenlabs` },
          { title: "Luma", href: `${BASE}/models/luma` },
          { title: "Stability AI", href: `${BASE}/models/stability-ai` },
          { title: "Runway", href: `${BASE}/models/runwayml` },
          { title: "Pika", href: `${BASE}/models/pika` },
          { title: "Pixverse", href: `${BASE}/models/pixverse` },
        ],
      },
    ],
  },
  {
    section: "Best Practices",
    items: [
      {
        title: "How to Choose the Right Model",
        href: `${BASE}/how-to-choose-the-right-model`,
      },
      {
        title: "How to Write Better Prompts",
        href: `${BASE}/how-to-write-better-prompts`,
      },
      { title: "How to Reduce Costs", href: `${BASE}/how-to-reduce-costs` },
    ],
  },
  {
    section: "Pricing & Billing",
    items: [
      { title: "How Pricing Works", href: `${BASE}/how-pricing-works` },
      { title: "Payment Methods", href: `${BASE}/payment-methods` },
      {
        title: "Account Levels & Rate Limits",
        href: `${BASE}/account-levels-and-rate-limits`,
      },
      {
        title: "How to Export Billings",
        href: `${BASE}/how-to-export-billings`,
      },
      { title: "Refund Policy", href: `${BASE}/refund-policy` },
    ],
  },
  {
    section: "Policies",
    items: [
      { title: "Content Policy", href: `${BASE}/content-policy` },
      { title: "Data Retention Policy", href: `${BASE}/data-retention-policy` },
      { title: "Commercial Use Policy", href: `${BASE}/commercial-use-policy` },
      { title: "Privacy Policy", href: `${BASE}/privacy-policy` },
    ],
  },
  {
    section: "Help",
    items: [
      { title: "FAQ", href: `${BASE}/faq` },
      { title: "Troubleshooting Guide", href: `${BASE}/troubleshooting-guide` },
      { title: "Contact Support", href: `${BASE}/contact-support` },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={`flex items-center gap-1.5 border-l py-1.5 pl-4 text-sm transition-colors ${
          active
            ? "border-foreground text-foreground font-medium"
            : "border-foreground/8 text-foreground/60 hover:border-foreground/20 hover:text-foreground"
        }`}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
            className="text-foreground/40 hover:text-foreground/70 mr-0.5 -ml-0.5 flex size-4 shrink-0 cursor-pointer items-center justify-center"
          >
            <ChevronRight
              className={`size-3 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
              strokeWidth={2.5}
            />
          </button>
        )}
        {item.title}
        {item.external && <ExternalLink className="size-3 opacity-40" />}
      </a>
      {hasChildren && open && (
        <div className="ml-4 flex flex-col">
          {item.children!.map((child) => (
            <SidebarLink key={child.title} item={child} active={false} />
          ))}
        </div>
      )}
    </>
  );
}

function SidebarNavigation() {
  return (
    <nav className="flex flex-col gap-5">
      {sidebarNav.map((group, gi) => (
        <div key={gi}>
          {group.section && (
            <p className="text-foreground mb-1 text-xs font-semibold">
              {group.section}
            </p>
          )}
          <div className="flex flex-col">
            {group.items.map((item) => (
              <SidebarLink
                key={item.title}
                item={item}
                active={gi === 0 && item.title === "Overview"}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function ThemePillToggle({
  theme,
  onToggle,
}: {
  theme: string | undefined;
  onToggle: (mode: "light" | "dark") => void;
}) {
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <div className="bg-foreground/5 flex items-center rounded-full p-px">
      <button
        onClick={() => onToggle("light")}
        className={`flex size-5.5 cursor-pointer items-center justify-center rounded-full transition-all ${
          isLight
            ? "bg-background shadow-sm"
            : "text-foreground/30 hover:text-foreground/50"
        }`}
        aria-label="Light mode"
      >
        <svg
          className="size-3"
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
      </button>
      <button
        onClick={() => onToggle("dark")}
        className={`flex size-5.5 cursor-pointer items-center justify-center rounded-full transition-all ${
          isDark
            ? "bg-background shadow-sm"
            : "text-foreground/30 hover:text-foreground/50"
        }`}
        aria-label="Dark mode"
      >
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.046.046 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.01-.05.051.051 0 00-.018-.011 8.875 8.875 0 01-1.248-.595.05.05 0 01-.005-.084c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007c.08.066.164.132.248.195a.05.05 0 01-.004.084c-.399.232-.813.43-1.249.596a.05.05 0 00-.028.06c.24.469.514.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019zM5.347 10.2c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z" />
    </svg>
  );
}

function SidebarContent({
  theme,
  onSetTheme,
}: {
  theme: string | undefined;
  onSetTheme: (mode: "light" | "dark") => void;
}) {
  return (
    <div className="flex flex-col px-5 py-5">
      {/* Logo + theme toggle */}
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-75"
        >
          <Logo className="text-foreground h-5 w-auto" />
        </Link>
        <ThemePillToggle theme={theme} onToggle={onSetTheme} />
      </div>

      {/* Search */}
      <div className="bg-surface mb-3 flex items-center gap-2 rounded-xs px-3 py-2">
        <svg
          className="text-foreground/30 size-4 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-foreground/30 text-sm">Search...</span>
        <kbd className="text-foreground/20 border-foreground/10 ml-auto rounded-sm border px-1.5 py-0.5 font-mono text-xs tracking-widest">
          ⌘K
        </kbd>
      </div>

      {/* Discord */}
      <a
        href="https://discord.gg/yH8a3J4Vcd"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/50 hover:text-foreground mb-5 flex items-center gap-2.5 py-1 text-sm transition-colors"
      >
        <DiscordIcon className="size-4 shrink-0" />
        Discord
      </a>

      {/* Navigation */}
      <SidebarNavigation />

      {/* Footer */}
      <div className="border-foreground/8 mt-8 border-t pt-4">
        <p className="text-foreground/30 text-xs">
          &copy; {new Date().getFullYear()} WaveSpeed
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector("[data-promo-bar]") as HTMLElement | null;
    if (el) el.style.display = "none";
    return () => {
      if (el) el.style.display = "";
    };
  }, []);

  const resolvedTheme = mounted ? theme : undefined;
  const handleSetTheme = (mode: "light" | "dark") => setTheme(mode);

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* ── Sidebar — desktop ─────────────────────────────── */}
      <aside className="scrollbar-none border-foreground/8 fixed top-0 left-0 z-30 hidden h-screen w-84 shrink-0 overflow-y-auto border-r lg:block">
        <SidebarContent theme={resolvedTheme} onSetTheme={handleSetTheme} />
      </aside>

      {/* ── Mobile top bar ─────────────────────────────────── */}
      <div className="bg-background/80 border-foreground/8 fixed top-0 right-0 left-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-75"
        >
          <Logo className="text-foreground h-5 w-auto" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-foreground/60 hover:text-foreground flex size-8 cursor-pointer items-center justify-center"
          aria-label="Toggle sidebar"
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* ── Mobile sidebar overlay ─────────────────────────── */}
      {mobileMenuOpen && (
        <div className="bg-background fixed inset-0 top-14 z-30 overflow-y-auto lg:hidden">
          <SidebarContent theme={resolvedTheme} onSetTheme={handleSetTheme} />
        </div>
      )}

      {/* ── Main area ─────────────────────────────────────── */}
      <div className="min-w-0 flex-1 pt-14 lg:ml-84 lg:pt-0">
        <div className="mx-auto flex max-w-6xl">
          <main className="min-w-0 flex-1 px-6 pt-10 pb-16 md:px-12 lg:px-16">
            <article className="max-w-3xl">
              <p className="text-foreground/40 mb-4 text-xs">Introduction</p>

              <h1 className="text-heading text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                WaveSpeed Documentation
              </h1>

              <p className="text-foreground/70 mt-5 leading-7">
                WaveSpeed provides unified API access to 700+ AI models for
                text-to-image, image-to-video, text-to-video, and audio
                generation. Supported models include FLUX, Kling, Veo, Luma,
                Stable Diffusion, Seedance, Minimax, and more.
              </p>

              <p className="text-foreground mt-6 font-medium">
                Get started with WaveSpeed:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {[
                  {
                    label: "API Integration",
                    desc: "RESTful APIs for developers",
                    href: `${BASE}/rest-api`,
                  },
                  {
                    label: "Desktop App",
                    desc: "Native apps for Windows, macOS, and Linux",
                    href: `${BASE}/desktop-app`,
                  },
                  {
                    label: "Python SDK",
                    desc: "Simple Python library",
                    href: `${BASE}/python-sdk`,
                  },
                  {
                    label: "JavaScript SDK",
                    desc: "Node.js and browser library",
                    href: `${BASE}/javascript-sdk`,
                  },
                  {
                    label: "ComfyUI",
                    desc: "Node-based workflow integration",
                    href: `${BASE}/comfyui-integration`,
                  },
                  {
                    label: "N8N",
                    desc: "No-code automation workflows",
                    href: `${BASE}/n8n-integration`,
                  },
                  {
                    label: "Web Interface",
                    desc: "Browser-based, no coding required",
                    href: "/",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-baseline gap-1.5">
                    <span className="text-foreground/30 select-none">•</span>
                    <span>
                      <a
                        href={item.href}
                        className="text-foreground font-medium hover:underline"
                      >
                        {item.label}
                      </a>
                      <span className="text-foreground/60"> — {item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <h2
                id="why-wavespeedai"
                className="text-heading border-foreground/8 mt-12 border-t pt-8 text-2xl font-semibold tracking-tight"
              >
                Why WaveSpeed
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  {
                    b: "Latest AI Models",
                    t: "Seedream 4.5, Nano Banana Pro, WAN 2.6 (Official First Launch), Veo 3.1, Sora 2, FLUX 2, and more",
                  },
                  {
                    b: "700+ Models, One API",
                    t: "Access models from Google, ByteDance, OpenAI, Stability AI, Luma, Runway through a single unified API",
                  },
                  {
                    b: "Ultra-Fast Generation",
                    t: "Images in under 2 seconds, videos in under 2 minutes",
                  },
                  {
                    b: "Multiple Integration Options",
                    t: "REST API, Python SDK, JavaScript SDK, Desktop App, ComfyUI, N8N",
                  },
                  {
                    b: "Enterprise Ready",
                    t: "High concurrency, dedicated support, and custom deployment options",
                  },
                ].map((item) => (
                  <li key={item.b} className="flex items-baseline gap-1.5">
                    <span className="text-foreground/30 select-none">•</span>
                    <span className="text-foreground/70 leading-relaxed">
                      <strong className="text-foreground font-medium">
                        {item.b}
                      </strong>
                      {" — "}
                      {item.t}
                    </span>
                  </li>
                ))}
              </ul>

              <h2
                id="account-levels"
                className="text-heading border-foreground/8 mt-12 border-t pt-8 text-2xl font-semibold tracking-tight"
              >
                Account Levels
              </h2>
              <p className="text-foreground/70 mt-3 leading-7">
                WaveSpeed offers four account levels to suit different usage
                requirements:
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-foreground/10 border-b">
                      <th className="text-foreground py-3 pr-4 text-left text-sm font-semibold">
                        Level
                      </th>
                      <th className="text-foreground py-3 pr-4 text-left text-sm font-semibold">
                        Images/min
                      </th>
                      <th className="text-foreground py-3 pr-4 text-left text-sm font-semibold">
                        Videos/min
                      </th>
                      <th className="text-foreground py-3 pr-4 text-left text-sm font-semibold">
                        Max Concurrent Tasks
                      </th>
                      <th className="text-foreground py-3 text-left text-sm font-semibold">
                        Activation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/70">
                    {[
                      {
                        level: "Bronze",
                        img: "10",
                        vid: "5",
                        conc: "3",
                        act: "Default for new users",
                      },
                      {
                        level: "Silver",
                        img: "500",
                        vid: "60",
                        conc: "100",
                        act: "One-time top-up of $100",
                      },
                      {
                        level: "Gold",
                        img: "3,000",
                        vid: "600",
                        conc: "2,000",
                        act: "One-time top-up of $1,000",
                      },
                      {
                        level: "Ultra",
                        img: "5,000",
                        vid: "5,000",
                        conc: "5,000",
                        act: "One-time top-up of $10,000",
                      },
                    ].map((row) => (
                      <tr
                        key={row.level}
                        className="border-foreground/6 border-b"
                      >
                        <td className="py-3 pr-4 font-medium">{row.level}</td>
                        <td className="py-3 pr-4">{row.img}</td>
                        <td className="py-3 pr-4">{row.vid}</td>
                        <td className="py-3 pr-4">{row.conc}</td>
                        <td className="py-3">{row.act}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-foreground/70 mt-6 flex flex-col gap-2 text-sm leading-relaxed">
                <p>
                  <strong className="text-foreground font-medium">
                    Bronze:
                  </strong>{" "}
                  Default level for new users. New accounts receive $1 trial
                  credit — please note that some models are not available with
                  trial credit.
                </p>
                <p>
                  <strong className="text-foreground font-medium">
                    Silver:
                  </strong>{" "}
                  One-time top-up of $100 upgrades your account to Silver.
                </p>
                <p>
                  <strong className="text-foreground font-medium">Gold:</strong>{" "}
                  One-time top-up of $1,000 upgrades your account to Gold.
                </p>
                <p>
                  <strong className="text-foreground font-medium">
                    Ultra:
                  </strong>{" "}
                  One-time top-up of $10,000 upgrades your account to Ultra.
                </p>
              </div>

              <h2
                id="support"
                className="text-heading border-foreground/8 mt-12 border-t pt-8 text-2xl font-semibold tracking-tight"
              >
                Support
              </h2>
              <p className="text-foreground/70 mt-3 leading-7">
                Need help? Reach out through:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li className="flex items-baseline gap-1.5">
                  <span className="text-foreground/30 select-none">•</span>
                  <span className="text-foreground/70">
                    Email:{" "}
                    <a
                      href="mailto:support@wavespeed.ai"
                      className="text-foreground font-medium hover:underline"
                    >
                      support@wavespeed.ai
                    </a>
                  </span>
                </li>
                <li className="flex items-baseline gap-1.5">
                  <span className="text-foreground/30 select-none">•</span>
                  <span className="text-foreground/70">
                    Discord:{" "}
                    <a
                      href="https://discord.gg/yH8a3J4Vcd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium hover:underline"
                    >
                      Join our community
                    </a>
                  </span>
                </li>
              </ul>

              <div className="border-foreground/8 mt-16 flex justify-end border-t pt-6">
                <a
                  href={`${BASE}/overview`}
                  className="text-foreground hover:text-foreground/70 group flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  Overview
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          </main>

          {/* ── Right TOC ───────────────────────────────────── */}
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 pt-10 pr-8 xl:block">
            <div className="scrollbar-none h-full overflow-y-auto pb-10">
              <p className="text-foreground/50 mb-3 flex items-center gap-2.5 text-sm font-medium">
                <AlignLeft className="size-4 shrink-0" strokeWidth={2} />
                On this page
              </p>
              <nav className="flex flex-col">
                {tocItems.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`border-l py-1.5 pl-6 text-sm leading-relaxed transition-colors ${
                      i === 0
                        ? "border-foreground text-foreground font-medium"
                        : "border-foreground/10 text-foreground/50 hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

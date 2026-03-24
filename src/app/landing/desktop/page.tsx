"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import ArrowRight from "@/images/arrow-right.svg";
import desktopImg from "@/images/desktop.webp";

/* ================================================================== */
/*  Platform download links                                            */
/* ================================================================== */

const downloads = [
  {
    platform: "Windows",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
    href: "https://github.com/WaveSpeedAI/wavespeed-desktop/releases/latest/download/WaveSpeed-Desktop-win-x64.exe",
  },
  {
    platform: "Mac (Intel)",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    href: "https://github.com/WaveSpeedAI/wavespeed-desktop/releases/latest/download/WaveSpeed-Desktop-mac-x64.dmg",
  },
  {
    platform: "Mac (Apple silicon)",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    href: "https://github.com/WaveSpeedAI/wavespeed-desktop/releases/latest/download/WaveSpeed-Desktop-mac-arm64.dmg",
  },
  {
    platform: "Linux",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.345 1.884 1.345.358 0 .705-.134 1.034-.328.6-.36.993-.933 1.198-1.607.085-.135.157-.272.213-.415.33-.004.663-.062 1.015-.19.265-.12.495-.26.686-.429.19-.168.34-.354.454-.55.114-.198.19-.407.228-.627.04-.22.045-.449.015-.689a4.38 4.38 0 00-.091-.415 4.8 4.8 0 00-.39-.95c.14-.086.27-.18.39-.282.25-.21.46-.47.6-.79.138-.32.2-.69.18-1.14-.02-.6-.18-1.33-.52-2.27-.09-.25-.2-.51-.33-.79-.13-.28-.27-.57-.42-.87-.32-.6-.67-1.23-1.01-1.86a52 52 0 00-1.03-1.77c-.34-.55-.66-1.07-.94-1.56-.28-.49-.52-.96-.71-1.41-.19-.44-.33-.87-.43-1.28a5.8 5.8 0 01-.13-1.12c0-1.37-.19-2.44-.57-3.29a4.3 4.3 0 00-1.57-1.88A4.1 4.1 0 0012.504 0z" />
      </svg>
    ),
    href: "https://github.com/WaveSpeedAI/wavespeed-desktop/releases/latest/download/WaveSpeed-Desktop-linux-x86_64.AppImage",
  },
  {
    platform: "Android",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 15.341a1 1 0 01-.999-1c0-.551.448-1 .999-1 .553 0 1 .449 1 1s-.448 1-1 1m-11.046 0a1 1 0 01-1-1c0-.551.448-1 1-1 .551 0 .999.449.999 1s-.448 1-.999 1m11.405-6.02l1.997-3.46a.416.416 0 00-.152-.567.416.416 0 00-.568.152L17.12 8.95c-1.547-.706-3.281-1.1-5.12-1.1s-3.574.394-5.12 1.1L4.84 5.447a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.46C2.688 11.186.343 14.645 0 18.761h24c-.344-4.116-2.688-7.575-6.118-9.44" />
      </svg>
    ),
    href: "https://github.com/WaveSpeedAI/wavespeed-desktop/releases/latest/download/WaveSpeed-Mobile.apk",
  },
];

/* ================================================================== */
/*  Desktop-ready models marquee                                       */
/* ================================================================== */

const desktopModels = [
  { name: "Nano Banana", provider: "Google" },
  { name: "SeeDream V4", provider: "ByteDance" },
  { name: "Sora 2 I2V Pro", provider: "OpenAI" },
  { name: "Wan 2.5 Fast", provider: "Alibaba" },
  { name: "Kling V2.5 Turbo", provider: "KwaiVGI" },
  { name: "Image Upscaler", provider: "WaveSpeed" },
  { name: "Video Upscaler Pro", provider: "WaveSpeed" },
  { name: "InfiniteTalk", provider: "WaveSpeed" },
  { name: "InfiniteTalk V2V", provider: "WaveSpeed" },
];

/* ================================================================== */
/*  Free tools                                                         */
/* ================================================================== */

const freeTools = [
  {
    name: "Video Enhancer",
    description:
      "Upscale videos locally with native GPU acceleration. No upload needed, process directly on your desktop.",
    media: {
      type: "video" as const,
      src: "https://d1q70pf5vjeyhc.wavespeed.ai/media/videos/1765291084523726080_mrowusqo.mp4",
    },
  },
  {
    name: "Image Enhancer",
    description:
      "Enhance image resolution offline with full privacy. All processing happens on your machine.",
    media: {
      type: "image" as const,
      src: "https://wavespeed.ai/landing/images/homePage/hdUpscale.png",
    },
  },
  {
    name: "Background Remover",
    description:
      "Remove backgrounds instantly without internet. Perfect for batch processing large folders.",
    media: {
      type: "image" as const,
      src: "https://wavespeed.ai/landing/images/homePage/backgroundRemover.png",
    },
  },
  {
    name: "Image Eraser",
    description:
      "Erase unwanted objects with one click. Works offline, saves directly to your local drive.",
    media: {
      type: "image" as const,
      src: "https://wavespeed.ai/landing/images/homePage/ImageEraser.png",
    },
  },
];

/* ================================================================== */
/*  Feature sections                                                   */
/* ================================================================== */

const features = [
  {
    title: "Your files stay on your computer",
    description:
      "All generated images are saved directly to your local drive. No cloud dependency \u2014 your work is always accessible, even offline.",
    visual: "local-files",
    bullets: [
      "Local-first storage \u2014 Files saved instantly to your drive",
      "Work offline \u2014 No internet required after download",
      "Smart organization \u2014 Find files by keyword, date, or project",
      "Easy backup \u2014 Export or sync to any cloud service you choose",
    ],
  },
  {
    title: "Save workflows as reusable templates",
    description:
      "Create once, reuse forever. Save your best generation settings as local templates and apply them to new projects with one click.",
    visual: "templates",
    bullets: [
      "One-click templates \u2014 Save prompts, settings, and presets locally",
      "Batch apply \u2014 Use templates across multiple files instantly",
      "Shareable presets \u2014 Export and share with your team",
      "Organized library \u2014 Group templates by brand or project",
    ],
  },
];

/* ================================================================== */
/*  Stats                                                              */
/* ================================================================== */

const stats = [
  { value: "1M+", label: "Desktop installs" },
  { value: "50M+", label: "On-device generations" },
  { value: "4.9/5", label: "Privacy-first rating" },
  { value: "2s", label: "Median local render time" },
];

/* ================================================================== */
/*  Testimonials                                                       */
/* ================================================================== */

const testimonials = [
  {
    quote:
      "WaveSpeed Desktop keeps everything local \u2014 no upload lag, no data risk. Our editors finish twice as many shots per day.",
    name: "Sarah Chen",
    title: "Lead Content Editor",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Batch background removal runs offline on my laptop. Perfect for travel shoots with spotty internet.",
    name: "Michael Rodriguez",
    title: "Commercial Photographer",
    avatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop",
  },
  {
    quote:
      "We standardized templates across the team. New hires get productive on day one \u2014 no cloud permissions needed.",
    name: "Jessica Kim",
    title: "Creative Ops Manager",
    avatar:
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=200&auto=format&fit=crop",
  },
];

/* ================================================================== */
/*  Local files mock UI                                                */
/* ================================================================== */

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-full bg-black/[0.06] dark:bg-white/10 ${className ?? ""}`}
    />
  );
}

function FileRow({ done }: { done?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-white/5 dark:shadow-none">
      {done && (
        <svg
          className="size-5 shrink-0 text-emerald-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="10" r="10" />
          <path
            d="M6 10.5l2.5 2.5 5.5-5.5"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="flex flex-1 flex-col gap-1.5">
        <SkeletonBar className="h-2.5 w-3/4" />
        <SkeletonBar className="h-2 w-1/2" />
      </div>
    </div>
  );
}

function LocalFilesVisual() {
  return (
    <div className="bg-surface flex aspect-4/3 items-center justify-center rounded-xs p-6 md:p-10">
      <div className="relative w-full max-w-sm">
        {/* Background file rows */}
        <div className="flex flex-col gap-4">
          <FileRow done />
          <FileRow />
          <FileRow done />
        </div>

        {/* Toast notification overlay */}
        <div className="absolute top-1/2 left-1/2 z-10 w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:w-[120%] dark:bg-zinc-100 dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 size-5 shrink-0 text-emerald-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <circle cx="10" cy="10" r="10" />
              <path
                d="M6 10.5l2.5 2.5 5.5-5.5"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900">
                Generation is completed (1/3)
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                The generated image has been stored in your computer.
              </p>
            </div>
            <button className="shrink-0 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white">
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Templates mock UI                                                  */
/* ================================================================== */

function TemplatesVisual() {
  return (
    <div className="bg-surface flex aspect-4/3 items-center justify-center rounded-xs p-6 md:p-10">
      <div className="relative w-full max-w-xs">
        {/* Template card */}
        <div className="rounded-xl bg-white/90 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:bg-white/5 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
          {/* Image placeholder with icon */}
          <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
            <svg
              className="size-12 text-black/[0.12] dark:text-white/[0.15]"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="32" height="32" rx="6" />
              <circle cx="20" cy="20" r="4" />
              <path d="M8 32l8-8 6 6 6-8 12 10" />
            </svg>
          </div>
          {/* Skeleton text lines */}
          <div className="flex flex-col gap-2">
            <SkeletonBar className="h-2.5 w-full" />
            <SkeletonBar className="h-2.5 w-5/6" />
            <SkeletonBar className="h-2.5 w-full" />
          </div>
          {/* Action bar */}
          <div className="mt-4 flex items-center justify-end">
            <div className="h-7 w-20 rounded-md bg-black/[0.04] dark:bg-white/[0.06]" />
          </div>
        </div>

        {/* Toast */}
        <div className="absolute -top-3 -right-3 z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:bg-zinc-100 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <svg
            className="size-5 shrink-0 text-emerald-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="10" r="10" />
            <path
              d="M6 10.5l2.5 2.5 5.5-5.5"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap text-zinc-900">
            Template has been saved.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Free tools accordion                                               */
/* ================================================================== */

function FreeToolsAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      {/* Text + accordion */}
      <div className="flex flex-col gap-4 lg:flex-1">
        <h3 className="text-heading font-display text-xl leading-none font-bold tracking-tight md:text-3xl">
          Free AI tools built into your desktop
        </h3>
        <p className="text-foreground/60 text-base text-pretty">
          No subscriptions, no uploads. These essential tools run locally on
          your machine &mdash; completely free forever.
        </p>
        <div className="border-foreground/10 mt-2 border-t">
          {freeTools.map((tool, i) => {
            const isOpen = active === i;
            return (
              <div key={tool.name} className="border-foreground/10 border-b">
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
                >
                  <span
                    className={`font-display text-base font-medium transition-colors ${isOpen ? "text-heading" : "text-foreground/40"}`}
                  >
                    {tool.name}
                  </span>
                  <svg
                    className={`text-foreground/40 size-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <line x1="10" y1="4" x2="10" y2="16" />
                    <line x1="4" y1="10" x2="16" y2="10" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media */}
      <div className="relative aspect-4/3 overflow-hidden rounded-xs lg:flex-1">
        {freeTools[active ?? 0].media.type === "video" ? (
          <video
            key={active}
            src={freeTools[active ?? 0].media.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full scale-[1.01] object-cover"
          />
        ) : (
          <Image
            key={active}
            src={freeTools[active ?? 0].media.src}
            alt={freeTools[active ?? 0].name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function DesktopLanding() {
  return (
    <main>
      <Navbar overlay />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-dark relative -mt-16 overflow-hidden pt-16">
        <div className="px-6 pt-8 pb-0 md:px-12 md:pt-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/60">
                Local AI studio for creators and developers
              </span>
              <h1 className="font-display mb-5 text-4xl leading-none font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                WaveSpeed Desktop
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-normal text-pretty text-white/50">
                Generate, enhance, and edit images & video entirely on your
                computer &mdash; no uploads, no limits.
              </p>

              {/* Download buttons */}
              <div className="mb-12 flex flex-wrap justify-center gap-2">
                {downloads.map((d) => (
                  <a
                    key={d.platform}
                    href={d.href}
                    className="group flex items-center gap-3 rounded-xs border border-white/15 bg-white/5 px-4 py-2.5 text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/10"
                  >
                    <span className="text-white/60 transition-colors group-hover:text-white">
                      {d.icon}
                    </span>
                    <span className="flex flex-col items-start">
                      <span className="font-mono text-[10px] leading-tight text-white/40">
                        Download
                      </span>
                      <span className="font-mono text-sm leading-tight font-medium">
                        {d.platform}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop screenshot */}
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-t-lg border border-b-0 border-white/15">
              <Image
                src={desktopImg}
                alt="WaveSpeed Desktop interface"
                width={1280}
                height={800}
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Model Marquee ────────────────────────────────────── */}
      <section className="bg-dark overflow-hidden border-t border-white/10 py-5">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-8">
          {[...desktopModels, ...desktopModels].map((m, i) => (
            <span
              key={`${m.name}-${i}`}
              className="flex shrink-0 items-center gap-2 font-mono text-xs whitespace-nowrap"
            >
              <span className="text-white/80">{m.name}</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-white/40">{m.provider}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Why Use Desktop ──────────────────────────────────── */}
      <section className="dark:bg-dark px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-heading font-display text-2xl leading-none font-bold tracking-tight text-balance md:text-5xl">
              Why Use WaveSpeed Desktop?
            </h2>
          </div>

          {/* Feature rows (alternating) */}
          <div className="flex flex-col gap-16">
            {/* Row 1: Free tools accordion */}
            <FreeToolsAccordion />

            {/* Remaining feature rows */}
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
                  i % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-1">
                  <h3 className="text-heading font-display text-xl leading-none font-bold tracking-tight md:text-3xl">
                    {f.title}
                  </h3>
                  <p className="text-foreground/60 text-base text-pretty">
                    {f.description}
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {f.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-foreground/60 flex items-start gap-2 font-mono text-sm leading-relaxed"
                      >
                        <Check className="text-green mt-0.5 size-3.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:flex-1">
                  {f.visual === "local-files" ? (
                    <LocalFilesVisual />
                  ) : (
                    <TemplatesVisual />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats + Testimonials ─────────────────────────────── */}
      <section className="bg-dark dark:bg-dark">
        <div className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            {/* Heading */}
            <div className="mb-12 flex max-w-xl flex-col gap-4">
              <h2 className="font-display text-2xl leading-none font-bold tracking-tight text-balance text-white md:text-5xl">
                Built for desktop speed and privacy
              </h2>
              <p className="font-mono text-sm text-pretty text-white/50">
                1M+ creators and teams ship faster with WaveSpeed Desktop
                &mdash; no uploads, no waiting.
              </p>
            </div>

            {/* Trusted partners */}
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <span className="font-mono text-xs text-white/30">
                Trusted partners
              </span>
              <div className="flex items-center gap-6 md:gap-8">
                {(
                  [
                    {
                      src: "https://d1q70pf5vjeyhc.wavespeed.ai/media/images/1765329136975725962_UJRQNMJS.png",
                      cls: "w-14 md:w-16",
                    },
                    {
                      src: "https://d1q70pf5vjeyhc.wavespeed.ai/media/images/1765329137101439665_8ifeljhf.png",
                      cls: "w-10 md:w-12",
                    },
                    {
                      src: "https://d1q70pf5vjeyhc.wavespeed.ai/media/images/1765329136869650924_wGOW4cks.png",
                      cls: "w-24 md:w-28",
                    },
                    {
                      src: "https://d1q70pf5vjeyhc.wavespeed.ai/media/images/1765329137005415203_DDMJIFEM.png",
                      cls: "w-18 md:w-22",
                    },
                  ] as const
                ).map((logo, i) => (
                  <div key={i} className={`relative h-4 md:h-5 ${logo.cls}`}>
                    <Image
                      src={logo.src}
                      alt="Partner logo"
                      fill
                      sizes="120px"
                      className="object-contain opacity-40 grayscale"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 rounded-xs border border-white/10 p-6"
                >
                  <span className="font-display text-3xl font-bold tracking-tighter text-white md:text-4xl">
                    {s.value}
                  </span>
                  <span className="font-mono text-xs text-white/40">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col justify-between gap-6 rounded-xs border border-white/10 p-6"
                >
                  <p className="text-lg leading-normal font-medium text-pretty text-white">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-full object-cover"
                    />
                    <div className="font-mono text-sm leading-normal">
                      <p className="text-white/80">{t.name}</p>
                      <p className="text-white/40">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <CTABanner>
        <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
          Ready to Experience Lightning-Fast AI Generation?
        </h2>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <a
            href={downloads[0].href}
            className="flex items-center gap-3 rounded-xs bg-black px-8 py-4 whitespace-nowrap text-white transition-colors duration-150 hover:bg-black/80"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              Download Now
            </span>
            <ArrowRight className="size-4" />
          </a>
          <Link
            href="/docs"
            className="flex items-center rounded-xs border border-black/20 px-8 py-4 whitespace-nowrap text-black transition-colors duration-150 hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              View Docs
            </span>
          </Link>
        </div>
      </CTABanner>

      <Footer />
    </main>
  );
}

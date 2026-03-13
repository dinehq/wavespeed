"use client";

import Image from "next/image";
import desktopBg from "@/images/desktop.webp";
import { CodeEditorCard } from "@/components/hero-demo";

// const features = [
//   { label: "1M+", detail: "Desktop installs" },
//   { label: "50M+", detail: "On-device generations" },
//   { label: "4.9/5", detail: "Privacy-first rating" },
//   { label: "2s", detail: "Median local render time" },
// ];

export function ForCreators() {
  return (
    <section className="bg-dark dark:bg-dark relative overflow-hidden">
      <div className="px-6 pt-16 pb-16 md:px-12 md:pt-24 md:pb-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 md:gap-24">
          {/* Row 1: For Developers — text left, code right */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex flex-col gap-4 lg:w-80 lg:shrink-0 lg:pt-6">
              <h2 className="font-display text-2xl leading-none font-medium tracking-tight text-balance text-white md:text-5xl">
                Built For Developers
              </h2>
              <p className="font-mono text-sm text-pretty text-white/50">
                Integrate any model with a single API call. Node, Python, or
                cURL — ship in minutes, not days.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="#"
                  className="tracking-xl inline-flex items-center gap-2 rounded-xs bg-white px-5 py-2.5 font-mono text-sm text-black uppercase transition-colors duration-150 hover:bg-white/90"
                >
                  API Docs
                </a>
                <a
                  href="#"
                  className="tracking-xl inline-flex items-center gap-2 rounded-xs border border-white/20 px-5 py-2.5 font-mono text-sm text-white uppercase transition-colors duration-150 hover:bg-white/10"
                >
                  Quickstart
                </a>
              </div>
            </div>
            <div className="dark min-w-0 rounded-lg shadow-[0_0_60px_-12px_rgba(255,255,255,0.1)] lg:flex-1">
              <CodeEditorCard />
            </div>
          </div>

          {/* Row 2: For Creators — preview left, text right */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 overflow-hidden rounded-md shadow-[0_0_60px_-12px_rgba(255,255,255,0.1)] lg:flex-1">
              <Image
                src={desktopBg}
                alt="WaveSpeed Studio"
                width={1280}
                height={800}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-8 lg:w-80 lg:shrink-0 lg:pt-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-2xl leading-none font-medium tracking-tight text-balance text-white md:text-5xl">
                  And For Creators
                </h2>
                <p className="font-mono text-sm text-pretty text-white/50">
                  WaveSpeed Studio puts the full power of our inference engine
                  into a desktop app — no code, no setup, just create.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <a
                  href="https://wavespeed.ai/studio/"
                  className="tracking-xl inline-flex items-center gap-2 rounded-xs bg-white px-5 py-2.5 font-mono text-sm text-black uppercase transition-colors duration-150 hover:bg-white/90"
                >
                  Try Studio
                </a>
                <a
                  href="https://wavespeed.ai/landing/desktop"
                  className="group tracking-xl inline-flex items-center gap-2 rounded-xs border border-white/20 px-5 py-2.5 font-mono text-sm text-white uppercase transition-colors duration-150 hover:bg-white/10"
                >
                  Desktop
                  <svg
                    className="size-4 transition-transform duration-150 group-hover:translate-y-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M3 14h10" />
                  </svg>
                </a>
              </div>

              {/* <div className="grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6">
                {features.map((f) => (
                  <div key={f.label}>
                    <p className="font-display text-2xl font-medium text-white">
                      {f.label}
                    </p>
                    <p className="tracking-lg font-mono text-xs text-white/40 uppercase">
                      {f.detail}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

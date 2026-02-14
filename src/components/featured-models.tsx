"use client";

import Image from "next/image";
import { useState } from "react";

const models = [
  {
    name: "flux-pro/kontext",
    provider: "wavespeed-ai",
    type: "image-to-image",
    speed: "2.4s",
    speedBar: 46,
    tps: "39tps",
    status: 5,
  },
  {
    name: "wan-2.6/t2v",
    provider: "wavespeed-ai",
    type: "text-to-video",
    speed: "3.1s",
    speedBar: 38,
    tps: "32tps",
    status: 5,
  },
  {
    name: "flux-dev/lora",
    provider: "wavespeed-ai",
    type: "text-to-image",
    speed: "1.8s",
    speedBar: 55,
    tps: "45tps",
    status: 5,
  },
  {
    name: "gpt-image-1",
    provider: "openai",
    type: "text-to-image",
    speed: "4.2s",
    speedBar: 30,
    tps: "28tps",
    status: 5,
  },
  {
    name: "kling-v2.6",
    provider: "kling-ai",
    type: "text-to-video",
    speed: "5.1s",
    speedBar: 25,
    tps: "22tps",
    status: 5,
  },
  {
    name: "pixverse-v5.6",
    provider: "pixverse",
    type: "text-to-video",
    speed: "2.9s",
    speedBar: 42,
    tps: "35tps",
    status: 5,
  },
  {
    name: "sora-2",
    provider: "openai",
    type: "text-to-video",
    speed: "6.3s",
    speedBar: 20,
    tps: "18tps",
    status: 5,
  },
  {
    name: "veo-3.1",
    provider: "google",
    type: "text-to-video",
    speed: "3.8s",
    speedBar: 35,
    tps: "30tps",
    status: 5,
  },
  {
    name: "seedance-v1.5",
    provider: "bytedance",
    type: "text-to-video",
    speed: "4.5s",
    speedBar: 28,
    tps: "25tps",
    status: 5,
  },
  {
    name: "flux-2-max",
    provider: "wavespeed-ai",
    type: "text-to-image",
    speed: "1.5s",
    speedBar: 60,
    tps: "52tps",
    status: 5,
  },
  {
    name: "wan-2.6/i2v",
    provider: "wavespeed-ai",
    type: "image-to-video",
    speed: "3.4s",
    speedBar: 36,
    tps: "31tps",
    status: 5,
  },
  {
    name: "nano-banana",
    provider: "google",
    type: "text-to-image",
    speed: "0.8s",
    speedBar: 75,
    tps: "68tps",
    status: 5,
  },
];

const leftThumbs = Array.from(
  { length: 12 },
  (_, i) => `/images/thumb-${i + 1}.webp`,
);
const rightThumbs = Array.from(
  { length: 12 },
  (_, i) => `/images/thumb-r${i + 1}.webp`,
);

function StatusDots({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-green h-3 w-1" />
      ))}
    </div>
  );
}

function SpeedBar({ percent }: { percent: number }) {
  return (
    <div className="h-[3px] w-[84px] bg-track">
      <div className="h-full bg-foreground" style={{ width: `${percent}%` }} />
    </div>
  );
}

export function FeaturedModels() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-20">
      {/* Header */}
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-10">
        <div className="flex max-w-[876px] flex-col items-center gap-4 text-center">
          <h2 className="text-heading text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
            Featured Models
          </h2>
          <p className="text-subtle font-mono text-base text-pretty">
            Access the world&apos;s most advanced multimodal models
            <br className="hidden md:block" />
            through a single, unified API.
          </p>
        </div>
      </div>

      {/* Full-width table area with edge-pinned thumbnails */}
      <div className="relative mt-10">
        {/* Left thumbnail strip */}
        <div className="pointer-events-none absolute top-0 left-0 hidden flex-col items-start xl:flex">
          {leftThumbs.map((src, i) => {
            const isActive = hoveredIndex === i;
            const size = isActive ? 120 : 80;
            return (
              <div
                key={i}
                className="relative overflow-hidden transition-all duration-300 ease-out"
                style={{
                  height: size,
                  width: size,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            );
          })}
        </div>

        {/* Right thumbnail strip */}
        <div className="pointer-events-none absolute top-0 right-0 hidden flex-col items-end xl:flex">
          {rightThumbs.map((src, i) => {
            const isActive = hoveredIndex === i;
            const size = isActive ? 120 : 80;
            return (
              <div
                key={i}
                className="relative overflow-hidden transition-all duration-300 ease-out"
                style={{
                  height: size,
                  width: size,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            );
          })}
        </div>

        {/* Table rows */}
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-col">
            {models.map((model, i) => (
              <a
                key={i}
                href="#"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 border-b border-foreground/5 px-4 py-3 transition-colors duration-150 md:h-20 md:grid-cols-12 md:gap-4 md:px-8 md:py-6 xl:grid-cols-12 ${
                  hoveredIndex === i ? "bg-surface" : ""
                }`}
              >
                <div className="relative size-10 shrink-0 overflow-hidden rounded-xs xl:hidden">
                  <Image src={leftThumbs[i]} alt="" fill className="object-cover" />
                </div>
                <div className="col-span-1 md:col-span-3">
                  <span className="font-mono text-sm leading-5 text-foreground">
                    {model.name}
                  </span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="font-mono text-sm leading-5 text-foreground">
                    {model.provider}
                  </span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="font-mono text-sm leading-5 text-foreground">
                    {model.type}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2 px-0.5 md:col-span-2 md:justify-start">
                  <span className="font-mono text-sm leading-5 text-foreground">
                    {model.speed}
                  </span>
                  <SpeedBar percent={model.speedBar} />
                </div>
                <div className="col-span-1 hidden items-center md:flex">
                  <span className="font-mono text-sm leading-4 text-foreground uppercase">
                    {model.tps}
                  </span>
                </div>
                <div className="col-span-1 hidden items-center justify-end md:flex">
                  <StatusDots count={model.status} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="mx-auto mt-10 flex max-w-[1160px] justify-center">
        <a
          href="#"
          className="rounded-xs bg-foreground px-4 py-3 font-mono text-sm font-medium tracking-[1.2px] text-background transition-colors duration-150 hover:bg-foreground/80"
        >
          Explore all 1326 models
        </a>
      </div>
    </section>
  );
}

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
  (_, i) => `/images/thumb-${i + 1}.png`,
);
const rightThumbs = Array.from(
  { length: 12 },
  (_, i) => `/images/thumb-r${i + 1}.png`,
);

function StatusDots({ count }: { count: number }) {
  return (
    <div className="flex gap-px items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-1 h-3 bg-green" />
      ))}
    </div>
  );
}

function SpeedBar({ percent }: { percent: number }) {
  return (
    <div className="bg-[#d9d9d9] h-[3px] w-[85px]">
      <div className="bg-black h-full" style={{ width: `${percent}%` }} />
    </div>
  );
}

export function FeaturedModels() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20">
      {/* Header */}
      <div className="mx-auto max-w-[1160px] flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center max-w-[875px]">
          <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-heading">
            Featured Models
          </h2>
          <p className="font-mono text-base leading-[1.3] text-subtle">
            Access the world&apos;s most advanced multimodal models
            <br />
            through a single, unified API.
          </p>
        </div>
      </div>

      {/* Full-width table area with edge-pinned thumbnails */}
      <div className="relative mt-10">
        {/* Left thumbnail strip */}
        <div className="absolute left-0 top-0 flex flex-col items-start pointer-events-none">
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
        <div className="absolute right-0 top-0 flex flex-col items-end pointer-events-none">
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
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`grid grid-cols-12 gap-4 px-8 py-6 h-20 items-center border-b border-black/5 transition-colors duration-150 cursor-default ${
                  hoveredIndex === i ? "bg-surface" : ""
                }`}
              >
                <div className="col-span-3">
                  <span className="font-mono text-sm text-black leading-5">
                    {model.name}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="font-mono text-sm text-black leading-5">
                    {model.provider}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="font-mono text-sm text-black leading-5">
                    {model.type}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2 px-0.5">
                  <span className="font-mono text-sm text-black leading-5">
                    {model.speed}
                  </span>
                  <SpeedBar percent={model.speedBar} />
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="font-mono text-sm text-black uppercase leading-[15px]">
                    {model.tps}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <StatusDots count={model.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="mx-auto max-w-[1160px] flex justify-center mt-10">
        <a
          href="#"
          className="bg-black text-white rounded-sm px-4 py-3 font-mono text-sm font-medium tracking-[1.2px] transition-colors duration-150 hover:bg-black/80"
        >
          Explore all 1326 models
        </a>
      </div>
    </section>
  );
}

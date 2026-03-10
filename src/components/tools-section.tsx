"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import Lab1 from "@/images/lab-1.svg";
import Lab2 from "@/images/lab-2.svg";
import Lab3 from "@/images/lab-3.svg";
import Lab4 from "@/images/lab-4.svg";
import Lab5 from "@/images/lab-5.svg";
import Lab6 from "@/images/lab-6.svg";
import Lab7 from "@/images/lab-7.svg";
import Lab8 from "@/images/lab-8.svg";
import toolsBflBg from "@/images/tools-bfl-bg.webp";
import toolsWanBg from "@/images/tools-wan-bg.webp";
import toolsOpenaiBg from "@/images/tools-openai-bg.webp";
import toolsBytedanceBg from "@/images/tools-bytedance-bg.webp";
import toolsBytedanceBg2 from "@/images/tools-bytedance-bg2.webp";
import toolsRunwayBg from "@/images/tools-runway-bg.webp";
import toolsKlingBg from "@/images/tools-kling-bg.webp";
import toolsReccraftBg from "@/images/tools-reccraft-bg.webp";
import toolsGoogleBg from "@/images/tools-google-bg.webp";
import tool01 from "@/images/tool-01.webp";
import tool02 from "@/images/tool-02.webp";
import tool03 from "@/images/tool-03.webp";
import tool04 from "@/images/tool-04.webp";
import tool05 from "@/images/tool-05.webp";
import tool06 from "@/images/tool-06.webp";
import tool07 from "@/images/tool-07.webp";
import tool08 from "@/images/tool-08.webp";
import tool09 from "@/images/tool-09.webp";
import tool10 from "@/images/tool-10.webp";
import tool11 from "@/images/tool-11.webp";

const providerRow1 = [
  {
    name: "Black Forest Labs",
    logo: Lab1,
    size: "large" as const,
    bg: toolsBflBg,
    models: [
      ["FLUX 2 PRO", "FLUX 2 MAX"],
      ["FLUX 2 DEV", "FLUX 2 FLASH"],
      ["FLUX 2 FLEX", "FLUX 2 TURBO"],
      ["FLUX 2 DEV LoRA", "FLUX 2 KLEIN"],
    ],
  },
  {
    name: "Wan",
    logo: Lab2,
    size: "small" as const,
    bg: toolsWanBg,
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "OpenAI",
    logo: Lab3,
    size: "small" as const,
    bg: toolsOpenaiBg,
    models: [
      "gpt-image-1.5/edit",
      "sora-2/image-to-video",
      "sora-2/text-to-video",
      "gpt-image-1",
    ],
  },
  {
    name: "ByteDance | Seedance",
    logo: Lab4,
    size: "small" as const,
    bg: [toolsBytedanceBg, toolsBytedanceBg2],
    models: [
      "seedance-v1.5-pro/text-to-video",
      "seedance-v1.5-pro/image-to-video",
      "seedance-v1.5-pro/text-to-video",
    ],
  },
  {
    name: "runway",
    logo: Lab5,
    size: "small" as const,
    bg: toolsRunwayBg,
    models: ["gen4-aleph", "gen4-turbo", "gen4-image", "gen4-image-turbo"],
  },
  {
    name: "KlingAI",
    logo: Lab6,
    size: "small" as const,
    bg: toolsKlingBg,
    models: [
      "kling-v2.6-std/motion-control",
      "kling-v2.5-turbo-std/i2v",
      "kling-v2.5-turbo-pro/i2v",
      "kling-video-to-audio",
    ],
  },
  {
    name: "RecCraft",
    logo: Lab7,
    size: "small" as const,
    bg: toolsReccraftBg,
    models: [
      "reccraft-v3/text-to-image",
      "reccraft-v3/svg",
      "reccraft-v3/image-to-image",
      "reccraft-v3/inpaint",
    ],
  },
  {
    name: "Google",
    logo: Lab8,
    size: "large" as const,
    bg: toolsGoogleBg,
    models: [
      ["nano-banana-pro/edit", "veo3.1/ref-to-video"],
      ["veo3.1/text-to-video", "veo extend"],
      ["veo3.1-fast/t2v", "nano-banana-pro/t2i"],
      ["veo3.1-fast/i2v", "nano-banana-pro/ultra"],
    ],
  },
  {
    name: "Tencent",
    logo: Lab2,
    size: "small" as const,
    bg: toolsWanBg,
    models: [
      "hunyuan-video/text-to-video",
      "hunyuan-video/image-to-video",
      "hunyuan-dit/text-to-image",
      "hunyuan-dit/image-edit",
    ],
  },
];

const providerRow2 = [
  {
    name: "runway",
    logo: Lab5,
    size: "small" as const,
    bg: toolsRunwayBg,
    models: ["gen4-aleph", "gen4-turbo", "gen4-image", "gen4-image-turbo"],
  },
  {
    name: "KlingAI",
    logo: Lab6,
    size: "small" as const,
    bg: toolsKlingBg,
    models: [
      "kling-v2.6-std/motion-control",
      "kling-v2.5-turbo-std/i2v",
      "kling-v2.5-turbo-pro/i2v",
      "kling-video-to-audio",
    ],
  },
  {
    name: "RecCraft",
    logo: Lab7,
    size: "small" as const,
    bg: toolsReccraftBg,
    models: [
      "reccraft-v3/text-to-image",
      "reccraft-v3/svg",
      "reccraft-v3/image-to-image",
      "reccraft-v3/inpaint",
    ],
  },
  {
    name: "Google",
    logo: Lab8,
    size: "large" as const,
    bg: toolsGoogleBg,
    models: [
      ["nano-banana-pro/edit", "veo3.1/ref-to-video"],
      ["veo3.1/text-to-video", "veo extend"],
      ["veo3.1-fast/t2v", "nano-banana-pro/t2i"],
      ["veo3.1-fast/i2v", "nano-banana-pro/ultra"],
    ],
  },
  {
    name: "Tencent",
    logo: Lab2,
    size: "small" as const,
    bg: toolsWanBg,
    models: [
      "hunyuan-video/text-to-video",
      "hunyuan-video/image-to-video",
      "hunyuan-dit/text-to-image",
      "hunyuan-dit/image-edit",
    ],
  },
  {
    name: "Black Forest Labs",
    logo: Lab1,
    size: "large" as const,
    bg: toolsBflBg,
    models: [
      ["FLUX 2 PRO", "FLUX 2 MAX"],
      ["FLUX 2 DEV", "FLUX 2 FLASH"],
      ["FLUX 2 FLEX", "FLUX 2 TURBO"],
      ["FLUX 2 DEV LoRA", "FLUX 2 KLEIN"],
    ],
  },
  {
    name: "Wan",
    logo: Lab2,
    size: "small" as const,
    bg: toolsWanBg,
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "OpenAI",
    logo: Lab3,
    size: "small" as const,
    bg: toolsOpenaiBg,
    models: [
      "gpt-image-1.5/edit",
      "sora-2/image-to-video",
      "sora-2/text-to-video",
      "gpt-image-1",
    ],
  },
  {
    name: "ByteDance",
    logo: Lab4,
    size: "small" as const,
    bg: [toolsBytedanceBg, toolsBytedanceBg2],
    models: [
      "seedance-v1.5-pro/text-to-video",
      "seedance-v1.5-pro/image-to-video",
      "seedance-v1.5-pro/text-to-video",
    ],
  },
];

const categoryRow1 = [
  {
    name: "Best Open Source Video Models",
    count: "30 models",
    bg: tool01,
    dark: false,
  },
  {
    name: "Best Open Source Image Models",
    count: "30 models",
    bg: tool02,
    dark: false,
  },
  {
    name: "Swap Anything",
    count: "22 models",
    bg: tool03,
    dark: false,
  },
  {
    name: "Audio for Video",
    count: "3 models",
    bg: tool04,
    dark: false,
  },
  {
    name: "Video Edit",
    count: "3 models",
    bg: tool05,
    dark: false,
  },
  {
    name: "Upscaling",
    count: "12 models",
    bg: tool06,
    dark: false,
  },
  {
    name: "Image Inpainting",
    count: "8 models",
    bg: tool07,
    dark: false,
  },
  {
    name: "Style Transfer",
    count: "15 models",
    bg: tool08,
    dark: false,
  },
  {
    name: "Background Removal",
    count: "6 models",
    bg: tool09,
    dark: false,
  },
  {
    name: "Video Effects",
    count: "10 models",
    bg: tool10,
    dark: false,
  },
];

const categoryRow2 = [
  {
    name: "Text-to-3D",
    count: "14 models",
    bg: tool11,
    dark: false,
  },
  {
    name: "Generate Music",
    count: "30 models",
    bg: tool07,
    dark: false,
  },
  {
    name: "Ultra Selection",
    count: "22 models",
    bg: tool08,
    dark: false,
  },
  {
    name: "Remove Anything",
    count: "3 models",
    bg: tool09,
    dark: false,
  },
  {
    name: "3D Creation",
    count: "3 models",
    bg: tool10,
    dark: false,
  },
  {
    name: "Training Tools",
    count: "3 models",
    bg: tool11,
    dark: false,
  },
  {
    name: "Motion Capture",
    count: "7 models",
    bg: tool01,
    dark: false,
  },
  {
    name: "Voice Cloning",
    count: "5 models",
    bg: tool02,
    dark: false,
  },
  {
    name: "Image Segmentation",
    count: "9 models",
    bg: tool03,
    dark: false,
  },
  {
    name: "Video Restoration",
    count: "4 models",
    bg: tool04,
    dark: false,
  },
];

type ProviderCard = (typeof providerRow1)[number];

function ProviderCard({ card }: { card: ProviderCard }) {
  const isLarge = card.size === "large";
  const bgs = Array.isArray(card.bg) ? card.bg : [card.bg];
  const hasGrid = isLarge && Array.isArray(card.models[0]);

  return (
    <div className="group relative flex h-60 min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xs p-6 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.15)] hover:brightness-110 md:h-80">
      {/* Background image(s) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-panel absolute inset-0" />
        {bgs.map((bg, i) => (
          <Image
            key={i}
            src={bg}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ))}
      </div>
      {/* Bottom gradient + blur with smooth fade-in via mask */}
      <div className="absolute right-0 bottom-0 left-0 h-40 bg-linear-to-b from-transparent to-black/40" />
      <div
        className="absolute right-0 bottom-0 left-0 h-40 backdrop-blur-lg"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />

      {/* Logo */}
      <card.logo className="relative h-auto self-start" />

      {/* Model list */}
      {hasGrid ? (
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm leading-tight text-white/80">
          {(card.models as string[][]).map((pair, i) =>
            pair.map((model, j) => (
              <p className="truncate" key={`${i}-${j}`}>
                {model}
              </p>
            )),
          )}
        </div>
      ) : (
        <div className="relative flex flex-col gap-1 font-mono text-sm leading-tight text-white/80">
          {(card.models as string[]).map((model, i) => (
            <p className="truncate" key={i}>
              {model}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
}: {
  category: { name: string; count: string; bg: StaticImageData; dark: boolean };
}) {
  return (
    <div className="group relative flex h-20 min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xs p-4 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.15)] hover:brightness-110 md:h-33 md:p-6">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={category.bg}
          alt=""
          fill
          className="object-cover object-top"
        />
      </div>
      <p
        className={`font-display relative truncate text-base leading-6 font-medium tracking-[-0.5px] md:text-xl md:leading-7 ${
          category.dark ? "text-white" : "text-black"
        }`}
      >
        {category.name}
      </p>
      <p
        className={`relative font-mono text-sm leading-tight ${
          category.dark ? "text-white/64" : "text-black/64"
        }`}
      >
        {category.count}
      </p>
    </div>
  );
}

function DragRow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragged = useRef(false);

  return (
    <div
      ref={ref}
      className={`flex gap-4 select-none ${className ?? ""}`}
      onMouseDown={(e) => {
        const el = ref.current;
        if (!el) return;
        isDown.current = true;
        startX.current = e.pageX;
        scrollStart.current = el.scrollLeft;
        dragged.current = false;
        el.style.cursor = "grabbing";
      }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || !isDown.current) return;
        e.preventDefault();
        const walk = (e.pageX - startX.current) * 1.5;
        el.scrollLeft = scrollStart.current - walk;
        if (Math.abs(walk) > 3) dragged.current = true;
      }}
      onMouseUp={() => {
        isDown.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
      }}
      onMouseLeave={() => {
        isDown.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
      }}
      onClickCapture={(e) => {
        if (dragged.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}

export function ToolsSection() {
  return (
    <section className="pt-20 md:pt-30">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-244 px-6 text-center md:px-20">
        <h2 className="text-heading font-display mb-6 text-2xl leading-none font-medium tracking-[-1px] text-balance md:text-5xl">
          Get <em className="italic">any</em> tool you want
        </h2>
        <p className="text-subtle font-mono text-base text-pretty">
          Transform your creative workflow with AI tools for
          <br className="hidden md:block" />
          upscaling, editing, and generating images and videos.
        </p>
      </div>

      {/* Cards area — full width, grid for even distribution */}
      <div className="flex flex-col gap-4 px-4">
        {/* Provider Row 1: marquee */}
        <div className="group/marquee overflow-hidden">
          <div className="group-hover/marquee:paused flex w-max animate-[marquee_60s_linear_infinite] gap-4">
            {[...providerRow1, ...providerRow1].map((card, i) => (
              <div
                key={`${card.name}-${i}`}
                className={`shrink-0 ${
                  card.size === "large" ? "w-135" : "w-80"
                }`}
              >
                <ProviderCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Provider Row 2: reverse marquee */}
        <div className="group/marquee2 overflow-hidden">
          <div className="group-hover/marquee2:paused flex w-max animate-[marquee-reverse_60s_linear_infinite] gap-4">
            {[...providerRow2, ...providerRow2].map((card, i) => (
              <div
                key={`${card.name}-r-${i}`}
                className={`shrink-0 ${
                  card.size === "large" ? "w-135" : "w-80"
                }`}
              >
                <ProviderCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Category Row 1 */}
        <DragRow className="cursor-grab overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryRow1.map((cat, i) => (
            <div key={i} className="w-65 shrink-0 md:w-100">
              <CategoryCard category={cat} />
            </div>
          ))}
        </DragRow>

        {/* Category Row 2 */}
        <DragRow className="cursor-grab overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryRow2.map((cat, i) => (
            <div key={i} className="w-50 shrink-0 md:w-80">
              <CategoryCard category={cat} />
            </div>
          ))}
        </DragRow>
      </div>
    </section>
  );
}

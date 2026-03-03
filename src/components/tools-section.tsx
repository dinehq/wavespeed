import Image, { type StaticImageData } from "next/image";
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
      "seedance-v1.5-pro/text-to video",
      "seedance-v1.5-pro/image-tovideo",
      "seedance-v1.5-pro/text-tovideo",
    ],
  },
];

const providerRow2 = [
  {
    name: "runway",
    logo: Lab5,
    size: "small" as const,
    bg: toolsRunwayBg,
    models: [
      "gen4-aleph",
      "gen4-turbo",
      "gen4-image",
      "gen4-image-turbo",
      "upscale-v1",
    ],
  },
  {
    name: "KlingAI",
    logo: Lab6,
    size: "small" as const,
    bg: toolsKlingBg,
    models: [
      "kling-v2.6-std/motion-contro",
      "kling-v2.5-turbo-std/image-tovideo",
      "kling-v2.5-turbo-pro/image to-video",
      "kling-video-to-audio",
    ],
  },
  {
    name: "RecCraft",
    logo: Lab7,
    size: "small" as const,
    bg: toolsReccraftBg,
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "Google",
    logo: Lab8,
    size: "large" as const,
    bg: toolsGoogleBg,
    models: [
      ["nano-banana-pro/edit", "veo3.1/reference-to-video"],
      ["veo3.1/text-to-video", "veo extend"],
      ["veo3.1-fast/text-to-video", "nano-banana-pro/text-to image nutriti"],
      ["veo3.1-fast/image-to-video", "nano-banana-pro/text-to. image-ultra"],
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
];

const categoryRow2 = [
  {
    name: "Best Open Source Video Models",
    count: "30 models",
    bg: tool06,
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
];

type ProviderCard = (typeof providerRow1)[number];

function ProviderCard({ card }: { card: ProviderCard }) {
  const isLarge = card.size === "large";
  const bgs = Array.isArray(card.bg) ? card.bg : [card.bg];
  const hasGrid = isLarge && Array.isArray(card.models[0]);

  return (
    <div className="group relative flex h-[240px] min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xs p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl md:h-[320px]">
      {/* Background image(s) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-panel absolute inset-0" />
        {bgs.map((bg, i) => (
          <Image
            key={i}
            src={bg}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ))}
      </div>
      {/* Bottom gradient + blur with smooth fade-in via mask */}
      <div className="absolute right-0 bottom-0 left-0 h-[160px] bg-linear-to-b from-transparent to-black/40" />
      <div
        className="absolute right-0 bottom-0 left-0 h-[160px] backdrop-blur-lg"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />

      {/* Logo */}
      <card.logo className="relative self-start" />

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
    <div className="group relative flex h-[80px] min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xs p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl md:h-[131px] md:p-6">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={category.bg}
          alt=""
          fill
          className="object-cover object-top"
        />
      </div>
      <p
        className={`relative truncate text-base leading-6 font-medium tracking-[-0.5px] md:text-xl md:leading-7 ${
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

export function ToolsSection() {
  return (
    <section className="overflow-hidden pt-20 md:pt-[120px]">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-[976px] px-6 text-center md:px-20">
        <h2 className="text-heading mb-6 text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
          Get <em className="italic">any</em> tool you want
        </h2>
        <p className="text-subtle font-mono text-base text-pretty">
          Transform your creative workflow with AI tools for
          <br className="hidden md:block" />
          upscaling, editing, and generating images and videos.
        </p>
      </div>

      {/* Cards area — full width, grid for even distribution */}
      <div className="flex flex-col gap-[18px] px-4">
        {/* Provider Row 1: large + 3 small */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {providerRow1.map((card) => (
            <ProviderCard key={card.name} card={card} />
          ))}
        </div>

        {/* Provider Row 2: 3 small + large */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_2fr]">
          {providerRow2.map((card) => (
            <ProviderCard key={card.name} card={card} />
          ))}
        </div>

        {/* Category Row 1 */}
        <div className="flex gap-2 max-lg:overflow-x-auto max-lg:[scrollbar-width:none] md:gap-4 lg:grid lg:grid-cols-5 max-lg:[&::-webkit-scrollbar]:hidden">
          {categoryRow1.map((cat) => (
            <div key={cat.name} className="w-[200px] shrink-0 lg:w-auto">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>

        {/* Category Row 2 */}
        <div className="flex gap-2 max-lg:overflow-x-auto max-lg:[scrollbar-width:none] md:gap-4 lg:grid lg:grid-cols-6 max-lg:[&::-webkit-scrollbar]:hidden">
          {categoryRow2.map((cat) => (
            <div key={cat.name + "2"} className="w-[200px] shrink-0 lg:w-auto">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

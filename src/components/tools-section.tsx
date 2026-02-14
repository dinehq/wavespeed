import Image from "next/image";

const providerRow1 = [
  {
    name: "Black Forest Labs",
    logo: "/images/lab-1.svg",
    size: "large" as const,
    bg: "/images/tools-bfl-bg.webp",
    models: [
      ["FLUX 2 PRO", "FLUX 2 MAX"],
      ["FLUX 2 DEV", "FLUX 2 FLASH"],
      ["FLUX 2 FLEX", "FLUX 2 TURBO"],
      ["FLUX 2 DEV LoRA", "FLUX 2 KLEIN"],
    ],
  },
  {
    name: "Wan",
    logo: "/images/lab-2.svg",
    size: "small" as const,
    bg: "/images/tools-wan-bg.webp",
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "OpenAI",
    logo: "/images/lab-3.svg",
    size: "small" as const,
    bg: "/images/tools-openai-bg.webp",
    models: [
      "gpt-image-1.5/edit",
      "sora-2/image-to-video",
      "sora-2/text-to-video",
      "gpt-image-1",
    ],
  },
  {
    name: "ByteDance | Seedance",
    logo: "/images/lab-4.svg",
    size: "small" as const,
    bg: ["/images/tools-bytedance-bg.webp", "/images/tools-bytedance-bg2.webp"],
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
    logo: "/images/lab-5.svg",
    size: "small" as const,
    bg: "/images/tools-runway-bg.webp",
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
    logo: "/images/lab-6.svg",
    size: "small" as const,
    bg: "/images/tools-kling-bg.webp",
    models: [
      "kling-v2.6-std/motion-contro",
      "kling-v2.5-turbo-std/image-tovideo",
      "kling-v2.5-turbo-pro/image to-video",
      "kling-video-to-audio",
    ],
  },
  {
    name: "RecCraft",
    logo: "/images/lab-7.svg",
    size: "small" as const,
    bg: "/images/tools-reccraft-bg.webp",
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "Google",
    logo: "/images/lab-8.svg",
    size: "large" as const,
    bg: "/images/tools-google-bg.webp",
    models: [
      ["nano-banana-pro/edit", "veo3.1/reference-to-video"],
      ["veo3.1/text-to-video", "eo extend"],
      ["veo3.1-fast/text-to-video", "nano-banana-pro/text-to image nutriti"],
      ["veo3.1-fast/image-to-video", "nano-banana-pro/text-to. image-ultra"],
    ],
  },
];

const categoryRow1 = [
  {
    name: "Best Open Source Video Models",
    count: "30 models",
    bg: "/images/tool-01.webp",
    dark: false,
  },
  {
    name: "Best Open Source Image Models",
    count: "30 models",
    bg: "/images/tool-02.webp",
    dark: false,
  },
  {
    name: "Swap Anything",
    count: "22 models",
    bg: "/images/tool-03.webp",
    dark: false,
  },
  {
    name: "Audio for Video",
    count: "3 models",
    bg: "/images/tool-04.webp",
    dark: false,
  },
  {
    name: "Video Edit",
    count: "3 models",
    bg: "/images/tool-05.webp",
    dark: false,
  },
];

const categoryRow2 = [
  {
    name: "Best Open Source Video Models",
    count: "30 models",
    bg: "/images/tool-06.webp",
    dark: false,
  },
  {
    name: "Generate Music",
    count: "30 models",
    bg: "/images/tool-07.webp",
    dark: false,
  },
  {
    name: "Ultra Selection",
    count: "22 models",
    bg: "/images/tool-08.webp",
    dark: false,
  },
  {
    name: "Remove Anything",
    count: "3 models",
    bg: "/images/tool-09.webp",
    dark: false,
  },
  {
    name: "3D Creation",
    count: "3 models",
    bg: "/images/tool-10.webp",
    dark: false,
  },
  {
    name: "Training Tools",
    count: "3 models",
    bg: "/images/tool-11.webp",
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
        <div className="absolute inset-0 bg-[#f1f2f3]" />
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
      <Image
        src={card.logo}
        alt={card.name}
        width={0}
        height={0}
        className="relative h-8 w-auto self-start"
        unoptimized
      />

      {/* Model list */}
      {hasGrid ? (
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm leading-tight text-white/80">
          {(card.models as string[][]).map((pair, i) =>
            pair.map((model, j) => (
              <p className="truncate text-pretty" key={`${i}-${j}`}>
                {model}
              </p>
            )),
          )}
        </div>
      ) : (
        <div className="relative flex flex-col gap-1 font-mono text-sm leading-tight text-white/80">
          {(card.models as string[]).map((model, i) => (
            <p className="truncate text-pretty" key={i}>
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
  category: { name: string; count: string; bg: string; dark: boolean };
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
    <section className="overflow-hidden py-20">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-[976px] px-6 text-center md:px-20">
        <h2 className="text-heading mb-6 text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
          Get <em className="italic">any</em> tool you want
        </h2>
        <p className="text-subtle font-mono text-base leading-[1.3] text-pretty">
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
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:gap-4 lg:grid lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {categoryRow1.map((cat) => (
            <div key={cat.name} className="w-[160px] shrink-0 lg:w-auto">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>

        {/* Category Row 2 */}
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:gap-4 lg:grid lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
          {categoryRow2.map((cat) => (
            <div key={cat.name + "2"} className="w-[160px] shrink-0 lg:w-auto">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

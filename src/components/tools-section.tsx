import Image from "next/image";

const providerRow1 = [
  {
    name: "Black Forest Labs",
    logo: "⛰ Black Forest Labs",
    size: "large" as const,
    bg: "/images/tools-bfl-bg.png",
    models: [
      ["FLUX 2 PRO", "FLUX 2 MAX"],
      ["FLUX 2 DEV", "FLUX 2 FLASH"],
      ["FLUX 2 FLEX", "FLUX 2 TURBO"],
      ["FLUX 2 DEV LoRA", "FLUX 2 KLEIN"],
    ],
  },
  {
    name: "Wan",
    logo: "🎨 Wan",
    size: "small" as const,
    bg: "/images/tools-wan-bg.png",
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "OpenAI",
    logo: "OpenAI",
    size: "small" as const,
    bg: "/images/tools-openai-bg.png",
    models: [
      "gpt-image-1.5/edit",
      "sora-2/image-to-video",
      "sora-2/text-to-video",
      "gpt-image-1",
    ],
  },
  {
    name: "ByteDance | Seedance",
    logo: "ByteDance | Seedance",
    size: "small" as const,
    bg: ["/images/tools-bytedance-bg.png", "/images/tools-bytedance-bg2.png"],
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
    logo: "runway",
    size: "small" as const,
    bg: ["/images/tools-runway-bg.png", "/images/tools-runway-bg2.png"],
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
    logo: "⚡ KlingAI",
    size: "small" as const,
    bg: "/images/tools-kling-bg.png",
    models: [
      "kling-v2.6-std/motion-contro",
      "kling-v2.5-turbo-std/image-tovideo",
      "kling-v2.5-turbo-pro/image to-video",
      "kling-video-to-audio",
    ],
  },
  {
    name: "RecCraft",
    logo: "RecCraft",
    size: "small" as const,
    bg: "/images/tools-reccraft-bg.png",
    models: [
      "Wan 2.6 Text-to-Video",
      "Wan 2.6 Image-to-Video",
      "wan-2.6/reference-to-video",
      "wan-2.6/image-edit",
    ],
  },
  {
    name: "Google",
    logo: "Google",
    size: "large" as const,
    bg: "/images/tools-google-bg.png",
    models: [
      ["nano-banana-pro/edit", "veo3.1/reference-to-video"],
      ["veo3.1/text-to-video", "eo extend"],
      ["veo3.1-fast/text-to-video", "nano-banana-pro/text-to image nutriti"],
      ["veo3.1-fast/image-to-video", "nano-banana-pro/text-to. image-ultra"],
    ],
  },
];

const categoryRow1 = [
  { name: "Best Open Source Video Models", count: "30 models", bg: "/images/tools-cat-video.png", dark: true },
  { name: "Best Open Source Image Models", count: "30 models", bg: "/images/tools-cat-image.png", dark: false },
  { name: "Swap Anything", count: "22 models", bg: "/images/tools-cat-swap.png", dark: false },
  { name: "Audio for Video", count: "3 models", bg: "/images/tools-cat-audio.png", dark: false },
  { name: "Video Edit", count: "3 models", bg: "/images/tools-cat-edit.png", dark: false },
];

const categoryRow2 = [
  { name: "Best Open Source Video Models", count: "30 models", bg: "/images/tools-cat-video2.png", dark: true },
  { name: "Generate Music", count: "30 models", bg: "/images/tools-cat-music.png", dark: false },
  { name: "Ultra Selection", count: "22 models", bg: "/images/tools-cat-ultra.png", dark: false },
  { name: "Remove Anything", count: "3 models", bg: "/images/tools-cat-remove.png", dark: false },
  { name: "3D Creation", count: "3 models", bg: "/images/tools-cat-3d.png", dark: false },
  { name: "Training Tools", count: "3 models", bg: "/images/tools-cat-training.png", dark: false },
];

type ProviderCard = (typeof providerRow1)[number];

function ProviderCard({ card }: { card: ProviderCard }) {
  const isLarge = card.size === "large";
  const bgs = Array.isArray(card.bg) ? card.bg : [card.bg];
  const hasGrid = isLarge && Array.isArray(card.models[0]);

  return (
    <div
      className={`relative h-[320px] overflow-hidden rounded-lg p-6 flex flex-col justify-between ${
        isLarge ? "w-[632px]" : "w-[308px]"
      }`}
    >
      {/* Background image(s) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#f1f2f3]" />
        {bgs.map((bg, i) => (
          <Image key={i} src={bg} alt="" fill className="object-cover" />
        ))}
      </div>
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[166px] bg-gradient-to-b from-transparent to-black/40 backdrop-blur-[16px]" />

      {/* Logo */}
      <span className="relative font-semibold text-xl text-white">{card.logo}</span>

      {/* Model list */}
      {hasGrid ? (
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm leading-[1.25] text-white/80">
          {(card.models as string[][]).map((pair, i) =>
            pair.map((model, j) => (
              <p key={`${i}-${j}`}>{model}</p>
            ))
          )}
        </div>
      ) : (
        <div className="relative flex flex-col gap-1 font-mono text-sm leading-[1.25] text-white/80">
          {(card.models as string[]).map((model, i) => (
            <p key={i} className="truncate">{model}</p>
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
    <div className="relative h-[131px] overflow-hidden rounded-lg p-6 flex flex-col justify-between flex-1">
      <div className="absolute inset-0 pointer-events-none">
        <Image src={category.bg} alt="" fill className="object-cover" />
      </div>
      <p
        className={`relative font-semibold text-2xl leading-7 tracking-[-0.5px] ${
          category.dark ? "text-white" : "text-black"
        }`}
      >
        {category.name}
      </p>
      <p
        className={`relative font-mono text-sm leading-[1.25] ${
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
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div className="max-w-[976px] mx-auto px-20 text-center mb-10">
        <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-heading mb-6">
          Get any tool you want
        </h2>
        <p className="font-mono text-base leading-[1.3] text-subtle">
          Transform your creative workflow with AI tools for
          <br />
          upscaling, editing, and generating images and videos.
        </p>
      </div>

      {/* Cards area — wider than page, centered */}
      <div className="max-w-[1675px] mx-auto flex flex-col gap-[18px]">
        {/* Provider Row 1 */}
        <div className="flex gap-4 justify-center">
          {providerRow1.map((card) => (
            <ProviderCard key={card.name} card={card} />
          ))}
        </div>

        {/* Provider Row 2 */}
        <div className="flex gap-4 justify-center">
          {providerRow2.map((card) => (
            <ProviderCard key={card.name} card={card} />
          ))}
        </div>

        {/* Category Row 1 */}
        <div className="flex gap-4 justify-center">
          {categoryRow1.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>

        {/* Category Row 2 */}
        <div className="flex gap-4 justify-center">
          {categoryRow2.map((cat) => (
            <CategoryCard key={cat.name + "2"} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

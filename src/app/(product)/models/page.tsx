"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FeaturedModels } from "@/components/featured-models";
import { ToolsSection } from "@/components/tools-section";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const collections = [
  {
    title: "Kling O3",
    tags: ["text-to-image", "image-to-video"],
    description:
      "Convert text or images into lip-synced HD videos in one step - faster and more budget-friendly, perfect for quick, sound-on content.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    title: "Google / Nano Banana Pro",
    tags: ["text-to-image", "image-to-image"],
    description:
      "Google's pro AI image-generation and editing model built on the Gemini 3 stack. Higher quality, more control, and better text handling.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    title: "Google / Veo 3.1",
    tags: ["image-to-video"],
    description:
      "Native 1080p resolution video synthesis, delivering enhanced quality and flexibility for creators.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    title: "OpenAI / Sora 2",
    tags: ["text-to-video"],
    description:
      "State of the art video and audio generation. More accurate physics, sharper realism, synchronized audio, enhanced steerability.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    title: "Wan 2.5",
    tags: ["text-to-image", "text-to-video", "image-to-video"],
    description:
      "Next-level AI video model: multilingual, cinematic, fully audio-synced. Built by Alibaba's Wan team.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide5,
  },
  {
    title: "Seedream v4",
    tags: ["text-to-image"],
    description:
      "Unifies generation and editing, tackling knowledge-driven, reasoning-heavy tasks - now faster, up to 4K.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    title: "FLUX 2 Pro",
    tags: ["text-to-image"],
    description:
      "State-of-the-art image generation with unmatched prompt adherence. Sub-2s inference on WaveSpeed infrastructure.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    title: "Seedance v1.5 Pro",
    tags: ["text-to-video", "image-to-video"],
    description:
      "Advanced AI video model that excels in coherent multi-shot video generation with smooth, stable motion.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
];

function ExploreCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragged = useRef(false);

  return (
    <div
      ref={ref}
      className="flex cursor-grab gap-4 overflow-x-auto rounded-md select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      {collections.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="group relative flex h-64 w-72 shrink-0 flex-col justify-end overflow-hidden rounded-md md:h-80 md:w-80"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 320px, 288px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative flex flex-col gap-2 p-5">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xs bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg leading-tight font-bold text-white">
              {item.title}
            </h3>
            <p className="line-clamp-2 font-mono text-xs leading-relaxed text-white/50">
              {item.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

function SearchBar() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/models/search");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
      className="bg-surface flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
    >
      <svg
        className="text-foreground/30 size-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <input
        type="text"
        readOnly
        onFocus={handleNavigate}
        placeholder="Search models, tools, providers..."
        className="text-foreground placeholder:text-foreground/30 w-full cursor-pointer bg-transparent font-mono text-sm outline-none"
      />
    </div>
  );
}

export default function ModelsPage() {
  return (
    <main>
      <section className="px-6 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-heading font-display text-3xl font-bold tracking-tight md:text-5xl">
            Explore Models
          </h1>
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>
      <section className="px-6 pt-8 pb-4 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ExploreCarousel />
        </div>
      </section>
      <FeaturedModels />
      <ToolsSection />
    </main>
  );
}

"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";

type ModelItem = {
  name: string;
  tags: string[];
  description: string;
  href: string;
  image: StaticImageData;
};

const selection = {
  name: "wavespeed-ai/cinematic-video-generator",
  tags: ["text-to-video", "image-to-video"],
  description:
    "WaveSpeed Cinematic Video Generator creates Hollywood-quality Seedance 2.0 grade videos from text prompts and optional reference images with native audio and director-level camera control.",
  image: slide1,
  tryHref: "/models/google/nano-banana-pro/edit?entry=explore",
  docsHref: "/docs",
};

const models: ModelItem[] = [
  {
    name: "cinematic-video-generator",
    tags: ["text-to-video", "image-to-video"],
    description:
      "Hollywood-style cinematic video from prompts with strong motion and lighting control on WaveSpeed.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "wan-2.6/image-to-video-spicy",
    tags: ["image-to-video"],
    description:
      "Fast image-to-video with expressive motion; ideal for social and campaign loops.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "ltx-2.3/image-to-video",
    tags: ["image-to-video", "text-to-video"],
    description:
      "High-quality video synthesis with solid temporal consistency and detail retention.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "ltx-2-19b/control",
    tags: ["image-to-video", "control"],
    description:
      "Structured control for camera and subject motion in longer-form video generation.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "seedance-v1.5-pro/text-to-video",
    tags: ["text-to-video"],
    description:
      "ByteDance Seedance pro tier: sharp motion, strong prompt adherence, and fast turnaround.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "kling-v2.6-std/motion-control",
    tags: ["image-to-video", "control"],
    description:
      "Kling motion-control workflows for consistent character performance across shots.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "sora-2/text-to-video",
    tags: ["text-to-video", "audio"],
    description:
      "OpenAI Sora-class synthesis with synchronized audio and improved physics realism.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "veo3.1/image-to-video",
    tags: ["image-to-video"],
    description:
      "Google Veo family: reference-driven video with stable subjects and clean camera moves.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "hunyuan-video/text-to-video",
    tags: ["text-to-video"],
    description:
      "Tencent Hunyuan video: multilingual prompts and solid results for narrative clips.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "gen4-turbo/image-to-video",
    tags: ["image-to-video"],
    description:
      "Runway Gen-4 Turbo path for quick iterations and stylized commercial-style footage.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "pixverse-v5.6/text-to-video",
    tags: ["text-to-video", "image-to-video"],
    description:
      "PixVerse v5.6 with flexible aspect ratios and dependable stylized motion.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "minimax/hailuo-02/text-to-video",
    tags: ["text-to-video"],
    description:
      "MiniMax Hailuo stack tuned for short ads, trailers, and social-first vertical video.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
];

function ModelCard({ item }: { item: ModelItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex h-64 w-full shrink-0 flex-col justify-end overflow-hidden rounded-xs md:h-80"
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 320px, (min-width: 768px) 33vw, 100vw"
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
        <h3 className="text-sm leading-tight font-bold text-white">
          {item.name}
        </h3>
        <p className="line-clamp-2 font-mono text-xs leading-relaxed text-white/50">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export default function BestVideoModelsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[480px] w-full overflow-hidden sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <Image
          src={slide4}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-8 sm:pb-10 md:px-12 md:pb-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 font-mono text-xs text-white/50"
            >
              <Link
                href="/models"
                className="transition-colors hover:text-white/80"
              >
                Explore
              </Link>
              <span className="text-white/25">/</span>
              <span>Best Video Models</span>
            </nav>
            <h1 className="font-display text-4xl leading-none font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Best Video Models
            </h1>
            <p className="max-w-xl font-mono text-sm leading-normal text-pretty text-white/50">
              Brainstorm, generate, edit, and iterate faster across images and
              videos with WaveSpeedAI. Curated video models for cinematic
              quality, motion control, and production-ready speed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Selection ──────────────────────────────────────── */}
      <section className="px-6 pt-10 md:px-12 md:pt-14 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex h-7 items-center">
            <h2 className="text-heading font-display text-lg font-bold tracking-tight">
              Our Selection
            </h2>
          </div>
          <Link
            href={selection.tryHref}
            className="group relative flex min-h-48 overflow-hidden rounded-xs lg:aspect-3/1 lg:min-h-0"
          >
            <Image
              src={selection.image}
              alt={selection.name}
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative flex w-full flex-col justify-end">
              <div className="flex max-w-prose flex-col gap-2 p-5 md:p-8">
                <div className="flex flex-wrap gap-1.5">
                  {selection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xs bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl leading-tight font-bold text-white md:text-2xl">
                  {selection.name}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-white/50">
                  {selection.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="rounded-xs bg-white px-5 py-2.5 text-xs font-bold text-black transition-colors duration-150 group-hover:bg-white/90">
                    Try it now
                  </span>
                  <Link
                    href={selection.docsHref}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-xs border border-white/20 px-5 py-2.5 text-xs font-bold text-white transition-colors duration-150 hover:bg-white/10"
                  >
                    See docs
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── All Models ─────────────────────────────────────────── */}
      <section className="px-6 py-10 md:px-12 md:py-14 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex h-7 items-center justify-between">
            <h2 className="text-heading font-display text-lg font-bold tracking-tight">
              All Models
            </h2>
            <span className="text-foreground/40 font-mono text-xs">
              {models.length} models
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models.map((item) => (
              <ModelCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

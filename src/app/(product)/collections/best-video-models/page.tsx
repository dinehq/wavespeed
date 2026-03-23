"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import coverImage from "@/images/Best Video Models.png";
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

function SearchBar() {
  return (
    <label className="bg-surface text-foreground/70 flex w-full cursor-text items-center gap-3 rounded-xs px-4 py-3 transition-colors md:max-w-64">
      <Search className="text-foreground/30 size-4 shrink-0" />
      <input
        type="text"
        placeholder="Search model"
        className="text-foreground placeholder:text-foreground/30 w-full bg-transparent font-mono text-sm outline-none"
      />
    </label>
  );
}

function ModelCard({ item }: { item: ModelItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex h-64 w-full shrink-0 flex-col justify-end overflow-hidden rounded-md md:h-80"
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
        <h3 className="text-lg leading-tight font-bold text-white">
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
      <div className="border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 flex justify-center border-b px-4 backdrop-blur md:px-12 lg:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex h-12 w-full max-w-7xl items-center gap-1.5 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/models"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Explore
          </Link>
          <span className="text-foreground/25">/</span>
          <span className="text-foreground/60">Best Video Models</span>
        </nav>
      </div>

      <main className="px-6 py-8 md:px-12 md:py-10 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          <h1 className="text-heading mt-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
            Best Video Models
          </h1>
          <p className="text-subtle mt-2 max-w-4xl text-base">
            Brainstorm, generate, edit, and iterate faster across images and
            videos with WaveSpeedAI.
          </p>

          <section className="mt-4">
            <article className="border-foreground/10 overflow-hidden rounded-md border">
              <div className="relative min-h-48 lg:aspect-3/1 lg:min-h-0">
                <Image
                  src={coverImage}
                  alt={selection.name}
                  fill
                  sizes="(min-width: 1024px) 1280px, 100vw"
                  className="object-cover"
                />
                <Image
                  src={selection.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 1280px, 100vw"
                  className="pointer-events-none object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end">
                  <div className="relative flex w-full max-w-prose flex-col gap-2 p-5">
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
                    <h3 className="text-lg leading-tight font-bold text-white">
                      {selection.name}
                    </h3>
                    <p className="font-mono text-xs leading-relaxed text-white/50">
                      {selection.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <Button
                        asChild
                        className="bg-background text-foreground hover:bg-background/90 h-8 rounded-xs px-3 text-xs font-bold"
                      >
                        <Link href={selection.tryHref}>Try it now!</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-8 rounded-xs border-white/40 bg-transparent px-3 text-xs font-bold text-white hover:bg-white/10"
                      >
                        <Link href={selection.docsHref}>See docs</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section className="mt-9">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-heading text-2xl font-bold tracking-tight">
                All models
              </h2>
              <SearchBar />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {models.map((item) => (
                <ModelCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

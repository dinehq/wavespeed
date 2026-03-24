"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

type ModelItem = {
  name: string;
  slug: string;
  tags: string[];
  description: string;
  href: string;
  image: StaticImageData;
};

const whyPoints = [
  {
    label: "State-of-the-art quality",
    text: "Physics-aware video, synchronized audio, and high-fidelity images with strong prompt adherence.",
  },
  {
    label: "End-to-end workflow",
    text: "Text-to-image, image-to-video, and text-to-video in one stack; smooth handoff between models.",
  },
  {
    label: "Pro-grade control",
    text: "Seeds, duration/aspect, camera language, and edit ops for consistent, repeatable results.",
  },
  {
    label: "Wide style range",
    text: "From photoreal and documentary to anime, illustration, and cinematic looks — without plastic over-sharpening.",
  },
];

const models: ModelItem[] = [
  {
    name: "openai/sora-2/characters",
    slug: "openai/sora-2/characters",
    tags: ["character-id"],
    description:
      "OpenAI Sora 2 Characters creates reusable character IDs from video references for consistent character appearance across Sora 2 generations.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "openai/sora-2/image-to-video",
    slug: "openai/sora-2/image-to-video",
    tags: ["image-to-video", "audio"],
    description:
      "OpenAI Sora 2 generates realistic image-to-video content with synchronized audio, improved physics, sharper realism and steerability.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "openai/gpt-image-1.5/edit",
    slug: "openai/gpt-image-1.5/edit",
    tags: ["image-editing"],
    description:
      "GPT Image 1.5 Edit is OpenAI's image model for precise, natural-language edits. Add/remove objects, swap backgrounds, retouch faces, adjust colors/lighting.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "openai/sora-2-pro/image-to-video",
    slug: "openai/sora-2-pro/image-to-video",
    tags: ["image-to-video", "1080p"],
    description:
      "OpenAI Sora 2 Pro Image-to-Video creates physics-aware, realistic videos from reference images with synchronized audio. Supports 720p and 1080p up to 20 seconds.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "openai/sora-2/image-to-video-pro",
    slug: "openai/sora-2/image-to-video-pro",
    tags: ["image-to-video", "audio"],
    description:
      "OpenAI Sora 2 Image-to-Video Pro creates physics-aware, realistic videos with synchronized audio and greater steerability.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide5,
  },
  {
    name: "openai/sora-2/text-to-video",
    slug: "openai/sora-2/text-to-video",
    tags: ["text-to-video", "audio"],
    description:
      "OpenAI Sora 2 is a state-of-the-art text-to-video model with realistic visuals, accurate physics, synchronized audio, and strong steerability.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "openai/sora-2/text-to-video-pro",
    slug: "openai/sora-2/text-to-video-pro",
    tags: ["text-to-video", "audio"],
    description:
      "OpenAI Sora 2 Text-to-Video Pro creates high-fidelity videos with synchronized audio, realistic physics, and enhanced steerability.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "openai/gpt-image-1",
    slug: "openai/gpt-image-1",
    tags: ["text-to-image", "image-editing"],
    description:
      "OpenAI's gpt-image-1 enables image generation and image editing via OpenAI's image API, ideal for creating and refining images.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "wavespeed-ai/openai-whisper-turbo",
    slug: "wavespeed-ai/openai-whisper-turbo",
    tags: ["speech-to-text"],
    description:
      "Accurate speech-to-text with OpenAI Whisper Large v3 Turbo: multilingual transcripts with auto language detection and punctuation.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "openai/dall-e-3",
    slug: "openai/dall-e-3",
    tags: ["text-to-image"],
    description:
      "OpenAI DALL·E 3 for high-fidelity text-to-image generation available as a managed API on WaveSpeed.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide5,
  },
  {
    name: "wavespeed-ai/openai-whisper",
    slug: "wavespeed-ai/openai-whisper",
    tags: ["speech-to-text"],
    description:
      "Whisper Large v3 speech-to-text: instant, accurate multilingual transcripts with automatic language detection and punctuation.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "openai/gpt-image-1-high-fidelity",
    slug: "openai/gpt-image-1-high-fidelity",
    tags: ["text-to-image", "high-fidelity"],
    description:
      "OpenAI GPT Image 1 High-Fidelity produces photorealistic, high-detail images for creative and production workflows.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "openai/gpt-image-1-mini/edit",
    slug: "openai/gpt-image-1-mini/edit",
    tags: ["image-editing"],
    description:
      "GPT Image 1 Mini is a cost-efficient, natively multimodal OpenAI model that pairs GPT-5 language understanding with compact image editing.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "openai/gpt-image-1-mini/text-to-image",
    slug: "openai/gpt-image-1-mini/text-to-image",
    tags: ["text-to-image"],
    description:
      "GPT Image 1 Mini is a cost-efficient multimodal OpenAI model powered by GPT-5 that turns text or image prompts into high-quality images.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "openai/gpt-image-1.5/text-to-image",
    slug: "openai/gpt-image-1.5/text-to-image",
    tags: ["text-to-image"],
    description:
      "GPT Image 1.5 text to image is OpenAI's fast, cost-efficient text-to-image generator powered by GPT-5 guidance.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide5,
  },
  {
    name: "openai/gpt-image-1/text-to-image",
    slug: "openai/gpt-image-1/text-to-image",
    tags: ["text-to-image"],
    description:
      "OpenAI GPT Image-1 generates images from text prompts from OpenAI's latest text-to-image model, ideal for creating visual assets.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide1,
  },
  {
    name: "openai/sora",
    slug: "openai/sora",
    tags: ["text-to-video", "image-to-video"],
    description:
      "Sora is OpenAI's multi-modal model that generates videos from text, images, or existing video inputs.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide2,
  },
  {
    name: "openai/sora-2-pro/text-to-video",
    slug: "openai/sora-2-pro/text-to-video",
    tags: ["text-to-video", "1080p"],
    description:
      "OpenAI Sora 2 Pro is a state-of-the-art text-to-video model with realistic physics, synchronized audio, and strong steerability. Up to 1080p and 20 seconds.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide3,
  },
  {
    name: "openai/dall-e-2",
    slug: "openai/dall-e-2",
    tags: ["text-to-image"],
    description:
      "Original DALL-E 2 from OpenAI for classic text-to-image generation via the OpenAI Image Generation API.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide4,
  },
  {
    name: "wavespeed-ai/openai-whisper-with-video",
    slug: "wavespeed-ai/openai-whisper-with-video",
    tags: ["video-to-text"],
    description:
      "OpenAI Whisper Large v3 (Video-to-Text) delivers high-accuracy multilingual transcription directly from video files.",
    href: "/models/google/nano-banana-pro/edit?entry=explore",
    image: slide5,
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

export default function OpenAICollectionPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[480px] w-full overflow-hidden sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <Image
          src={slide3}
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
              <span>OpenAI Models</span>
            </nav>
            <h1 className="font-display text-4xl leading-none font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              OpenAI Models
            </h1>
            <p className="max-w-xl font-mono text-sm leading-normal text-pretty text-white/50">
              Cutting-edge OpenAI models across text, image, and multimodal
              creation — curated in one place. Combining strong reasoning,
              cinematic rendering, and reliable performance for real-world
              workflows.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <section className="px-6 py-10 md:px-12 md:py-14 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
          {/* ── Left sidebar ─────────────────────────────────── */}
          <aside className="hidden w-full shrink-0 md:sticky md:top-20 md:block md:w-64 lg:w-72">
            <div className="mb-5 flex h-7 items-center">
              <h2 className="text-heading font-display text-lg leading-tight font-bold">
                Why OpenAI?
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {whyPoints.map((point, i) => (
                <div
                  key={point.label}
                  className="bg-surface border-foreground/5 rounded-xs border p-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="bg-foreground/8 text-foreground/50 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-heading text-sm font-semibold">
                      {point.label}
                    </span>
                  </div>
                  <p className="text-foreground/50 font-mono text-xs leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-foreground/10 mt-6 border-t pt-6">
              <Link
                href="/docs"
                className="tracking-xl inline-flex items-center gap-2 rounded-xs bg-black px-5 py-2.5 font-mono text-xs font-bold text-white uppercase transition-colors duration-150 hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                API Docs
              </Link>
            </div>
          </aside>

          {/* ── Right content ────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Mobile-only description */}
            <p className="text-foreground/60 mb-6 text-sm leading-relaxed md:hidden">
              Cutting-edge OpenAI models across text, image, and multimodal
              creation — curated in one place. Combining strong reasoning,
              cinematic rendering, and reliable performance for real-world
              workflows.
            </p>

            {/* Section headline */}
            <div className="mb-5 flex h-7 items-center justify-between">
              <h2 className="text-heading font-display text-lg font-bold tracking-tight">
                All Models
              </h2>
              <span className="text-foreground/40 font-mono text-xs">
                {models.length} models
              </span>
            </div>

            {/* Model grid */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {models.map((item) => (
                <ModelCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Why section ───────────────────────────────── */}
      <section className="border-foreground/10 border-t px-6 py-10 md:hidden">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-heading font-display mb-4 text-lg font-bold">
            Why OpenAI?
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {whyPoints.map((point, i) => (
              <div
                key={point.label}
                className="bg-surface border-foreground/5 rounded-xs border p-4"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="bg-foreground/8 text-foreground/50 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-heading text-sm font-semibold">
                    {point.label}
                  </span>
                </div>
                <p className="text-foreground/50 font-mono text-xs leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

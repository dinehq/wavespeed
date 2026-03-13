"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import slideModelBg from "@/images/slide-model.png";
import slideHeroBg from "@/images/slide-hero-bg.png";
import runwayBg from "@/images/tools-runway-bg.webp";
import bflBg from "@/images/tools-bfl-bg.webp";
import googleBg from "@/images/tools-google-bg.webp";
import ArrowRight from "@/images/arrow-right.svg";

const SLIDE_DURATION = 7000;

type Slide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bg: StaticImageData;
  video?: { src: string; poster: string };
  previewLabel: string;
};

const slides: Slide[] = [
  {
    id: "hero",
    badge: "Platform",
    title: "Ultimate AI Media\nGeneration Platform",
    description:
      "WaveSpeedAI accelerates AI Image and Video generation for you to build, create, and scale faster.",
    cta: { label: "Start Building", href: "#" },
    secondaryCta: { label: "Documentation", href: "#" },
    bg: slideHeroBg,
    video: {
      src: "/videos/hero-bg.mp4",
      poster: "/videos/hero-bg_poster.webp",
    },
    previewLabel: "WaveSpeed",
  },
  {
    id: "model",
    badge: "New Model",
    title: "Google Veo 3.1",
    description:
      "Next-generation video synthesis. Cinematic quality output at unprecedented speed, now available on WaveSpeed.",
    cta: { label: "Try Now", href: "#" },
    bg: slideModelBg,
    previewLabel: "Veo 3.1",
  },
  {
    id: "runway",
    badge: "Video",
    title: "Runway Gen4 Turbo",
    description:
      "Cinematic video generation with motion control. Create professional-grade footage from text or image prompts.",
    cta: { label: "Generate Video", href: "#" },
    bg: runwayBg,
    previewLabel: "Gen4 Turbo",
  },
  {
    id: "flux",
    badge: "Image",
    title: "FLUX 2 Pro",
    description:
      "State-of-the-art image generation with unmatched prompt adherence. Sub-2s inference on WaveSpeed infrastructure.",
    cta: { label: "Generate Image", href: "#" },
    bg: bflBg,
    previewLabel: "FLUX 2",
  },
  {
    id: "banana",
    badge: "Fastest",
    title: "Nano Banana Pro",
    description:
      "Ultra-fast image generation at 0.8s per image. Optimized for real-time applications and high-volume pipelines.",
    cta: { label: "Try Nano", href: "#" },
    bg: googleBg,
    previewLabel: "Nano Banana",
  },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, SLIDE_DURATION);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (index: number) => {
    setActive(index);
    resetTimer();
  };

  return (
    <section className="relative h-[480px] w-full overflow-hidden md:h-[600px]">
      {/* Slide backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: active === i ? 1 : 0 }}
          aria-hidden={active !== i}
        >
          {slide.video ? (
            <video
              src={slide.video.src}
              poster={slide.video.poster}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <Image
              src={slide.bg}
              alt=""
              fill
              priority={i === 0}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      ))}

      {/* Content — shared layout for all slides */}
      <div className="relative flex h-full flex-col justify-end px-6 pb-8 md:px-20 md:pb-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          {/* Text + CTA */}
          <div className="flex flex-col items-start gap-3">
            <span className="bg-brand rounded-xs px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase">
              {slides[active].badge}
            </span>
            <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white md:text-6xl">
              {slides[active].title.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-lg font-mono text-sm leading-normal text-pretty text-white/60">
              {slides[active].description}
            </p>
            <div className="mt-1 flex gap-2">
              <a
                href={slides[active].cta.href}
                className="flex items-center gap-2.5 rounded-xs bg-white px-6 py-3 text-black transition-colors duration-150 hover:bg-white/90"
              >
                <span className="tracking-xl font-mono text-xs leading-4 font-bold uppercase">
                  {slides[active].cta.label}
                </span>
                <ArrowRight className="size-3.5" />
              </a>
              {slides[active].secondaryCta && (
                <a
                  href={slides[active].secondaryCta.href}
                  className="flex items-center rounded-xs border border-white/20 px-6 py-3 text-white transition-colors duration-150 hover:bg-white/10"
                >
                  <span className="tracking-xl font-mono text-xs leading-4 font-bold uppercase">
                    {slides[active].secondaryCta.label}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Slide previews — inline, compact */}
          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                className={`relative flex cursor-pointer overflow-hidden rounded-xs transition-all duration-300 ${
                  active === i
                    ? "brightness-110"
                    : "opacity-40 hover:opacity-60"
                }`}
              >
                <div className="relative h-9 w-16 md:h-10 md:w-18">
                  <Image
                    src={slide.bg}
                    alt={slide.previewLabel}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative flex h-full items-end p-1">
                    <p className="font-mono text-[9px] leading-tight font-medium text-white">
                      {slide.previewLabel}
                    </p>
                  </div>
                </div>
                {active === i && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-white/10">
                    <div
                      key={active}
                      className="h-full animate-[progress-fill_linear] bg-white"
                      style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

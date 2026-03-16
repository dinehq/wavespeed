"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import modelImage from "@/images/tool-01.webp";
import runwayImage from "@/images/tool-02.webp";
import fluxImage from "@/images/tool-03.webp";
import bananaImage from "@/images/tool-04.webp";
import ArrowRightIcon from "@/images/arrow-right.svg";

const SLIDE_DURATION = 5000;

type Slide = {
  id: string;
  badge?: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  image: StaticImageData;
  video?: { src: string; poster: string };
};

const slides: Slide[] = [
  {
    id: "hero",
    title: "Ultimate AI Media\nGeneration Platform",
    description:
      "WaveSpeedAI accelerates AI Image and Video generation for you to build, create, and scale faster.",
    action: { label: "Explore Models", href: "#" },
    secondaryAction: { label: "Documentation", href: "#" },
    image: modelImage,
    video: {
      src: "/videos/hero-bg.mp4",
      poster: "/videos/hero-bg_poster.webp",
    },
  },
  {
    id: "model",
    badge: "New Model",
    title: "Google Veo 3.1",
    description:
      "Next-generation video synthesis. Cinematic quality output at unprecedented speed, now available on WaveSpeed.",
    action: { label: "Try Model", href: "#" },
    secondaryAction: { label: "Documentation", href: "#" },
    image: modelImage,
  },
  {
    id: "runway",
    badge: "Video",
    title: "Runway Gen4 Turbo",
    description:
      "Cinematic video generation with motion control. Create professional-grade footage from text or image prompts.",
    action: { label: "Try Model", href: "#" },
    secondaryAction: { label: "Documentation", href: "#" },
    image: runwayImage,
  },
  {
    id: "flux",
    badge: "Image",
    title: "FLUX 2 Pro",
    description:
      "State-of-the-art image generation with unmatched prompt adherence. Sub-2s inference on WaveSpeed infrastructure.",
    action: { label: "Try Model", href: "#" },
    secondaryAction: { label: "Documentation", href: "#" },
    image: fluxImage,
  },
  {
    id: "banana",
    badge: "20% Off",
    title: "Nano Banana Pro",
    description:
      "Ultra-fast image generation at 0.8s per image. Optimized for real-time applications and high-volume pipelines.",
    action: { label: "Try Model", href: "#" },
    secondaryAction: { label: "Documentation", href: "#" },
    image: bananaImage,
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
    <section className="relative -mt-16 h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[560px] lg:h-[640px]">
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
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      ))}

      {/* Content — shared layout for all slides */}
      <div className="relative flex h-full flex-col justify-end px-6 pb-6 sm:pb-8 md:px-12 md:pb-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Text + CTA */}
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            {slides[active].badge && (
              <span className="bg-brand rounded-xs px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase">
                {slides[active].badge}
              </span>
            )}
            <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {slides[active].title.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-sm font-mono text-sm leading-normal text-pretty text-white/60 md:max-w-lg">
              {slides[active].description}
            </p>
            <div className="mt-1 flex gap-2">
              <a
                href={slides[active].action.href}
                className="flex items-center gap-2.5 rounded-xs border border-transparent bg-white px-5 py-2.5 text-black transition-colors duration-150 hover:bg-white/90 sm:px-6 sm:py-3"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  {slides[active].action.label}
                </span>
                <ArrowRightIcon className="size-3.5" />
              </a>
              {slides[active].secondaryAction && (
                <a
                  href={slides[active].secondaryAction.href}
                  className="flex items-center rounded-xs border border-white/20 px-5 py-2.5 text-white transition-colors duration-150 hover:bg-white/10 sm:px-6 sm:py-3"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    {slides[active].secondaryAction.label}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Slide dots — mobile only */}
          <div className="flex gap-1.5 sm:hidden">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                className={`size-1.5 cursor-pointer rounded-full transition-all duration-300 ${active === i ? "scale-125 bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* Slide previews — sm and up */}
          <div className="hidden gap-1.5 sm:flex">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                className={`relative flex cursor-pointer overflow-hidden rounded-xs border border-white/10 transition-all duration-300 ${
                  active === i
                    ? "brightness-110"
                    : "opacity-40 hover:opacity-60"
                }`}
              >
                <div className="relative h-9 w-14 sm:w-16 md:h-10 md:w-18">
                  <Image
                    src={slide.video?.poster ?? slide.image}
                    alt={slide.title}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                {active === i && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-black/40">
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

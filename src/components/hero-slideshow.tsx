"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";
import ArrowRightIcon from "@/images/arrow-right.svg";

const SLIDE_DURATION = 5000;

export const imageMap: Record<string, StaticImageData> = {
  "slide-1": slide1,
  "slide-2": slide2,
  "slide-3": slide3,
  "slide-4": slide4,
  "slide-5": slide5,
};

export type SlideConfig = {
  id: string;
  enabled: boolean;
  badge?: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  imageKey: string;
  video?: { src: string; poster: string };
};

export type SlideshowConfig = {
  slides: SlideConfig[];
};

const STORAGE_KEY = "wavespeed-slideshow";

export const defaultConfig: SlideshowConfig = {
  slides: [
    {
      id: "hero",
      enabled: true,
      title: "Ultimate AI Media\nGeneration Platform",
      description:
        "WaveSpeedAI accelerates AI Image and Video generation for you to build, create, and scale faster.",
      action: { label: "Explore Models", href: "#" },
      secondaryAction: { label: "Documentation", href: "#" },
      imageKey: "slide-1",
      // Supports video in slide:
      // Generate poster with https://poster.dinehq.net/
      // video: {
      //   src: "/videos/hero-bg.mp4",
      //   poster: "/videos/hero-bg_poster.webp",
      // },
    },
    {
      id: "model",
      enabled: true,
      badge: "New Model",
      title: "Google Veo 3.1",
      description:
        "Next-generation video synthesis. Cinematic quality output at unprecedented speed, now available on WaveSpeed.",
      action: { label: "Try Model", href: "#" },
      secondaryAction: { label: "Documentation", href: "#" },
      imageKey: "slide-2",
    },
    {
      id: "runway",
      enabled: true,
      badge: "Video",
      title: "Runway Gen4 Turbo",
      description:
        "Cinematic video generation with motion control. Create professional-grade footage from text or image prompts.",
      action: { label: "Try Model", href: "#" },
      secondaryAction: { label: "Documentation", href: "#" },
      imageKey: "slide-3",
    },
    {
      id: "flux",
      enabled: true,
      badge: "Image",
      title: "FLUX 2 Pro",
      description:
        "State-of-the-art image generation with unmatched prompt adherence. Sub-2s inference on WaveSpeed infrastructure.",
      action: { label: "Try Model", href: "#" },
      secondaryAction: { label: "Documentation", href: "#" },
      imageKey: "slide-4",
    },
    {
      id: "banana",
      enabled: true,
      badge: "20% Off",
      title: "Nano Banana Pro",
      description:
        "Ultra-fast image generation at 0.8s per image. Optimized for real-time applications and high-volume pipelines.",
      action: { label: "Try Model", href: "#" },
      secondaryAction: { label: "Documentation", href: "#" },
      imageKey: "slide-5",
    },
  ],
};

export function getSlideshowConfig(): SlideshowConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as SlideshowConfig;
  } catch {}
  return defaultConfig;
}

export function setSlideshowConfig(config: SlideshowConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

function subscribe(cb: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) cb();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

const defaultConfigJson = JSON.stringify(defaultConfig);

export function useSlideshowConfig() {
  const getSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? defaultConfigJson;
    } catch {
      return defaultConfigJson;
    }
  }, []);

  const raw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => defaultConfigJson,
  );
  try {
    return JSON.parse(raw) as SlideshowConfig;
  } catch {
    return defaultConfig;
  }
}

function resolveImage(key: string): StaticImageData {
  return imageMap[key] ?? slide1;
}

export function HeroSlideshow() {
  const { slides: allSlides } = useSlideshowConfig();
  const slides = allSlides.filter((s) => s.enabled);

  const [rawActive, setActive] = useState(0);
  const active = slides.length > 0 ? rawActive % slides.length : 0;
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, SLIDE_DURATION);
  }, [advance]);

  useEffect(() => {
    if (slides.length === 0) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer, slides.length]);

  const goTo = (index: number) => {
    setActive(index);
    resetTimer();
  };

  if (slides.length === 0) return null;

  const current = slides[active];
  if (!current) return null;

  return (
    <section className="relative -mt-16 h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[560px] lg:h-[640px]">
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
              src={resolveImage(slide.imageKey)}
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

      <div className="relative flex h-full flex-col justify-end px-6 pb-6 sm:pb-8 md:px-12 md:pb-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            {current.badge && (
              <span className="bg-brand rounded-xs px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase">
                {current.badge}
              </span>
            )}
            <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {current.title.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-sm font-mono text-sm leading-normal text-pretty text-white/60 md:max-w-lg">
              {current.description}
            </p>
            <div className="mt-1 flex gap-2">
              <a
                href={current.action.href}
                className="flex items-center gap-2.5 rounded-xs border border-transparent bg-white px-5 py-2.5 text-black transition-colors duration-150 hover:bg-white/90 sm:px-6 sm:py-3"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  {current.action.label}
                </span>
                <ArrowRightIcon className="size-3.5" />
              </a>
              {current.secondaryAction && (
                <a
                  href={current.secondaryAction.href}
                  className="flex items-center rounded-xs border border-white/20 px-5 py-2.5 text-white transition-colors duration-150 hover:bg-white/10 sm:px-6 sm:py-3"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    {current.secondaryAction.label}
                  </span>
                </a>
              )}
            </div>
          </div>

          <div className="flex gap-1.5 sm:hidden">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                className={`size-1.5 cursor-pointer rounded-full transition-all duration-300 ${active === i ? "scale-125 bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>

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
                    src={
                      slide.video?.poster
                        ? slide.video.poster
                        : resolveImage(slide.imageKey)
                    }
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

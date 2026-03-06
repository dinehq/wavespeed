"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

import freepikLogo from "@/images/freepik.png";
import novitaLogo from "@/images/novita.png";
import socialbookLogo from "@/images/socialbook.png";
import minimaxLogo from "@/images/minimax.png";
import drawthingsLogo from "@/images/drawthings.png";
import imperialvisionLogo from "@/images/imperialvision.png";
import quoteBg from "@/images/quote-bg.webp";

const testimonials = [
  {
    logo: freepikLogo,
    logoWidth: 109,
    logoHeight: 16,
    quote:
      "Everyone wants faster, cheaper, and their way to use AI image and video generation services? Partnering with WaveSpeedAI has helped us stay competitive in AI media generation.",
    name: "Alejandro Palma",
    title: "Cloud Architect at Freepik",
  },
  {
    logo: novitaLogo,
    logoWidth: 105,
    logoHeight: 19,
    quote:
      "WaveSpeedAI has significantly improved our inference efficiency and helped us cut video generation costs by up to 67%. With faster and more reliable video processing, we\u2019re able to deliver an exceptional user experience at scale.",
    name: "Junyu Huang",
    title: "Novita AI COO",
  },
  {
    logo: socialbookLogo,
    logoWidth: 121,
    logoHeight: 22,
    quote:
      "Wavespeed lives up to its name \u2014 the model is fast, and their team\u2019s response time is even faster. We recently switched from FAL to Wavespeed, and the difference is night and day.",
    name: "Chen",
    title: "CTO@SocialBook",
  },
  {
    logo: minimaxLogo,
    logoWidth: 122,
    logoHeight: 28,
    quote:
      "WaveSpeedAI demonstrates extremely powerful capabilities in reasoning and acceleration optimization. MiniMax\u2019s Hailuo\u201102 video model and Speech\u201102 voice model represent the cutting edge of multimodal AI. We deeply value our collaboration, as it enables more users to experience MiniMax\u2019s speech and video large models.",
    name: "Yan Li",
    title: "Manager of MiniMax platform",
  },
  {
    logo: drawthingsLogo,
    logoWidth: 138,
    logoHeight: 32,
    quote:
      "Many of our users praise the WaveSpeedAI integration \u2018The FLUX result is the same, but now it is under 3 seconds\u2019 \u2018these are nice guys at wavespeed, beyond helpful\u2019. WaveSpeedAI integration allows us to do one-stop integration to catch up the latest close-source models, it is very important in this competitive environment.",
    name: "Liu Liu",
    title: "Draw Things",
  },
  {
    logo: imperialvisionLogo,
    logoWidth: 93,
    logoHeight: 36,
    quote:
      "WaveSpeed helped us strike the perfect balance between content generation speed and quality.",
    name: "QinQuan Gao",
    title: "CEO/Co-Founder of Imperial Vision",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    el.style.cursor = "grab";
  }, []);

  return (
    <section className="bg-surface pt-16 [--section-pad:24px] md:pt-[80px] md:pb-[32px] md:[--section-pad:80px]">
      <div className="mb-8 px-6 md:mb-12 md:px-20">
        <h2 className="text-heading font-display mx-auto max-w-[1280px] text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
          What people are saying
        </h2>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex cursor-grab gap-6 overflow-x-auto pt-2 pb-16 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: "max(var(--section-pad), calc((100vw - 1280px) / 2))",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group bg-background dark:bg-panel relative flex w-[300px] shrink-0 flex-col justify-between gap-4 overflow-hidden rounded-xs p-6 transition-shadow duration-300 hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)] md:w-[480px] md:p-10 dark:hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.3)]"
          >
            <Image
              src={quoteBg}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:hidden"
            />
            <div className="relative flex flex-col gap-4">
              {t.logo && (
                <div className="flex h-9 items-center">
                  <div
                    className="relative"
                    style={{ width: t.logoWidth, height: t.logoHeight ?? 24 }}
                  >
                    <Image
                      src={t.logo}
                      alt=""
                      fill
                      className="object-contain object-left dark:grayscale dark:invert"
                    />
                  </div>
                </div>
              )}
              <p className="text-ink relative text-lg leading-normal text-pretty">
                {t.quote}
              </p>
            </div>
            <div className="text-foreground/60 relative font-mono text-sm leading-normal">
              <p>{t.name}</p>
              <p>{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

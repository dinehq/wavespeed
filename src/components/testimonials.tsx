"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

const testimonials = [
  {
    logo: "/images/freepik-logo.svg",
    logoWidth: 87,
    quote:
      "Everyone wants faster, cheaper, and their way to use AI image and video generation services? Partnering with WaveSpeedAI has helped us stay competitive in AI media generation.",
    name: "Alejandro Palma",
    title: "Cloud Architect at Freepik",
  },
  {
    logo: "/images/novita-vector.svg",
    logoWidth: 88,
    quote:
      "WaveSpeedAI has significantly improved our inference efficiency and helped us cut video generation costs by up to 67%. With faster and more reliable video processing, we\u2019re able to deliver an exceptional user experience at scale.",
    name: "Junyu Huang",
    title: "Novita AI COO",
  },
  {
    logo: "/images/socialbook-logo.svg",
    logoWidth: 131,
    quote:
      "Wavespeed lives up to its name \u2014 the model is fast, and their team\u2019s response time is even faster. We recently switched from FAL to Wavespeed, and the difference is night and day.",
    name: "Chen",
    title: "CTO@SocialBook",
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
    <section className="bg-surface py-20">
      <div className="mb-12 px-6 md:px-20">
        <h2 className="text-heading mx-auto max-w-[1280px] text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
          What people are saying
        </h2>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex cursor-grab gap-6 overflow-x-auto pb-8 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: "max(24px, calc((100vw - 1280px) / 2))",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group relative flex w-[300px] shrink-0 flex-col gap-4 overflow-hidden rounded-xs bg-white p-6 transition-shadow duration-300 hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)] md:w-[511px] md:p-10"
          >
            <Image
              src="/images/quote-bg.webp"
              alt=""
              fill
              className="pointer-events-none object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative h-6" style={{ width: t.logoWidth }}>
              <Image src={t.logo} alt="" fill className="object-contain" />
            </div>
            <p className="relative text-lg leading-normal text-pretty text-[#191e2e]">
              {t.quote}
            </p>
            <div className="text-muted relative font-mono text-sm leading-normal">
              <p>{t.name}</p>
              <p>{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

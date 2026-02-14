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
      <div className="px-20 mb-6">
        <h2 className="max-w-[1280px] mx-auto text-[48px] font-medium leading-none tracking-[-1px] text-heading">
          What people are saying
        </h2>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-6 overflow-x-auto cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8"
        style={{
          paddingInline: "max(80px, calc((100vw - 1280px) / 2))",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group bg-white w-[511px] rounded-xs shrink-0 p-10 flex flex-col gap-4 relative overflow-hidden transition-shadow duration-300 hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)]"
          >
            <Image
              src="/images/quote-bg.jpg"
              alt=""
              fill
              className="object-cover pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative h-6" style={{ width: t.logoWidth }}>
              <Image src={t.logo} alt="" fill className="object-contain" />
            </div>
            <p className="relative text-lg leading-[1.5] text-[#191e2e]">
              {t.quote}
            </p>
            <div className="relative font-mono text-sm leading-[1.5] text-muted">
              <p>{t.name}</p>
              <p>{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

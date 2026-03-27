"use client";

import { useRef, useEffect, useState } from "react";
import NextImage from "next/image";
import { Copy, Check } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import LogoSvg from "@/images/logo.svg";
import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";
import editorPreview from "@/images/editor-image-preview.webp";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const GRADIENT_PRESETS = [
  { name: "Blue", from: "#f0f7ff", to: "#207fdb" },
  { name: "Green", from: "#f0fff8", to: "#26f9a8" },
  { name: "Purple", from: "#fdf0ff", to: "#ea5aff" },
  { name: "Orange", from: "#fff7f0", to: "#ffa442" },
  { name: "Rose", from: "#fff0f3", to: "#e11d48" },
  { name: "Teal", from: "#f0fdfa", to: "#0d9488" },
  { name: "Indigo", from: "#eef2ff", to: "#4f46e5" },
  { name: "White", from: "#ffffff", to: "#ffffff" },
  { name: "Light", from: "#f5f5f7", to: "#f5f5f7" },
  { name: "Black", from: "#000000", to: "#000000" },
];

const navSections = [
  {
    group: "Identity",
    items: [
      { id: "logo", label: "Logo" },
      { id: "colors", label: "Colors" },
      { id: "gradients", label: "Gradients" },
    ],
  },
  {
    group: "Voice",
    items: [
      { id: "typography", label: "Typography" },
      { id: "prompts", label: "Prompt Templates" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Prompt Card                                                        */
/* ------------------------------------------------------------------ */

function PromptCard({
  category,
  image,
  prompt,
}: {
  category: string;
  image: { src: string; width: number; height: number };
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-foreground/10 overflow-hidden rounded-lg border">
      <div className="relative aspect-21/9 w-full overflow-hidden bg-black">
        <NextImage src={image} alt={category} fill className="object-cover" />
      </div>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-medium">{category}</p>
          <p className="text-foreground/50 mt-1 text-xs leading-relaxed">
            {prompt}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="text-foreground/30 hover:text-foreground/60 mt-0.5 shrink-0 transition-colors"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GuidelinesPage() {
  const [activeId, setActiveId] = useState("");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const el of sectionRefs.current.values()) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <AdminNav />
          <h1 className="text-foreground font-display text-2xl font-bold tracking-tighter">
            Brand Guidelines
          </h1>
          <p className="text-foreground/50 mt-1 text-sm">
            Visual identity for WaveSpeed marketing and communications.
          </p>
        </div>

        <div className="flex gap-12">
          {/* ── Sidebar ── */}
          <nav className="sticky top-20 hidden h-fit w-44 shrink-0 lg:block">
            <div className="flex flex-col gap-5">
              {navSections.map((section) => (
                <div key={section.group}>
                  <p className="text-foreground/40 tracking-xl mb-2 font-mono text-xs uppercase">
                    {section.group}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById(item.id)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`block rounded-xs px-2 py-1 text-sm transition-colors ${
                            activeId === item.id
                              ? "bg-foreground/5 text-foreground font-medium"
                              : "text-foreground/50 hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* ── Content ── */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-20">
              {/* ─── Logo ─── */}
              <section id="logo" ref={setRef("logo")}>
                <h2 className="text-foreground mb-8 text-lg font-semibold">
                  Logo
                </h2>

                {/* Lockup on light */}
                <div className="bg-surface border-foreground/10 flex items-center justify-center rounded-lg border px-10 py-16">
                  <LogoSvg
                    className="h-8 w-auto"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </div>

                {/* Lockup on dark */}
                <div className="bg-dark mt-3 flex items-center justify-center rounded-lg px-10 py-16">
                  <LogoSvg
                    className="h-8 w-auto text-white"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </div>
              </section>

              {/* ─── Colors ─── */}
              <section id="colors" ref={setRef("colors")}>
                <h2 className="text-foreground mb-8 text-lg font-semibold">
                  Colors
                </h2>

                {/* Primary */}
                <p className="text-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase">
                  Primary
                </p>
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    {
                      name: "WaveSpeed Blue",
                      hex: "#3f74ff",
                      bg: "bg-brand",
                      desc: "Primary brand color. CTAs, links, active states.",
                    },
                    {
                      name: "Ink",
                      hex: "#191e2e",
                      bg: "bg-ink",
                      desc: "Headlines and large display text.",
                    },
                    {
                      name: "White",
                      hex: "#ffffff",
                      bg: "bg-white",
                      desc: "Page backgrounds, inverted text on dark.",
                    },
                  ].map((c) => (
                    <div key={c.name}>
                      <div
                        className={`${c.bg} border-foreground/10 h-24 rounded-lg border`}
                      />
                      <p className="text-foreground mt-2 text-sm font-medium">
                        {c.name}
                      </p>
                      <p className="text-foreground/40 text-xs">{c.hex}</p>
                      <p className="text-foreground/40 mt-0.5 text-xs">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Neutrals */}
                <p className="text-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase">
                  Text &amp; Neutrals
                </p>
                <div className="flex gap-1.5 overflow-hidden rounded-lg">
                  {[
                    { hex: "#0e1017", bg: "bg-dark" },
                    { hex: "#2a2a2a", bg: "bg-heading" },
                    { hex: "#737373", bg: "bg-subtle" },
                    { hex: "#a1a1aa", bg: "bg-footer-text" },
                    { hex: "#d9d9d9", bg: "bg-track" },
                    { hex: "#ecedee", bg: "bg-panel-alt" },
                    { hex: "#f2f3f5", bg: "bg-panel" },
                    { hex: "#f5f5f7", bg: "bg-surface" },
                  ].map((c) => (
                    <div key={c.hex} className="flex flex-1 flex-col gap-1">
                      <div
                        className={`${c.bg} border-foreground/5 h-10 border`}
                      />
                      <p className="text-foreground/30 text-center text-xs">
                        {c.hex}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─── Gradients ─── */}
              <section id="gradients" ref={setRef("gradients")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Gradients
                </h2>
                <p className="text-foreground/50 mb-6 text-sm">
                  Used in social media assets, banners, and promotional
                  materials. Each gradient runs 135&deg; from a light tint to a
                  saturated anchor.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {GRADIENT_PRESETS.map((g) => (
                    <div key={g.name}>
                      <div
                        className={`h-20 rounded-lg${g.from === "#ffffff" || g.to === "#ffffff" ? "border-foreground/10 border" : ""}`}
                        style={{
                          background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        }}
                      />
                      <p className="text-foreground mt-2 text-sm font-medium">
                        {g.name}
                      </p>
                      <p className="text-foreground/30 text-xs">
                        {g.from} &rarr; {g.to}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─── Typography ─── */}
              <section id="typography" ref={setRef("typography")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Typography
                </h2>
                <p className="text-foreground/50 mb-8 text-sm">
                  Three typefaces form the brand voice. Azeret brings character
                  to headlines, Geist Sans carries the body, and Geist Mono
                  provides technical contrast.
                </p>

                {/* Azeret */}
                <div className="border-foreground/10 mb-4 rounded-lg border p-6">
                  <p className="text-foreground/40 mb-3 text-xs font-medium tracking-wider uppercase">
                    Display &mdash; Azeret
                  </p>
                  <p className="font-display text-4xl leading-none font-bold tracking-tighter">
                    The fastest way to generate AI media
                  </p>
                  <p className="text-foreground/40 mt-4 text-xs">
                    Hero headlines, page titles, marketing callouts. Always
                    paired with tight or tighter letter spacing.
                  </p>
                </div>

                {/* Geist Sans */}
                <div className="border-foreground/10 mb-4 rounded-lg border p-6">
                  <p className="text-foreground/40 mb-3 text-xs font-medium tracking-wider uppercase">
                    Body &mdash; Geist Sans
                  </p>
                  <p className="text-lg leading-relaxed">
                    WaveSpeed provides optimized inference infrastructure for
                    state-of-the-art AI models. Generate images, video, and
                    speech at scale with simple API calls.
                  </p>
                  <p className="text-foreground/40 mt-4 text-xs">
                    Body copy, descriptions, UI text, buttons, navigation.
                    Default typeface for everything not a headline or code.
                  </p>
                </div>

                {/* Geist Mono */}
                <div className="border-foreground/10 rounded-lg border p-6">
                  <p className="text-foreground/40 mb-3 text-xs font-medium tracking-wider uppercase">
                    Mono &mdash; Geist Mono
                  </p>
                  <p className="font-mono text-lg leading-relaxed">
                    wavespeed.run(&quot;wavespeed-ai/flux-dev&quot;,
                    &#123;&nbsp;prompt:&nbsp;&quot;A&nbsp;cinematic&nbsp;portrait&quot;&nbsp;&#125;)
                  </p>
                  <p className="text-foreground/40 mt-4 text-xs">
                    Code snippets, API keys, technical labels, breadcrumbs, and
                    anywhere a mechanical voice adds contrast.
                  </p>
                </div>

                {/* Hierarchy */}
                <div className="mt-8">
                  <p className="text-foreground/50 mb-4 text-xs font-medium tracking-wider uppercase">
                    Type hierarchy
                  </p>
                  <div className="border-foreground/10 divide-foreground/10 divide-y rounded-lg border">
                    {[
                      {
                        role: "Hero",
                        classes:
                          "font-display text-5xl font-bold leading-none tracking-tighter",
                        sample: "Next-gen AI",
                      },
                      {
                        role: "Page title",
                        classes:
                          "font-display text-2xl font-bold tracking-tighter",
                        sample: "Featured Models",
                      },
                      {
                        role: "Section",
                        classes:
                          "font-display text-xl font-medium tracking-tight",
                        sample: "Built for speed",
                      },
                      {
                        role: "Body",
                        classes: "text-base",
                        sample:
                          "Generate images, video, and speech with state-of-the-art AI models.",
                      },
                      {
                        role: "Small body",
                        classes: "text-subtle text-sm",
                        sample:
                          "WaveSpeed runs on optimized infrastructure so you get results faster.",
                      },
                      {
                        role: "Caption",
                        classes: "text-foreground/50 text-xs",
                        sample: "Pricing may vary by region.",
                      },
                      {
                        role: "CTA",
                        classes: "text-sm font-semibold",
                        sample: "Get Started Free",
                      },
                    ].map((row) => (
                      <div
                        key={row.role}
                        className="flex items-baseline gap-6 px-5 py-4"
                      >
                        <span className="text-foreground/30 w-20 shrink-0 text-xs">
                          {row.role}
                        </span>
                        <p className={row.classes}>{row.sample}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ─── Prompt Templates ─── */}
              <section id="prompts" ref={setRef("prompts")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Prompt Templates
                </h2>
                <p className="text-foreground/50 mb-6 text-sm">
                  Reference prompts for AI-generated imagery across marketing
                  use cases.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      category: "Product Hero",
                      image: slide1,
                      prompt:
                        "A glowing holographic interface floating in a dark studio, soft volumetric lighting, ultra-high detail",
                    },
                    {
                      category: "Social Banner",
                      image: slide2,
                      prompt:
                        "Wide panoramic cityscape at golden hour, ultra-wide angle, warm gradient sky fading to deep blue",
                    },
                    {
                      category: "Blog / Editorial",
                      image: slide3,
                      prompt:
                        "Close-up of hands typing on a floating translucent keyboard, shallow depth of field, warm ambient light",
                    },
                    {
                      category: "Avatar / Icon",
                      image: slide4,
                      prompt:
                        "Abstract gradient orb with internal light, glass morphism effect, centered on dark background, square crop",
                    },
                    {
                      category: "Landing Page",
                      image: slide5,
                      prompt:
                        "Futuristic skyline with mirrored glass towers reflecting sunset, cinematic color grading, ultra-wide angle",
                    },
                    {
                      category: "Feature Preview",
                      image: editorPreview,
                      prompt:
                        "Minimal flat-lay of a sleek device on matte black surface, dramatic top-down lighting, clean composition",
                    },
                  ].map((item) => (
                    <PromptCard
                      key={item.category}
                      category={item.category}
                      image={item.image}
                      prompt={item.prompt}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import NextImage from "next/image";
import { Copy, Check, Download } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import LogoSvg from "@/images/logo.svg";
import logoSpace from "@/images/logo space.webp";
import symbolSpace from "@/images/symbol space.webp";
import logoSize from "@/images/logo size.webp";
import symbolSize from "@/images/symbol size.webp";
import incorrectUsage01 from "@/images/incorrect-usage01.webp";
import incorrectUsage02 from "@/images/incorrect-usage02.webp";
import incorrectUsage03 from "@/images/incorrect-usage03.webp";
import incorrectUsage04 from "@/images/incorrect-usage04.webp";
import incorrectUsage05 from "@/images/incorrect-usage05.webp";
import incorrectUsage06 from "@/images/incorrect-usage06.webp";
import logoCoSpace from "@/images/logo-co-space.webp";
import symbolCoSpace from "@/images/symbol-co-space.webp";
import logoCoEg from "@/images/logo-co-e.g.webp";
import symbolCoEg from "@/images/symbol-co-e.g.webp";

/* ------------------------------------------------------------------ */
/*  Symbol-only SVG (wave mark extracted from logo)                    */
/* ------------------------------------------------------------------ */

function SymbolSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 36 20"
      className={className}
    >
      <path
        fill="currentColor"
        d="M11.637 12.316l3.943-6.851A2.917 2.917 0 0 1 18.108 4h3.787a1.42 1.42 0 0 1 1.417 1.423v6.893l3.943-6.851A2.917 2.917 0 0 1 29.783 4h3.787a1.42 1.42 0 0 1 1.418 1.423v5.521a1.42 1.42 0 0 1-1.418 1.422h-.657l-4.318 7.503a2.914 2.914 0 0 1-3.987 1.072l-2.9-1.68a2.93 2.93 0 0 1-1.46-2.536v-2.639l-3.329 5.783a2.914 2.914 0 0 1-3.987 1.072l-2.9-1.68a2.93 2.93 0 0 1-1.46-2.536v-2.639l-1.16 2.016a1.415 1.415 0 0 1-1.936.52l-4.767-2.76a1.425 1.425 0 0 1-.519-1.943l3.715-6.454A2.917 2.917 0 0 1 6.432 4h3.787a1.42 1.42 0 0 1 1.418 1.423v6.893Z"
      />
    </svg>
  );
}

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
      { id: "variants", label: "Logo Variants" },
      { id: "clearspace", label: "Clearspace" },
      { id: "incorrect", label: "Incorrect Usage" },
      { id: "cobranding", label: "Co-branding" },
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
  imageSrc,
  copyText,
  children,
}: {
  category: string;
  imageSrc: string;
  copyText: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-foreground/10 flex overflow-hidden rounded-lg border">
      <div className="relative aspect-square w-48 shrink-0 overflow-hidden bg-black">
        <NextImage src={imageSrc} alt={category} fill className="object-fill" />
      </div>
      <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-medium">{category}</p>
          <div className="text-foreground/50 mt-1 text-sm leading-relaxed">
            {children}
          </div>
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
              {/* ─── Logo Variants ─── */}
              <section id="variants" ref={setRef("variants")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Logo Variants
                </h2>
                <p className="text-foreground/50 mb-8 text-sm">
                  The WaveSpeed logo comes in two forms: the full lockup
                  (symbol&nbsp;+ wordmark) and the symbol alone. Use the lockup
                  wherever space allows; reserve the symbol for compact contexts
                  like favicons and app icons.
                </p>

                {/* Lockup + Symbol on light */}
                <p className="text-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase">
                  On light
                </p>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white px-10 py-14 text-black">
                    <LogoSvg
                      className="h-7 w-auto"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </div>
                  <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white px-10 py-14 text-black">
                    <SymbolSvg className="h-8 w-auto" />
                  </div>
                </div>

                {/* Lockup + Symbol on dark */}
                <p className="text-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase">
                  On dark
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark flex items-center justify-center rounded-lg px-10 py-14">
                    <LogoSvg
                      className="h-7 w-auto text-white"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </div>
                  <div className="bg-dark flex items-center justify-center rounded-lg px-10 py-14">
                    <SymbolSvg className="h-8 w-auto text-white" />
                  </div>
                </div>

                {/* Mono reference */}
                <p className="text-foreground/50 mt-6 text-sm">
                  Always use the monochrome version — black on light
                  backgrounds, white on dark. Never colorize the logo.
                </p>
                <a
                  href="/admin/brand?tab=avatar"
                  className="text-foreground hover:text-foreground/50 mt-4 inline-flex items-center gap-1 text-sm transition-colors"
                >
                  <Download className="size-3" />
                  Download logo assets
                </a>
              </section>

              {/* ─── Clearspace & Minimum Size ─── */}
              <section id="clearspace" ref={setRef("clearspace")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Clearspace &amp; Minimum Size
                </h2>
                <p className="text-foreground/50 mb-8 text-sm">
                  Maintain a minimum clear zone around the logo. The unit
                  &ldquo;x&rdquo; equals the height of the symbol mark.
                </p>
                <div className="grid grid-cols-[3fr_1fr] gap-x-8 gap-y-6">
                  <NextImage
                    src={logoSpace}
                    alt="Lockup clearspace specification"
                    className="w-full dark:invert"
                  />
                  <NextImage
                    src={symbolSpace}
                    alt="Symbol clearspace specification"
                    className="w-full dark:invert"
                  />
                </div>
                <div className="mt-6 grid max-w-lg grid-cols-[3fr_1fr] items-end gap-x-16">
                  <NextImage
                    src={logoSize}
                    alt="Lockup minimum size specification"
                    className="w-full dark:invert"
                  />
                  <NextImage
                    src={symbolSize}
                    alt="Symbol minimum size specification"
                    className="w-full dark:invert"
                  />
                </div>
              </section>

              {/* ─── Incorrect Usage ─── */}
              <section id="incorrect" ref={setRef("incorrect")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Incorrect Usage
                </h2>
                <p className="text-foreground/50 mb-6 text-sm">
                  Preserve the integrity of the logo. Avoid the following
                  modifications in all contexts.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    {
                      src: incorrectUsage01,
                      caption: "Do not change the color or outline the logo.",
                    },
                    {
                      src: incorrectUsage02,
                      caption: "Do not add any effects to the logo.",
                    },
                    {
                      src: incorrectUsage03,
                      caption:
                        "Do not change the typeface within the wordmark.",
                    },
                    {
                      src: incorrectUsage04,
                      caption:
                        "Do not distort, rotate, or otherwise modify the logo.",
                    },
                    {
                      src: incorrectUsage05,
                      caption: "Do not rearrange or resize the logo elements.",
                    },
                    {
                      src: incorrectUsage06,
                      caption:
                        "Do not place the logo over a low-contrast part of an image.",
                    },
                  ].map((item, i) => (
                    <figure key={i}>
                      <NextImage
                        src={item.src}
                        alt={item.caption}
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-foreground/40 mt-2 text-xs">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>

              {/* ─── Co-branding ─── */}
              <section id="cobranding" ref={setRef("cobranding")}>
                <h2 className="text-foreground mb-2 text-lg font-semibold">
                  Co-branding
                </h2>
                <p className="text-foreground/50 mb-8 text-sm">
                  When the WaveSpeed logo appears alongside a partner brand,
                  separate them with a vertical divider. Align to the x-height
                  of the wordmark and maintain 1.5&times; clear space on both
                  sides of the divider.
                </p>
                <div className="grid grid-cols-[3fr_1fr] place-items-center gap-6">
                  <NextImage
                    src={logoCoSpace}
                    alt="Co-branding lockup with partner logo spacing"
                    className="w-full dark:invert"
                  />
                  <NextImage
                    src={symbolCoSpace}
                    alt="Co-branding symbol with partner logo spacing"
                    className="w-full dark:invert"
                  />
                </div>
                <div className="mt-6 grid max-w-lg grid-cols-[3fr_1fr] place-items-center gap-x-16">
                  <NextImage
                    src={logoCoEg}
                    alt="Co-branding lockup example"
                    className="w-full dark:invert"
                  />
                  <NextImage
                    src={symbolCoEg}
                    alt="Co-branding symbol example"
                    className="w-full dark:invert"
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
                        meta: "bold · leading-none",
                        sample: "Next-gen AI",
                      },
                      {
                        role: "Page title",
                        classes:
                          "font-display text-2xl font-bold tracking-tighter",
                        meta: "bold · leading-normal",
                        sample: "Featured Models",
                      },
                      {
                        role: "Section",
                        classes:
                          "font-display text-xl font-medium tracking-tight",
                        meta: "medium · leading-normal",
                        sample: "Built for speed",
                      },
                      {
                        role: "Body",
                        classes: "text-base",
                        meta: "regular · leading-relaxed",
                        sample:
                          "Generate images, video, and speech with state-of-the-art AI models.",
                      },
                      {
                        role: "Small body",
                        classes: "text-subtle text-sm",
                        meta: "regular · leading-relaxed",
                        sample:
                          "WaveSpeed runs on optimized infrastructure so you get results faster.",
                      },
                      {
                        role: "Caption",
                        classes: "text-foreground/50 text-xs",
                        meta: "regular · leading-normal",
                        sample: "Pricing may vary by region.",
                      },
                      {
                        role: "CTA",
                        classes: "text-sm font-semibold",
                        meta: "semibold · leading-normal",
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
                        <p className={`min-w-0 flex-1 ${row.classes}`}>
                          {row.sample}
                        </p>
                        <span className="text-foreground/30 shrink-0 font-mono text-xs">
                          {row.meta}
                        </span>
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
                  <PromptCard
                    category="openai/gpt-image-1.5/text-to-image"
                    imageSrc="/prompt/result.png"
                    copyText="A close-up of a single red rose in full bloom with delicate layered petals. The flower is semi-transparent and ethereal, with light visibly passing through the translucent petals. Isolated against a solid pure black background with no environment. The petals and stem dissolve into optical afterimages. Non-linear spectral light trails curve and flow through the flower form. Strong prismatic dispersion along petal edges. Temporal smearing and motion echo. Chromatic aberration. Light bleeding into darkness. Long exposure effect. Experimental cinematic optical art, surreal and time-stretched. Macro lens, ultra-detailed."
                  >
                    <p>
                      A close-up of a single red rose in full bloom with
                      delicate layered petals. The flower is semi-transparent
                      and ethereal, with light visibly passing through the
                      translucent petals. Isolated against a solid pure black
                      background with no environment. The petals and stem
                      dissolve into optical afterimages. Non-linear spectral
                      light trails curve and flow through the flower form.
                      Strong prismatic dispersion along petal edges. Temporal
                      smearing and motion echo. Chromatic aberration. Light
                      bleeding into darkness. Long exposure effect. Experimental
                      cinematic optical art, surreal and time-stretched. Macro
                      lens, ultra-detailed.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href="/prompt/template.json"
                        download
                        className="text-foreground hover:text-foreground/50 inline-flex items-center gap-1 text-xs transition-colors"
                      >
                        <Download className="size-3" />
                        template.json{" "}
                      </a>
                      <span className="text-foreground/70 text-xs">
                        Works with WaveSpeed Desktop
                      </span>
                    </div>
                  </PromptCard>

                  <PromptCard
                    category="Midjourney"
                    imageSrc="/prompt/result.png"
                    copyText="Reach out hand silhouette merging with optical afterimages, non-linear spectral light trails flowing through the form, strong prismatic dispersion, temporal smearing and motion echo, chromatic aberration, light bleeding into darkness, long exposure effect, deep blue-black background, experimental cinematic optical art, surreal and time-stretched"
                  >
                    <p>
                      <em className="text-foreground/70">
                        Reach out hand silhouette merging
                      </em>{" "}
                      with optical afterimages, non-linear spectral light trails
                      flowing through the form, strong prismatic dispersion,
                      temporal smearing and motion echo, chromatic aberration,
                      light bleeding into darkness, long exposure effect, deep
                      blue-black background, experimental cinematic optical art,
                      surreal and time-stretched
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href="/prompt/reference.png"
                        download
                        className="text-foreground hover:text-foreground/50 inline-flex items-center gap-1 text-xs transition-colors"
                      >
                        <Download className="size-3" />
                        reference.png
                      </a>
                      <span className="text-foreground/70 text-xs">
                        Change <em>italic</em> to the object you want, you must
                        use the reference image.
                      </span>
                    </div>
                  </PromptCard>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import ArrowRight from "@/images/arrow-right.svg";

import heroImg from "@/images/slide-5.webp";
import featureSpeedImg from "@/images/thumb-r12.webp";
import featureTextImg from "@/images/thumb-10.webp";
import featureEditImg from "@/images/editor-image-preview.webp";
import examplePortrait from "@/images/thumb-10.webp";
import exampleFantasy from "@/images/thumb-7.webp";
import exampleCinematic from "@/images/thumb-11.webp";
import exampleSurreal from "@/images/thumb-12.webp";

/* ================================================================== */
/*  PAGE CONFIG — edit this block to launch a new model                */
/* ================================================================== */

const config = {
  /* — Hero — */
  model: "Nano Banana 2",
  slug: "wavespeed/nano-banana-2",
  heroImage: heroImg,
  description:
    "Next-generation image synthesis on WaveSpeed — sub-second inference, built-in typography, and prompt-driven editing in a single model.",

  /* — CTAs — */
  primaryCta: {
    label: "Try Text to Image",
    href: "/models/wavespeed/nano-banana-2/create",
  },
  secondaryCta: {
    label: "Try Image Editing",
    href: "/models/wavespeed/nano-banana-2/edit",
  },

  /* — Features (alternating text + image rows) — */
  featuresHeading: "One Model, Three Capabilities",
  featuresDescription:
    "Nano Banana 2 combines generation, typography, and editing into a single architecture — optimized end-to-end on WaveSpeed infrastructure for maximum throughput.",
  features: [
    {
      title: "Sub-Second Generation",
      description:
        "Powered by WaveSpeed's optimized inference stack, Nano Banana 2 delivers high-fidelity images in under one second. Built for real-time workflows, interactive products, and production-scale pipelines.",
      image: featureSpeedImg,
    },
    {
      title: "Pixel-Perfect Typography",
      description:
        "Reliable, legible text baked directly into generated images. Whether it's headlines on posters, labels on packaging, or UI copy in mockups — the output reads exactly as prompted.",
      image: featureTextImg,
    },
    {
      title: "Prompt-Driven Editing",
      description:
        "Edit any image with plain language instructions — no masking, no inpainting tools. Describe what you want changed and the model handles composition, lighting, and context automatically.",
      image: featureEditImg,
    },
  ],

  /* — Endpoints — */
  endpoints: [
    { label: "Text to Image", model: "wavespeed/nano-banana-2" },
    { label: "Image Editing", model: "wavespeed/nano-banana-2/edit" },
  ],

  /* — Example gallery — */
  examples: [
    {
      image: examplePortrait,
      category: "Portrait",
      prompt:
        "Red-haired girl with porcelain skin and freckles posing with a blue hyacinth macaw on her shoulder, deep blue studio backdrop, fine art photography, shallow depth of field.",
    },
    {
      image: exampleFantasy,
      category: "Fantasy",
      prompt:
        "Two silhouettes standing in an enchanted forest gazing up at giant bioluminescent planets glowing with coral reefs and ocean life, painted sky at twilight.",
    },
    {
      image: exampleCinematic,
      category: "Cinematic",
      prompt:
        "A lone figure facing a colossal crystalline dragon made of molten gold and amber light, scorching orange desert sky, epic fantasy concept art, volumetric lighting.",
    },
    {
      image: exampleSurreal,
      category: "Surreal",
      prompt:
        "Elderly man in a white linen suit carrying an enormous iridescent fish on his back with thin ropes, soft overcast light, muted pastel tones, magical realism.",
    },
  ],

  /* — Developer section bullet points — */
  devBullets: [
    "Optimized inference — no cold starts, instant scale-up",
    "Usage-based pricing — pay only for what you generate",
    "Python & JavaScript SDKs + REST API",
  ],

  /* — FAQ — */
  faqs: [
    {
      q: "What is Nano Banana 2?",
      a: "Nano Banana 2 is WaveSpeed's latest image generation model, purpose-built for speed without compromising quality. It handles text-to-image generation and prompt-driven editing through a single unified architecture.",
    },
    {
      q: "How is it different from version 1?",
      a: "Version 2 brings significantly faster inference, built-in typography rendering, prompt-based editing without masks, and native high-resolution output — all running on WaveSpeed's latest inference infrastructure.",
    },
    {
      q: "What output resolutions are available?",
      a: "The model supports a range of resolutions and aspect ratios including 1:1, 16:9, 9:16, 4:3, and 3:4 — from standard web sizes up to high-resolution print-ready output.",
    },
    {
      q: "How does prompt-driven editing work?",
      a: "You provide an input image and a text instruction describing the change. The model interprets spatial context, handles blending, and applies the edit — no manual masks or selection tools needed.",
    },
    {
      q: "What does it cost to use?",
      a: "Nano Banana 2 uses WaveSpeed's standard pay-per-use pricing. You only pay for what you generate — visit the pricing page for current rates and volume tiers.",
    },
    {
      q: "Can I use the output commercially?",
      a: "Yes. All images generated through Nano Banana 2 are cleared for commercial use under WaveSpeed's standard terms of service.",
    },
  ],

  /* — Final CTA — */
  ctaHeading: "Start Generating",
};

/* ================================================================== */
/*  Code samples — syntax-colored for dark background                  */
/*  kw = keyword, tx = text, fn = function, st = string               */
/* ================================================================== */

const kw = "text-[#8b8bff]";
const tx = "text-white/80";
const fn = "text-[#5daff1]";
const st = "text-[#ee560a]";

function buildCodeTabs(model: string) {
  return [
    {
      label: "Python",
      lines: [
        <>
          <span className={kw}>import</span>
          <span className={tx}> wavespeed</span>
        </>,
        <>
          <span className={tx}>client = wavespeed.</span>
          <span className={fn}>Client</span>
          <span className={tx}>()</span>
        </>,
        <>
          <span className={tx}>result = client.</span>
          <span className={fn}>run</span>
          <span className={tx}>(</span>
        </>,
        <>
          <span className={st}>{`    "${model}"`}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"    input={"}</span>
        </>,
        <>
          <span className={st}>{'        "prompt"'}</span>
          <span className={tx}>: </span>
          <span className={st}>
            {'"A girl walking through a field of golden light"'}
          </span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={st}>{'        "image_size"'}</span>
          <span className={tx}>: </span>
          <span className={st}>{'"landscape_16_9"'}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={st}>{'        "num_inference_steps"'}</span>
          <span className={tx}>: </span>
          <span className={kw}>4</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"    },"}</span>
        </>,
        <>
          <span className={tx}>)</span>
        </>,
        <>
          <span className={fn}>print</span>
          <span className={tx}>(result.data[</span>
          <span className={kw}>0</span>
          <span className={tx}>].url)</span>
        </>,
      ],
    },
    {
      label: "JavaScript",
      lines: [
        <>
          <span className={kw}>import</span>
          <span className={tx}> WaveSpeed </span>
          <span className={kw}>from</span>
          <span className={st}>{' "wavespeed"'}</span>
        </>,
        <>
          <span className={kw}>const</span>
          <span className={tx}> client = </span>
          <span className={kw}>new</span>
          <span className={fn}> WaveSpeed</span>
          <span className={tx}>()</span>
        </>,
        <>
          <span className={kw}>const</span>
          <span className={tx}> result = </span>
          <span className={kw}>await</span>
          <span className={tx}> client.</span>
          <span className={fn}>run</span>
          <span className={tx}>(</span>
        </>,
        <>
          <span className={st}>{`  "${model}"`}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"  {"}</span>
        </>,
        <>
          <span className={tx}>{"    input: {"}</span>
        </>,
        <>
          <span className={tx}>{"      prompt: "}</span>
          <span className={st}>
            {'"A girl walking through a field of golden light"'}
          </span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"      image_size: "}</span>
          <span className={st}>{'"landscape_16_9"'}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"      num_inference_steps: "}</span>
          <span className={kw}>4</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={tx}>{"    },"}</span>
        </>,
        <>
          <span className={tx}>{"  },"}</span>
        </>,
        <>
          <span className={tx}>)</span>
        </>,
        <>
          <span className={tx}>console.</span>
          <span className={fn}>log</span>
          <span className={tx}>(result.data[</span>
          <span className={kw}>0</span>
          <span className={tx}>].url)</span>
        </>,
      ],
    },
    {
      label: "cURL",
      lines: [
        <>
          <span className={tx}>curl -X POST </span>
          <span className={st}>{'"https://api.wavespeed.ai/v1/run"'}</span>
          <span className={tx}> \</span>
        </>,
        <>
          <span className={tx}> -H </span>
          <span className={st}>
            {'"Authorization: Bearer $WAVESPEED_API_KEY"'}
          </span>
          <span className={tx}> \</span>
        </>,
        <>
          <span className={tx}> -H </span>
          <span className={st}>{'"Content-Type: application/json"'}</span>
          <span className={tx}> \</span>
        </>,
        <>
          <span className={tx}>{"  -d '{"}</span>
        </>,
        <>
          <span className={st}>{'    "model"'}</span>
          <span className={tx}>: </span>
          <span className={st}>{`"${model}"`}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={st}>{'    "input"'}</span>
          <span className={tx}>{": {"}</span>
        </>,
        <>
          <span className={st}>{'      "prompt"'}</span>
          <span className={tx}>: </span>
          <span className={st}>
            {'"A girl walking through a field of golden light"'}
          </span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={st}>{'      "image_size"'}</span>
          <span className={tx}>: </span>
          <span className={st}>{'"landscape_16_9"'}</span>
          <span className={tx}>,</span>
        </>,
        <>
          <span className={st}>{'      "num_inference_steps"'}</span>
          <span className={tx}>: </span>
          <span className={kw}>4</span>
        </>,
        <>
          <span className={tx}>{"    }"}</span>
        </>,
        <>
          <span className={tx}>{"  }'"}</span>
        </>,
      ],
    },
  ];
}

const codeTabs = buildCodeTabs(config.slug);

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-foreground/10 border-b">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-heading font-display text-base font-medium">
          {q}
        </span>
        <svg
          className={`text-foreground/40 size-5 shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="10" y1="4" x2="10" y2="16" />
          <line x1="4" y1="10" x2="16" y2="10" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="text-foreground/60 font-mono text-sm leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="text-foreground/40 hover:text-foreground/70 flex cursor-pointer items-center gap-1.5 font-mono text-xs transition-colors duration-150"
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function NanoBanana2Landing() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main>
      <Navbar overlay />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[480px] w-full overflow-hidden sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <Image
          src={config.heroImage}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-10 sm:pb-14 md:px-12 md:pb-18 lg:px-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-xs tracking-wide text-white/60 uppercase">
                Available now on WaveSpeed
              </span>
            </div>
            <h1 className="font-display text-4xl leading-none font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {config.model}
            </h1>
            <p className="max-w-lg font-mono text-sm leading-normal text-pretty text-white/50">
              {config.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={config.primaryCta.href}
                className="flex items-center gap-2.5 rounded-xs bg-white px-5 py-2.5 text-black transition-colors duration-150 hover:bg-white/90"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  {config.primaryCta.label}
                </span>
              </Link>
              <Link
                href={config.secondaryCta.href}
                className="flex items-center rounded-xs border border-white/20 px-5 py-2.5 text-white transition-colors duration-150 hover:bg-white/10"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  {config.secondaryCta.label}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      {config.features.length > 0 && (
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex max-w-xl flex-col gap-4">
              <h2 className="text-heading font-display text-2xl leading-none font-bold tracking-tight text-balance md:text-5xl">
                {config.featuresHeading}
              </h2>
              <p className="text-foreground/60 font-mono text-sm text-pretty md:text-base">
                {config.featuresDescription}
              </p>
            </div>
            <div className="flex flex-col gap-10">
              {config.features.map((f, i) => (
                <div
                  key={f.title}
                  className={`flex flex-col items-center gap-6 lg:flex-row lg:gap-12 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex w-full flex-col justify-center lg:flex-1">
                    <h3 className="text-ink font-display mb-2 text-2xl leading-7 font-medium">
                      {f.title}
                    </h3>
                    <p className="text-foreground/60 text-base text-pretty">
                      {f.description}
                    </p>
                  </div>
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs lg:flex-1">
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Endpoints ────────────────────────────────────────── */}
      {config.endpoints.length > 0 && (
        <section className="px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-heading font-display mb-6 text-2xl leading-none font-bold tracking-tight md:text-4xl">
              Endpoints
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {config.endpoints.map((ep) => (
                <Link
                  key={ep.model}
                  href={`/models/${ep.model}/create`}
                  className="bg-surface hover:bg-foreground/5 group flex flex-col gap-2 rounded-xs p-5 transition-colors duration-150"
                >
                  <span className="text-foreground/40 font-mono text-xs uppercase">
                    {ep.label}
                  </span>
                  <span className="text-heading flex items-center gap-2 font-mono text-sm font-medium">
                    {ep.model}
                    <ArrowRight className="text-foreground/30 size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Examples Gallery ──────────────────────────────────── */}
      {config.examples.length > 0 && (
        <section className="px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-heading font-display mb-6 text-2xl leading-none font-bold tracking-tight md:text-4xl">
              Examples
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.examples.map((ex) => (
                <div
                  key={ex.category}
                  className="group flex flex-col overflow-hidden rounded-xs"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={ex.image}
                      alt={ex.category}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4 pt-12">
                      <span className="bg-brand rounded-xs px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase">
                        {ex.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface flex flex-col gap-2 p-4">
                    <p className="text-foreground/60 line-clamp-2 font-mono text-xs leading-relaxed">
                      {ex.prompt}
                    </p>
                    <CopyButton text={ex.prompt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Developer Section ─────────────────────────────────── */}
      {config.devBullets.length > 0 && (
        <section className="bg-dark dark:bg-dark overflow-hidden">
          <div className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              <div className="flex flex-col gap-4 lg:flex-1 lg:pt-4">
                <h2 className="font-display text-2xl leading-none font-bold tracking-tight text-white md:text-5xl">
                  Start Building
                </h2>
                <p className="font-mono text-sm text-pretty text-white/50">
                  Integrate {config.model} with a single API call. Python,
                  JavaScript, or cURL — ship in minutes.
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {config.devBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-mono text-xs leading-relaxed text-white/40"
                    >
                      <Check className="text-green mt-0.5 size-3.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href="/docs"
                    className="tracking-xl inline-flex items-center gap-2 rounded-xs bg-white px-5 py-2.5 font-mono text-sm text-black uppercase transition-colors duration-150 hover:bg-white/90"
                  >
                    API Docs
                  </Link>
                  <Link
                    href="/api-keys"
                    className="tracking-xl inline-flex items-center gap-2 rounded-xs border border-white/20 px-5 py-2.5 font-mono text-sm text-white uppercase transition-colors duration-150 hover:bg-white/10"
                  >
                    Get API Key
                  </Link>
                </div>
              </div>

              <div className="min-w-0 overflow-hidden rounded-lg border border-white/20 lg:flex-1">
                <div className="flex items-center gap-1 border-b border-white/10 px-4">
                  {codeTabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={`cursor-pointer border-b-2 px-3 py-3 font-mono text-xs transition-colors duration-150 ${
                        activeTab === i
                          ? "border-white text-white"
                          : "border-transparent text-white/40 hover:text-white/60"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="bg-code-dark overflow-auto p-4 font-mono text-xs leading-6 whitespace-pre">
                  {codeTabs[activeTab].lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────── */}
      {config.faqs.length > 0 && (
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
              <div className="lg:w-80 lg:shrink-0">
                <h2 className="text-heading font-display text-2xl leading-none font-bold tracking-tight md:text-5xl">
                  FAQ
                </h2>
              </div>
              <div className="border-foreground/10 min-w-0 border-t lg:flex-1">
                {config.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <CTABanner>
        <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
          {config.ctaHeading}
        </h2>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            href={config.primaryCta.href}
            className="flex whitespace-nowrap items-center gap-3 rounded-xs bg-black px-8 py-4 text-white transition-colors duration-150 hover:bg-black/80"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              {config.primaryCta.label}
            </span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={config.secondaryCta.href}
            className="flex whitespace-nowrap items-center rounded-xs border border-black/20 px-8 py-4 text-black transition-colors duration-150 hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              {config.secondaryCta.label}
            </span>
          </Link>
        </div>
      </CTABanner>

      <Footer />
    </main>
  );
}

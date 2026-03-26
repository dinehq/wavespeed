"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eraser,
  FileImage,
  FileVideo,
  Film,
  ImageUp,
  Layers,
  Merge,
  Monitor,
  Music,
  Paintbrush,
  Scissors,
  Smile,
  Sparkles,
  Wand2,
  Video,
  ArrowUpCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ArrowRight from "@/images/arrow-right.svg";
import heroBg from "@/images/slide-1.webp";
import tool01 from "@/images/tool-01.webp";
import tool02 from "@/images/tool-02.webp";
import tool03 from "@/images/tool-03.webp";
import tool04 from "@/images/tool-04.webp";
import tool05 from "@/images/tool-05.webp";
import tool06 from "@/images/tool-06.webp";
import tool07 from "@/images/tool-07.webp";
import tool08 from "@/images/tool-08.webp";
import tool09 from "@/images/tool-09.webp";
import tool10 from "@/images/tool-10.webp";
import tool11 from "@/images/tool-11.webp";

const toolImages = [
  tool01,
  tool02,
  tool03,
  tool04,
  tool05,
  tool06,
  tool07,
  tool08,
  tool09,
  tool10,
  tool11,
];

const freeTools = [
  {
    name: "Background Remover",
    icon: Eraser,
    href: "/tools/background-remover",
  },
  { name: "Face Enhancer", icon: Smile, href: "/tools/face-enhancer" },
  { name: "Face Swapper", icon: Sparkles, href: "/tools/face-swapper" },
  { name: "Image Eraser", icon: Paintbrush, href: "/tools/image-eraser" },
  { name: "Segment Anything", icon: Layers, href: "/tools/segment-anything" },
  { name: "Video Converter", icon: FileVideo, href: "/tools/video-converter" },
  { name: "Audio Converter", icon: Music, href: "/tools/audio-converter" },
  { name: "Image Converter", icon: FileImage, href: "/tools/image-converter" },
  { name: "Media Trimmer", icon: Scissors, href: "/tools/media-trimmer" },
  { name: "Media Merger", icon: Merge, href: "/tools/media-merger" },
  { name: "Image Upscaler", icon: ImageUp, href: "/tools/image-upscaler" },
  {
    name: "Video Upscaler",
    icon: ArrowUpCircle,
    href: "/tools/video-upscaler",
  },
];

const aiModels = [
  {
    name: "moonshot / Kimi K2.5",
    type: "text-generation",
    description:
      "Advanced multimodal language model with long-context understanding.",
  },
  {
    name: "black-forest-labs / FLUX.2 [Pro]",
    type: "text-to-image",
    description: "Next-gen image generation with photorealistic quality.",
  },
  {
    name: "black-forest-labs / FLUX Kontext",
    type: "image-to-image",
    description: "Context-aware image editing and transformation.",
  },
  {
    name: "alibaba / Wan 2.5",
    type: "text-to-video",
    description: "High-quality video generation from text prompts.",
  },
  {
    name: "alibaba / Wan 2.6",
    type: "text-to-video",
    description: "Latest video generation with improved motion and coherence.",
  },
  {
    name: "bytedance / Seedream 4.0",
    type: "text-to-image",
    description: "Artistic image generation with strong style control.",
  },
  {
    name: "bytedance / Seedream 4.5",
    type: "text-to-image",
    description:
      "Enhanced image generation with multilingual prompts and editing.",
  },
  {
    name: "bytedance / Seedance 2.0",
    type: "text-to-video",
    description: "Dance and motion video generation with precise control.",
  },
  {
    name: "wavespeed / InfiniteTalk",
    type: "audio-to-video",
    description: "Generate talking-head videos from audio input.",
  },
  {
    name: "wavespeed / Nano Banana Pro",
    type: "text-to-image",
    description: "Ultra-fast image generation optimized for speed.",
  },
  {
    name: "wavespeed / Nano Banana 2",
    type: "text-to-image",
    description: "Next-gen fast image model with improved quality.",
  },
  {
    name: "kuaishou / Kling O3 & 3.0",
    type: "text-to-video",
    description: "Professional video generation with cinematic quality.",
  },
  {
    name: "google / Veo 3",
    type: "text-to-video",
    description: "Google's video generation with audio output.",
  },
  {
    name: "google / Veo 3.1",
    type: "text-to-video",
    description: "Latest Google video model with enhanced realism.",
  },
  {
    name: "lightricks / LTX 2.3",
    type: "text-to-video",
    description: "Fast and efficient video generation model.",
  },
  {
    name: "midjourney / Midjourney",
    type: "text-to-image",
    description: "Industry-leading artistic image generation.",
  },
  {
    name: "minimax / Hailuo",
    type: "text-to-video",
    description: "High-fidelity video generation with natural motion.",
  },
  {
    name: "minimax / MiniMax M2.7",
    type: "text-generation",
    description: "Powerful language model for diverse text tasks.",
  },
];

const aiFeatures = [
  { name: "AI Image Generator", href: "#" },
  { name: "AI Video Generator", href: "#" },
  { name: "AI Face Swap", href: "#" },
  { name: "Background Remover", href: "#" },
  { name: "AI Art Generator", href: "#" },
  { name: "AI Headshot Generator", href: "#" },
  { name: "AI Video Enhancer", href: "#" },
  { name: "AI Image Enhancer", href: "#" },
  { name: "Watermark Remover", href: "#" },
  { name: "GIF Maker", href: "#" },
  { name: "Meme Generator", href: "#" },
  { name: "AI Logo Generator", href: "#" },
  { name: "Best Open Source Video Models 2026", href: "#" },
  { name: "Best Open Source Image Models 2026", href: "#" },
  { name: "Swap Anything", href: "#" },
  { name: "Audio for Video", href: "#" },
  { name: "Video Edit", href: "#" },
  { name: "Ultra Selection", href: "#" },
  { name: "AI Generation Assist Tools", href: "#" },
  { name: "LoRA Generation", href: "#" },
  { name: "Generate Music", href: "#" },
  { name: "First and Last Frame Video", href: "#" },
  { name: "Best Video Tool", href: "#" },
  { name: "Remove Anything", href: "#" },
  { name: "Best Image Tool", href: "#" },
  { name: "3D Creation", href: "#" },
  { name: "Avatar Lipsync Models", href: "#" },
  { name: "Training Tools", href: "#" },
  { name: "Enhance Videos", href: "#" },
  { name: "Image Editing", href: "#" },
  { name: "Upscale Image", href: "#" },
  { name: "Speech Generation", href: "#" },
];

const relatedTools = [
  {
    name: "Wan 2.5 Text to Video",
    description: "Generate videos from text prompts",
    href: "/models/wan-2-5",
    icon: Video,
  },
  {
    name: "FLUX 2 Pro Edit",
    description: "High-quality image editing",
    href: "/models/flux-image",
    icon: Wand2,
  },
  {
    name: "DeepSeek V4",
    description: "Advanced coding AI assistant",
    href: "/models/deepseek",
    icon: Monitor,
  },
  {
    name: "Free AI Tools",
    description: "Background remover, face enhancer & more",
    href: "/tools",
    icon: Film,
  },
];

const otherPages = [
  {
    name: "Introduce",
    href: "/",
    description: "Learn about WaveSpeed AI platform",
  },
  { name: "Studio", href: "#", description: "Professional AI creation studio" },
  {
    name: "Desktop",
    href: "/landing/desktop",
    description: "Download the desktop app",
  },
];

const faqItems = [
  {
    question: "What is WaveSpeedAI?",
    answer:
      "WaveSpeedAI is a comprehensive AI platform that provides access to cutting-edge AI models for image generation, video creation, and text processing. We offer both free tools and premium AI models to help creators bring their ideas to life.",
  },
  {
    question: "Which AI models are available on WaveSpeedAI?",
    answer:
      "WaveSpeedAI offers a wide range of AI models including FLUX for image generation, Wan 2.5/2.6 for video creation, Seedream for artistic images, Kling and Veo for video generation, DeepSeek for coding assistance, and many more.",
  },
  {
    question: "Are the free tools really free?",
    answer:
      "Yes! Our free tools including Background Remover, Face Enhancer, Image Converter, and Video Converter are completely free to use with no hidden costs or watermarks.",
  },
  {
    question: "How do I get started with WaveSpeedAI?",
    answer:
      "Simply sign up for a free account on wavespeed.ai. You can immediately access our free tools and explore our AI models. For premium features, choose a plan that fits your needs.",
  },
];

function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-foreground/10 border-b">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-heading font-display text-base font-medium">
          {question}
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
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Navbar overlay />

      {/* Hero */}
      <section className="relative -mt-16 h-105 w-full overflow-hidden sm:h-120 lg:h-160">
        <Image
          src={heroBg}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-6 sm:pb-8 md:px-12 md:pb-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Discover AI Creativity
              </h1>
              <p className="max-w-lg text-sm leading-normal text-pretty text-white/60 md:text-base">
                Explore cutting-edge AI models and powerful free tools to bring
                your creative ideas to life.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2.5 rounded-xs border border-transparent bg-white px-6 py-3 text-black transition-colors duration-150 hover:bg-white/90"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    Start Free Trial
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-2.5 rounded-xs border border-white/20 px-6 py-3 text-white transition-colors duration-150 hover:border-white/40 hover:bg-white/10"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    View Docs
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="bg-surface px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Free Tools
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Powerful AI-powered utilities completely free to use — no hidden
              costs or watermarks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {freeTools.map((tool, i) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-background group hover:bg-background/80 flex flex-col overflow-hidden rounded-xs transition-colors"
              >
                <div className="relative h-1.5 w-full">
                  <Image
                    src={toolImages[i % toolImages.length]}
                    alt=""
                    fill
                    sizes="250px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col items-center gap-3 px-4 pt-5 pb-6">
                  <tool.icon
                    className="text-foreground/40 group-hover:text-brand size-6 transition-colors"
                    strokeWidth={1.5}
                  />
                  <span className="text-heading text-center text-sm font-medium">
                    {tool.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              AI Models
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Access the latest state-of-the-art models for image generation,
              video creation, language processing, and more.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {aiModels.map((model) => (
              <div
                key={model.name}
                className="bg-surface hover:bg-surface/80 flex transition-colors"
              >
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
                  <span className="text-foreground/45 font-mono text-xs">
                    {model.type}
                  </span>
                  <h3 className="text-foreground truncate text-sm leading-tight font-semibold">
                    {model.name.includes("/") ? (
                      <>
                        <span className="text-foreground/55">
                          {`${model.name.split("/")[0].trim()} / `}
                        </span>
                        {model.name.split("/").slice(1).join("/").trim()}
                      </>
                    ) : (
                      model.name
                    )}
                  </h3>
                  <p className="text-foreground/55 line-clamp-1 text-xs leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              AI Features
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              A comprehensive suite of AI-powered features to supercharge your
              creative workflow.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {aiFeatures.map((feature) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="text-foreground/60 hover:text-heading hover:bg-surface border-border rounded-xs border px-3.5 py-2 text-sm transition-colors"
              >
                {feature.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Pages */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex max-w-xl flex-col gap-4">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
              Other Pages
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {otherPages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className="bg-surface group hover:bg-surface/80 flex flex-col gap-3 rounded-xs p-6 transition-colors"
              >
                <h3 className="text-heading flex items-center gap-2 text-base font-medium">
                  {page.name}
                  <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related AI Tools */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex max-w-xl flex-col gap-4">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
              Related AI Tools
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-surface group hover:bg-surface/80 flex flex-col gap-4 rounded-xs p-6 transition-colors"
              >
                <tool.icon
                  className="text-foreground/40 size-6"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-heading text-base font-medium">
                    {tool.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
            <div className="lg:w-80 lg:shrink-0">
              <h2 className="text-heading font-display text-2xl leading-none font-bold tracking-tight md:text-5xl">
                FAQ
              </h2>
            </div>
            <div className="border-foreground/10 min-w-0 border-t lg:flex-1">
              {faqItems.map((item) => (
                <FaqAccordion
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-76 overflow-hidden">
        <div className="absolute inset-0 scale-[1.05]">
          <video
            src="/videos/get-started-bg.mp4"
            poster="/videos/get-started-bg_poster.webp"
            autoPlay
            loop
            muted
            playsInline
            className="size-full scale-105 object-cover blur-sm"
          />
        </div>
        <div className="absolute inset-0 dark:bg-black/50" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-6 md:px-12 lg:px-20">
          <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-5xl dark:text-white">
            Ready to Experience Lightning-Fast
            <br />
            AI Generation?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/sign-in"
              className="flex items-center gap-3 rounded-xs bg-black px-8 py-4 text-white transition-colors duration-150 hover:bg-black/80"
            >
              <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
                Start Free Trial
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs"
              className="flex items-center rounded-xs border border-black/20 px-8 py-4 text-black transition-colors duration-150 hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
                View Docs
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

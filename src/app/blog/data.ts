import type { StaticImageData } from "next/image";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const slides = [slide1, slide2, slide3, slide4, slide5];

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  image: StaticImageData;
}

export const posts: BlogPost[] = [
  {
    title: "WAN 2.7 First & Last Frame Control: Builder Guide",
    description:
      "How to use WAN 2.7's first and last frame control for predictable video generation — input prep, API parameters, and production workflow tips.",
    date: "2026-03-23",
    readTime: "9 min read",
    slug: "wan-2-7-first-last-frame-guide",
    tags: ["wan", "video-generation", "guide", "api"],
    image: slides[0],
  },
  {
    title: "WAN 2.7 vs WAN 2.6: Feature Diff & Upgrade Decision",
    description:
      "A side-by-side comparison of WAN 2.7 and WAN 2.6 — new features, performance benchmarks, and migration considerations for production systems.",
    date: "2026-03-23",
    readTime: "8 min read",
    slug: "wan-2-7-vs-wan-2-6",
    tags: ["wan", "comparison", "ai-video"],
    image: slides[1],
  },
  {
    title:
      "Best AI People Remover From Photos in 2026: Remove Unwanted People Instantly",
    description:
      "Compare the top AI people remover tools of 2026. WaveSpeed offers instant, high-quality people removal from photos with API access and no watermarks.",
    date: "2026-03-22",
    readTime: "5 min read",
    slug: "best-ai-people-remover-from-photos-2026",
    tags: ["people-remover", "ai-tools", "image-editing"],
    image: slides[2],
  },
  {
    title:
      "Best Fotor Alternative in 2026: WaveSpeed for AI Image Generation & Editing",
    description:
      "Looking for a Fotor alternative? WaveSpeed delivers AI image generation, editing, and 200+ models via API — far beyond basic photo editing.",
    date: "2026-03-21",
    readTime: "4 min read",
    slug: "best-fotor-alternative-2026-wavespeedai",
    tags: ["fotor", "comparison", "alternative", "image-editing"],
    image: slides[3],
  },
  {
    title:
      "Best Free Audio Converter in 2026: Convert MP3, WAV, FLAC, AAC Instantly",
    description:
      "WaveSpeed Desktop converts between MP3, WAV, FLAC, AAC, OGG, and more with no watermarks, no file limits, and no uploads. 100% free, runs locally.",
    date: "2026-03-21",
    readTime: "4 min read",
    slug: "best-free-audio-converter-2026-wavespeed-desktop",
    tags: ["audio-converter", "free-tools", "desktop-app"],
    image: slides[4],
  },
  {
    title:
      "Best Free Image Converter in 2026: Convert PNG, JPG, WebP, HEIC Locally",
    description:
      "Convert images between PNG, JPG, WebP, HEIC, BMP, TIFF, and more for free with WaveSpeed Desktop. No uploads, no watermarks, no file limits.",
    date: "2026-03-21",
    readTime: "3 min read",
    slug: "best-free-image-converter-2026-wavespeed-desktop",
    tags: ["image-converter", "free-tools", "desktop-app"],
    image: slides[0],
  },
  {
    title:
      "Best Free Video Converter in 2026: Convert MP4, MOV, AVI, WebM Without Watermarks",
    description:
      "Convert videos between MP4, MOV, AVI, WebM, MKV, and more for free with WaveSpeed Desktop. No watermarks, no upload limits, no quality loss.",
    date: "2026-03-21",
    readTime: "4 min read",
    slug: "best-free-video-converter-2026-wavespeed-desktop",
    tags: ["video-converter", "free-tools", "desktop-app"],
    image: slides[1],
  },
  {
    title:
      "Best Janitor AI Alternative in 2026: Why Creators Are Switching to WaveSpeed",
    description:
      "WaveSpeed offers AI image generation, video creation, face swap, style transfer, and 200+ models via API — going far beyond text chatbots.",
    date: "2026-03-21",
    readTime: "3 min read",
    slug: "best-janitor-ai-alternative-2026-wavespeedai",
    tags: ["janitor-ai", "alternative", "ai-tools"],
    image: slides[2],
  },
  {
    title:
      "Best Media.io Alternative in 2026: WaveSpeed for AI Video, Image & Audio Tools",
    description:
      "Compare Media.io vs WaveSpeed for AI video editing, image generation, and audio tools. 200+ AI models, full API access, free desktop tools.",
    date: "2026-03-21",
    readTime: "4 min read",
    slug: "best-media-io-alternative-2026-wavespeedai",
    tags: ["media-io", "comparison", "alternative", "ai-tools"],
    image: slides[3],
  },
  {
    title:
      "MiniMax M2.7: The Self-Evolving AI Model That Rivals Claude and GPT at a Fraction of the Cost",
    description:
      "MiniMax M2.7 is a next-gen flagship text model with self-improvement capabilities, 56.22% on SWE-Pro, 100 TPS speed, and $0.30/M input tokens.",
    date: "2026-03-21",
    readTime: "7 min read",
    slug: "minimax-m2-7-self-evolving-agent-model-features-benchmarks-2026",
    tags: ["minimax", "llm", "ai-model", "benchmark"],
    image: slides[4],
  },
  {
    title: "Introducing AI Age Filter on WaveSpeed",
    description:
      "AI Age Filter transforms portraits to show how you'd look at different ages. Choose any target age and see realistic aging or de-aging effects.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-age-filter-on-wavespeedai",
    tags: ["age-filter", "announcement", "model-release"],
    image: slides[0],
  },
  {
    title: "Introducing AI Dog Selfie on WaveSpeed",
    description:
      "AI Dog Selfie generates adorable dog selfie images with customizable breed, style, expression, and more. Create cute, shareable pet content instantly.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-dog-selfie-on-wavespeedai",
    tags: ["dog-selfie", "announcement", "pet-content"],
    image: slides[1],
  },
  {
    title: "Introducing AI Dog Selfie Video on WaveSpeed",
    description:
      "AI Dog Selfie Video generates cute animated dog selfie videos with customizable breed, style, expression, action, and duration.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-dog-selfie-video-on-wavespeedai",
    tags: ["dog-selfie", "video-generation", "announcement"],
    image: slides[2],
  },
  {
    title: "Introducing AI Gender Swap on WaveSpeed",
    description:
      "AI Gender Swap transforms any portrait to show how you'd look as the opposite gender. Realistic face transformation with identity preservation.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-gender-swap-on-wavespeedai",
    tags: ["gender-swap", "announcement", "face-transformation"],
    image: slides[3],
  },
  {
    title: "Introducing AI Ghibli Filter on WaveSpeed",
    description:
      "AI Ghibli Filter transforms any photo into Studio Ghibli anime style instantly. Turn portraits, landscapes, and everyday photos into Miyazaki-inspired artwork.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-ghibli-filter-on-wavespeedai",
    tags: ["ghibli-filter", "anime", "style-transfer"],
    image: slides[4],
  },
  {
    title: "Introducing AI Ghibli Filter Video on WaveSpeed",
    description:
      "AI Ghibli Filter Video transforms any photo into a Studio Ghibli anime style video with customizable duration. Create animated Miyazaki-inspired content.",
    date: "2026-03-20",
    readTime: "4 min read",
    slug: "introducing-wavespeed-ai-ai-ghibli-filter-video-on-wavespeedai",
    tags: ["ghibli-filter", "video-generation", "anime"],
    image: slides[0],
  },
];

export const allTags = [
  "All",
  "wan",
  "video-generation",
  "ai-tools",
  "image-editing",
  "announcement",
  "model-release",
  "comparison",
  "alternative",
  "free-tools",
  "desktop-app",
  "llm",
  "ai-model",
  "guide",
  "api",
  "anime",
  "style-transfer",
  "face-transformation",
  "dog-selfie",
  "ghibli-filter",
];

export function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

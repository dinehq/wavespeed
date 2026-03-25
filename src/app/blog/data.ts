import type { StaticImageData } from "next/image";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const slides = [slide1, slide2, slide3, slide4, slide5];

export interface RelatedModel {
  name: string;
  description: string;
  image: StaticImageData;
  href: string;
}

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  image: StaticImageData;
  relatedModel?: RelatedModel;
}

const models = {
  wan26: {
    name: "Wan 2.6",
    description: "Text & image to video with efficient long-clip generation.",
    image: slides[0],
    href: "/models/wan-2-6",
  },
  fluxSchnell: {
    name: "FLUX.1 Schnell",
    description: "Ultra-fast text-to-image generation in under a second.",
    image: slides[2],
    href: "/models/flux-1-schnell",
  },
} satisfies Record<string, RelatedModel>;

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
    relatedModel: models.wan26,
  },
  {
    title: "Batch Processing 10,000 Images with FLUX.1 Schnell",
    description:
      "A practical walkthrough of high-throughput image generation — queue design, concurrency tuning, error handling, and cost optimization at scale.",
    date: "2026-03-18",
    readTime: "7 min read",
    slug: "batch-processing-flux-schnell",
    tags: ["flux", "image-generation", "guide", "api"],
    image: slides[2],
    relatedModel: models.fluxSchnell,
  },
  {
    title: "Building a Real-Time AI Video Pipeline with WebSockets",
    description:
      "How to stream AI-generated video frames to the browser in real time — protocol choice, buffering strategy, and latency optimization.",
    date: "2026-03-12",
    readTime: "11 min read",
    slug: "real-time-video-pipeline-websockets",
    tags: ["video-generation", "guide", "infrastructure"],
    image: slides[4],
  },
];

export const allTags = [
  "All",
  "wan",
  "flux",
  "video-generation",
  "image-generation",
  "guide",
  "api",
  "infrastructure",
];

export function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

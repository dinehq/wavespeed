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
];

export const allTags = ["All", "wan", "video-generation", "guide", "api"];

export function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

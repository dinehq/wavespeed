"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import SearchIcon from "@/images/search-icon.svg";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import ArrowRight from "@/images/arrow-right.svg";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const slides = [slide1, slide2, slide3, slide4, slide5];

/* ================================================================== */
/*  Blog post data                                                     */
/* ================================================================== */

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  image: StaticImageData;
}

const posts: BlogPost[] = [
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

const allTags = [
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

const POSTS_PER_PAGE = 12;

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = activeTag === "All" || p.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-12 pb-8 md:px-12 md:pt-20 md:pb-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <h1 className="font-display text-heading text-4xl leading-none font-bold tracking-tighter sm:text-5xl md:text-6xl">
                WaveSpeed Blog
              </h1>
              <p className="text-foreground/60 font-mono text-sm text-pretty md:text-base">
                Latest news on AI image and video generation models —
                engineering updates, product launches, tutorials, and deep
                dives.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/wavaboratory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="text-foreground/40 hover:text-foreground flex size-9 items-center justify-center rounded-xs transition-colors duration-150"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/wavespeed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord"
                className="text-foreground/40 hover:text-foreground flex size-9 items-center justify-center rounded-xs transition-colors duration-150"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Tags */}
      <section className="px-6 pb-8 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="scrollbar-none -mx-6 flex items-center gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
            <div className="bg-surface flex shrink-0 items-center gap-1.5 rounded-xs px-2.5 py-1.5">
              <SearchIcon className="shrink-0 opacity-40" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="text-foreground placeholder:text-foreground/30 w-28 bg-transparent font-mono text-xs outline-none"
              />
            </div>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`shrink-0 cursor-pointer rounded-xs px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
                  activeTag === tag
                    ? "bg-foreground text-background"
                    : "bg-surface text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {tag === "All" ? "All Posts" : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post Grid */}
      {paginated.length > 0 && (
        <section className="px-6 pb-16 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/posts/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xs"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-xs bg-white/20 px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-heading font-display group-hover:text-foreground/70 text-lg leading-snug font-medium transition-colors duration-150">
                      {post.title}
                    </h3>
                    <p className="text-foreground/60 line-clamp-2 text-sm">
                      {post.description}
                    </p>
                    <div className="text-foreground/40 mt-auto flex items-center gap-3 pt-2 font-mono text-xs">
                      <time>{formatDate(post.date)}</time>
                      <span className="bg-foreground/20 size-1 rounded-full" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-foreground/40 hover:text-foreground disabled:text-foreground/10 flex size-9 cursor-pointer items-center justify-center rounded-xs font-mono text-sm transition-colors duration-150 disabled:cursor-not-allowed"
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 4L6 8L10 12" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex size-9 cursor-pointer items-center justify-center rounded-xs font-mono text-sm transition-colors duration-150 ${
                        currentPage === page
                          ? "bg-foreground text-background"
                          : "text-foreground/60 hover:bg-surface"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="text-foreground/40 hover:text-foreground disabled:text-foreground/10 flex size-9 cursor-pointer items-center justify-center rounded-xs font-mono text-sm transition-colors duration-150 disabled:cursor-not-allowed"
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4L10 8L6 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-surface px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
            Subscribe to Our Blog
          </h2>
          <p className="text-foreground/60 max-w-md font-mono text-sm text-pretty">
            Weekly AI insights, tutorials, and model updates delivered to your
            inbox.
          </p>
          <div className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="border-foreground/10 bg-background text-foreground placeholder:text-foreground/30 focus:border-foreground/30 h-11 flex-1 rounded-xs border px-4 font-mono text-sm transition-colors duration-150 outline-none"
            />
            <button className="bg-foreground text-background hover:bg-foreground/80 tracking-xl shrink-0 cursor-pointer rounded-xs px-6 py-2.5 font-mono text-sm font-bold uppercase transition-colors duration-150">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner>
        <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
          Ready to Build with AI?
        </h2>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            href="/models"
            className="flex items-center gap-3 rounded-xs bg-black px-8 py-4 whitespace-nowrap text-white transition-colors duration-150 hover:bg-black/80"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              Explore Models
            </span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center rounded-xs border border-black/20 px-8 py-4 whitespace-nowrap text-black transition-colors duration-150 hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              View Docs
            </span>
          </Link>
        </div>
      </CTABanner>

      <Footer />
    </main>
  );
}

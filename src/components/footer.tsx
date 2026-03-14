"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import Logo from "@/images/logo.svg";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
const useMounted = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Pricing", href: "/pricing" },
  { name: "Enterprise", href: "/enterprise" },
];

const resourceLinks = [
  { name: "Studio", href: "/studio" },
  { name: "Desktop App", href: "/download" },
  { name: "Doc", href: "/docs" },
  { name: "Contact Sales", href: "/contact" },
  { name: "Support", href: "/support" },
  { name: "Affiliate", href: "/affiliate" },
  { name: "Inspiration", href: "/inspiration" },
  { name: "Blog", href: "/blog" },
  { name: "Be a Creator", href: "/creators" },
  { name: "GitHub", href: "/github" },
];

const modelLinks = [
  { name: "Qwen Image 2", href: "/models/qwen-image-2" },
  { name: "Grok", href: "/models/grok" },
  { name: "Seedance 1.5 Pro", href: "/models/seedance-1-5-pro" },
  { name: "Wan 2.6", href: "/models/wan-2-6" },
  { name: "Kling O3", href: "/models/kling-o3" },
  { name: "OpenAI", href: "/models/openai" },
  { name: "Wan 2.5", href: "/models/wan-2-5" },
  { name: "Seedream AI", href: "/models/seedream" },
  { name: "Wan 2.2", href: "/models/wan-2-2" },
  { name: "Dreamina AI", href: "/models/dreamina" },
  { name: "Seedance Video", href: "/models/seedance-video" },
  { name: "Flux Image", href: "/models/flux-image" },
  { name: "Minimax Hailuo", href: "/models/minimax-hailuo" },
  { name: "Kling", href: "/models/kling" },
  { name: "Google", href: "/models/google" },
  { name: "Flux Kontext", href: "/models/flux-kontext" },
  { name: "Runwayml AI", href: "/models/runwayml" },
  { name: "Wan 2.1 Video", href: "/models/wan-2-1-video" },
  { name: "Hunyuan", href: "/models/hunyuan" },
  { name: "Vidu", href: "/models/vidu" },
  { name: "Qwen AI", href: "/models/qwen" },
  { name: "Pixverse AI", href: "/models/pixverse" },
];

const toolLinks = [
  { name: "Object Detection & Segmentation", href: "/tools/object-detection" },
  { name: "Content Detection", href: "/tools/content-detection" },
  { name: "Motion Control", href: "/tools/motion-control" },
  { name: "Best Video Models", href: "/tools/best-video" },
  { name: "Best Image Models", href: "/tools/best-image" },
  { name: "Swap Anything", href: "/tools/swap-anything" },
  { name: "Audio for Video", href: "/tools/audio-for-video" },
  { name: "Video Edit", href: "/tools/video-edit" },
  { name: "Ultra Selection", href: "/tools/ultra-selection" },
  { name: "LoRA Generation", href: "/tools/lora-generation" },
  { name: "Generate Music", href: "/tools/generate-music" },
  { name: "First & Last Frame Video", href: "/tools/first-last-frame" },
  { name: "Remove Anything", href: "/tools/remove-anything" },
  { name: "3D Creation", href: "/tools/3d-creation" },
  { name: "Avatar Lipsync", href: "/tools/avatar-lipsync" },
  { name: "Training Tools", href: "/tools/training" },
  { name: "Enhance Videos", href: "/tools/enhance-videos" },
  { name: "Image Editing", href: "/tools/image-editing" },
  { name: "Upscale Image", href: "/tools/upscale-image" },
  { name: "Speech Generation", href: "/tools/speech-generation" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Security", href: "/security" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="tracking-xl font-mono text-xs text-white/30 uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="font-mono text-xs leading-5 text-white/60 transition-colors hover:text-white"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function FooterColumnContinuation({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 pt-6">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="font-mono text-xs leading-5 text-white/60 transition-colors hover:text-white"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

const modelLinksA = modelLinks.slice(0, 11);
const modelLinksB = modelLinks.slice(11);
const toolLinksA = toolLinks.slice(0, 10);
const toolLinksB = toolLinks.slice(10);

export function Footer() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <footer className="bg-dark border-t border-white/10 px-6 py-12 md:px-12 md:py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-6">
            <Link href="/" className="whitespace-nowrap">
              <Logo className="h-5 w-auto text-white transition-opacity hover:opacity-80" />
            </Link>
            <a
              href="https://status.wavespeed.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 whitespace-nowrap"
            >
              <span className="size-2 shrink-0 rounded-full bg-green-400" />
              <span className="tracking-lg font-mono text-xs leading-4 text-white/40 uppercase transition-colors group-hover:text-white">
                All Service Online
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            <div className="flex flex-col gap-8">
              <FooterColumn title="Navigation" links={navLinks} />
              <FooterColumn title="Legal" links={legalLinks} />
            </div>
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Models" links={modelLinksA} />
            <FooterColumnContinuation links={modelLinksB} />
            <FooterColumn title="Tools" links={toolLinksA} />
            <FooterColumnContinuation links={toolLinksB} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:gap-0">
          <p className="tracking-lg font-mono text-xs leading-4 text-pretty text-white/40 uppercase">
            &copy; 2026 WAVESPEED
          </p>
          <div className="flex items-center gap-6">
            <button
              aria-label="Toggle theme"
              onClick={() =>
                setTheme(
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                      ? "system"
                      : "light",
                )
              }
              className="tracking-lg flex cursor-pointer items-center gap-1.5 font-mono text-xs text-white/40 uppercase transition-colors hover:text-white"
            >
              {mounted && theme === "dark" ? (
                <>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path
                      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                      fill="currentColor"
                      stroke="none"
                    />
                    <line x1="19" y1="2" x2="19" y2="5" />
                    <line x1="17.5" y1="3.5" x2="20.5" y2="3.5" />
                  </svg>
                  Dark
                </>
              ) : mounted && theme === "light" ? (
                <>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="5" stroke="none" />
                    <line x1="12" y1="1" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="23" />
                    <line x1="1" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      fill="currentColor"
                      stroke="none"
                    />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  System
                </>
              )}
            </button>
            <a
              href="#"
              aria-label="GitHub"
              className="text-white/40 transition-colors hover:text-white"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Discord"
              className="text-white/40 transition-colors hover:text-white"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.046.046 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.01-.05.051.051 0 00-.018-.011 8.875 8.875 0 01-1.248-.595.05.05 0 01-.005-.084c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007c.08.066.164.132.248.195a.05.05 0 01-.004.084c-.399.232-.813.43-1.249.596a.05.05 0 00-.028.06c.24.469.514.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019zM5.347 10.2c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="X"
              className="text-white/40 transition-colors hover:text-white"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

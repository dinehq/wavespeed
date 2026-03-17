"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const BG_PRESETS = [
  { key: "slide-1", src: slide1 },
  { key: "slide-2", src: slide2 },
  { key: "slide-3", src: slide3 },
  { key: "slide-4", src: slide4 },
  { key: "slide-5", src: slide5 },
];

// ─── Types ───────────────────────────────────────────────

type Platform =
  | "twitter"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "instagram"
  | "discord";
type AssetType = "avatar" | "banner" | "post";
type LogoVariant = "logo" | "logotype" | "lockup";

type GradientTheme = {
  name: string;
  from: string;
  to: string;
  textColor: string;
  accent: string;
};

type BrandConfig = {
  platform: Platform;
  assetType: AssetType;
  logoVariant: LogoVariant;
  theme: GradientTheme;
  headline: string;
  subheadline: string;
  body: string;
  backgroundImage: string | null;
  showCodeOverlay: boolean;
  codeOverlayOpacity: number;
  codeOverlayText: string;
  logoColor: string;
  avatarBg: string;
};

// ─── Constants ───────────────────────────────────────────

const PLATFORMS: {
  key: Platform;
  label: string;
  banner: [number, number];
  post: [number, number];
}[] = [
  {
    key: "twitter",
    label: "Twitter / X",
    banner: [1500, 500],
    post: [1200, 675],
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    banner: [1584, 396],
    post: [1200, 627],
  },
  {
    key: "youtube",
    label: "YouTube",
    banner: [2560, 1440],
    post: [1280, 720],
  },
  {
    key: "facebook",
    label: "Facebook",
    banner: [820, 312],
    post: [1200, 630],
  },
  {
    key: "instagram",
    label: "Instagram",
    banner: [1080, 1080],
    post: [1080, 1350],
  },
  {
    key: "discord",
    label: "Discord",
    banner: [960, 540],
    post: [800, 600],
  },
];

const GRADIENT_PRESETS: GradientTheme[] = [
  {
    name: "Blue",
    from: "#f0f7ff",
    to: "#207fdb",
    textColor: "#0f172a",
    accent: "#207fdb",
  },
  {
    name: "Green",
    from: "#f0fff8",
    to: "#26f9a8",
    textColor: "#0f172a",
    accent: "#26f9a8",
  },
  {
    name: "Purple",
    from: "#fdf0ff",
    to: "#ea5aff",
    textColor: "#0f172a",
    accent: "#ea5aff",
  },
  {
    name: "Orange",
    from: "#fff7f0",
    to: "#ffa442",
    textColor: "#0f172a",
    accent: "#ffa442",
  },
  {
    name: "Rose",
    from: "#fff0f3",
    to: "#e11d48",
    textColor: "#0f172a",
    accent: "#e11d48",
  },
  {
    name: "Teal",
    from: "#f0fdfa",
    to: "#0d9488",
    textColor: "#0f172a",
    accent: "#0d9488",
  },
  {
    name: "Indigo",
    from: "#eef2ff",
    to: "#4f46e5",
    textColor: "#0f172a",
    accent: "#4f46e5",
  },
  {
    name: "White",
    from: "#ffffff",
    to: "#ffffff",
    textColor: "#0f172a",
    accent: "#c0c0c0",
  },
  {
    name: "Light",
    from: "#f5f5f7",
    to: "#f5f5f7",
    textColor: "#0f172a",
    accent: "#a0a0a0",
  },
  {
    name: "Black",
    from: "#000000",
    to: "#000000",
    textColor: "#ffffff",
    accent: "#333333",
  },
];

const DEFAULT_CODE_OVERLAY = `import wavespeed from 'wavespeed';
import { Client } from 'wavespeed';

// Quick start — run a model
wavespeed.run("wavespeed-ai/flux-dev", {
  prompt: "A cat wearing a space suit"
})
.then(output => {
  console.log(output["outputs"][0]);
});

// Authentication
const client = new Client("your-api-key", {
  maxRetries: 3,
  maxConnectionRetries: 5,
  retryInterval: 1.0
});

// Sync mode — no polling, faster
wavespeed.run("wavespeed-ai/flux-dev", {
  prompt: "Ocean waves at sunset"
}, {
  enableSyncMode: true,
  timeout: 36000,
  pollInterval: 1.0
})
.then(output => console.log(output));

// File upload
wavespeed.upload("/path/to/image.png")
.then(url => {
  console.log(url);
});

// Run with uploaded file
client.run("wavespeed-ai/wan", {
  prompt: "A cinematic portrait",
  image: url,
  width: 1024,
  height: 1024,
  steps: 28,
  guidance: 3.5
})
.then(result => {
  console.log(result["outputs"][0]);
});`;

const LOGO_PATHS: Record<LogoVariant, string> = {
  logo: "/logo/icon.svg",
  logotype: "/logo/wordmark.svg",
  lockup: "/logo/lockup.svg",
};

const DEFAULT_CONFIG: BrandConfig = {
  platform: "twitter",
  assetType: "post",
  logoVariant: "logo",
  theme: GRADIENT_PRESETS[0],
  headline: "Nano Banana 2",
  subheadline: "Promotion",
  body: "25% off during Mar.13 - 26 (UTC+8)",
  backgroundImage: null,
  showCodeOverlay: true,
  codeOverlayOpacity: 0.2,
  codeOverlayText: DEFAULT_CODE_OVERLAY,
  logoColor: "#000000",
  avatarBg: "#ffffff",
};

// ─── Glitch Utility ──────────────────────────────────────

const G = {
  blocks: ["\u2591", "\u2592", "\u2593"] as const, // ░▒▓
  symbols: "\u25C8\u29C9\u25E4\u25E5\u2726\u25CF",
  bars: "\u2500\u2501\u2502\u2503\u2504",
};

function randBlock(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++)
    s += G.blocks[Math.floor(Math.random() * G.blocks.length)];
  return s;
}

function glitchCode(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (!line.trim()) {
      result.push(line);
      continue;
    }

    // ~8% chance: replace entire line with a decorative bar
    if (Math.random() < 0.08) {
      const barChar = G.bars[Math.floor(Math.random() * G.bars.length)];
      const indent = line.match(/^(\s*)/)?.[1] ?? "";
      const len = Math.floor(Math.random() * 20) + 10;
      result.push(indent + "// " + barChar.repeat(len));
      result.push(line); // keep original below
      continue;
    }

    // ~5% chance: redact most of the line
    if (Math.random() < 0.05) {
      const indent = line.match(/^(\s*)/)?.[1] ?? "";
      result.push(indent + randBlock(line.trim().length));
      continue;
    }

    // Token-level glitching — lower rate, more variety
    const glitched = line.replace(
      /("[^"]*")|('[^']*')|(\d+\.?\d*)|([a-zA-Z_]\w*)/g,
      (match, str, str2, num, ident) => {
        if (str || str2) {
          // Strings: ~10% chance to partially corrupt contents
          if (Math.random() < 0.1) {
            const inner = match.slice(1, -1);
            const q = match[0];
            const keep = Math.max(1, Math.floor(inner.length * 0.5));
            return (
              q + inner.slice(0, keep) + randBlock(inner.length - keep) + q
            );
          }
          return match;
        }
        if (num) {
          // Numbers: ~8% chance to replace with blocks
          return Math.random() < 0.08 ? randBlock(match.length) : match;
        }
        if (ident) {
          const roll = Math.random();
          if (roll < 0.12) return randBlock(match.length);
          if (roll < 0.18) {
            const keep = Math.max(1, Math.floor(match.length * 0.5));
            return match.slice(0, keep) + randBlock(match.length - keep);
          }
          return match;
        }
        return match;
      },
    );

    // ~6% chance: append a symbol
    if (Math.random() < 0.06) {
      const sym = G.symbols[Math.floor(Math.random() * G.symbols.length)];
      result.push(glitched + " " + sym);
    } else {
      result.push(glitched);
    }
  }

  return result.join("\n");
}

// ─── SVG Utility ─────────────────────────────────────────

async function loadSvgAsImage(
  path: string,
  fillColor: string,
): Promise<HTMLImageElement> {
  const res = await fetch(path);
  let svgText = await res.text();
  svgText = svgText.replace(/fill="black"/g, `fill="${fillColor}"`);
  // Remove intrinsic width/height so browser rasterizes from viewBox at draw size
  svgText = svgText.replace(/\s*width="[\d.]+"/, "");
  svgText = svgText.replace(/\s*height="[\d.]+"/, "");
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

/** Rasterize an SVG image onto a canvas at exact target dimensions for crisp rendering */
function rasterizeLogo(
  svgImg: HTMLImageElement,
  targetW: number,
  targetH: number,
): HTMLCanvasElement {
  // Render at 2x target for retina-quality downscaling
  const scale = 2;
  const c = document.createElement("canvas");
  c.width = Math.round(targetW * scale);
  c.height = Math.round(targetH * scale);
  const cx = c.getContext("2d")!;
  cx.imageSmoothingEnabled = true;
  cx.imageSmoothingQuality = "high";
  cx.drawImage(svgImg, 0, 0, c.width, c.height);
  return c;
}

// ─── Canvas Rendering ────────────────────────────────────

function getSize(config: BrandConfig): [number, number] {
  if (config.assetType === "avatar") return [1024, 1024];
  const platform = PLATFORMS.find((p) => p.key === config.platform)!;
  return config.assetType === "post" ? platform.post : platform.banner;
}

function getFonts() {
  // Next.js font variables are set on <body> via className, not on <html>
  const style = getComputedStyle(document.body);
  const azeret = style.getPropertyValue("--font-azeret").trim() || "sans-serif";
  const sans =
    style.getPropertyValue("--font-geist-sans").trim() || "sans-serif";
  const mono =
    style.getPropertyValue("--font-geist-mono").trim() || "monospace";
  return { azeret, sans, mono };
}

/** Word-wrap text to fit within maxWidth, respecting explicit \n line breaks */
function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const result: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (!paragraph) {
      result.push("");
      continue;
    }
    const words = paragraph.split(/\s+/);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        result.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) result.push(line);
  }
  return result;
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  config: BrandConfig,
  logoImg: HTMLImageElement | null,
  bgImg: HTMLImageElement | null,
  scale = 1,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const [w, h] = getSize(config);
  canvas.width = w * scale;
  canvas.height = h * scale;
  ctx.scale(scale, scale);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const fonts = getFonts();

  if (config.assetType !== "avatar") {
    // 8pt grid — snap all layout values to multiples of 8
    const g = (v: number) => Math.round(v / 8) * 8;
    const isVertical = w <= h; // vertical/square vs landscape

    const pad = g(Math.max(32, (isVertical ? w : h) * 0.07));
    const logoH = g(Math.max(32, (isVertical ? w : h) * 0.065));
    // Font sizes use Math.round instead of grid snap for sharper rendering
    const headlineSize = Math.round(
      Math.max(24, (isVertical ? w : h) * (isVertical ? 0.07 : 0.09)),
    );
    const headlineLineH = Math.round(headlineSize * 1.2);
    const subSize = Math.round(Math.max(16, (isVertical ? w : h) * 0.035));
    const codeSize = Math.round(Math.max(16, (isVertical ? w : h) * 0.03));
    const codeLineH = Math.max(codeSize + 4, Math.round(codeSize * 1.2));

    // Layer 1: background gradient — `from` holds then transitions to `to`
    {
      const grad = isVertical
        ? ctx.createLinearGradient(0, 0, 0, h)
        : ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, config.theme.from);
      // grad.addColorStop(0.45, config.theme.from);
      // grad.addColorStop(0.95, config.theme.to);
      grad.addColorStop(1, config.theme.to);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Layer 2: image with alpha mask — feather on left edge always
    if (bgImg) {
      // Image area: 3:2 for landscape, 16:9 for vertical
      let targetW: number, targetH: number;
      if (isVertical) {
        targetW = g(w - pad * 2);
        targetH = g(targetW * (9 / 16));
      } else {
        targetW = g(w * 0.5);
        targetH = g(targetW * (2 / 3));
        // Clamp to canvas height minus padding
        if (targetH > h - pad * 2) {
          targetH = g(h - pad * 2);
          targetW = g(targetH * (3 / 2));
        }
      }
      const targetX = isVertical ? pad : g(w - targetW - pad);
      const targetY = isVertical ? g(h - targetH - pad) : pad;
      const imgRatio = bgImg.naturalWidth / bgImg.naturalHeight;
      const areaRatio = targetW / targetH;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (imgRatio > areaRatio) {
        drawH = targetH;
        drawW = targetH * imgRatio;
        drawX = targetX + (targetW - drawW) / 2;
        drawY = targetY;
      } else {
        drawW = targetW;
        drawH = targetW / imgRatio;
        drawX = targetX;
        drawY = targetY + (targetH - drawH) / 2;
      }

      const oc = document.createElement("canvas");
      oc.width = w;
      oc.height = h;
      const ox = oc.getContext("2d")!;

      ox.beginPath();
      ox.rect(targetX, targetY, targetW, targetH);
      ox.clip();
      ox.drawImage(bgImg, drawX, drawY, drawW, drawH);

      // Left edge feather for both layouts
      ox.globalCompositeOperation = "destination-in";
      const edge = g(targetW * 0.5);
      const m = ox.createLinearGradient(targetX, 0, targetX + edge, 0);
      m.addColorStop(0, "rgba(0,0,0,0)");
      m.addColorStop(1, "rgba(0,0,0,1)");
      ox.fillStyle = m;
      ox.fillRect(0, 0, w, h);

      ctx.drawImage(oc, 0, 0);
    }

    // ── Compute text block metrics (needed for code overlay clipping) ──
    const maxTextW = w - pad * 2;

    const subLines = config.subheadline
      ? config.subheadline.split("\n").map((l) => l.toUpperCase())
      : [];
    const subLineH = Math.round(subSize * 1.4);
    const subBlockH = subLines.length * subLineH;
    const subGap = subLines.length > 0 ? 4 : 0;

    ctx.font = `700 ${headlineSize}px ${fonts.azeret}`;
    if ("letterSpacing" in ctx) {
      (ctx as unknown as Record<string, string>).letterSpacing = "-0.6px";
    }
    const headlineLines = config.headline
      ? wrapLines(ctx, config.headline, maxTextW)
      : [];
    if ("letterSpacing" in ctx) {
      (ctx as unknown as Record<string, string>).letterSpacing = "0px";
    }
    const headlineBlockH = headlineLines.length * headlineLineH;

    const bodySize = Math.round(Math.max(16, subSize * 1.3));
    const bodyLineH = Math.round(bodySize * 1.5);
    ctx.font = `400 ${bodySize}px ${fonts.sans}`;
    const bodyLines =
      config.assetType === "post" && config.body
        ? wrapLines(ctx, config.body, maxTextW)
        : [];
    const bodyBlockH = bodyLines.length * bodyLineH;
    const bodyGap = bodyLines.length > 0 ? 16 : 0;

    const totalBlockH =
      subBlockH + subGap + headlineBlockH + bodyGap + bodyBlockH;

    let blockY: number;
    if (isVertical) {
      blockY = pad * 2 + logoH;
    } else {
      const lastFontSize = bodyLines.length > 0 ? bodySize : headlineSize;
      blockY = Math.round(h - pad - totalBlockH - lastFontSize * 0.3);
    }

    // Layer 3: code overlay — fades on all edges
    if (config.showCodeOverlay && config.codeOverlayText) {
      const codeLines = config.codeOverlayText.split("\n");
      const codeX = isVertical ? g(w * 0.43) : pad;
      const codeY = isVertical ? pad : g(h * 0.33);

      // Draw code onto a temp canvas, then apply edge fades
      const cc = document.createElement("canvas");
      cc.width = w;
      cc.height = h;
      const cx2 = cc.getContext("2d")!;

      cx2.fillStyle =
        config.theme.from === config.theme.to
          ? config.theme.textColor
          : config.theme.to;
      cx2.font = `${codeSize}px ${fonts.mono}`;

      let y = codeY;
      let lineIdx = 0;
      while (y < h + codeLineH * 4) {
        cx2.fillText(codeLines[lineIdx % codeLines.length], codeX, y);
        y += codeLineH;
        lineIdx++;
      }

      // Fade bottom — accelerate near text block
      cx2.globalCompositeOperation = "destination-in";
      const fadeBottom = cx2.createLinearGradient(0, blockY - pad * 2, 0, h);
      fadeBottom.addColorStop(0, "rgba(0,0,0,1)");
      fadeBottom.addColorStop(0.3, "rgba(0,0,0,0.3)");
      fadeBottom.addColorStop(1, "rgba(0,0,0,0)");
      cx2.fillStyle = fadeBottom;
      cx2.fillRect(0, 0, w, h);

      // Fade right
      const fadeRight = cx2.createLinearGradient(w * 0.6, 0, w, 0);
      fadeRight.addColorStop(0, "rgba(0,0,0,1)");
      fadeRight.addColorStop(1, "rgba(0,0,0,0)");
      cx2.fillStyle = fadeRight;
      cx2.fillRect(0, 0, w, h);

      // Composite onto main canvas at configured opacity
      ctx.save();
      ctx.globalAlpha = config.codeOverlayOpacity;
      ctx.drawImage(cc, 0, 0);
      ctx.restore();
    }

    // Layer 4: Logo (top-left) — rasterized at exact target size
    if (logoImg) {
      const logoW = Math.round(
        logoH * (logoImg.naturalWidth / logoImg.naturalHeight),
      );
      const rLogo = rasterizeLogo(logoImg, logoW, logoH);
      ctx.drawImage(rLogo, pad, pad, logoW, logoH);
    }

    // Layer 5 + 6: Subheadline (above) → Headline → Body (below, post only)
    {
      let cursorY = blockY;

      // Overline / subheadline (above headline, uppercase)
      if (config.subheadline) {
        ctx.fillStyle = config.theme.textColor;
        ctx.font = `500 ${subSize}px ${fonts.azeret}`;
        ctx.globalAlpha = 0.5;
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "1px";
        }
        for (let i = 0; i < subLines.length; i++) {
          ctx.fillText(subLines[i], pad, cursorY + subLineH);
          cursorY += subLineH;
        }
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "0px";
        }
        cursorY += subGap;
        ctx.globalAlpha = 1;
      }

      // Headline
      if (config.headline) {
        ctx.fillStyle = config.theme.textColor;
        ctx.font = `700 ${headlineSize}px ${fonts.azeret}`;
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "-0.6px";
        }
        for (let i = 0; i < headlineLines.length; i++) {
          ctx.fillText(headlineLines[i], pad, cursorY + headlineLineH);
          cursorY += headlineLineH;
        }
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "0px";
        }
      }

      // Body text (post only, below headline)
      if (bodyLines.length > 0) {
        cursorY += bodyGap;
        ctx.fillStyle = config.theme.textColor;
        ctx.font = `400 ${bodySize}px ${fonts.sans}`;
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < bodyLines.length; i++) {
          ctx.fillText(bodyLines[i], pad, cursorY + bodyLineH);
          cursorY += bodyLineH;
        }
        ctx.globalAlpha = 1;
      }
    }
  } else {
    // Avatar: solid color background
    ctx.fillStyle = config.avatarBg;
    ctx.fillRect(0, 0, w, h);

    // Centered logo, 8pt grid
    if (logoImg) {
      const g = (v: number) => Math.round(v / 8) * 8;
      const ratio = logoImg.naturalWidth / logoImg.naturalHeight;
      const isIcon = config.logoVariant === "logo";
      // Icon: 60% of canvas. Wide logos (lockup/wordmark): 80% width
      const maxW = g(w * (isIcon ? 0.75 : 0.8));
      const maxH = g(h * (isIcon ? 0.75 : 0.6));
      let logoW: number, logoH: number;
      if (ratio > 1) {
        logoW = maxW;
        logoH = g(maxW / ratio);
        // Clamp height so it doesn't get too tall
        if (logoH > maxH) {
          logoH = maxH;
          logoW = g(maxH * ratio);
        }
      } else {
        logoH = maxH;
        logoW = g(maxH * ratio);
      }
      const x = g((w - logoW) / 2 - (isIcon ? w * 0.01 : 0));
      const y = g((h - logoH) / 2 + (isIcon ? h * 0.02 : 0));
      const rLogo = rasterizeLogo(logoImg, logoW, logoH);
      ctx.drawImage(rLogo, x, y, logoW, logoH);
    }
  }
}

// ─── UI Components ───────────────────────────────────────

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-foreground/60 flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase">
        {label}
        {optional && (
          <span className="text-foreground/30 tracking-normal normal-case">
            Optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="border-foreground/10 bg-surface text-foreground placeholder:text-foreground/30 focus:border-brand resize-none rounded-xs border px-3 py-2 font-mono text-sm transition-colors outline-none"
    />
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="size-8 shrink-0 cursor-pointer rounded-xs border-none bg-transparent"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-foreground/10 bg-surface text-foreground focus:border-brand w-full rounded-xs border px-3 py-2 font-mono text-sm transition-colors outline-none"
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
        checked ? "bg-brand" : "bg-foreground/20"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────

export default function AdminBrandPage() {
  const [config, setConfig] = useState<BrandConfig>(DEFAULT_CONFIG);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback((partial: Partial<BrandConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
    if ("backgroundImage" in partial && !partial.backgroundImage) {
      setBgImg(null);
    }
  }, []);

  // Wait for fonts — ensure Azeret is actually loaded before drawing
  useEffect(() => {
    async function waitForFonts() {
      await document.fonts.ready;
      // Force-load Azeret at both weights used in canvas
      const { azeret } = getFonts();
      await Promise.all([
        document.fonts.load(`500 48px ${azeret}`),
        document.fonts.load(`700 48px ${azeret}`),
      ]);
      setFontsReady(true);
    }
    waitForFonts();
  }, []);

  // Load logo SVG
  useEffect(() => {
    const variant =
      config.assetType === "avatar" ? config.logoVariant : "lockup";
    const color =
      config.assetType === "avatar" ? config.logoColor : config.theme.textColor;
    loadSvgAsImage(LOGO_PATHS[variant], color)
      .then(setLogoImg)
      .catch(() => setLogoImg(null));
  }, [
    config.logoVariant,
    config.logoColor,
    config.assetType,
    config.theme.textColor,
  ]);

  // Load background image
  useEffect(() => {
    if (!config.backgroundImage) return;
    const img = new Image();
    img.onload = () => setBgImg(img);
    img.onerror = () => setBgImg(null);
    img.src = config.backgroundImage;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [config.backgroundImage]);

  // Draw canvas
  useEffect(() => {
    if (!fontsReady) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (canvasRef.current) {
        renderCanvas(canvasRef.current, config, logoImg, bgImg);
      }
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [config, logoImg, bgImg, fontsReady]);

  // Export single PNG at 2x
  const handleExport = useCallback(() => {
    const tempCanvas = document.createElement("canvas");
    renderCanvas(tempCanvas, config, logoImg, bgImg, 2);
    tempCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        config.assetType === "avatar"
          ? "wavespeed-avatar@2x.png"
          : `wavespeed-${config.platform}-${config.assetType}@2x.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [config, logoImg, bgImg]);

  // Export all platforms
  const handleExportAll = useCallback(async () => {
    setDownloading(true);
    const tempCanvas = document.createElement("canvas");
    for (const platform of PLATFORMS) {
      const tempConfig = { ...config, platform: platform.key };
      renderCanvas(tempCanvas, tempConfig, logoImg, bgImg, 2);
      await new Promise<void>((resolve) => {
        tempCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `wavespeed-${platform.key}-${config.assetType}@2x.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
          resolve();
        }, "image/png");
      });
      await new Promise((r) => setTimeout(r, 300));
    }
    setDownloading(false);
  }, [config, logoImg, bgImg]);

  // Download logo variant with safe boundary box
  const handleLogoDownload = useCallback(
    async (variant: LogoVariant, format: "png" | "svg") => {
      if (format === "svg") {
        const res = await fetch(LOGO_PATHS[variant]);
        let svgText = await res.text();
        svgText = svgText.replace(
          /fill="black"/g,
          `fill="${config.logoColor}"`,
        );
        const blob = new Blob([svgText], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wavespeed-${variant}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      const img = await loadSvgAsImage(LOGO_PATHS[variant], config.logoColor);

      const baseW = variant === "logo" ? 512 : 1024;
      const ratio = img.naturalWidth / img.naturalHeight;
      const logoW = baseW;
      const logoH = Math.round(baseW / ratio);

      const safeZone = Math.round(logoH * 0.5);
      const canvasW = logoW + safeZone * 2;
      const canvasH = logoH + safeZone * 2;

      const c = document.createElement("canvas");
      c.width = canvasW;
      c.height = canvasH;
      const cx = c.getContext("2d")!;

      const rLogo = rasterizeLogo(img, logoW, logoH);
      cx.drawImage(rLogo, safeZone, safeZone, logoW, logoH);

      c.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wavespeed-${variant}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    },
    [config.logoColor],
  );

  // Handle image upload
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () =>
        update({ backgroundImage: reader.result as string });
      reader.readAsDataURL(file);
    },
    [update],
  );

  const [w, h] = getSize(config);
  const maxPreviewW = 640;
  const maxPreviewH = config.assetType === "avatar" ? 400 : 480;
  const scale = Math.min(maxPreviewW / w, maxPreviewH / h);
  const previewWidth = Math.round(w * scale);
  const previewHeight = Math.round(h * scale);

  const currentPlatform = PLATFORMS.find((p) => p.key === config.platform)!;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-foreground/40 hover:text-foreground/60 mb-2 inline-block font-mono text-xs transition-colors"
          >
            &larr; Back
          </Link>
          <h1 className="text-foreground font-display text-2xl font-bold tracking-tighter">
            Brand Assets
          </h1>
          <p className="text-foreground/50 mt-1 text-sm">
            Generate social media avatars, banners, and posts.
          </p>
        </div>

        <div className="flex items-start gap-10">
          {/* ─── Controls ─── */}
          <div className="flex-1 space-y-4">
            <div className="border-foreground/10 divide-foreground/10 divide-y rounded-md border">
              {/* Asset Type + Platform */}
              <div className="space-y-4 p-5">
                <Field label="Asset Type">
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["avatar", "banner", "post"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          const updates: Partial<BrandConfig> = {
                            assetType: type,
                          };
                          if (type === "post") {
                            updates.headline = "Nano Banana 2";
                            updates.subheadline = "Promotion";
                            updates.body = "25% off during Mar.13 - 26 (UTC+8)";
                          } else if (type === "banner") {
                            updates.headline =
                              "Ultimate AI Media\nGeneration Platform";
                            updates.subheadline = "";
                            updates.body = "";
                          }
                          update(updates);
                        }}
                        className={`cursor-pointer rounded-xs border px-3 py-2 font-mono text-xs capitalize transition-colors ${
                          config.assetType === type
                            ? "border-brand bg-brand/10 text-brand"
                            : "border-foreground/10 hover:border-foreground/30 text-foreground/60"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </Field>

                {config.assetType !== "avatar" && (
                  <Field label="Platform">
                    <div className="grid grid-cols-3 gap-1.5">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p.key}
                          onClick={() => update({ platform: p.key })}
                          className={`cursor-pointer rounded-xs border px-3 py-2 font-mono text-xs transition-colors ${
                            config.platform === p.key
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-foreground/10 hover:border-foreground/30 text-foreground/60"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                )}
              </div>

              {/* Avatar: Logo + Style combos */}
              {config.assetType === "avatar" && (
                <div className="space-y-4 p-5">
                  <Field label="Logo">
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["logo", "logotype", "lockup"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => update({ logoVariant: v })}
                          className={`cursor-pointer rounded-xs border px-3 py-2 font-mono text-xs transition-colors ${
                            config.logoVariant === v
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-foreground/10 hover:border-foreground/30 text-foreground/60"
                          }`}
                        >
                          {v === "logo"
                            ? "Icon"
                            : v === "logotype"
                              ? "Wordmark"
                              : "Lockup"}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Style">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        {
                          label: "Light",
                          bg: "#ffffff",
                          logo: "#000000",
                        },
                        {
                          label: "Dark",
                          bg: "#000000",
                          logo: "#ffffff",
                        },
                        {
                          label: "Brand",
                          bg: "#3f74ff",
                          logo: "#ffffff",
                        },
                      ].map((combo) => (
                        <button
                          key={combo.label}
                          onClick={() =>
                            update({
                              avatarBg: combo.bg,
                              logoColor: combo.logo,
                            })
                          }
                          className={`cursor-pointer overflow-hidden rounded-xs border-2 transition-all ${
                            config.avatarBg === combo.bg
                              ? "border-brand"
                              : "border-foreground/10 hover:border-foreground/30"
                          }`}
                        >
                          <div
                            className="flex aspect-square items-center justify-center"
                            style={{ backgroundColor: combo.bg }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={LOGO_PATHS[config.logoVariant]}
                              alt={combo.label}
                              className="h-4 w-auto object-contain"
                              style={{
                                filter:
                                  combo.logo === "#ffffff"
                                    ? "invert(1)"
                                    : "none",
                              }}
                            />
                          </div>
                          <span className="text-foreground/50 block py-1 text-center font-mono text-[10px]">
                            {combo.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {/* Color Theme (banner only) */}
              {config.assetType !== "avatar" && (
                <div className="space-y-4 p-5">
                  <Field label="Color Theme">
                    <div className="flex flex-wrap gap-1.5">
                      {GRADIENT_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            const updates: Partial<BrandConfig> = {
                              theme: preset,
                            };
                            if (preset.name === "Dark") {
                              updates.logoColor = "#ffffff";
                            }
                            update(updates);
                          }}
                          className={`cursor-pointer rounded-xs border px-3 py-1.5 font-mono text-xs transition-colors ${
                            config.theme.name === preset.name
                              ? "border-brand text-brand"
                              : "border-foreground/10 hover:border-foreground/30 text-foreground/60"
                          }`}
                        >
                          <span
                            className="mr-1.5 inline-block size-2.5 rounded-full"
                            style={{
                              background: `linear-gradient(to bottom, ${preset.from}, ${preset.to})`,
                            }}
                          />
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <details className="group">
                    <summary className="text-foreground/40 hover:text-foreground/60 cursor-pointer font-mono text-[10px] transition-colors">
                      Custom colors
                    </summary>
                    <div className="mt-3 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Gradient Start">
                          <ColorInput
                            value={config.theme.from}
                            onChange={(from) =>
                              update({
                                theme: {
                                  ...config.theme,
                                  name: "Custom",
                                  from,
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Gradient End">
                          <ColorInput
                            value={config.theme.to}
                            onChange={(to) =>
                              update({
                                theme: {
                                  ...config.theme,
                                  name: "Custom",
                                  to,
                                  accent: to,
                                },
                              })
                            }
                          />
                        </Field>
                      </div>
                      <Field label="Text Color">
                        <ColorInput
                          value={config.theme.textColor}
                          onChange={(textColor) =>
                            update({
                              theme: {
                                ...config.theme,
                                name: "Custom",
                                textColor,
                              },
                            })
                          }
                        />
                      </Field>
                    </div>
                  </details>
                </div>
              )}

              {/* Text (banner/post only) */}
              {config.assetType !== "avatar" && (
                <div className="space-y-4 p-5">
                  <Field label="Overline" optional>
                    <TextArea
                      value={config.subheadline}
                      onChange={(subheadline) => update({ subheadline })}
                      placeholder="WAVESPEED"
                      rows={1}
                    />
                  </Field>
                  <Field label="Headline">
                    <TextArea
                      value={config.headline}
                      onChange={(headline) => update({ headline })}
                      placeholder="Ultimate AI Media&#10;Generation Platform"
                      rows={2}
                    />
                  </Field>
                  {config.assetType === "post" && (
                    <Field label="Body" optional>
                      <TextArea
                        value={config.body}
                        onChange={(body) => update({ body })}
                        placeholder="Additional details for the post..."
                        rows={2}
                      />
                    </Field>
                  )}
                </div>
              )}

              {/* Background Image (banner only) */}
              {config.assetType !== "avatar" && (
                <div className="space-y-4 p-5">
                  <Field label="Background Image" optional>
                    <div className="grid grid-cols-5 gap-1.5">
                      {BG_PRESETS.map((bg) => (
                        <button
                          key={bg.key}
                          onClick={() =>
                            update({ backgroundImage: bg.src.src })
                          }
                          className={`relative cursor-pointer overflow-hidden rounded-xs border-2 transition-all ${
                            config.backgroundImage === bg.src.src
                              ? "border-brand"
                              : "border-foreground/10 hover:border-foreground/30"
                          }`}
                        >
                          <div className="relative aspect-video">
                            <NextImage
                              src={bg.src}
                              alt={bg.key}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="border-foreground/10 hover:border-foreground/30 hover:bg-foreground/3 text-foreground/50 cursor-pointer rounded-xs border border-dashed px-4 py-2 font-mono text-xs transition-colors"
                      >
                        Upload Custom
                      </button>
                      {config.backgroundImage && (
                        <button
                          onClick={() => update({ backgroundImage: null })}
                          className="text-destructive hover:text-destructive/80 cursor-pointer font-mono text-xs transition-colors"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </Field>
                </div>
              )}

              {/* Code Overlay (banner only) */}
              {config.assetType !== "avatar" && (
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground text-sm font-medium">
                      Code Overlay
                    </p>
                    <Toggle
                      checked={config.showCodeOverlay}
                      onChange={(showCodeOverlay) =>
                        update({ showCodeOverlay })
                      }
                    />
                  </div>
                  {config.showCodeOverlay && (
                    <>
                      <Field
                        label={`Opacity (${Math.round(config.codeOverlayOpacity * 100)}%)`}
                      >
                        <input
                          type="range"
                          min={0.05}
                          max={0.5}
                          step={0.01}
                          value={config.codeOverlayOpacity}
                          onChange={(e) =>
                            update({
                              codeOverlayOpacity: parseFloat(e.target.value),
                            })
                          }
                          className="accent-brand w-full"
                        />
                      </Field>
                      <Field label="Code Snippet">
                        <textarea
                          value={config.codeOverlayText}
                          onChange={(e) =>
                            update({ codeOverlayText: e.target.value })
                          }
                          rows={8}
                          className="border-foreground/10 bg-surface text-foreground placeholder:text-foreground/30 focus:border-brand resize-y rounded-xs border px-3 py-2 font-mono text-[11px] leading-relaxed transition-colors outline-none"
                          placeholder="Paste code or text here..."
                        />
                        <div className="flex justify-between gap-3">
                          <button
                            onClick={() =>
                              update({
                                codeOverlayText: glitchCode(
                                  config.codeOverlayText,
                                ),
                              })
                            }
                            className="text-foreground/40 hover:text-foreground/60 cursor-pointer font-mono text-[10px] transition-colors"
                          >
                            Add Glitch
                          </button>
                          <button
                            onClick={() =>
                              update({
                                codeOverlayText: DEFAULT_CODE_OVERLAY,
                              })
                            }
                            className="text-foreground/40 hover:text-foreground/60 cursor-pointer font-mono text-[10px] transition-colors"
                          >
                            Reset to default
                          </button>
                        </div>
                      </Field>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Logo Downloads with preview (avatar only) */}
            {config.assetType === "avatar" && (
              <div className="border-foreground/10 rounded-md border p-5">
                <p className="text-foreground mb-4 text-sm font-medium">
                  Download Logo
                </p>
                <div className="space-y-3">
                  {(["logo", "logotype", "lockup"] as const).map((v) => {
                    const label =
                      v === "logo"
                        ? "Icon"
                        : v === "logotype"
                          ? "Wordmark"
                          : "Lockup";
                    return (
                      <div
                        key={v}
                        className="border-foreground/10 flex items-center gap-4 rounded-md border p-3"
                      >
                        {/* Logo preview with safe boundary visualization */}
                        <div
                          className="relative flex h-16 w-24 shrink-0 items-center justify-center rounded-xs"
                          style={{
                            backgroundColor:
                              config.logoColor === "#ffffff"
                                ? "#1a1a1a"
                                : config.logoColor === "#3f74ff"
                                  ? "#eef2ff"
                                  : "#f5f5f5",
                          }}
                        >
                          <div className="absolute inset-2 border border-dashed border-black/10" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={LOGO_PATHS[v]}
                            alt={label}
                            className="relative max-h-8 max-w-16 object-contain"
                            style={{
                              filter:
                                config.logoColor === "#ffffff"
                                  ? "invert(1)"
                                  : config.logoColor === "#3f74ff"
                                    ? "invert(48%) sepia(52%) saturate(2878%) hue-rotate(212deg) brightness(100%) contrast(104%)"
                                    : "none",
                            }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col items-start text-left">
                          <span className="text-foreground text-sm font-medium">
                            {label}
                          </span>
                          <div className="mt-1.5 flex gap-1.5">
                            <button
                              onClick={() => handleLogoDownload(v, "svg")}
                              className="border-foreground/10 hover:border-foreground/30 hover:text-foreground text-foreground/50 cursor-pointer rounded-xs border px-2 py-0.5 font-mono text-[10px] transition-colors"
                            >
                              SVG
                            </button>
                            <button
                              onClick={() => handleLogoDownload(v, "png")}
                              className="border-foreground/10 hover:border-foreground/30 hover:text-foreground text-foreground/50 cursor-pointer rounded-xs border px-2 py-0.5 font-mono text-[10px] transition-colors"
                            >
                              PNG
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ─── Preview ─── */}
          <div
            className="sticky top-12 shrink-0"
            style={{ width: maxPreviewW }}
          >
            <div className="relative flex items-center justify-center">
              <div className="relative inline-block">
                <div className="border-foreground/10 overflow-hidden rounded-md border">
                  <canvas
                    ref={canvasRef}
                    style={{
                      width: previewWidth,
                      height: previewHeight,
                      display: "block",
                    }}
                  />
                </div>
                {config.assetType === "avatar" && (
                  <div
                    className="border-foreground/30 pointer-events-none absolute rounded-full border-2 border-dashed"
                    style={{
                      width: previewWidth,
                      height: previewHeight,
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
            </div>

            <p className="text-foreground/40 mt-3 font-mono text-xs">
              {w} &times; {h} px
              {config.assetType !== "avatar" &&
                ` \u2014 ${currentPlatform.label}`}
            </p>

            <button
              onClick={handleExport}
              className="bg-brand hover:bg-brand/90 mt-3 w-full cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              Download PNG
            </button>

            {config.assetType !== "avatar" && (
              <button
                onClick={handleExportAll}
                disabled={downloading}
                className="text-foreground/50 hover:text-foreground/70 mt-2 w-full cursor-pointer py-1.5 font-mono text-xs transition-colors disabled:opacity-50"
              >
                {downloading ? "Downloading..." : "Download All Platforms"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

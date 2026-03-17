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
    name: "Frost",
    from: "#f0f4ff",
    to: "#1d4ed8",
    textColor: "#0f172a",
    accent: "#3b82f6",
  },
  {
    name: "Sage",
    from: "#f0fdf4",
    to: "#047857",
    textColor: "#0f172a",
    accent: "#10b981",
  },
  {
    name: "Amber",
    from: "#fffbeb",
    to: "#b45309",
    textColor: "#0f172a",
    accent: "#d97706",
  },
  {
    name: "Violet",
    from: "#f5f3ff",
    to: "#6d28d9",
    textColor: "#0f172a",
    accent: "#8b5cf6",
  },
  {
    name: "Rose",
    from: "#fff1f2",
    to: "#be123c",
    textColor: "#0f172a",
    accent: "#f43f5e",
  },
  {
    name: "Slate",
    from: "#f1f5f9",
    to: "#0f172a",
    textColor: "#0f172a",
    accent: "#64748b",
  },
];

const DEFAULT_CODE_OVERLAY = `void mainImage(out vec4 fragColor, in vec2 fragCoord){
   \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2591\u2591\u2591\u2591\u2591\u2591\u2591ERNEL_SYNC \u2500\u2500\u2510 */
    vec2 uv = fragCoord.xy / iResolution.xy;
    \u2591\u2591\u2591\u2591\u2591 p  = uv*\u2593\u2593\u2593\u2593\u2593\u2591\u2591\u2591\u2591\u2591\u2591\u2591
    p.x \u2593\u2593\u2593\u2591\u2591\u2591\u2591\u2591\u2591\u2591x / iResolution.y;

    float t = iTime; \u25C8 // \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591

    // \u2591\u2592\u2593 ---- [LAYER_01: BACKGROUND] ---- \u2593\u2592\u2591
    vec3 col = \u2593\u2593\u2593\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591); \u29C9

    // \u25E4 SILHOUETTE_PROCESSOR \u25E5
    float m = \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591(p); \u25D6 \u25CF \u25D7 // \u2592\u2592\u2592 mask_init \u2592\u2592\u2592

    /* --- \u2726 RIBBON_DYNAMICS \u2726 --- */
    float r1 = ribbon(p*\u2591.\u2591\u2591, 0.11, t);
    float r2 = \u2591\u2591\u2591\u2591\u2591\u2591(p*1.10, 0.43, t+1.7);
    float r3 = ribbon(p*1.05, \u2591.\u2591\u2591, t+3.1);

    // \u2501\u2501\u2501\u2501\u2501 [WEIGHT_CALC: \u2593\u2593\u2593\u2592\u2592\u2591\u2591] \u2501\u2501\u2501\u2501\u2501
    float rb = clamp(r1*\u2591.\u2591 + r2*\u2591.\u2591 + r3*\u2591.\u2591, 0.0, 1.0);

    // \u2B2C [SPECTRUM_SHIFT] \u2B2C
    float hue = fract(uv.y*0.9 + \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 + 0.12*sin(t*0.2));
    vec3  spc = \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591(hue);

    // ---- [EDGE_= \u2593\u2593\u2593\u2593\u2593\u2593\u2593
    vec2 px = 1.0 / iResolution.xy;
    float mx = headMask(p + vec2(= \u2593\u2593\u2593\u2593\u2593\u2593\u2593
    float my = \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591(p + vec2(0.0, px.y*2.0))

    /* \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 [SIGNAL_LOCKED] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 */
    \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591

// \u2591\u2591 [FATAL] BUFFER_OVERFLOW_DETECTED \u2591\u2591
// source_node: [99-XLR-8] // \u2593\u2593\u2592\u2592\u2591\u2591
// EOF //`;

const LOGO_PATHS: Record<LogoVariant, string> = {
  logo: "/logo/logo.svg",
  logotype: "/logo/logotype.svg",
  lockup: "/logo/lockup.svg",
};

const DEFAULT_CONFIG: BrandConfig = {
  platform: "twitter",
  assetType: "post",
  logoVariant: "logo",
  theme: GRADIENT_PRESETS[0],
  headline: "Ultimate AI Media\nGeneration Platform.",
  subheadline: "",
  backgroundImage: null,
  showCodeOverlay: true,
  codeOverlayOpacity: 0.2,
  codeOverlayText: DEFAULT_CODE_OVERLAY,
  logoColor: "#000000",
  avatarBg: "#ffffff",
};

// ─── Glitch Utility ──────────────────────────────────────

const GLITCH_BLOCKS = ["\u2591", "\u2592", "\u2593"]; // ░▒▓
const GLITCH_SYMBOLS = [
  "\u25C8",
  "\u29C9",
  "\u25E4",
  "\u25E5",
  "\u25D6",
  "\u25CF",
  "\u25D7",
  "\u2726",
  "\u2B2C",
];
const GLITCH_TAILS = [
  " \u25C8 //",
  " \u29C9",
  " // \u2592\u2592\u2592",
  " // \u2593\u2593\u2592\u2592\u2591\u2591",
  " \u25D6 \u25CF \u25D7",
];
function randBlock(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++)
    s += GLITCH_BLOCKS[Math.floor(Math.random() * GLITCH_BLOCKS.length)];
  return s;
}

function glitchCode(text: string): string {
  const lines = text.split("\n");
  return lines
    .map((line) => {
      if (!line.trim()) return line;

      // Glitch identifiers within the line
      const result = line.replace(/[a-zA-Z_]\w*/g, (match) => {
        const roll = Math.random();
        if (roll < 0.25) {
          // Full block replacement
          return randBlock(match.length);
        }
        if (roll < 0.38) {
          // Partial: keep prefix, glitch suffix
          const keep = Math.max(1, Math.floor(match.length * 0.4));
          return match.slice(0, keep) + randBlock(match.length - keep);
        }
        if (roll < 0.45) {
          // Partial: glitch prefix, keep suffix
          const keep = Math.max(1, Math.floor(match.length * 0.4));
          return (
            randBlock(match.length - keep) + match.slice(match.length - keep)
          );
        }
        return match;
      });

      // ~12% chance to append a glitch tail
      if (Math.random() < 0.12) {
        const tail =
          GLITCH_TAILS[Math.floor(Math.random() * GLITCH_TAILS.length)];
        return result + tail;
      }

      // ~8% chance to append a glitch symbol
      if (Math.random() < 0.08) {
        const sym =
          GLITCH_SYMBOLS[Math.floor(Math.random() * GLITCH_SYMBOLS.length)];
        return result + " " + sym;
      }

      return result;
    })
    .join("\n");
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
  const mono =
    style.getPropertyValue("--font-geist-mono").trim() || "monospace";
  return { azeret, mono };
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  config: BrandConfig,
  logoImg: HTMLImageElement | null,
  bgImg: HTMLImageElement | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const [w, h] = getSize(config);
  canvas.width = w;
  canvas.height = h;

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

    // Layer 2: code overlay
    if (config.showCodeOverlay && config.codeOverlayText) {
      const codeLines = config.codeOverlayText.split("\n");
      const codeX = isVertical ? g(w * 0.43) : pad;
      const codeY = isVertical ? pad : g(h * 0.33);

      ctx.save();
      ctx.globalAlpha = config.codeOverlayOpacity;
      ctx.fillStyle = config.theme.accent;
      ctx.font = `${codeSize}px ${fonts.mono}`;

      let y = codeY;
      let lineIdx = 0;
      while (y < h + codeLineH * 4) {
        ctx.fillText(codeLines[lineIdx % codeLines.length], codeX, y);
        y += codeLineH;
        lineIdx++;
      }
      ctx.restore();
    }

    // Layer 3: image with alpha mask — feather on left edge always
    if (bgImg) {
      const targetX = isVertical ? pad : g(w - g(w * 0.5) - pad);
      const targetY = isVertical ? g(h - g(h * 0.5) - pad) : pad;
      const targetW = isVertical ? g(w - pad * 2) : g(w * 0.5);
      const targetH = isVertical ? g(h * 0.5) : g(h - pad * 2);
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

    // Layer 4: Logo (top-left) — rasterized at exact target size
    if (logoImg) {
      const logoW = Math.round(
        logoH * (logoImg.naturalWidth / logoImg.naturalHeight),
      );
      const rLogo = rasterizeLogo(logoImg, logoW, logoH);
      ctx.drawImage(rLogo, pad, pad, logoW, logoH);
    }

    // Layer 6 + 7: Headline + Subheadline (sub always below headline)
    {
      const headlineLines = config.headline ? config.headline.split("\n") : [];
      const headlineBlockH = headlineLines.length * headlineLineH;
      const subLines = config.subheadline ? config.subheadline.split("\n") : [];
      const subLineH = Math.round(subSize * 1.4);
      const subBlockH = subLines.length * subLineH;
      const gap = subLines.length > 0 ? 8 : 0;
      const totalBlockH = headlineBlockH + gap + subBlockH;

      // Headline Y: vertical = upper area, landscape = anchored to bottom
      let headlineY: number;
      if (isVertical) {
        headlineY = pad * 2 + logoH + headlineSize;
      } else {
        // Bottom of last text line should be at h - pad
        // Last baseline = headlineY + totalBlockH - headlineLineH (if no sub)
        //               = headlineY + headlineBlockH + gap + subBlockH - subLineH (if sub)
        // Visual bottom = last baseline + fontSize * 0.3 (descender)
        const lastFontSize = subLines.length > 0 ? subSize : headlineSize;
        const lastLineH = subLines.length > 0 ? subLineH : headlineLineH;
        headlineY = Math.round(
          h - pad - totalBlockH + lastLineH - lastFontSize * 0.3,
        );
      }

      if (config.headline) {
        ctx.fillStyle = config.theme.textColor;
        ctx.font = `700 ${headlineSize}px ${fonts.azeret}`;
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "-0.6px";
        }
        for (let i = 0; i < headlineLines.length; i++) {
          ctx.fillText(headlineLines[i], pad, headlineY + i * headlineLineH);
        }
        if ("letterSpacing" in ctx) {
          (ctx as unknown as Record<string, string>).letterSpacing = "0px";
        }
      }

      if (config.subheadline) {
        ctx.fillStyle = config.theme.textColor;
        ctx.font = `500 ${subSize}px ${fonts.azeret}`;
        ctx.globalAlpha = 0.7;

        const subY = headlineY + headlineBlockH + gap;
        for (let i = 0; i < subLines.length; i++) {
          ctx.fillText(subLines[i], pad, subY + i * subLineH);
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
      const maxW = g(w * (isIcon ? 0.6 : 0.8));
      const maxH = g(h * 0.6);
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
    const color = config.assetType === "avatar" ? config.logoColor : "#000000";
    loadSvgAsImage(LOGO_PATHS[variant], color)
      .then(setLogoImg)
      .catch(() => setLogoImg(null));
  }, [config.logoVariant, config.logoColor, config.assetType]);

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

  // Export single PNG
  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        config.assetType === "avatar"
          ? "wavespeed-avatar.png"
          : `wavespeed-${config.platform}-${config.assetType}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [config.platform, config.assetType]);

  // Export all platforms
  const handleExportAll = useCallback(async () => {
    setDownloading(true);
    const tempCanvas = document.createElement("canvas");
    for (const platform of PLATFORMS) {
      const tempConfig = { ...config, platform: platform.key };
      renderCanvas(tempCanvas, tempConfig, logoImg, bgImg);
      await new Promise<void>((resolve) => {
        tempCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `wavespeed-${platform.key}-${config.assetType}.png`;
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
        svgText = svgText.replace(/fill="black"/g, `fill="${config.logoColor}"`);
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
                        onClick={() => update({ assetType: type })}
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

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Gradient Start">
                      <ColorInput
                        value={config.theme.from}
                        onChange={(from) =>
                          update({
                            theme: { ...config.theme, name: "Custom", from },
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
              )}

              {/* Text (banner only) */}
              {config.assetType !== "avatar" && (
                <div className="space-y-4 p-5">
                  <Field label="Headline">
                    <TextArea
                      value={config.headline}
                      onChange={(headline) => update({ headline })}
                      placeholder="Ultimate AI Media&#10;Generation Platform."
                      rows={2}
                    />
                  </Field>
                  <Field label="Subheadline" optional>
                    <TextArea
                      value={config.subheadline}
                      onChange={(subheadline) => update({ subheadline })}
                      placeholder="wavespeed.com"
                      rows={2}
                    />
                  </Field>
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
                        <div className="flex gap-3">
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
                            Glitch
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

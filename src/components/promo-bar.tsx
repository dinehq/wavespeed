"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type PromoBarConfig = {
  enabled: boolean;
  text: string;
  href: string;
  bgColor: string;
  textColor: string;
  badge?: string;
  ctaLabel?: string;
};

const STORAGE_KEY = "wavespeed-promo-bar";

export const defaultConfig: PromoBarConfig = {
  enabled: true,
  text: "Share WaveSpeed. Earn 10%. Join the",
  href: "#",
  bgColor: "#3f74ff",
  textColor: "#ffffff",
  badge: "NEW",
  ctaLabel: "Affiliate Program",
};

export function getPromoConfig(): PromoBarConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as PromoBarConfig;
  } catch {}
  return defaultConfig;
}

export function setPromoConfig(config: PromoBarConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

function subscribe(cb: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) cb();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

const defaultConfigJson = JSON.stringify(defaultConfig);

export function usePromoConfig() {
  const getSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? defaultConfigJson;
    } catch {
      return defaultConfigJson;
    }
  }, []);

  const raw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => defaultConfigJson,
  );
  try {
    return JSON.parse(raw) as PromoBarConfig;
  } catch {
    return defaultConfig;
  }
}

function PromoLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

const barClass =
  "mx-auto flex max-w-7xl items-center justify-center gap-1.5 px-4 py-2 text-center text-xs font-medium sm:gap-2 sm:text-sm";

export function PromoBar() {
  const config = usePromoConfig();
  const pathname = usePathname();

  if (!config.enabled || pathname === "/designsystem") return null;

  const { bgColor, textColor } = config;

  const badgeEl = config.badge && (
    <span
      className="hidden shrink-0 rounded-sm px-1.5 py-0.75 text-[10px] leading-none font-bold tracking-wide sm:inline-block"
      style={{
        backgroundColor: `color-mix(in srgb, ${textColor} 20%, transparent)`,
        color: textColor,
      }}
    >
      {config.badge}
    </span>
  );

  if (config.ctaLabel) {
    return (
      <div
        data-promo-bar=""
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className={barClass}>
          {badgeEl}
          <span className="line-clamp-1 text-left">{config.text}</span>
          <PromoLink
            href={config.href}
            className="shrink-0 rounded-full px-2 py-0.75 text-[11px] leading-none font-semibold transition-opacity duration-150 hover:opacity-80 sm:text-xs"
            style={{ backgroundColor: textColor, color: bgColor }}
          >
            {config.ctaLabel}
          </PromoLink>
        </div>
      </div>
    );
  }

  return (
    <div data-promo-bar="">
      <PromoLink
        href={config.href}
        style={{ backgroundColor: bgColor, color: textColor }}
        className="block transition-opacity duration-150 hover:opacity-90"
      >
        <div className={barClass}>
          {badgeEl}
          <span className="line-clamp-1 text-left">{config.text}</span>
        </div>
      </PromoLink>
    </div>
  );
}

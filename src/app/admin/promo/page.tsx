"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  type PromoBarConfig,
  setPromoConfig,
  usePromoConfig,
} from "@/components/promo-bar";

const presets: { label: string; config: Partial<PromoBarConfig> }[] = [
  {
    label: "Brand Blue",
    config: { bgColor: "#3f74ff", textColor: "#ffffff" },
  },
  {
    label: "Dark",
    config: { bgColor: "#0e1017", textColor: "#ffffff" },
  },
  {
    label: "Green",
    config: { bgColor: "#16a34a", textColor: "#ffffff" },
  },
  {
    label: "Amber",
    config: { bgColor: "#f59e0b", textColor: "#0e1017" },
  },
  {
    label: "Rose",
    config: { bgColor: "#e11d48", textColor: "#ffffff" },
  },
  {
    label: "Violet",
    config: { bgColor: "#7c3aed", textColor: "#ffffff" },
  },
];

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

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-foreground/10 bg-surface text-foreground placeholder:text-foreground/30 focus:border-brand rounded-xs border px-3 py-2 font-mono text-sm transition-colors outline-none"
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
        className="border-foreground/10 bg-surface text-foreground focus:border-brand rounded-xs border px-3 py-2 font-mono text-sm transition-colors outline-none"
      />
    </div>
  );
}

function MobileFrame() {
  return (
    <div
      className="border-foreground/10 mx-auto overflow-hidden rounded-2xl border-2"
      style={{ width: 375 }}
    >
      <div className="bg-foreground/3 flex items-center justify-between px-4 py-1">
        <span className="text-foreground/30 font-mono text-[9px]">
          9:41
        </span>
        <div className="bg-foreground/20 h-4 w-20 rounded-full" />
        <div className="flex gap-1">
          <span className="bg-foreground/25 h-1.5 w-3 rounded-xs" />
          <span className="bg-foreground/25 h-1.5 w-1.5 rounded-xs" />
        </div>
      </div>
      <iframe
        src="/"
        className="border-0"
        style={{ width: 375, height: 600 }}
        title="Mobile preview"
      />
      <div className="bg-foreground/3 flex justify-center py-1.5">
        <div className="bg-foreground/20 h-1 w-24 rounded-full" />
      </div>
    </div>
  );
}

export default function AdminPromoPage() {
  const config = usePromoConfig();
  const [saved, setSaved] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const update = (partial: Partial<PromoBarConfig>) => {
    setPromoConfig({ ...config, ...partial });
    setSaved(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-foreground/40 hover:text-foreground/60 mb-2 inline-block font-mono text-xs transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-foreground font-display text-2xl font-bold tracking-tighter">
              Promo Bar CMS
            </h1>
            <p className="text-foreground/50 mt-1 text-sm">
              Configure the announcement bar shown across the site.
            </p>
          </div>
          {saved && (
            <span className="animate-in fade-in bg-green/20 text-green rounded-sm px-2 py-1 font-mono text-xs">
              Saved
            </span>
          )}
        </div>

        <div className="flex items-start gap-10">
          <div className="flex-1 space-y-4">
            <div className="border-foreground/10 divide-foreground/10 divide-y rounded-md border">
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-foreground text-sm font-medium">Enable</p>
                </div>
                <button
                  onClick={() => update({ enabled: !config.enabled })}
                  className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
                    config.enabled ? "bg-brand" : "bg-foreground/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      config.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <Field label="Badge" optional>
                  <TextInput
                    value={config.badge ?? ""}
                    onChange={(badge) => update({ badge: badge || undefined })}
                    placeholder="New"
                  />
                </Field>

                <Field label="Message">
                  <TextInput
                    value={config.text}
                    onChange={(text) => update({ text })}
                    placeholder="Your announcement message"
                  />
                </Field>

                <Field label="CTA Button" optional>
                  <TextInput
                    value={config.ctaLabel ?? ""}
                    onChange={(ctaLabel) =>
                      update({ ctaLabel: ctaLabel || undefined })
                    }
                    placeholder="Learn More"
                  />
                </Field>

                <Field label="Link URL">
                  <TextInput
                    value={config.href}
                    onChange={(href) => update({ href })}
                    placeholder="/pricing or https://..."
                  />
                </Field>
              </div>

              <div className="space-y-5 p-5">
                <p className="text-foreground text-sm font-medium">Colors</p>

                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => update(preset.config)}
                      className="border-foreground/10 hover:border-foreground/30 cursor-pointer rounded-xs border px-3 py-1.5 font-mono text-xs transition-colors"
                    >
                      <span
                        className="mr-1.5 inline-block size-2.5 rounded-full"
                        style={{ backgroundColor: preset.config.bgColor }}
                      />
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Background Color">
                    <ColorInput
                      value={config.bgColor}
                      onChange={(bgColor) => update({ bgColor })}
                    />
                  </Field>

                  <Field label="Text Color">
                    <ColorInput
                      value={config.textColor}
                      onChange={(textColor) => update({ textColor })}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("wavespeed-promo-bar");
                window.dispatchEvent(
                  new StorageEvent("storage", {
                    key: "wavespeed-promo-bar",
                  }),
                );
              }}
              className="text-destructive hover:text-destructive/80 cursor-pointer font-mono text-xs transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="sticky top-12 shrink-0">
            <MobileFrame />
            <p className="text-foreground/40 mt-4 mb-3 font-mono text-xs">
              Badge hides on mobile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

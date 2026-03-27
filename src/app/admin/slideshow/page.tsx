"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AdminNav } from "@/components/admin-nav";
import {
  type SlideConfig,
  type SlideshowConfig,
  imageMap,
  setSlideshowConfig,
  useSlideshowConfig,
} from "@/components/hero-slideshow";

const imageKeys = Object.keys(imageMap);

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
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="border-foreground/10 bg-surface text-foreground placeholder:text-foreground/30 focus:border-brand resize-none rounded-xs border px-3 py-2 font-mono text-sm transition-colors outline-none"
    />
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

function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {imageKeys.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`relative cursor-pointer overflow-hidden rounded-xs border-2 transition-all ${
            value === key
              ? "border-brand"
              : "border-foreground/10 hover:border-foreground/30"
          }`}
        >
          <div className="relative aspect-video">
            <Image
              src={imageMap[key]}
              alt={key}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <span className="text-foreground/50 block py-0.5 font-mono text-[9px]">
            {key}
          </span>
        </button>
      ))}
    </div>
  );
}

function SlideEditor({
  slide,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  slide: SlideConfig;
  onUpdate: (partial: Partial<SlideConfig>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-foreground/10 rounded-md border">
      <div className="flex items-center gap-3 p-4">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-foreground/30 hover:text-foreground/60 cursor-pointer text-xs disabled:cursor-default disabled:opacity-30"
          >
            ▲
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="text-foreground/30 hover:text-foreground/60 cursor-pointer text-xs disabled:cursor-default disabled:opacity-30"
          >
            ▼
          </button>
        </div>

        <div className="relative size-10 shrink-0 overflow-hidden rounded-xs">
          <Image
            src={imageMap[slide.imageKey] ?? imageMap["slide-1"]}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex min-w-0 flex-1 cursor-pointer flex-col text-left"
        >
          <span className="text-foreground truncate text-sm font-medium">
            {slide.title.replace(/\n/g, " ")}
          </span>
          <span className="text-foreground/40 font-mono text-xs">
            {slide.badge ?? "No badge"}
          </span>
        </button>

        <Toggle
          checked={slide.enabled}
          onChange={(enabled) => onUpdate({ enabled })}
        />

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-foreground/40 hover:text-foreground/60 cursor-pointer font-mono text-xs transition-colors"
        >
          {expanded ? "▾" : "▸"}
        </button>
      </div>

      {expanded && (
        <div className="border-foreground/10 space-y-5 border-t p-5">
          <Field label="Badge" optional>
            <TextInput
              value={slide.badge ?? ""}
              onChange={(badge) => onUpdate({ badge: badge || undefined })}
              placeholder="New Model"
            />
          </Field>

          <Field label="Title">
            <TextArea
              value={slide.title}
              onChange={(title) => onUpdate({ title })}
              placeholder="Slide title (use \n for line break)"
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={slide.description}
              onChange={(description) => onUpdate({ description })}
              placeholder="Slide description"
              rows={3}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="CTA Label">
              <TextInput
                value={slide.action.label}
                onChange={(label) =>
                  onUpdate({ action: { ...slide.action, label } })
                }
                placeholder="Try Model"
              />
            </Field>
            <Field label="CTA URL">
              <TextInput
                value={slide.action.href}
                onChange={(href) =>
                  onUpdate({ action: { ...slide.action, href } })
                }
                placeholder="/models/..."
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Secondary Label" optional>
              <TextInput
                value={slide.secondaryAction?.label ?? ""}
                onChange={(label) =>
                  onUpdate({
                    secondaryAction: label
                      ? {
                          label,
                          href: slide.secondaryAction?.href ?? "#",
                        }
                      : undefined,
                  })
                }
                placeholder="Documentation"
              />
            </Field>
            <Field label="Secondary URL" optional>
              <TextInput
                value={slide.secondaryAction?.href ?? ""}
                onChange={(href) =>
                  onUpdate({
                    secondaryAction: href
                      ? {
                          label: slide.secondaryAction?.label ?? "Link",
                          href,
                        }
                      : undefined,
                  })
                }
                placeholder="/docs/..."
              />
            </Field>
          </div>

          <Field label="Background Image">
            <ImagePicker
              value={slide.imageKey}
              onChange={(imageKey) => onUpdate({ imageKey })}
            />
          </Field>

          <div className="border-foreground/10 space-y-4 border-t pt-5">
            <p className="text-foreground/60 font-mono text-xs tracking-wide uppercase">
              Video Override{" "}
              <span className="text-foreground/30 tracking-normal normal-case">
                Optional
              </span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Video URL">
                <TextInput
                  value={slide.video?.src ?? ""}
                  onChange={(src) =>
                    onUpdate({
                      video: src
                        ? { src, poster: slide.video?.poster ?? "" }
                        : undefined,
                    })
                  }
                  placeholder="/videos/hero.mp4"
                />
              </Field>
              <Field label="Poster URL">
                <TextInput
                  value={slide.video?.poster ?? ""}
                  onChange={(poster) =>
                    onUpdate({
                      video: poster
                        ? { src: slide.video?.src ?? "", poster }
                        : undefined,
                    })
                  }
                  placeholder="/videos/poster.webp"
                />
              </Field>
            </div>
          </div>

          <button
            onClick={onRemove}
            className="text-destructive hover:text-destructive/80 cursor-pointer font-mono text-xs transition-colors"
          >
            Remove Slide
          </button>
        </div>
      )}
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
        <span className="text-foreground/30 font-mono text-[9px]">9:41</span>
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

function newSlide(): SlideConfig {
  return {
    id: `slide-${Date.now()}`,
    enabled: true,
    title: "New Slide",
    description: "Slide description goes here.",
    action: { label: "Learn More", href: "#" },
    imageKey: "slide-1",
  };
}

export default function AdminSlideshowPage() {
  const config = useSlideshowConfig();
  const [saved, setSaved] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const update = (next: SlideshowConfig) => {
    setSlideshowConfig(next);
    setSaved(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setSaved(false), 2000);
  };

  const updateSlide = (index: number, partial: Partial<SlideConfig>) => {
    const slides = [...config.slides];
    slides[index] = { ...slides[index], ...partial };
    update({ ...config, slides });
  };

  const removeSlide = (index: number) => {
    const slides = config.slides.filter((_, i) => i !== index);
    update({ ...config, slides });
  };

  const moveSlide = (from: number, to: number) => {
    const slides = [...config.slides];
    const [moved] = slides.splice(from, 1);
    slides.splice(to, 0, moved);
    update({ ...config, slides });
  };

  const addSlide = () => {
    update({ ...config, slides: [...config.slides, newSlide()] });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <AdminNav />
            <h1 className="text-foreground font-display text-2xl font-bold tracking-tighter">
              Hero Slideshow
            </h1>
            <p className="text-foreground/50 mt-1 text-sm">
              Configure the hero slideshow slides on the homepage.
            </p>
          </div>
          {saved && (
            <span className="animate-in fade-in bg-green/20 text-green rounded-sm px-2 py-1 font-mono text-xs">
              Saved
            </span>
          )}
        </div>

        <div className="flex items-start gap-10">
          <div className="flex-1 space-y-3">
            {config.slides.map((slide, i) => (
              <SlideEditor
                key={slide.id}
                slide={slide}
                onUpdate={(partial) => updateSlide(i, partial)}
                onRemove={() => removeSlide(i)}
                onMoveUp={() => moveSlide(i, i - 1)}
                onMoveDown={() => moveSlide(i, i + 1)}
                isFirst={i === 0}
                isLast={i === config.slides.length - 1}
              />
            ))}

            <button
              onClick={addSlide}
              className="border-foreground/10 hover:border-foreground/30 hover:bg-foreground/3 text-foreground/50 w-full cursor-pointer rounded-md border border-dashed py-3 font-mono text-xs transition-colors"
            >
              + Add Slide
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem("wavespeed-slideshow");
                  window.dispatchEvent(
                    new StorageEvent("storage", {
                      key: "wavespeed-slideshow",
                    }),
                  );
                }}
                className="text-destructive hover:text-destructive/80 cursor-pointer font-mono text-xs transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>

          <div className="sticky top-12 shrink-0">
            <MobileFrame />
            <p className="text-foreground/40 mt-4 mb-3 font-mono text-xs">
              {config.slides.filter((s) => s.enabled).length} of{" "}
              {config.slides.length} slides active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

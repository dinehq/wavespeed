"use client";

import Image from "next/image";
import { CircleHelp, ImagePlus, Link2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import thumb1 from "@/images/thumb-1.webp";

const controlButtonSmClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-xs font-bold shadow-xs";
const controlSelectClass =
  "border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 h-8 w-full rounded-xs px-3 text-xs shadow-xs";
const controlSelectTriggerCompactClass =
  "border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 h-8 w-fit min-w-20 rounded-xs px-3 text-xs shadow-xs justify-between";

function FieldLabel({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: string;
}) {
  return (
    <p className="text-foreground/80 mb-2 flex items-center gap-1 text-xs">
      {children}
      <span
        title={tooltip}
        aria-label={tooltip}
        className="text-foreground/60 inline-flex cursor-help items-center"
      >
        <CircleHelp className="size-3" />
      </span>
    </p>
  );
}

const inputModeOptions = [
  { value: "form", label: "Form" },
  { value: "json", label: "JSON" },
  { value: "http", label: "HTTP" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
] as const;

export function ModelDetailInputForm() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-sm font-medium">Input</h2>
        <Select defaultValue="form">
          <SelectTrigger className={controlSelectTriggerCompactClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xs border-foreground/10">
            {inputModeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
      <div>
        <FieldLabel tooltip="One or more reference images for editing.">
          images*
        </FieldLabel>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className={controlButtonSmClass}>
            <ImagePlus className="size-3.5" />
            Add Image
          </Button>
          <div className="bg-border h-5 w-px shrink-0" />
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <input
              type="text"
              readOnly
              value=""
              placeholder="Add image from URL or paste from clipboard"
              className="border-input placeholder:text-muted-foreground text-foreground h-8 flex-1 rounded-xs border px-3 text-xs outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              disabled
              className={`${controlButtonSmClass} border-foreground/5 text-foreground/40 hover:bg-transparent`}
            >
              Add URL
            </Button>
          </div>
        </div>

        <p className="text-foreground/60 mt-3 text-xs">
          Hint: Drag and drop files from your computer, images from web pages,
          paste from clipboard (Ctrl/Cmd+V), or provide a URL.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-muted/40 border-input relative overflow-hidden rounded-xs border"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={thumb1}
                  alt="Input sample thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                aria-label="Remove image"
                className="bg-background/80 text-foreground/70 absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-xs border border-white/10"
              >
                <Trash2 className="size-3.5" />
              </button>
              <div className="text-foreground/70 absolute right-2 bottom-2 left-2 flex items-center justify-between text-xs">
                <span>1024×1024</span>
                <Link2 className="size-3.5" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-foreground/80 mt-3 text-sm">2 images added</p>
      </div>

      <div>
        <FieldLabel tooltip="Describe the edit you want the model to apply.">
          prompt*
        </FieldLabel>
        <textarea
          defaultValue="Make the hamburger made of glass."
          rows={4}
          className={cn(
            "border-input bg-background placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 resize-y rounded-xs border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "min-h-24"
          )}
        />
      </div>

      <div>
        <FieldLabel tooltip="Target aspect ratio for the generated result.">
          aspect_ratio
        </FieldLabel>
        <Select defaultValue="1:1">
          <SelectTrigger className={controlSelectClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xs border-foreground/10">
            <SelectItem value="1:1">1:1</SelectItem>
            <SelectItem value="16:9">16:9</SelectItem>
            <SelectItem value="9:16">9:16</SelectItem>
            <SelectItem value="4:3">4:3</SelectItem>
            <SelectItem value="3:4">3:4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel tooltip="Output resolution level for generated images.">
          resolution
        </FieldLabel>
        <Select defaultValue="2k">
          <SelectTrigger className={controlSelectClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xs border-foreground/10">
            <SelectItem value="1k">1k</SelectItem>
            <SelectItem value="2k">2k</SelectItem>
            <SelectItem value="4k">4k</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel tooltip="The file format returned by the model output.">
          output_format
        </FieldLabel>
        <Select defaultValue="jpeg">
          <SelectTrigger className={controlSelectClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xs border-foreground/10">
            <SelectItem value="jpeg">jpeg</SelectItem>
            <SelectItem value="png">png</SelectItem>
            <SelectItem value="webp">webp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <FieldLabel tooltip="Wait for completion and return the result in one response.">
          enable_sync_mode
        </FieldLabel>
        <p className="text-foreground/60 text-xs">
          If enabled, API waits for generation and returns results directly in
          the same response.
        </p>
      </div>

      <div>
        <FieldLabel tooltip="Return image data as base64 instead of a URL.">
          enable_base64_output
        </FieldLabel>
        <p className="text-foreground/60 text-xs">
          If enabled, output is embedded as base64 string instead of URL.
        </p>
      </div>
      </div>
    </>
  );
}

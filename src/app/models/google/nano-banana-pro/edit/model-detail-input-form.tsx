"use client";

import Image from "next/image";
import { CircleHelp } from "lucide-react";
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground/80 mb-2 flex items-center gap-1 text-xs">
      {children}
      <CircleHelp className="size-3 opacity-60" />
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
        <FieldLabel>images*</FieldLabel>
        <div className="border-input bg-background rounded-xs border p-3">
          <div className="border-foreground/15 bg-muted/50 flex min-h-24 items-center justify-center rounded-xs border border-dashed p-3">
            <p className="text-muted-foreground text-center text-xs">
              Paste image URL
              <br />
              or drag and drop file
            </p>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-xs">
              <Image
                src={thumb1}
                alt="Input sample thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-foreground/70 text-xs">sample-reference.png</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={`${controlButtonSmClass} mt-3`}
          >
            Add Item
          </Button>
        </div>
      </div>

      <div>
        <FieldLabel>prompt*</FieldLabel>
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
        <FieldLabel>aspect_ratio</FieldLabel>
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
        <FieldLabel>resolution</FieldLabel>
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
        <FieldLabel>output_format</FieldLabel>
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
        <FieldLabel>enable_sync_mode</FieldLabel>
        <p className="text-foreground/60 text-xs">
          If enabled, API waits for generation and returns results directly in
          the same response.
        </p>
      </div>

      <div>
        <FieldLabel>enable_base64_output</FieldLabel>
        <p className="text-foreground/60 text-xs">
          If enabled, output is embedded as base64 string instead of URL.
        </p>
      </div>
      </div>
    </>
  );
}

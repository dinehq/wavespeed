"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Expand, Pencil, X } from "lucide-react";
import type { StaticImageData } from "next/image";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const examples = [
  { id: "1", image: thumb1 },
  { id: "2", image: thumb2 },
  { id: "3", image: thumb3 },
  { id: "4", image: thumb4 },
  { id: "5", image: thumb5 },
  { id: "6", image: thumb6 },
] as const satisfies ReadonlyArray<{ id: string; image: StaticImageData }>;

export function ExamplesSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = examples.find((e) => e.id === openId);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground font-display text-xl font-bold">
            Examples
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/60 hover:text-foreground h-8 rounded-xs px-3"
          >
            View all
          </Button>
        </div>
        <div className="-mx-1 overflow-x-auto px-1">
          <div className="flex flex-nowrap gap-3 pb-1">
            {examples.map((item) => (
              <div
                key={item.id}
                className="group border-foreground/10 bg-surface relative aspect-square w-32 shrink-0 overflow-hidden rounded-xs border"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-opacity duration-200 group-hover:bg-black/40 group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    aria-label="View large"
                    className="text-foreground h-9 w-9 rounded-xs bg-white/90 shadow-sm hover:bg-white"
                    onClick={() => setOpenId(item.id)}
                  >
                    <Expand className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    aria-label="Edit"
                    className="text-foreground h-9 w-9 rounded-xs bg-white/90 shadow-sm hover:bg-white"
                  >
                    <Pencil className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!openId} onOpenChange={(open) => !open && setOpenId(null)}>
        <DialogContent
          className="flex max-h-[90vh] w-full max-w-4xl flex-col gap-0 overflow-hidden rounded-xs border-0 bg-transparent p-0 shadow-none"
          onPointerDownOutside={() => setOpenId(null)}
          onEscapeKeyDown={() => setOpenId(null)}
        >
          <DialogTitle className="sr-only">Example image preview</DialogTitle>
          <DialogDescription className="sr-only">
            Example image for this model.
          </DialogDescription>

          {selected ? (
            <>
              <div className="relative mx-auto h-[60vh] w-full max-w-3xl p-4">
                <Image
                  src={selected.image}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>

              <div className="flex items-center justify-center gap-3 py-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Edit"
                  className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-9 w-9 rounded-xs shadow-xs"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Download"
                  className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-9 w-9 rounded-xs shadow-xs"
                >
                  <Download className="size-4" />
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Close"
                    className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-9 w-9 rounded-xs shadow-xs"
                  >
                    <X className="size-4" />
                  </Button>
                </DialogClose>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

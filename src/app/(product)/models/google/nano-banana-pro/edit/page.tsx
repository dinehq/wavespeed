import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ChevronDown,
  Copy,
  Expand,
  Eye,
  Images,
  RefreshCw,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import editorPreview from "@/images/editor-image-preview.webp";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductTopTabs } from "@/features/product/components/product-top-tabs";
import { ModelDetailInputForm } from "./model-detail-input-form";

const examples = [
  "Glass hamburger on white backdrop",
  "Snow globe city at sunset",
  "Painterly mountain village",
  "Cinematic fox in moonlight",
  "Concept art character sheet",
  "Sketch-to-comic conversion",
];

const relatedModels = [
  {
    name: "nano-banana-2/edit",
    type: "image-to-image",
    image: thumb1,
  },
  {
    name: "nano-banana-2/text-to-image",
    type: "text-to-image",
    image: thumb2,
  },
  {
    name: "nano-banana-pro/edit-multi",
    type: "image-to-image",
    image: thumb3,
  },
  {
    name: "nano-banana-pro/edit-ultra",
    type: "image-to-image",
    image: thumb4,
  },
  {
    name: "nano-banana-pro/retouch",
    type: "image-to-image",
    image: thumb5,
  },
  {
    name: "nano-banana-pro/restore",
    type: "image-to-image",
    image: thumb6,
  },
];

const controlButtonSmClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-xs font-bold shadow-xs";

export default function ModelDetailPage() {
  return (
    <>
      <ProductTopTabs activeTab="Models" />
      <section className="px-6 pt-2 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-foreground/60 flex items-center gap-2 text-xs">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/explore"
                  className="hover:text-foreground transition-colors"
                >
                  Explore
                </Link>
                <span>/</span>
                <span className="text-foreground">google/nano-banana-pro/edit</span>
              </div>
              <button className="text-brand hover:text-brand/80 inline-flex h-8 items-center gap-1 rounded-xs px-3 text-xs font-bold transition-colors">
                Documentation
                <BookOpen className="size-3" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="bg-surface text-foreground/80 inline-flex h-8 items-center gap-2 rounded-xs border border-transparent px-3 text-xs font-bold">
                <Images className="size-3" />
                image-to-image
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                >
                  <Star className="size-3" />
                  Add to favourite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                >
                  Schema
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                >
                  LLMs
                  <ChevronDown className="size-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-heading font-display text-3xl leading-none font-bold">
                google/nano-banana-pro/edit
              </h1>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-foreground/50 hover:text-foreground shrink-0 rounded-xs"
              >
                <Copy className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
              >
                nano-banana-pro/edit
                <ChevronDown className="size-3 shrink-0" />
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-subtle w-full text-sm">
                Google Nano Banana Pro (Gemini 3.0 Pro Image) Edit supports
                high-quality image editing workflows with consistent output and
                production-friendly API response modes.
              </p>
            </div>

            <div className="border-foreground/10 flex items-center gap-5 border-b pt-1">
              <button className="text-foreground border-foreground h-8 border-b-2 font-bold text-xs">
                Playground
              </button>
              <button className="text-foreground/60 hover:text-foreground h-8 text-xs font-bold transition-colors">
                API
              </button>
              <button className="text-foreground/60 hover:text-foreground h-8 text-xs font-bold transition-colors">
                History
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="bg-surface rounded-xs p-4">
                <ModelDetailInputForm />
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="bg-surface rounded-xs p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-medium">
                      Result
                    </span>
                    <Badge
                      variant="outline"
                      className="text-foreground/70 border-foreground/10 h-5 rounded-xs px-1.5 text-xs font-medium"
                    >
                      Idle
                    </Badge>
                  </div>
                  <div className="text-foreground/70 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-foreground/70 hover:bg-background rounded-xs"
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-foreground/70 hover:bg-background rounded-xs"
                    >
                      <RefreshCw className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-foreground/70 hover:bg-background rounded-xs"
                    >
                      <Expand className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-input relative mt-4 h-80 overflow-hidden rounded-xs border">
                  <Image
                    src={editorPreview}
                    alt="Generated preview placeholder"
                    fill
                    className="object-cover"
                  />
                  <div className="from-background/0 to-background/40 absolute inset-0 bg-linear-to-t" />
                  <div className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-xs bg-black/50 px-2 py-1 text-xs text-white">
                    <Sparkles className="size-3" />
                    Preview
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={controlButtonSmClass}
                  >
                    <WandSparkles className="size-3" />
                    Image Upscaler
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={controlButtonSmClass}
                  >
                    Remove Background
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={controlButtonSmClass}
                  >
                    Image Eraser
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={controlButtonSmClass}
                  >
                    <Eye className="size-3" />
                    Generate Video
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {examples.map((item) => (
                <div
                  key={item}
                  className="border-foreground/10 bg-surface hover:bg-background flex min-h-28 items-end rounded-xs border p-3 transition-colors"
                >
                  <p className="text-foreground/80 text-xs">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-display text-xl font-bold">
              Related Models
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {relatedModels.map((model) => (
                <Link key={model.name} href="#" className="block">
                  <Card className="group border-foreground/10 gap-0 overflow-hidden rounded-xs py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/25">
                    <CardContent className="flex items-center gap-2.5 p-2">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xs">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-foreground line-clamp-1 text-sm">
                          google/{model.name}
                        </p>
                        <p className="text-foreground/50 mt-0.5 text-xs leading-tight">
                          {model.type}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

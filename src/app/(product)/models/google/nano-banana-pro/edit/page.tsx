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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductTopTabs } from "@/features/product/components/product-top-tabs";
import { ExamplesSection } from "./examples-section";
import { ModelDetailInputForm, ModelSwitcher } from "./model-detail-input-form";
import { ReadmeSection } from "./readme-section";

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
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-xs font-semibold shadow-xs";

export default function ModelDetailPage() {
  return (
    <>
      <ProductTopTabs activeTab="Explore" />
      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-4 pt-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-4">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2 md:pr-4 lg:pr-6">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h1 className="text-heading text-3xl leading-none font-semibold">
                    google/nano-banana-pro/edit
                  </h1>
                  <ModelSwitcher />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground shrink-0 rounded-xs"
                    aria-label="Copy"
                  >
                    <Copy className="size-5 stroke-[1.75]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground shrink-0 rounded-xs"
                    aria-label="Doc"
                  >
                    <BookOpen className="size-5 stroke-[1.75]" />
                  </Button>
                </div>
                <p className="text-subtle line-clamp-2 max-w-3xl text-sm">
                  Google Nano Banana Pro (Gemini 3.0 Pro Image) Edit supports
                  high-quality image editing workflows with consistent output
                  and production-friendly API response modes.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-foreground/70 bg-surface/70 inline-flex h-6 w-fit items-center gap-1 rounded-xs px-2 text-xs font-medium">
                    <Images className="size-3" />
                    image-to-image
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:shrink-0 md:justify-end lg:ml-6">
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
                <DropdownMenu>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${controlButtonSmClass} rounded-r-none`}
                    >
                      LLMs
                    </Button>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Open LLM actions"
                        className="border-foreground/10 text-muted-foreground hover:bg-foreground/5 hover:text-foreground h-8 rounded-l-none rounded-r-xs border-l-0 shadow-xs"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent className="border-foreground/10">
                    <DropdownMenuItem>Open Markdown content</DropdownMenuItem>
                    <DropdownMenuItem>Copy content</DropdownMenuItem>
                    <DropdownMenuItem>Open in ChatGPT</DropdownMenuItem>
                    <DropdownMenuItem>Open in Claude</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="border-foreground/10 flex items-center gap-2 border-b pt-1">
              <button className="text-foreground border-foreground h-10 border-b-2 px-3 text-sm font-semibold">
                Playground
              </button>
              <button className="text-foreground/60 hover:text-foreground h-10 px-3 text-sm font-semibold transition-colors">
                API
              </button>
              <button className="text-foreground/60 hover:text-foreground h-10 px-3 text-sm font-semibold transition-colors">
                History
              </button>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-12">
            <aside className="flex min-h-0 lg:col-span-6">
              <div className="bg-surface flex h-full min-h-0 flex-col rounded-xs px-4 pt-4 pb-0">
                <ModelDetailInputForm />
              </div>
            </aside>

            <div className="lg:col-span-6">
              <div className="bg-surface rounded-xs p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-semibold">
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

          <ExamplesSection />

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground text-xl font-semibold">
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

          <ReadmeSection />
        </div>
      </section>
    </>
  );
}

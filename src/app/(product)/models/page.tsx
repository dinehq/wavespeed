"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { HeroSlideshow, type SlideConfig } from "@/components/hero-slideshow";
import objectDetectionAndSegmentationIcon from "@/images/Object Detection and Segmentation.png";
import contentDetectionModelsIcon from "@/images/Content Detection Models.png";
import motionControlModelsIcon from "@/images/Motion Control Models.png";
import bestVideoModelsIcon from "@/images/Best Video Models.png";
import bestImageModelsIcon from "@/images/Best Image Models.png";
import swapAnythingIcon from "@/images/Swap Anything.png";
import videoEditIcon from "@/images/Video Edit.png";
import ultraSelectionIcon from "@/images/Ultra Selection.png";
import loraGenerationIcon from "@/images/LoRA Generation.png";
import generateMusicIcon from "@/images/Generate Music.png";
import firstAndLastFrameVideoIcon from "@/images/First and Last Frame Video.png";
import removeAnythingIcon from "@/images/Remove Anything.png";
import threeDCreationIcon from "@/images/3D Creation.png";
import avatarLipsyncModelsIcon from "@/images/Avatar Lipsync Models.png";
import trainingToolsIcon from "@/images/Training Tools.png";
import enhanceVideosIcon from "@/images/Enhance Videos.png";
import imageEditingIcon from "@/images/Image Editing.png";
import upscaleImageIcon from "@/images/Upscale Image.png";
import speechGenerationIcon from "@/images/Speech Generation.png";
import audioForVideoIcon from "@/images/Audio for Video.png";
import qwenImage2ModelsIcon from "@/images/Qwen Image 2 Models.png";
import grokModelsIcon from "@/images/Grok Models.png";
import seedance15ProModelsIcon from "@/images/Seedance 1.5 Pro Models.png";
import wan26ModelsIcon from "@/images/Wan 2.6 Models.png";
import klingO3ModelsIcon from "@/images/Kling O3 Models.png";
import openAIModelsIcon from "@/images/OpenAI Models.png";
import wan25ModelsIcon from "@/images/Wan 2.5 Models.png";
import seedreamAIModelsIcon from "@/images/Seedream AI Models.png";
import wan22ModelsIcon from "@/images/Wan 2.2 Models.png";
import dreaminaAIModelsIcon from "@/images/Dreamina AI Models.png";
import seedanceVideoModelsIcon from "@/images/Seedance Video Models.png";
import fluxImageToolsIcon from "@/images/Flux Image Tools.png";
import minimaxHailuoModelsIcon from "@/images/Minimax Hailuo Models.png";
import klingModelsIcon from "@/images/Kling Models.png";
import googleModelsIcon from "@/images/Google Models.png";
import fluxKontextModelsIcon from "@/images/Flux Kontext Models.png";
import runwaymlAIModelsIcon from "@/images/Runwayml AI Models.png";
import wan21VideoModelsIcon from "@/images/Wan 2.1 Video Models.png";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";
import thumb7 from "@/images/thumb-7.webp";
import thumb8 from "@/images/thumb-8.webp";

const quickTools = [
  {
    label: "Object Detection and Segmentation",
    icon: objectDetectionAndSegmentationIcon,
  },
  { label: "Content Detection Models", icon: contentDetectionModelsIcon },
  { label: "Motion Control Models", icon: motionControlModelsIcon },
  { label: "Best Video Models", icon: bestVideoModelsIcon },
  { label: "Best Image Models", icon: bestImageModelsIcon },
  { label: "Swap Anything", icon: swapAnythingIcon },
  { label: "Audio for Video", icon: audioForVideoIcon },
  { label: "Video Edit", icon: videoEditIcon },
  { label: "Ultra Selection", icon: ultraSelectionIcon },
  { label: "LoRA Generation", icon: loraGenerationIcon },
  { label: "Generate Music", icon: generateMusicIcon },
  { label: "First and Last Frame Video", icon: firstAndLastFrameVideoIcon },
  { label: "Remove Anything", icon: removeAnythingIcon },
  { label: "3D Creation", icon: threeDCreationIcon },
  { label: "Avatar Lipsync Models", icon: avatarLipsyncModelsIcon },
  { label: "Training Tools", icon: trainingToolsIcon },
  { label: "Enhance Videos", icon: enhanceVideosIcon },
  { label: "Image Editing", icon: imageEditingIcon },
  { label: "Upscale Image", icon: upscaleImageIcon },
  { label: "Speech Generation", icon: speechGenerationIcon },
];

const modelGroups = [
  { label: "Qwen Image 2 Models", icon: qwenImage2ModelsIcon },
  { label: "Grok Models", icon: grokModelsIcon },
  { label: "Seedance 1.5 Pro Models", icon: seedance15ProModelsIcon },
  { label: "Wan 2.6 Models", icon: wan26ModelsIcon },
  { label: "Kling O3 Models", icon: klingO3ModelsIcon },
  { label: "OpenAI Models", icon: openAIModelsIcon },
  { label: "Wan 2.5 Models", icon: wan25ModelsIcon },
  { label: "Seedream AI Models", icon: seedreamAIModelsIcon },
  { label: "Wan 2.2 Models", icon: wan22ModelsIcon },
  { label: "Dreamina AI Models", icon: dreaminaAIModelsIcon },
  { label: "Seedance Video Models", icon: seedanceVideoModelsIcon },
  { label: "Flux Image Tools", icon: fluxImageToolsIcon },
  { label: "Minimax Hailuo Models", icon: minimaxHailuoModelsIcon },
  { label: "Kling Models", icon: klingModelsIcon },
  { label: "Google Models", icon: googleModelsIcon },
  { label: "Flux Kontext Models", icon: fluxKontextModelsIcon },
  { label: "Runwayml AI Models", icon: runwaymlAIModelsIcon },
  { label: "Wan 2.1 Video Models", icon: wan21VideoModelsIcon },
];

const categories = [
  { name: "text-to-video" },
  { name: "text-to-image" },
  { name: "lora-support" },
  { name: "image-to-video" },
  { name: "image-to-image" },
  { name: "image-to-3d" },
  { name: "video-dubbing" },
  { name: "training" },
  { name: "video-to-video" },
  { name: "upscaler" },
  { name: "video-effects" },
  { name: "image-effects" },
  { name: "portrait-transfer" },
  { name: "text-to-audio" },
  { name: "ai-remover" },
  { name: "digital-human" },
] as const;

type CatalogModel = {
  id: number;
  type: (typeof categories)[number]["name"];
  name: string;
  description: string;
  /** Extra phrases matched when the search box contains chip labels or keywords */
  tags: string[];
};

const ALL_MODELS: CatalogModel[] = [
  {
    id: 1,
    type: "text-to-image",
    name: "bytedance / seedream-v4.5 / edit",
    description:
      "Alibaba's 2nd-gen image generation with strong multilingual prompts and editing.",
    tags: ["seedream ai models", "best image models", "image editing"],
  },
  {
    id: 2,
    type: "text-to-video",
    name: "openai / sora-2 / generate",
    description:
      "Video and audio generation with improved physics, realism, and sync.",
    tags: ["openai models", "best video models", "audio for video"],
  },
  {
    id: 3,
    type: "image-to-video",
    name: "kling / kling-v2.6 / i2v",
    description:
      "High-quality image-to-video with motion control and lip-sync options.",
    tags: [
      "kling models",
      "kling o3 models",
      "best video models",
      "motion control models",
    ],
  },
  {
    id: 4,
    type: "image-to-image",
    name: "google / nano-banana-pro / edit",
    description:
      "Gemini-stack image generation and editing with better text handling.",
    tags: ["google models", "best image models", "image editing"],
  },
  {
    id: 5,
    type: "lora-support",
    name: "wavespeed-ai / flux-dev / lora",
    description: "Fast LoRA-tuned Flux for stylized and custom checkpoints.",
    tags: ["lora generation", "flux image tools", "flux kontext models"],
  },
  {
    id: 6,
    type: "text-to-video",
    name: "alibaba / wan-2.6 / t2v",
    description: "Wan 2.6 text-to-video with efficient long-clip generation.",
    tags: ["wan 2.6 models", "best video models"],
  },
  {
    id: 7,
    type: "image-to-video",
    name: "bytedance / seedance-1.5-pro / i2v",
    description: "Seedance 1.5 Pro for cinematic motion from stills.",
    tags: ["seedance 1.5 pro models", "seedance video models"],
  },
  {
    id: 8,
    type: "text-to-image",
    name: "qwen / qwen-image-2 / generate",
    description: "Qwen Image 2 for sharp detail and layout-aware generation.",
    tags: ["qwen image 2 models", "best image models"],
  },
  {
    id: 9,
    type: "text-to-image",
    name: "xai / grok-image / generate",
    description: "Grok image model tuned for fast creative iterations.",
    tags: ["grok models"],
  },
  {
    id: 10,
    type: "text-to-video",
    name: "minimax / hailuo-02 / t2v",
    description: "Minimax Hailuo for stylized and ad-ready short videos.",
    tags: ["minimax hailuo models", "best video models"],
  },
  {
    id: 11,
    type: "image-to-3d",
    name: "tripo / tripo-v2 / image-to-3d",
    description: "Turn product shots into usable 3D meshes.",
    tags: ["3d creation"],
  },
  {
    id: 12,
    type: "training",
    name: "wavespeed-ai / lora-trainer / finetune",
    description: "Train custom LoRAs on your dataset with managed GPUs.",
    tags: ["training tools", "lora generation"],
  },
  {
    id: 13,
    type: "video-to-video",
    name: "runway / gen4-turbo / v2v",
    description: "Restyle and transform clips while keeping structure.",
    tags: ["runwayml ai models", "video edit", "video effects"],
  },
  {
    id: 14,
    type: "upscaler",
    name: "wavespeed-ai / video-upscale-4k",
    description: "Upscale SD footage to crisp 4K with temporal consistency.",
    tags: ["enhance videos", "upscale image", "best video models"],
  },
  {
    id: 15,
    type: "text-to-audio",
    name: "wavespeed-ai / music-gen / t2a",
    description: "Generate stems and full tracks from text prompts.",
    tags: ["generate music", "audio for video"],
  },
  {
    id: 16,
    type: "digital-human",
    name: "heygen / avatar-lite / lipsync",
    description: "Avatar lipsync models for talking-head video.",
    tags: ["avatar lipsync models", "audio for video"],
  },
  {
    id: 17,
    type: "ai-remover",
    name: "wavespeed-ai / remove-object / inpaint",
    description: "Remove unwanted objects or people from images and frames.",
    tags: ["remove anything", "ultra selection", "image editing"],
  },
  {
    id: 18,
    type: "image-effects",
    name: "wavespeed-ai / dreamina-fx / stylize",
    description: "Dreamina-style effects and stylized stills.",
    tags: ["dreamina ai models", "image effects"],
  },
  {
    id: 19,
    type: "portrait-transfer",
    name: "wavespeed-ai / face-swap-pro",
    description: "Portrait transfer and identity-aware swaps.",
    tags: ["swap anything", "portrait transfer"],
  },
  {
    id: 20,
    type: "video-dubbing",
    name: "wavespeed-ai / dub-studio / translate",
    description: "Dub and translate speech while matching lip timing.",
    tags: ["audio for video", "video dubbing"],
  },
  {
    id: 21,
    type: "video-effects",
    name: "wavespeed-ai / first-last-frame / morph",
    description: "Interpolate between first and last frames for motion.",
    tags: ["first and last frame video", "video effects"],
  },
  {
    id: 22,
    type: "text-to-image",
    name: "openai / gpt-image-1 / generate",
    description: "OpenAI image API with strong instruction following.",
    tags: ["openai models"],
  },
  {
    id: 23,
    type: "image-to-video",
    name: "google / veo-3.1 / i2v",
    description: "Native 1080p image-to-video with flexible camera motion.",
    tags: ["google models", "best video models"],
  },
  {
    id: 24,
    type: "text-to-image",
    name: "bytedance / dreamina-3 / generate",
    description: "Dreamina text-to-image tuned for illustration workflows.",
    tags: ["dreamina ai models"],
  },
  {
    id: 25,
    type: "image-to-image",
    name: "black-forest-labs / flux-kontext / edit",
    description: "Flux Kontext for in-context edits and variations.",
    tags: ["flux kontext models", "flux image tools"],
  },
  {
    id: 26,
    type: "text-to-video",
    name: "alibaba / wan-2.1-video / t2v",
    description: "Wan 2.1 video generation baseline with low latency.",
    tags: ["wan 2.1 video models", "wan 2.5 models"],
  },
  {
    id: 27,
    type: "text-to-video",
    name: "alibaba / wan-2.5 / t2v",
    description: "Wan 2.5 with improved motion coherence.",
    tags: ["wan 2.5 models"],
  },
  {
    id: 31,
    type: "text-to-video",
    name: "alibaba / wan-2.2 / t2v",
    description: "Wan 2.2 text-to-video with efficient sampling.",
    tags: ["wan 2.2 models"],
  },
  {
    id: 28,
    type: "text-to-image",
    name: "wavespeed-ai / object-detector / vision",
    description:
      "Detect, segment, and label objects in images and video frames.",
    tags: ["object detection and segmentation", "content detection models"],
  },
  {
    id: 29,
    type: "text-to-audio",
    name: "elevenlabs / speech-v2 / tts",
    description: "Natural speech generation for narration and dubbing.",
    tags: ["speech generation", "audio for video"],
  },
  {
    id: 30,
    type: "image-to-video",
    name: "wavespeed-ai / motion-brush / control",
    description: "Paint motion paths and drive subjects with control nets.",
    tags: ["motion control models"],
  },
];

const FEATURED_MODELS = [
  {
    id: 1,
    name: "flux-pro/kontext",
    provider: "wavespeed-ai",
    type: "image-to-image",
    description:
      "Flux Kontext for in-context edits, identity-preserving variations, and text rendering.",
    speed: "2.4s",
    speedBar: 46,
    tps: "39tps",
    status: 5,
    image: thumb1,
  },
  {
    id: 2,
    name: "wan-2.6/t2v",
    provider: "wavespeed-ai",
    type: "text-to-video",
    description:
      "Wan 2.6 text-to-video with efficient long-clip generation and audio sync.",
    speed: "3.1s",
    speedBar: 38,
    tps: "32tps",
    status: 5,
    image: thumb2,
  },
  {
    id: 3,
    name: "flux-dev/lora",
    provider: "wavespeed-ai",
    type: "text-to-image",
    description:
      "Fast LoRA-tuned Flux for stylized and custom checkpoint generation.",
    speed: "1.8s",
    speedBar: 55,
    tps: "45tps",
    status: 5,
    image: thumb3,
  },
  {
    id: 4,
    name: "gpt-image-1",
    provider: "openai",
    type: "text-to-image",
    description:
      "OpenAI image API with strong instruction following and text handling.",
    speed: "4.2s",
    speedBar: 30,
    tps: "28tps",
    status: 5,
    image: thumb4,
  },
  {
    id: 5,
    name: "kling-v2.6",
    provider: "kling-ai",
    type: "text-to-video",
    description:
      "High-quality video generation with motion control and lip-sync options.",
    speed: "5.1s",
    speedBar: 25,
    tps: "22tps",
    status: 5,
    image: thumb5,
  },
  {
    id: 6,
    name: "sora-2",
    provider: "openai",
    type: "text-to-video",
    description:
      "State-of-the-art video and audio generation with accurate physics and realism.",
    speed: "6.3s",
    speedBar: 20,
    tps: "18tps",
    status: 5,
    image: thumb6,
  },
  {
    id: 7,
    name: "veo-3.1",
    provider: "google",
    type: "text-to-video",
    description:
      "Native 1080p video synthesis with flexible camera motion and enhanced quality.",
    speed: "3.8s",
    speedBar: 35,
    tps: "30tps",
    status: 5,
    image: thumb7,
  },
  {
    id: 8,
    name: "seedance-v1.5",
    provider: "bytedance",
    type: "text-to-video",
    description:
      "Seedance 1.5 Pro for cinematic motion from stills with rich detail.",
    speed: "4.5s",
    speedBar: 28,
    tps: "25tps",
    status: 5,
    image: thumb8,
  },
];

function SpeedBar({ percent }: { percent: number }) {
  return (
    <div className="bg-foreground/10 h-0.75 w-16">
      <div className="bg-foreground h-full" style={{ width: `${percent}%` }} />
    </div>
  );
}

function StatusDots({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-green h-3 w-1" />
      ))}
    </div>
  );
}

function modelSearchHaystack(model: CatalogModel): string {
  return [model.name, model.description, model.type, ...model.tags]
    .join(" ")
    .toLowerCase();
}

function matchesSearch(model: CatalogModel, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return modelSearchHaystack(model).includes(q);
}

function CategoryRow({
  name,
  count,
  checked,
  onToggle,
}: {
  name: string;
  count: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="text-foreground/80 hover:text-foreground flex cursor-pointer items-center justify-between gap-2 text-sm">
      <span className="flex items-center gap-2">
        <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="peer absolute inset-0 z-20 cursor-pointer opacity-0"
          />
          <span
            className="border-foreground/15 peer-checked:border-foreground peer-checked:bg-foreground pointer-events-none absolute inset-0 rounded-xs border bg-transparent"
            aria-hidden="true"
          />
          <Check
            className="text-background pointer-events-none relative z-10 size-2.5 opacity-0 peer-checked:opacity-100"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </span>
        {name}
      </span>
      <span className="text-foreground/40 text-xs">{count}</span>
    </label>
  );
}

const modelsSlides: SlideConfig[] = [
  {
    id: "models-kling",
    enabled: true,
    badge: "Featured",
    title: "Kling O3",
    description:
      "Convert text or images into lip-synced HD videos in one step — faster and more budget-friendly, perfect for quick, sound-on content.",
    action: {
      label: "Try Model",
      href: "/models/google/nano-banana-pro/edit?entry=explore",
    },
    imageKey: "slide-1",
  },
  {
    id: "models-veo",
    enabled: true,
    badge: "New Model",
    title: "Google Veo 3.1",
    description:
      "Native 1080p resolution video synthesis, delivering enhanced quality and flexibility for creators.",
    action: {
      label: "Try Model",
      href: "/models/google/nano-banana-pro/edit?entry=explore",
    },
    imageKey: "slide-3",
  },
  {
    id: "models-sora",
    enabled: true,
    badge: "Video",
    title: "OpenAI Sora 2",
    description:
      "State of the art video and audio generation. More accurate physics, sharper realism, synchronized audio, enhanced steerability.",
    action: {
      label: "Try Model",
      href: "/models/google/nano-banana-pro/edit?entry=explore",
    },
    imageKey: "slide-4",
  },
  {
    id: "models-seedream",
    enabled: true,
    badge: "Image",
    title: "Seedream v4.5",
    description:
      "Unifies generation and editing, tackling knowledge-driven, reasoning-heavy tasks — now faster, up to 4K.",
    action: {
      label: "Try Model",
      href: "/models/google/nano-banana-pro/edit?entry=explore",
    },
    imageKey: "slide-2",
  },
  {
    id: "models-wan",
    enabled: true,
    badge: "Popular",
    title: "Wan 2.6",
    description:
      "Next-level AI video model: multilingual, cinematic, fully audio-synced. Built by Alibaba's Wan team.",
    action: {
      label: "Try Model",
      href: "/models/google/nano-banana-pro/edit?entry=explore",
    },
    imageKey: "slide-5",
  },
];

export default function ModelsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("most-popular");

  const countsByCategory = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const m of ALL_MODELS) {
      acc[m.type] = (acc[m.type] ?? 0) + 1;
    }
    return acc;
  }, []);

  const isFiltering =
    searchQuery.trim() !== "" || selectedCategories.length > 0;

  const filteredModels = useMemo(() => {
    let list = ALL_MODELS.filter(
      (m) =>
        matchesSearch(m, searchQuery) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(m.type)),
    );
    if (sortBy === "newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    } else if (sortBy === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [searchQuery, selectedCategories, sortBy]);

  function toggleCategory(name: string) {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <HeroSlideshow slides={modelsSlides} />

      <section className="px-6 pt-5 pb-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="border-foreground/15 focus-within:border-foreground/30 focus-within:ring-foreground/15 flex items-center gap-3 border px-5 py-4 transition-colors focus-within:ring-2">
            <svg
              className="text-foreground/70 size-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, task, category and more"
              className="text-foreground placeholder:text-foreground/50 min-w-0 flex-1 bg-transparent font-mono text-base outline-none"
              autoComplete="off"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-foreground/50 hover:text-foreground hover:bg-foreground/5 shrink-0 rounded-xs p-1 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            ) : null}
          </div>

          <div className="-mx-1 mt-5 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {quickTools.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSearchQuery(item.label)}
                aria-pressed={searchQuery === item.label}
                className={cn(
                  "border-foreground/10 text-foreground/75 hover:text-foreground hover:bg-foreground/5 flex shrink-0 cursor-pointer items-center gap-2 rounded-xs border px-2 py-1 text-sm transition-colors",
                  searchQuery === item.label &&
                    "border-foreground/35 bg-foreground/5 text-foreground",
                )}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0"
                />
                {item.label}
              </button>
            ))}
          </div>

          <div className="-mx-1 mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {modelGroups.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSearchQuery(item.label)}
                aria-pressed={searchQuery === item.label}
                className={cn(
                  "border-foreground/10 text-foreground/75 hover:text-foreground hover:bg-foreground/5 flex shrink-0 cursor-pointer items-center gap-2 rounded-xs border px-2 py-1 text-sm transition-colors",
                  searchQuery === item.label &&
                    "border-foreground/35 bg-foreground/5 text-foreground",
                )}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0"
                />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[230px_minmax(0,1fr)]">
            <aside className="border-foreground/5 hidden border-r-[0.5px] pr-6 md:block">
              <h3 className="text-foreground text-lg font-semibold">
                Category
              </h3>
              <div className="mt-5 space-y-2">
                {categories.map((item) => (
                  <CategoryRow
                    key={item.name}
                    name={item.name}
                    count={countsByCategory[item.name] ?? 0}
                    checked={selectedCategories.includes(item.name)}
                    onToggle={() => toggleCategory(item.name)}
                  />
                ))}
              </div>
            </aside>

            <section>
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">
                  {isFiltering ? (
                    <>
                      {filteredModels.length}{" "}
                      {filteredModels.length === 1 ? "Model" : "Models"}
                    </>
                  ) : (
                    "Featured Models"
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="border-foreground/15 text-foreground/80 hover:bg-foreground/5 flex h-8 cursor-pointer items-center gap-1 rounded-xs border bg-transparent px-3 text-xs font-bold md:hidden"
                    aria-expanded={isFilterOpen}
                    aria-controls="mobile-category-filter"
                  >
                    Filter
                    <svg
                      className={`size-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isFiltering && (
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger
                        size="sm"
                        className="border-foreground/15 text-foreground/80 hover:bg-foreground/5 h-8 cursor-pointer bg-transparent text-xs font-bold shadow-none"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectItem value="most-popular">
                          Most Popular
                        </SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="name-asc">Name A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {isFilterOpen ? (
                <div
                  id="mobile-category-filter"
                  className="bg-surface mt-4 p-4 md:hidden"
                >
                  <h3 className="text-foreground text-lg font-semibold">
                    Category
                  </h3>
                  <div className="mt-5 space-y-2">
                    {categories.map((item) => (
                      <CategoryRow
                        key={item.name}
                        name={item.name}
                        count={countsByCategory[item.name] ?? 0}
                        checked={selectedCategories.includes(item.name)}
                        onToggle={() => toggleCategory(item.name)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {isFiltering ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {filteredModels.length === 0 ? (
                    <p className="text-foreground/55 col-span-full py-12 text-center text-sm">
                      No models match your search and category filters.
                    </p>
                  ) : (
                    filteredModels.map((item) => (
                      <a
                        key={item.id}
                        href="/models/google/nano-banana-pro/edit"
                        className="bg-surface hover:bg-surface/80 flex flex-col justify-center gap-1 px-4 py-3 transition-colors"
                      >
                        <span className="text-foreground/45 font-mono text-xs">
                          {item.type}
                        </span>
                        <h3 className="text-foreground text-sm leading-tight font-semibold">
                          {item.name.includes("/") ? (
                            <>
                              <span className="text-foreground/55">
                                {`${item.name.split("/")[0].trim()} / `}
                              </span>
                              {item.name.split("/").slice(1).join("/").trim()}
                            </>
                          ) : (
                            item.name
                          )}
                        </h3>
                        <p className="text-foreground/55 line-clamp-1 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </a>
                    ))
                  )}
                </div>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {FEATURED_MODELS.map((model) => (
                    <a
                      key={model.id}
                      href="/models/google/nano-banana-pro/edit"
                      className="border-foreground/10 group hover:bg-foreground/3 grid grid-cols-[80px_1fr] overflow-hidden border transition-colors"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={model.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground/45 font-mono text-xs">
                            {model.type}
                          </span>
                          <StatusDots count={model.status} />
                        </div>
                        <h3 className="text-foreground text-sm leading-tight font-semibold">
                          <span className="text-foreground/55">
                            {model.provider} /{" "}
                          </span>
                          {model.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-mono text-xs">
                              {model.speed}
                            </span>
                            <SpeedBar percent={model.speedBar} />
                          </div>
                          <span className="text-foreground/60 font-mono text-xs uppercase">
                            {model.tps}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

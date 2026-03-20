"use client";

import Image from "next/image";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { name: "text-to-video", count: 84 },
  { name: "text-to-image", count: 119 },
  { name: "lora-support", count: 52 },
  { name: "image-to-video", count: 163 },
  { name: "image-to-image", count: 116 },
  { name: "image-to-3d", count: 14 },
  { name: "video-dubbing", count: 6 },
  { name: "training", count: 11 },
  { name: "video-to-video", count: 28 },
  { name: "upscaler", count: 16 },
  { name: "video-effects", count: 69 },
  { name: "image-effects", count: 18 },
  { name: "portrait-transfer", count: 13 },
  { name: "text-to-audio", count: 38 },
  { name: "ai-remover", count: 12 },
  { name: "digital-human", count: 32 },
];

const models = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  type: "text-to-image",
  name: "bytedance / seedream-v4.5 / edit",
  description:
    "Alibaba's 2nd-gen image generation models with breakthrough quality, precision, and multilingual prompt understanding.",
}));

export default function ExploreSearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="px-6 pt-5 pb-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-surface focus-within:border-foreground/30 focus-within:ring-foreground/15 flex items-center gap-3 border border-transparent px-5 py-4 transition-colors focus-within:ring-2">
            <svg
              className="text-foreground/70 size-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by model, task, category and more"
              className="text-foreground placeholder:text-foreground/30 w-full bg-transparent font-mono text-base outline-none"
            />
          </div>

          <div className="-mx-1 mt-5 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {quickTools.map((item) => (
              <button
                key={item.label}
                type="button"
                className="border-foreground/10 text-foreground/75 hover:text-foreground hover:bg-foreground/5 flex shrink-0 cursor-pointer items-center gap-1 rounded-xs border px-1 py-0.5 text-xs transition-colors"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0"
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
                className="border-foreground/10 text-foreground/75 hover:text-foreground hover:bg-foreground/5 flex shrink-0 cursor-pointer items-center gap-1 rounded-xs border px-1 py-0.5 text-xs transition-colors"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0"
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
                  <label
                    key={item.name}
                    className="text-foreground/80 hover:text-foreground flex cursor-pointer items-center justify-between gap-2 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="border-foreground/15 checked:border-foreground checked:bg-foreground size-3.5 appearance-none rounded-xs border bg-transparent"
                      />
                      {item.name}
                    </span>
                    <span className="text-foreground/40 text-xs">
                      {item.count}
                    </span>
                  </label>
                ))}
              </div>
            </aside>

            <section>
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">
                  794 Models
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
                  <Select defaultValue="most-popular">
                    <SelectTrigger
                      size="sm"
                      className="border-foreground/15 text-foreground/80 hover:bg-foreground/5 h-8 cursor-pointer bg-transparent text-xs font-bold shadow-none"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="name-asc">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <label
                        key={item.name}
                        className="text-foreground/80 hover:text-foreground flex cursor-pointer items-center justify-between gap-2 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="border-foreground/15 checked:border-foreground checked:bg-foreground size-3.5 appearance-none rounded-xs border bg-transparent"
                          />
                          {item.name}
                        </span>
                        <span className="text-foreground/40 text-xs">
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {models.map((item) => (
                  <article
                    key={item.id}
                    className="bg-surface min-h-30 px-4 py-4"
                  >
                    <p className="text-foreground/45 font-mono text-xs">
                      {item.type}
                    </p>
                    <h3 className="text-foreground mt-1 text-lg leading-tight font-semibold">
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
                    <p className="text-foreground/55 mt-2 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

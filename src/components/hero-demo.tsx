"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type TabKey =
  | "generate_image"
  | "create_video"
  | "analyze_chat"
  | "generate_speech";
type LangKey = "node" | "python" | "curl";

const tabs: { key: TabKey; name: string; icon: string }[] = [
  {
    key: "generate_image",
    name: "generate_image.ts",
    icon: "/images/tab-icon-image.svg",
  },
  {
    key: "create_video",
    name: "create_video.ts",
    icon: "/images/tab-icon-video.svg",
  },
  {
    key: "analyze_chat",
    name: "analyze_chat.ts",
    icon: "/images/tab-icon-chat.svg",
  },
  {
    key: "generate_speech",
    name: "generate_speech.ts",
    icon: "/images/tab-icon-speech.svg",
  },
];

const langTabs: LangKey[] = ["node", "python", "curl"];

// --- Syntax coloring helpers ---
const kw = "text-[#4b4bff]";
const id = "text-[#191e2e]";
const tx = "text-[#1b1b1b]";
const fn = "text-[#5daff1]";
const st = "text-[#ee560a]";
const cm = "text-[#5f6673]";
const py_kw = "text-[#4b4bff]";
const py_fn = "text-[#5daff1]";
const py_st = "text-[#ee560a]";
const sh_st = "text-[#ee560a]";

type CodeLine = { content: ReactNode };

const codeData: Record<
  TabKey,
  Record<
    LangKey,
    { lines: CodeLine[]; status: string; output: string; meta: string }
  >
> = {
  generate_image: {
    node: {
      lines: [
        { content: <span className={cm}>{" // Real-time Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" output = "}</span>
              <span className={kw}>{" await"}</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={fn}>.run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={st}>{'  "wavespeed-ai/flux-dev"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  {"}</span> },
        {
          content: (
            <>
              <span className={tx}>{"    prompt: "}</span>
              <span className={st}>{'"A person running in the city"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    aspect_ratio: "}</span>
              <span className={st}>{'"16:9"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    output_format: "}</span>
              <span className={st}>{'"webp"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
      ],
      status: "Done (0.4s)",
      output: "Generated output",
      meta: "1024\u00d71024 \u00b7 PNG \u00b7 2.4MB",
    },
    python: {
      lines: [
        { content: <span className={cm}>{" # Real-time Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={py_kw}>import</span>
              <span className={tx}> wavespeed</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>output = wavespeed.</span>
              <span className={py_fn}>run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={py_st}>{'  "wavespeed-ai/flux-dev"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  prompt="}</span>
              <span className={py_st}>{'"A person running in the city"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  aspect_ratio="}</span>
              <span className={py_st}>{'"16:9"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  output_format="}</span>
              <span className={py_st}>{'"webp"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      status: "Done (0.4s)",
      output: "Generated output",
      meta: "1024\u00d71024 \u00b7 PNG \u00b7 2.4MB",
    },
    curl: {
      lines: [
        { content: <span className={cm}>{" # Real-time Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>curl -X POST \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={sh_st}>
                {'  "https://api.wavespeed.ai/v1/run"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Authorization: Bearer $API_KEY"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Content-Type: application/json"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -d '{"}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"model"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"wavespeed-ai/flux-dev"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"prompt"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"A person running in the city"'}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  }'"}</span>
            </>
          ),
        },
      ],
      status: "Done (0.4s)",
      output: "Generated output",
      meta: "1024\u00d71024 \u00b7 PNG \u00b7 2.4MB",
    },
  },
  create_video: {
    node: {
      lines: [
        { content: <span className={cm}>{" // Video Generation"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" video = "}</span>
              <span className={kw}>{" await"}</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={fn}>.run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={st}>{'  "wavespeed-ai/wan-2.6/t2v"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  {"}</span> },
        {
          content: (
            <>
              <span className={tx}>{"    prompt: "}</span>
              <span className={st}>{'"A timelapse of a sunset"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    duration: "}</span>
              <span className={id}>{"5"}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    resolution: "}</span>
              <span className={st}>{'"1080p"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
      ],
      status: "Done (3.2s)",
      output: "Generated video",
      meta: "1920\u00d71080 \u00b7 MP4 \u00b7 12.1MB",
    },
    python: {
      lines: [
        { content: <span className={cm}>{" # Video Generation"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={py_kw}>import</span>
              <span className={tx}> wavespeed</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>video = wavespeed.</span>
              <span className={py_fn}>run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={py_st}>{'  "wavespeed-ai/wan-2.6/t2v"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  prompt="}</span>
              <span className={py_st}>{'"A timelapse of a sunset"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  duration="}</span>
              <span className={id}>{"5"}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  resolution="}</span>
              <span className={py_st}>{'"1080p"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      status: "Done (3.2s)",
      output: "Generated video",
      meta: "1920\u00d71080 \u00b7 MP4 \u00b7 12.1MB",
    },
    curl: {
      lines: [
        { content: <span className={cm}>{" # Video Generation"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>curl -X POST \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={sh_st}>
                {'  "https://api.wavespeed.ai/v1/run"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Authorization: Bearer $API_KEY"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Content-Type: application/json"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -d '{"}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"model"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"wavespeed-ai/wan-2.6/t2v"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"prompt"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"A timelapse of a sunset"'}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  }'"}</span>
            </>
          ),
        },
      ],
      status: "Done (3.2s)",
      output: "Generated video",
      meta: "1920\u00d71080 \u00b7 MP4 \u00b7 12.1MB",
    },
  },
  analyze_chat: {
    node: {
      lines: [
        { content: <span className={cm}>{" // Chat Analysis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" result = "}</span>
              <span className={kw}>{" await"}</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={fn}>.run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={st}>{'  "wavespeed-ai/llama-4-scout"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  {"}</span> },
        {
          content: (
            <>
              <span className={tx}>{"    prompt: "}</span>
              <span className={st}>{'"Summarize this conversation"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    max_tokens: "}</span>
              <span className={id}>{"512"}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    temperature: "}</span>
              <span className={id}>{"0.7"}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
      ],
      status: "Done (1.1s)",
      output: "Analysis result",
      meta: "512 tokens \u00b7 JSON \u00b7 1.2KB",
    },
    python: {
      lines: [
        { content: <span className={cm}>{" # Chat Analysis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={py_kw}>import</span>
              <span className={tx}> wavespeed</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>result = wavespeed.</span>
              <span className={py_fn}>run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={py_st}>{'  "wavespeed-ai/llama-4-scout"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  prompt="}</span>
              <span className={py_st}>{'"Summarize this conversation"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  max_tokens="}</span>
              <span className={id}>{"512"}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  temperature="}</span>
              <span className={id}>{"0.7"}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      status: "Done (1.1s)",
      output: "Analysis result",
      meta: "512 tokens \u00b7 JSON \u00b7 1.2KB",
    },
    curl: {
      lines: [
        { content: <span className={cm}>{" # Chat Analysis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>curl -X POST \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={sh_st}>
                {'  "https://api.wavespeed.ai/v1/run"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Authorization: Bearer $API_KEY"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Content-Type: application/json"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -d '{"}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"model"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"wavespeed-ai/llama-4-scout"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"prompt"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"Summarize this conversation"'}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  }'"}</span>
            </>
          ),
        },
      ],
      status: "Done (1.1s)",
      output: "Analysis result",
      meta: "512 tokens \u00b7 JSON \u00b7 1.2KB",
    },
  },
  generate_speech: {
    node: {
      lines: [
        { content: <span className={cm}>{" // Speech Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" audio = "}</span>
              <span className={kw}>{" await"}</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={fn}>.run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={st}>{'  "wavespeed-ai/kokoro-tts"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  {"}</span> },
        {
          content: (
            <>
              <span className={tx}>{"    text: "}</span>
              <span className={st}>{'"Hello from WaveSpeed"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    voice: "}</span>
              <span className={st}>{'"alloy"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    format: "}</span>
              <span className={st}>{'"mp3"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
      ],
      status: "Done (0.8s)",
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
    python: {
      lines: [
        { content: <span className={cm}>{" # Speech Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={py_kw}>import</span>
              <span className={tx}> wavespeed</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>audio = wavespeed.</span>
              <span className={py_fn}>run</span>
              <span className={tx}>(</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={py_st}>{'  "wavespeed-ai/kokoro-tts"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  text="}</span>
              <span className={py_st}>{'"Hello from WaveSpeed"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  voice="}</span>
              <span className={py_st}>{'"alloy"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  format="}</span>
              <span className={py_st}>{'"mp3"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      status: "Done (0.8s)",
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
    curl: {
      lines: [
        { content: <span className={cm}>{" # Speech Synthesis"}</span> },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={tx}>curl -X POST \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={sh_st}>
                {'  "https://api.wavespeed.ai/v1/run"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Authorization: Bearer $API_KEY"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -H "}</span>
              <span className={sh_st}>
                {'"Content-Type: application/json"'}
              </span>
              <span className={tx}> \</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  -d '{"}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"model"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"wavespeed-ai/kokoro-tts"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"    "}</span>
              <span className={sh_st}>{'"text"'}</span>
              <span className={tx}>{": "}</span>
              <span className={sh_st}>{'"Hello from WaveSpeed"'}</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  }'"}</span>
            </>
          ),
        },
      ],
      status: "Done (0.8s)",
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
  },
};

export function HeroDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>("generate_image");
  const [activeLang, setActiveLang] = useState<LangKey>("node");

  const current = codeData[activeTab][activeLang];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[960px] px-4 py-8 md:px-0">
        <div className="flex flex-col gap-2 rounded-[5px] bg-white p-2">
          {/* Tab bar */}
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex w-full gap-1 overflow-x-auto [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex cursor-pointer items-center gap-1 rounded-[3px] px-4 py-2 font-mono text-xs transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#f2f3f5] text-[#191e2e]"
                      : "bg-[#f2f3f5] text-[#191e2e]"
                  }`}
                >
                  {activeTab === tab.key && (
                    <div className="absolute inset-0 rounded-[3px] bg-[#dee2e9]" />
                  )}
                  <Image
                    src={tab.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="relative shrink-0"
                    unoptimized
                  />
                  <span className="relative">{tab.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {langTabs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`cursor-pointer rounded-[2px] px-2 py-1 font-mono text-xs transition-colors ${
                    activeLang === lang
                      ? "bg-[#262626] text-white"
                      : "text-[#191e2e]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Editor content */}
          <div className="flex flex-col overflow-hidden rounded-[3px] bg-[#ecedee] md:flex-row">
            {/* Code panel */}
            <div className="relative h-[260px] bg-[#f2f3f5] md:h-[348px] md:flex-1">
              <div className="absolute top-10 left-6 flex">
                {/* Line numbers */}
                <div className="flex w-6 flex-col gap-1 font-mono text-[13px] leading-tight text-[#7f848e]">
                  {current.lines.map((_, i) => (
                    <p key={i} className="opacity-40">
                      {i + 1}
                    </p>
                  ))}
                </div>
                {/* Code */}
                <div className="flex flex-col gap-1 font-mono text-[13px] leading-tight">
                  {current.lines.map((line, i) => (
                    <p key={i}>{line.content}</p>
                  ))}
                </div>
              </div>
              {/* Status */}
              <div className="absolute bottom-3 left-6 flex items-center gap-2 rounded bg-white px-2 py-1 md:top-[308px] md:bottom-auto">
                <span className="size-[6px] rounded-full bg-[#22c55e]" />
                <span className="text-subtle font-mono text-xs leading-tight">
                  {current.status}
                </span>
              </div>
            </div>

            {/* Preview panel */}
            <div className="relative flex h-[260px] flex-col items-center justify-end overflow-hidden p-2 md:h-[348px] md:flex-1">
              {/* Image preview */}
              {activeTab === "generate_image" && (
                <Image
                  src="/images/editor-image-preview.webp"
                  alt="Generated output"
                  fill
                  className="pointer-events-none object-cover"
                />
              )}

              {/* Video preview */}
              {activeTab === "create_video" && (
                <video
                  src="https://d1q70pf5vjeyhc.wavespeed.ai/media/videos/1753847917474064981_X4mifEAx.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none absolute inset-0 size-full object-cover"
                />
              )}

              {/* Chat preview */}
              {activeTab === "analyze_chat" && (
                <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#f2f3f5] p-5">
                  <p className="mb-3 font-mono text-[10px] tracking-[1px] text-pretty text-[#7f848e] uppercase">
                    Response
                  </p>
                  <div className="flex flex-col gap-2 font-mono text-[12px] leading-normal text-[#1b1b1b]">
                    <p>The conversation covered four key areas:</p>
                    <div className="flex flex-col gap-1.5 pl-1">
                      <p className="text-pretty text-[#7f848e]">
                        <span className="text-[#1b1b1b]">1.</span> Q3 revenue
                        increased 23% year-over-year
                      </p>
                      <p className="text-pretty text-[#7f848e]">
                        <span className="text-[#1b1b1b]">2.</span> New API
                        launch scheduled for October
                      </p>
                      <p className="text-pretty text-[#7f848e]">
                        <span className="text-[#1b1b1b]">3.</span>{" "}
                        Infrastructure team hiring 5 engineers
                      </p>
                      <p className="text-pretty text-[#7f848e]">
                        <span className="text-[#1b1b1b]">4.</span> Partnership
                        agreement signed with Acme
                      </p>
                    </div>
                    <div className="mt-2 border-t border-black/5 pt-2">
                      <p className="text-[11px] text-pretty text-[#7f848e]">
                        Action item: Scale GPU cluster to 256 nodes by Q4,
                        targeting p99 latency &lt; 200ms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio preview */}
              {activeTab === "generate_speech" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#f2f3f5] px-8">
                  <div className="flex w-full items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b1b1b]">
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                      >
                        <path d="M1 1L9 6L1 11V1Z" fill="white" />
                      </svg>
                    </div>
                    <div className="flex h-10 flex-1 items-end gap-[2px]">
                      {[
                        0.3, 0.5, 0.8, 0.6, 1, 0.7, 0.4, 0.9, 0.5, 0.3, 0.7,
                        0.85, 0.6, 0.4, 0.9, 1, 0.7, 0.5, 0.3, 0.6, 0.8, 0.5,
                        0.7, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7, 0.8, 0.6, 0.4, 0.5,
                        0.7, 0.3, 0.6, 0.8, 0.5, 0.9, 0.4, 0.6, 0.8, 0.5, 0.3,
                        0.7, 0.9, 0.4, 0.6,
                      ].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full bg-[#1b1b1b]/20"
                          style={{ height: `${h * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex w-full justify-between font-mono text-[10px] text-[#7f848e]">
                    <span>0:00</span>
                    <span>0:04</span>
                  </div>
                  <p className="text-center font-mono text-[12px] leading-[1.4] text-pretty text-[#1b1b1b]/40">
                    &ldquo;Hello from WaveSpeed&rdquo;
                  </p>
                </div>
              )}

              <div className="relative flex h-[52px] w-full items-center gap-3 rounded-[2px] border border-white/10 bg-black/80 px-[9px] py-px backdrop-blur-[10px]">
                <div className="flex flex-col">
                  <p className="font-sans text-xs leading-4 text-pretty text-white">
                    {current.output}
                  </p>
                  <p className="text-footer-label font-mono text-[10px] leading-[15px] text-pretty">
                    {current.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

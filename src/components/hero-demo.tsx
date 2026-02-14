"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type TabKey = "image" | "video" | "chat" | "speech";
type LangKey = "node" | "python" | "curl";

const tabs: { key: TabKey; base: string; icon: string }[] = [
  {
    key: "video",
    base: "video",
    icon: "/images/tab-icon-video.svg",
  },
  {
    key: "image",
    base: "image",
    icon: "/images/tab-icon-image.svg",
  },
  {
    key: "chat",
    base: "chat",
    icon: "/images/tab-icon-chat.svg",
  },
  {
    key: "speech",
    base: "speech",
    icon: "/images/tab-icon-speech.svg",
  },
];

const langExt: Record<LangKey, string> = {
  node: ".ts",
  python: ".py",
  curl: ".sh",
};

const langTabs: LangKey[] = ["node", "python", "curl"];

// --- Syntax coloring helpers ---
const kw = "text-syntax-keyword";
const id = "text-ink";
const tx = "text-code-text";
const fn = "text-syntax-function";
const st = "text-syntax-string";
const cm = "text-syntax-comment";
const py_kw = "text-syntax-keyword";
const py_fn = "text-syntax-function";
const py_st = "text-syntax-string";
const sh_st = "text-syntax-string";

type CodeLine = { content: ReactNode };

const codeData: Record<
  TabKey,
  Record<
    LangKey,
    { lines: CodeLine[]; status: string; output: string; meta: string }
  >
> = {
  image: {
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
  video: {
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
  chat: {
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
  speech: {
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

const AUTO_ADVANCE_MS = 5000;

export function HeroDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>("video");
  const [activeLang, setActiveLang] = useState<LangKey>("node");
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const advance = useCallback(() => {
    setActiveTab((prev) => {
      const idx = tabs.findIndex((t) => t.key === prev);
      return tabs[(idx + 1) % tabs.length].key;
    });
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, AUTO_ADVANCE_MS);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleTabClick = (key: TabKey) => {
    setActiveTab(key);
    resetTimer();
  };

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

      <div className="relative mx-auto max-w-[960px] px-4 py-4 md:px-0 md:py-12">
        <div className="bg-background flex flex-col gap-2 rounded-[5px] p-2">
          {/* Tab bar */}
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex w-full gap-1 overflow-x-auto [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`relative flex cursor-pointer items-center gap-1 rounded-[3px] px-4 py-2 font-mono text-xs transition-colors ${
                    activeTab === tab.key
                      ? "bg-panel text-ink"
                      : "bg-panel text-ink"
                  }`}
                >
                  {activeTab === tab.key && (
                    <div
                      key={activeTab}
                      className="bg-progress-track absolute inset-y-0 left-0 animate-[progress-fill_linear] rounded-[3px]"
                      style={{
                        animationDuration: `${AUTO_ADVANCE_MS}ms`,
                      }}
                    />
                  )}
                  <Image
                    src={tab.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="relative shrink-0"
                    unoptimized
                  />
                  <span className="relative">
                    {tab.base}
                    {langExt[activeLang]}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {langTabs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`cursor-pointer rounded-[2px] px-2 py-1 font-mono text-xs transition-colors ${
                    activeLang === lang ? "bg-code-dark text-white" : "text-ink"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Editor content */}
          <div className="bg-panel-alt flex flex-col overflow-hidden rounded-[3px] md:flex-row">
            {/* Code panel */}
            <div className="bg-panel relative h-[260px] md:h-[348px] md:flex-1">
              <div className="absolute top-10 left-6 flex">
                {/* Line numbers */}
                <div className="text-secondary flex w-6 flex-col gap-1 font-mono text-[13px] leading-tight">
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
              <div className="bg-background absolute bottom-3 left-6 flex items-center gap-2 rounded px-2 py-1 md:top-[308px] md:bottom-auto">
                <span className="bg-green size-[6px] rounded-full" />
                <span className="text-subtle font-mono text-xs leading-tight">
                  {current.status}
                </span>
              </div>
            </div>

            {/* Preview panel */}
            <div className="relative flex h-[260px] flex-col items-center justify-end overflow-hidden p-2 md:h-[348px] md:flex-1">
              {/* Image preview */}
              {activeTab === "image" && (
                <Image
                  src="/images/editor-image-preview.webp"
                  alt="Generated output"
                  fill
                  className="pointer-events-none object-cover"
                />
              )}

              {/* Video preview */}
              {activeTab === "video" && (
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
              {activeTab === "chat" && (
                <div className="bg-panel absolute inset-0 flex flex-col overflow-hidden p-5">
                  <p className="text-secondary mb-3 font-mono text-[10px] tracking-[1px] text-pretty uppercase">
                    Response
                  </p>
                  <div className="text-code-text flex flex-col gap-2 font-mono text-[12px] leading-normal">
                    <p>The conversation covered four key areas:</p>
                    <div className="flex flex-col gap-1.5 pl-1">
                      <p className="text-secondary text-pretty">
                        <span className="text-code-text">1.</span> Q3 revenue
                        increased 23% year-over-year
                      </p>
                      <p className="text-secondary text-pretty">
                        <span className="text-code-text">2.</span> New API
                        launch scheduled for October
                      </p>
                      <p className="text-secondary text-pretty">
                        <span className="text-code-text">3.</span>{" "}
                        Infrastructure team hiring 5 engineers
                      </p>
                      <p className="text-secondary text-pretty">
                        <span className="text-code-text">4.</span> Partnership
                        agreement signed with Acme
                      </p>
                    </div>
                    <div className="border-foreground/5 mt-2 border-t pt-2">
                      <p className="text-secondary text-[11px] text-pretty">
                        Action item: Scale GPU cluster to 256 nodes by Q4,
                        targeting p99 latency &lt; 200ms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio preview */}
              {activeTab === "speech" && (
                <div className="bg-panel absolute inset-0 flex flex-col items-center justify-center gap-5 px-8">
                  <div className="flex w-full items-center gap-3">
                    <div className="bg-code-text flex size-8 shrink-0 items-center justify-center rounded-full">
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
                          className="bg-code-text/20 flex-1 rounded-full"
                          style={{ height: `${h * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-secondary flex w-full justify-between font-mono text-[10px]">
                    <span>0:00</span>
                    <span>0:04</span>
                  </div>
                  <p className="text-code-text/40 text-center font-mono text-[12px] leading-[1.4] text-pretty">
                    &ldquo;Hello from WaveSpeed&rdquo;
                  </p>
                </div>
              )}

              <div className="relative flex h-[52px] w-full items-center gap-3 rounded-[2px] border border-white/10 bg-black/80 px-[9px] py-px backdrop-blur-[10px]">
                <div className="flex flex-col">
                  <p className="font-sans text-xs leading-4 text-pretty text-white">
                    {current.output}
                  </p>
                  <p className="text-footer-label font-mono text-[10px] leading-4 text-pretty">
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

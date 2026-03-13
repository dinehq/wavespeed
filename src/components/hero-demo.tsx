"use client";

import Image from "next/image";
import editorPreview from "@/images/editor-image-preview.webp";
import TabIconVideo from "@/images/tab-icon-video.svg";
import TabIconImage from "@/images/tab-icon-image.svg";
import TabIconChat from "@/images/tab-icon-chat.svg";
import TabIconSpeech from "@/images/tab-icon-speech.svg";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { FC, SVGProps } from "react";

type TabKey = "image" | "video" | "chat" | "speech";
type LangKey = "node" | "python" | "curl";

const tabs: { key: TabKey; base: string; icon: FC<SVGProps<SVGSVGElement>> }[] =
  [
    {
      key: "image",
      base: "image",
      icon: TabIconImage,
    },
    {
      key: "video",
      base: "video",
      icon: TabIconVideo,
    },
    {
      key: "speech",
      base: "speech",
      icon: TabIconSpeech,
    },
    {
      key: "chat",
      base: "chat",
      icon: TabIconChat,
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

const py_kw = "text-syntax-keyword";
const py_fn = "text-syntax-function";
const py_st = "text-syntax-string";
const sh_st = "text-syntax-string";

type CodeLine = { content: ReactNode };

const codeData: Record<
  TabKey,
  Record<
    LangKey,
    { lines: CodeLine[]; raw: string; output: string; meta: string }
  >
> = {
  image: {
    node: {
      lines: [
        {
          content: (
            <>
              <span className={kw}>import</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={kw}>{" from"}</span>
              <span className={st}>{' "wavespeed"'}</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" output ="}</span>
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
              <span className={st}>
                {'  "google/nano-banana-pro/text-to-image"'}
              </span>
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
              <span className={tx}>{"    resolution: "}</span>
              <span className={st}>{'"2k"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
        { content: <>&nbsp;</> },
      ],
      raw: `import wavespeed from "wavespeed"

const output = await wavespeed.run(
  "google/nano-banana-pro/text-to-image",
  {
    prompt: "A person running in the city",
    aspect_ratio: "16:9",
    resolution: "2k"
  }
);`,
      output: "Generated output",
      meta: "2048\u00d71152 \u00b7 PNG \u00b7 4.8MB",
    },
    python: {
      lines: [
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
              <span className={py_st}>
                {'  "google/nano-banana-pro/text-to-image"'}
              </span>
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
              <span className={tx}>{"  resolution="}</span>
              <span className={py_st}>{'"2k"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      raw: `import wavespeed

output = wavespeed.run(
  "google/nano-banana-pro/text-to-image",
  prompt="A person running in the city",
  aspect_ratio="16:9",
  resolution="2k"
)`,
      output: "Generated output",
      meta: "2048\u00d71152 \u00b7 PNG \u00b7 4.8MB",
    },
    curl: {
      lines: [
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
              <span className={sh_st}>
                {'"google/nano-banana-pro/text-to-image"'}
              </span>
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
      raw: `curl -X POST \\
  "https://api.wavespeed.ai/v1/run" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "google/nano-banana-pro/text-to-image",
    "prompt": "A person running in the city"
  }'`,
      output: "Generated output",
      meta: "2048\u00d71152 \u00b7 PNG \u00b7 4.8MB",
    },
  },
  video: {
    node: {
      lines: [
        {
          content: (
            <>
              <span className={kw}>import</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={kw}>{" from"}</span>
              <span className={st}>{' "wavespeed"'}</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" output ="}</span>
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
              <span className={st}>{'  "alibaba/wan-2.6/text-to-video"'}</span>
              <span className={tx}>,</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  {"}</span> },
        {
          content: (
            <>
              <span className={tx}>{"    prompt: "}</span>
              <span className={st}>
                {'"Driving through a futuristic city"'}
              </span>
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
              <span className={st}>{'"720p"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{"  }"}</span> },
        { content: <span className={tx}>{");"}</span> },
        { content: <>&nbsp;</> },
      ],
      raw: `import wavespeed from "wavespeed"

const output = await wavespeed.run(
  "alibaba/wan-2.6/text-to-video",
  {
    prompt: "Driving through a futuristic city",
    duration: 5,
    resolution: "720p"
  }
);`,
      output: "Generated video",
      meta: "1280\u00d7720 \u00b7 MP4 \u00b7 8.4MB",
    },
    python: {
      lines: [
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
              <span className={py_st}>
                {'  "alibaba/wan-2.6/text-to-video"'}
              </span>
              <span className={tx}>,</span>
            </>
          ),
        },
        {
          content: (
            <>
              <span className={tx}>{"  prompt="}</span>
              <span className={py_st}>
                {'"Driving through a futuristic city"'}
              </span>
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
              <span className={py_st}>{'"720p"'}</span>
            </>
          ),
        },
        { content: <span className={tx}>{")"}</span> },
      ],
      raw: `import wavespeed

video = wavespeed.run(
  "alibaba/wan-2.6/text-to-video",
  prompt="Driving through a futuristic city",
  duration=5,
  resolution="720p"
)`,
      output: "Generated video",
      meta: "1280\u00d7720 \u00b7 MP4 \u00b7 8.4MB",
    },
    curl: {
      lines: [
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
              <span className={sh_st}>{'"alibaba/wan-2.6/text-to-video"'}</span>
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
              <span className={sh_st}>
                {'"Driving through a futuristic city"'}
              </span>
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
      raw: `curl -X POST \\
  "https://api.wavespeed.ai/v1/run" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "alibaba/wan-2.6/text-to-video",
    "prompt": "Driving through a futuristic city"
  }'`,
      output: "Generated video",
      meta: "1280\u00d7720 \u00b7 MP4 \u00b7 8.4MB",
    },
  },
  chat: {
    node: {
      lines: [
        {
          content: (
            <>
              <span className={kw}>import</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={kw}>{" from"}</span>
              <span className={st}>{' "wavespeed"'}</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" output ="}</span>
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
        { content: <>&nbsp;</> },
      ],
      raw: `import wavespeed from "wavespeed"

const output = await wavespeed.run(
  "wavespeed-ai/llama-4-scout",
  {
    prompt: "Summarize this conversation",
    max_tokens: 512,
    temperature: 0.7
  }
);`,
      output: "Chat completion",
      meta: "148 tokens \u00b7 134 tok/s",
    },
    python: {
      lines: [
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
      raw: `import wavespeed

result = wavespeed.run(
  "wavespeed-ai/llama-4-scout",
  prompt="Summarize this conversation",
  max_tokens=512,
  temperature=0.7
)`,
      output: "Chat completion",
      meta: "148 tokens \u00b7 134 tok/s",
    },
    curl: {
      lines: [
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
      raw: `curl -X POST \\
  "https://api.wavespeed.ai/v1/run" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wavespeed-ai/llama-4-scout",
    "prompt": "Summarize this conversation"
  }'`,
      output: "Chat completion",
      meta: "148 tokens \u00b7 134 tok/s",
    },
  },
  speech: {
    node: {
      lines: [
        {
          content: (
            <>
              <span className={kw}>import</span>
              <span className={id}>{" wavespeed"}</span>
              <span className={kw}>{" from"}</span>
              <span className={st}>{' "wavespeed"'}</span>
            </>
          ),
        },
        { content: <>&nbsp;</> },
        {
          content: (
            <>
              <span className={kw}>const</span>
              <span className={tx}>{" output ="}</span>
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
              <span className={st}>{'  "elevenlabs/eleven-v3"'}</span>
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
        { content: <>&nbsp;</> },
      ],
      raw: `import wavespeed from "wavespeed"

const output = await wavespeed.run(
  "elevenlabs/eleven-v3",
  {
    text: "Hello from WaveSpeed",
    voice: "alloy",
    format: "mp3"
  }
);`,
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
    python: {
      lines: [
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
              <span className={py_st}>{'  "elevenlabs/eleven-v3"'}</span>
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
      raw: `import wavespeed

audio = wavespeed.run(
  "elevenlabs/eleven-v3",
  text="Hello from WaveSpeed",
  voice="alloy",
  format="mp3"
)`,
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
    curl: {
      lines: [
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
              <span className={sh_st}>{'"elevenlabs/eleven-v3"'}</span>
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
      raw: `curl -X POST \\
  "https://api.wavespeed.ai/v1/run" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "elevenlabs/eleven-v3",
    "text": "Hello from WaveSpeed"
  }'`,
      output: "Generated audio",
      meta: "00:04 \u00b7 MP3 \u00b7 64KB",
    },
  },
};

const AUTO_ADVANCE_MS = 5000;

export function CodeEditorCard() {
  const [activeTab, setActiveTab] = useState<TabKey>("video");
  const [activeLang, setActiveLang] = useState<LangKey>("node");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const current = codeData[activeTab][activeLang];

  const advance = useCallback(() => {
    setActiveTab((prev) => {
      const idx = tabs.findIndex((t) => t.key === prev);
      return tabs[(idx + 1) % tabs.length].key;
    });
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(current.raw).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [current.raw]);

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

  return (
    <div className="bg-background flex flex-col gap-2 rounded-[5px] p-2">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex w-full gap-1 overflow-x-auto [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`relative flex cursor-pointer items-center gap-1 rounded-[3px] px-4 py-2 font-mono text-xs transition-colors ${
                activeTab === tab.key
                  ? "bg-panel text-ink"
                  : "text-ink/60 hover:bg-panel hover:text-ink"
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
              <tab.icon className="relative size-4 shrink-0" />
              <span className="relative">
                {tab.base}
                {langExt[activeLang]}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden gap-1 sm:flex">
          {langTabs.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`cursor-pointer rounded-[2px] px-2 py-1 font-mono text-xs transition-colors ${
                activeLang === lang
                  ? "bg-ink/15 text-ink"
                  : "text-ink/50 hover:text-ink"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background flex flex-col gap-2 overflow-hidden rounded-[3px] md:flex-row">
        <div className="bg-panel relative h-65 md:h-87 md:flex-1">
          <div className="absolute top-10 left-6 flex">
            <div className="text-subtle flex w-6 flex-col gap-1 font-mono text-xs leading-tight">
              {current.lines.map((_, i) => (
                <p key={i} className="opacity-40">
                  {i + 1}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-1 font-mono text-xs leading-tight whitespace-pre">
              {current.lines.map((line, i) => (
                <p key={i}>{line.content}</p>
              ))}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="bg-background hover:bg-panel-alt absolute bottom-3 left-6 flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 transition-colors md:top-77 md:bottom-auto"
          >
            {copied ? (
              <svg
                className="text-green size-3.5"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="text-subtle size-3.5"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="5"
                  y="5"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M3 11V3.5C3 2.67 3.67 2 4.5 2H10"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            )}
            <span className="text-subtle font-mono text-xs leading-tight">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>

        <div className="relative flex h-65 flex-col items-center justify-end overflow-hidden p-2 md:h-87 md:flex-1">
          {activeTab === "image" && (
            <Image
              src={editorPreview}
              alt="Generated output"
              fill
              className="pointer-events-none object-cover"
            />
          )}
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
          {activeTab === "chat" && <ChatOutput />}
          {activeTab === "speech" && <SpeechOutput />}

          <div className="relative flex h-13 w-full items-center gap-3 rounded-[2px] border border-white/10 bg-black/80 px-2 py-px backdrop-blur-md">
            <div className="flex flex-col">
              <p className="font-sans text-xs leading-4 text-pretty text-white">
                {current.output}
              </p>
              <p className="text-footer-label font-mono text-xs leading-4 text-pretty">
                {current.meta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Waveform bars for the speech player                               */
/* ------------------------------------------------------------------ */
const WAVE_BARS = [
  0.18, 0.32, 0.55, 0.42, 0.78, 0.6, 0.35, 0.88, 0.5, 0.25, 0.65, 0.82, 0.48,
  0.3, 0.9, 1.0, 0.72, 0.45, 0.22, 0.58, 0.75, 0.4, 0.68, 0.35, 0.55, 0.85,
  0.42, 0.28, 0.62, 0.78, 0.52, 0.38, 0.48, 0.7, 0.3, 0.55, 0.8, 0.45, 0.92,
  0.38, 0.6, 0.75, 0.42, 0.25, 0.68, 0.88, 0.35, 0.55, 0.48, 0.3, 0.72, 0.6,
  0.85, 0.4, 0.5, 0.65, 0.35, 0.78, 0.55, 0.45, 0.68, 0.82, 0.38, 0.9, 0.5,
  0.28, 0.72, 0.58, 0.42, 0.8, 0.35, 0.65, 0.48, 0.75, 0.3, 0.55, 0.88, 0.42,
  0.6, 0.5,
];

function SpeechOutput() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION_MS = 5000;

  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        startRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const elapsed = progress * 5;
  const mins = Math.floor(elapsed / 60);
  const secs = Math.floor(elapsed % 60);
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="bg-panel absolute inset-0 flex flex-col justify-center gap-4 px-6 py-5 md:px-8">
      {/* Speaker identity */}
      <div className="flex items-center gap-2.5">
        <div className="bg-brand/15 text-brand flex size-7 items-center justify-center rounded-full font-mono text-xs font-bold">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-code-text text-xs font-medium">Alloy</span>
          <span className="text-subtle font-mono text-xs">
            elevenlabs/eleven-v3
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex flex-col gap-2">
        <div className="flex h-12 items-end gap-px">
          {WAVE_BARS.map((h, i) => (
            <div
              key={i}
              className="bg-code-text/30 flex-1 rounded-full"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>

        {/* Scrubber track */}
        <div className="bg-code-text/10 relative h-0.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-brand absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Time */}
        <div className="text-subtle flex justify-between font-mono text-xs">
          <span>{timeStr}</span>
          <span>0:05</span>
        </div>
      </div>

      {/* Transcript */}
      <p className="text-code-text/50 font-mono text-xs leading-relaxed text-pretty">
        &ldquo;Hello from WaveSpeed&rdquo;
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat output with streaming cursor                                 */
/* ------------------------------------------------------------------ */
const CHAT_MESSAGES: { role: "user" | "assistant"; text: string }[] = [
  { role: "user", text: "Summarize this conversation" },
  {
    role: "assistant",
    text: "The conversation covered four key areas: Q3 revenue increased 23% year-over-year, a new API launch is scheduled for October, the infrastructure team is hiring 5 engineers, and a partnership agreement was signed with Acme Corp.",
  },
];

function ChatOutput() {
  return (
    <div className="bg-panel absolute inset-0 flex flex-col overflow-y-auto p-4 pb-15 md:p-5 md:pb-20">
      <div className="flex flex-1 flex-col justify-end gap-3">
        {CHAT_MESSAGES.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 font-sans text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand text-white"
                  : "bg-code-text/8 text-code-text"
              }`}
            >
              {msg.text}
              {msg.role === "assistant" && (
                <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-current align-middle" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroDemo() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/videos/hero-bg.mp4"
          poster="/videos/hero-bg_poster.webp"
          autoPlay
          loop
          muted
          playsInline
          className="size-full scale-105 object-cover blur-sm"
        />
      </div>
      <div className="absolute inset-0 dark:bg-black/50" />
      <div className="relative mx-auto max-w-240 px-4 py-4 md:px-0 md:py-12">
        <CodeEditorCard />
      </div>
    </section>
  );
}

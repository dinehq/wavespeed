import Image from "next/image";
import ArrowRight from "@/images/arrow-right.svg";

const features = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="size-5">
        <path
          d="M4 7l4-4m0 0l4 4M8 3v14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(90 10 10)"
        />
        <path
          d="M3 16h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Type-Safe SDKs",
    description:
      "First-class support for TypeScript and Python. Autocomplete your way to production.",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="size-5">
        <path
          d="M13 3L7 10l6 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(180 10 10)"
        />
      </svg>
    ),
    title: "Instant Integration",
    description:
      "Drop-in compatible with OpenAI's API format. Switch providers by changing one line of code.",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="size-5">
        <rect
          x="2"
          y="3"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 8h8M6 12h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Comprehensive Docs",
    description:
      "Interactive API reference, step-by-step tutorials, and a cookbook of common patterns.",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="size-5">
        <path
          d="M18 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7m16 0v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1m16 0H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Community & Support",
    description:
      "Join our Discord of 10,000+ builders. Direct access to our engineering team.",
  },
];

const codeLines = [
  {
    num: 1,
    tokens: [
      { text: "import", color: "#C084FC" },
      { text: " { WaveSpeed } ", color: "#fff" },
      { text: "from", color: "#C084FC" },
      { text: " '@wavespeed/sdk'", color: "#86EFAC" },
    ],
  },
  { num: 2, tokens: [] },
  {
    num: 3,
    tokens: [
      { text: "const", color: "#C084FC" },
      { text: " client ", color: "#93C5FD" },
      { text: "= ", color: "#fff" },
      { text: "new ", color: "#C084FC" },
      { text: "WaveSpeed", color: "#FCD34D" },
      { text: "({\n", color: "#fff" },
    ],
  },
  {
    num: 4,
    tokens: [
      { text: "  apiKey", color: "#fff" },
      { text: ": ", color: "#fff" },
      { text: "process", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "env", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "WAVESPEED_API_KEY", color: "#FCD34D" },
      { text: ",", color: "#fff" },
    ],
  },
  {
    num: 5,
    tokens: [{ text: "});", color: "#fff" }],
  },
  { num: 6, tokens: [] },
  {
    num: 7,
    tokens: [
      {
        text: "// Generate video from text in sub-2 seconds",
        color: "#6B7280",
      },
    ],
  },
  {
    num: 8,
    tokens: [
      { text: "const", color: "#C084FC" },
      { text: " video ", color: "#93C5FD" },
      { text: "= ", color: "#fff" },
      { text: "await", color: "#C084FC" },
      { text: " client", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "video", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "generate", color: "#FCD34D" },
      { text: "({\n", color: "#fff" },
    ],
  },
  {
    num: 9,
    tokens: [
      { text: "  model", color: "#fff" },
      { text: ": ", color: "#fff" },
      { text: "'pixverse-v5.6'", color: "#FB923C" },
    ],
  },
  {
    num: 10,
    tokens: [
      { text: "  prompt", color: "#fff" },
      { text: ": ", color: "#fff" },
      { text: "'Cyberpunk city flythrough...'", color: "#FB923C" },
    ],
  },
  {
    num: 11,
    tokens: [
      { text: "  duration", color: "#fff" },
      { text: ": ", color: "#fff" },
      { text: "5", color: "#FCD34D" },
    ],
  },
  {
    num: 12,
    tokens: [
      { text: "  aspect_ratio", color: "#fff" },
      { text: ": ", color: "#fff" },
      { text: "'16:9'", color: "#FB923C" },
    ],
  },
  {
    num: 13,
    tokens: [{ text: "});", color: "#fff" }],
  },
  { num: 14, tokens: [] },
  {
    num: 15,
    tokens: [
      { text: "console", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "log", color: "#FCD34D" },
      { text: "(", color: "#fff" },
      { text: "video", color: "#93C5FD" },
      { text: ".", color: "#fff" },
      { text: "url", color: "#fff" },
      { text: ");", color: "#fff" },
    ],
  },
  {
    num: 16,
    tokens: [
      {
        text: "// https://cdn.wavespeed.ai/v1/generations...",
        color: "#6B7280",
      },
    ],
  },
];

export function ForCreators() {
  return (
    <section className="bg-[#111] relative overflow-hidden">
      {/* Glitch background anchored to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[114px]">
        <Image src="/images/creator-bg.png" alt="" fill />
      </div>

      <div className="relative px-20 pt-20 pb-32">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <div className="flex flex-col gap-4 mb-10 max-w-[875px]">
            <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-white">
              For Creators
            </h2>
            <p className="font-mono text-base leading-[1.3] text-white/50">
              We know the pain of complex integrations. That&apos;s why we built
              WaveSpeed
              <br />
              to be the most developer-friendly AI infrastructure on the planet.
            </p>
          </div>

          <div className="flex gap-16">
            {/* Left: Feature cards + buttons */}
            <div className="flex flex-col gap-10 w-[615px] shrink-0">
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col gap-4 group cursor-pointer"
                  >
                    <div className="size-10 rounded bg-white/10 flex items-center justify-center text-white transition-colors duration-150 group-hover:bg-white/20">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-lg font-medium leading-[18px]">
                        {feature.title}
                      </h4>
                      <p className="font-mono text-sm leading-normal text-white/50">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href="#"
                  className="bg-white text-black rounded-sm px-[30px] py-4 flex items-center gap-3 transition-colors duration-150 hover:bg-white/90"
                >
                  <span className="font-mono text-sm font-medium tracking-[1.2px] uppercase leading-4">
                    Read the Docs
                  </span>
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 text-white rounded-sm px-[30px] py-4 flex items-center justify-center transition-colors duration-150 hover:bg-white/20"
                >
                  <span className="font-mono text-sm font-medium tracking-[1.2px] uppercase leading-4">
                    View GitHub
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Code block */}
            <div className="flex-1 bg-[#1a1a2e] rounded-lg overflow-hidden transition-shadow duration-300">
              <div className="p-10 font-mono text-sm leading-[22px]">
                {codeLines.map((line) => (
                  <div key={line.num} className="flex">
                    <span className="w-8 text-right pr-4 text-white/20 select-none shrink-0">
                      {line.num}
                    </span>
                    <span>
                      {line.tokens.map((token, i) => (
                        <span key={i} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

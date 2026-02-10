import Image from "next/image";

const tabs = [
  { name: "generate_image.ts", icon: "img", active: true },
  { name: "create_video.ts", icon: "vid" },
  { name: "analyze_chat.ts", icon: "chat" },
  { name: "generate_speech.ts", icon: "speech" },
];

const langTabs = ["node", "python", "curl"];

const codeLines = [
  {
    num: 1,
    content: <span className="text-black/40">{"// Real-time Synthesis"}</span>,
  },
  { num: 2, content: null },
  {
    num: 3,
    content: (
      <>
        <span className="text-[#8B5CF6]">const</span>{" "}
        <span className="text-black">output</span>{" "}
        <span className="text-black">=</span>{" "}
        <span className="text-[#8B5CF6]">await</span>{" "}
        <span className="text-black">wavespeed</span>
        <span className="text-black">.</span>
        <span className="text-[#D97706]">run</span>
        <span className="text-black">(</span>
      </>
    ),
  },
  {
    num: 4,
    content: (
      <>
        {"  "}
        <span className="text-[#DC2626]">{'"wavespeed-ai/flux-dev"'}</span>
        <span className="text-black">,</span>
      </>
    ),
  },
  {
    num: 5,
    content: (
      <>
        {"  "}
        <span className="text-black">{"{"}</span>
      </>
    ),
  },
  {
    num: 6,
    content: (
      <>
        {"    "}
        <span className="text-black">prompt:</span>
        <span className="text-[#16A34A]">
          {'"A person running in the city"'}
        </span>
        <span className="text-black">,</span>
      </>
    ),
  },
  {
    num: 7,
    content: (
      <>
        {"    "}
        <span className="text-black">aspect_ratio:</span>
        <span className="text-[#16A34A]">{'"16:9"'}</span>
        <span className="text-black">,</span>
      </>
    ),
  },
  {
    num: 8,
    content: (
      <>
        {"    "}
        <span className="text-black">output_format:</span>
        <span className="text-[#16A34A]">{'"webp"'}</span>
      </>
    ),
  },
  {
    num: 9,
    content: (
      <>
        {"  "}
        <span className="text-black">{"}"}</span>
      </>
    ),
  },
  {
    num: 10,
    content: <span className="text-black">{");"}</span>,
  },
];

export function HeroDemo() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
      </div>

      <div className="relative max-w-[960px] mx-auto py-8">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="flex items-center justify-between border-b border-black/5 px-4">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`px-4 py-3 font-mono text-xs flex items-center gap-2 border-b-2 ${
                    tab.active
                      ? "border-black text-black"
                      : "border-transparent text-black/40"
                  }`}
                >
                  <span className="size-4 rounded bg-surface flex items-center justify-center text-[10px]">
                    {tab.icon === "img"
                      ? "\u{1f5bc}"
                      : tab.icon === "vid"
                        ? "\u{1f3ac}"
                        : tab.icon === "chat"
                          ? "\u{1f4ac}"
                          : "\u{1f50a}"}
                  </span>
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {langTabs.map((lang) => (
                <button
                  key={lang}
                  className={`px-3 py-1 font-mono text-xs rounded ${
                    lang === "node" ? "bg-black text-white" : "text-black/40"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Code Area */}
          <div className="flex">
            <div className="flex-1 p-6 font-mono text-sm leading-[22px] min-h-[280px]">
              {codeLines.map((line) => (
                <div key={line.num} className="flex">
                  <span className="w-8 text-right pr-4 text-black/20 select-none shrink-0">
                    {line.num}
                  </span>
                  <span>{line.content}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-6">
                <span className="size-2 rounded-full bg-green" />
                <span className="font-mono text-sm text-black/60">
                  Done (0.4s)
                </span>
              </div>
            </div>
            <div className="w-[320px] p-6 flex items-center justify-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface">
                <Image
                  src="/images/hero-banner.png"
                  alt="Generated output"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3">
                  <p className="text-white text-xs font-mono font-medium">
                    Generated output
                  </p>
                  <p className="text-white/50 text-[10px] font-mono">
                    1024&times;1024 &middot; PNG &middot; 2.4MB
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

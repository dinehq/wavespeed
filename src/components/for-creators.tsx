import Image from "next/image";
import creatorBg from "@/images/creator-bg.webp";

const features = [
  { label: "1M+", detail: "Desktop installs" },
  { label: "50M+", detail: "On-device generations" },
  { label: "4.9/5", detail: "Privacy-first rating" },
  { label: "2s", detail: "Median local render time" },
];

export function ForCreators() {
  return (
    <section className="bg-dark dark:bg-dark relative overflow-hidden">
      <div className="px-6 pt-16 md:px-12 md:pt-30 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 flex flex-col gap-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h2 className="font-display text-2xl leading-none font-medium tracking-tight text-balance text-white md:text-5xl">
                Built for Creators
              </h2>
              <div className="flex shrink-0 items-center gap-3">
                <a
                  href="https://wavespeed.ai/studio/"
                  className="tracking-xl inline-flex items-center gap-2 rounded-xs bg-white px-5 py-2.5 font-mono text-sm text-black uppercase transition-colors duration-150 hover:bg-white/90"
                >
                  Try Studio
                </a>
                <a
                  href="https://wavespeed.ai/landing/desktop"
                  className="group tracking-xl inline-flex items-center gap-2 rounded-xs border border-white/20 px-5 py-2.5 font-mono text-sm text-white uppercase transition-colors duration-150 hover:bg-white/10"
                >
                  Desktop
                  <svg
                    className="size-4 transition-transform duration-150 group-hover:translate-y-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M3 14h10" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="font-mono text-sm text-pretty text-white/50">
              WaveSpeed Studio puts the full power of our inference engine
              <br className="hidden md:block" />
              into a desktop app — no code, no setup, just create.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6 md:grid-cols-4">
            {features.map((f) => (
              <div key={f.label}>
                <p className="font-display text-2xl font-medium text-white">
                  {f.label}
                </p>
                <p className="tracking-lg font-mono text-xs text-white/40 uppercase">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App screenshot — full width, outside container */}
      <div className="relative mt-12 h-75 md:h-165">
        <div className="absolute inset-x-0 top-0 h-75 overflow-hidden md:h-165">
          <Image
            src={creatorBg}
            alt="WaveSpeed Studio"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

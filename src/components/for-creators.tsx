import Image from "next/image";

const featureTabs = [
  {
    title: "Easy to use",
    description:
      "We know the pain of complex integrations. That's why we built WaveSpeed to be the most developer-friendly AI infrastructure on the planet.",
  },
  {
    title: "Vast Model Library",
    description:
      "We know the pain of complex integrations. That's why we built WaveSpeed to be the most developer-friendly AI infrastructure on the planet.",
  },
  {
    title: "Reusable workflows",
    description:
      "We know the pain of complex integrations. That's why we built WaveSpeed to be the most developer-friendly AI infrastructure on the planet.",
  },
];

export function ForCreators() {
  return (
    <section className="relative overflow-hidden bg-[#0c0e15]">
      <div className="px-6 pt-16 md:px-20 md:pt-[120px]">
        <div className="mx-auto max-w-[1280px]">
          {/* Section header: title left, description + CTA right */}
          <div className="mb-[48px] flex flex-col items-start justify-between gap-6 md:flex-row md:gap-0">
            <h2 className="flex-1 text-[32px] leading-none font-medium tracking-[-1px] text-balance text-white md:text-[48px]">
              Built for <em className="italic">Creators</em>
            </h2>
            <div className="flex flex-1 flex-col items-start gap-5">
              <p className="font-mono text-sm text-pretty text-white/50">
                WaveSpeed Studio puts the full power of our inference engine
                <br className="hidden md:block" />
                into a desktop app — no code, no setup, just create.
              </p>
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-xs border border-white/20 px-4 py-2 font-mono text-sm tracking-[1.2px] text-white uppercase transition-colors duration-150 hover:bg-white/10"
              >
                Download Studio
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

          {/* Feature tabs */}
          <div className="flex flex-col gap-8 md:flex-row">
            {featureTabs.map((tab) => (
              <div
                key={tab.title}
                className="flex-1 border-t border-white/16 py-4"
              >
                <h3 className="mb-2 font-mono text-base font-medium text-white">
                  {tab.title}
                </h3>
                <p className="font-mono text-sm text-pretty text-white/50">
                  {tab.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App screenshot — full width, outside container */}
      <div className="relative mt-[48px] h-[300px] md:h-[660px]">
        <div className="absolute inset-x-0 top-0 h-[300px] overflow-hidden md:h-[660px]">
          <Image
            src="/images/creator-bg.webp"
            alt="WaveSpeed Studio"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

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
          {/* Section header: title left, description right */}
          <div className="mb-[48px] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-0">
            <h2 className="flex-1 text-[32px] leading-none font-medium tracking-[-1px] text-balance text-white md:text-[48px]">
              For <em className="italic">Creators</em>,{" "}
              <br className="hidden md:block" />
              By <em className="italic">Creators</em>
            </h2>
            <p className="flex-1 font-mono text-sm text-pretty text-white/50">
              We know the pain of complex integrations. That&apos;s why we built
              WaveSpeed
              <br className="hidden md:block" />
              to be the most developer-friendly AI infrastructure on the planet.
            </p>
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

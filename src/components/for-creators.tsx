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
    <section className="bg-[#0c0e15] relative overflow-hidden">
      <div className="px-20 pt-[120px]">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header: title left, description right */}
          <div className="flex items-center justify-between mb-[48px]">
            <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-white flex-1">
              For <em className="italic">Creators</em>,
              <br />
              By <em className="italic">Creators</em>
            </h2>
            <p className="font-mono text-sm leading-[1.3] text-white/40 flex-1">
              We know the pain of complex integrations. That&apos;s why we built
              WaveSpeed
              <br />
              to be the most developer-friendly AI infrastructure on the planet.
            </p>
          </div>

          {/* Feature tabs */}
          <div className="flex gap-8">
            {featureTabs.map((tab) => (
              <div
                key={tab.title}
                className="flex-1 border-t border-white/[0.16] py-4"
              >
                <h3 className="font-mono text-base font-medium text-white mb-2">
                  {tab.title}
                </h3>
                <p className="font-mono text-xs leading-[1.3] text-white/40">
                  {tab.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App screenshot — full width, outside container */}
      <div className="relative h-[660px] mt-[48px]">
        <div className="absolute inset-x-0 top-0 h-[660px] overflow-hidden">
          <Image
            src="/images/creator-bg.png"
            alt="WaveSpeed Studio"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

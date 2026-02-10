const features = {
  row1: [
    {
      title: "Blazing Fast Inference",
      description:
        "Optimized GPU clusters deliver up to 4x faster token generation for LLMs and sub-second rendering for image models.",
    },
    {
      title: "Vast Model Library",
      description:
        "Access the entire HuggingFace hub and top proprietary models with a single unified API key.",
    },
  ],
  row2: [
    {
      title: "Built for Scale",
      description:
        "Enterprise-grade reliability with 99.99% uptime guarantees and dedicated throughput for high-volume applications.",
    },
    {
      title: "Enterprise Security",
      description:
        "SOC 2 Type II compliant with end-to-end encryption and private VPC deployment options.",
    },
    {
      title: "Global Edge Network",
      description:
        "Inference endpoints distributed across 12 regions worldwide for minimal latency wherever your users are.",
    },
  ],
};

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg relative overflow-hidden h-[364px] transition-shadow duration-200 hover:shadow-lg">
      <div className="flex flex-col justify-end gap-2 p-6 h-full">
        <h3 className="text-2xl font-medium leading-7 text-black">{title}</h3>
        <p className="font-mono text-sm leading-[1.25] text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-surface px-20 py-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-4 mb-10 max-w-[875px]">
          <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-heading">
            Engineered for Pure Velocity.
          </h2>
          <p className="font-mono text-base leading-[1.3] text-subtle">
            WaveSpeed is a purpose-built inference engine
            <br />
            designed to minimize latency and maximize throughput.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {features.row1.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {features.row2.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

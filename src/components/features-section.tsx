import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="px-20 py-20">
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
          {/* Row 1: Vast Model Library (smaller) + Blazing Fast Inference (larger) */}
          <div className="flex gap-4">
            <div className="w-[574px] shrink-0 h-[360px] bg-surface rounded-xs overflow-hidden relative">
              {/* Provider logos — extends past right edge, clipped by overflow */}
              <div className="absolute left-[40px] top-[-38px] w-[600px] h-[287px]">
                <Image
                  src="/images/logos.png"
                  alt=""
                  fill
                  className="object-contain object-left-top"
                />
              </div>

              {/* Text */}
              <div className="absolute left-6 bottom-[24px]">
                <h3 className="text-2xl font-medium leading-7 text-[#191e2e] mb-2">
                  Vast Model Library
                </h3>
                <p className="font-mono text-sm leading-[1.25] text-muted w-[526px]">
                  Access the entire HuggingFace hub and top proprietary models
                  with a single unified API key.
                </p>
              </div>
            </div>

            <div className="flex-1 h-[360px] bg-surface rounded-xs overflow-hidden relative">
              {/* Title + description */}
              <div className="absolute left-6 top-6 w-[584px] z-10">
                <h3 className="text-2xl font-medium leading-7 text-[#191e2e] mb-2">
                  Blazing Fast Inference
                </h3>
                <p className="font-mono text-sm leading-[1.25] text-muted">
                  Optimized GPU clusters deliver up to 4x faster token
                  generation for LLMs and sub-second rendering for image models.
                </p>
              </div>
              {/* Speed chart image */}
              <div className="absolute left-0 bottom-0 right-0 h-[260px]">
                <Image
                  src="/images/speed.png"
                  alt=""
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Built for Scale (larger) + Enterprise Security (smaller) */}
          <div className="flex gap-4">
            <div className="w-[690px] shrink-0 h-[360px] bg-surface rounded-xs overflow-hidden relative">
              {/* Title + description */}
              <div className="absolute left-6 top-6 w-[642px] z-10">
                <h3 className="text-2xl font-medium leading-7 text-[#191e2e] mb-2">
                  Built for Scale
                </h3>
                <p className="font-mono text-sm leading-[1.25] text-muted max-w-[400px]">
                  Enterprise-grade reliability with 99.99% uptime guarantees and
                  dedicated throughput for high-volume applications.
                </p>
              </div>
              {/* Wave lines image — bleeds right for responsive feel */}
              <div className="absolute left-0 top-0 w-[150%] h-full">
                <Image
                  src="/images/scale.png"
                  alt=""
                  fill
                  className="object-cover object-left-top"
                />
              </div>
            </div>

            <div className="flex-1 h-[360px] bg-gradient-to-b from-surface to-[#d3ddff] rounded-xs overflow-hidden relative">
              {/* 3D box image — positioned right, bleeding off edge */}
              <div className="absolute right-[-60px] top-[-13px] w-[390px] h-[425px]">
                <Image
                  src="/images/security.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              {/* Title + description */}
              <div className="absolute left-6 bottom-[24px] w-[526px] z-10">
                <h3 className="text-2xl font-medium leading-7 text-[#191e2e] mb-2">
                  Security
                </h3>
                <p className="font-mono text-sm leading-[1.25] text-muted">
                  SOC 2 Type II compliant with end-to-end encryption and private
                  VPC deployment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

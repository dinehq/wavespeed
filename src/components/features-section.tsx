"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-12 md:px-20 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex max-w-[875px] flex-col gap-4">
          <h2 className="text-heading text-[32px] leading-none font-medium tracking-[-1px] text-balance md:text-[48px]">
            Engineered for Pure Velocity.
          </h2>
          <p className="text-subtle font-mono text-base leading-[1.3] text-pretty">
            WaveSpeed is a purpose-built inference engine
            <br className="hidden md:block" />
            designed to minimize latency and maximize throughput.
          </p>
        </div>

        <div ref={ref} className="flex flex-col gap-4">
          {/* Row 1: Vast Model Library (smaller) + Blazing Fast Inference (larger) */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="bg-surface relative h-[280px] w-full shrink-0 overflow-hidden rounded-xs md:h-[360px] md:w-[574px]">
              {/* Provider logos — drift in from left */}
              <div
                className={`absolute top-[-38px] left-[40px] h-[180px] w-[600px] transition-all duration-1000 ease-out md:h-[287px] ${
                  entered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
              >
                <Image
                  src="/images/logos.webp"
                  alt=""
                  fill
                  className="object-contain object-top-left"
                />
              </div>

              {/* Text */}
              <div className="absolute right-6 bottom-[24px] left-6">
                <h3 className="mb-2 text-2xl leading-7 font-medium text-[#191e2e]">
                  Vast Model Library
                </h3>
                <p className="text-muted w-auto font-mono text-sm leading-tight text-pretty md:w-[526px]">
                  Access the entire HuggingFace hub and top proprietary models
                  with a single unified API key.
                </p>
              </div>
            </div>

            <div className="bg-surface relative h-[280px] w-full overflow-hidden rounded-xs md:h-[360px] md:flex-1">
              {/* Title + description */}
              <div className="absolute top-6 right-6 left-6 z-10 md:w-[584px]">
                <h3 className="mb-2 text-2xl leading-7 font-medium text-[#191e2e]">
                  Blazing Fast Inference
                </h3>
                <p className="text-muted font-mono text-sm leading-tight text-pretty">
                  Optimized GPU clusters deliver up to 4x faster token
                  generation for LLMs and sub-second rendering for image models.
                </p>
              </div>
              {/* Speed chart — rises from bottom */}
              <div
                className={`absolute right-0 bottom-0 left-0 h-[180px] transition-all duration-1000 ease-out md:h-[260px] ${
                  entered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <Image
                  src="/images/speed.webp"
                  alt=""
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Built for Scale (larger) + Enterprise Security (smaller) */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="bg-surface relative h-[280px] w-full shrink-0 overflow-hidden rounded-xs md:h-[360px] md:w-[690px]">
              {/* Title + description */}
              <div className="absolute top-6 right-6 left-6 z-10 md:w-[642px]">
                <h3 className="mb-2 text-2xl leading-7 font-medium text-[#191e2e]">
                  Built for Scale
                </h3>
                <p className="text-muted max-w-[400px] font-mono text-sm leading-tight text-pretty">
                  Enterprise-grade reliability with 99.99% uptime guarantees and
                  dedicated throughput for high-volume applications.
                </p>
              </div>
              {/* Wave lines — drift in from left */}
              <div
                className={`absolute top-0 left-0 h-full w-[150%] transition-all duration-1000 ease-out ${
                  entered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <Image
                  src="/images/scale.webp"
                  alt=""
                  fill
                  className="object-cover object-top-left"
                />
              </div>
            </div>

            <div className="from-surface relative h-[280px] w-full overflow-hidden rounded-xs bg-linear-to-b to-[#d3ddff] md:h-[360px] md:flex-1">
              {/* 3D box — drifts in from right */}
              <div
                className={`absolute top-0 right-[-30px] h-[280px] w-[250px] transition-all duration-1000 ease-out md:top-[-13px] md:right-[-60px] md:h-[425px] md:w-[390px] ${
                  entered
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                <Image
                  src="/images/security.webp"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              {/* Title + description */}
              <div className="absolute right-6 bottom-[24px] left-6 z-10 md:w-[526px]">
                <h3 className="mb-2 text-2xl leading-7 font-medium text-[#191e2e]">
                  Security
                </h3>
                <p className="text-muted font-mono text-sm leading-tight text-pretty">
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

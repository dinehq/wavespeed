"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import { AnimatedLogo } from "@/components/animated-logo";

import spinnerCadence from "../../../../public/spinner_cadence.json";
import spinnerCadenceLoop from "../../../../public/spinner_cadence_loop.json";
import spinnerSmooth from "../../../../public/spinner_smooth.json";
import spinnerSmoothLoop from "../../../../public/spinner_smooth_loop.json";

function DemoCard({
  label,
  loop,
  children,
}: {
  label: string;
  loop?: boolean;
  children: (key: number) => React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-subtle font-mono text-xs tracking-widest uppercase">
        {label}
      </p>
      <div className="flex size-40 items-center justify-center">
        {children(key)}
      </div>
      {!loop && (
        <button
          onClick={() => setKey((k) => k + 1)}
          className="border-border bg-background text-foreground hover:bg-muted rounded-lg border px-5 py-2.5 font-mono text-sm transition-colors"
        >
          Replay
        </button>
      )}
    </div>
  );
}

export default function AnimatedLogoDemo() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-16 p-8">
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="SVG Animated">
          {(key) => (
            <AnimatedLogo key={key} className="text-foreground w-full" />
          )}
        </DemoCard>

        <DemoCard label="Cadence">
          {(key) => (
            <Lottie
              key={key}
              animationData={spinnerCadence}
              loop={false}
              autoplay
              className="w-full"
            />
          )}
        </DemoCard>

        <DemoCard label="Cadence Loop" loop>
          {(key) => (
            <Lottie
              key={key}
              animationData={spinnerCadenceLoop}
              loop
              autoplay
              className="h-full w-auto"
            />
          )}
        </DemoCard>

        <DemoCard label="Smooth">
          {(key) => (
            <Lottie
              key={key}
              animationData={spinnerSmooth}
              loop={false}
              autoplay
              className="h-full w-auto"
            />
          )}
        </DemoCard>

        <DemoCard label="Smooth Loop" loop>
          {(key) => (
            <Lottie
              key={key}
              animationData={spinnerSmoothLoop}
              loop
              autoplay
              className="h-full w-auto"
            />
          )}
        </DemoCard>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import { AnimatedLogo } from "@/components/animated-logo";

import spinner from "../../../../public/spinner.json";
import spinnerCom from "../../../../public/spinner-com.json";

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
      <div className="grid grid-cols-3 gap-16">
        <DemoCard label="SVG Animated" loop>
          {(key) => (
            <AnimatedLogo key={key} className="text-foreground w-full" loop />
          )}
        </DemoCard>

        <DemoCard label="Spinner" loop>
          {(key) => (
            <Lottie
              key={key}
              animationData={spinner}
              loop
              autoplay
              className="w-full"
            />
          )}
        </DemoCard>

        <DemoCard label="Spinner Com" loop>
          {(key) => (
            <Lottie
              key={key}
              animationData={spinnerCom}
              loop
              autoplay
              className="w-full"
            />
          )}
        </DemoCard>
      </div>
    </div>
  );
}

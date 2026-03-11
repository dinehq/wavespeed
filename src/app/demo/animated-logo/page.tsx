"use client";

import { useState } from "react";
import { AnimatedLogo } from "@/components/animated-logo";

export default function AnimatedLogoDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-12 bg-background p-8">
      <div className="flex flex-col items-center gap-6">
        <p className="font-mono text-xs tracking-widest text-subtle uppercase">
          Animated Logo
        </p>
        <AnimatedLogo
          key={key}
          className="h-24 w-auto text-foreground sm:h-32"
        />
      </div>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg border border-border bg-background px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:bg-muted"
      >
        Replay
      </button>
    </div>
  );
}

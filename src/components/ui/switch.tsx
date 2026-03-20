"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-foreground/70 data-[state=unchecked]:bg-foreground/20 focus-visible:ring-foreground/35 inline-flex h-4.5 w-8 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "data-[state=checked]:bg-background data-[state=unchecked]:bg-background pointer-events-none block size-3.5 rounded-full shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

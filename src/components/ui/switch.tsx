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
        "peer focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-foreground/25 data-[state=unchecked]:bg-foreground/15 inline-flex h-4.5 w-8 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "data-[state=checked]:bg-foreground data-[state=unchecked]:bg-foreground/55 pointer-events-none block size-3.5 rounded-full transition-all data-[state=checked]:ml-auto data-[state=unchecked]:ml-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

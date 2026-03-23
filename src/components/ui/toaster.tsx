"use client";

import { Check } from "lucide-react";

import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useMounted } from "@/hooks/use-mounted";

export function Toaster() {
  const mounted = useMounted();
  const { toasts } = useToast();

  if (!mounted) return null;

  return (
    <ToastProvider>
      <ToastViewport />
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex max-w-full min-w-0 items-start gap-2">
            <span className="text-foreground/80 mt-0.5 shrink-0">
              <Check className="size-4" />
            </span>
            <span className="text-foreground max-w-full min-w-0 text-sm leading-snug wrap-break-word">
              {description ?? title ?? ""}
            </span>
          </div>
          {action}
        </Toast>
      ))}
    </ToastProvider>
  );
}

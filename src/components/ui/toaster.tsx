"use client";

import { Check, CircleAlert, Info } from "lucide-react";

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
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        let icon = <Check className="text-foreground/80 size-4" />;
        if (variant === "destructive") {
          icon = <CircleAlert className="text-destructive size-4" />;
        } else if (!title) {
          icon = <Info className="text-foreground/80 size-4" />;
        }

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex max-w-full min-w-0 items-start gap-2">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <span className="max-w-full min-w-0 text-sm leading-snug wrap-break-word">
                {description ?? title ?? ""}
              </span>
            </div>
            {action}
          </Toast>
        );
      })}
    </ToastProvider>
  );
}

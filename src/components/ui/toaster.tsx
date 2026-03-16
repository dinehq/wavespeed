"use client";

import { Check } from "lucide-react";

import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
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
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-foreground/80 shrink-0">
              <Check className="size-4" />
            </span>
            <span className="text-foreground truncate text-sm">
              {description ?? title ?? ""}
            </span>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
    </ToastProvider>
  );
}

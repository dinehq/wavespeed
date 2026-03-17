"use client";

import Image, { type ImageProps } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type RequestDetailDialogProps = {
  open: boolean;
  requestId: string;
  requestIndex: number;
  totalRequests: number;
  hasPrevRequest: boolean;
  hasNextRequest: boolean;
  previewSrc: ImageProps["src"];
  previewAlt?: string;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onPrevRequest: () => void;
  onNextRequest: () => void;
  warningBanner?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function RequestDetailDialog({
  open,
  requestId,
  requestIndex,
  totalRequests,
  hasPrevRequest,
  hasNextRequest,
  previewSrc,
  previewAlt = "Request output preview",
  onOpenChange,
  onClose,
  onPrevRequest,
  onNextRequest,
  warningBanner,
  children,
  footer,
}: RequestDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/5 backdrop-blur-[2px] transition-[backdrop-filter] duration-300 data-[state=open]:backdrop-blur-[2px] data-[state=closed]:backdrop-blur-0"
        className="data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 text-foreground fixed inset-0 z-50 h-screen w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-transparent p-0 shadow-none"
      >
        <DialogTitle className="sr-only">Request detail</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed request information panel.
        </DialogDescription>
        <div className="flex h-full min-h-0 bg-black/5" onClick={onClose}>
          <div className="hidden min-w-0 flex-1 items-center justify-center p-6 md:flex">
            <div
              className="flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-xs"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={previewSrc}
                alt={previewAlt}
                className="h-auto max-h-[calc(100vh-5rem)] w-auto max-w-full object-contain"
              />
            </div>
          </div>
          <div
            className="bg-background animate-in slide-in-from-right-8 border-foreground/10 flex h-full w-[min(94vw,640px)] min-w-96 flex-col border-l shadow-lg duration-300"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-foreground/10 flex items-center justify-between border-b px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Request</p>
                <p className="text-foreground/65 truncate font-mono text-xs">
                  {requestId}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous request"
                  onClick={onPrevRequest}
                  disabled={!hasPrevRequest}
                  className="text-foreground/70 hover:bg-foreground/5 hover:text-foreground h-7 w-7 rounded-xs"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="min-w-12 text-center text-xs leading-none font-normal">
                  {requestIndex + 1}/{totalRequests}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next request"
                  onClick={onNextRequest}
                  disabled={!hasNextRequest}
                  className="text-foreground/70 hover:bg-foreground/5 hover:text-foreground h-7 w-7 rounded-xs"
                >
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close request detail"
                  onClick={onClose}
                  className="text-foreground/70 hover:bg-foreground/5 hover:text-foreground h-8 w-8 rounded-xs"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
            {warningBanner}
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            {footer}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

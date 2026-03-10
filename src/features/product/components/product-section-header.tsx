"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProductSectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  withDivider?: boolean;
  alignCenter?: boolean;
  bottomPaddingClassName?: string;
  className?: string;
};

export function ProductSectionHeader({
  title,
  actions,
  footer,
  titleClassName,
  actionsClassName,
  withDivider = false,
  alignCenter = true,
  bottomPaddingClassName,
  className,
}: ProductSectionHeaderProps) {
  const resolvedBottomPaddingClassName =
    bottomPaddingClassName ?? (withDivider ? "pb-5" : "pb-3");

  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:justify-between",
        alignCenter ? "md:items-center" : "md:items-start",
        withDivider ? "border-foreground/10 border-b" : "",
        resolvedBottomPaddingClassName,
        className,
      )}
    >
      <div className="min-w-0">
        <h1
          className={cn(
            "text-heading font-display text-3xl leading-none font-bold",
            titleClassName,
          )}
        >
          {title}
        </h1>

        {footer}
      </div>
      {actions ? (
        <div
          className={cn(
            "flex items-center gap-2 self-start md:self-auto",
            actionsClassName,
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}

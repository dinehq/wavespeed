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
  description,
  actions,
  footer,
  titleClassName,
  descriptionClassName,
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
            "text-heading text-3xl leading-none font-semibold tracking-[-0.8px]",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className={cn("text-subtle mt-2 text-sm", descriptionClassName)}>
            {description}
          </p>
        ) : null}
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

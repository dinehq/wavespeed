import Link from "next/link";
import type { Ref } from "react";

import { ProductTeamSwitcher } from "@/features/product/components/product-team-switcher";
import {
  productMainTabRoutes,
  productMainTabs,
  type ProductMainTab,
} from "@/features/product/main-tabs";
import { cn } from "@/lib/utils";

type ProductTopTabsProps = {
  activeTab?: ProductMainTab | null;
  sticky?: boolean;
  containerRef?: Ref<HTMLDivElement>;
  className?: string;
  contentClassName?: string;
};

export function ProductTopTabs({
  activeTab = null,
  sticky = true,
  containerRef,
  className,
  contentClassName,
}: ProductTopTabsProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        "border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 flex justify-center border-b px-6 backdrop-blur md:px-12 lg:px-20",
        sticky && "sticky top-0 z-40",
        className,
      )}
    >
      <div className={cn("w-full max-w-7xl", contentClassName)}>
        <div className="flex h-12 w-full min-w-0 items-center gap-3 overflow-visible rounded-none px-0 md:gap-4">
          <div className="scrollbar-none flex min-w-0 flex-1 items-center justify-start gap-4 overflow-x-auto md:gap-6 lg:gap-8">
            {productMainTabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <Link
                  key={tab}
                  href={productMainTabRoutes[tab] ?? "/dashboard"}
                  className={cn(
                    "tracking-xl relative flex h-12 flex-none items-center rounded-none px-0 py-0 text-sm whitespace-nowrap transition-colors",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-foreground/60 hover:text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tab}
                  {isActive ? (
                    <span className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5" />
                  ) : null}
                </Link>
              );
            })}
          </div>
          <div className="hidden shrink-0 lg:block">
            <ProductTeamSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

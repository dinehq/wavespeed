import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";

const modelDetailHref = "/models/google/nano-banana-pro/edit";

export function ProductModelsTab() {
  return (
    <div className="px-6 pt-6 md:px-12 md:pt-8 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <ProductSectionHeader title="Models" withDivider={false} />
        <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
          <CardContent className="p-0">
            <Link
              href={modelDetailHref}
              className="hover:bg-foreground/5 flex items-center justify-between gap-3 px-4 py-3 transition-colors"
            >
              <span className="text-foreground text-sm font-medium">
                nano-banana-pro
              </span>
              <span className="text-foreground/60 inline-flex items-center gap-1 text-xs">
                Edit model
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

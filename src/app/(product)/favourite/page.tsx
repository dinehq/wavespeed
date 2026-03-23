"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { slideImageForFavouriteId } from "@/lib/favourite-model-slide-image";
import { useMounted } from "@/hooks/use-mounted";
import {
  type FavouriteFilterId,
  type FavouriteModel,
  FAVOURITE_FILTER_IDS,
  loadFavouriteModels,
  matchesFavouriteFilter,
  removeFavouriteModel,
} from "@/lib/favourite-models-storage";

const FILTER_LABELS: Record<FavouriteFilterId, string> = {
  all: "All",
  "text-to-image": "Text to Image",
  "image-to-image": "Image to Image",
  "text-to-video": "Text to Video",
  "image-to-video": "Image to Video",
  "video-to-video": "Video to Video",
  other: "Other",
};

function FavouriteModelCard({
  model,
  onRemove,
}: {
  model: FavouriteModel;
  onRemove: (id: string) => void;
}) {
  const cover = slideImageForFavouriteId(model.id);

  return (
    <article className="flex flex-col overflow-hidden rounded-md">
      <div className="group relative aspect-square w-full shrink-0 overflow-hidden rounded-md">
        <Link
          href={model.href}
          className="absolute inset-0 block overflow-hidden"
        >
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-black/80 via-black/30 to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute right-5 bottom-5 left-5 z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="w-fit rounded-xs bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                {model.taskType}
              </span>
              <span className="shrink-0 font-mono text-[10px] text-white/80">
                {model.priceLabel}
              </span>
            </div>
            <span className="min-w-0 truncate font-mono text-sm leading-tight font-semibold text-white">
              {model.name}
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => onRemove(model.id)}
          className="pointer-events-none absolute top-4 right-4 z-20 shrink-0 rounded-xs p-1 text-amber-400 opacity-0 transition-[opacity,color] duration-150 group-hover:pointer-events-auto group-hover:opacity-100 hover:text-amber-300 focus-visible:pointer-events-auto focus-visible:opacity-100"
          aria-label="Remove from favourites"
        >
          <Star className="size-4 fill-current" strokeWidth={0} />
        </button>
      </div>
    </article>
  );
}

export default function FavouriteModelsPage() {
  const mounted = useMounted();
  const [refreshTick, setRefreshTick] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FavouriteFilterId>("all");

  const models = useMemo(
    () => (mounted ? loadFavouriteModels() : []),
    [mounted, refreshTick],
  );

  const filtered = useMemo(
    () =>
      models.filter((m) => matchesFavouriteFilter(m.taskType, activeFilter)),
    [models, activeFilter],
  );

  const handleRemove = useCallback((id: string) => {
    removeFavouriteModel(id);
    setRefreshTick((prev) => prev + 1);
  }, []);

  const filterTabs = FAVOURITE_FILTER_IDS.map((id) => ({
    id,
    label: FILTER_LABELS[id],
  }));

  return (
    <section className="bg-background min-h-screen pb-6 md:pb-8">
      <div className="border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 flex justify-center border-b px-4 backdrop-blur md:px-12 lg:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex h-12 w-full max-w-7xl items-center gap-1.5 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/models"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Explore
          </Link>
          <span className="text-foreground/25">/</span>
          <span className="text-foreground/60">My Favourite Models</span>
        </nav>
      </div>
      <section className="px-6 pt-6 pb-16 md:px-12 md:pt-8 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-heading text-3xl leading-none font-semibold">
            My Favourite Models
          </h1>

          <div
            role="tablist"
            aria-label="Filter by task type"
            className="border-foreground/10 mt-8 flex items-center gap-1.5 overflow-x-auto border-b pt-1 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`h-10 shrink-0 cursor-pointer border-b-2 px-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "text-foreground/60 hover:text-foreground border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {!mounted ? (
            <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center sm:min-h-96">
              <p className="text-foreground/50 text-center text-sm">Loading…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center sm:min-h-96">
              <p className="text-foreground/55 max-w-md text-center text-sm leading-relaxed">
                {models.length === 0 ? (
                  <>
                    No favourite models yet. Open a model page and choose{" "}
                    <span className="text-foreground/80 font-medium">
                      Add to favourite
                    </span>{" "}
                    to save it here.
                  </>
                ) : (
                  "No models match this filter."
                )}
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((model) => (
                <FavouriteModelCard
                  key={model.id}
                  model={model}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

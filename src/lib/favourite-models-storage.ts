export const FAVOURITE_MODELS_STORAGE_KEY = "wavespeed:favourite-models";

export type FavouriteModel = {
  id: string;
  name: string;
  provider: string;
  taskType: string;
  priceLabel: string;
  href: string;
};

export const FAVOURITE_FILTER_IDS = [
  "all",
  "text-to-image",
  "image-to-image",
  "text-to-video",
  "image-to-video",
  "video-to-video",
  "other",
] as const;

export type FavouriteFilterId = (typeof FAVOURITE_FILTER_IDS)[number];

export function loadFavouriteModels(): FavouriteModel[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(FAVOURITE_MODELS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isFavouriteModelRecord);
  } catch {
    return [];
  }
}

export function saveFavouriteModels(models: FavouriteModel[]): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(FAVOURITE_MODELS_STORAGE_KEY, JSON.stringify(models));
}

export function upsertFavouriteModel(model: FavouriteModel): void {
  const list = loadFavouriteModels();
  const next = list.filter((m) => m.id !== model.id);
  next.push(model);
  saveFavouriteModels(next);
}

export function removeFavouriteModel(id: string): void {
  saveFavouriteModels(loadFavouriteModels().filter((m) => m.id !== id));
}

export function isFavouriteModelId(id: string): boolean {
  return loadFavouriteModels().some((m) => m.id === id);
}

const KNOWN_TASK_FILTERS = new Set<string>([
  "text-to-image",
  "image-to-image",
  "text-to-video",
  "image-to-video",
  "video-to-video",
]);

export function matchesFavouriteFilter(
  taskType: string,
  filter: FavouriteFilterId,
): boolean {
  if (filter === "all") {
    return true;
  }
  if (filter === "other") {
    return !KNOWN_TASK_FILTERS.has(taskType);
  }
  return taskType === filter;
}

function isFavouriteModelRecord(value: unknown): value is FavouriteModel {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.provider === "string" &&
    typeof o.taskType === "string" &&
    typeof o.priceLabel === "string" &&
    typeof o.href === "string"
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Eraser,
  FolderOpen,
  ImagePlus,
  Info,
  Link2,
  Mic,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import thumbR7 from "@/images/thumb-r7.webp";

const controlButtonSmClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-xs font-semibold shadow-xs";
const controlSelectClass =
  "border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 h-8 w-fit min-w-28 max-w-72 rounded-xs pl-3 pr-2 text-xs shadow-xs";
const controlSelectTriggerCompactClass =
  "border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 h-6 w-fit min-w-16 rounded-xs px-2 text-xs shadow-xs justify-between";
const previewCardClass =
  "bg-muted/40 border-input relative w-full max-w-40 overflow-hidden rounded-xs border";
const sliderClass = cn(
  "h-1 w-full appearance-none bg-transparent",
  "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent",
  "[&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:bg-white",
  "[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent",
  "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:bg-white",
);

function getSliderStyle(value: number, min: number, max: number) {
  const percent = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, rgb(15 23 42) 0%, rgb(15 23 42) ${percent}%, rgb(255 255 255) ${percent}%, rgb(255 255 255) 100%)`,
  };
}
const IMAGE_SIZE_MIN = 256;
const IMAGE_SIZE_MAX = 1536;

const imageSizeOptions = [
  { value: "default", label: "Default" },
  { value: "custom", label: "Custom" },
  { value: "square-hd", label: "Square HD" },
  { value: "square", label: "Square" },
  { value: "portrait-3-4", label: "Portrait 3:4" },
  { value: "portrait-9-16", label: "Portrait 9:16" },
  { value: "landscape-4-3", label: "Landscape 4:3" },
  { value: "landscape-16-9", label: "Landscape 16:9" },
] as const;

const imageSizePresetDimensions: Record<string, { w: number; h: number }> = {
  default: { w: 1536, h: 1536 },
  "square-hd": { w: 1024, h: 1024 },
  square: { w: 768, h: 768 },
  "portrait-3-4": { w: 768, h: 1024 },
  "portrait-9-16": { w: 576, h: 1024 },
  "landscape-4-3": { w: 1024, h: 768 },
  "landscape-16-9": { w: 1024, h: 576 },
};

function FieldLabel({
  children,
  tooltip,
  className,
}: {
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}) {
  const labelContent =
    typeof children === "string" ? (
      <>
        {children.endsWith("*")
          ? children.charAt(0).toUpperCase() + children.slice(1, -1)
          : children.charAt(0).toUpperCase() + children.slice(1)}
        {children.endsWith("*") ? (
          <span className="text-brand font-semibold">*</span>
        ) : null}
      </>
    ) : (
      children
    );

  return (
    <p
      className={cn(
        "text-foreground/80 mb-2 flex items-center gap-1 text-sm",
        className,
      )}
    >
      {labelContent}
      <span className="group relative inline-flex items-center">
        <button
          type="button"
          aria-label={tooltip}
          className="text-foreground/50 inline-flex cursor-help items-center"
        >
          <Info className="size-3.5" />
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-64 -translate-x-1/2 rounded-xs bg-slate-950 px-2.5 py-1.5 text-xs leading-snug text-white opacity-0 shadow-md transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          {tooltip}
        </span>
      </span>
    </p>
  );
}

const inputModeOptions = [
  { value: "form", label: "Form" },
  { value: "json", label: "JSON" },
  { value: "http", label: "HTTP" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
] as const;

const modelOptions = [
  "avatar-omni-human",
  "avatar-omni-human-1.5",
  "dreamactor-v2",
  "dreamina-v3.0-pro/image-to-video",
  "dreamina-v3.0-pro/text-to-video",
  "dreamina-v3.0/edit",
  "dreamina-v3.0/image-to-video-1080p",
  "dreamina-v3.0/image-to-video-720p",
  "dreamina-v3.0/text-to-image",
  "dreamina-v3.0/text-to-video-1080p",
  "dreamina-v3.0/text-to-video-720p",
  "dreamina-v3.1/text-to-image",
] as const;

type InputImageItem = {
  id: string;
  src: string;
  sizeLabel: string;
  shouldRevoke: boolean;
};

type AudioItem = {
  id: string;
  src: string;
  label: string;
  shouldRevoke: boolean;
};

type LoraItem = {
  id: string;
  path: string;
  scale: number;
};

function createImageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createImageItemFromUrl(rawValue: string): InputImageItem | null {
  const nextValue = rawValue.trim();
  if (!nextValue) {
    return null;
  }

  try {
    const parsed = new URL(nextValue);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }
    return {
      id: createImageId(),
      src: parsed.toString(),
      sizeLabel: "--",
      shouldRevoke: false,
    };
  } catch {
    return null;
  }
}

export function ModelSwitcher() {
  const [model, setModel] = useState<string>("nano-banana-pro/edit");

  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger
        aria-label="Switch model"
        size="sm"
        className="text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent/50 [&_svg]:text-muted-foreground hover:[&_svg]:text-foreground inline-flex size-8 min-w-8 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xs border-0 bg-transparent px-0 py-0 text-sm font-bold whitespace-nowrap shadow-none transition-all outline-none **:data-[slot=select-value]:hidden [&_svg]:size-5 [&_svg]:stroke-[1.75] [&_svg]:opacity-100"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-foreground/10 rounded-xs">
        <SelectItem value="nano-banana-pro/edit">
          nano-banana-pro/edit
        </SelectItem>
        {modelOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ModelDetailInputForm() {
  const singleImageFileInputRef = useRef<HTMLInputElement>(null);
  const imagesFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);
  const singleImageRef = useRef<InputImageItem | null>(null);
  const imagesRef = useRef<InputImageItem[]>([]);
  const audioRef = useRef<AudioItem | null>(null);
  const [singleImageUrlInput, setSingleImageUrlInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [singleImage, setSingleImage] = useState<InputImageItem | null>({
    id: createImageId(),
    src: thumbR7.src,
    sizeLabel: `${thumbR7.width}x${thumbR7.height}`,
    shouldRevoke: false,
  });
  const [images, setImages] = useState<InputImageItem[]>([
    {
      id: createImageId(),
      src: thumbR7.src,
      sizeLabel: `${thumbR7.width}x${thumbR7.height}`,
      shouldRevoke: false,
    },
  ]);
  const [enableSyncMode, setEnableSyncMode] = useState(false);
  const [enableBase64Output, setEnableBase64Output] = useState(true);
  const [sizeWidth, setSizeWidth] = useState(1024);
  const [sizeHeight, setSizeHeight] = useState(768);
  const [imageSizePreset, setImageSizePreset] =
    useState<string>("landscape-4-3");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioItem, setAudioItem] = useState<AudioItem | null>(null);
  const [loraItems, setLoraItems] = useState<LoraItem[]>([
    { id: createImageId(), path: "", scale: 1 },
  ]);
  const [enableBatchMode, setEnableBatchMode] = useState(false);

  useEffect(() => {
    singleImageRef.current = singleImage;
  }, [singleImage]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    audioRef.current = audioItem;
  }, [audioItem]);

  useEffect(() => {
    return () => {
      if (singleImageRef.current?.shouldRevoke) {
        URL.revokeObjectURL(singleImageRef.current.src);
      }
      imagesRef.current.forEach((image) => {
        if (image.shouldRevoke) {
          URL.revokeObjectURL(image.src);
        }
      });
      if (audioRef.current?.shouldRevoke) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const handleOpenImagesFilePicker = () => {
    imagesFileInputRef.current?.click();
  };

  const handleOpenSingleImageFilePicker = () => {
    singleImageFileInputRef.current?.click();
  };

  const handleSingleImageSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const firstImageFile = Array.from(files).find((file) =>
      file.type.startsWith("image/"),
    );
    if (!firstImageFile) {
      event.target.value = "";
      return;
    }

    const nextSingleImage: InputImageItem = {
      id: createImageId(),
      src: URL.createObjectURL(firstImageFile),
      sizeLabel: "--",
      shouldRevoke: true,
    };
    setSingleImage((prev) => {
      if (prev?.shouldRevoke) {
        URL.revokeObjectURL(prev.src);
      }
      return nextSingleImage;
    });
    event.target.value = "";
  };

  const handleImagesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const nextItems: InputImageItem[] = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: createImageId(),
        src: URL.createObjectURL(file),
        sizeLabel: "--",
        shouldRevoke: true,
      }));

    if (nextItems.length > 0) {
      setImages((prev) => [...prev, ...nextItems]);
    }
    event.target.value = "";
  };

  const handleAddSingleImageUrl = () => {
    const nextItem = createImageItemFromUrl(singleImageUrlInput);
    if (!nextItem) {
      return;
    }

    setSingleImage((prev) => {
      if (prev?.shouldRevoke) {
        URL.revokeObjectURL(prev.src);
      }
      return nextItem;
    });
    setSingleImageUrlInput("");
  };

  const handleAddUrl = () => {
    const nextItem = createImageItemFromUrl(urlInput);
    if (!nextItem) {
      return;
    }

    setImages((prev) => [...prev, nextItem]);
    setUrlInput("");
  };

  const handleRemoveSingleImage = () => {
    setSingleImage((prev) => {
      if (prev?.shouldRevoke) {
        URL.revokeObjectURL(prev.src);
      }
      return null;
    });
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.shouldRevoke) {
        URL.revokeObjectURL(target.src);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleOpenAudioFilePicker = () => {
    audioFileInputRef.current?.click();
  };

  const handleAudioFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const firstAudioFile = Array.from(files).find((file) =>
      file.type.startsWith("audio/"),
    );
    if (!firstAudioFile) {
      event.target.value = "";
      return;
    }

    const nextAudio: AudioItem = {
      id: createImageId(),
      src: URL.createObjectURL(firstAudioFile),
      label: firstAudioFile.name,
      shouldRevoke: true,
    };
    setAudioItem((prev) => {
      if (prev?.shouldRevoke) {
        URL.revokeObjectURL(prev.src);
      }
      return nextAudio;
    });
    setAudioUrl("");
    event.target.value = "";
  };

  const handleAddAudioUrl = () => {
    const rawValue = audioUrl.trim();
    if (!rawValue) {
      return;
    }

    try {
      const parsed = new URL(rawValue);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return;
      }

      const nextAudio: AudioItem = {
        id: createImageId(),
        src: parsed.toString(),
        label: parsed.hostname,
        shouldRevoke: false,
      };
      setAudioItem((prev) => {
        if (prev?.shouldRevoke) {
          URL.revokeObjectURL(prev.src);
        }
        return nextAudio;
      });
      setAudioUrl("");
    } catch {
      // Ignore invalid URL input.
    }
  };

  const handleRemoveAudio = () => {
    setAudioItem((prev) => {
      if (prev?.shouldRevoke) {
        URL.revokeObjectURL(prev.src);
      }
      return null;
    });
  };

  const handleImageSizePresetChange = (value: string) => {
    setImageSizePreset(value);
    const preset = imageSizePresetDimensions[value];
    if (preset) {
      setSizeWidth(preset.w);
      setSizeHeight(preset.h);
    }
  };

  const clampSize = (n: number) =>
    Math.min(
      IMAGE_SIZE_MAX,
      Math.max(IMAGE_SIZE_MIN, Number.isFinite(n) ? n : IMAGE_SIZE_MIN),
    );

  const handleSizeWidthChange = (value: number) =>
    setSizeWidth(clampSize(value));
  const handleSizeHeightChange = (value: number) =>
    setSizeHeight(clampSize(value));

  const handleAddLoraItem = () => {
    setLoraItems((prev) => [
      ...prev,
      { id: createImageId(), path: "", scale: 1 },
    ]);
  };

  const handleRemoveLoraItem = (id: string) => {
    setLoraItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoraPathChange = (id: string, path: string) => {
    setLoraItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, path } : item)),
    );
  };

  const handleLoraScaleChange = (id: string, scale: number) => {
    setLoraItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, scale } : item)),
    );
  };

  const handleLoraScaleReset = (id: string) => {
    handleLoraScaleChange(id, 1);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">Input</h2>
        <Select defaultValue="form">
          <SelectTrigger size="sm" className={controlSelectTriggerCompactClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-foreground/10 rounded-xs">
            {inputModeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
          <div>
            <FieldLabel tooltip="One primary input image for editing.">
              image*
            </FieldLabel>
            <div className="flex min-w-0 items-center gap-2">
              <input
                type="text"
                value={singleImageUrlInput}
                onChange={(event) => setSingleImageUrlInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddSingleImageUrl();
                  }
                }}
                onBlur={handleAddSingleImageUrl}
                placeholder="Add image from URL or paste from clipboard"
                className={cn(
                  "border-input bg-background placeholder:text-muted-foreground text-foreground h-8 flex-1 rounded-xs border px-3 text-xs shadow-xs outline-none",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handleOpenSingleImageFilePicker}
                aria-label="Choose image file"
                className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 w-8 rounded-xs shadow-xs"
              >
                <FolderOpen className="size-4" />
              </Button>
              <input
                ref={singleImageFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleSingleImageSelected}
                className="hidden"
              />
            </div>
            {singleImage ? (
              <div className="mt-3">
                <div className={previewCardClass}>
                  <div className="relative aspect-square w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={singleImage.src}
                      alt="Primary input image preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove primary image"
                    className="bg-background/80 text-foreground/70 absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-xs border border-white/10"
                    onClick={handleRemoveSingleImage}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <FieldLabel tooltip="One or more reference images for editing.">
              images*
            </FieldLabel>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
                onClick={handleOpenImagesFilePicker}
              >
                <ImagePlus className="size-3.5" />
                Add Image
              </Button>
              <input
                ref={imagesFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesSelected}
                className="hidden"
              />
              <div className="bg-border h-5 w-px shrink-0" />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(event) => setUrlInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddUrl();
                    }
                  }}
                  placeholder="Add image from URL or paste from clipboard"
                  className={cn(
                    "border-input bg-background placeholder:text-muted-foreground text-foreground h-8 flex-1 rounded-xs border px-3 text-xs shadow-xs outline-none",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!urlInput.trim()}
                  onClick={handleAddUrl}
                  className={controlButtonSmClass}
                >
                  Add URL
                </Button>
              </div>
            </div>

            <p className="text-foreground/60 mt-3 text-xs">
              <span className="font-semibold">Hint:</span> Drag and drop files
              from your computer, images from web pages, paste from clipboard
              (Ctrl/Cmd+V), or provide a URL.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  className={cn(previewCardClass, "justify-self-start")}
                >
                  <div className="relative aspect-square w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt="Input image preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove image"
                    className="bg-background/80 text-foreground/70 absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-xs border border-white/10"
                    onClick={() => handleRemoveImage(item.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                  <div className="text-foreground/70 absolute right-2 bottom-2 left-2 flex items-center justify-between text-xs">
                    <span>{item.sizeLabel}</span>
                    <Link2 className="size-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 mt-3 text-sm">
              {images.length} images added
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <FieldLabel
                tooltip="Describe the edit you want the model to apply."
                className="mb-0"
              >
                prompt*
              </FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
              >
                <Sparkles className="size-3.5" />
                Prompt Enhancer
              </Button>
            </div>
            <textarea
              defaultValue="Make the hamburger made of glass."
              rows={4}
              className={cn(
                "border-input bg-background placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 resize-y rounded-xs border px-3 py-2 text-xs shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                "min-h-24",
              )}
            />
          </div>

          <div>
            <FieldLabel tooltip="Target aspect ratio for the generated result.">
              aspect_ratio
            </FieldLabel>
            <Select defaultValue="1:1">
              <SelectTrigger size="sm" className={controlSelectClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-foreground/10 rounded-xs">
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="9:16">9:16</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
                <SelectItem value="3:4">3:4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FieldLabel tooltip="Output resolution level for generated images.">
              resolution
            </FieldLabel>
            <Select defaultValue="2k">
              <SelectTrigger size="sm" className={controlSelectClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-foreground/10 rounded-xs">
                <SelectItem value="1k">1k</SelectItem>
                <SelectItem value="2k">2k</SelectItem>
                <SelectItem value="4k">4k</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FieldLabel tooltip="The file format returned by the model output.">
              output_format
            </FieldLabel>
            <Select defaultValue="jpeg">
              <SelectTrigger size="sm" className={controlSelectClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-foreground/10 rounded-xs">
                <SelectItem value="jpeg">jpeg</SelectItem>
                <SelectItem value="png">png</SelectItem>
                <SelectItem value="webp">webp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FieldLabel tooltip="The size of the generated image. Default value: landscape_4_3">
              Image size
            </FieldLabel>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={imageSizePreset}
                  onValueChange={handleImageSizePresetChange}
                >
                  <SelectTrigger size="sm" className={controlSelectClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-foreground/10 rounded-xs">
                    {imageSizeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={IMAGE_SIZE_MIN}
                    max={IMAGE_SIZE_MAX}
                    value={sizeWidth}
                    onChange={(event) =>
                      handleSizeWidthChange(Number(event.target.value))
                    }
                    onBlur={(event) =>
                      handleSizeWidthChange(Number(event.target.value))
                    }
                    disabled={imageSizePreset !== "custom"}
                    className={cn(
                      "border-input bg-background text-foreground h-8 w-24 rounded-xs border px-3 text-xs shadow-xs outline-none",
                      imageSizePreset !== "custom" &&
                        "cursor-not-allowed opacity-60",
                    )}
                  />
                  <span className="text-foreground/70 text-xs" aria-hidden>
                    ×
                  </span>
                  <input
                    type="number"
                    min={IMAGE_SIZE_MIN}
                    max={IMAGE_SIZE_MAX}
                    value={sizeHeight}
                    onChange={(event) =>
                      handleSizeHeightChange(Number(event.target.value))
                    }
                    onBlur={(event) =>
                      handleSizeHeightChange(Number(event.target.value))
                    }
                    disabled={imageSizePreset !== "custom"}
                    className={cn(
                      "border-input bg-background text-foreground h-8 w-24 rounded-xs border px-3 text-xs shadow-xs outline-none",
                      imageSizePreset !== "custom" &&
                        "cursor-not-allowed opacity-60",
                    )}
                  />
                </div>
              </div>
              <p className="text-foreground/60 text-xs">Range: 256 – 1536</p>
            </div>
          </div>

          <div>
            <FieldLabel tooltip="Optional audio URL input for multimodal workflows.">
              audio*
            </FieldLabel>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(event) => setAudioUrl(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddAudioUrl();
                    }
                  }}
                  placeholder="https://..."
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground h-8 flex-1 rounded-xs border px-2 text-xs shadow-xs outline-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="h-8 w-8 rounded-xs shadow-xs"
                  aria-label="Choose audio file"
                  onClick={handleOpenAudioFilePicker}
                >
                  <FolderOpen className="size-3.5" />
                </Button>
                <input
                  ref={audioFileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileSelected}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="h-8 w-8 rounded-xs shadow-xs"
                  aria-label="Record audio"
                >
                  <Mic className="size-3.5" />
                </Button>
              </div>
              <p className="text-foreground/60 text-xs">
                Hint: You can drag and drop a file or click to upload.
              </p>
              {audioItem ? (
                <div className="flex items-center gap-2">
                  <audio controls src={audioItem.src} className="h-8 flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Remove audio"
                    onClick={handleRemoveAudio}
                    className="h-8 w-8 rounded-xs"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <FieldLabel tooltip="Configure LoRA path and influence scale.">
              loras
            </FieldLabel>
            <div className="border-border border-l pl-3">
              <div className="space-y-3">
                {loraItems.map((item, index) => (
                  <div key={item.id} className="space-y-2">
                    {index > 0 ? (
                      <div className="bg-border my-3 h-px w-full shrink-0" />
                    ) : null}
                    <div className="flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="space-y-1">
                          <p className="text-foreground/80 text-xs">
                            Path<span className="text-brand font-bold">*</span>
                          </p>
                          <input
                            type="text"
                            value={item.path}
                            onChange={(event) =>
                              handleLoraPathChange(item.id, event.target.value)
                            }
                            placeholder="<owner>/<model-name> or URL"
                            className="border-input bg-background text-foreground placeholder:text-muted-foreground h-8 w-full rounded-xs border px-3 text-xs shadow-xs outline-none"
                          />
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-foreground/80 text-xs">Scale</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={0}
                              max={5}
                              step={0.1}
                              value={item.scale}
                              onChange={(event) =>
                                handleLoraScaleChange(
                                  item.id,
                                  Number(event.target.value),
                                )
                              }
                              className={sliderClass}
                              style={getSliderStyle(item.scale, 0, 5)}
                            />
                            <input
                              type="number"
                              min={0}
                              max={5}
                              step={0.1}
                              value={item.scale}
                              onChange={(event) =>
                                handleLoraScaleChange(
                                  item.id,
                                  Number(event.target.value),
                                )
                              }
                              className="border-input bg-background text-foreground h-8 w-16 rounded-xs border px-2 text-xs shadow-xs outline-none"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              aria-label="Reset lora scale"
                              onClick={() => handleLoraScaleReset(item.id)}
                              className="h-8 w-8 shrink-0 rounded-xs"
                            >
                              <Eraser className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-border flex min-h-18 w-px shrink-0 self-stretch" />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Remove lora item"
                        onClick={() => handleRemoveLoraItem(item.id)}
                        className="h-8 w-8 shrink-0 rounded-xs"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="bg-border my-3 h-px w-full shrink-0" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                  onClick={handleAddLoraItem}
                >
                  <Plus className="size-3.5" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          <div>
            <FieldLabel tooltip="If enabled, API waits for generation and returns results directly in the same response.">
              enable_sync_mode
            </FieldLabel>
            <div className="mb-2 flex items-center">
              <Switch
                checked={enableSyncMode}
                onCheckedChange={setEnableSyncMode}
                aria-label="Toggle enable sync mode"
              />
            </div>
          </div>

          <div>
            <FieldLabel tooltip="If enabled, output is embedded as base64 string instead of URL.">
              enable_base64_output
            </FieldLabel>
            <div className="mb-2 flex items-center">
              <Switch
                checked={enableBase64Output}
                onCheckedChange={setEnableBase64Output}
                aria-label="Toggle enable base64 output"
              />
            </div>
          </div>
        </div>

        <footer className="border-border bg-surface sticky bottom-0 z-10 mt-4 flex shrink-0 flex-col gap-3 border-t pt-4 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
              >
                Reset
              </Button>
              <label className="text-foreground/80 flex cursor-pointer items-center gap-1.5 text-xs">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="border-foreground accent-foreground size-3 cursor-not-allowed rounded-xs border opacity-60"
                />
                <span>Enable Safety Checker</span>
                <span className="group relative inline-flex items-center">
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-64 -translate-x-1/2 rounded-xs bg-slate-950 px-2.5 py-1.5 text-xs leading-snug text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
                  >
                    The safety checker cannot be disabled on the playground.
                    This property is only available through the API.
                  </span>
                  <Info className="text-foreground/50 size-3.5" />
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <Button
                type="button"
                className="bg-foreground text-background hover:bg-foreground/90 h-8 min-w-28 rounded-l-xs rounded-r-none px-3 text-xs font-bold shadow-xs"
              >
                Run $0.025
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    aria-label="Batch settings"
                    className="bg-foreground text-background hover:bg-foreground/90 h-8 rounded-l-none rounded-r-xs border-l border-white/20 px-1.5 shadow-xs"
                  >
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="border-foreground/10 w-56 rounded-xs p-0"
                  align="end"
                >
                  <div className="border-border border-b px-3 py-2">
                    <p className="text-foreground text-xs font-semibold">
                      Batch Settings
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="text-foreground/80 text-xs">
                      Enable batch mode
                    </span>
                    <Switch
                      checked={enableBatchMode}
                      onCheckedChange={setEnableBatchMode}
                      aria-label="Toggle batch mode"
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

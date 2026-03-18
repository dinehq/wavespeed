"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Braces,
  BookOpen,
  ChevronDown,
  Copy,
  Download,
  Expand,
  ExternalLink,
  Eye,
  ImageIcon,
  Info,
  Images,
  Pencil,
  RefreshCw,
  Star,
  Trash2,
  WandSparkles,
} from "lucide-react";
import editorPreview from "@/images/editor-image-preview.webp";
import spinner from "@/images/spinner.json";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShikiCodeBlock } from "@/components/ui/shiki-code-block";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequestDetailDialog } from "@/features/product/components/request-detail-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { ProductTopTabs } from "@/features/product/components/product-top-tabs";
import { ExamplesSection } from "./examples-section";
import { ModelDetailInputForm, ModelSwitcher } from "./model-detail-input-form";
import { ReadmeSection } from "./readme-section";

const relatedModels = [
  {
    name: "nano-banana-2/edit",
    type: "image-to-image",
    image: thumb1,
  },
  {
    name: "nano-banana-2/text-to-image",
    type: "text-to-image",
    image: thumb2,
  },
  {
    name: "nano-banana-pro/edit-multi",
    type: "image-to-image",
    image: thumb3,
  },
  {
    name: "nano-banana-pro/edit-ultra",
    type: "image-to-image",
    image: thumb4,
  },
  {
    name: "nano-banana-pro/retouch",
    type: "image-to-image",
    image: thumb5,
  },
  {
    name: "nano-banana-pro/restore",
    type: "image-to-image",
    image: thumb6,
  },
];

const mockRequestHistory = [
  {
    id: "1d3636433f4c40d1865659ebad739a53",
    model: "google/nano-banana-pro/edit",
    status: "Succeeded",
    createdAt: "2 min ago",
    selected: true,
    preview: thumb1,
  },
  {
    id: "bc77d4a1920f4f2ab3c81d7e9054a6f1",
    model: "google/nano-banana-2/edit",
    status: "Running",
    createdAt: "8 min ago",
    selected: false,
    preview: editorPreview,
  },
  {
    id: "d91e02b5c3a84d1f95b2a63c7e4f8a10",
    model: "google/nano-banana-pro/retouch",
    status: "Running",
    createdAt: "14 min ago",
    selected: true,
    preview: thumb5,
  },
  {
    id: "f0a42be6c7d14a6eb94f2c8d1e730b55",
    model: "google/nano-banana-pro/restore",
    status: "Failed",
    createdAt: "35 min ago",
    selected: false,
    preview: thumb6,
  },
  {
    id: "9c31aa4e7fb24d7fa81c2b5e6d9034aa",
    model: "google/nano-banana-2/text-to-image",
    status: "Succeeded",
    createdAt: "1 hour ago",
    selected: false,
    preview: thumb2,
  },
] as const;

const controlButtonSmClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-xs font-semibold shadow-xs";

const resultJsonPreview = `{
  "image": {
    "file_size": 959,
    "file_name": "180c718ac5d8407092d0688ea2605f0c.svg",
    "content_type": "image/svg+xml",
    "url": "https://v3b.fal.media/files/b/0a90bfc3/0f8Su2aQUzPQy4NZMDQpp_180c718ac5d8407092d0688ea2605f0c.svg"
  },
  "svg_content": "",
  "seed": 1835785439,
  "timings": {
    "inference": 10.83
  }
}`;

const requestDetailMockById: Record<
  (typeof mockRequestHistory)[number]["id"],
  {
    prompt: string;
    requestId: string;
    status: "Succeeded" | "Running" | "Failed";
    duration: string;
    timeTaken: string;
    cost: string;
    input: string;
    output: string;
  }
> = {
  "1d3636433f4c40d1865659ebad739a53": {
    prompt:
      "A hyper-realistic 4k texture of an ancient weathered brick wall with lush green moss and soft lichens.",
    requestId: "1d3636433f4c40d1865659ebad739a53",
    status: "Succeeded",
    duration: "20.52s",
    timeTaken: "2026-03-03 19:30",
    cost: "$0.03",
    input: `{
  "prompt": "A hyper-realistic 4k texture of an ancient weathered brick wall with lush green moss and soft lichens.",
  "output_format": "png",
  "num_images": 1
}`,
    output: `{
  "result": [
    "https://cdn.wavespeed.ai/outputs/1d3636433f4c40d1865659ebad739a53.png"
  ]
}`,
  },
  bc77d4a1920f4f2ab3c81d7e9054a6f1: {
    prompt: "Turn this product photo into studio-style ad creative.",
    requestId: "bc77d4a1920f4f2ab3c81d7e9054a6f1",
    status: "Running",
    duration: "--",
    timeTaken: "2026-03-03 19:22",
    cost: "--",
    input: `{
  "prompt": "Turn this product photo into studio-style ad creative.",
  "output_format": "png"
}`,
    output: `{
  "result": "Processing..."
}`,
  },
  d91e02b5c3a84d1f95b2a63c7e4f8a10: {
    prompt:
      "A hyper-realistic, high-resolution 4k texture of an ancient weathered brick wall heavily overgrown with lush green moss and soft lichens. The bricks are aged, featuring deep earthy tones, natural cracks, and gritty textures. Vibrant emerald moss fills the mortar lines and spills over the rough surfaces of the stones. Uniform, flat cinematic lighting ensures no harsh shadows, highlighting the intricate organic details and damp stone surfaces. The composition is a perfectly balanced overhead view, showcasing a rich tapestry of botanical growth and masonry craftsmanship with professional clarity and hyper-detailed grit.",
    requestId: "d91e02b5c3a84d1f95b2a63c7e4f8a10",
    status: "Running",
    duration: "--",
    timeTaken: "2026-03-03 19:16",
    cost: "--",
    input: `{
  "prompt": "Retouch and sharpen while preserving skin details.",
  "resolution": "2k"
}`,
    output: `{
  "result": "Processing..."
}`,
  },
  f0a42be6c7d14a6eb94f2c8d1e730b55: {
    prompt: "Restore old damaged image and remove scratches.",
    requestId: "f0a42be6c7d14a6eb94f2c8d1e730b55",
    status: "Failed",
    duration: "11.30s",
    timeTaken: "2026-03-03 18:55",
    cost: "$0.02",
    input: `{
  "prompt": "Restore old damaged image and remove scratches."
}`,
    output: `{
  "error": "Source image quality too low"
}`,
  },
  "9c31aa4e7fb24d7fa81c2b5e6d9034aa": {
    prompt: "Generate a clean ecommerce-style hero shot.",
    requestId: "9c31aa4e7fb24d7fa81c2b5e6d9034aa",
    status: "Succeeded",
    duration: "18.02s",
    timeTaken: "2026-03-03 18:20",
    cost: "$0.03",
    input: `{
  "prompt": "Generate a clean ecommerce-style hero shot.",
  "output_format": "png"
}`,
    output: `{
  "result": [
    "https://cdn.wavespeed.ai/outputs/9c31aa4e7fb24d7fa81c2b5e6d9034aa.png"
  ]
}`,
  },
};

const requestDetailInputCode = `{"prompt":"A hyper-realistic, high-resolution 4k texture of an ancient weathered brick wall heavily overgrown with lush green moss and soft lichens. The bricks are aged, featuring deep earthy tones, natural cracks, and gritty textures. Vibrant emerald moss fills the mortar lines and spills over the rough surfaces of the stones. Uniform, flat cinematic lighting ensures no harsh shadows, highlighting the intricate organic details and damp stone surfaces. The composition is a perfectly balanced overhead view, showcasing a rich tapestry of botanical growth and masonry craftsmanship with professional clarity and hyper-detailed grit.","image_size":"square_hd","num_inference_steps":8,"num_images":1,"enable_safety_checker":true,"output_format":"png","acceleration":"regular","tile_size":128,"tile_stride":64,"tiling_mode":"both","loras":[]}`;

const requestDetailOutputCode = `{
  "seed": 1542419079,
  "images": [
    "https://d1q70pf5vjeyhc.cloudfront.net/media/92ecf66930134a49a5a425b9def0c266/images/1772600388421313254_oSpzIR09.jpeg"
  ],
  "prompt": "STYLE: Emphasize photographic qualities like camera settings, depth of field, and lighting.\\nA vibrant, sunlit beach scene captured with a wide-angle lens, shallow depth of field, and natural golden-hour lighting. A young man in casual beachwear—linen short-sleeve shirt left slightly unbuttoned, rolled-up chino shorts, and leather flip-flops—stands barefoot on soft sand, smiling confidently at the camera. His hair is lightly tousled by the sea breeze, with a pair of aviator sunglasses resting on his head, and his expression radiates ease and carefree energy. The background features blurred turquoise waves and distant palm trees, creating a dreamy bokeh effect. Shot in candid-style beach photography with warm tones, high dynamic range, and realistic textures. Medium shot, eye-level, capturing his full upper body and surroundings with a natural, inviting atmosphere."
}`;

export default function ModelDetailPage() {
  const searchParams = useSearchParams();
  const isUnauthedEntry = searchParams.get("entry") === "explore";
  const [activeTopTab, setActiveTopTab] = useState<
    "playground" | "api" | "history"
  >("playground");
  const currentTopTab = isUnauthedEntry ? "playground" : activeTopTab;
  const [resultView, setResultView] = useState<"preview" | "json">("preview");
  const [enableImageMagnification, setEnableImageMagnification] =
    useState(false);
  const [apiLanguage, setApiLanguage] = useState<"http" | "node" | "python">(
    "node",
  );
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>(() =>
    mockRequestHistory.filter((item) => item.selected).map((item) => item.id),
  );
  const [activeApiAnchor, setActiveApiAnchor] = useState("api-install-client");
  const [isGenerating, setIsGenerating] = useState(false);
  const [spinnerReplayKey, setSpinnerReplayKey] = useState(0);
  const [resultStatus, setResultStatus] = useState<
    "Idle" | "Starting" | "In process" | "Completed" | "Failed"
  >("Idle");
  const [openedRequestId, setOpenedRequestId] = useState<
    (typeof mockRequestHistory)[number]["id"] | null
  >(null);
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [isDetailSectionExpanded, setIsDetailSectionExpanded] = useState(true);
  const [isInputSectionExpanded, setIsInputSectionExpanded] = useState(true);
  const [isOutputSectionExpanded, setIsOutputSectionExpanded] = useState(true);
  const [isResultSectionExpanded, setIsResultSectionExpanded] = useState(true);
  const generationTimeoutRef = useRef<number | null>(null);
  const generationProgressTimeoutRef = useRef<number | null>(null);
  const apiJsonPayload = `{
  "enable_base64_output": false,
  "enable_sync_mode": false,
  "enable_web_search": false,
  "images": [
    "https://d1q70pf5vjeyhc.cloudfront.net/media/92ecf66930134a49a5a425b9def0c266/images/1772127466078555123_5C2bluDN.png"
  ],
  "output_format": "png",
  "prompt": "Change the man to a woman, and hold a digital-style banana.",
  "resolution": "1k"
}`;
  const apiNodeCode = `const WaveSpeed = require('wavespeed');

const client = new WaveSpeed({
  apiKey: process.env.WAVESPEED_API_KEY
});

async function run() {
  const response = await client.predictions.create({
    model: 'google/nano-banana-2/edit',
    input: ${apiJsonPayload}
  });

  console.log('Request ID:', response.data.id);
}

run();`;
  const apiNavItems = useMemo(
    () =>
      [
        {
          title: "1. Calling the API",
          titleId: "api-calling-the-api",
          children: [
            { id: "api-install-client", label: "Install the client" },
            { id: "api-submit-request", label: "Submit a request" },
          ],
        },
        {
          title: "2. Authentication",
          titleId: "api-authentication",
          children: [{ id: "api-auth-key", label: "Get your API Key" }],
        },
        {
          title: "3. Queue & Webhooks",
          titleId: "api-queue-webhooks",
          children: [
            { id: "api-queue-submit", label: "Submit request" },
            { id: "api-queue-response", label: "Response" },
          ],
        },
        {
          title: "4. Verifying Webhooks",
          titleId: "api-verifying-webhooks",
          children: [
            { id: "api-webhook-headers", label: "Webhook headers" },
            { id: "api-signature", label: "Signature computation" },
            { id: "api-verify-example", label: "Verification example" },
          ],
        },
        {
          title: "5. Files",
          titleId: "api-files",
          children: [
            { id: "api-files-public-url", label: "Public URL" },
            { id: "api-files-base64", label: "Base64 data URI" },
            { id: "api-files-upload", label: "Upload API" },
          ],
        },
        {
          title: "6. Schema",
          titleId: "api-schema",
          children: [
            { id: "api-schema-input", label: "Input" },
            { id: "api-schema-example", label: "Example request" },
            { id: "api-schema-output", label: "Output" },
          ],
        },
      ] as const,
    [],
  );
  const apiPayload = `{
  "enable_base64_output": false,
  "enable_sync_mode": false,
  "images": [
    "https://example.com/input.png"
  ],
  "output_format": "png",
  "prompt": "Change the man to a woman, and hold a digital-style banana.",
  "resolution": "1k"
}`;
  const apiHttpCode = `curl --location --request POST 'https://api.wavespeed.ai/api/v3/google/nano-banana-2/edit' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer \${WAVESPEED_API_KEY}' \\
  --data-raw '${apiPayload}'`;
  const apiPythonCode = `import os
import json
import requests

url = "https://api.wavespeed.ai/api/v3/google/nano-banana-2/edit"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {os.getenv('WAVESPEED_API_KEY')}",
}
payload = ${apiPayload}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())`;
  const apiAnchorIds = useMemo(
    () => [
      "api-overview",
      ...apiNavItems.flatMap((group) => [
        group.titleId,
        ...group.children.map((item) => item.id),
      ]),
    ],
    [apiNavItems],
  );
  const selectedRequestCount = selectedRequestIds.length;
  const areAllRequestsSelected =
    mockRequestHistory.length > 0 &&
    selectedRequestCount === mockRequestHistory.length;
  const selectedItemsLabel = `${selectedRequestCount} ${
    selectedRequestCount === 1 ? "item" : "items"
  } selected`;
  const openedRequestIndex =
    openedRequestId === null
      ? -1
      : mockRequestHistory.findIndex((item) => item.id === openedRequestId);
  const hasPrevRequest = openedRequestIndex > 0;
  const hasNextRequest =
    openedRequestIndex >= 0 &&
    openedRequestIndex < mockRequestHistory.length - 1;
  const openedRequest =
    mockRequestHistory.find((item) => item.id === openedRequestId) ?? null;
  const openedRequestDetail =
    openedRequestId !== null ? requestDetailMockById[openedRequestId] : null;
  const requestDetailResultCode = useMemo(() => {
    if (!openedRequest || !openedRequestDetail) {
      return "";
    }

    const parsedDuration = Number.parseFloat(
      openedRequestDetail.duration.replace("s", ""),
    );
    const inference =
      Number.isFinite(parsedDuration) && parsedDuration > 0
        ? Math.round(parsedDuration * 1000)
        : 20524;

    return `{
  "code": 0,
  "created_at": "2026-03-04T06:48:16.887224307Z",
  "error": "",
  "id": "${openedRequest.id}",
  "model": "${openedRequest.model}",
  "outputs": [
    "https://d1q70pf5vjeyhc.cloudfront.net/predictions/${openedRequest.id}/1.png"
  ],
  "status": "${openedRequestDetail.status.toLowerCase()}",
  "timings": {
    "inference": ${inference}
  },
  "urls": {
    "get": "https://api.wavespeed.ai/api/v3/predictions/${openedRequest.id}/result"
  }
}`;
  }, [openedRequest, openedRequestDetail]);
  const programmaticScrollTargetRef = useRef<string | null>(null);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequestIds((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId],
    );
  };
  const toggleSelectAllRequests = () => {
    setSelectedRequestIds((prev) =>
      prev.length === mockRequestHistory.length
        ? []
        : mockRequestHistory.map((item) => item.id),
    );
  };
  const getRequestCheckboxClassName = (checked: boolean) =>
    `cursor-pointer inline-flex size-3.5 items-center justify-center rounded-xs border transition-colors ${
      checked
        ? "border-[#8ea8ff] bg-[#e9efff] text-[#5f7dff]"
        : "border-foreground/15 bg-background hover:bg-foreground/[0.03] text-transparent"
    }`;
  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${label} copied to clipboard.`,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Clipboard is unavailable in this browser.",
        variant: "destructive",
      });
    }
  };
  const handleRunPrediction = () => {
    if (generationTimeoutRef.current !== null) {
      window.clearTimeout(generationTimeoutRef.current);
    }
    if (generationProgressTimeoutRef.current !== null) {
      window.clearTimeout(generationProgressTimeoutRef.current);
    }
    setResultView("preview");
    setIsGenerating(true);
    setResultStatus("Starting");
    setSpinnerReplayKey((prev) => prev + 1);
    generationProgressTimeoutRef.current = window.setTimeout(() => {
      setResultStatus("In process");
      generationProgressTimeoutRef.current = null;
    }, 550);
    generationTimeoutRef.current = window.setTimeout(() => {
      setIsGenerating(false);
      setResultStatus("Completed");
      generationTimeoutRef.current = null;
    }, 5000);
  };
  const openRequestDetail = (
    requestId: (typeof mockRequestHistory)[number]["id"],
  ) => {
    setIsPromptExpanded(false);
    setIsDetailSectionExpanded(true);
    setIsInputSectionExpanded(true);
    setIsOutputSectionExpanded(true);
    setIsResultSectionExpanded(true);
    setOpenedRequestId(requestId);
  };
  const openPrevRequestDetail = () => {
    if (!hasPrevRequest || openedRequestIndex <= 0) {
      return;
    }
    setIsPromptExpanded(false);
    setIsDetailSectionExpanded(true);
    setIsInputSectionExpanded(true);
    setIsOutputSectionExpanded(true);
    setIsResultSectionExpanded(true);
    setOpenedRequestId(mockRequestHistory[openedRequestIndex - 1].id);
  };
  const openNextRequestDetail = () => {
    if (!hasNextRequest || openedRequestIndex < 0) {
      return;
    }
    setIsPromptExpanded(false);
    setIsDetailSectionExpanded(true);
    setIsInputSectionExpanded(true);
    setIsOutputSectionExpanded(true);
    setIsResultSectionExpanded(true);
    setOpenedRequestId(mockRequestHistory[openedRequestIndex + 1].id);
  };
  const scrollToApiSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    if (programmaticScrollTimeoutRef.current !== null) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTargetRef.current = id;
    setActiveApiAnchor(id);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      programmaticScrollTargetRef.current = null;
      programmaticScrollTimeoutRef.current = null;
    }, 900);
  };

  useEffect(() => {
    if (currentTopTab !== "api") {
      return;
    }

    const sectionElements = apiAnchorIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScrollTargetRef.current) {
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveApiAnchor(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (programmaticScrollTimeoutRef.current !== null) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
        programmaticScrollTimeoutRef.current = null;
      }
      programmaticScrollTargetRef.current = null;
    };
  }, [currentTopTab, apiAnchorIds]);

  useEffect(() => {
    return () => {
      if (generationTimeoutRef.current !== null) {
        window.clearTimeout(generationTimeoutRef.current);
      }
      if (generationProgressTimeoutRef.current !== null) {
        window.clearTimeout(generationProgressTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {isUnauthedEntry ? (
        <div className="border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 flex justify-center border-b px-4 backdrop-blur md:px-12 lg:px-20">
          <nav
            aria-label="Breadcrumb"
            className="flex h-12 w-full max-w-7xl items-center gap-1.5 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Link
              href="/explore"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <span className="text-foreground/25">/</span>
            <Link
              href="/collections/google"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Google Models
            </Link>
            <span className="text-foreground/25">/</span>
            <span className="text-foreground/60">
              google/nano-banana-pro/edit
            </span>
          </nav>
        </div>
      ) : (
        <ProductTopTabs activeTab="Explore" />
      )}
      <section className="px-4 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-4 pt-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-4">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2 md:pr-4 lg:pr-6">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h1 className="text-heading text-3xl leading-none font-semibold">
                    google/nano-banana-pro/edit
                  </h1>
                  <ModelSwitcher />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground shrink-0 rounded-xs"
                    aria-label="Copy"
                  >
                    <Copy className="size-5 stroke-[1.75]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground shrink-0 rounded-xs"
                    aria-label="Doc"
                  >
                    <BookOpen className="size-5 stroke-[1.75]" />
                  </Button>
                </div>
                <p className="text-subtle line-clamp-2 max-w-3xl text-sm">
                  Google Nano Banana Pro (Gemini 3.0 Pro Image) Edit supports
                  high-quality image editing workflows with consistent output
                  and production-friendly API response modes.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-foreground/70 bg-surface/70 inline-flex h-6 w-fit items-center gap-1 rounded-xs px-2 text-xs font-medium">
                    <Images className="size-3" />
                    image-to-image
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:shrink-0 md:justify-end lg:ml-6">
                <Button
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                >
                  <Star className="size-3" />
                  Add to favourite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={controlButtonSmClass}
                >
                  Schema
                </Button>
                <DropdownMenu>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${controlButtonSmClass} rounded-r-none`}
                    >
                      LLMs
                    </Button>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Open LLM actions"
                        className="border-foreground/10 text-muted-foreground hover:bg-foreground/5 hover:text-foreground h-8 rounded-l-none rounded-r-xs border-l-0 shadow-xs"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent className="border-foreground/10">
                    <DropdownMenuItem>Open Markdown content</DropdownMenuItem>
                    <DropdownMenuItem>Copy content</DropdownMenuItem>
                    <DropdownMenuItem>Open in ChatGPT</DropdownMenuItem>
                    <DropdownMenuItem>Open in Claude</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {isUnauthedEntry ? null : (
              <div className="border-foreground/10 flex items-center gap-1.5 overflow-x-auto border-b pt-1 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  onClick={() => setActiveTopTab("playground")}
                  className={`h-10 shrink-0 border-b-2 px-3 text-sm font-semibold transition-colors ${
                    activeTopTab === "playground"
                      ? "text-foreground border-foreground"
                      : "text-foreground/60 hover:text-foreground border-transparent"
                  }`}
                >
                  Playground
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTopTab("api")}
                  className={`h-10 shrink-0 border-b-2 px-3 text-sm font-semibold transition-colors ${
                    activeTopTab === "api"
                      ? "text-foreground border-foreground"
                      : "text-foreground/60 hover:text-foreground border-transparent"
                  }`}
                >
                  API
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTopTab("history")}
                  className={`h-10 shrink-0 border-b-2 px-3 text-sm font-semibold transition-colors ${
                    activeTopTab === "history"
                      ? "text-foreground border-foreground"
                      : "text-foreground/60 hover:text-foreground border-transparent"
                  }`}
                >
                  History
                </button>
              </div>
            )}
          </div>

          {currentTopTab === "playground" ? (
            <>
              <div className="grid min-h-0 flex-1 gap-4 md:gap-6 lg:grid-cols-12">
                <aside className="flex min-h-0 lg:col-span-6">
                  <div className="bg-surface flex h-full min-h-0 flex-col rounded-xs px-3 pt-3 pb-0 sm:px-4 sm:pt-4">
                    <ModelDetailInputForm
                      onRun={handleRunPrediction}
                      isRunning={isGenerating}
                    />
                  </div>
                </aside>

                <div className="lg:sticky lg:top-16 lg:col-span-6 lg:self-start">
                  <div className="bg-surface rounded-xs p-3 sm:p-4">
                    <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground text-sm font-semibold">
                          Result
                        </span>
                        <Badge
                          variant="outline"
                          className={`tracking-lg rounded-xs border-0 px-2 py-1 text-xs ${
                            resultStatus === "Completed"
                              ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                              : resultStatus === "Failed"
                                ? "bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300"
                                : resultStatus === "In process"
                                  ? "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
                                  : resultStatus === "Starting"
                                    ? "bg-foreground/8 text-foreground/65"
                                    : "bg-foreground/8 text-foreground/65"
                          }`}
                        >
                          {resultStatus}
                        </Badge>
                      </div>
                      <div className="text-foreground/70 flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-foreground/70 hover:bg-background rounded-xs"
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={handleRunPrediction}
                          disabled={isGenerating}
                          aria-label="Rerun"
                          className="text-foreground/70 hover:bg-background rounded-xs"
                        >
                          <RefreshCw className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-foreground/70 hover:bg-background rounded-xs"
                        >
                          <Expand className="size-4" />
                        </Button>

                        <div className="border-foreground/10 bg-muted inline-flex h-9 items-center rounded-xs border px-0.5 py-px">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setResultView("preview")}
                            className={`h-8 gap-1 rounded-xs px-2 py-2 text-xs leading-none has-[>svg]:px-2 ${
                              resultView === "preview"
                                ? "bg-background text-foreground hover:bg-background hover:text-foreground shadow-xs"
                                : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                            }`}
                          >
                            <ImageIcon className="size-3.5" />
                            Preview
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setResultView("json")}
                            className={`h-8 gap-1 rounded-xs px-2 py-2 text-xs leading-none has-[>svg]:px-2 ${
                              resultView === "json"
                                ? "bg-background text-foreground hover:bg-background hover:text-foreground shadow-xs"
                                : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                            }`}
                          >
                            <Braces className="size-3.5" />
                            JSON
                          </Button>
                        </div>
                      </div>
                    </div>

                    {resultView === "preview" ? (
                      <>
                        <div className="border-input relative mt-4 h-72 overflow-hidden rounded-xs border sm:h-80">
                          {isGenerating ? (
                            <div className="bg-background/95 absolute inset-0 flex items-center justify-center">
                              <Lottie
                                key={spinnerReplayKey}
                                animationData={spinner}
                                loop
                                autoplay
                                className="h-24 w-24"
                              />
                            </div>
                          ) : (
                            <Image
                              src={editorPreview}
                              alt="Generated preview placeholder"
                              fill
                              className="object-cover"
                            />
                          )}
                          <div className="from-background/0 to-background/40 absolute inset-0 bg-linear-to-t" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-input bg-muted/40 mt-4 overflow-hidden rounded-xs border p-4">
                          <ShikiCodeBlock
                            code={resultJsonPreview}
                            language="json"
                          />
                        </div>
                      </>
                    )}

                    <div className="border-border mt-4 border-t pt-4">
                      <label className="text-foreground/80 flex cursor-pointer items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={enableImageMagnification}
                          onChange={(event) =>
                            setEnableImageMagnification(event.target.checked)
                          }
                          className="border-foreground/20 accent-foreground size-4 rounded-xs border"
                        />
                        <span>Enable Image Magnification</span>
                      </label>
                    </div>

                    <div className="bg-background text-foreground mt-4 flex items-start gap-2 rounded-xs px-2 py-2 text-xs">
                      <Info className="mt-0.5 size-3.5 shrink-0" />
                      <p>
                        Your request will cost{" "}
                        <span className="text-brand font-semibold">$0.14</span>{" "}
                        per run.
                        <br />
                        For{" "}
                        <span className="text-brand font-semibold">
                          $10
                        </span>{" "}
                        you can run this model approximately{" "}
                        <span className="text-brand font-semibold">71</span>{" "}
                        times.
                      </p>
                    </div>

                    <div className="border-border mt-4 border-t pt-4">
                      <p className="text-foreground mb-3 text-sm">
                        One more thing:
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={controlButtonSmClass}
                        >
                          <WandSparkles className="size-3" />
                          Image Upscaler
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={controlButtonSmClass}
                        >
                          Remove Background
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={controlButtonSmClass}
                        >
                          Image Eraser
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={controlButtonSmClass}
                        >
                          <Eye className="size-3" />
                          Generate Video
                          <ChevronDown className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ExamplesSection />

              <section className="flex flex-col gap-4">
                <h2 className="text-foreground text-xl font-semibold">
                  Related Models
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedModels.map((model) => (
                    <Link key={model.name} href="#" className="block">
                      <Card className="group border-foreground/10 gap-0 overflow-hidden rounded-xs py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/25">
                        <CardContent className="flex items-center gap-2.5 p-2">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xs">
                            <Image
                              src={model.image}
                              alt={model.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground line-clamp-1 text-sm">
                              google/{model.name}
                            </p>
                            <p className="text-foreground/50 mt-0.5 text-xs leading-tight">
                              {model.type}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>

              <ReadmeSection />
            </>
          ) : currentTopTab === "api" ? (
            <section className="grid items-start gap-4 md:grid-cols-12 md:gap-8">
              <aside className="border-foreground/10 sticky top-14 hidden rounded-xs border p-3 md:col-span-3 md:block md:min-w-60">
                <nav className="-mx-3 space-y-1" aria-label="API docs toc">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToApiSection("api-overview");
                    }}
                    className={`block w-full border-l-2 py-1.5 pr-2 pl-4 text-left text-sm transition-colors ${
                      activeApiAnchor === "api-overview"
                        ? "text-foreground border-foreground font-semibold"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-xs border-transparent"
                    }`}
                  >
                    Google Nano-banana-2 Edit
                  </button>
                  {apiNavItems.map((item) => (
                    <div key={item.title} className="space-y-1 py-1">
                      <button
                        type="button"
                        onClick={() => {
                          scrollToApiSection(item.titleId);
                        }}
                        className={`block w-full border-l-2 py-1.5 pr-2 pl-4 text-left text-sm transition-colors ${
                          activeApiAnchor === item.titleId
                            ? "text-foreground border-foreground font-semibold"
                            : "text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-xs border-transparent"
                        }`}
                      >
                        {item.title}
                      </button>
                      <div className="space-y-0.5">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => {
                              scrollToApiSection(child.id);
                            }}
                            className={`block w-full border-l-2 py-1.5 pr-2 pl-7 text-left text-sm font-normal transition-colors ${
                              activeApiAnchor === child.id
                                ? "text-foreground border-foreground font-semibold"
                                : "text-foreground/65 hover:text-foreground hover:bg-foreground/5 rounded-xs border-transparent"
                            }`}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </aside>
              <article className="border-foreground/10 space-y-6 rounded-xs border p-4 md:col-span-9 md:p-6">
                <p className="text-foreground/70 text-sm">
                  Use one of our client libraries to get started quickly.
                </p>
                <div className="border-foreground/10 bg-muted inline-flex h-9 items-center rounded-xs border px-0.5 py-px">
                  <button
                    type="button"
                    onClick={() => setApiLanguage("http")}
                    className={`h-8 rounded-xs px-2 py-2 text-xs leading-none has-[>svg]:px-2 ${
                      apiLanguage === "http"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                    }`}
                  >
                    HTTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiLanguage("node")}
                    className={`h-8 rounded-xs px-2 py-2 text-xs leading-none has-[>svg]:px-2 ${
                      apiLanguage === "node"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                    }`}
                  >
                    Node.js
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiLanguage("python")}
                    className={`h-8 rounded-xs px-2 py-2 text-xs leading-none has-[>svg]:px-2 ${
                      apiLanguage === "python"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                    }`}
                  >
                    Python
                  </button>
                </div>
                <section id="api-overview" className="scroll-mt-28 space-y-3">
                  <h3 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
                    Google Nano-banana-2 Edit
                  </h3>
                  <p className="text-foreground/80 text-sm leading-7">
                    Google Nano Banana 2 Edit (Gemini 3.1 Flash Image) enables
                    advanced image editing with 4K-capable output, fast
                    iteration, and precise instruction following. Supports text
                    translation, localization within images, and maintains
                    subject consistency during edits. Ready-to-use REST
                    inference API, best performance, no coldstarts, affordable
                    pricing.
                  </p>
                </section>
                <section className="space-y-3">
                  <h4
                    id="api-calling-the-api"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    1. Calling the API
                  </h4>
                  <div
                    id="api-install-client"
                    className="scroll-mt-28 space-y-3"
                  >
                    <p className="text-foreground text-sm font-semibold">
                      Install the client
                    </p>
                    <div className="bg-muted/50 relative rounded-xs p-4">
                      <button
                        type="button"
                        className="text-foreground/60 hover:text-foreground absolute top-2 right-2"
                        aria-label="Copy install command"
                      >
                        <Copy className="size-4" />
                      </button>
                      <ShikiCodeBlock
                        code="npm install wavespeed"
                        language="bash"
                      />
                    </div>
                  </div>
                  <div
                    id="api-submit-request"
                    className="scroll-mt-28 space-y-3"
                  >
                    <p className="text-foreground text-sm font-semibold">
                      Submit a request
                    </p>
                    <p className="text-foreground/70 text-sm">
                      The client handles polling automatically and returns the
                      result when complete.
                    </p>
                    <div className="border-foreground/10 bg-muted inline-flex h-9 items-center rounded-xs border px-0.5 py-px">
                      <button
                        type="button"
                        onClick={() => setApiLanguage("http")}
                        className={`h-8 rounded-xs px-2 py-2 text-xs leading-none ${
                          apiLanguage === "http"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                        }`}
                      >
                        HTTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setApiLanguage("node")}
                        className={`h-8 rounded-xs px-2 py-2 text-xs leading-none ${
                          apiLanguage === "node"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                        }`}
                      >
                        Node.js
                      </button>
                      <button
                        type="button"
                        onClick={() => setApiLanguage("python")}
                        className={`h-8 rounded-xs px-2 py-2 text-xs leading-none ${
                          apiLanguage === "python"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
                        }`}
                      >
                        Python
                      </button>
                    </div>
                    <div className="bg-muted/50 relative rounded-xs p-4">
                      <button
                        type="button"
                        className="text-foreground/60 hover:text-foreground absolute top-2 right-2"
                        aria-label="Copy node sample"
                        onClick={() =>
                          handleCopyText(
                            apiLanguage === "http"
                              ? apiHttpCode
                              : apiLanguage === "python"
                                ? apiPythonCode
                                : apiNodeCode,
                            `${apiLanguage} snippet`,
                          )
                        }
                      >
                        <Copy className="size-4" />
                      </button>
                      <ShikiCodeBlock
                        code={
                          apiLanguage === "http"
                            ? apiHttpCode
                            : apiLanguage === "python"
                              ? apiPythonCode
                              : apiNodeCode
                        }
                        language={
                          apiLanguage === "http"
                            ? "bash"
                            : apiLanguage === "python"
                              ? "python"
                              : "javascript"
                        }
                        className="pr-8"
                      />
                    </div>
                  </div>
                </section>

                <section id="api-auth-key" className="scroll-mt-28 space-y-2">
                  <h4
                    id="api-authentication"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-xl font-semibold"
                  >
                    2. Authentication
                  </h4>
                  <p className="text-foreground/80 text-sm leading-7">
                    Generate an API key in your dashboard and pass it in the
                    `Authorization` header as `Bearer YOUR_API_KEY`.
                  </p>
                </section>

                <section
                  id="api-queue-submit"
                  className="scroll-mt-28 space-y-2"
                >
                  <h4
                    id="api-queue-webhooks"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-xl font-semibold"
                  >
                    3. Queue & Webhooks
                  </h4>
                  <p className="text-foreground/80 text-sm leading-7">
                    Request submission returns a task ID. Use polling or webhook
                    callbacks to consume final results in async workflows.
                  </p>
                </section>
                <section
                  id="api-queue-response"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Response
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    The response includes status, request metadata, and output
                    URLs when generation completes.
                  </p>
                </section>

                <section
                  id="api-webhook-headers"
                  className="scroll-mt-28 space-y-2"
                >
                  <h4
                    id="api-verifying-webhooks"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-xl font-semibold"
                  >
                    4. Verifying Webhooks
                  </h4>
                  <p className="text-foreground text-sm font-semibold">
                    Webhook headers
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Validate signature headers and timestamp before trusting
                    webhook payloads.
                  </p>
                </section>
                <section id="api-signature" className="scroll-mt-28 space-y-2">
                  <p className="text-foreground text-sm font-semibold">
                    Signature computation
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Compute HMAC with your webhook secret and compare against
                    the signature header.
                  </p>
                </section>
                <section
                  id="api-verify-example"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Verification example
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Reject mismatched signatures and stale timestamps to avoid
                    replay attacks.
                  </p>
                </section>

                <section
                  id="api-files-public-url"
                  className="scroll-mt-28 space-y-2"
                >
                  <h4
                    id="api-files"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-xl font-semibold"
                  >
                    5. Files
                  </h4>
                  <p className="text-foreground text-sm font-semibold">
                    Public URL
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Pass file URLs directly for hosted assets.
                  </p>
                </section>
                <section
                  id="api-files-base64"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Base64 data URI
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Use data URI payloads for local uploads when direct hosting
                    is unavailable.
                  </p>
                </section>
                <section
                  id="api-files-upload"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Upload API
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Upload first, then reference uploaded URLs in prediction
                    requests for stable processing.
                  </p>
                </section>

                <section
                  id="api-schema-input"
                  className="scroll-mt-28 space-y-2"
                >
                  <h4
                    id="api-schema"
                    className="text-foreground border-border scroll-mt-28 border-b pb-2 text-xl font-semibold"
                  >
                    6. Schema
                  </h4>
                  <p className="text-foreground text-sm font-semibold">Input</p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Required fields include `images` and `prompt`; optional
                    controls include `resolution`, `output_format`, and sync
                    mode.
                  </p>
                </section>
                <section
                  id="api-schema-example"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Example request
                  </p>
                  <div className="bg-muted/50 rounded-xs p-4">
                    <ShikiCodeBlock code={apiPayload} language="json" />
                  </div>
                </section>
                <section
                  id="api-schema-output"
                  className="scroll-mt-28 space-y-2"
                >
                  <p className="text-foreground text-sm font-semibold">
                    Output
                  </p>
                  <p className="text-foreground/80 text-sm leading-7">
                    Output includes status, task ID, and generated asset links.
                    When `enable_base64_output` is true, output data is
                    embedded.
                  </p>
                </section>
              </article>
            </section>
          ) : (
            <section>
              <div className="mb-4">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-foreground text-lg font-semibold">
                    Requests
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 self-start">
                    <div className="flex h-8 items-center gap-2 rounded-xs px-1.5">
                      <span className="text-foreground/80 text-xs">
                        Show API requests
                      </span>
                      <Switch checked disabled aria-label="Show API requests" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={controlButtonSmClass}
                    >
                      All models
                      <ChevronDown className="size-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={controlButtonSmClass}
                    >
                      Status
                      <ChevronDown className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
                <CardContent className="flex items-center gap-1.5 bg-amber-500/6 py-2.5 pr-4 pl-3 md:pr-5 dark:bg-amber-400/8">
                  <AlertCircle className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <p className="text-xs leading-[1.35] text-amber-900/70 dark:text-amber-200/80">
                    Your outputs are stored for <strong>7 days only</strong>.
                    Download and save important files before they expire.
                  </p>
                </CardContent>

                <div className="border-foreground/10 border-t">
                  <div
                    className={`border-foreground/10 overflow-hidden border-b transition-all duration-200 ease-out ${
                      selectedRequestCount > 0
                        ? "max-h-14 translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-2 px-2 py-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-foreground/60 ml-2 text-xs">
                        {selectedItemsLabel}
                      </span>
                      <div className="flex w-full items-center gap-2 sm:w-auto">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-foreground/10 h-8 flex-1 rounded-xs px-3 text-xs sm:flex-none"
                        >
                          <Download className="size-3.5" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 flex-1 rounded-xs px-3 text-xs sm:flex-none"
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <Table className="min-w-170">
                      <TableHeader>
                        <TableRow className="border-foreground/10 hover:bg-transparent">
                          <TableHead className="w-10 pr-2 pl-3 align-middle lg:pl-4">
                            <div className="flex items-center justify-center">
                              <button
                                type="button"
                                role="checkbox"
                                aria-label="Select all requests"
                                aria-checked={areAllRequestsSelected}
                                onClick={toggleSelectAllRequests}
                                className={getRequestCheckboxClassName(
                                  areAllRequestsSelected,
                                )}
                              >
                                {areAllRequestsSelected ? (
                                  <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="size-2.5"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M3.5 8.5L6.5 11.5L12.5 4.8"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : null}
                              </button>
                            </div>
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg w-20 px-3 lg:px-4">
                            Output
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg px-3 lg:px-4">
                            ID
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg px-3 lg:px-4">
                            Model
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg px-3 lg:px-4">
                            Status
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg px-3 lg:px-4">
                            Created
                          </TableHead>
                          <TableHead className="text-foreground/50 tracking-lg pr-3 pl-3 lg:pr-4 lg:pl-4">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockRequestHistory.map((item) => (
                          <TableRow
                            key={item.id}
                            className="border-foreground/10 hover:bg-surface"
                          >
                            <TableCell className="py-0 pr-2 pl-3 align-middle lg:pl-4">
                              <div className="flex items-center justify-center py-2">
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-label={`Select request ${item.id}`}
                                  aria-checked={selectedRequestIds.includes(
                                    item.id,
                                  )}
                                  onClick={() =>
                                    toggleRequestSelection(item.id)
                                  }
                                  className={getRequestCheckboxClassName(
                                    selectedRequestIds.includes(item.id),
                                  )}
                                >
                                  {selectedRequestIds.includes(item.id) ? (
                                    <svg
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      className="size-2.5"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M3.5 8.5L6.5 11.5L12.5 4.8"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : null}
                                </button>
                              </div>
                            </TableCell>
                            <TableCell className="px-3 lg:px-4">
                              <div className="bg-surface relative size-12 overflow-hidden rounded-xs">
                                <Image
                                  src={item.preview}
                                  alt={`${item.model} output preview`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="px-3 lg:px-4">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => openRequestDetail(item.id)}
                                  className="text-foreground/70 hover:text-foreground cursor-pointer font-mono text-sm underline-offset-2 hover:underline"
                                >
                                  {item.id}
                                </button>
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Copy request ID"
                                  onClick={() =>
                                    handleCopyText(item.id, "Request ID")
                                  }
                                  className="text-foreground/60 hover:text-foreground"
                                >
                                  <Copy className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="px-3 lg:px-4">
                              {item.model}
                            </TableCell>
                            <TableCell className="px-3 lg:px-4">
                              <Badge
                                variant="outline"
                                className={`tracking-lg rounded-xs border-0 px-2 py-1 text-xs ${
                                  item.status === "Succeeded"
                                    ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                                    : item.status === "Running"
                                      ? "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                                      : "bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300"
                                }`}
                              >
                                {item.status === "Running" ? (
                                  <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-current" />
                                ) : null}
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-foreground/70 px-3 text-sm lg:px-4">
                              {item.createdAt}
                            </TableCell>
                            <TableCell className="pr-3 pl-3 lg:pr-4 lg:pl-4">
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Open request detail"
                                  onClick={() => openRequestDetail(item.id)}
                                  className="text-foreground/60 hover:text-foreground"
                                >
                                  <ExternalLink className="size-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Download output"
                                  className="text-foreground/60 hover:text-foreground"
                                >
                                  <Download className="size-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Delete request"
                                  className="text-foreground/60 hover:text-red-500"
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Card>
            </section>
          )}
        </div>
      </section>
      {openedRequest && openedRequestDetail ? (
        <RequestDetailDialog
          open={openedRequestId !== null}
          requestId={openedRequest.id}
          requestIndex={openedRequestIndex}
          totalRequests={mockRequestHistory.length}
          hasPrevRequest={hasPrevRequest}
          hasNextRequest={hasNextRequest}
          previewSrc={openedRequest.preview}
          onOpenChange={(open) => {
            if (!open) {
              setIsPromptExpanded(false);
              setOpenedRequestId(null);
            }
          }}
          onClose={() => {
            setIsPromptExpanded(false);
            setIsDetailSectionExpanded(true);
            setIsInputSectionExpanded(true);
            setIsOutputSectionExpanded(true);
            setIsResultSectionExpanded(true);
            setOpenedRequestId(null);
          }}
          onPrevRequest={openPrevRequestDetail}
          onNextRequest={openNextRequestDetail}
          warningBanner={
            <div className="flex items-center gap-1.5 bg-amber-500/6 py-2.5 pr-4 pl-3 dark:bg-amber-400/8">
              <AlertCircle className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-xs leading-[1.35] text-amber-900/70 dark:text-amber-200/80">
                Your outputs are stored for <strong>7 days only</strong>.
                Download and save important files before they expire.
              </p>
            </div>
          }
          footer={
            <footer className="border-foreground/10 bg-background border-t p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  type="button"
                  className="bg-foreground text-background hover:bg-foreground/90 h-8 rounded-xs px-3 text-xs font-bold"
                >
                  <Pencil className="size-3.5" />
                  Customize
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-xs px-3 text-xs font-bold"
                >
                  <ExternalLink className="size-3.5" />
                  Share
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-xs px-3 text-xs font-bold"
                >
                  <Download className="size-3.5" />
                  Download
                </Button>
              </div>
            </footer>
          }
        >
          <div className="space-y-0">
            <section>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2.5 text-left"
                onClick={() => setIsDetailSectionExpanded((prev) => !prev)}
                aria-expanded={isDetailSectionExpanded}
              >
                <p className="text-sm font-bold">Detail</p>
                <ChevronDown
                  className={`text-foreground/65 size-3.5 transition-transform ${
                    isDetailSectionExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDetailSectionExpanded ? (
                <div className="space-y-3 px-4 pt-2 pb-4">
                  <div className="py-2">
                    {isPromptExpanded ? (
                      <p className="text-foreground/85 text-sm leading-6">
                        {openedRequestDetail.prompt}
                        {openedRequestDetail.prompt.length > 120 ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              onClick={() =>
                                setIsPromptExpanded((prev) => !prev)
                              }
                              className="text-foreground/80 hover:text-foreground inline text-sm font-bold underline underline-offset-2"
                            >
                              Collapse
                            </button>
                          </>
                        ) : null}
                      </p>
                    ) : (
                      <p className="text-foreground/85 text-sm leading-6">
                        {openedRequestDetail.prompt.length > 180
                          ? `${openedRequestDetail.prompt
                              .slice(0, 180)
                              .trimEnd()}...`
                          : openedRequestDetail.prompt}
                        {openedRequestDetail.prompt.length > 120 ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              onClick={() =>
                                setIsPromptExpanded((prev) => !prev)
                              }
                              className="text-foreground/80 hover:text-foreground inline text-sm font-bold underline underline-offset-2"
                            >
                              See all
                            </button>
                          </>
                        ) : null}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">Model</span>
                      <span className="text-foreground/85 text-right text-sm font-bold">
                        {openedRequest.model}
                      </span>
                    </div>
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">
                        Request ID
                      </span>
                      <span className="text-foreground/85 text-right font-mono text-sm font-bold break-all">
                        {openedRequest.id}
                      </span>
                    </div>
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">Status</span>
                      <span className="text-foreground/85 text-sm font-bold">
                        {openedRequestDetail.status}
                      </span>
                    </div>
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">
                        Duration
                      </span>
                      <span className="text-foreground/85 text-sm font-bold">
                        {openedRequestDetail.duration}
                      </span>
                    </div>
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">
                        Time Taken
                      </span>
                      <span className="text-foreground/85 text-sm font-bold">
                        {openedRequestDetail.timeTaken}
                      </span>
                    </div>
                    <div className="flex min-h-8 items-center justify-between gap-3 py-1 text-sm">
                      <span className="text-foreground/55 text-sm">Cost</span>
                      <span className="text-foreground/85 text-sm font-bold">
                        {openedRequestDetail.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
            <section className="border-foreground/10 border-t">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2.5 text-left"
                onClick={() => setIsInputSectionExpanded((prev) => !prev)}
                aria-expanded={isInputSectionExpanded}
              >
                <p className="text-sm font-bold">Input</p>
                <ChevronDown
                  className={`text-foreground/65 size-3.5 transition-transform ${
                    isInputSectionExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isInputSectionExpanded ? (
                <div className="px-4 pt-1 pb-4">
                  <div className="bg-surface relative max-h-56 overflow-auto rounded-xs p-3 pr-9">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Copy input"
                      onClick={() =>
                        handleCopyText(requestDetailInputCode, "Input JSON")
                      }
                      className="text-foreground/60 hover:text-foreground absolute top-1.5 right-1.5 h-7 w-7 rounded-xs"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <ShikiCodeBlock
                      code={requestDetailInputCode}
                      language="json"
                    />
                  </div>
                </div>
              ) : null}
            </section>
            <section className="border-foreground/10 border-t">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2.5 text-left"
                onClick={() => setIsOutputSectionExpanded((prev) => !prev)}
                aria-expanded={isOutputSectionExpanded}
              >
                <p className="text-sm font-bold">Output</p>
                <ChevronDown
                  className={`text-foreground/65 size-3.5 transition-transform ${
                    isOutputSectionExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOutputSectionExpanded ? (
                <div className="px-4 pt-1 pb-4">
                  <div className="bg-surface relative max-h-48 overflow-auto rounded-xs p-3 pr-9">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Copy output"
                      onClick={() =>
                        handleCopyText(requestDetailOutputCode, "Output JSON")
                      }
                      className="text-foreground/60 hover:text-foreground absolute top-1.5 right-1.5 h-7 w-7 rounded-xs"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <ShikiCodeBlock
                      code={requestDetailOutputCode}
                      language="json"
                    />
                  </div>
                </div>
              ) : null}
            </section>
            <section className="border-foreground/10 border-t">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2.5 text-left"
                onClick={() => setIsResultSectionExpanded((prev) => !prev)}
                aria-expanded={isResultSectionExpanded}
              >
                <p className="text-sm font-bold">Result</p>
                <ChevronDown
                  className={`text-foreground/65 size-3.5 transition-transform ${
                    isResultSectionExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isResultSectionExpanded ? (
                <div className="px-4 pt-1 pb-4">
                  <div className="bg-surface relative max-h-56 overflow-auto rounded-xs p-3 pr-9">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Copy result"
                      onClick={() =>
                        handleCopyText(requestDetailResultCode, "Result JSON")
                      }
                      className="text-foreground/60 hover:text-foreground absolute top-1.5 right-1.5 h-7 w-7 rounded-xs"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <ShikiCodeBlock
                      code={requestDetailResultCode}
                      language="json"
                    />
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </RequestDetailDialog>
      ) : null}
    </>
  );
}

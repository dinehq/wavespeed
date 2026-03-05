"use client";

import { format, subDays } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DateRange } from "react-day-picker";
import {
  AlertCircle,
  Activity,
  ArrowRight,
  CalendarIcon,
  ChevronDown,
  Check,
  Copy,
  DollarSign,
  Download,
  EyeOff,
  ExternalLink,
  LayoutGrid,
  Layers,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const setupTasks = [
  {
    label: "Create an account",
    action: "Add now",
    tone: "primary",
    done: true,
    href: "/dashboard?tab=Settings",
  },
  {
    label: "Add credits",
    action: "Add credits",
    tone: "primary",
    done: false,
    href: "/dashboard?tab=Billing",
  },
  {
    label: "Generate your first media",
    action: "Start",
    tone: "secondary",
    done: false,
    href: "/dashboard?tab=Explore",
  },
];

const apiTasks = [
  { label: "Get an API key", action: "Get", href: "/dashboard?tab=API Keys" },
  { label: "Quick start guide", action: "Check", href: "/dashboard?tab=Serverless" },
  { label: "How to use in Python SDK", action: "Check", href: "/dashboard?tab=LLM" },
  { label: "Check documentation", action: "Check", href: "/dashboard?tab=Settings" },
];

const createWithAiTasks = [
  { label: "Desktop app", action: "Download", href: "/dashboard?tab=Explore" },
  { label: "Studio", action: "Open", href: "/dashboard?tab=Explore" },
  { label: "Affiliate program", action: "Join", href: "/dashboard?tab=Settings" },
  { label: "Become a collaborator", action: "Apply", href: "/dashboard?tab=Settings" },
  { label: "Get inspiration", action: "Explore", href: "/dashboard?tab=Explore" },
  { label: "API Keys", action: "Manage", href: "/dashboard?tab=API Keys" },
];

type DashboardIntent = "create-with-ai" | "build-with-api";

const gettingStartedContentByIntent: Record<
  DashboardIntent,
  {
    title: string;
    description: string;
    showIndex: boolean;
    tasks: Array<{ label: string; action: string; href: string }>;
  }
> = {
  "create-with-ai": {
    title: "Quick start",
    description: "Quick access to essential features and resources.",
    showIndex: false,
    tasks: createWithAiTasks,
  },
  "build-with-api": {
    title: "Create Something with API",
    description: "Follow these steps to get the most out of your experience.",
    showIndex: true,
    tasks: apiTasks,
  },
};

const modelCards = [
  {
    name: "flux-pro/kontext",
    type: "Text to image",
    image: thumb1,
  },
  {
    name: "wan-2.6/t2v",
    type: "Text to video",
    image: thumb2,
  },
  { name: "veo-3.1", type: "Video generation", image: thumb3 },
  {
    name: "gpt-image-1",
    type: "Image generation",
    image: thumb4,
  },
  {
    name: "kling-v2.6",
    type: "Text to video",
    image: thumb5,
  },
  {
    name: "pixverse-v5.6",
    type: "Video tools",
    image: thumb6,
  },
  {
    name: "runway/gen4",
    type: "Video generation",
    image: thumb3,
  },
  {
    name: "stable-diffusion-xl",
    type: "Image generation",
    image: thumb4,
  },
  {
    name: "luma/dream-machine",
    type: "Text to video",
    image: thumb2,
  },
  {
    name: "minimax/hailuo-02",
    type: "Video generation",
    image: thumb5,
  },
  {
    name: "ideogram-v3",
    type: "Image generation",
    image: thumb1,
  },
  {
    name: "pika-2.2",
    type: "Video tools",
    image: thumb6,
  },
];

const favoriteModelCards = [modelCards[0], modelCards[2], modelCards[3]];

const requests = [
  {
    id: "1d3636433f4c40d1865659ebad739a53",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb1,
    createdAt: "2026-03-03 19:30",
  },
  {
    id: "f94b29c15d4a4677b0f4a128ec7d8a6e",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Processing",
    outputPreview: thumb2,
    createdAt: "2026-03-03 19:27",
  },
  {
    id: "08ac31bf8d5c4b9f943a2d6e7f10c4d2",
    model: "veo-3.1",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb3,
    createdAt: "2026-03-03 18:54",
  },
  {
    id: "a2f78d49b81e4c6fa57d230e91cb6f34",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "4 images",
    outputPreview: thumb4,
    createdAt: "2026-03-03 18:32",
  },
  {
    id: "6b9e20fd4c7a4135a8d1f26e90bc34a1",
    model: "kling-v2.6",
    status: "Running",
    output: "Queued",
    outputPreview: thumb5,
    createdAt: "2026-03-03 18:10",
  },
  {
    id: "de39a741b8f24c96a17e3c5d0b2f8a64",
    model: "pixverse-v5.6",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb6,
    createdAt: "2026-03-03 17:45",
  },
  {
    id: "73ce5f2a9b104dd48f61a3e27c9d5b80",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "2 images",
    outputPreview: thumb1,
    createdAt: "2026-03-03 17:21",
  },
  {
    id: "c4519e2d7a8f4b36b2d90f17ec6a3d85",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Rendering",
    outputPreview: thumb2,
    createdAt: "2026-03-03 16:58",
  },
  {
    id: "4ea2d0c98f7b4631ab56d3e71f2c84a9",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb4,
    createdAt: "2026-03-03 16:42",
  },
  {
    id: "9bf81c34d2a64e77bc0591f8e3a6d420",
    model: "veo-3.1",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb3,
    createdAt: "2026-03-03 16:15",
  },
];

const usagePerModel = [
  { model: "google/nano-banana-2/text-to-image", requests: 7, cost: 0.142 },
  { model: "flux-pro/kontext", requests: 4, cost: 0.07 },
  { model: "wan-2.6/t2v", requests: 3, cost: 0.047 },
];

const usageBreakdownModelKeys = [
  "nanoBanana",
  "fluxKontext",
  "wanT2v",
] as const;
const usageBreakdown = [
  { date: "02/25", nanoBanana: 0.012, fluxKontext: 0.004, wanT2v: 0.002 },
  { date: "02/26", nanoBanana: 0.016, fluxKontext: 0.007, wanT2v: 0.004 },
  { date: "02/27", nanoBanana: 0.009, fluxKontext: 0.004, wanT2v: 0.002 },
  { date: "02/28", nanoBanana: 0.022, fluxKontext: 0.011, wanT2v: 0.008 },
  { date: "03/01", nanoBanana: 0.03, fluxKontext: 0.016, wanT2v: 0.012 },
  { date: "03/02", nanoBanana: 0.019, fluxKontext: 0.01, wanT2v: 0.007 },
  { date: "03/03", nanoBanana: 0.034, fluxKontext: 0.018, wanT2v: 0.012 },
];
const usageBreakdownChartConfig = {
  nanoBanana: {
    label: "google/nano-banana-2/text-to-image",
    color: "#5a56d6",
  },
  fluxKontext: {
    label: "flux-pro/kontext",
    color: "#3f74ff",
  },
  wanT2v: {
    label: "wan-2.6/t2v",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

const usageTabSummaryCards = [
  { label: "Total Cost", value: "$0.0940", icon: DollarSign },
  { label: "Total Requests", value: "2", icon: Activity },
  { label: "Models Used", value: "2", icon: Layers },
];

const usageTabPerModel = [
  {
    model: "google/nano-banana-2/text-to-image",
    requestCount: 1,
    avgCost: 0.064,
    cost: 0.064,
  },
  {
    model: "wavespeed-ai/qwen-image-2.0/edit",
    requestCount: 1,
    avgCost: 0.03,
    cost: 0.03,
  },
];

const usageTabDailyUsage = [
  { date: "2026-03-04", cost: 0.03, requestCount: 1, modelsUsed: 1 },
  { date: "2026-03-03", cost: 0.064, requestCount: 1, modelsUsed: 1 },
];

const usageTabBreakdown = [
  { date: "03/01", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/03", nanoBanana: 0.064, qwenEdit: 0 },
  { date: "03/04", nanoBanana: 0, qwenEdit: 0.03 },
  { date: "03/05", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/07", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/09", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/11", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/13", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/15", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/17", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/19", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/21", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/23", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/25", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/27", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/29", nanoBanana: 0, qwenEdit: 0 },
  { date: "03/31", nanoBanana: 0, qwenEdit: 0 },
];

const usageTabBreakdownChartConfig = {
  nanoBanana: {
    label: "google/nano-banana-2/text-to-image",
    color: "#5a56d6",
  },
  qwenEdit: {
    label: "wavespeed-ai/qwen-image-2.0/edit",
    color: "#3f74ff",
  },
} satisfies ChartConfig;

const dashboardTabs = [
  "Dashboard",
  "Explore",
  "Usage",
  "History",
  "LLM",
  "Serverless",
  "API Keys",
  "Billing",
  "Settings",
];

const topUpAmountOptions = [
  {
    amount: "$5",
    throughput: "50 images or 5 videos per minute",
    benefit: "No concurrent tasks",
  },
  {
    amount: "$10",
    throughput: "50 images or 5 videos per minute",
    benefit: "Gain 3 concurrent tasks",
  },
  {
    amount: "$20",
    throughput: "100 images or 10 videos per minute",
    benefit: "Gain 6 concurrent tasks",
  },
  {
    amount: "$50",
    throughput: "200 images or 20 videos per minute",
    benefit: "Gain 12 concurrent tasks",
  },
  {
    amount: "$100",
    throughput: "500 images or 60 videos per minute",
    benefit: "Gain 100 concurrent tasks",
  },
  {
    amount: "$1,000",
    throughput: "3,000 images or 600 videos per minute",
    benefit: "Gain 2,000 concurrent tasks",
  },
  {
    amount: "$10,000",
    throughput: "VIP plan with custom throughput",
    benefit: "Contact us for concurrency setup",
  },
  {
    amount: "Custom",
    throughput: "Tailored usage package",
    benefit: "Minimum $5",
  },
];

const billingTopUpRecords = [
  {
    description: "Credit Card",
    date: "03/03/2026, 10:56 PM",
    amount: "+$5.25",
  },
];

const apiKeyRecords = [
  {
    id: "key-1",
    name: "Test",
    key: "81931fbd464c3c57190d0d1484bc4a013ffd054f1ae538d5d70dda85adfa0ef",
    createdAt: "03/05/2026",
    status: "Active",
  },
];

export function DashboardMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [usageQuickRange, setUsageQuickRange] = useState<
    "1d" | "7d" | "30d" | null
  >(null);
  const [usageDateRange, setUsageDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 2, 1),
    to: new Date(2026, 2, 3),
  });
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([]);
  const totalRequests = usagePerModel.reduce(
    (sum, item) => sum + item.requests,
    0,
  );
  const totalCost = usagePerModel.reduce((sum, item) => sum + item.cost, 0);
  const usageBreakdownMax = Math.max(
    ...usageBreakdown.map((item) =>
      usageBreakdownModelKeys.reduce((sum, key) => sum + item[key], 0),
    ),
    0.08,
  );
  const selectedRequestCount = selectedRequestIds.length;
  const areAllRequestsSelected =
    requests.length > 0 && selectedRequestCount === requests.length;
  const selectedItemsLabel = `${selectedRequestCount} ${
    selectedRequestCount === 1 ? "item" : "items"
  } selected`;
  const requestModelOptions = Array.from(
    new Set(requests.map((request) => request.model)),
  );
  const [isModelFilterOpen, setIsModelFilterOpen] = useState(false);
  const [modelFilterValue, setModelFilterValue] = useState("all-models");
  const [modelFilterQuery, setModelFilterQuery] = useState("");
  const [isIdSearchOpen, setIsIdSearchOpen] = useState(false);
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [showApiRequests, setShowApiRequests] = useState(true);
  const [activeMainTab, setActiveMainTab] = useState("Dashboard");
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState("$10");
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [dashboardIntent, setDashboardIntent] =
    useState<DashboardIntent>("build-with-api");
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const requestedTab = searchParams.get("tab");
  const resolvedMainTab =
    requestedTab && dashboardTabs.includes(requestedTab)
      ? requestedTab
      : activeMainTab;
  const currentGettingStartedContent =
    gettingStartedContentByIntent[dashboardIntent];
  const navigateFromGettingStarted = (href: string) => {
    router.push(href);
  };
  const filteredModelOptions = requestModelOptions.filter((model) =>
    model.toLowerCase().includes(modelFilterQuery.toLowerCase()),
  );
  const usageDateRangeLabel = usageDateRange?.from
    ? usageDateRange.to
      ? `${format(usageDateRange.from, "MMM dd")} - ${format(
          usageDateRange.to,
          "MMM dd",
        )}`
      : format(usageDateRange.from, "MMM dd")
    : "Pick dates";
  const applyUsageQuickRange = (days: number, range: "1d" | "7d" | "30d") => {
    const endDate =
      usageDateRange?.to ?? usageDateRange?.from ?? new Date(2026, 2, 3);
    const startDate = subDays(endDate, days - 1);
    setUsageDateRange({ from: startDate, to: endDate });
    setUsageQuickRange(range);
  };
  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequestIds((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId],
    );
  };
  const toggleSelectAllRequests = () => {
    setSelectedRequestIds((prev) =>
      prev.length === requests.length ? [] : requests.map((request) => request.id),
    );
  };
  const copyRequestId = async (requestId: string) => {
    try {
      await navigator.clipboard.writeText(requestId);
    } catch {
      // Clipboard may be unavailable in unsupported browsers.
    }
  };
  const copyApiKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
    } catch {
      // Clipboard may be unavailable in unsupported browsers.
    }
  };
  const openRequestDetail = (requestId: string) => {
    router.push(`/dashboard/requests/${requestId}`);
  };
  const renderRequestsSection = () => (
    <section>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
            Requests
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-xs px-1.5">
              <span className="text-foreground/80 text-[11px]">
                Show API requests
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={showApiRequests}
                onClick={() => setShowApiRequests((prev) => !prev)}
                className={`relative inline-flex h-4.5 w-8 items-center rounded-full p-0.5 transition-colors ${
                  showApiRequests ? "bg-foreground/25" : "bg-foreground/15"
                }`}
              >
                <span
                  className={`block size-3.5 rounded-full transition-all ${
                    showApiRequests
                      ? "bg-foreground ml-auto"
                      : "bg-foreground/55 ml-0"
                  }`}
                />
              </button>
            </div>
            <Popover
              open={isModelFilterOpen}
              onOpenChange={(open) => {
                setIsModelFilterOpen(open);
                if (!open) {
                  setModelFilterQuery("");
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-foreground/10 text-foreground/80 bg-background hover:bg-foreground/5 h-8 min-w-[104px] justify-between rounded-xs px-2 text-[11px] tracking-[0.8px] shadow-xs"
                >
                  <span
                    className={`truncate ${
                      modelFilterValue === "all-models"
                        ? "text-foreground/60"
                        : "text-foreground/80"
                    }`}
                  >
                    {modelFilterValue === "all-models"
                      ? "All models"
                      : modelFilterValue}
                  </span>
                  <ChevronDown className="text-foreground/50 size-3.5 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="bg-background w-[248px] rounded-xs border-0 p-2 shadow-sm"
                align="end"
              >
                <Input
                  value={modelFilterQuery}
                  onChange={(event) => setModelFilterQuery(event.target.value)}
                  placeholder="Search models..."
                  className="border-foreground/10 h-8 rounded-xs text-xs"
                />
                <div className="mt-2 max-h-56 space-y-1 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setModelFilterValue("all-models");
                      setIsModelFilterOpen(false);
                      setModelFilterQuery("");
                    }}
                    className={`hover:bg-foreground/5 flex w-full items-center rounded-xs px-2 py-1.5 text-left text-xs ${
                      modelFilterValue === "all-models"
                        ? "bg-foreground/5 text-foreground"
                        : "text-foreground/80"
                    }`}
                  >
                    All models
                  </button>
                  {filteredModelOptions.length > 0 ? (
                    filteredModelOptions.map((model) => (
                      <button
                        key={model}
                        type="button"
                        onClick={() => {
                          setModelFilterValue(model);
                          setIsModelFilterOpen(false);
                          setModelFilterQuery("");
                        }}
                        className={`hover:bg-foreground/5 flex w-full items-center rounded-xs px-2 py-1.5 text-left text-xs ${
                          modelFilterValue === model
                            ? "bg-foreground/5 text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {model}
                      </button>
                    ))
                  ) : (
                    <p className="text-foreground/50 px-2 py-1.5 text-xs">
                      No models found
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Select>
              <SelectTrigger
                size="sm"
                className="border-foreground/10 text-foreground/80 bg-background hover:bg-foreground/5 min-w-[92px] rounded-xs text-[11px] tracking-[0.8px] shadow-xs"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-background rounded-xs border-0 shadow-sm">
                <SelectItem value="all" className="rounded-xs text-xs">
                  All
                </SelectItem>
                <SelectItem value="succeeded" className="rounded-xs text-xs">
                  Succeeded
                </SelectItem>
                <SelectItem value="running" className="rounded-xs text-xs">
                  Running
                </SelectItem>
              </SelectContent>
            </Select>
            {isIdSearchOpen ? (
              <div className="flex items-center gap-1.5">
                <Input
                  value={idSearchQuery}
                  onChange={(event) => setIdSearchQuery(event.target.value)}
                  autoFocus
                  placeholder="Search ID"
                  className="border-foreground/10 h-8 w-[120px] rounded-xs text-[11px] md:text-[11px] tracking-[0.8px] shadow-xs"
                />
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Close ID search"
                  onClick={() => {
                    setIsIdSearchOpen(false);
                    setIdSearchQuery("");
                  }}
                  className="border-foreground/10 text-foreground/70 bg-background hover:bg-foreground/5 rounded-xs shadow-xs"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Search by ID"
                onClick={() => setIsIdSearchOpen(true)}
                className="border-foreground/10 text-foreground/70 bg-background hover:bg-foreground/5 rounded-xs shadow-xs"
              >
                <Search className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
        <CardContent className="bg-surface/40 flex items-center gap-1.5 pl-4 pr-4 py-2.5 md:pr-5">
          <AlertCircle className="text-foreground/60 size-3.5 shrink-0" />
          <div>
            <p className="text-foreground/70 text-xs leading-[1.35]">
              Your outputs are stored for 7 days only. Download and save
              important files before they expire.
            </p>
          </div>
        </CardContent>

        <div className="border-foreground/10 border-t">
          {selectedRequestCount > 0 ? (
            <div className="border-foreground/10 flex items-center justify-between border-b px-2 py-2">
              <span className="text-foreground/60 text-[11px] tracking-[0.3px]">
                {selectedItemsLabel}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-foreground/10 h-8 rounded-xs px-2.5 text-[11px]"
                >
                  <Download className="size-3.5" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 rounded-xs px-2.5 text-[11px]"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ) : null}
          <div className="space-y-2 p-2 md:hidden">
            {requests.map((request) => (
              <Card
                key={`mobile-${request.id}`}
                className="border-foreground/10 gap-0 rounded-xs py-3 shadow-none"
              >
                <CardContent className="px-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openRequestDetail(request.id)}
                          className="text-foreground hover:text-[#3f74ff] font-mono text-xs underline-offset-2 hover:underline"
                        >
                          {request.id}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Copy request ID"
                          onClick={() => copyRequestId(request.id)}
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <Copy className="size-3.5" />
                        </Button>
                      </div>
                      <p className="text-foreground mt-1 text-sm">
                        {request.model}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`rounded-xs border-0 px-2 py-1 text-[10px] tracking-[1px] ${
                        request.status === "Succeeded"
                          ? "bg-green/20 text-foreground"
                          : "bg-surface text-foreground/70"
                      }`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="text-foreground/70 flex items-center gap-2">
                      <div className="border-foreground/10 bg-surface relative size-9 overflow-hidden rounded-[3px] border">
                        <Image
                          src={request.outputPreview}
                          alt={`${request.model} output`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-foreground/60">
                      {request.createdAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden md:block">
            <Table className="min-w-[680px]">
              <TableHeader>
                <TableRow className="border-foreground/10 hover:bg-transparent">
                  <TableHead className="w-10 text-center">
                    <input
                      type="checkbox"
                      checked={areAllRequestsSelected}
                      onChange={toggleSelectAllRequests}
                      className="border-foreground/30 size-3.5 rounded-[2px] border accent-[#3f74ff]"
                    />
                  </TableHead>
                  <TableHead className="text-foreground/50 w-20 text-[10px] tracking-[1px]">
                    Output
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    ID
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Model
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Status
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Created
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="border-foreground/10 hover:bg-surface"
                  >
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedRequestIds.includes(request.id)}
                        onChange={() => toggleRequestSelection(request.id)}
                        className="border-foreground/30 size-3.5 rounded-[2px] border accent-[#3f74ff]"
                      />
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="border-foreground/10 bg-surface relative size-9 overflow-hidden rounded-[3px] border">
                        <Image
                          src={request.outputPreview}
                          alt={`${request.model} output preview`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openRequestDetail(request.id)}
                          className="text-foreground hover:text-[#3f74ff] font-mono underline-offset-2 hover:underline"
                        >
                          {request.id}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Copy request ID"
                          onClick={() => copyRequestId(request.id)}
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <Copy className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{request.model}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-xs border-0 px-2 py-1 text-[10px] tracking-[1px] ${
                          request.status === "Succeeded"
                            ? "bg-green/20 text-foreground"
                            : "bg-surface text-foreground/70"
                        }`}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{request.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <ExternalLink className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <Download className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
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
  );
  return (
    <section className="bg-background pb-6 md:pb-8">
      <div className="border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 border-b border-t px-4 backdrop-blur">
        <div className="w-full">
          <Tabs
            value={resolvedMainTab}
            onValueChange={setActiveMainTab}
            className="w-full"
          >
            <TabsList
              variant="line"
              className="w-full justify-start gap-2 overflow-x-auto rounded-none px-0 group-data-[orientation=horizontal]/tabs:h-12"
            >
              {dashboardTabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="h-12 flex-none rounded-none px-2 py-0 text-xs tracking-[1.2px] whitespace-nowrap after:bg-transparent data-[state=active]:text-[#3f74ff] data-[state=active]:after:bg-[#3f74ff]"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {resolvedMainTab === "Dashboard" ? (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <div className="border-foreground/10 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
              Dashboard
            </h1>
            <button
              type="button"
              onClick={() => setShowGettingStarted((prev) => !prev)}
              className="text-subtle hover:text-foreground mt-2 cursor-pointer text-xs transition-colors"
            >
              {showGettingStarted
                ? "Hide getting started guide"
                : "Show getting started guide"}
            </button>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-foreground text-sm">I want to</span>
            <Select
              value={dashboardIntent}
              onValueChange={(value) =>
                setDashboardIntent(value as DashboardIntent)
              }
            >
              <SelectTrigger
                size="sm"
                className="border-foreground/10 bg-surface/40 text-foreground/80 hover:bg-foreground/5 h-7 justify-start gap-1 rounded-xs pl-2.5 pr-1.5 text-[11px] shadow-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background rounded-xs border-0 shadow-sm">
                <SelectItem
                  value="create-with-ai"
                  className="rounded-xs text-sm"
                >
                  create with AI
                </SelectItem>
                <SelectItem
                  value="build-with-api"
                  className="rounded-xs text-sm"
                >
                  build app with API
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showGettingStarted ? (
          <article className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                Getting started
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGettingStarted(false)}
                className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 rounded-xs text-[11px] tracking-[0.8px] shadow-xs"
              >
                Don&apos;t show this
              </Button>
            </div>
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="p-0">
                <div className="divide-foreground/10 grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
                <section className="flex h-full flex-col px-4 py-4 md:min-h-[320px] md:px-5 md:py-5">
                  <div className="mb-4">
                    <CardTitle className="text-foreground text-base tracking-[0.3px]">
                      Welcome to WaveSpeed
                    </CardTitle>
                    <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                      Complete setup to unlock the full speed of your account.
                    </CardDescription>
                  </div>
                  <ul className="divide-foreground/5 mt-auto divide-y">
                    {setupTasks.map((task) => (
                      <li
                        key={task.label}
                        className="flex h-10 items-center justify-between gap-2"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                              task.done
                                ? "bg-[#16a34a] text-white"
                                : "bg-foreground/20 text-transparent"
                            }`}
                          >
                            <Check className="size-3" />
                          </span>
                          <span
                            className={`text-sm ${
                              task.done
                                ? "text-foreground/50 line-through"
                                : "text-foreground"
                            }`}
                          >
                            {task.label}
                          </span>
                        </div>
                        {!task.done ? (
                          <Button
                            size="xs"
                            onClick={() => navigateFromGettingStarted(task.href)}
                            className={`shrink-0 rounded-xs text-[10px] tracking-[1px] ${
                              task.tone === "primary"
                                ? "bg-foreground text-background hover:bg-foreground/80"
                                : "bg-surface text-foreground hover:bg-foreground/10 border-0"
                            }`}
                          >
                            {task.action}
                          </Button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="flex h-full flex-col px-4 py-4 md:min-h-[320px] md:px-5 md:py-5">
                  <div className="mb-4">
                    <CardTitle className="text-foreground text-base tracking-[0.3px]">
                      {currentGettingStartedContent.title}
                    </CardTitle>
                    <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                      {currentGettingStartedContent.description}
                    </CardDescription>
                  </div>
                  <ul className="divide-foreground/5 mt-auto divide-y">
                    {currentGettingStartedContent.tasks.map((task, index) => (
                      <li key={task.label}>
                        <button
                          type="button"
                          onClick={() => navigateFromGettingStarted(task.href)}
                          className="hover:bg-foreground/5 group -mx-2 flex h-10 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 transition-colors"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            {currentGettingStartedContent.showIndex ? (
                              <span className="text-foreground/50 w-5 shrink-0 text-[10px] tracking-[1px]">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            ) : null}
                            <span className="text-foreground block min-w-0 flex-1 truncate text-left text-sm">
                              {task.label}
                            </span>
                          </div>
                          <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center gap-1 text-[11px]">
                            <span className="tracking-[0.5px]">{task.action}</span>
                            <ArrowRight className="size-3.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="flex h-full flex-col px-4 py-4 md:min-h-[320px] md:px-5 md:py-5">
                  <div className="mb-4">
                    <CardTitle className="text-foreground text-base tracking-[0.3px]">
                      Explore Models
                    </CardTitle>
                    <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                      Recommended models your team can ship with today.
                    </CardDescription>
                  </div>
                  <ul className="divide-foreground/5 mt-auto divide-y">
                    {modelCards.slice(0, 3).map((model) => (
                      <li key={model.name}>
                        <button
                          type="button"
                          onClick={() => navigateFromGettingStarted("/dashboard?tab=Explore")}
                          className="hover:bg-foreground/5 group -mx-2 flex h-10 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 text-left transition-colors"
                        >
                          <div className="flex min-w-0 items-center gap-1.5">
                            <div className="relative size-8 shrink-0 overflow-hidden rounded-xs">
                              <Image
                                src={model.image}
                                alt={model.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-foreground line-clamp-1 text-sm">
                                {model.name}
                              </p>
                              <p className="text-foreground/50 text-[11px] leading-tight">
                                {model.type}
                              </p>
                            </div>
                          </div>
                          <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center">
                            <ArrowRight className="size-3.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => navigateFromGettingStarted("/dashboard?tab=Explore")}
                        className="hover:bg-foreground/5 group -mx-2 flex h-10 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 text-left transition-colors"
                      >
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="bg-surface text-foreground/70 inline-flex size-8 shrink-0 items-center justify-center rounded-xs">
                            <LayoutGrid className="size-3" />
                          </span>
                          <span className="text-foreground line-clamp-1 text-sm">
                            Explore all models
                          </span>
                        </div>
                        <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center">
                          <ArrowRight className="size-3.5" />
                        </span>
                      </button>
                    </li>
                  </ul>
                </section>
                </div>
              </CardContent>
            </Card>
          </article>
        ) : null}

        <article className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-foreground text-xl font-semibold tracking-tight">
                Usage
              </h2>
              <p className="text-subtle text-sm">
                View usage data for the selected time range
              </p>
            </div>
            <div className="flex items-center gap-1.5 self-start md:self-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!usageDateRange?.from}
                    className="border-foreground/10 text-foreground/80 data-[empty=true]:text-muted-foreground h-8 w-auto max-w-full min-w-0 justify-start gap-1.5 rounded-xs px-2.5 text-left text-xs font-normal tracking-[1px]"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span>{usageDateRangeLabel}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-background w-auto rounded-xs border-0 p-0 shadow-sm"
                  align="end"
                >
                  <DateCalendar
                    mode="range"
                    defaultMonth={usageDateRange?.from}
                    selected={usageDateRange}
                    onSelect={(nextRange) => {
                      setUsageDateRange(nextRange);
                      setUsageQuickRange(null);
                    }}
                    numberOfMonths={2}
                    className="text-xs"
                  />
                </PopoverContent>
              </Popover>
              {[
                { label: "1d", days: 1 },
                { label: "7d", days: 7 },
                { label: "30d", days: 30 },
              ].map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    applyUsageQuickRange(
                      item.days,
                      item.label as "1d" | "7d" | "30d",
                    )
                  }
                  className={`h-8 min-w-[38px] rounded-xs px-2 text-[11px] tracking-[0.8px] ${
                    usageQuickRange === item.label
                      ? "border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background"
                      : "border-foreground/10 text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none md:min-h-[290px]">
              <CardHeader className="px-4 pt-4 pb-0">
                <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                  Usage per model
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pt-3 pb-4">
                <Table className="min-w-[430px]">
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/70 text-[10px] tracking-[1px]">
                        Model
                      </TableHead>
                      <TableHead className="text-foreground/70 text-[10px] tracking-[1px]">
                        Request Count
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usagePerModel.map((item) => (
                      <TableRow
                        key={item.model}
                        className="border-foreground/10 hover:bg-transparent"
                      >
                        <TableCell className="text-xs">{item.model}</TableCell>
                        <TableCell className="text-xs">
                          {item.requests}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          ${item.cost.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableCell className="text-xs">Total</TableCell>
                      <TableCell className="text-xs">
                        {totalRequests} predictions
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        ${totalCost.toFixed(3)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none md:min-h-[290px]">
              <CardHeader className="px-4 pt-4 pb-0">
                <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                  Usage breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pt-3 pb-4">
                <ChartContainer
                  config={usageBreakdownChartConfig}
                  className="h-[230px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={usageBreakdown}
                    margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="0" />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={44}
                      tickMargin={6}
                      tick={{ fontSize: 9 }}
                      domain={[0, usageBreakdownMax]}
                      ticks={[0, 0.02, 0.04, 0.06, 0.08]}
                      tickFormatter={(value) =>
                        value === 0 ? "0" : Number(value).toFixed(2)
                      }
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 10 }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="line"
                          labelFormatter={(label) => `${label}`}
                          formatter={(value) => `$${Number(value).toFixed(3)}`}
                        />
                      }
                    />
                    <Bar
                      stackId="usage"
                      dataKey="nanoBanana"
                      name="google/nano-banana-2/text-to-image"
                      fill="var(--color-nanoBanana)"
                      stroke="none"
                      strokeWidth={0}
                      radius={[0, 0, 0, 0]}
                      maxBarSize={54}
                    />
                    <Bar
                      stackId="usage"
                      dataKey="fluxKontext"
                      name="flux-pro/kontext"
                      fill="var(--color-fluxKontext)"
                      stroke="none"
                      strokeWidth={0}
                      radius={[0, 0, 0, 0]}
                      maxBarSize={54}
                    />
                    <Bar
                      stackId="usage"
                      dataKey="wanT2v"
                      name="wan-2.6/t2v"
                      fill="var(--color-wanT2v)"
                      stroke="none"
                      strokeWidth={0}
                      radius={[0, 0, 0, 0]}
                      maxBarSize={54}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </article>

        <Tabs defaultValue="latest-models" className="gap-0">
          <div className="flex items-center justify-between gap-3">
            <TabsList
              variant="line"
              className="h-auto w-full justify-start gap-3 rounded-none bg-transparent px-0"
            >
              <TabsTrigger
                value="latest-models"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground group-data-[orientation=horizontal]/tabs:after:h-px h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap"
              >
                Latest models
              </TabsTrigger>
              <TabsTrigger
                value="favorite-models"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground group-data-[orientation=horizontal]/tabs:after:h-px h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap"
              >
                Favorite models
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 shrink-0 rounded-xs px-2.5 text-[11px] tracking-[0.8px] shadow-xs"
            >
              View all models
            </Button>
          </div>

          <TabsContent value="latest-models" className="mt-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {modelCards.map((model) => (
                <Card
                  key={`latest-${model.name}`}
                  className="border-foreground/10 hover:bg-surface gap-0 rounded-xs py-0 shadow-none transition-colors"
                >
                  <CardContent className="flex items-center gap-2.5 p-2">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 text-xs">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-0.5 text-[11px] leading-tight">
                        {model.type}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorite-models" className="mt-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteModelCards.map((model) => (
                <Card
                  key={`favorite-${model.name}`}
                  className="border-foreground/10 hover:bg-surface gap-0 rounded-xs py-0 shadow-none transition-colors"
                >
                  <CardContent className="flex items-center gap-2.5 p-2">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 text-xs">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-0.5 text-[11px] leading-tight">
                        {model.type}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {renderRequestsSection()}
        </div>
        </div>
      ) : resolvedMainTab === "Usage" ? (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
                Usage
              </h1>
              <p className="text-subtle text-sm">
                View usage data for the selected time range
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <Button
                variant="outline"
                size="sm"
                className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-2.5 text-[11px] tracking-[0.8px] shadow-xs"
              >
                <Download className="size-3.5" />
                Export
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!usageDateRange?.from}
                    className="border-foreground/10 text-foreground/80 data-[empty=true]:text-muted-foreground h-8 w-auto max-w-full min-w-0 justify-start gap-1.5 rounded-xs px-2.5 text-left text-xs font-normal tracking-[0.6px]"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span>{usageDateRangeLabel}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-background w-auto rounded-xs border-0 p-0 shadow-sm"
                  align="end"
                >
                  <DateCalendar
                    mode="range"
                    defaultMonth={usageDateRange?.from}
                    selected={usageDateRange}
                    onSelect={(nextRange) => {
                      setUsageDateRange(nextRange);
                      setUsageQuickRange(null);
                    }}
                    numberOfMonths={2}
                    className="text-xs"
                  />
                </PopoverContent>
              </Popover>
              {[
                { label: "1d", days: 1 },
                { label: "7d", days: 7 },
                { label: "30d", days: 30 },
              ].map((item) => (
                <Button
                  key={`usage-${item.label}`}
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    applyUsageQuickRange(
                      item.days,
                      item.label as "1d" | "7d" | "30d",
                    )
                  }
                  className={`h-8 min-w-[38px] rounded-xs px-2 text-[11px] tracking-[0.8px] ${
                    usageQuickRange === item.label
                      ? "border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background"
                      : "border-foreground/10 text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {usageTabSummaryCards.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.label}
                  className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none"
                >
                  <CardContent className="flex items-center justify-between px-4 py-4">
                    <div>
                      <p className="text-foreground/60 text-xs tracking-[0.5px]">
                        {item.label}
                      </p>
                      <p className="text-foreground mt-1 text-[30px] leading-none font-semibold tracking-tight">
                        {item.value}
                      </p>
                    </div>
                    <span className="bg-background text-foreground/60 inline-flex size-9 items-center justify-center rounded-xs">
                      <Icon className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                Usage breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-3 pb-4">
              <ChartContainer
                config={usageTabBreakdownChartConfig}
                className="h-[300px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={usageTabBreakdown}
                  margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="0" />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickMargin={6}
                    tick={{ fontSize: 10 }}
                    domain={[0, 0.08]}
                    ticks={[0, 0.02, 0.04, 0.06, 0.08]}
                    label={{
                      value: "Amount(USD)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fontSize: 10 },
                    }}
                    tickFormatter={(value) =>
                      value === 0 ? "0" : Number(value).toFixed(2)
                    }
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(label) => `${label}`}
                        formatter={(value) => `$${Number(value).toFixed(4)}`}
                      />
                    }
                  />
                  <Bar
                    dataKey="nanoBanana"
                    name="google/nano-banana-2/text-to-image"
                    fill="var(--color-nanoBanana)"
                    stroke="none"
                    strokeWidth={0}
                    radius={[0, 0, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar
                    dataKey="qwenEdit"
                    name="wavespeed-ai/qwen-image-2.0/edit"
                    fill="var(--color-qwenEdit)"
                    stroke="none"
                    strokeWidth={0}
                    radius={[0, 0, 0, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                Usage per model
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-3 pb-4">
              <div className="border-foreground/10 overflow-hidden rounded-xs border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/70 w-10 text-[10px] tracking-[1px]">
                        #
                      </TableHead>
                      <TableHead className="text-foreground/70 text-[10px] tracking-[1px]">
                        Model
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Request Count
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Avg Cost
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageTabPerModel.map((item, index) => (
                      <TableRow
                        key={item.model}
                        className="border-foreground/10 hover:bg-transparent"
                      >
                        <TableCell className="text-xs">{index + 1}</TableCell>
                        <TableCell className="text-xs">{item.model}</TableCell>
                        <TableCell className="text-right text-xs">
                          {item.requestCount}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          ${item.avgCost.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          ${item.cost.toFixed(4)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-foreground/60 mt-3 text-right text-xs">
                Total {usageTabPerModel.length} predictions, cost 0.0940
              </p>
            </CardContent>
          </Card>

          <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                Daily Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-3 pb-4">
              <div className="border-foreground/10 overflow-hidden rounded-xs border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/70 text-[10px] tracking-[1px]">
                        Date
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Cost
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Request Count
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right text-[10px] tracking-[1px]">
                        Models Used
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageTabDailyUsage.map((item) => (
                      <TableRow
                        key={item.date}
                        className="border-foreground/10 hover:bg-transparent"
                      >
                        <TableCell className="text-xs">{item.date}</TableCell>
                        <TableCell className="text-right text-xs">
                          ${item.cost.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {item.requestCount}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {item.modelsUsed}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      ) : resolvedMainTab === "History" ? (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
            {renderRequestsSection()}
          </div>
        </div>
      ) : resolvedMainTab === "Billing" ? (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
          <div className="border-foreground/10 flex items-center justify-between border-b pb-5">
            <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
              Billing
            </h1>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle className="text-foreground text-xl font-semibold tracking-tight">
                  Top Up
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <section>
                  <p className="text-foreground/60 mb-2 text-[11px] tracking-[0.8px] uppercase">
                    Amount
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {topUpAmountOptions.map((option) => (
                      <button
                        key={option.amount}
                        type="button"
                        onClick={() => setSelectedTopUpAmount(option.amount)}
                        className={`border-foreground/10 bg-background hover:bg-surface flex items-start justify-between gap-3 rounded-xs border p-3 text-left transition-colors ${
                          selectedTopUpAmount === option.amount
                            ? "border-[#3f74ff] ring-1 ring-[#3f74ff]/20"
                            : ""
                        }`}
                      >
                        <span className="text-foreground text-[34px] leading-none font-semibold tracking-tight">
                          {option.amount}
                        </span>
                        <span className="text-right">
                          <span className="text-foreground/70 block text-[11px] leading-4">
                            {option.throughput}
                          </span>
                          <span className="text-foreground/60 mt-1 block text-[11px] leading-4">
                            {option.benefit}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">
                      Payment Method
                    </p>
                    <Select defaultValue="stripe">
                      <SelectTrigger className="border-foreground/10 bg-background h-9 min-w-[210px] rounded-xs text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background rounded-xs border-0 shadow-sm">
                        <SelectItem value="stripe" className="rounded-xs text-xs">
                          Stripe
                        </SelectItem>
                        <SelectItem value="paypal" className="rounded-xs text-xs">
                          PayPal
                        </SelectItem>
                        <SelectItem value="crypto" className="rounded-xs text-xs">
                          Crypto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="h-9 rounded-xs px-4 text-xs tracking-[0.8px]">
                    Buy ({selectedTopUpAmount})
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardHeader className="px-4 pt-4 pb-0">
                <CardTitle className="text-foreground text-xl font-semibold tracking-tight">
                  My Account
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center px-4 pb-5 pt-6 text-center">
                <div className="from-surface to-foreground/10 mb-3 flex size-18 items-center justify-center rounded-full bg-linear-to-br">
                  <span className="text-foreground text-2xl font-semibold">M</span>
                </div>
                <p className="text-foreground text-2xl font-semibold">Mangmor</p>
                <p className="text-foreground/60 mt-1 text-xs">mangmorchang@gmail.com</p>
                <p className="text-[#3f74ff] mt-6 text-4xl font-semibold tracking-tight">
                  $6,186
                </p>
                <p className="text-foreground/60 mt-1 text-xs">Account Balance</p>
                <p className="text-foreground/50 mt-2 text-[11px]">
                  The balance never expires.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
              <p className="text-foreground text-sm">
                Auto top-up:
                <span className="text-foreground/60 ml-1">
                  Set up auto top-up to avoid running out of credits.
                </span>
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-3 text-[11px] tracking-[0.8px] shadow-xs"
              >
                Enable
              </Button>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
              <p className="text-foreground text-sm">
                Redeem Coupon:
                <span className="text-foreground/60 ml-1">
                  Enter a valid coupon code to add credits.
                </span>
              </p>
              <div className="flex w-full gap-2 md:w-auto">
                <Input
                  placeholder="Coupon code"
                  className="border-foreground/10 h-8 rounded-xs text-xs md:w-[180px]"
                />
                <Button className="h-8 rounded-xs px-3 text-[11px] tracking-[0.8px]">
                  Redeem
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="px-4 pt-3 pb-4">
              <Tabs defaultValue="top-up" className="gap-0">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <TabsList
                    variant="line"
                    className="h-auto justify-start gap-3 rounded-none bg-transparent px-0"
                  >
                    <TabsTrigger
                      value="top-up"
                      className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground group-data-[orientation=horizontal]/tabs:after:h-px h-9 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap"
                    >
                      Top Up
                    </TabsTrigger>
                    <TabsTrigger
                      value="billing"
                      className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground group-data-[orientation=horizontal]/tabs:after:h-px h-9 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap"
                    >
                      Billing
                    </TabsTrigger>
                  </TabsList>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-8 rounded-xs px-2.5 text-[11px] tracking-[0.8px] shadow-xs"
                  >
                    Add Billing Address
                  </Button>
                </div>

                <TabsContent value="top-up" className="mt-0">
                  <div className="border-foreground/10 rounded-xs border">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-foreground/10 hover:bg-transparent">
                          <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                            Description
                          </TableHead>
                          <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                            Date
                          </TableHead>
                          <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                            Amount
                          </TableHead>
                          <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingTopUpRecords.map((record) => (
                          <TableRow
                            key={`${record.description}-${record.date}`}
                            className="border-foreground/10 hover:bg-surface"
                          >
                            <TableCell className="text-xs">{record.description}</TableCell>
                            <TableCell className="text-xs">{record.date}</TableCell>
                            <TableCell className="text-xs">
                              <Badge
                                variant="outline"
                                className="border-[#3f74ff]/30 bg-[#3f74ff]/8 text-[#3f74ff] rounded-xs px-2 py-0.5 text-[10px]"
                              >
                                {record.amount}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 h-7 rounded-xs px-2 text-[10px] tracking-[0.8px] shadow-xs"
                              >
                                Get Invoice
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-foreground/50 mt-3 text-xs">
                    Showing {billingTopUpRecords.length} result
                    {billingTopUpRecords.length > 1 ? "s" : ""}
                  </p>
                </TabsContent>

                <TabsContent value="billing" className="mt-0">
                  <div className="border-foreground/10 flex min-h-[180px] items-center justify-center rounded-xs border">
                    <p className="text-foreground/60 text-sm">
                      No billing records yet.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        </div>
      ) : resolvedMainTab === "API Keys" ? (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
            <div className="border-foreground/10 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
                API Keys
              </h1>
              <Button
                variant="link"
                size="sm"
                className="text-foreground/70 hover:text-foreground h-8 self-start px-0 text-xs tracking-[0.4px] md:self-auto"
              >
                How to use API key?
                <ExternalLink className="size-3.5" />
              </Button>
            </div>

            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="border-foreground/10 border-b p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    value={newApiKeyName}
                    onChange={(event) => setNewApiKeyName(event.target.value)}
                    placeholder="Enter key name"
                    className="border-foreground/10 h-9 rounded-xs text-xs"
                  />
                  <Button
                    className="h-9 min-w-[160px] rounded-xs px-4 text-xs tracking-[0.8px] sm:w-auto"
                    onClick={() => setNewApiKeyName("")}
                  >
                    Create Key
                  </Button>
                </div>
              </CardContent>
              <CardContent className="min-h-[420px] p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                        Name
                      </TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                        Key
                      </TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                        Created
                      </TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                        Status
                      </TableHead>
                      <TableHead className="text-foreground/50 text-right text-[10px] tracking-[1px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeyRecords.map((record) => (
                      <TableRow
                        key={record.id}
                        className="border-foreground/10 hover:bg-surface"
                      >
                        <TableCell className="text-xs">{record.name}</TableCell>
                        <TableCell className="text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px]">{record.key}</span>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Copy API key"
                              onClick={() => copyApiKey(record.key)}
                              className="text-foreground/60 hover:text-foreground"
                            >
                              <Copy className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Hide API key"
                              className="text-foreground/60 hover:text-foreground"
                            >
                              <EyeOff className="size-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{record.createdAt}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-[#3f74ff]/30 bg-[#3f74ff]/8 text-[#3f74ff] rounded-xs px-2 py-0.5 text-[10px]"
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-7 rounded-xs px-2.5 text-[10px] tracking-[0.8px]"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="px-6 pt-6 md:px-20 md:pt-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <Card className="border-foreground/10 bg-background rounded-xs shadow-none">
            <CardContent className="p-6">
              <p className="text-foreground text-sm">
                {resolvedMainTab} section is not configured yet.
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      )}
    </section>
  );
}

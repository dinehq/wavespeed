"use client";

import { format, subDays } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  AlertCircle,
  CalendarIcon,
  ChevronDown,
  Check,
  Download,
  ExternalLink,
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
  },
  { label: "Add credits", action: "Add credits", tone: "primary", done: false },
  {
    label: "Generate your first media",
    action: "Start",
    tone: "secondary",
    done: false,
  },
];

const apiTasks = [
  { label: "Get an API key", action: "Get" },
  { label: "Quick start guide", action: "Check" },
  { label: "How to use in Python SDK", action: "Check" },
  { label: "Check documentation", action: "Check" },
];

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
    id: "req_7x9v3",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb1,
    createdAt: "2026-03-03 19:30",
  },
  {
    id: "req_f2k8p",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Processing",
    outputPreview: thumb2,
    createdAt: "2026-03-03 19:27",
  },
  {
    id: "req_m4q1n",
    model: "veo-3.1",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb3,
    createdAt: "2026-03-03 18:54",
  },
  {
    id: "req_h8d2w",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "4 images",
    outputPreview: thumb4,
    createdAt: "2026-03-03 18:32",
  },
  {
    id: "req_k1s7t",
    model: "kling-v2.6",
    status: "Running",
    output: "Queued",
    outputPreview: thumb5,
    createdAt: "2026-03-03 18:10",
  },
  {
    id: "req_p6z4b",
    model: "pixverse-v5.6",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb6,
    createdAt: "2026-03-03 17:45",
  },
  {
    id: "req_j9c3e",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "2 images",
    outputPreview: thumb1,
    createdAt: "2026-03-03 17:21",
  },
  {
    id: "req_r5v8x",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Rendering",
    outputPreview: thumb2,
    createdAt: "2026-03-03 16:58",
  },
  {
    id: "req_u3n6k",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb4,
    createdAt: "2026-03-03 16:42",
  },
  {
    id: "req_d7l2m",
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

const dashboardTabs = [
  "Dashboard",
  "Explore",
  "History",
  "LLM",
  "Serverless",
  "Desktop App",
  "API Keys",
  "Billing",
  "Settings",
];

export function DashboardMain() {
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
  const setupCompletedCount = setupTasks.filter((task) => task.done).length;
  const setupTotalCount = setupTasks.length;
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

  return (
    <section className="bg-background pb-6 md:pb-8">
      <div className="border-foreground/10 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-16 z-40 border-b px-4 backdrop-blur">
        <div className="w-full">
          <Tabs defaultValue="Dashboard" className="w-full">
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

      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 pt-6 md:px-20 md:pt-8">
        <div className="border-foreground/10 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-foreground text-sm">I want to</span>
            <Select defaultValue="build-with-api">
              <SelectTrigger className="border-foreground/10 bg-background h-9 min-w-[170px] rounded-xs text-sm">
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

        <article className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">
              Getting started
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-foreground/10 text-foreground/80 hover:bg-foreground/5 rounded-xs text-[11px] tracking-[0.8px] shadow-xs"
            >
              Don&apos;t show this
            </Button>
          </div>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="p-0">
              <div className="divide-foreground/10 grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
                <section className="flex h-full flex-col px-4 py-4 md:px-5 md:py-5">
                  <div className="mb-4">
                    <CardTitle className="text-foreground text-base tracking-[0.3px]">
                      Welcome to WaveSpeed
                    </CardTitle>
                    <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                      Finish setup in 2 minutes to start generating immediately.
                    </CardDescription>
                  </div>
                  <ul className="divide-foreground/10 mt-auto divide-y">
                    {setupTasks.map((task) => (
                      <li
                        key={task.label}
                        className="flex items-center justify-between gap-2 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className={`flex size-4 shrink-0 items-center justify-center rounded-[2px] border ${
                              task.done
                                ? "border-[#16a34a] bg-[#16a34a]/10 text-[#16a34a]"
                                : "border-foreground/20 text-transparent"
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
                        <span
                          className={`text-[10px] tracking-[0.8px] uppercase ${
                            task.done ? "text-[#16a34a]" : "text-foreground/55"
                          }`}
                        >
                          {task.done ? "Done" : "Pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2">
                    <Button
                      size="sm"
                      className="w-full rounded-xs text-[11px] tracking-[0.8px]"
                    >
                      {setupCompletedCount === setupTotalCount
                        ? "Launch Creator"
                        : "Continue"}
                    </Button>
                  </div>
                </section>

                <section className="flex h-full flex-col px-4 py-4 md:px-5 md:py-5">
                  <div className="mb-4">
                    <CardTitle className="text-foreground text-base tracking-[0.3px]">
                      Build with API
                    </CardTitle>
                    <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                      Ship your first integration in a few guided steps.
                    </CardDescription>
                  </div>
                  <ul className="divide-foreground/5 mt-auto divide-y">
                    {apiTasks.map((task, index) => (
                      <li key={task.label}>
                        <button
                          type="button"
                          className="hover:bg-foreground/5 group -mx-1 flex w-[calc(100%+0.5rem)] items-center justify-between gap-2 rounded-xs px-1 py-2.5 transition-colors"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <span className="text-foreground/50 w-5 shrink-0 text-[10px] tracking-[1px]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-foreground block min-w-0 flex-1 truncate text-left text-sm">
                              {task.label}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-foreground/15 text-foreground/80 hover:bg-foreground/5 mt-4 w-full rounded-xs text-[11px] tracking-[0.8px]"
                  >
                    Open API quickstart
                  </Button>
                </section>

                <section className="flex h-full flex-col px-4 py-4 md:px-5 md:py-5">
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
                      <li
                        key={model.name}
                        className="flex items-center justify-between gap-2 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="relative size-9 shrink-0 overflow-hidden rounded-xs">
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
                            <p className="text-foreground/50 mt-0.5 text-[11px]">
                              {model.type}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-foreground/15 text-foreground/80 hover:bg-foreground/5 mt-2 w-full rounded-xs text-[11px] tracking-[0.8px]"
                      >
                        Explore all models
                      </Button>
                    </li>
                  </ul>
                </section>
              </div>
            </CardContent>
          </Card>
        </article>

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
                  variant={
                    usageQuickRange === item.label ? "default" : "outline"
                  }
                  onClick={() =>
                    applyUsageQuickRange(
                      item.days,
                      item.label as "1d" | "7d" | "30d",
                    )
                  }
                  className="h-8 rounded-xs px-2 text-[11px] tracking-[0.8px]"
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

        <section>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                Requests
              </h2>
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
            <CardContent className="bg-surface/40 flex items-center gap-1.5 pl-2.5 pr-4 py-2.5 md:pr-5">
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
                          <p className="text-foreground font-mono text-xs">
                            {request.id}
                          </p>
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
                        <TableCell className="text-xs">{request.id}</TableCell>
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
                        <TableCell className="text-xs">
                          {request.createdAt}
                        </TableCell>
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
      </div>
    </section>
  );
}

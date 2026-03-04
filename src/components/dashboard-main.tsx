import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";

const setupTasks = [
  { label: "Create an account", action: "Add now", tone: "primary", done: true },
  { label: "Add credits", action: "Top up", tone: "secondary", done: false },
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
];

const favoriteModelCards = [
  modelCards[0],
  modelCards[2],
  modelCards[3],
];

const requests = [
  {
    id: "req_7x9v3",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "1 image",
    createdAt: "2026-03-03 19:30",
  },
  {
    id: "req_f2k8p",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Processing",
    createdAt: "2026-03-03 19:27",
  },
];

const usagePerModel = [
  { model: "flux-pro/kontext", requests: 126, cost: 28.35 },
  { model: "wan-2.6/t2v", requests: 64, cost: 42.1 },
  { model: "veo-3.1", requests: 31, cost: 25.92 },
  { model: "gpt-image-1", requests: 58, cost: 17.4 },
  { model: "kling-v2.6", requests: 40, cost: 22.8 },
];

const usageBreakdown = [
  { label: "Text to image", value: 86.55, color: "bg-[#3f74ff]" },
  { label: "Text to video", value: 64.9, color: "bg-[#8b5cf6]" },
  { label: "Image generation", value: 17.4, color: "bg-[#16a34a]" },
  { label: "Video generation", value: 25.92, color: "bg-[#f59e0b]" },
];

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

function MetricCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-foreground/10 bg-background h-full gap-0 rounded-xs py-0 shadow-none">
      <CardHeader className="px-4 pt-4 pb-0 md:px-5 md:pt-5">
        <CardTitle className="text-foreground font-mono text-sm tracking-[0.4px]">
          {title}
        </CardTitle>
        <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto px-4 pt-4 pb-4 md:px-5 md:pb-5">
        {children}
      </CardContent>
    </Card>
  );
}

export function DashboardMain() {
  const totalRequests = usagePerModel.reduce(
    (sum, item) => sum + item.requests,
    0,
  );
  const totalCost = usagePerModel.reduce((sum, item) => sum + item.cost, 0);
  const maxBreakdownValue = Math.max(
    ...usageBreakdown.map((item) => item.value),
  );

  return (
    <section className="bg-background pb-6 md:pb-8">
      <Tabs defaultValue="Dashboard" className="w-full">
        <TabsList
          variant="line"
          className="border-foreground/10 group-data-[orientation=horizontal]/tabs:h-12 w-full justify-start gap-2 overflow-x-auto rounded-none border-t border-b px-4"
        >
          {dashboardTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="h-12 flex-none rounded-none px-2 py-0 font-mono text-xs tracking-[1.2px] whitespace-nowrap after:bg-transparent data-[state=active]:text-[#3f74ff] data-[state=active]:after:bg-[#3f74ff]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 px-4 pt-6 md:px-8 md:pt-8">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-heading text-3xl leading-none font-semibold tracking-[-0.8px]">
            Dashboard
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="bg-surface hover:bg-foreground/10 rounded-xs font-mono text-xs tracking-[1.2px] uppercase shadow-none"
            >
              New API Key
            </Button>
            <Button className="bg-foreground text-background hover:bg-foreground/80 rounded-xs font-mono text-xs tracking-[1.2px] uppercase">
              Build App with API
            </Button>
          </div>
        </div>

        <article className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-foreground text-lg font-semibold tracking-tight">
              Getting started
            </h2>
            <Button
              variant="ghost"
              className="text-foreground/60 hover:text-foreground h-auto p-0 font-mono text-[10px] tracking-[1px] uppercase"
            >
              Don&apos;t show this
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Welcome to WaveSpeed"
            description="Complete setup to unlock the full speed of your account."
          >
            <ul className="divide-foreground/5 divide-y">
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
                  {!task.done ? (
                    <Button
                      size="xs"
                      className={`shrink-0 rounded-xs font-mono text-[10px] tracking-[1px] uppercase ${
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
          </MetricCard>

          <MetricCard
            title="Create Something with API"
            description="Follow these steps to get the most out of your experience."
          >
            <ul className="divide-foreground/5 divide-y">
              {apiTasks.map((task, index) => (
                <li
                  key={task.label}
                  className="flex items-center justify-between gap-2 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground line-clamp-1 text-sm">
                      {task.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    className="bg-surface hover:bg-foreground/10 shrink-0 rounded-xs border-0 font-mono text-[10px] tracking-[1px] uppercase shadow-none"
                  >
                    {task.action}
                    <ArrowRight className="size-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
          </MetricCard>

          <MetricCard
            title="Explore Models"
            description="Recommended models your team can ship with today."
          >
            <div className="flex flex-col gap-3">
              {modelCards.slice(0, 3).map((model) => (
                <Card
                  key={model.name}
                  className="border-foreground/10 bg-surface/60 gap-0 rounded-xs py-2.5 shadow-none"
                >
                  <CardContent className="px-2.5">
                    <div className="flex items-start gap-2">
                      <div className="relative size-8 shrink-0 overflow-hidden rounded-xs">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-foreground font-mono text-xs">
                          {model.name}
                        </p>
                        <p className="text-foreground/50 mt-1 text-[11px]">
                          {model.type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-foreground/60 hover:text-foreground mt-3 h-auto w-fit p-0 font-mono text-[10px] tracking-[1px] uppercase"
            >
              Explore all models
              <ArrowRight className="size-3.5" />
            </Button>
          </MetricCard>
          </div>
        </article>

        <article className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-foreground text-lg font-semibold tracking-tight">
                Usage
              </h2>
              <p className="text-subtle text-sm">
                View usage data for the selected time range
              </p>
            </div>
            <Select defaultValue="last-3-days">
              <SelectTrigger className="border-foreground/10 text-foreground/80 w-full rounded-xs font-mono text-xs tracking-[1px] md:w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background rounded-xs border-0 shadow-sm">
                <SelectItem value="last-3-days" className="rounded-xs font-mono text-xs">
                  Mar 01, 2026 - Mar 03, 2026
                </SelectItem>
                <SelectItem value="last-7-days" className="rounded-xs font-mono text-xs">
                  Last 7 days
                </SelectItem>
                <SelectItem value="last-30-days" className="rounded-xs font-mono text-xs">
                  Last 30 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Card className="bg-surface border-0 gap-0 rounded-xs py-0 shadow-none md:min-h-[290px]">
              <CardHeader className="flex-row items-start justify-between gap-2 px-4 pt-4 pb-0">
                <CardTitle className="text-foreground font-mono text-sm tracking-[0.4px]">
                  Usage per model
                </CardTitle>
                <CardDescription className="text-foreground/70 font-mono text-[10px] tracking-[1px] uppercase">
                  Total {totalRequests} predictions, cost $
                  {totalCost.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pt-3 pb-4">
                <Table className="min-w-[430px]">
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/70 font-mono text-[10px] tracking-[1px] uppercase">
                        Model
                      </TableHead>
                      <TableHead className="text-foreground/70 font-mono text-[10px] tracking-[1px] uppercase">
                        Request Count
                      </TableHead>
                      <TableHead className="text-foreground/70 text-right font-mono text-[10px] tracking-[1px] uppercase">
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
                        <TableCell className="font-mono text-xs">
                          {item.model}
                        </TableCell>
                        <TableCell className="text-xs">
                          {item.requests}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs">
                          ${item.cost.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-surface border-0 gap-0 rounded-xs py-0 shadow-none md:min-h-[290px]">
              <CardHeader className="px-4 pt-4 pb-0">
                <CardTitle className="text-foreground font-mono text-sm tracking-[0.4px]">
                  Usage breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pt-4 pb-4">
                <div className="space-y-3">
                  {usageBreakdown.map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-foreground text-sm">{item.label}</p>
                        <p className="text-foreground/70 font-mono text-xs">
                          ${item.value.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-background h-1 w-full overflow-hidden">
                        <div
                          className={`${item.color} h-full`}
                          style={{
                            width: `${(item.value / maxBreakdownValue) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-foreground/10 mt-5 border-t pt-3">
                  <p className="text-foreground/70 font-mono text-[10px] tracking-[1px] uppercase">
                    Breakdown total: $
                    {usageBreakdown
                      .reduce((sum, item) => sum + item.value, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>

        <Tabs defaultValue="latest-models" className="gap-0">
          <div className="flex items-center justify-between gap-3">
            <TabsList
              variant="line"
              className="h-auto w-full justify-start rounded-none bg-transparent px-0"
            >
              <TabsTrigger
                value="latest-models"
                className="h-10 flex-none rounded-none px-2.5 font-semibold whitespace-nowrap data-[state=active]:text-foreground data-[state=active]:after:bg-foreground"
              >
                Latest models
              </TabsTrigger>
              <TabsTrigger
                value="favorite-models"
                className="h-10 flex-none rounded-none px-2.5 font-semibold whitespace-nowrap data-[state=active]:text-foreground data-[state=active]:after:bg-foreground"
              >
                Favorite models
              </TabsTrigger>
            </TabsList>
            <Button
              variant="link"
              className="text-foreground/60 h-auto shrink-0 p-0 font-mono text-[10px] tracking-[1px] uppercase"
            >
              View all models
            </Button>
          </div>

          <TabsContent value="latest-models" className="mt-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {modelCards.map((model) => (
                <Card
                  key={`latest-${model.name}`}
                  className="border-foreground/10 hover:bg-surface gap-0 rounded-xs py-2.5 shadow-none transition-colors"
                >
                  <CardContent className="flex items-center gap-2 px-2.5">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 font-mono text-xs">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-1 text-[11px]">
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
                  className="border-foreground/10 hover:bg-surface gap-0 rounded-xs py-2.5 shadow-none transition-colors"
                >
                  <CardContent className="flex items-center gap-2 px-2.5">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 font-mono text-xs">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-1 text-[11px]">
                        {model.type}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
          <CardHeader className="border-foreground/10 border-b px-4 pt-4 pb-4 md:px-5 md:pt-5 md:pb-5">
            <Badge
              variant="outline"
              className="bg-surface text-foreground w-fit rounded-xs border-0 px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase"
            >
              Reminder: add at least 20 credits to keep your API services active
            </Badge>
          </CardHeader>
          <CardContent className="px-4 pt-4 pb-4 md:px-5 md:pb-5">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-foreground text-lg font-semibold tracking-tight">
                Requests
              </h2>
              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <Input
                  placeholder="Search request ID..."
                  className="h-9 rounded-xs text-sm sm:w-[220px]"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="border-foreground/10 text-foreground/80 bg-background hover:bg-foreground/5 h-9 w-full rounded-xs font-mono text-xs tracking-[1px] sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background rounded-xs border-0 shadow-sm">
                    <SelectItem value="all" className="rounded-xs font-mono text-xs">
                      All status
                    </SelectItem>
                    <SelectItem
                      value="succeeded"
                      className="rounded-xs font-mono text-xs"
                    >
                      Succeeded
                    </SelectItem>
                    <SelectItem value="running" className="rounded-xs font-mono text-xs">
                      Running
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="bg-surface rounded-xs border-0 font-mono text-xs tracking-[1.2px] uppercase shadow-none"
                >
                  Show all
                </Button>
                <Button className="bg-foreground text-background hover:bg-foreground/80 rounded-xs font-mono text-xs tracking-[1.2px] uppercase">
                  Submit
                </Button>
              </div>
            </div>

            <div className="space-y-2 md:hidden">
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
                        className={`rounded-xs border-0 px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase ${
                          request.status === "Succeeded"
                            ? "bg-green/20 text-foreground"
                            : "bg-surface text-foreground/70"
                        }`}
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-foreground/70">
                        Output: {request.output}
                      </span>
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
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      ID
                    </TableHead>
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      Model
                    </TableHead>
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      Status
                    </TableHead>
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      Output
                    </TableHead>
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      Created
                    </TableHead>
                    <TableHead className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
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
                      <TableCell className="font-mono text-xs">
                        {request.id}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {request.model}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-xs border-0 px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase ${
                            request.status === "Succeeded"
                              ? "bg-green/20 text-foreground"
                              : "bg-surface text-foreground/70"
                          }`}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        {request.output}
                      </TableCell>
                      <TableCell className="text-xs">
                        {request.createdAt}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-foreground/60 hover:text-foreground font-mono text-[10px] tracking-[1px] uppercase"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

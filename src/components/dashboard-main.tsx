import Image from "next/image";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";

const setupTasks = [
  { label: "Create an account", action: "Add now", tone: "primary" },
  { label: "Add credits", action: "Top up", tone: "secondary" },
  { label: "Generate your first media", action: "Start", tone: "secondary" },
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
    badge: "Fast",
    image: thumb1,
  },
  {
    name: "wan-2.6/t2v",
    type: "Text to video",
    badge: "Stable",
    image: thumb2,
  },
  { name: "veo-3.1", type: "Video generation", badge: "New", image: thumb3 },
  {
    name: "gpt-image-1",
    type: "Image generation",
    badge: "Reliable",
    image: thumb4,
  },
  {
    name: "kling-v2.6",
    type: "Text to video",
    badge: "Popular",
    image: thumb5,
  },
  {
    name: "pixverse-v5.6",
    type: "Video tools",
    badge: "Creator",
    image: thumb6,
  },
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
  { label: "Text to video", value: 64.9, color: "bg-[#6d4aff]" },
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
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-foreground/10 bg-background flex h-full flex-col rounded-xs border p-4 md:p-5">
      <h3 className="text-foreground mb-4 font-mono text-[11px] tracking-[1.2px] uppercase">
        {title}
      </h3>
      {children}
    </article>
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
    <section className="bg-background px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8">
        <nav className="border-foreground/10 overflow-x-auto border-b">
          <ul className="flex min-w-max items-center gap-2 md:gap-4">
            {dashboardTabs.map((tab) => {
              const isActive = tab === "Dashboard";
              return (
                <li key={tab}>
                  <button
                    className={`relative cursor-pointer px-2 py-2.5 font-mono text-xs tracking-[1.2px] whitespace-nowrap transition-colors md:px-3 ${
                      isActive
                        ? "text-[#3f74ff]"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#3f74ff]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-foreground/40 font-mono text-[10px] tracking-[1px] uppercase">
              Dashboard
            </p>
            <h1 className="text-heading mt-1 text-3xl leading-none font-semibold tracking-[-0.8px]">
              Workspace Overview
            </h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button className="bg-surface text-foreground hover:bg-foreground/10 rounded-xs px-3 py-2 font-mono text-xs tracking-[1.2px] uppercase transition-colors duration-150">
              New API Key
            </button>
            <button className="bg-foreground text-background hover:bg-foreground/80 rounded-xs px-3 py-2 font-mono text-xs tracking-[1.2px] uppercase transition-colors duration-150">
              Build App with API
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Welcome to WaveSpeed">
            <p className="text-subtle mb-4 text-sm leading-5">
              Complete setup to unlock the full speed of your account.
            </p>
            <ul className="mt-auto space-y-2">
              {setupTasks.map((task) => (
                <li
                  key={task.label}
                  className="border-foreground/10 flex items-center justify-between gap-2 rounded-xs border px-3 py-2"
                >
                  <span className="text-foreground text-sm">{task.label}</span>
                  <button
                    className={`shrink-0 rounded-xs px-2.5 py-1.5 font-mono text-[10px] tracking-[1px] uppercase transition-colors ${
                      task.tone === "primary"
                        ? "bg-foreground text-background hover:bg-foreground/80"
                        : "bg-surface text-foreground hover:bg-foreground/10"
                    }`}
                  >
                    {task.action}
                  </button>
                </li>
              ))}
            </ul>
          </MetricCard>

          <MetricCard title="Create Something with API">
            <p className="text-subtle mb-4 text-sm leading-5">
              Follow these steps to get the most out of your experience.
            </p>
            <ul className="mt-auto space-y-2">
              {apiTasks.map((task, index) => (
                <li
                  key={task.label}
                  className="border-foreground/10 flex items-center justify-between gap-2 rounded-xs border px-3 py-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-foreground/50 font-mono text-[10px] tracking-[1px] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground line-clamp-1 text-sm">
                      {task.label}
                    </span>
                  </div>
                  <button className="bg-surface text-foreground hover:bg-foreground/10 shrink-0 rounded-xs px-2.5 py-1.5 font-mono text-[10px] tracking-[1px] uppercase transition-colors duration-150">
                    {task.action} {"->"}
                  </button>
                </li>
              ))}
            </ul>
          </MetricCard>

          <MetricCard title="Explore Models">
            <p className="text-subtle mb-4 text-sm leading-5">
              Recommended models your team can ship with today.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {modelCards.map((model) => (
                <article
                  key={model.name}
                  className="border-foreground/10 bg-surface/60 rounded-xs border p-2.5"
                >
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
                      <p className="text-foreground line-clamp-1 font-mono text-xs">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-1 text-[11px]">
                        {model.type}
                      </p>
                    </div>
                  </div>
                  <span className="bg-background text-foreground/60 mt-2 inline-flex rounded-xs px-1.5 py-0.5 font-mono text-[9px] tracking-[1px] uppercase">
                    {model.badge}
                  </span>
                </article>
              ))}
            </div>
          </MetricCard>
        </div>

        <article className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-foreground font-mono text-[11px] tracking-[1.2px] uppercase">
                Usage
              </h2>
              <p className="text-subtle text-sm">
                View usage data for the selected time range
              </p>
            </div>
            <button className="border-foreground/10 text-foreground/80 flex w-full items-center justify-between gap-4 rounded-xs border px-3 py-2 font-mono text-xs tracking-[1px] md:w-auto">
              <span>Mar 01, 2026 - Mar 03, 2026</span>
              <span className="text-foreground/50">x</span>
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="bg-surface rounded-xs p-4 md:min-h-[290px]">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-foreground font-medium">Usage per model</h3>
                <p className="text-foreground/70 font-mono text-[10px] tracking-[1px] uppercase">
                  Total {totalRequests} predictions, cost $
                  {totalCost.toFixed(2)}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[430px]">
                  <thead>
                    <tr className="text-foreground/70 border-foreground/10 border-b font-mono text-[10px] tracking-[1px] uppercase">
                      <th className="py-2 text-left font-medium">Model</th>
                      <th className="py-2 text-left font-medium">
                        Request Count
                      </th>
                      <th className="py-2 text-right font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usagePerModel.map((item) => (
                      <tr
                        key={item.model}
                        className="border-foreground/10 border-b last:border-b-0"
                      >
                        <td className="py-2.5 pr-2 font-mono text-xs">
                          {item.model}
                        </td>
                        <td className="py-2.5 text-xs">{item.requests}</td>
                        <td className="py-2.5 text-right font-mono text-xs">
                          ${item.cost.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-surface rounded-xs p-4 md:min-h-[290px]">
              <h3 className="text-foreground mb-4 font-medium">
                Usage breakdown
              </h3>
              <div className="space-y-3">
                {usageBreakdown.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-foreground text-sm">{item.label}</p>
                      <p className="text-foreground/70 font-mono text-xs">
                        ${item.value.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-background h-2 w-full overflow-hidden rounded-full">
                      <div
                        className={`${item.color} h-full rounded-full`}
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
            </div>
          </div>
        </article>

        <article className="border-foreground/10 bg-background rounded-xs border p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground font-mono text-[11px] tracking-[1.2px] uppercase">
              Latest Models
            </h2>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground font-mono text-[10px] tracking-[1px] uppercase transition-colors"
            >
              View all models
            </a>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {modelCards.map((model) => (
              <div
                key={`latest-${model.name}`}
                className="border-foreground/10 hover:bg-surface flex items-center gap-2 rounded-xs border p-2.5 transition-colors"
              >
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
              </div>
            ))}
          </div>
        </article>

        <article className="border-foreground/10 bg-background rounded-xs border">
          <div className="border-foreground/10 border-b p-4 md:p-5">
            <p className="bg-surface text-foreground inline-flex rounded-xs px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase">
              Reminder: add at least 20 credits to keep your API services active
            </p>
          </div>
          <div className="p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-heading text-2xl leading-none font-semibold tracking-[-0.6px]">
                Requests
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button className="bg-surface text-foreground rounded-xs px-3 py-2 font-mono text-xs tracking-[1.2px] uppercase">
                  Show all
                </button>
                <button className="bg-foreground text-background rounded-xs px-3 py-2 font-mono text-xs tracking-[1.2px] uppercase">
                  Submit
                </button>
              </div>
            </div>

            <div className="space-y-2 md:hidden">
              {requests.map((request) => (
                <article
                  key={`mobile-${request.id}`}
                  className="border-foreground/10 rounded-xs border p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-foreground font-mono text-xs">
                        {request.id}
                      </p>
                      <p className="text-foreground mt-1 text-sm">
                        {request.model}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-xs px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase ${
                        request.status === "Succeeded"
                          ? "bg-green/20 text-foreground"
                          : "bg-surface text-foreground/70"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-foreground/70">
                      Output: {request.output}
                    </span>
                    <span className="text-foreground/60">
                      {request.createdAt}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr className="text-foreground/50 border-foreground/10 border-b font-mono text-[10px] tracking-[1px] uppercase">
                    <th className="px-2 py-2 text-left font-medium">ID</th>
                    <th className="px-2 py-2 text-left font-medium">Model</th>
                    <th className="px-2 py-2 text-left font-medium">Status</th>
                    <th className="px-2 py-2 text-left font-medium">Output</th>
                    <th className="px-2 py-2 text-left font-medium">Created</th>
                    <th className="px-2 py-2 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-foreground/10 hover:bg-surface border-b text-sm"
                    >
                      <td className="px-2 py-3 font-mono text-xs">
                        {request.id}
                      </td>
                      <td className="px-2 py-3 font-mono text-xs">
                        {request.model}
                      </td>
                      <td className="px-2 py-3">
                        <span
                          className={`inline-flex rounded-xs px-2 py-1 font-mono text-[10px] tracking-[1px] uppercase ${
                            request.status === "Succeeded"
                              ? "bg-green/20 text-foreground"
                              : "bg-surface text-foreground/70"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-2 py-3 text-xs">{request.output}</td>
                      <td className="px-2 py-3 text-xs">{request.createdAt}</td>
                      <td className="px-2 py-3">
                        <button className="text-foreground/60 hover:text-foreground font-mono text-[10px] tracking-[1px] uppercase">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

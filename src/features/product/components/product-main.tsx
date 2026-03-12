"use client";

import { format, subDays } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DateRange } from "react-day-picker";
import {
  AlertCircle,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
import { ProductTopTabs } from "@/features/product/components/product-top-tabs";

import {
  gettingStartedContentByIntent,
  requests,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import {
  isProductMainTab,
  resolveProductMainTabFromPathname,
  type ProductMainTab,
} from "@/features/product/main-tabs";
import { ProductFallbackTab } from "@/features/product/tabs/fallback-tab";
import { ProductHistoryTab } from "@/features/product/tabs/history-tab";
import { ProductApiKeysTab } from "@/features/product/tabs/api-keys-tab";
import { ProductBillingTab } from "@/features/product/tabs/billing-tab";
import { ProductDashboardTab } from "@/features/product/tabs/dashboard-tab";
import { ProductSettingsTab } from "@/features/product/tabs/settings-tab";
import { ProductUsageTab } from "@/features/product/tabs/usage-tab";
import { ProductModelsTab } from "@/features/product/tabs/models-tab";
import type { DashboardIntent } from "@/features/product/types/product-main";
import { toast } from "@/hooks/use-toast";

type ProductMainProps = {
  forcedMainTab?: ProductMainTab;
};

type ProductRouter = {
  push: (href: string) => void;
};

const controlButtonClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 text-xs shadow-xs";
const controlButtonSmClass = `${controlButtonClass} h-8 rounded-xs px-3`;
const controlButtonXsClass = `${controlButtonClass} h-8 rounded-xs px-3`;
const controlSelectTriggerClass =
  "cursor-pointer border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 rounded-xs text-xs shadow-xs";
const controlSelectTriggerCompactClass = `${controlSelectTriggerClass} h-7 justify-start gap-1 pr-1.5 pl-2.5`;
const requestFilterTriggerClass =
  "inline-flex h-8 w-fit min-w-0 shrink-0 items-center justify-start gap-1 rounded-xs border pr-1.5 pl-2.5 text-xs font-normal whitespace-nowrap";
const requestFilterTriggerIconClass =
  "[&_svg]:!size-3.5 [&_svg]:!text-foreground/50 [&_svg]:!opacity-100";
const controlSelectTriggerFilterClass = `${controlSelectTriggerClass} ${requestFilterTriggerClass} data-[placeholder]:text-foreground/80 ${requestFilterTriggerIconClass}`;
const controlIconButtonClass =
  "border-foreground/10 text-foreground/70 bg-background hover:bg-foreground/5 rounded-xs shadow-xs";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
const useMounted = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export function ProductMain({ forcedMainTab }: ProductMainProps = {}) {
  const mounted = useMounted();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mainTabsContainerRef = useRef<HTMLDivElement>(null);
  const [usageQuickRange, setUsageQuickRange] = useState<
    "1d" | "7d" | "30d" | null
  >(null);
  const [usageDateRange, setUsageDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 2, 1),
    to: new Date(2026, 2, 3),
  });
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([]);
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
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState("$10");
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [dashboardIntent, setDashboardIntent] =
    useState<DashboardIntent>("build-with-api");
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const billingRecordsRef = useRef<HTMLDivElement>(null);
  const usagePerModelSectionRef = useRef<HTMLDivElement>(null);
  const requestedTab = searchParams.get("tab");
  const requestedBillingTab = searchParams.get("billingTab");
  const requestedScrollTarget = searchParams.get("scrollTo");
  const resolvedMainTabFromPathname =
    resolveProductMainTabFromPathname(pathname);
  const resolvedMainTab =
    forcedMainTab ??
    resolvedMainTabFromPathname ??
    (requestedTab && isProductMainTab(requestedTab)
      ? requestedTab
      : "Dashboard");
  const resolvedBillingTab =
    requestedBillingTab === "billing" || requestedBillingTab === "top-up"
      ? requestedBillingTab
      : "top-up";
  const currentGettingStartedContent =
    gettingStartedContentByIntent[dashboardIntent];
  const navigateFromGettingStarted = (href: string) => {
    router.push(href);
  };
  const navigateToBillingSubTab = (nextTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("billingTab", nextTab);
    params.delete("tab");
    router.replace(`/billing?${params.toString()}`, { scroll: false });
  };
  const scrollToElementWithMainTabOffset = (element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }

    const mainTabsHeight =
      mainTabsContainerRef.current?.getBoundingClientRect().height ?? 0;
    const spacingAfterTabs = 8;
    const targetScrollTop =
      window.scrollY +
      element.getBoundingClientRect().top -
      mainTabsHeight -
      spacingAfterTabs;

    window.scrollTo({
      top: Math.max(targetScrollTop, 0),
      behavior: "smooth",
    });
  };
  const scrollToUsagePerModelSection = () => {
    scrollToElementWithMainTabOffset(usagePerModelSectionRef.current);
  };
  useEffect(() => {
    if (
      resolvedMainTab !== "Billing" ||
      resolvedBillingTab !== "billing" ||
      requestedScrollTarget !== "billing-records"
    ) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollToElementWithMainTabOffset(billingRecordsRef.current);
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("scrollTo");
    const query = params.toString();
    router.replace(query ? `/billing?${query}` : "/billing", {
      scroll: false,
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [
    requestedScrollTarget,
    resolvedBillingTab,
    resolvedMainTab,
    router,
    searchParams,
  ]);
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
      prev.length === requests.length
        ? []
        : requests.map((request) => request.id),
    );
  };
  const getRequestCheckboxClassName = (checked: boolean) =>
    `cursor-pointer inline-flex size-3.5 items-center justify-center rounded-xs border transition-colors ${
      checked
        ? "border-[#8ea8ff] bg-[#e9efff] text-[#5f7dff]"
        : "border-foreground/15 bg-background hover:bg-foreground/[0.03] text-transparent"
    }`;
  const copyRequestId = async (requestId: string) => {
    try {
      await navigator.clipboard.writeText(requestId);
      toast({
        title: "Copied",
        description: "Request ID copied to clipboard.",
      });
    } catch {
      // Clipboard may be unavailable in unsupported browsers.
    }
  };
  const copyApiKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({ title: "Copied", description: "API key copied to clipboard." });
    } catch {
      // Clipboard may be unavailable in unsupported browsers.
    }
  };
  const openRequestDetail = (requestId: string) => {
    router.push(`/requests/${requestId}`);
  };
  const productRouter: ProductRouter = {
    push: (href) => {
      router.push(href);
    },
  };
  const renderRequestsSection = (
    headerLevel: "primary" | "secondary" = "secondary",
  ) => (
    <section>
      <div className="mb-4">
        <ProductSectionHeader
          title="Requests"
          titleClassName={
            headerLevel === "secondary"
              ? "text-foreground font-display text-xl font-bold"
              : undefined
          }
          bottomPaddingClassName="pb-0"
          className="mb-2"
          actionsClassName="flex flex-wrap items-center gap-2 self-start md:self-auto"
          actions={
            <>
              <div className="flex h-8 items-center gap-2 rounded-xs px-1.5">
                <span className="text-foreground/80 text-xs">
                  Show API requests
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showApiRequests}
                  onClick={() => setShowApiRequests((prev) => !prev)}
                  className={`relative inline-flex h-4.5 w-8 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
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
                  <button
                    type="button"
                    className={controlSelectTriggerFilterClass}
                  >
                    <span>
                      {modelFilterValue === "all-models"
                        ? "All models"
                        : modelFilterValue}
                    </span>
                    <ChevronDown />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-background w-62 rounded-xs border-0 p-2 shadow-sm"
                  align="end"
                >
                  <Input
                    value={modelFilterQuery}
                    onChange={(event) =>
                      setModelFilterQuery(event.target.value)
                    }
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
                      className={`hover:bg-foreground/5 flex h-8 w-full cursor-pointer items-center rounded-xs px-2 text-left text-xs ${
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
                          className={`hover:bg-foreground/5 flex h-8 w-full cursor-pointer items-center rounded-xs px-2 text-left text-xs ${
                            modelFilterValue === model
                              ? "bg-foreground/5 text-foreground"
                              : "text-foreground/80"
                          }`}
                        >
                          {model}
                        </button>
                      ))
                    ) : (
                      <p className="text-foreground/50 flex h-8 items-center px-2 text-xs">
                        No models found
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Select>
                <SelectTrigger
                  size="sm"
                  className={controlSelectTriggerFilterClass}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-foreground/10">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                </SelectContent>
              </Select>
              {isIdSearchOpen ? (
                <div className="flex items-center gap-1.5">
                  <Input
                    value={idSearchQuery}
                    onChange={(event) => setIdSearchQuery(event.target.value)}
                    autoFocus
                    placeholder="Search ID"
                    className="border-foreground/10 h-8 w-30 rounded-xs text-xs shadow-xs md:text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Close ID search"
                    onClick={() => {
                      setIsIdSearchOpen(false);
                      setIdSearchQuery("");
                    }}
                    className={controlIconButtonClass}
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
                  className={controlIconButtonClass}
                >
                  <Search className="size-3.5" />
                </Button>
              )}
            </>
          }
        />
      </div>

      <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
        <CardContent className="flex items-center gap-1.5 bg-amber-500/6 py-2.5 pr-4 pl-3 md:pr-5 dark:bg-amber-400/8">
          <AlertCircle className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-xs leading-[1.35] text-amber-900/70 dark:text-amber-200/80">
              Your outputs are stored for <strong>7 days only</strong>. Download
              and save important files before they expire.
            </p>
          </div>
        </CardContent>

        <div className="border-foreground/10 border-t">
          <div
            className={`border-foreground/10 overflow-hidden border-b transition-all duration-200 ease-out ${
              selectedRequestCount > 0
                ? "max-h-14 translate-y-0 opacity-100"
                : "max-h-0 -translate-y-1 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-foreground/60 ml-2 text-xs">
                {selectedItemsLabel}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-foreground/10 h-8 rounded-xs px-3 text-xs"
                >
                  <Download className="size-3.5" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 rounded-xs px-3 text-xs"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2 p-2 md:hidden">
            {requests.map((request) => (
              <Card
                key={`mobile-${request.id}`}
                className="border-foreground/10 gap-0 rounded-xs py-3 shadow-none"
              >
                <CardContent className="px-3">
                  <div className="space-y-1.5">
                    <div className="flex min-w-0 items-center gap-1">
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => openRequestDetail(request.id)}
                          className="text-foreground/70 hover:text-foreground block w-full min-w-0 cursor-pointer truncate text-left font-mono text-xs underline-offset-2 hover:underline"
                        >
                          {request.id}
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Copy request ID"
                        onClick={() => copyRequestId(request.id)}
                        className="text-foreground/60 hover:text-foreground shrink-0"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                    </div>
                    <p className="text-foreground truncate text-sm">
                      {request.model}
                    </p>
                    <Badge
                      variant="outline"
                      className={`tracking-lg w-fit rounded-xs border-0 px-2 py-1 text-xs ${
                        request.status === "Succeeded"
                          ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                          : "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                      }`}
                    >
                      {request.status !== "Succeeded" && (
                        <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-current" />
                      )}
                      {request.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="text-foreground/70 flex items-center gap-2">
                      <div className="bg-surface relative size-12 overflow-hidden rounded-xs">
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
                {requests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="border-foreground/10 hover:bg-surface"
                  >
                    <TableCell className="py-0 pr-2 pl-3 align-middle lg:pl-4">
                      <div className="flex items-center justify-center py-2">
                        <button
                          type="button"
                          role="checkbox"
                          aria-label={`Select request ${request.id}`}
                          aria-checked={selectedRequestIds.includes(request.id)}
                          onClick={() => toggleRequestSelection(request.id)}
                          className={getRequestCheckboxClassName(
                            selectedRequestIds.includes(request.id),
                          )}
                        >
                          {selectedRequestIds.includes(request.id) ? (
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
                          src={request.outputPreview}
                          alt={`${request.model} output preview`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="px-3 lg:px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openRequestDetail(request.id)}
                          className="text-foreground/70 hover:text-foreground cursor-pointer font-mono text-xs underline-offset-2 hover:underline"
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
                    <TableCell className="px-3 lg:px-4">
                      {request.model}
                    </TableCell>
                    <TableCell className="px-3 lg:px-4">
                      <Badge
                        variant="outline"
                        className={`tracking-lg rounded-xs border-0 px-2 py-1 text-xs ${
                          request.status === "Succeeded"
                            ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                            : "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                        }`}
                      >
                        {request.status !== "Succeeded" && (
                          <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-current" />
                        )}
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 lg:px-4">
                      {request.createdAt}
                    </TableCell>
                    <TableCell className="pr-3 pl-3 lg:pr-4 lg:pl-4">
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
  const renderTopTabsSkeleton = () => (
    <ProductTopTabs activeTab={resolvedMainTab} />
  );
  const renderTopTabs = () => (
    <ProductTopTabs
      activeTab={resolvedMainTab}
      containerRef={mainTabsContainerRef}
    />
  );
  const renderResolvedTabContent = () => {
    if (resolvedMainTab === "Dashboard") {
      return (
        <ProductDashboardTab
          showGettingStarted={showGettingStarted}
          setShowGettingStarted={setShowGettingStarted}
          dashboardIntent={dashboardIntent}
          setDashboardIntent={setDashboardIntent}
          currentGettingStartedContent={currentGettingStartedContent}
          navigateFromGettingStarted={navigateFromGettingStarted}
          controlButtonClass={controlButtonClass}
          controlButtonSmClass={controlButtonSmClass}
          controlSelectTriggerCompactClass={controlSelectTriggerCompactClass}
          router={productRouter}
          requestsSection={renderRequestsSection("secondary")}
        />
      );
    }

    if (resolvedMainTab === "Usage") {
      return (
        <ProductUsageTab
          usageQuickRange={usageQuickRange}
          usageDateRange={usageDateRange}
          usageDateRangeLabel={usageDateRangeLabel}
          setUsageDateRange={setUsageDateRange}
          setUsageQuickRange={setUsageQuickRange}
          applyUsageQuickRange={applyUsageQuickRange}
          scrollToUsagePerModelSection={scrollToUsagePerModelSection}
          usagePerModelSectionRef={usagePerModelSectionRef}
          router={productRouter}
          controlButtonClass={controlButtonClass}
          controlButtonSmClass={controlButtonSmClass}
        />
      );
    }

    if (resolvedMainTab === "Explore") {
      return <ProductModelsTab />;
    }

    if (resolvedMainTab === "History") {
      return (
        <ProductHistoryTab requestsSection={renderRequestsSection("primary")} />
      );
    }

    if (resolvedMainTab === "Billing") {
      return (
        <ProductBillingTab
          selectedTopUpAmount={selectedTopUpAmount}
          setSelectedTopUpAmount={setSelectedTopUpAmount}
          resolvedBillingTab={resolvedBillingTab}
          navigateToBillingSubTab={navigateToBillingSubTab}
          billingRecordsRef={billingRecordsRef}
          controlButtonClass={controlButtonClass}
          controlButtonSmClass={controlButtonSmClass}
          controlButtonXsClass={controlButtonXsClass}
        />
      );
    }

    if (resolvedMainTab === "Settings") {
      return <ProductSettingsTab />;
    }

    if (resolvedMainTab === "API Keys") {
      return (
        <ProductApiKeysTab
          newApiKeyName={newApiKeyName}
          setNewApiKeyName={setNewApiKeyName}
          copyApiKey={copyApiKey}
        />
      );
    }

    return <ProductFallbackTab tab={resolvedMainTab} />;
  };

  if (!mounted) {
    return (
      <section className="bg-background pb-6 md:pb-8">
        {renderTopTabsSkeleton()}
        <div className="min-h-50" />
      </section>
    );
  }

  return (
    <section className="bg-background pb-6 md:pb-8">
      {renderTopTabs()}
      {renderResolvedTabContent()}
    </section>
  );
}

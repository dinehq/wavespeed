import { useMemo, useState, type RefObject } from "react";

import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Info } from "lucide-react";
import type { DateRange } from "react-day-picker";

import {
  billingTopUpRecords,
  billingUsageRecords,
  topUpAmountOptions,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentKrwIcon from "@/images/payment-krw.svg";
import PaymentPaypalIcon from "@/images/payment-paypal.svg";
import PaymentStripeIcon from "@/images/payment-stripe.svg";
import PaymentWechatAliIcon from "@/images/payment-wechat-ali.svg";

type ProductBillingTabProps = {
  selectedTopUpAmount: string;
  setSelectedTopUpAmount: (value: string) => void;
  resolvedBillingTab: "billing" | "top-up";
  navigateToBillingSubTab: (nextTab: string) => void;
  billingRecordsRef: RefObject<HTMLDivElement | null>;
  controlButtonClass: string;
  controlButtonSmClass: string;
  controlButtonXsClass: string;
};

function formatTopUpThroughput(throughput: string): string {
  const matched = throughput.match(
    /([\d,]+)\s+images\s+or\s+([\d,]+)\s+videos\s+per\s+minute/,
  );
  if (matched) {
    return `${matched[1]} img/min · ${matched[2]} vid/min`;
  }

  if (throughput === "VIP plan with custom throughput") {
    return "Custom throughput";
  }

  if (throughput === "Tailored usage package") {
    return "Tailored package";
  }

  return throughput;
}

function formatTopUpBenefit(benefit: string): string {
  if (benefit === "No concurrent tasks") {
    return "Concurrent: 0";
  }

  const matched = benefit.match(/Gain\s+([\d,]+)\s+concurrent\s+tasks/);
  if (matched) {
    return `Concurrent: +${matched[1]}`;
  }

  if (benefit === "Contact us for concurrency setup") {
    return "Concurrency: contact us";
  }

  return benefit;
}

function renderWithEmphasizedNumbers(text: string) {
  return text.split(/(\+?[\d,]+)/g).map((part, index) => {
    if (/^\+?[\d,]+$/.test(part)) {
      return (
        <span key={`${part}-${index}`} className="font-bold">
          {part}
        </span>
      );
    }

    return part;
  });
}

function formatAutoTopUpRuleAmount(raw: string): string {
  const numeric = Number(raw);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return "0";
  }

  const normalized = Number.isInteger(numeric)
    ? String(numeric)
    : numeric.toFixed(2).replace(/\.?0+$/, "");
  return normalized;
}

function parseBillingRecordDate(raw: string): Date | null {
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

type TopUpAmountOption = (typeof topUpAmountOptions)[number];

export function ProductBillingTab({
  selectedTopUpAmount,
  setSelectedTopUpAmount,
  resolvedBillingTab,
  navigateToBillingSubTab,
  billingRecordsRef,
  controlButtonSmClass,
  controlButtonXsClass,
}: ProductBillingTabProps) {
  const paymentMethodOptions = useMemo(
    () => [
      { id: "stripe", label: "Stripe", Icon: PaymentStripeIcon },
      { id: "paypal", label: "PayPal", Icon: PaymentPaypalIcon },
      { id: "krw-pay", label: "KRW Pay", Icon: PaymentKrwIcon },
      {
        id: "wechat-ali",
        label: "WeChat / AliPay",
        Icon: PaymentWechatAliIcon,
      },
    ],
    [],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const [isPaymentPickerOpen, setIsPaymentPickerOpen] = useState(false);
  const [autoTopUpAmount, setAutoTopUpAmount] = useState("20");
  const [autoTopUpThreshold, setAutoTopUpThreshold] = useState("10");
  const [isAutoTopUpActive, setIsAutoTopUpActive] = useState(false);
  const [isPredictionFilterOpen, setIsPredictionFilterOpen] = useState(false);
  const [predictionFilterValue, setPredictionFilterValue] = useState("all");
  const [predictionFilterQuery, setPredictionFilterQuery] = useState("");
  const [isAccessKeyFilterOpen, setIsAccessKeyFilterOpen] = useState(false);
  const [accessKeyFilterValue, setAccessKeyFilterValue] = useState("all");
  const [accessKeyFilterQuery, setAccessKeyFilterQuery] = useState("");
  const [isModelFilterOpen, setIsModelFilterOpen] = useState(false);
  const [modelFilterValue, setModelFilterValue] = useState("all");
  const [modelFilterQuery, setModelFilterQuery] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [billingDateRange, setBillingDateRange] = useState<
    DateRange | undefined
  >();
  const autoTopUpAmountLabel = useMemo(
    () => formatAutoTopUpRuleAmount(autoTopUpAmount),
    [autoTopUpAmount],
  );
  const autoTopUpThresholdLabel = useMemo(
    () => formatAutoTopUpRuleAmount(autoTopUpThreshold),
    [autoTopUpThreshold],
  );

  const parsedTopUpAmount = useMemo(() => {
    const numeric = Number(selectedTopUpAmount.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) && numeric > 0 ? String(numeric) : "";
  }, [selectedTopUpAmount]);

  const isCustomTopUpSelected = selectedTopUpAmount === "Custom";
  const lastPresetTopUpAmount = useMemo(() => {
    if (isCustomTopUpSelected) return "";
    return parsedTopUpAmount;
  }, [isCustomTopUpSelected, parsedTopUpAmount]);

  const [customTopUpAmount, setCustomTopUpAmount] = useState(parsedTopUpAmount);
  const [hasActivatedCustomInput, setHasActivatedCustomInput] = useState(false);

  const handleSelectTopUpAmount = (amount: string) => {
    const wasCustom = selectedTopUpAmount === "Custom";
    const willBeCustom = amount === "Custom";
    setSelectedTopUpAmount(amount);
    if (willBeCustom && !wasCustom) {
      setHasActivatedCustomInput(true);
      setCustomTopUpAmount(parsedTopUpAmount);
    } else if (!willBeCustom) {
      const numeric = Number(amount.replace(/[^0-9.]/g, ""));
      if (Number.isFinite(numeric) && numeric > 0) {
        setCustomTopUpAmount(String(numeric));
      }
    }
  };

  const selectedPaymentMeta = useMemo(
    () =>
      paymentMethodOptions.find((item) => item.id === selectedPaymentMethod) ??
      paymentMethodOptions[0],
    [paymentMethodOptions, selectedPaymentMethod],
  );
  const predictionOptions = useMemo(
    () =>
      Array.from(
        new Set(billingUsageRecords.map((record) => record.predictionId)),
      ),
    [],
  );
  const accessKeyOptions = useMemo(
    () =>
      Array.from(
        new Set(billingUsageRecords.map((record) => record.accessKey)),
      ),
    [],
  );
  const modelOptions = useMemo(
    () =>
      Array.from(new Set(billingUsageRecords.map((record) => record.model))),
    [],
  );
  const filteredPredictionOptions = useMemo(
    () =>
      predictionOptions.filter((item) =>
        item.toLowerCase().includes(predictionFilterQuery.toLowerCase()),
      ),
    [predictionFilterQuery, predictionOptions],
  );
  const filteredAccessKeyOptions = useMemo(
    () =>
      accessKeyOptions.filter((item) =>
        item.toLowerCase().includes(accessKeyFilterQuery.toLowerCase()),
      ),
    [accessKeyFilterQuery, accessKeyOptions],
  );
  const filteredModelOptions = useMemo(
    () =>
      modelOptions.filter((item) =>
        item.toLowerCase().includes(modelFilterQuery.toLowerCase()),
      ),
    [modelFilterQuery, modelOptions],
  );
  const billingDateRangeLabel = useMemo(() => {
    if (!billingDateRange?.from) return "Pick a date";
    if (!billingDateRange.to) return format(billingDateRange.from, "MMM dd");
    return `${format(billingDateRange.from, "MMM dd")} - ${format(
      billingDateRange.to,
      "MMM dd",
    )}`;
  }, [billingDateRange]);
  const filteredBillingUsageRecords = useMemo(
    () =>
      billingUsageRecords.filter((record) => {
        const matchesPrediction =
          predictionFilterValue === "all" ||
          record.predictionId === predictionFilterValue;
        const matchesAccessKey =
          accessKeyFilterValue === "all" ||
          record.accessKey === accessKeyFilterValue;
        const matchesModel =
          modelFilterValue === "all" || record.model === modelFilterValue;
        let matchesDate = true;
        if (billingDateRange?.from) {
          const recordDate = parseBillingRecordDate(record.date);
          if (!recordDate) {
            matchesDate = false;
          } else {
            const rangeStart = new Date(billingDateRange.from);
            rangeStart.setHours(0, 0, 0, 0);
            const rangeEnd = new Date(
              billingDateRange.to ?? billingDateRange.from,
            );
            rangeEnd.setHours(23, 59, 59, 999);
            matchesDate = recordDate >= rangeStart && recordDate <= rangeEnd;
          }
        }
        return (
          matchesPrediction && matchesAccessKey && matchesModel && matchesDate
        );
      }),
    [
      accessKeyFilterValue,
      billingDateRange,
      modelFilterValue,
      predictionFilterValue,
    ],
  );
  const billingFilterTriggerClass =
    "cursor-pointer border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 rounded-xs text-xs shadow-xs inline-flex h-8 w-fit min-w-0 shrink-0 items-center justify-start gap-1 rounded-xs border pr-1.5 pl-2.5 font-normal whitespace-nowrap [&_svg]:!size-3.5 [&_svg]:!text-foreground/50 [&_svg]:!opacity-100";

  const displayedAmounts = [
    "$5",
    "$10",
    "$50",
    "$100",
    "$1,000",
    "Custom",
  ] as const;
  const topUpOptionByAmount = new Map(
    topUpAmountOptions.map((option) => [option.amount, option] as const),
  );
  const displayedTopUpOptions = displayedAmounts
    .map((amount) => topUpOptionByAmount.get(amount))
    .filter((option): option is TopUpAmountOption => option !== undefined);
  const buyAmountLabel = useMemo(() => {
    if (!isCustomTopUpSelected) {
      return selectedTopUpAmount;
    }

    const normalizedCustomAmount = customTopUpAmount.trim();
    if (normalizedCustomAmount) {
      return `$${normalizedCustomAmount}`;
    }

    if (lastPresetTopUpAmount) {
      return `$${lastPresetTopUpAmount}`;
    }

    return "$0";
  }, [
    customTopUpAmount,
    isCustomTopUpSelected,
    lastPresetTopUpAmount,
    selectedTopUpAmount,
  ]);

  const renderTopUpOption = (option: TopUpAmountOption) => {
    const conciseThroughput = formatTopUpThroughput(option.throughput);
    const conciseBenefit = formatTopUpBenefit(option.benefit);
    const isSelected = selectedTopUpAmount === option.amount;

    return (
      <button
        key={option.amount}
        type="button"
        onClick={() => handleSelectTopUpAmount(option.amount)}
        className={`border-foreground/10 group relative flex w-full items-center gap-2 py-3.5 text-left transition-colors ${
          option.amount === "Custom" ? "" : "border-b"
        }`}
      >
        <span
          className="bg-muted pointer-events-none absolute -inset-x-2 inset-y-0 rounded-xs opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
        <span
          className={`relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full border ${
            isSelected ? "border-brand border-2" : "border-brand/70"
          }`}
          aria-hidden
        >
          <span
            className={`bg-brand size-1.5 rounded-full transition-opacity ${
              isSelected ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
        <span className="text-foreground relative z-10 block w-16 shrink-0 text-sm leading-none font-bold tabular-nums">
          {option.amount}
        </span>
        <span className="relative z-10 flex-1 text-right text-xs">
          <span className="text-foreground/70">
            {renderWithEmphasizedNumbers(
              `${conciseThroughput} · ${conciseBenefit}`,
            )}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="px-6 pt-6 pb-24 md:px-12 md:pt-8 md:pb-0 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <ProductSectionHeader title="Billing" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex min-h-36 flex-col px-4 py-4">
              <p className="text-foreground/60 text-xs">Current balance</p>
              <p className="text-foreground mt-2 text-2xl leading-none font-semibold">
                $6,186
              </p>
              <div className="mt-auto flex items-center pt-4">
                <p className="text-foreground/60 text-xs">
                  The balance never expires.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex min-h-36 flex-col px-4 py-4">
              <p className="text-foreground/60 text-xs">Usage this month</p>
              <p className="text-foreground mt-2 text-2xl leading-none font-semibold">
                $0.00
              </p>
              <div className="mt-auto flex items-center gap-2 pt-4">
                <span className="bg-muted text-foreground/70 rounded-xs px-1.5 py-1.5 text-xs font-medium">
                  $0.00
                </span>
                <span className="text-foreground/60 text-xs">
                  Daily average
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-foreground text-xl font-bold">
                Top Up
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-end px-4 pb-4">
              <section className="w-full">
                <div className="border-foreground/10 grid">
                  {displayedTopUpOptions.map((option) =>
                    renderTopUpOption(option),
                  )}
                </div>
              </section>
            </CardContent>
            <div className="border-foreground/10 mt-auto border-t px-4 py-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-2">
                <div className="flex w-full flex-col items-start gap-1 md:w-auto md:flex-none">
                  <Popover
                    open={isPaymentPickerOpen}
                    onOpenChange={setIsPaymentPickerOpen}
                  >
                    <div className="flex w-full items-center justify-end gap-5 md:w-auto">
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Selected payment: ${selectedPaymentMeta.label}`}
                          className={`bg-background hover:bg-surface border-foreground/10 focus-visible:border-ring focus-visible:ring-ring/50 flex h-8 items-center rounded-xs border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] ${
                            isPaymentPickerOpen ? "border-brand!" : ""
                          }`}
                        >
                          <span className="flex h-full w-[120px] items-center justify-center px-2">
                            <selectedPaymentMeta.Icon
                              className="max-h-full w-auto max-w-full shrink-0"
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </span>
                          <span className="border-foreground/10 flex h-full w-6 items-center justify-center border-l">
                            <ChevronDown className="text-foreground/40 size-4" />
                          </span>
                        </button>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent
                      align="start"
                      className="bg-background border-foreground/10 w-38 rounded-xs border p-2 shadow-sm"
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        {paymentMethodOptions.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => {
                              setSelectedPaymentMethod(method.id);
                              setIsPaymentPickerOpen(false);
                            }}
                            aria-label={method.label}
                            className={`border-foreground/10 hover:bg-surface flex h-8 w-full items-center justify-center rounded-xs border px-2 transition-colors ${
                              selectedPaymentMethod === method.id
                                ? "border-brand!"
                                : ""
                            }`}
                          >
                            <method.Icon
                              className="max-h-full w-auto max-w-full shrink-0"
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="hidden w-full items-center gap-2 md:flex md:flex-1">
                  {hasActivatedCustomInput ? (
                    <Input
                      type="number"
                      value={customTopUpAmount}
                      onChange={(event) =>
                        setCustomTopUpAmount(event.target.value)
                      }
                      step="any"
                      placeholder={parsedTopUpAmount || "Amount"}
                      className="border-foreground/10 bg-background h-8 flex-1 rounded-xs text-xs"
                    />
                  ) : null}
                  <Button className="h-8 flex-1 rounded-xs px-3 text-xs">
                    Buy ({buyAmountLabel})
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-foreground text-xl font-bold">
                  Auto Top-up
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`rounded-xs px-1.5 py-0 text-xs ${
                    isAutoTopUpActive
                      ? "border-emerald-500/30 bg-emerald-500/12 text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300"
                      : "border-foreground/15 text-foreground/55"
                  }`}
                >
                  {isAutoTopUpActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex h-full flex-col gap-4 px-4 pb-6">
              <div className="bg-brand/8 border-brand/15 text-brand flex items-start gap-2 rounded-xs border px-2 py-2 text-xs">
                <Info className="mt-px size-3.5 shrink-0" />
                <p>
                  Auto top-up may take a few minutes; raise your threshold to
                  prevent running out.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-foreground/75">
                    When credit balance goes below
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative max-w-48 flex-1">
                    <span className="text-foreground/65 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      value={autoTopUpThreshold}
                      onChange={(event) =>
                        setAutoTopUpThreshold(event.target.value)
                      }
                      className="border-foreground/10 h-8 rounded-xs pl-7 text-sm"
                    />
                  </div>
                  <span className="text-foreground/65 text-sm">USD</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-foreground/75">
                    Auto top up credits
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative max-w-48 flex-1">
                    <span className="text-foreground/65 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      value={autoTopUpAmount}
                      onChange={(event) =>
                        setAutoTopUpAmount(event.target.value)
                      }
                      className="border-foreground/10 h-8 rounded-xs pl-7 text-sm"
                    />
                  </div>
                  <span className="text-foreground/65 text-sm">USD</span>
                </div>
              </div>

              <div className="bg-muted rounded-xs px-2.5 py-3 text-sm leading-none">
                <span className="text-foreground font-bold">
                  ${autoTopUpAmountLabel}
                </span>
                <span className="text-subtle">
                  {" "}
                  will be added when balance reaches{" "}
                </span>
                <span className="text-foreground font-bold">
                  ${autoTopUpThresholdLabel}
                </span>
              </div>
              <p className="text-foreground/60 text-xs">
                Auto top-up only supports Stripe for now.
              </p>
            </CardContent>
            <div className="border-foreground/10 mt-auto border-t px-4 py-4">
              <Button
                onClick={() => setIsAutoTopUpActive((prev) => !prev)}
                variant={isAutoTopUpActive ? "outline" : "default"}
                className="h-8 w-full rounded-xs text-xs"
              >
                {isAutoTopUpActive
                  ? "Disable Auto Top-up"
                  : "Enable Auto Top-up"}
              </Button>
            </div>
          </Card>
        </div>

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
                className="border-foreground/10 h-8 rounded-xs text-xs md:w-45"
              />
              <Button className="h-8 rounded-xs px-3 text-xs">Redeem</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={resolvedBillingTab}
          onValueChange={navigateToBillingSubTab}
          className="gap-0"
          ref={billingRecordsRef}
        >
          <div className="mb-2 flex flex-col gap-2 px-0 py-1 md:flex-row md:items-center md:justify-between">
            <TabsList
              variant="line"
              className="h-auto justify-start gap-3 rounded-none bg-transparent px-0"
            >
              <TabsTrigger
                value="top-up"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-8 flex-none rounded-none px-1.5 font-bold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Top Up
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-8 flex-none rounded-none px-1.5 font-bold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Billing
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              {resolvedBillingTab === "billing" ? (
                <>
                  <Popover
                    open={isPredictionFilterOpen}
                    onOpenChange={(open) => {
                      setIsPredictionFilterOpen(open);
                      if (!open) setPredictionFilterQuery("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={billingFilterTriggerClass}
                      >
                        <span>
                          {predictionFilterValue === "all"
                            ? "Prediction ID"
                            : predictionFilterValue}
                        </span>
                        <ChevronDown className="text-foreground/50 size-3 shrink-0" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="bg-background w-70 rounded-xs border-0 p-2 shadow-sm"
                    >
                      <Input
                        value={predictionFilterQuery}
                        onChange={(event) =>
                          setPredictionFilterQuery(event.target.value)
                        }
                        placeholder="Search prediction ID"
                        className="border-foreground/10 h-8 rounded-xs text-xs"
                      />
                      <div className="mt-2 max-h-52 space-y-1 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setPredictionFilterValue("all");
                            setIsPredictionFilterOpen(false);
                            setPredictionFilterQuery("");
                          }}
                          className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                            predictionFilterValue === "all"
                              ? "bg-foreground/5 text-foreground"
                              : "text-foreground/80"
                          }`}
                        >
                          All prediction IDs
                        </button>
                        {filteredPredictionOptions.length > 0 ? (
                          filteredPredictionOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setPredictionFilterValue(option);
                                setIsPredictionFilterOpen(false);
                                setPredictionFilterQuery("");
                              }}
                              className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                                predictionFilterValue === option
                                  ? "bg-foreground/5 text-foreground"
                                  : "text-foreground/80"
                              }`}
                            >
                              {option}
                            </button>
                          ))
                        ) : (
                          <p className="text-foreground/50 px-2 py-1.5 text-xs">
                            No prediction IDs found
                          </p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover
                    open={isAccessKeyFilterOpen}
                    onOpenChange={(open) => {
                      setIsAccessKeyFilterOpen(open);
                      if (!open) setAccessKeyFilterQuery("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={billingFilterTriggerClass}
                      >
                        <span>
                          {accessKeyFilterValue === "all"
                            ? "Access Key"
                            : accessKeyFilterValue}
                        </span>
                        <ChevronDown className="text-foreground/50 size-3 shrink-0" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="bg-background w-70 rounded-xs border-0 p-2 shadow-sm"
                    >
                      <Input
                        value={accessKeyFilterQuery}
                        onChange={(event) =>
                          setAccessKeyFilterQuery(event.target.value)
                        }
                        placeholder="Search access keys"
                        className="border-foreground/10 h-8 rounded-xs text-xs"
                      />
                      <div className="mt-2 max-h-52 space-y-1 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setAccessKeyFilterValue("all");
                            setIsAccessKeyFilterOpen(false);
                            setAccessKeyFilterQuery("");
                          }}
                          className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                            accessKeyFilterValue === "all"
                              ? "bg-foreground/5 text-foreground"
                              : "text-foreground/80"
                          }`}
                        >
                          All access keys
                        </button>
                        {filteredAccessKeyOptions.length > 0 ? (
                          filteredAccessKeyOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setAccessKeyFilterValue(option);
                                setIsAccessKeyFilterOpen(false);
                                setAccessKeyFilterQuery("");
                              }}
                              className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                                accessKeyFilterValue === option
                                  ? "bg-foreground/5 text-foreground"
                                  : "text-foreground/80"
                              }`}
                            >
                              {option}
                            </button>
                          ))
                        ) : (
                          <p className="text-foreground/50 px-2 py-1.5 text-xs">
                            No access keys found
                          </p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover
                    open={isModelFilterOpen}
                    onOpenChange={(open) => {
                      setIsModelFilterOpen(open);
                      if (!open) setModelFilterQuery("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={billingFilterTriggerClass}
                      >
                        <span>
                          {modelFilterValue === "all"
                            ? "Model"
                            : modelFilterValue}
                        </span>
                        <ChevronDown className="text-foreground/50 size-3 shrink-0" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="bg-background w-70 rounded-xs border-0 p-2 shadow-sm"
                    >
                      <Input
                        value={modelFilterQuery}
                        onChange={(event) =>
                          setModelFilterQuery(event.target.value)
                        }
                        placeholder="Search models..."
                        className="border-foreground/10 h-8 rounded-xs text-xs"
                      />
                      <div className="mt-2 max-h-52 space-y-1 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setModelFilterValue("all");
                            setIsModelFilterOpen(false);
                            setModelFilterQuery("");
                          }}
                          className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                            modelFilterValue === "all"
                              ? "bg-foreground/5 text-foreground"
                              : "text-foreground/80"
                          }`}
                        >
                          All models
                        </button>
                        {filteredModelOptions.length > 0 ? (
                          filteredModelOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setModelFilterValue(option);
                                setIsModelFilterOpen(false);
                                setModelFilterQuery("");
                              }}
                              className={`hover:bg-foreground/5 flex w-full cursor-pointer rounded-xs px-2 py-1.5 text-left text-xs ${
                                modelFilterValue === option
                                  ? "bg-foreground/5 text-foreground"
                                  : "text-foreground/80"
                              }`}
                            >
                              {option}
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
                  <Popover
                    open={isDateFilterOpen}
                    onOpenChange={setIsDateFilterOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!billingDateRange?.from}
                        className="border-foreground/10 text-foreground/80 data-[empty=true]:text-muted-foreground h-8 w-auto max-w-full min-w-0 justify-start gap-1.5 rounded-xs px-2.5 text-left text-xs font-normal"
                      >
                        <CalendarIcon className="size-3.5" />
                        <span>{billingDateRangeLabel}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="bg-background w-auto rounded-xs border-0 p-0 shadow-sm"
                    >
                      <DateCalendar
                        mode="range"
                        defaultMonth={billingDateRange?.from}
                        selected={billingDateRange}
                        onSelect={setBillingDateRange}
                        numberOfMonths={2}
                        className="text-xs"
                      />
                    </PopoverContent>
                  </Popover>
                </>
              ) : null}
              <Button
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
              >
                Add Billing Address
              </Button>
            </div>
          </div>

          <TabsContent value="top-up" className="mt-0">
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="min-h-56 p-0">
                {billingTopUpRecords.length > 0 ? (
                  <Table className="[&_td]:px-4 [&_th]:px-4">
                    <TableHeader>
                      <TableRow className="border-foreground/10 hover:bg-transparent">
                        <TableHead className="text-foreground/50 tracking-lg">
                          Description
                        </TableHead>
                        <TableHead className="text-foreground/50 tracking-lg">
                          Date
                        </TableHead>
                        <TableHead className="text-foreground/50 tracking-lg">
                          Amount
                        </TableHead>
                        <TableHead className="text-foreground/50 tracking-lg">
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
                          <TableCell>{record.description}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-brand/30 bg-brand/8 text-brand rounded-xs px-2 py-0.5 text-xs"
                            >
                              {record.amount}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className={controlButtonXsClass}
                            >
                              Get Invoice
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-foreground/60 flex min-h-56 items-center justify-center px-4 text-sm">
                    No top-up records yet.
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="mt-2 flex h-7 items-center">
              <p className="text-foreground/50 text-xs">
                Showing {billingTopUpRecords.length} result
                {billingTopUpRecords.length > 1 ? "s" : ""}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-0">
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="min-h-56 p-0">
                <Table className="[&_td]:px-4 [&_th]:px-4">
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/50 tracking-lg">
                        Access Key
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Prediction ID
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Model
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Date
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBillingUsageRecords.length > 0 ? (
                      filteredBillingUsageRecords.map((record) => (
                        <TableRow
                          key={record.predictionId}
                          className="border-foreground/10 hover:bg-surface"
                        >
                          <TableCell className="text-xs">
                            {record.accessKey}
                          </TableCell>
                          <TableCell className="text-foreground/70 font-mono text-xs">
                            {record.predictionId}
                          </TableCell>
                          <TableCell>{record.model}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="rounded-xs border-[#ef4444]/25 bg-[#ef4444]/8 px-2 py-0.5 text-xs text-[#ef4444]"
                            >
                              {record.amount}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow className="border-foreground/10 hover:bg-transparent">
                        <TableCell
                          colSpan={5}
                          className="text-foreground/60 h-40 text-center text-sm"
                        >
                          No billing records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="mt-2 flex min-h-7 flex-col gap-2 text-xs sm:h-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-foreground/60">
                Showing 1 to {filteredBillingUsageRecords.length} of{" "}
                {filteredBillingUsageRecords.length} results
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-foreground h-8 rounded-xs px-3 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground/10 h-8 min-w-9 rounded-xs px-3 text-xs"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground/10 h-8 rounded-xs px-3 text-xs"
                >
                  Go
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-foreground h-8 rounded-xs px-3 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-background/95 border-foreground/10 fixed inset-x-0 bottom-0 z-40 border-t px-6 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2">
          {hasActivatedCustomInput ? (
            <Input
              type="number"
              value={customTopUpAmount}
              onChange={(event) => setCustomTopUpAmount(event.target.value)}
              step="any"
              placeholder={parsedTopUpAmount || "Amount"}
              className="border-foreground/10 h-8 flex-1 rounded-xs text-xs"
            />
          ) : null}
          <Button className="h-8 flex-1 rounded-xs px-3 text-xs">
            Buy ({buyAmountLabel})
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState, type MutableRefObject } from "react";

import { CalendarIcon, ChevronDown } from "lucide-react";

import {
  billingTopUpRecords,
  billingUsageRecords,
  topUpAmountOptions,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import PaymentMethodIcon from "@/images/payment-method.svg";
import PaymentPaypalIcon from "@/images/payment-paypal.svg";
import PaymentStripeIcon from "@/images/payment-stripe.svg";
import PaymentWechatAliIcon from "@/images/payment-wechat-ali.svg";

type ProductBillingTabProps = {
  selectedTopUpAmount: string;
  setSelectedTopUpAmount: (value: string) => void;
  resolvedBillingTab: "billing" | "top-up";
  navigateToBillingSubTab: (nextTab: string) => void;
  billingRecordsRef: MutableRefObject<HTMLDivElement | null>;
  controlButtonClass: string;
  controlButtonMdClass: string;
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
        <span key={`${part}-${index}`} className="font-semibold">
          {part}
        </span>
      );
    }

    return part;
  });
}

type TopUpAmountOption = (typeof topUpAmountOptions)[number];

export function ProductBillingTab({
  selectedTopUpAmount,
  setSelectedTopUpAmount,
  resolvedBillingTab,
  navigateToBillingSubTab,
  billingRecordsRef,
  controlButtonMdClass,
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

  const leftColumnAmounts = ["$5", "$10", "$20", "$50"] as const;
  const rightColumnAmounts = ["$100", "$1,000", "$10,000"] as const;
  const topUpOptionByAmount = new Map(
    topUpAmountOptions.map((option) => [option.amount, option] as const),
  );
  const leftColumnOptions = leftColumnAmounts
    .map((amount) => topUpOptionByAmount.get(amount))
    .filter((option): option is TopUpAmountOption => option !== undefined);
  const rightColumnBaseOptions = rightColumnAmounts
    .map((amount) => topUpOptionByAmount.get(amount))
    .filter((option): option is TopUpAmountOption => option !== undefined);
  const pinnedAmounts = new Set<string>([
    ...leftColumnAmounts,
    ...rightColumnAmounts,
  ]);
  const rightColumnOptions = [
    ...rightColumnBaseOptions,
    ...topUpAmountOptions.filter((option) => !pinnedAmounts.has(option.amount)),
  ];
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

    return (
      <button
        key={option.amount}
        type="button"
        onClick={() => handleSelectTopUpAmount(option.amount)}
        className={`border-foreground/10 bg-background hover:bg-surface flex items-center gap-3 rounded-xs border p-3 text-left transition-colors ${
          selectedTopUpAmount === option.amount
            ? "bg-surface ring-brand border-transparent ring ring-inset"
            : ""
        }`}
      >
        <span
          className={`block w-[120px] shrink-0 leading-none font-semibold tracking-tight tabular-nums ${
            selectedTopUpAmount === option.amount
              ? "text-brand text-[20px]"
              : "text-foreground text-[20px]"
          }`}
        >
          {option.amount}
        </span>
        <span className="flex-1 text-right text-[11px] leading-[14px]">
          <span
            className={
              selectedTopUpAmount === option.amount
                ? "text-brand"
                : "text-foreground/70"
            }
          >
            {renderWithEmphasizedNumbers(
              `${conciseThroughput} · ${conciseBenefit}`,
            )}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="px-6 pt-6 pb-24 md:px-20 md:pt-8 md:pb-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <ProductSectionHeader title="Billing" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex min-h-[144px] flex-col px-4 py-4">
              <p className="text-foreground/60 text-xs tracking-[0.5px]">
                Current balance
              </p>
              <p className="text-foreground mt-2 text-2xl leading-none font-medium tracking-tight">
                $6,186
              </p>
              <div className="mt-auto flex items-center pt-4">
                <p className="text-foreground/60 text-xs tracking-[0.5px]">
                  The balance never expires.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="flex min-h-[144px] flex-col px-4 py-4">
              <p className="text-foreground/60 text-xs tracking-[0.5px]">
                Usage this month
              </p>
              <p className="text-foreground mt-2 text-2xl leading-none font-medium tracking-tight">
                $0.00
              </p>
              <div className="mt-auto flex items-center gap-2 pt-4">
                <span className="bg-brand/8 text-foreground/70 rounded-[2px] px-1.5 py-0.5 text-xs leading-[13px] font-medium tracking-[0.5px]">
                  $0.00
                </span>
                <span className="text-foreground/60 text-xs tracking-[0.5px]">
                  Daily average
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4">
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-foreground font-display text-xl font-semibold tracking-tight">
                Top Up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              <section>
                <p className="text-foreground/60 mb-2 text-[11px] tracking-[0.8px]">
                  Amount
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    {leftColumnOptions.map((option) =>
                      renderTopUpOption(option),
                    )}
                  </div>
                  <div className="grid gap-2">
                    {rightColumnOptions.map((option) =>
                      renderTopUpOption(option),
                    )}
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-2">
                <div className="flex w-full flex-col gap-1 md:flex-1">
                  <p className="text-foreground/60 text-[11px] tracking-[0.8px]">
                    Payment method
                  </p>
                  <Popover
                    open={isPaymentPickerOpen}
                    onOpenChange={setIsPaymentPickerOpen}
                  >
                    <div className="flex items-center gap-5">
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Selected payment: ${selectedPaymentMeta.label}`}
                          className={`bg-background hover:bg-surface border-foreground/10 focus-visible:border-ring focus-visible:ring-ring/50 flex h-[36px] items-center rounded-xs border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] ${
                            isPaymentPickerOpen ? "border-brand!" : ""
                          }`}
                        >
                          <span className="flex h-full w-[90px] items-center justify-center px-2">
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
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon className="h-[18px] w-[68px] shrink-0" />
                        <span className="text-foreground/60 text-xs">
                          and more...
                        </span>
                      </div>
                    </div>
                    <PopoverContent
                      align="start"
                      className="bg-background border-foreground/10 w-fit rounded-xs border p-2 shadow-sm"
                    >
                      <div className="flex flex-col items-center gap-1">
                        {paymentMethodOptions.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => {
                              setSelectedPaymentMethod(method.id);
                              setIsPaymentPickerOpen(false);
                            }}
                            aria-label={method.label}
                            className={`border-foreground/10 hover:bg-surface flex h-[36px] w-[90px] items-center justify-center rounded-xs border px-2 transition-colors ${
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
                      className="border-foreground/10 bg-background h-9 flex-1 rounded-xs text-xs"
                    />
                  ) : null}
                  <Button className="h-9 flex-1 rounded-xs px-4 text-xs tracking-[0.8px]">
                    Buy ({buyAmountLabel})
                  </Button>
                </div>
              </div>
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
              className={controlButtonMdClass}
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
                className="border-foreground/10 h-8 rounded-xs text-xs md:w-45"
              />
              <Button className="tracking-md h-8 rounded-xs px-3 text-xs">
                Redeem
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={resolvedBillingTab}
          onValueChange={navigateToBillingSubTab}
          className="gap-0"
          ref={billingRecordsRef}
        >
          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <TabsList
              variant="line"
              className="h-auto justify-start gap-3 rounded-none bg-transparent px-0"
            >
              <TabsTrigger
                value="top-up"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-9 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Top Up
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-9 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Billing
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
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
              <CardContent className="px-4 pt-3 pb-4">
                <div className="border-foreground/10 rounded-xs border">
                  <Table>
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
                              className="border-brand/30 bg-brand/8 text-brand rounded-xs px-2 py-0.5 text-[10px]"
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
                </div>
                <p className="text-foreground/50 mt-3 text-xs">
                  Showing {billingTopUpRecords.length} result
                  {billingTopUpRecords.length > 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-0">
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="space-y-3 px-4 pt-3 pb-4">
                <div className="grid gap-2 md:grid-cols-4">
                  <Input
                    placeholder="Prediction ID"
                    className="border-foreground/10 h-8 rounded-xs text-xs"
                  />
                  <Input
                    placeholder="Search API keys"
                    className="border-foreground/10 h-8 rounded-xs text-xs"
                  />
                  <Input
                    placeholder="Search model..."
                    className="border-foreground/10 h-8 rounded-xs text-xs"
                  />
                  <Button
                    variant="outline"
                    className="border-foreground/10 text-foreground/70 hover:bg-foreground/5 h-8 justify-between rounded-xs px-2.5 text-xs"
                  >
                    Pick a date
                    <CalendarIcon className="size-3.5" />
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    className="text-foreground/70 hover:text-foreground h-8 rounded-xs px-2 text-xs"
                  >
                    Reset
                  </Button>
                  <Button className="h-8 rounded-xs px-3 text-xs">
                    Search
                  </Button>
                </div>

                <div className="border-foreground/10 rounded-xs border">
                  <Table>
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
                      {billingUsageRecords.map((record) => (
                        <TableRow
                          key={record.predictionId}
                          className="border-foreground/10 hover:bg-surface"
                        >
                          <TableCell className="text-xs">
                            {record.accessKey}
                          </TableCell>
                          <TableCell className="text-brand text-xs">
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
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-foreground/60">
                    Showing 1 to {billingUsageRecords.length} of{" "}
                    {billingUsageRecords.length} results
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground/60 hover:text-foreground h-7 rounded-xs px-2 text-xs"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-foreground/10 h-7 min-w-7 rounded-xs px-2 text-xs"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-foreground/10 h-7 rounded-xs px-2 text-xs"
                    >
                      Go
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground/60 hover:text-foreground h-7 rounded-xs px-2 text-xs"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              className="border-foreground/10 h-9 flex-1 rounded-xs text-xs"
            />
          ) : null}
          <Button className="h-9 flex-1 rounded-xs px-4 text-xs tracking-[0.8px]">
            Buy ({buyAmountLabel})
          </Button>
        </div>
      </div>
    </div>
  );
}

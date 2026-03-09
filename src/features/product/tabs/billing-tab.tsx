import { useEffect, useMemo, useState, type MutableRefObject } from "react";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  billingRecordsRef: MutableRefObject<HTMLDivElement | null>;
  controlButtonClass: string;
  controlButtonMdClass: string;
  controlButtonSmClass: string;
  controlButtonXsClass: string;
  controlSelectTriggerClass: string;
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

export function ProductBillingTab({
  selectedTopUpAmount,
  setSelectedTopUpAmount,
  resolvedBillingTab,
  navigateToBillingSubTab,
  billingRecordsRef,
  controlButtonMdClass,
  controlButtonSmClass,
  controlButtonXsClass,
  controlSelectTriggerClass,
}: ProductBillingTabProps) {
  const paymentMethodOptions = useMemo(
    () => [
      { id: "stripe", label: "Stripe", Icon: PaymentStripeIcon },
      { id: "paypal", label: "PayPal", Icon: PaymentPaypalIcon },
      { id: "krw-pay", label: "KRW Pay", Icon: PaymentKrwIcon },
      { id: "wechat-ali", label: "WeChat / AliPay", Icon: PaymentWechatAliIcon },
    ],
    [],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const [isPaymentPickerOpen, setIsPaymentPickerOpen] = useState(false);

  const parsedTopUpAmount = useMemo(() => {
    const numeric = Number(selectedTopUpAmount.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) && numeric > 0 ? String(numeric) : "";
  }, [selectedTopUpAmount]);

  const [customTopUpAmount, setCustomTopUpAmount] = useState(parsedTopUpAmount);

  useEffect(() => {
    setCustomTopUpAmount(parsedTopUpAmount);
  }, [parsedTopUpAmount]);

  const selectedPaymentMeta = useMemo(
    () =>
      paymentMethodOptions.find((item) => item.id === selectedPaymentMethod) ??
      paymentMethodOptions[0],
    [paymentMethodOptions, selectedPaymentMethod],
  );

  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        <ProductSectionHeader title="Billing" />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-3">
              <CardTitle className="text-foreground font-display text-xl font-semibold tracking-tight">
                Top Up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              <section>
                <p className="text-foreground/60 mb-2 text-[11px] tracking-[0.8px] uppercase">
                  Amount
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {topUpAmountOptions.map((option) => {
                    const conciseThroughput = formatTopUpThroughput(option.throughput);
                    const conciseBenefit = formatTopUpBenefit(option.benefit);

                    return (
                      <button
                        key={option.amount}
                        type="button"
                        onClick={() => setSelectedTopUpAmount(option.amount)}
                        className={`border-foreground/10 bg-background hover:bg-surface flex items-center justify-between gap-3 rounded-xs border p-3 text-left transition-colors ${
                          selectedTopUpAmount === option.amount
                            ? "border-[#3f74ff] ring-1 ring-[#3f74ff]"
                            : ""
                        }`}
                      >
                        <span
                          className={`leading-none font-semibold tracking-tight ${
                            selectedTopUpAmount === option.amount
                              ? "text-[#3f74ff] text-[22px]"
                              : "text-foreground text-[22px]"
                          }`}
                        >
                          {option.amount}
                        </span>
                        <span className="text-right">
                          <span className="text-foreground/70 block text-[11px] leading-4">
                            {conciseThroughput}
                          </span>
                          <span className="text-foreground/60 mt-0.5 block text-[11px] leading-4">
                            {conciseBenefit}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">
                    Payment Method
                  </p>
                  <Popover
                    open={isPaymentPickerOpen}
                    onOpenChange={setIsPaymentPickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Selected payment: ${selectedPaymentMeta.label}`}
                        className={`bg-background hover:bg-surface relative grid h-[74px] w-full place-items-center rounded-xs border px-4 transition-colors sm:w-[308px] ${
                          isPaymentPickerOpen
                            ? "border-[#3f74ff] ring-1 ring-[#3f74ff]"
                            : "border-foreground/15"
                        }`}
                      >
                        <span className="flex h-11 w-full max-w-[220px] items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full [&>svg]:shrink-0">
                          <selectedPaymentMeta.Icon preserveAspectRatio="xMidYMid meet" />
                        </span>
                        <ChevronDown className="text-foreground/40 pointer-events-none absolute right-3 size-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="bg-background w-[360px] max-w-[calc(100vw-2rem)] rounded-xs border border-foreground/10 p-3 shadow-sm"
                    >
                      <div className="flex flex-col gap-3">
                        {paymentMethodOptions.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => {
                              setSelectedPaymentMethod(method.id);
                              setIsPaymentPickerOpen(false);
                            }}
                            aria-label={method.label}
                            className={`border-foreground/10 hover:bg-surface flex h-[76px] w-full items-center justify-center rounded-xs border px-4 transition-colors ${
                              selectedPaymentMethod === method.id
                                ? "border-[#3f74ff] ring-1 ring-[#3f74ff]"
                                : ""
                            }`}
                          >
                            <span className="flex h-11 w-full max-w-[220px] items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full [&>svg]:shrink-0">
                              <method.Icon preserveAspectRatio="xMidYMid meet" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                  <Input
                    value={customTopUpAmount}
                    onChange={(event) => setCustomTopUpAmount(event.target.value)}
                    inputMode="decimal"
                    placeholder={parsedTopUpAmount || "Amount"}
                    className="border-foreground/10 h-9 rounded-xs text-xs md:w-[140px]"
                  />
                  <Button className="h-9 rounded-xs px-4 text-xs tracking-[0.8px]">
                    Buy ({selectedTopUpAmount})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-foreground font-display text-xl font-semibold tracking-tight">
                My Account
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center px-4 pt-6 pb-5 text-center">
              <div className="from-surface to-foreground/10 mb-3 flex size-18 items-center justify-center rounded-full bg-linear-to-br">
                <span className="text-foreground text-2xl font-semibold">
                  M
                </span>
              </div>
              <p className="text-foreground text-2xl font-semibold">Mangmor</p>
              <p className="text-foreground/60 mt-1 text-xs">
                mangmorchang@gmail.com
              </p>
              <p className="mt-6 text-4xl font-semibold tracking-tight text-[#3f74ff]">
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
                className="border-foreground/10 h-8 rounded-xs text-xs md:w-[180px]"
              />
              <Button className="h-8 rounded-xs px-3 text-xs tracking-[0.8px]">
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
                          <TableCell className="text-xs">
                            {record.description}
                          </TableCell>
                          <TableCell className="text-xs">
                            {record.date}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge
                              variant="outline"
                              className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-2 py-0.5 text-[10px] text-[#3f74ff]"
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
                  <Button className="h-8 rounded-xs px-3 text-xs">Search</Button>
                </div>

                <div className="border-foreground/10 rounded-xs border">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-foreground/10 hover:bg-transparent">
                        <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                          Access Key
                        </TableHead>
                        <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                          Prediction ID
                        </TableHead>
                        <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                          Model
                        </TableHead>
                        <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                          Date
                        </TableHead>
                        <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
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
                          <TableCell className="text-xs text-[#3f74ff]">
                            {record.predictionId}
                          </TableCell>
                          <TableCell className="text-xs">{record.model}</TableCell>
                          <TableCell className="text-xs">{record.date}</TableCell>
                          <TableCell className="text-xs">
                            <Badge
                              variant="outline"
                              className="rounded-xs border-[#ef4444]/25 bg-[#ef4444]/8 px-2 py-0.5 text-[10px] text-[#ef4444]"
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
    </div>
  );
}

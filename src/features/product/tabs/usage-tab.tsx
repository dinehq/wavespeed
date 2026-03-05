import type { MutableRefObject } from "react";

import { CalendarIcon, Download } from "lucide-react";

import {
  usageTabBreakdown,
  usageTabBreakdownChartConfig,
  usageTabDailyUsage,
  usageTabPerModel,
  usageTabSummaryCards,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { DateRange } from "react-day-picker";

type ProductUsageTabProps = {
  usageQuickRange: "1d" | "7d" | "30d" | null;
  usageDateRange: DateRange | undefined;
  usageDateRangeLabel: string;
  setUsageDateRange: (value: DateRange | undefined) => void;
  setUsageQuickRange: (value: "1d" | "7d" | "30d" | null) => void;
  applyUsageQuickRange: (days: number, range: "1d" | "7d" | "30d") => void;
  scrollToUsagePerModelSection: () => void;
  usagePerModelSectionRef: MutableRefObject<HTMLDivElement | null>;
  router: { push: (href: string) => void };
  controlButtonClass: string;
  controlButtonSmClass: string;
};

export function ProductUsageTab({
  usageQuickRange,
  usageDateRange,
  usageDateRangeLabel,
  setUsageDateRange,
  setUsageQuickRange,
  applyUsageQuickRange,
  scrollToUsagePerModelSection,
  usagePerModelSectionRef,
  router,
  controlButtonClass,
  controlButtonSmClass,
}: ProductUsageTabProps) {
  const usageTableContainerClass = "overflow-hidden rounded-xs";
  const usageTableHeaderRowClass = "border-foreground/10 hover:bg-transparent";
  const usageTableHeadClass = "text-foreground/70 text-[10px] tracking-[1px]";
  const usageTableBodyRowClass =
    "border-foreground/8 hover:bg-foreground/[0.02]";
  const usageTableCellClass = "text-xs";
  const usagePerModelTotalPredictions = usageTabPerModel.reduce(
    (sum, item) => sum + item.requestCount,
    0,
  );
  const usagePerModelTotalCost = usageTabPerModel.reduce(
    (sum, item) => sum + item.cost,
    0,
  );

  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        <ProductSectionHeader
          title="Usage"
          description="View usage data for the selected time range"
          actions={
            <>
              <Button
                variant="outline"
                size="sm"
                className={controlButtonSmClass}
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
                  className={`h-8 min-w-[38px] rounded-xs px-2 text-xs tracking-[0.8px] ${
                    usageQuickRange === item.label
                      ? "border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background"
                      : controlButtonClass
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </>
          }
        />

        <div className="grid gap-3 md:grid-cols-2">
          {usageTabSummaryCards.map((item) => (
            <Card
              key={item.label}
              className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none"
            >
              <CardContent className="flex min-h-[144px] flex-col px-4 py-4">
                <p className="text-foreground/60 text-xs tracking-[0.5px]">
                  {item.label}
                </p>
                {item.actions.length > 0 ? (
                  <p className="text-foreground mt-1 text-2xl leading-none font-medium tracking-tight">
                    {item.value}
                  </p>
                ) : (
                  <p className="text-foreground mt-auto text-2xl leading-none font-medium tracking-tight">
                    {item.value}
                  </p>
                )}
                {item.actions.length > 0 ? (
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    {item.actions.map((action) => (
                      <Button
                        key={`${item.label}-${action.label}`}
                        size="sm"
                        variant={action.variant}
                        onClick={() => {
                          if (
                            "scrollTarget" in action &&
                            action.scrollTarget === "usage-per-model"
                          ) {
                            scrollToUsagePerModelSection();
                            return;
                          }
                          if ("href" in action) {
                            router.push(action.href);
                          }
                        }}
                        className={`h-8 rounded-xs px-3 text-xs tracking-[0.5px] ${
                          action.variant === "default" ? "" : controlButtonClass
                        }`}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
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

        <div ref={usagePerModelSectionRef} className="scroll-mt-24">
          <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
            <CardHeader className="px-4 pt-4 pb-0">
              <CardTitle className="text-foreground text-sm tracking-[0.4px]">
                Usage per model
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-3 pb-4">
              <div className={usageTableContainerClass}>
                <Table>
                  <TableHeader>
                    <TableRow className={usageTableHeaderRowClass}>
                      <TableHead className={`${usageTableHeadClass} w-10`}>
                        #
                      </TableHead>
                      <TableHead className={usageTableHeadClass}>
                        Model
                      </TableHead>
                      <TableHead
                        className={`${usageTableHeadClass} text-right`}
                      >
                        Request Count
                      </TableHead>
                      <TableHead
                        className={`${usageTableHeadClass} text-right`}
                      >
                        Avg Cost
                      </TableHead>
                      <TableHead
                        className={`${usageTableHeadClass} text-right`}
                      >
                        Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageTabPerModel.map((item, index) => (
                      <TableRow
                        key={item.model}
                        className={usageTableBodyRowClass}
                      >
                        <TableCell className={usageTableCellClass}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={usageTableCellClass}>
                          <button
                            type="button"
                            onClick={() =>
                              router.push(
                                `/explore?model=${encodeURIComponent(item.model)}`,
                              )
                            }
                            className="text-foreground cursor-pointer underline-offset-2 hover:text-[#3f74ff] hover:underline"
                          >
                            {item.model}
                          </button>
                        </TableCell>
                        <TableCell
                          className={`${usageTableCellClass} text-right`}
                        >
                          {item.requestCount}
                        </TableCell>
                        <TableCell
                          className={`${usageTableCellClass} text-right`}
                        >
                          ${item.avgCost.toFixed(4)}
                        </TableCell>
                        <TableCell
                          className={`${usageTableCellClass} text-right`}
                        >
                          ${item.cost.toFixed(4)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="border-foreground/10 flex items-center justify-between border-t pt-3">
                <p className="text-foreground/70 text-xs tracking-[0.3px]">
                  Total {usagePerModelTotalPredictions} predictions
                </p>
                <p className="text-foreground text-base font-semibold tracking-tight">
                  ${usagePerModelTotalCost.toFixed(4)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
          <CardHeader className="px-4 pt-4 pb-0">
            <CardTitle className="text-foreground text-sm tracking-[0.4px]">
              Daily Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pt-3 pb-4">
            <div className={usageTableContainerClass}>
              <Table>
                <TableHeader>
                  <TableRow className={usageTableHeaderRowClass}>
                    <TableHead className={usageTableHeadClass}>Date</TableHead>
                    <TableHead className={`${usageTableHeadClass} text-right`}>
                      Cost
                    </TableHead>
                    <TableHead className={`${usageTableHeadClass} text-right`}>
                      Request Count
                    </TableHead>
                    <TableHead className={`${usageTableHeadClass} text-right`}>
                      Models Used
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageTabDailyUsage.map((item) => (
                    <TableRow
                      key={item.date}
                      className={usageTableBodyRowClass}
                    >
                      <TableCell className={usageTableCellClass}>
                        {item.date}
                      </TableCell>
                      <TableCell
                        className={`${usageTableCellClass} text-right`}
                      >
                        ${item.cost.toFixed(4)}
                      </TableCell>
                      <TableCell
                        className={`${usageTableCellClass} text-right`}
                      >
                        {item.requestCount}
                      </TableCell>
                      <TableCell
                        className={`${usageTableCellClass} text-right`}
                      >
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
  );
}

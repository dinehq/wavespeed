"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-layer]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden [&_.recharts-tooltip-wrapper]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(config)
          .map(([key, itemConfig]) => {
            const color = itemConfig.color;
            return color
              ? `[data-chart=${id}] { --color-${key}: ${color}; }`
              : null;
          })
          .filter(Boolean)
          .join("\n"),
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  formatter,
  labelFormatter,
}: {
  active?: boolean;
  payload?: ReadonlyArray<Record<string, unknown>>;
  label?: React.ReactNode;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  formatter?: (
    value: unknown,
    name: unknown,
    item: Record<string, unknown>,
    index: number,
    payload: ReadonlyArray<Record<string, unknown>>,
  ) => React.ReactNode;
  labelFormatter?: (
    label: React.ReactNode,
    payload: ReadonlyArray<Record<string, unknown>>,
  ) => React.ReactNode;
}) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const item = payload[0];
  const key = item.dataKey as string;
  const itemConfig = config[key];
  const title = labelFormatter
    ? labelFormatter(label, payload)
    : (label ?? itemConfig?.label ?? key);

  return (
    <div
      className={cn(
        "bg-background border-border grid min-w-32 items-start gap-1.5 rounded-xs border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!hideLabel ? <div className="font-medium">{title}</div> : null}
      <div className="grid gap-1">
        {payload.map((payloadItem) => (
          <div
            key={String(payloadItem.dataKey)}
            className="text-muted-foreground flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-1.5">
              {!hideIndicator ? (
                <span
                  className={cn(
                    "block shrink-0 rounded-[2px] bg-(--color-bg)",
                    indicator === "dot" && "size-2.5",
                    indicator === "line" && "h-2.5 w-1",
                    indicator === "dashed" &&
                      "h-0.5 w-3 border border-dashed border-(--color-border) bg-transparent",
                  )}
                  style={
                    {
                      "--color-bg": payloadItem.color,
                      "--color-border": payloadItem.color,
                    } as React.CSSProperties
                  }
                />
              ) : null}
              <span>{payloadItem.name as React.ReactNode}</span>
            </div>
            <span className="text-foreground font-mono tabular-nums">
              {formatter
                ? formatter(
                    payloadItem.value,
                    payloadItem.name,
                    payloadItem,
                    0,
                    payload,
                  )
                : (payloadItem.value as React.ReactNode)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent };
export type { ChartConfig };

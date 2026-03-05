"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-fit",
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-4",
        month_caption: "relative flex h-7 items-center justify-center",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "border-foreground/10 text-foreground/70 hover:bg-foreground/5 size-7 rounded-xs bg-transparent p-0 opacity-100 shadow-none"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "border-foreground/10 text-foreground/70 hover:bg-foreground/5 size-7 rounded-xs bg-transparent p-0 opacity-100 shadow-none"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-muted-foreground w-9 rounded-md text-[0.8rem] font-normal",
        week: "mt-2 flex w-full",
        day: "relative size-9 p-0 text-center text-sm",
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "size-9 rounded-none p-0 font-normal aria-selected:rounded-none aria-selected:opacity-100"
        ),
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-none",
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground aria-selected:rounded-none",
        range_start: "rounded-none",
        range_end: "rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...iconProps }) =>
          orientation === "left" ? (
            <ChevronLeftIcon className={cn("size-4", className)} {...iconProps} />
          ) : (
            <ChevronRightIcon className={cn("size-4", className)} {...iconProps} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }

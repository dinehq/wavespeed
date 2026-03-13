import type { ReactNode } from "react";

import { ArrowRight, Check, LayoutGrid } from "lucide-react";
import Image from "next/image";

import {
  dashboardSummaryCards,
  favoriteModelCards,
  modelCards,
  setupTasks,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import type { DashboardIntent } from "@/features/product/types/product-main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProductDashboardTabProps = {
  showGettingStarted: boolean;
  setShowGettingStarted: (
    value: boolean | ((prev: boolean) => boolean),
  ) => void;
  dashboardIntent: DashboardIntent;
  setDashboardIntent: (value: DashboardIntent) => void;
  currentGettingStartedContent: {
    title: string;
    description: string;
    showIndex: boolean;
    tasks: Array<{ label: string; action: string; href: string }>;
  };
  navigateFromGettingStarted: (href: string) => void;
  controlButtonClass: string;
  controlButtonSmClass: string;
  controlSelectTriggerCompactClass: string;
  router: { push: (href: string) => void };
  requestsSection: ReactNode;
};

export function ProductDashboardTab({
  showGettingStarted,
  setShowGettingStarted,
  dashboardIntent,
  setDashboardIntent,
  currentGettingStartedContent,
  navigateFromGettingStarted,
  controlButtonClass,
  controlButtonSmClass,
  router,
  requestsSection,
}: ProductDashboardTabProps) {
  return (
    <div className="px-6 pt-6 md:px-12 md:pt-8 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <ProductSectionHeader
          title="Dashboard"
          withDivider={false}
          actions={
            <>
              {showGettingStarted && (
                <Select
                  value={dashboardIntent}
                  onValueChange={(value) =>
                    setDashboardIntent(value as DashboardIntent)
                  }
                >
                  <SelectTrigger
                    size="sm"
                    className={`${controlButtonSmClass} min-w-0 justify-between gap-1 pr-2`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-foreground/10">
                    <SelectItem value="create-with-ai">
                      Create with AI
                    </SelectItem>
                    <SelectItem value="build-with-api">
                      Build with API
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGettingStarted((prev) => !prev)}
                className={controlButtonSmClass}
              >
                {showGettingStarted
                  ? "Hide Getting started"
                  : "Show Getting started"}
              </Button>
            </>
          }
        />

        {showGettingStarted ? (
          <article className="mb-6 space-y-4">
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="p-0">
                <div className="divide-foreground/10 grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
                  <section className="flex h-full flex-col justify-between px-4 pt-4 pb-1 md:px-5 md:pt-5 md:pb-2">
                    <div className="mb-4">
                      <CardTitle className="text-foreground text-base font-semibold">
                        Welcome to WaveSpeed
                      </CardTitle>
                      <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                        Complete setup to unlock the full speed of your account.
                      </CardDescription>
                    </div>
                    <ul>
                      {setupTasks.map((task) => (
                        <li
                          key={task.label}
                          className="flex h-11 items-center justify-between gap-2"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <span
                              className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                                task.done
                                  ? "bg-[#16a34a] text-white"
                                  : "border-foreground/10 border bg-transparent text-transparent"
                              }`}
                            >
                              <Check className="size-3" />
                            </span>
                            <span
                              className={`block min-w-0 truncate text-sm ${
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
                              size="sm"
                              variant={
                                task.tone === "primary" ? "default" : "outline"
                              }
                              onClick={() =>
                                navigateFromGettingStarted(task.href)
                              }
                              className={`h-8 shrink-0 rounded-xs px-3 text-xs ${
                                task.tone === "primary"
                                  ? "bg-foreground text-background hover:bg-foreground/80 shadow-xs"
                                  : `${controlButtonClass}`
                              }`}
                            >
                              {task.action}
                            </Button>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="flex h-full flex-col justify-between px-4 pt-4 pb-1 md:px-5 md:pt-5 md:pb-2">
                    <div className="mb-4">
                      <CardTitle className="text-foreground text-base font-semibold">
                        {currentGettingStartedContent.title}
                      </CardTitle>
                      <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                        {currentGettingStartedContent.description}
                      </CardDescription>
                    </div>
                    <ul className="divide-foreground/5 divide-y">
                      {currentGettingStartedContent.tasks.map((task, index) => (
                        <li key={task.label}>
                          <button
                            type="button"
                            onClick={() =>
                              navigateFromGettingStarted(task.href)
                            }
                            className="hover:bg-foreground/5 group -mx-2 flex h-11 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 transition-colors"
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                              {currentGettingStartedContent.showIndex ? (
                                <span className="text-foreground/50 tracking-lg w-5 shrink-0 text-xs">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              ) : null}
                              <span className="text-foreground block min-w-0 flex-1 truncate text-left text-sm">
                                {task.label}
                              </span>
                            </div>
                            <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center gap-1 text-xs">
                              <span>{task.action}</span>
                              <ArrowRight className="size-3.5" />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="flex h-full flex-col justify-between px-4 pt-4 pb-1 md:px-5 md:pt-5 md:pb-2">
                    <div className="mb-4">
                      <CardTitle className="text-foreground text-base font-semibold">
                        Explore Models
                      </CardTitle>
                      <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                        Recommended models your team can ship with today.
                      </CardDescription>
                    </div>
                    <ul className="divide-foreground/5 divide-y">
                      {modelCards.slice(0, 3).map((model) => (
                        <li key={model.name}>
                          <button
                            type="button"
                            onClick={() =>
                              navigateFromGettingStarted("/product/explore")
                            }
                            className="hover:bg-foreground/5 group -mx-2 flex h-11 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 text-left transition-colors"
                          >
                            <div className="flex min-w-0 items-center gap-1.5">
                              <div className="relative size-8 shrink-0 overflow-hidden rounded-xs">
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
                                <p className="text-foreground/50 text-xs leading-tight">
                                  {model.type}
                                </p>
                              </div>
                            </div>
                            <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center">
                              <ArrowRight className="size-3.5" />
                            </span>
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          type="button"
                          onClick={() =>
                            navigateFromGettingStarted("/product/explore")
                          }
                          className="hover:bg-foreground/5 group -mx-2 flex h-11 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-2 rounded-xs px-2 text-left transition-colors"
                        >
                          <div className="flex min-w-0 items-center gap-1.5">
                            <span className="bg-surface text-foreground/70 inline-flex size-8 shrink-0 items-center justify-center rounded-xs">
                              <LayoutGrid className="size-3" />
                            </span>
                            <span className="text-foreground line-clamp-1 text-sm">
                              Explore all models
                            </span>
                          </div>
                          <span className="text-foreground/60 group-hover:text-foreground inline-flex shrink-0 items-center">
                            <ArrowRight className="size-3.5" />
                          </span>
                        </button>
                      </li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </article>
        ) : null}

        <article className="mb-6 space-y-3 md:mb-8">
          <div className="grid gap-3 md:grid-cols-3">
            {dashboardSummaryCards.map((item) => (
              <Card
                key={`dashboard-${item.label}`}
                className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none dark:border dark:border-white/6"
              >
                <CardContent className="flex min-h-36 flex-col px-4 py-4">
                  <div>
                    <p className="text-foreground/60 text-xs">{item.label}</p>
                    <p className="text-foreground mt-2 text-2xl leading-none font-semibold">
                      {item.value}
                    </p>
                  </div>
                  {item.actions.length > 0 ? (
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                      {item.actions.map((action) => (
                        <Button
                          key={`dashboard-${item.label}-${action.label}`}
                          size="sm"
                          variant={action.variant}
                          onClick={() => router.push(action.href)}
                          className={`h-8 rounded-xs px-3 text-xs ${
                            action.variant === "default"
                              ? ""
                              : controlButtonClass
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
        </article>

        <Tabs defaultValue="latest-models" className="gap-0 pb-4 md:pb-6">
          <div className="flex items-center justify-between gap-3">
            <TabsList
              variant="line"
              className="h-auto w-full justify-start gap-3 rounded-none bg-transparent px-0"
            >
              <TabsTrigger
                value="latest-models"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Latest models
              </TabsTrigger>
              <TabsTrigger
                value="favorite-models"
                className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
              >
                Favorite models
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className={`${controlButtonSmClass} h-8 shrink-0`}
            >
              View all models
            </Button>
          </div>

          <TabsContent value="latest-models" className="mt-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {modelCards.map((model) => (
                <Card
                  key={`latest-${model.name}`}
                  className="group border-foreground/10 gap-0 overflow-hidden rounded-xs py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/25"
                >
                  <CardContent className="flex items-center gap-2.5 p-2">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 text-sm">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-0.5 text-xs leading-tight">
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
                  className="group border-foreground/10 gap-0 overflow-hidden rounded-xs py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/25"
                >
                  <CardContent className="flex items-center gap-2.5 p-2">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground line-clamp-1 text-sm">
                        {model.name}
                      </p>
                      <p className="text-foreground/50 mt-0.5 text-xs leading-tight">
                        {model.type}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {requestsSection}
      </div>
    </div>
  );
}

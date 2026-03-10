import type { ComponentType } from "react";

import {
  accountLevels,
  currentAccountLevel,
  settingsBasicInfo,
  settingsTeamMembers,
} from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoginGithubIcon from "@/images/login-github.svg";
import LoginGoogleIcon from "@/images/login-google.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductSettingsTab() {
  const loginMethodIconMap: Record<
    string,
    ComponentType<{ className?: string }>
  > = {
    Google: LoginGoogleIcon,
    GitHub: LoginGithubIcon,
  };

  return (
    <div className="px-6 pt-6 md:px-12 md:pt-8 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <ProductSectionHeader title="Settings" />
        <div className="grid gap-4 md:grid-cols-2">
          <section className="space-y-2">
            <h2 className="text-foreground font-display text-base font-semibold">
              Basic Info
            </h2>
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="divide-foreground/10 divide-y p-0">
                <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <p className="text-foreground/60 shrink-0 text-xs">
                    Email
                  </p>
                  <p className="text-foreground min-w-0 truncate text-sm">
                    {settingsBasicInfo.email}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <p className="text-foreground/60 shrink-0 text-xs">
                    Username
                  </p>
                  <p className="text-foreground min-w-0 truncate text-sm">
                    {settingsBasicInfo.username}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <p className="text-foreground/60 shrink-0 text-xs">
                    Login Methods
                  </p>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {settingsBasicInfo.loginMethods.map((method) => {
                      const Icon = loginMethodIconMap[method];
                      return (
                        <Badge
                          key={method}
                          variant="outline"
                          className="border-foreground/10 bg-surface text-foreground gap-1.5 overflow-visible rounded-xs px-2 py-1 text-xs font-normal [&>svg]:size-auto"
                        >
                          {Icon ? (
                            <Icon className="h-4 w-auto shrink-0" />
                          ) : null}
                          {method}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-2">
            <h2 className="text-foreground font-display text-base font-semibold">
              My Team
            </h2>
            <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
              <CardContent className="divide-foreground/10 divide-y p-0">
                {settingsTeamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between gap-3 px-4 py-2.5"
                  >
                    <p className="text-foreground text-sm">{member.name}</p>
                    <Badge
                      variant="outline"
                      className="border-foreground/10 bg-surface text-foreground/70 rounded-xs px-2 py-0.5 text-xs uppercase"
                    >
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>

        <section className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-foreground font-display text-base font-semibold">
              Account Level
            </h2>
            <Badge
              variant="outline"
              className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-2 py-0.5 text-xs text-[#3f74ff] uppercase"
            >
              {currentAccountLevel}
            </Badge>
          </div>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="space-y-3 p-4">
              <p className="text-foreground/60 text-xs">
                WaveSpeedAI offers multiple account levels to match different
                throughput and concurrency requirements.
              </p>

              <div className="border-foreground/10 overflow-x-auto rounded-xs border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/50 tracking-lg">
                        Level
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Img/min
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Vid/min
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Concurrent
                      </TableHead>
                      <TableHead className="text-foreground/50 tracking-lg">
                        Activation
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountLevels.map((level) => {
                      const isCurrent = level.level === currentAccountLevel;
                      return (
                        <TableRow
                          key={level.level}
                          className={`border-foreground/10 hover:bg-transparent ${
                            isCurrent ? "bg-surface/70" : ""
                          }`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-foreground font-medium">
                                {level.level}
                              </span>
                              {isCurrent ? (
                                <Badge
                                  variant="outline"
                                  className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-1.5 py-0.5 text-xs text-[#3f74ff]"
                                >
                                  Current
                                </Badge>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell>{level.imagesPerMin}</TableCell>
                          <TableCell>{level.videosPerMin}</TableCell>
                          <TableCell>{level.maxConcurrent}</TableCell>
                          <TableCell>{level.activation}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-surface text-foreground/70 rounded-xs px-3 py-2 text-xs">
                Upgrade by completing the required top-up amount for your target
                account level.
              </div>

              <Button className="h-9 w-full rounded-xs px-3 text-xs">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

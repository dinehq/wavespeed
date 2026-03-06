import { accountLevels, currentAccountLevel, settingsBasicInfo, settingsTeamMembers } from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductSettingsTab() {
  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        <ProductSectionHeader
          title="Profile Settings"
          description="Manage your personal information and account limits."
        />

        <section className="space-y-2">
          <h2 className="text-foreground font-display text-xl font-semibold tracking-tight">Basic Info</h2>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="space-y-4 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">Email</p>
                  <p className="text-foreground text-sm">{settingsBasicInfo.email}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">Username</p>
                  <p className="text-foreground text-sm">{settingsBasicInfo.username}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">
                  Login Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {settingsBasicInfo.loginMethods.map((method) => (
                    <Badge
                      key={method}
                      variant="outline"
                      className="border-foreground/10 bg-surface text-foreground rounded-xs px-2 py-1 text-[11px] font-normal"
                    >
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-foreground font-display text-xl font-semibold tracking-tight">My Team</h2>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="divide-foreground/10 divide-y p-0">
              {settingsTeamMembers.map((member) => (
                <div key={member.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <p className="text-foreground text-sm">{member.name}</p>
                  <Badge
                    variant="outline"
                    className="border-foreground/10 bg-surface text-foreground/70 rounded-xs px-2 py-0.5 text-[10px] tracking-[0.8px] uppercase"
                  >
                    {member.role}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-foreground font-display text-xl font-semibold tracking-tight">Account Level</h2>
            <Badge
              variant="outline"
              className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-2 py-0.5 text-[10px] tracking-[0.8px] text-[#3f74ff] uppercase"
            >
              {currentAccountLevel}
            </Badge>
          </div>
          <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
            <CardContent className="space-y-4 p-4">
              <p className="text-foreground/60 text-sm">
                WaveSpeedAI offers multiple account levels to match different throughput and concurrency requirements.
              </p>

              <div className="border-foreground/10 overflow-hidden rounded-xs border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground/10 hover:bg-transparent">
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Level</TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Images/min</TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Videos/min</TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Max Concurrent</TableHead>
                      <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Activation</TableHead>
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
                          <TableCell className="text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-foreground font-medium">{level.level}</span>
                              {isCurrent ? (
                                <Badge
                                  variant="outline"
                                  className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-1.5 py-0.5 text-[10px] text-[#3f74ff]"
                                >
                                  Current
                                </Badge>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{level.imagesPerMin}</TableCell>
                          <TableCell className="text-xs">{level.videosPerMin}</TableCell>
                          <TableCell className="text-xs">{level.maxConcurrent}</TableCell>
                          <TableCell className="text-xs">{level.activation}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-surface text-foreground/70 rounded-xs px-3 py-2 text-xs">
                Upgrade by completing the required top-up amount for your target account level.
              </div>

              <Button className="h-9 w-full rounded-xs px-4 text-xs tracking-[0.8px]">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

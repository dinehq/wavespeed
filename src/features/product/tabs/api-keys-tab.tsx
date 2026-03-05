import { Copy, ExternalLink, EyeOff } from "lucide-react";

import { apiKeyRecords } from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ProductApiKeysTabProps = {
  newApiKeyName: string;
  setNewApiKeyName: (name: string) => void;
  copyApiKey: (key: string) => void | Promise<void>;
};

export function ProductApiKeysTab({
  newApiKeyName,
  setNewApiKeyName,
  copyApiKey,
}: ProductApiKeysTabProps) {
  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        <ProductSectionHeader
          title="API Keys"
          actions={
            <Button
              variant="link"
              size="sm"
              className="text-foreground/70 hover:text-foreground h-8 px-0 text-xs tracking-[0.4px]"
            >
              How to use API key?
              <ExternalLink className="size-3.5" />
            </Button>
          }
        />

        <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
          <CardContent className="border-foreground/10 border-b p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={newApiKeyName}
                onChange={(event) => setNewApiKeyName(event.target.value)}
                placeholder="Enter key name"
                className="border-foreground/10 h-9 rounded-xs text-xs"
              />
              <Button
                className="h-9 min-w-[160px] rounded-xs px-4 text-xs tracking-[0.8px] sm:w-auto"
                onClick={() => setNewApiKeyName("")}
              >
                Create Key
              </Button>
            </div>
          </CardContent>
          <CardContent className="min-h-[420px] p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-foreground/10 hover:bg-transparent">
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Name</TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Key</TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Created</TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">Status</TableHead>
                  <TableHead className="text-foreground/50 text-right text-[10px] tracking-[1px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeyRecords.map((record) => (
                  <TableRow key={record.id} className="border-foreground/10 hover:bg-surface">
                    <TableCell className="text-xs">{record.name}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px]">{record.key}</span>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Copy API key"
                          onClick={() => copyApiKey(record.key)}
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Hide API key"
                          className="text-foreground/60 hover:text-foreground"
                        >
                          <EyeOff className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{record.createdAt}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-xs border-[#3f74ff]/30 bg-[#3f74ff]/8 px-2 py-0.5 text-[10px] text-[#3f74ff]"
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" className="h-7 rounded-xs px-2.5 text-xs tracking-[0.8px]">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

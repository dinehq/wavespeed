import { format } from "date-fns";
import { useState } from "react";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiKeyRecords } from "@/features/product/data/product-main-data";
import { ProductSectionHeader } from "@/features/product/components/product-section-header";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const maskApiKey = (key: string) =>
  key.length >= 8 ? `${key.slice(0, 8)}-••••••••` : "••••••••";

function generateKey(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type ApiKeyRecord = (typeof apiKeyRecords)[number];

type ProductApiKeysTabProps = {
  newApiKeyName: string;
  setNewApiKeyName: (name: string) => void;
  copyApiKey: (key: string) => void | Promise<void>;
};

const statusBadgeClass = (status: string) =>
  status === "Active"
    ? "rounded-xs border-0 px-2 py-1 text-[10px] tracking-[1px] bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
    : "rounded-xs border-0 px-2 py-1 text-[10px] tracking-[1px] bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300";

export function ProductApiKeysTab({
  newApiKeyName,
  setNewApiKeyName,
  copyApiKey,
}: ProductApiKeysTabProps) {
  const [visibleKeyIds, setVisibleKeyIds] = useState<Set<string>>(new Set());
  const [records, setRecords] = useState<ApiKeyRecord[]>(() => [
    ...apiKeyRecords,
  ]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [keyIdToDelete, setKeyIdToDelete] = useState<string | null>(null);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreateKey = () => {
    const name = newApiKeyName.trim();
    if (!name) return;
    setRecords((prev) => [
      ...prev,
      {
        id: `key-${Date.now()}`,
        name,
        key: generateKey(),
        createdAt: format(new Date(), "MM/dd/yyyy"),
        status: "Active",
      },
    ]);
    setNewApiKeyName("");
    toast({
      title: "Success",
      description: "Access key created successfully!",
    });
  };

  const openDeleteConfirm = (id: string) => {
    setKeyIdToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteKey = () => {
    if (!keyIdToDelete) return;
    setRecords((prev) => prev.filter((r) => r.id !== keyIdToDelete));
    setVisibleKeyIds((prev) => {
      const next = new Set(prev);
      next.delete(keyIdToDelete);
      return next;
    });
    setKeyIdToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setKeyIdToDelete(null);
  };

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
                className="border-foreground/10 h-9 rounded-xs bg-background text-xs"
              />
              <Button
                className="h-9 min-w-[160px] rounded-xs px-4 text-xs tracking-[0.8px] sm:w-auto"
                onClick={handleCreateKey}
              >
                Create Key
              </Button>
            </div>
          </CardContent>
          <CardContent className="min-h-[420px] p-0">
            {records.length === 0 ? (
              <div className="text-foreground/60 flex min-h-[320px] flex-col items-center justify-center gap-1 px-4 py-12 text-center text-sm">
                <p className="font-medium">No access keys found.</p>
                <p>Create one to get started.</p>
              </div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-foreground/10 hover:bg-transparent">
                  <TableHead className="text-foreground/50 pl-4 text-[10px] tracking-[1px]">
                    Name
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Key
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Created
                  </TableHead>
                  <TableHead className="text-foreground/50 text-[10px] tracking-[1px]">
                    Status
                  </TableHead>
                  <TableHead className="text-foreground/50 pr-4 text-right text-[10px] tracking-[1px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow
                    key={record.id}
                    className="border-foreground/10 hover:bg-surface"
                  >
                    <TableCell className="pl-4 text-xs">{record.name}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className="font-mono text-[11px] shrink-0">
                          {visibleKeyIds.has(record.id)
                            ? record.key
                            : maskApiKey(record.key)}
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5">
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
                          aria-label={
                            visibleKeyIds.has(record.id)
                              ? "Hide API key"
                              : "Show API key"
                          }
                          onClick={() => toggleKeyVisibility(record.id)}
                          className="text-foreground/60 hover:text-foreground"
                        >
                          {visibleKeyIds.has(record.id) ? (
                            <EyeOff className="size-3.5" />
                          ) : (
                            <Eye className="size-3.5" />
                          )}
                        </Button>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      {record.createdAt}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusBadgeClass(record.status)}
                      >
                        {record.status !== "Active" && (
                          <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-current" />
                        )}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Delete API key"
                        onClick={() => openDeleteConfirm(record.id)}
                        className="text-foreground/60 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={deleteConfirmOpen} onOpenChange={(open) => !open && closeDeleteConfirm()}>
          <AlertDialogContent className="rounded-xs">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete access key?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The key will stop working immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 gap-2">
              <AlertDialogCancel onClick={closeDeleteConfirm} className="rounded-xs">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteKey} className="rounded-xs">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

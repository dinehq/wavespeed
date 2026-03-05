import type { ReactNode } from "react";

type ProductHistoryTabProps = {
  requestsSection: ReactNode;
};

export function ProductHistoryTab({ requestsSection }: ProductHistoryTabProps) {
  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        {requestsSection}
      </div>
    </div>
  );
}

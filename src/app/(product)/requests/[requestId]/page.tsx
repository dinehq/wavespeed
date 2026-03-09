import { requests } from "@/features/product/data/product-main-data";

export function generateStaticParams() {
  return requests.map((request) => ({ requestId: request.id }));
}

type RequestDetailPageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { requestId } = await params;

  return (
    <section className="bg-background min-h-[60vh] px-6 py-10 md:px-20">
      <div className="border-foreground/10 bg-surface/30 mx-auto w-full max-w-[920px] rounded-xs border p-6">
        <p className="text-foreground/60 text-[11px] tracking-[0.8px] uppercase">
          Request ID
        </p>
        <p className="text-foreground mt-2 font-mono text-sm break-all">
          {requestId}
        </p>
        <h1 className="text-foreground mt-5 text-2xl font-semibold tracking-tight">
          Request details page is coming soon
        </h1>
        <p className="text-foreground/70 mt-2 text-sm">
          This is a placeholder page to make Request ID links clickable now.
        </p>
      </div>
    </section>
  );
}

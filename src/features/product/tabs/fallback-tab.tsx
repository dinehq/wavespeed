type ProductFallbackTabProps = {
  tab: string;
};

export function ProductFallbackTab({ tab }: ProductFallbackTabProps) {
  return (
    <div className="px-6 pt-6 md:px-20 md:pt-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="border-foreground/10 bg-background rounded-xs shadow-none">
          <div className="p-6">
            <p className="text-foreground text-sm">
              {tab} section is not configured yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import ArrowRight from "@/images/arrow-right.svg";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 pt-16 pb-16 md:px-20 md:pt-24">
      <div className="relative flex max-w-[788px] flex-col items-center gap-4 text-center">
        <h1 className="text-heading text-[36px] leading-none font-semibold tracking-[-1px] text-balance md:text-[72px]">
          The <em className="italic">All-in-One</em>
          <br className="hidden md:block" /> API for Inference.
        </h1>
        <p className="text-subtle font-mono text-[18px] leading-tight text-pretty">
          Build multimodal applications with a single high-speed interface.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-start">
        <a
          href="#"
          className="bg-foreground text-background hover:bg-foreground/80 flex items-center justify-center gap-3 rounded-xs px-8 py-4 transition-colors duration-150"
        >
          <span className="font-mono text-sm leading-4 font-medium tracking-[1.2px] uppercase">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
        <a
          href="#"
          className="bg-surface text-foreground hover:bg-foreground/10 flex items-center justify-center rounded-xs px-8 py-4 transition-colors duration-150"
        >
          <span className="font-mono text-sm leading-4 font-medium tracking-[1.2px] uppercase">
            Documentation
          </span>
        </a>
      </div>
    </section>
  );
}

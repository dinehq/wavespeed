import ArrowRight from "@/images/arrow-right.svg";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-16 lg:px-20">
      <div className="relative flex max-w-[788px] flex-col items-center gap-4 text-center">
        <h1 className="text-heading font-display text-4xl leading-none font-bold tracking-tight text-balance md:text-7xl">
          The Ultimate AI Media Generation Platform
        </h1>
        <p className="text-subtle font-mono text-lg leading-tight text-pretty">
          Build multimodal applications with a single high-speed interface.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-start">
        <a
          href="#"
          className="bg-foreground text-background hover:bg-foreground/80 flex items-center justify-center gap-3 rounded-xs px-8 py-4 transition-colors duration-150"
        >
          <span className="tracking-xl font-mono text-sm leading-4 uppercase">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
        <a
          href="#"
          className="bg-surface text-foreground hover:bg-foreground/10 flex items-center justify-center rounded-xs px-8 py-4 transition-colors duration-150"
        >
          <span className="tracking-xl font-mono text-sm leading-4 uppercase">
            Documentation
          </span>
        </a>
      </div>
    </section>
  );
}

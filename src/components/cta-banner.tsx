import ArrowRight from "@/images/arrow-right.svg";

export function CTABanner() {
  return (
    <section className="relative h-76 overflow-hidden">
      <div className="absolute inset-0 scale-[1.05]">
        <video
          src="/videos/get-started-bg.mp4"
          poster="/videos/get-started-bg_poster.webp"
          autoPlay
          loop
          muted
          playsInline
          className="size-full scale-105 object-cover blur-sm"
        />
      </div>
      <div className="absolute inset-0 dark:bg-black/50" />

      <div className="relative mx-auto flex h-full max-w-360 flex-col items-center justify-center gap-6 px-6 py-12 md:flex-row md:justify-between md:px-12 md:py-0 lg:px-20">
        <h2 className="font-display text-center text-2xl leading-none font-medium tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
          Unlock Your AI Potential Today
        </h2>

        <a
          href="#"
          className="flex shrink-0 items-center gap-3 rounded-xs bg-black px-8 py-4 text-white transition-colors duration-150 hover:bg-black/80"
        >
          <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

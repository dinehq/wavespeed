import ArrowRight from "@/images/arrow-right.svg";

export function CTABanner() {
  return (
    <section className="relative h-auto overflow-hidden md:h-[302px]">
      <div className="absolute inset-0">
        <video
          src="/videos/get-started-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="size-full scale-105 object-cover blur-sm"
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center gap-6 px-6 py-12 md:flex-row md:justify-between md:px-0 md:py-0">
        <h2 className="text-center text-[32px] leading-none font-medium tracking-[-1px] text-balance text-black md:text-left md:text-[48px]">
          Unlock Your AI Potential Today
        </h2>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xs bg-black px-8 py-4 text-white transition-colors duration-150 hover:bg-black/80"
        >
          <span className="font-mono text-sm leading-4 font-medium tracking-[1.2px] uppercase">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

import ArrowRight from "@/images/arrow-right.svg";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-10 px-20 pt-24 pb-16 overflow-hidden">
      <div className="relative flex flex-col items-center gap-4 text-center max-w-[788px]">
        <h1 className="text-[72px] font-semibold leading-none tracking-[-1px] text-heading">
          The <em className="italic">All-in-One</em>
          <br />
          API for Inference.
        </h1>
        <p className="font-mono text-[18px] leading-tight text-subtle">
          Build multimodal applications with a single high-speed interface.
        </p>
      </div>

      <div className="relative flex items-start gap-2">
        <a
          href="#"
          className="bg-black text-white rounded-sm px-[30px] py-4 flex items-center gap-3 transition-colors duration-150 hover:bg-black/80"
        >
          <span className="font-mono text-sm font-medium tracking-[1.2px] uppercase leading-4">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
        <a
          href="#"
          className="bg-surface text-black rounded-sm px-[33px] py-4 flex items-center justify-center transition-colors duration-150 hover:bg-black/10"
        >
          <span className="font-mono text-sm font-medium tracking-[1.2px] uppercase leading-4">
            Documentation
          </span>
        </a>
      </div>
    </section>
  );
}

import Image from "next/image";
import ArrowRight from "@/images/arrow-right.svg";

export function CTABanner() {
  return (
    <section className="relative h-auto md:h-[302px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/get-started-bg.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 px-6 md:px-0 py-12 md:py-0">
        <h2 className="text-[32px] md:text-[48px] font-medium leading-none tracking-[-1px] text-heading text-center md:text-left">
          Unlock Your AI Potential Today
        </h2>

        <a
          href="#"
          className="bg-black text-white rounded-xs px-[30px] py-4 flex items-center gap-3 transition-colors duration-150 hover:bg-black/80"
        >
          <span className="font-mono text-sm font-medium tracking-[1.2px] uppercase leading-4">
            Start Building
          </span>
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

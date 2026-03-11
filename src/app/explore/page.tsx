import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <main>
      <Navbar />
      <section className="px-6 pt-10 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-heading font-display text-3xl font-medium tracking-tight md:text-5xl">
              Explore Models
            </h1>
            <p className="text-subtle max-w-2xl font-mono text-sm">
              Browse production-ready models and open each model playground,
              API config, and usage history in one place.
            </p>
          </div>

          <Link
            href="/models/google/nano-banana-pro/edit"
            className="border-foreground/10 bg-background hover:bg-surface flex flex-col gap-4 rounded-md border p-6 transition-colors md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-col gap-2">
              <p className="text-foreground font-mono text-base">
                google/nano-banana-pro/edit
              </p>
              <p className="text-subtle font-mono text-sm">
                Gemini 3.0 Pro Image Edit model page with Playground, API, and
                History.
              </p>
            </div>
            <span className="bg-foreground text-background inline-flex h-8 items-center rounded-xs px-3 text-xs font-bold">
              Open Model
            </span>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

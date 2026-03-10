import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function StudioPage() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-foreground font-display text-2xl font-bold tracking-tight">
            Studio
          </h1>
          <p className="text-foreground/60 mt-2 text-sm">
            Create with AI models. Coming soon.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

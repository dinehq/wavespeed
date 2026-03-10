import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function InspirationPage() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-foreground font-display text-2xl font-bold tracking-tight">
            Inspiration
          </h1>
          <p className="text-foreground/60 mt-2 text-sm">
            Gallery and showcases. Coming soon.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

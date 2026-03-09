import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar mode="dashboard" />
      <Suspense>{children}</Suspense>
      <Footer />
    </main>
  );
}

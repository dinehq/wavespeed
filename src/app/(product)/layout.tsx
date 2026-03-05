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
      {children}
      <Footer />
    </main>
  );
}

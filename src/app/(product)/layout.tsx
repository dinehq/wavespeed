import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FakeAuthGuard } from "@/components/auth/fake-auth-guard";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar mode="dashboard" />
      <FakeAuthGuard>
        <Suspense>{children}</Suspense>
      </FakeAuthGuard>
      <Footer />
    </main>
  );
}

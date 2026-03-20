import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FakeAuthGuard } from "@/components/auth/fake-auth-guard";
import { TeamProvider } from "@/features/product/team-context";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <TeamProvider>
        <Navbar mode="dashboard" />
        <FakeAuthGuard>
          <Suspense>{children}</Suspense>
        </FakeAuthGuard>
      </TeamProvider>
      <Footer />
    </main>
  );
}

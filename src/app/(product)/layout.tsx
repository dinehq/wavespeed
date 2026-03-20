"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FakeAuthGuard } from "@/components/auth/fake-auth-guard";
import { TeamProvider } from "@/features/product/team-context";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicModelsRoute =
    pathname === "/models" || pathname.startsWith("/models/");

  if (isPublicModelsRoute) {
    return (
      <main>
        <Navbar />
        <Suspense>{children}</Suspense>
        <Footer />
      </main>
    );
  }

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

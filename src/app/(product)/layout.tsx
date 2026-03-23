"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FakeAuthGuard } from "@/components/auth/fake-auth-guard";
import { TeamProvider } from "@/features/product/team-context";

function PublicModelsNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isExploreEntry = searchParams.get("entry") === "explore";
  const useDashboardNavbarOnPublicRoute =
    pathname.startsWith("/models/") &&
    pathSegments.length >= 3 &&
    !isExploreEntry;
  const isCollectionRoute = pathname.startsWith("/collections/");

  return (
    <Navbar
      mode={useDashboardNavbarOnPublicRoute ? "dashboard" : "default"}
      overlay={isCollectionRoute}
    />
  );
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicModelsRoute =
    pathname === "/models" ||
    pathname.startsWith("/models/") ||
    pathname === "/collections" ||
    pathname.startsWith("/collections/");

  if (isPublicModelsRoute) {
    return (
      <main>
        <TeamProvider>
          <Suspense fallback={<Navbar mode="dashboard" />}>
            <PublicModelsNavbar />
          </Suspense>
          <Suspense>{children}</Suspense>
        </TeamProvider>
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

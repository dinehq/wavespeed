"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isFakeSignedIn } from "@/lib/fake-auth";
import type { ReactNode } from "react";

export function FakeAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const signedIn = isFakeSignedIn();
    if (!signedIn) {
      router.replace("/sign-in");
      queueMicrotask(() => setReady(true));
      return;
    }
    queueMicrotask(() => {
      setAllowed(true);
      setReady(true);
    });
  }, [router]);

  if (!ready || !allowed) {
    return null;
  }

  return <>{children}</>;
}

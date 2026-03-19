"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFakeSignedIn } from "@/lib/fake-auth";

export function FakeAuthRedirect({
  when,
  to,
}: {
  when: "signed-in" | "signed-out";
  to: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const signedIn = isFakeSignedIn();
    const shouldRedirect =
      (when === "signed-in" && signedIn) ||
      (when === "signed-out" && !signedIn);

    if (shouldRedirect) {
      router.replace(to);
    }
  }, [router, to, when]);

  return null;
}

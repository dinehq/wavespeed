"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "wavespeed-cookie-consent";

type ConsentState = "accepted" | "rejected" | "pending";

function subscribe(cb: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) cb();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshot(): ConsentState {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {}
  return "pending";
}

function getServerSnapshot(): ConsentState {
  return "accepted"; // SSR: assume accepted so banner doesn't flash
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const respond = useCallback((choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, choice);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  if (consent !== "pending") return null;

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 fixed right-4 bottom-4 left-4 z-50 duration-300 sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-xl"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="border-foreground/5 bg-background flex flex-col gap-3 rounded-xs border p-4 shadow-lg sm:flex-row sm:items-center sm:gap-4">
        <p className="text-foreground/70 min-w-0 shrink text-sm leading-snug">
          We use cookies to improve your experience and analyze website traffic.{" "}
          <a
            href="https://wavespeed.ai/static/privacy"
            className="text-foreground hover:text-foreground/60 underline underline-offset-2 transition-colors duration-150"
          >
            Learn more
          </a>
        </p>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <button
            onClick={() => respond("rejected")}
            className="border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 h-8 cursor-pointer rounded-xs border px-3 font-mono text-xs font-medium shadow-xs transition-colors duration-150"
          >
            Reject
          </button>
          <button
            onClick={() => respond("accepted")}
            className="bg-foreground text-background hover:bg-foreground/80 h-8 cursor-pointer rounded-xs px-3 font-mono text-xs font-medium transition-colors duration-150"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

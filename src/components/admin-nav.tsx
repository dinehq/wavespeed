"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/admin/ls", label: "All" },
  { href: "/admin/guidelines", label: "Guidelines" },
  { href: "/admin/components", label: "Components" },
  { href: "/admin/brand", label: "Brand" },
  { href: "/admin/slideshow", label: "Slideshow" },
  { href: "/admin/promo", label: "Promo" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex items-center gap-1 font-mono text-xs">
      {pages.map((page) => {
        const active = pathname === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            className={`rounded-sm px-2 py-1 transition-colors ${
              active
                ? "bg-foreground/10 text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}

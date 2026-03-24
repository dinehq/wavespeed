import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { posts } from "@/app/blog/data";

/* ------------------------------------------------------------------ */
/*  Scan src/app/ for page.tsx files at build time                     */
/* ------------------------------------------------------------------ */

type DiscoveredRoute = { path: string; group: string | null };

function discoverRoutes(): DiscoveredRoute[] {
  const appDir = path.join(process.cwd(), "src/app");
  const routes: DiscoveredRoute[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (entry.name === "page.tsx") {
        const rel = path.relative(appDir, dir).replace(/\\/g, "/");

        // Skip dynamic routes (contain [param])
        if (/\[/.test(rel)) continue;

        // Extract route group name before stripping
        const groupMatch = rel.match(/^\(([^)]+)\)/);
        const group = groupMatch ? groupMatch[1] : null;

        const route = rel.replace(/\(.*?\)\/?/g, "");
        routes.push({ path: "/" + route, group });
      }
    }
  }

  walk(appDir);

  // Expand known dynamic routes
  for (const post of posts) {
    routes.push({ path: `/blog/posts/${post.slug}`, group: null });
  }

  // Deduplicate by path
  const seen = new Set<string>();
  return routes
    .filter((r) => {
      if (seen.has(r.path)) return false;
      seen.add(r.path);
      return true;
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

/* ------------------------------------------------------------------ */
/*  Group routes into sections                                         */
/* ------------------------------------------------------------------ */

const sectionLabels: Record<string, string> = {
  marketing: "Marketing",
  landing: "Landing Pages",
  product: "Product",
  admin: "Admin",
  demo: "Demo",
};

const sectionOrder = Object.keys(sectionLabels);

function classifyRoute(route: DiscoveredRoute): string {
  if (route.path === "/") return "marketing";

  const segments = route.path.split("/").filter(Boolean);
  const first = segments[0] ?? "";

  if (first === "landing") return "landing";
  if (first === "admin") return "admin";
  if (first === "demo") return "demo";
  if (route.group === "product") return "product";

  return "marketing";
}

function groupRoutes(routes: DiscoveredRoute[]) {
  const groups = new Map<string, DiscoveredRoute[]>();

  for (const route of routes) {
    const key = classifyRoute(route);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(route);
  }

  return sectionOrder
    .filter((key) => groups.has(key))
    .map((key) => ({
      key,
      label: sectionLabels[key],
      routes: groups.get(key)!,
    }));
}

function routeLabel(route: string): string {
  if (route === "/") return "Home";
  return route
    .split("/")
    .filter(Boolean)
    .map((s) =>
      s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    )
    .join(" / ");
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdminLs() {
  const routes = discoverRoutes();
  const grouped = groupRoutes(routes);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display mb-2 text-2xl font-bold tracking-tight">
        All Pages
      </h1>
      <p className="text-foreground/50 mb-10 font-mono text-xs">
        {routes.length} routes
      </p>

      <div className="flex flex-col gap-10">
        {grouped.map((section) => (
          <div key={section.key}>
            <h2 className="text-foreground/40 tracking-xl mb-3 font-mono text-xs uppercase">
              {section.label}
            </h2>
            <div className="flex flex-col">
              {section.routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group border-foreground/5 hover:bg-foreground/[0.02] flex items-center justify-between gap-4 border-b py-2.5 transition-colors"
                >
                  <span className="text-foreground/80 group-hover:text-foreground text-sm">
                    {routeLabel(route.path)}
                  </span>
                  <code className="text-foreground/30 group-hover:text-foreground/50 font-mono text-xs transition-colors">
                    {route.path}
                  </code>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

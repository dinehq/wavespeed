export const productMainTabs = [
  "Dashboard",
  "Explore",
  "Usage",
  "History",
  "LLM",
  "Serverless",
  "API Keys",
  "Billing",
  "Settings",
] as const;

export type ProductMainTab = (typeof productMainTabs)[number];

export const isProductMainTab = (value: string): value is ProductMainTab =>
  (productMainTabs as readonly string[]).includes(value);

export const productMainTabRoutes: Partial<Record<ProductMainTab, string>> = {
  Dashboard: "/dashboard",
  Explore: "/models",
  Usage: "/usage",
  History: "/history",
  LLM: "/llm",
  Serverless: "/serverless",
  "API Keys": "/api-keys",
  Billing: "/billing",
  Settings: "/settings",
};

export const resolveProductMainTabFromPathname = (
  pathname: string,
): ProductMainTab | null => {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/models":
      return "Explore";
    case "/usage":
      return "Usage";
    case "/history":
      return "History";
    case "/llm":
      return "LLM";
    case "/serverless":
      return "Serverless";
    case "/api-keys":
      return "API Keys";
    case "/billing":
      return "Billing";
    case "/settings":
      return "Settings";
    default:
      return null;
  }
};

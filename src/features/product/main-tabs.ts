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
  Dashboard: "/product/dashboard",
  Explore: "/product/explore",
  Usage: "/product/usage",
  History: "/product/history",
  LLM: "/product/llm",
  Serverless: "/product/serverless",
  "API Keys": "/product/api-keys",
  Billing: "/product/billing",
  Settings: "/product/settings",
};

export const resolveProductMainTabFromPathname = (
  pathname: string,
): ProductMainTab | null => {
  switch (pathname) {
    case "/product/dashboard":
      return "Dashboard";
    case "/product/explore":
      return "Explore";
    case "/product/usage":
      return "Usage";
    case "/product/history":
      return "History";
    case "/product/llm":
      return "LLM";
    case "/product/serverless":
      return "Serverless";
    case "/product/api-keys":
      return "API Keys";
    case "/product/billing":
      return "Billing";
    case "/product/settings":
      return "Settings";
    default:
      return null;
  }
};

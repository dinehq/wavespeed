"use client";

import { useState, useRef, useEffect } from "react";
import {
  Activity,
  AlignLeft,
  ArrowRight,
  CalendarIcon,
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlert,
  Copy,
  DollarSign,
  Download,
  Expand,
  ExternalLink,
  Eye,
  EyeOff,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Pencil,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import LogoSvg from "@/images/logo.svg";
import PaymentMethodSvg from "@/images/payment-method.svg";
import PaymentKrwSvg from "@/images/payment-krw.svg";
import PaymentPaypalSvg from "@/images/payment-paypal.svg";
import PaymentStripeSvg from "@/images/payment-stripe.svg";
import PaymentWechatAliSvg from "@/images/payment-wechat-ali.svg";
import ArrowRightSvg from "@/images/arrow-right.svg";
import ChevronDownSvg from "@/images/chevron-down.svg";
import SearchSvg from "@/images/search-icon.svg";
import TabIconChatSvg from "@/images/tab-icon-chat.svg";
import TabIconImageSvg from "@/images/tab-icon-image.svg";
import TabIconSpeechSvg from "@/images/tab-icon-speech.svg";
import TabIconVideoSvg from "@/images/tab-icon-video.svg";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/*  Shared classes from product-main.tsx                                */
/* ------------------------------------------------------------------ */

const controlButtonClass =
  "border-foreground/10 text-foreground/80 hover:bg-foreground/5 text-xs shadow-xs";
const controlButtonSmClass = `${controlButtonClass} h-8 rounded-xs px-3`;

/* ------------------------------------------------------------------ */
/*  Navigation structure                                               */
/* ------------------------------------------------------------------ */

const navSections = [
  {
    group: "Foundation",
    items: [
      { id: "logo-svg", label: "Logo SVG" },
      { id: "billing-svg", label: "Billing SVG" },
      { id: "icons-svg", label: "Icons SVG" },
      { id: "fonts", label: "Fonts" },
      { id: "headings", label: "Headings" },
      { id: "body-text", label: "Body Text" },
      { id: "tracking", label: "Letter Spacing" },
      { id: "text-colors", label: "Text Colors" },
      { id: "bg-colors", label: "Backgrounds" },
      { id: "border-colors", label: "Borders" },
      { id: "status-badges", label: "Status Badges" },
    ],
  },
  {
    group: "Controls",
    items: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
      { id: "select", label: "Select" },
      { id: "switch", label: "Switch" },
      { id: "popover", label: "Popover" },
      { id: "datepicker", label: "Datepicker" },
    ],
  },
  {
    group: "Layout",
    items: [
      { id: "card", label: "Card" },
      { id: "table", label: "Table" },
      { id: "tabs", label: "Tabs" },
      { id: "nav-tabs", label: "Navigation" },
    ],
  },
  {
    group: "Feedback",
    items: [
      { id: "alert-dialog", label: "Alert Dialog" },
      { id: "toast", label: "Toast" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground/40 mb-2 font-mono text-xs">{children}</p>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DesignSystemPage() {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [activeId, setActiveId] = useState("fonts");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Intersection observer to highlight active nav item on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const el of sectionRefs.current.values()) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  return (
    <div className="px-6 pt-6 pb-16 md:px-12 md:pt-8 md:pb-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        {/* Page title */}
        <div className="pb-3">
          <h1 className="text-heading text-3xl leading-none font-semibold">
            Design System
          </h1>
        </div>

        <div className="flex gap-12">
          {/* ── Sidebar ── */}
          <nav className="sticky top-20 hidden h-fit w-44 shrink-0 lg:block">
            <div className="flex flex-col gap-5">
              {navSections.map((section) => (
                <div key={section.group}>
                  <p className="text-foreground/40 tracking-xl mb-2 font-mono text-xs uppercase">
                    {section.group}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById(item.id)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`block rounded-xs px-2 py-1 text-sm transition-colors ${
                            activeId === item.id
                              ? "bg-foreground/5 text-foreground font-medium"
                              : "text-foreground/50 hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* ── Content ── */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-16">
              {/* ====================================================== */}
              {/*  FOUNDATION                                             */}
              {/* ====================================================== */}

              {/* Logo SVG */}
              <section id="logo-svg" ref={setRef("logo-svg")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Logo SVG
                </h2>
                <Label>Brand logo asset</Label>
                <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="bg-surface border-foreground/10 flex min-h-24 items-center justify-center rounded-xs border px-4 py-6">
                      <LogoSvg
                        className="h-7 w-auto"
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </div>
                    <p className="text-foreground/50 mt-3 font-mono text-xs">
                      @/images/logo.svg
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Billing SVG */}
              <section id="billing-svg" ref={setRef("billing-svg")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Billing SVG
                </h2>
                <Label>Billing tab payment assets</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      name: "Payment Method",
                      Svg: PaymentMethodSvg,
                      path: "@/images/payment-method.svg",
                    },
                    {
                      name: "Stripe",
                      Svg: PaymentStripeSvg,
                      path: "@/images/payment-stripe.svg",
                    },
                    {
                      name: "PayPal",
                      Svg: PaymentPaypalSvg,
                      path: "@/images/payment-paypal.svg",
                    },
                    {
                      name: "KRW Pay",
                      Svg: PaymentKrwSvg,
                      path: "@/images/payment-krw.svg",
                    },
                    {
                      name: "WeChat / AliPay",
                      Svg: PaymentWechatAliSvg,
                      path: "@/images/payment-wechat-ali.svg",
                    },
                  ].map((asset) => (
                    <Card
                      key={asset.name}
                      className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none"
                    >
                      <CardContent className="p-4">
                        <p className="text-foreground mb-3 text-sm font-medium">
                          {asset.name}
                        </p>
                        <div className="bg-surface border-foreground/10 flex h-11 items-center justify-center rounded-xs border px-3">
                          <asset.Svg
                            className="max-h-full w-auto max-w-full shrink-0"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        </div>
                        <p className="text-foreground/50 mt-2 truncate font-mono text-xs">
                          {asset.path}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Icons SVG */}
              <section id="icons-svg" ref={setRef("icons-svg")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Icons SVG
                </h2>
                <Label>Lucide icons and SVG assets used in project</Label>
                <div className="mb-6">
                  <p className="text-foreground/60 tracking-lg mb-2 text-xs font-medium uppercase">
                    Lucide Icons (used in project)
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {[
                      { name: "Activity", Icon: Activity },
                      { name: "AlignLeft", Icon: AlignLeft },
                      { name: "ArrowRight", Icon: ArrowRight },
                      { name: "CalendarIcon", Icon: CalendarIcon },
                      { name: "Check", Icon: Check },
                      { name: "CheckIcon", Icon: CheckIcon },
                      { name: "ChevronDownIcon", Icon: ChevronDownIcon },
                      { name: "ChevronLeft", Icon: ChevronLeft },
                      { name: "ChevronLeftIcon", Icon: ChevronLeftIcon },
                      { name: "ChevronRight", Icon: ChevronRight },
                      { name: "ChevronRightIcon", Icon: ChevronRightIcon },
                      { name: "ChevronUpIcon", Icon: ChevronUpIcon },
                      { name: "CircleAlert", Icon: CircleAlert },
                      { name: "Copy", Icon: Copy },
                      { name: "DollarSign", Icon: DollarSign },
                      { name: "Download", Icon: Download },
                      { name: "Expand", Icon: Expand },
                      { name: "ExternalLink", Icon: ExternalLink },
                      { name: "Eye", Icon: Eye },
                      { name: "EyeOff", Icon: EyeOff },
                      { name: "Info", Icon: Info },
                      { name: "Layers", Icon: Layers },
                      { name: "LayoutGrid", Icon: LayoutGrid },
                      { name: "Menu", Icon: Menu },
                      { name: "Pencil", Icon: Pencil },
                      { name: "Search", Icon: Search },
                      { name: "Star", Icon: Star },
                      { name: "Trash2", Icon: Trash2 },
                      { name: "X", Icon: X },
                    ].map((asset) => (
                      <div
                        key={asset.name}
                        className="border-foreground/10 bg-background rounded-xs border p-3"
                      >
                        <div className="bg-surface border-foreground/10 flex h-11 items-center justify-center rounded-xs border">
                          <asset.Icon className="text-foreground/80 size-5" />
                        </div>
                        <p className="text-foreground mt-2 text-xs font-medium">
                          {asset.name}
                        </p>
                        <p className="text-foreground/50 font-mono text-[11px]">
                          lucide-react
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-foreground/60 tracking-lg mb-2 text-xs font-medium uppercase">
                  SVG Assets
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {[
                    {
                      name: "Arrow Right",
                      Svg: ArrowRightSvg,
                      path: "@/images/arrow-right.svg",
                    },
                    {
                      name: "Chevron Down",
                      Svg: ChevronDownSvg,
                      path: "@/images/chevron-down.svg",
                    },
                    {
                      name: "Search",
                      Svg: SearchSvg,
                      path: "@/images/search-icon.svg",
                    },
                    {
                      name: "Tab Chat",
                      Svg: TabIconChatSvg,
                      path: "@/images/tab-icon-chat.svg",
                    },
                    {
                      name: "Tab Image",
                      Svg: TabIconImageSvg,
                      path: "@/images/tab-icon-image.svg",
                    },
                    {
                      name: "Tab Speech",
                      Svg: TabIconSpeechSvg,
                      path: "@/images/tab-icon-speech.svg",
                    },
                    {
                      name: "Tab Video",
                      Svg: TabIconVideoSvg,
                      path: "@/images/tab-icon-video.svg",
                    },
                  ].map((asset) => (
                    <div
                      key={asset.name}
                      className="border-foreground/10 bg-background rounded-xs border p-3"
                    >
                      <div className="bg-surface border-foreground/10 flex h-11 items-center justify-center rounded-xs border">
                        <asset.Svg
                          className="max-h-6 w-auto max-w-full shrink-0"
                          preserveAspectRatio="xMidYMid meet"
                        />
                      </div>
                      <p className="text-foreground mt-2 text-xs font-medium">
                        {asset.name}
                      </p>
                      <p className="text-foreground/50 truncate font-mono text-[11px]">
                        {asset.path}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fonts */}
              <section id="fonts" ref={setRef("fonts")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Fonts
                </h2>
                <div className="flex flex-col gap-5">
                  <div>
                    <Label>
                      font-sans (Geist Sans) — body text, buttons, forms
                    </Label>
                    <p className="text-xl">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  <div>
                    <Label>
                      font-mono (Geist Mono) — API keys, breadcrumbs, tags, code
                    </Label>
                    <p className="font-mono text-xl">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                </div>
              </section>

              {/* Headings */}
              <section id="headings" ref={setRef("headings")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Headings
                </h2>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label>
                      Page title — text-heading text-3xl leading-none
                      font-semibold (ProductSectionHeader)
                    </Label>
                    <h1 className="text-heading text-3xl leading-none font-semibold">
                      Dashboard
                    </h1>
                  </div>
                  <div>
                    <Label>
                      Card section — text-foreground text-xl font-semibold
                      (Usage breakdown, CardTitle)
                    </Label>
                    <h2 className="text-foreground text-xl font-semibold">
                      Usage breakdown
                    </h2>
                  </div>
                  <div>
                    <Label>
                      Settings section — text-foreground text-base font-semibold
                    </Label>
                    <h2 className="text-foreground text-base font-semibold">
                      Basic Info
                    </h2>
                  </div>
                  <div>
                    <Label>
                      Card title — text-foreground text-base font-semibold
                      (CardTitle, getting started)
                    </Label>
                    <p className="text-foreground text-base font-semibold">
                      Welcome to WaveSpeed
                    </p>
                  </div>
                  <div>
                    <Label>
                      Summary stat — text-foreground text-2xl leading-none
                      font-semibold
                    </Label>
                    <p className="text-foreground text-2xl leading-none font-semibold">
                      $12.50
                    </p>
                  </div>
                </div>
              </section>

              {/* Body Text */}
              <section id="body-text" ref={setRef("body-text")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Body Text
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>
                      text-foreground text-sm — primary body (model names, list
                      items)
                    </Label>
                    <p className="text-foreground text-sm">
                      google/nano-banana-2/text-to-image
                    </p>
                  </div>
                  <div>
                    <Label>
                      text-subtle text-sm — card description (CardDescription)
                    </Label>
                    <p className="text-subtle text-sm leading-5">
                      Complete setup to unlock the full speed of your account.
                    </p>
                  </div>
                  <div>
                    <Label>
                      text-foreground/60 text-xs — field labels (Settings rows)
                    </Label>
                    <p className="text-foreground/60 text-xs">Email</p>
                  </div>
                  <div>
                    <Label>
                      text-foreground/50 text-xs leading-tight — secondary meta
                      (model type)
                    </Label>
                    <p className="text-foreground/50 text-xs leading-tight">
                      text-to-video
                    </p>
                  </div>
                  <div>
                    <Label>
                      text-foreground/70 text-xs — footnotes (Total predictions)
                    </Label>
                    <p className="text-foreground/70 text-xs">
                      Total 1,247 predictions
                    </p>
                  </div>
                  <div>
                    <Label>font-mono — API key, code values</Label>
                    <p className="font-mono text-sm">
                      a3f8c2e1-9d4b-4f6e-b7a1-2c5d8e9f0a3b
                    </p>
                  </div>
                </div>
              </section>

              {/* Letter Spacing */}
              <section id="tracking" ref={setRef("tracking")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Letter Spacing
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      cls: "tracking-tighter",
                      usage:
                        "Collection hero headings (font-display text-4xl+)",
                    },
                    {
                      cls: "tracking-tight",
                      usage: "Collection section headers (text-lg font-bold)",
                    },
                    {
                      cls: "tracking-lg",
                      usage: "Table headers, status badges, uppercase labels",
                    },
                    {
                      cls: "tracking-xl",
                      usage: "Product top tabs navigation",
                    },
                  ].map((t) => (
                    <div
                      key={t.cls}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <p className={`text-lg font-semibold ${t.cls}`}>
                        {t.cls}
                      </p>
                      <p className="text-foreground/40 shrink-0 font-mono text-xs">
                        {t.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Text Colors */}
              <section id="text-colors" ref={setRef("text-colors")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Text Colors
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {[
                    {
                      name: "Foreground",
                      bg: "bg-foreground",
                      cls: "text-foreground",
                    },
                    {
                      name: "Heading",
                      bg: "bg-heading",
                      cls: "text-heading",
                    },
                    {
                      name: "Subtle",
                      bg: "bg-subtle",
                      cls: "text-subtle",
                    },
                    {
                      name: "Muted FG",
                      bg: "bg-muted-foreground",
                      cls: "text-muted-foreground",
                    },
                    {
                      name: "Brand",
                      bg: "bg-brand",
                      cls: "text-brand",
                    },
                    {
                      name: "FG /80",
                      bg: "bg-foreground/80",
                      cls: "text-foreground/80",
                    },
                    {
                      name: "FG /70",
                      bg: "bg-foreground/70",
                      cls: "text-foreground/70",
                    },
                    {
                      name: "FG /60",
                      bg: "bg-foreground/60",
                      cls: "text-foreground/60",
                    },
                    {
                      name: "FG /50",
                      bg: "bg-foreground/50",
                      cls: "text-foreground/50",
                    },
                    {
                      name: "FG /40",
                      bg: "bg-foreground/40",
                      cls: "text-foreground/40",
                    },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div
                        className={`border-foreground/10 size-9 shrink-0 rounded-xs border ${c.bg}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm">{c.name}</p>
                        <p className="text-foreground/40 font-mono text-xs">
                          {c.cls}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Background Colors */}
              <section id="bg-colors" ref={setRef("bg-colors")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Backgrounds
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {[
                    { name: "Background", bg: "bg-background" },
                    { name: "Surface", bg: "bg-surface" },
                    { name: "Muted", bg: "bg-muted" },
                    { name: "Panel", bg: "bg-panel" },
                    { name: "Panel Alt", bg: "bg-panel-alt" },
                    { name: "Primary (btn)", bg: "bg-primary" },
                    { name: "FG (inverted btn)", bg: "bg-foreground" },
                    { name: "FG /5 (hover)", bg: "bg-foreground/5" },
                    { name: "Brand", bg: "bg-brand" },
                    { name: "Destructive", bg: "bg-destructive" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div
                        className={`border-foreground/10 size-9 shrink-0 rounded-xs border ${c.bg}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm">{c.name}</p>
                        <p className="text-foreground/40 font-mono text-xs">
                          {c.bg}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Border Colors */}
              <section id="border-colors" ref={setRef("border-colors")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Borders
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {[
                    {
                      name: "FG /10",
                      bg: "bg-foreground/10",
                      cls: "border-foreground/10",
                    },
                    {
                      name: "FG /8",
                      bg: "bg-foreground/8",
                      cls: "border-foreground/8",
                    },
                    {
                      name: "FG /5",
                      bg: "bg-foreground/5",
                      cls: "border-foreground/5",
                    },
                    {
                      name: "Border",
                      bg: "bg-border",
                      cls: "border-border",
                    },
                    {
                      name: "Input",
                      bg: "bg-input",
                      cls: "border-input",
                    },
                    {
                      name: "Brand",
                      bg: "bg-brand",
                      cls: "border-brand",
                    },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div
                        className={`border-foreground/10 size-9 shrink-0 rounded-xs border ${c.bg}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm">{c.name}</p>
                        <p className="text-foreground/40 font-mono text-xs">
                          {c.cls}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Status Badges */}
              <section id="status-badges" ref={setRef("status-badges")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Status Badges
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="tracking-lg rounded-xs border-0 bg-emerald-500/15 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                  >
                    Active
                  </Badge>
                  <Badge
                    variant="outline"
                    className="tracking-lg rounded-xs border-0 bg-amber-500/15 px-2 py-1 text-xs text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                  >
                    Inactive
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-xs border-0 bg-amber-100 px-2 py-0.5 text-xs text-amber-800"
                  >
                    Bronze
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-xs border-0 bg-slate-200 px-2 py-0.5 text-xs text-slate-700"
                  >
                    Silver
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-xs border-0 bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800"
                  >
                    Gold
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-xs border-0 bg-violet-100 px-2 py-0.5 text-xs text-violet-800"
                  >
                    Ultra
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-surface text-foreground/70 rounded-xs border-0 px-2 py-0.5 text-xs uppercase"
                  >
                    Owner
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-xs border-0 bg-[#3f74ff]/8 px-1.5 py-0.5 text-xs text-[#3f74ff]"
                  >
                    Current
                  </Badge>
                </div>
              </section>

              {/* ====================================================== */}
              {/*  CONTROLS                                               */}
              {/* ====================================================== */}

              {/* Button */}
              <section id="button" ref={setRef("button")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Button
                </h2>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label>
                      Primary — h-8 rounded-xs px-3 text-xs (Create Key, Upgrade
                      Now)
                    </Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button className="h-8 rounded-xs px-3 text-xs">
                        Create Key
                      </Button>
                      <Button className="h-8 w-full max-w-48 rounded-xs px-3 text-xs">
                        Upgrade Now
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>
                      Inverted — bg-foreground text-background (primary CTA in
                      cards)
                    </Label>
                    <Button
                      size="sm"
                      className="bg-foreground text-background hover:bg-foreground/80 h-8 shrink-0 rounded-xs px-3 text-xs shadow-xs"
                    >
                      Add funds
                    </Button>
                  </div>

                  <div>
                    <Label>
                      Control button — outline with product styling
                      (controlButtonSmClass)
                    </Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={controlButtonSmClass}
                      >
                        <Download className="size-3.5" />
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={controlButtonSmClass}
                      >
                        Show Getting started
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${controlButtonSmClass} h-8 shrink-0`}
                      >
                        View all models
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>
                      Quick range active/inactive toggle pattern (Usage tab)
                    </Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="xs"
                        className="border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background h-8 min-w-10 rounded-xs px-2 text-xs"
                      >
                        7d
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className={`h-8 min-w-10 rounded-xs px-2 text-xs ${controlButtonClass}`}
                      >
                        30d
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>
                      Icon buttons — ghost icon-xs (copy, eye, delete in tables)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-foreground/60 hover:text-foreground"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-foreground/60 hover:text-foreground"
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-foreground/60 hover:text-foreground"
                      >
                        <EyeOff className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-foreground/60 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>
                      Link button — variant=&quot;link&quot; (How to use API
                      key?)
                    </Label>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-foreground/70 hover:text-foreground h-8 px-0 text-xs"
                    >
                      How to use API key?
                    </Button>
                  </div>
                </div>
              </section>

              {/* Input */}
              <section id="input" ref={setRef("input")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Input
                </h2>
                <div className="flex max-w-sm flex-col gap-4">
                  <div>
                    <Label>
                      Standard — border-foreground/10 bg-background h-8
                      rounded-xs text-xs
                    </Label>
                    <Input
                      placeholder="Enter key name"
                      className="border-foreground/10 bg-background h-8 rounded-xs text-xs"
                    />
                  </div>
                  <div>
                    <Label>With search icon pattern (models filter)</Label>
                    <div className="relative">
                      <Search className="text-foreground/40 absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
                      <Input
                        placeholder="Search models..."
                        className="border-foreground/10 bg-background h-8 rounded-xs pl-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Select */}
              <section id="select" ref={setRef("select")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Select
                </h2>
                <div>
                  <Label>Standard select (Dashboard intent)</Label>
                  <Select defaultValue="create-with-ai">
                    <SelectTrigger
                      size="sm"
                      className={`${controlButtonSmClass} min-w-0 justify-between gap-1 pr-2`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-foreground/10">
                      <SelectItem value="create-with-ai">
                        Create with AI
                      </SelectItem>
                      <SelectItem value="build-with-api">
                        Build with API
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              {/* Switch */}
              <section id="switch" ref={setRef("switch")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Switch
                </h2>
                <Label>Toggle control (used in request filters)</Label>
                <div className="flex items-center gap-3">
                  <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                  <span className="text-foreground text-sm">
                    {switchOn ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </section>

              {/* Popover */}
              <section id="popover" ref={setRef("popover")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Popover
                </h2>
                <Label>
                  Used for date pickers, filters (Usage/Billing tabs)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-foreground/10 text-foreground/80 data-[empty=true]:text-muted-foreground h-8 w-auto justify-start gap-1.5 rounded-xs px-2.5 text-left text-xs font-normal"
                    >
                      Click to open
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="bg-background w-auto rounded-xs border-0 p-4 shadow-sm"
                    align="start"
                  >
                    <p className="text-foreground text-sm">
                      Popover content (date picker, etc.)
                    </p>
                  </PopoverContent>
                </Popover>
              </section>

              {/* Datepicker */}
              <section id="datepicker" ref={setRef("datepicker")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Datepicker
                </h2>
                <Label>Date picker used in billing/usage filters</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!selectedDate}
                      className="border-foreground/10 text-foreground/80 data-[empty=true]:text-muted-foreground h-8 w-auto max-w-full min-w-0 justify-start gap-1.5 rounded-xs px-2.5 text-left text-xs font-normal"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span>
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Pick a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="bg-background w-auto rounded-xs border-0 p-0 shadow-sm"
                  >
                    <DateCalendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="text-xs"
                    />
                  </PopoverContent>
                </Popover>
              </section>

              {/* ====================================================== */}
              {/*  LAYOUT                                                 */}
              {/* ====================================================== */}

              {/* Card */}
              <section id="card" ref={setRef("card")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Card
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Settings card — divide-y rows, no shadow</Label>
                    <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
                      <CardContent className="divide-foreground/10 divide-y p-0">
                        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                          <p className="text-foreground/60 shrink-0 text-xs">
                            Email
                          </p>
                          <p className="text-foreground min-w-0 truncate text-sm">
                            user@wavespeed.com
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                          <p className="text-foreground/60 shrink-0 text-xs">
                            Username
                          </p>
                          <p className="text-foreground min-w-0 truncate text-sm">
                            wavespeed-user
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                          <p className="text-foreground/60 shrink-0 text-xs">
                            Role
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-surface text-foreground/70 rounded-xs border-0 px-2 py-0.5 text-xs uppercase"
                          >
                            Owner
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Label>Summary card — bg-surface, stat value</Label>
                    <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
                      <CardContent className="flex min-h-36 flex-col px-4 py-4">
                        <p className="text-foreground/60 text-xs">
                          Total Spend
                        </p>
                        <p className="text-foreground mt-2 text-2xl leading-none font-semibold">
                          $12.50
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                          <Button className="h-8 rounded-xs px-3 text-xs">
                            Add funds
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={controlButtonSmClass}
                          >
                            View details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <Label>
                      Getting started card — CardTitle + CardDescription
                    </Label>
                    <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
                      <CardContent className="px-4 pt-4 pb-4 md:px-5 md:pt-5">
                        <CardTitle className="text-foreground text-base font-semibold">
                          Welcome to WaveSpeed
                        </CardTitle>
                        <CardDescription className="text-subtle mt-1.5 text-sm leading-5">
                          Complete setup to unlock the full speed of your
                          account.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Table */}
              <section id="table" ref={setRef("table")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Table
                </h2>

                <div className="flex flex-col gap-6">
                  <div>
                    <Label>
                      API Keys table — text-foreground/50 tracking-lg headers
                    </Label>
                    <Card className="border-foreground/10 bg-background gap-0 rounded-xs py-0 shadow-none">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-foreground/10 hover:bg-transparent">
                              <TableHead className="text-foreground/50 tracking-lg pl-4">
                                Name
                              </TableHead>
                              <TableHead className="text-foreground/50 tracking-lg">
                                Key
                              </TableHead>
                              <TableHead className="text-foreground/50 tracking-lg">
                                Created
                              </TableHead>
                              <TableHead className="text-foreground/50 tracking-lg">
                                Status
                              </TableHead>
                              <TableHead className="text-foreground/50 tracking-lg pr-4 text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-foreground/10 hover:bg-surface">
                              <TableCell className="pl-4">Production</TableCell>
                              <TableCell>
                                <span className="font-mono">
                                  a3f8c2e1-••••••••
                                </span>
                              </TableCell>
                              <TableCell>03/15/2026</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="tracking-lg rounded-xs border-0 bg-emerald-500/15 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                                >
                                  Active
                                </Badge>
                              </TableCell>
                              <TableCell className="pr-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="text-foreground/60 hover:text-foreground"
                                  >
                                    <Copy className="size-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="text-foreground/60 hover:text-red-500"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-foreground/10 hover:bg-surface">
                              <TableCell className="pl-4">Staging</TableCell>
                              <TableCell>
                                <span className="font-mono">
                                  7b2d9e4f-••••••••
                                </span>
                              </TableCell>
                              <TableCell>03/10/2026</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="tracking-lg rounded-xs border-0 bg-amber-500/15 px-2 py-1 text-xs text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                                >
                                  <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-current" />
                                  Inactive
                                </Badge>
                              </TableCell>
                              <TableCell className="pr-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="text-foreground/60 hover:text-foreground"
                                  >
                                    <Copy className="size-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="text-foreground/60 hover:text-red-500"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Label>
                      Usage table — text-foreground/70 tracking-lg headers, FG/8
                      row borders
                    </Label>
                    <Card className="bg-surface gap-0 rounded-xs border-0 py-0 shadow-none">
                      <CardContent className="px-4 pt-3 pb-4">
                        <div className="overflow-hidden rounded-xs">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-foreground/10 hover:bg-transparent">
                                <TableHead className="text-foreground/70 tracking-lg w-10">
                                  #
                                </TableHead>
                                <TableHead className="text-foreground/70 tracking-lg">
                                  Model
                                </TableHead>
                                <TableHead className="text-foreground/70 tracking-lg text-right">
                                  Requests
                                </TableHead>
                                <TableHead className="text-foreground/70 tracking-lg text-right">
                                  Cost
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="border-foreground/8 hover:bg-foreground/2">
                                <TableCell>1</TableCell>
                                <TableCell>
                                  google/nano-banana-2/text-to-image
                                </TableCell>
                                <TableCell className="text-right">
                                  847
                                </TableCell>
                                <TableCell className="text-right">
                                  $4.2350
                                </TableCell>
                              </TableRow>
                              <TableRow className="border-foreground/8 hover:bg-foreground/2">
                                <TableCell>2</TableCell>
                                <TableCell>
                                  wavespeed-ai/wan-2.1/text-to-video
                                </TableCell>
                                <TableCell className="text-right">
                                  400
                                </TableCell>
                                <TableCell className="text-right">
                                  $8.0000
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                        <div className="border-foreground/10 flex items-center justify-between border-t pt-3">
                          <p className="text-foreground/70 text-xs">
                            Total 1,247 predictions
                          </p>
                          <p className="text-foreground text-base font-semibold">
                            $12.2350
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Tabs */}
              <section id="tabs" ref={setRef("tabs")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Tabs
                </h2>
                <Label>Line variant — dashboard model tabs</Label>
                <Tabs defaultValue="latest" className="gap-0">
                  <TabsList
                    variant="line"
                    className="h-auto w-full justify-start gap-3 rounded-none bg-transparent px-0"
                  >
                    <TabsTrigger
                      value="latest"
                      className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
                    >
                      Latest models
                    </TabsTrigger>
                    <TabsTrigger
                      value="favorite"
                      className="data-[state=active]:text-foreground data-[state=active]:after:bg-foreground h-10 flex-none rounded-none px-1.5 font-semibold whitespace-nowrap group-data-[orientation=horizontal]/tabs:after:h-px"
                    >
                      Favorite models
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="latest" className="mt-3">
                    <p className="text-foreground/50 text-sm">
                      Latest models tab content
                    </p>
                  </TabsContent>
                  <TabsContent value="favorite" className="mt-3">
                    <p className="text-foreground/50 text-sm">
                      Favorite models tab content
                    </p>
                  </TabsContent>
                </Tabs>
              </section>

              {/* Navigation Tabs */}
              <section id="nav-tabs" ref={setRef("nav-tabs")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Navigation
                </h2>
                <Label>
                  ProductTopTabs — tracking-xl text-sm, active: text-foreground
                  font-semibold + underline
                </Label>
                <div className="border-foreground/10 flex h-12 items-center gap-6 border-b">
                  {[
                    { label: "Dashboard", active: true },
                    { label: "Models", active: false },
                    { label: "API Keys", active: false },
                    { label: "Usage", active: false },
                    { label: "Billing", active: false },
                    { label: "Settings", active: false },
                  ].map((tab) => (
                    <span
                      key={tab.label}
                      className={`tracking-xl relative flex h-12 items-center text-sm whitespace-nowrap ${
                        tab.active
                          ? "text-foreground font-semibold"
                          : "text-foreground/60"
                      }`}
                    >
                      {tab.label}
                      {tab.active ? (
                        <span className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5" />
                      ) : null}
                    </span>
                  ))}
                </div>
              </section>

              {/* ====================================================== */}
              {/*  FEEDBACK                                               */}
              {/* ====================================================== */}

              {/* Alert Dialog */}
              <section id="alert-dialog" ref={setRef("alert-dialog")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Alert Dialog
                </h2>
                <Label>Delete confirmation (API keys, billing cards)</Label>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className={controlButtonSmClass}>
                      Delete access key
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-xs">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete access key?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The key will stop working
                        immediately.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-2">
                      <AlertDialogCancel className="rounded-xs">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="rounded-xs">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </section>

              {/* Toast */}
              <section id="toast" ref={setRef("toast")}>
                <h2 className="text-foreground border-foreground/10 mb-6 border-b pb-3 text-lg font-semibold">
                  Toast
                </h2>
                <Label>Notifications (key created, copied, deleted)</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className={controlButtonSmClass}
                    onClick={() =>
                      toast({
                        title: "Success",
                        description: "Access key created successfully!",
                      })
                    }
                  >
                    Key created
                  </Button>
                  <Button
                    variant="outline"
                    className={controlButtonSmClass}
                    onClick={() =>
                      toast({ description: "Copied to clipboard." })
                    }
                  >
                    Copied
                  </Button>
                  <Button
                    variant="outline"
                    className={controlButtonSmClass}
                    onClick={() =>
                      toast({
                        variant: "destructive",
                        description: "Failed to delete key.",
                      })
                    }
                  >
                    Error toast
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

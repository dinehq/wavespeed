"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Clock,
  Cloud,
  Code2,
  CreditCard,
  Gamepad2,
  Globe,
  Headphones,
  Palette,
  Rocket,
  Server,
  Scale,
  Shield,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AnthropicLogo from "@/images/anthropic.svg";
import OpenAILogo from "@/images/openai.svg";
import ArrowRight from "@/images/arrow-right.svg";
import heroBg from "@/images/slide-2.webp";
import logosImg from "@/images/logos.webp";
import securityImg from "@/images/security.webp";
import googleModelsIcon from "@/images/Google Models.png";
import qwenModelsIcon from "@/images/Qwen Image 2 Models.png";
import tool01 from "@/images/tool-01.webp";
import tool02 from "@/images/tool-02.webp";
import tool03 from "@/images/tool-03.webp";
import tool04 from "@/images/tool-04.webp";
import tool05 from "@/images/tool-05.webp";
import tool06 from "@/images/tool-06.webp";
import tool07 from "@/images/tool-07.webp";
import tool08 from "@/images/tool-08.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "China",
  "Singapore",
  "Australia",
  "India",
  "Brazil",
  "Other",
];

const inquiryReasons = [
  "API & Platform Access",
  "Custom Model Deployment",
  "Enterprise Pricing",
  "Partnership Opportunity",
  "Technical Support",
  "Other",
];

const llmBadges = [
  { name: "GPT-5.4", icon: null, svg: OpenAILogo },
  { name: "Claude Opus 4.6", icon: null, svg: AnthropicLogo },
  { name: "Gemini 3.1 Pro", icon: googleModelsIcon },
  { name: "Qwen3 Max", icon: qwenModelsIcon },
];

const stats = [
  { icon: Zap, value: "< 100ms", label: "Average Response" },
  { icon: Shield, value: "SOC 2", label: "Security Certified" },
  { icon: Clock, value: "99.9%", label: "Uptime SLA" },
  { icon: CreditCard, value: "$0", label: "No Upfront Costs" },
];

const whyChoose = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized inference pipeline delivers industry-leading response times. Get results in milliseconds, not seconds.",
    bg: tool01,
    bullets: [
      "Average response < 100ms",
      "Global edge deployment",
      "Optimized model quantization",
    ],
  },
  {
    icon: Activity,
    title: "Rock Solid Stability",
    description:
      "Enterprise-grade infrastructure with automatic failover and redundancy. Your applications stay online, always.",
    bg: tool02,
    bullets: [
      "99.9% uptime SLA guarantee",
      "Multi-region redundancy",
      "Auto-scaling under load",
    ],
  },
  {
    icon: Wallet,
    title: "Pay As You Go",
    description:
      "No minimum commitments, no wasted resources. Only pay for what you actually use, down to the second.",
    bg: tool03,
    bullets: [
      "Per-second billing",
      "No upfront costs",
      "Volume discounts available",
    ],
  },
];

const infraFeatures = [
  {
    icon: Headphones,
    title: "Priority Support",
    description: "24/7 dedicated support with response time SLAs",
  },
  {
    icon: Server,
    title: "Higher GPU Limits",
    description: "Access to more GPU resources for demanding workloads",
  },
  {
    icon: Scale,
    title: "Uptime SLAs",
    description: "99.9% uptime guarantee with financial backing",
  },
  {
    icon: Sparkles,
    title: "Custom Models",
    description: "Deploy your own fine-tuned models on our infrastructure",
  },
  {
    icon: UserCheck,
    title: "Account Manager",
    description: "Dedicated account manager for enterprise customers",
  },
  {
    icon: Wallet,
    title: "Volume Discounts",
    description: "Competitive pricing for high-volume usage",
  },
];

const industries = [
  { icon: Code2, name: "SaaS Platforms", bg: tool01 },
  { icon: ShoppingCart, name: "E-commerce", bg: tool02 },
  { icon: Rocket, name: "AI Startups", bg: tool03 },
  { icon: Globe, name: "Agencies", bg: tool04 },
  { icon: TrendingUp, name: "Enterprises", bg: tool05 },
  { icon: Gamepad2, name: "Gaming Studios", bg: tool06 },
  { icon: Cloud, name: "Cloud Providers", bg: tool07 },
  { icon: Palette, name: "Creative Tools", bg: tool08 },
];

export default function ServerlessPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    country: "",
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main>
      <Navbar overlay />

      {/* Hero */}
      <section className="relative -mt-16 h-105 w-full overflow-hidden sm:h-120 lg:h-160">
        <Image
          src={heroBg}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-6 sm:pb-8 md:px-12 md:pb-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <span className="font-mono text-sm font-medium tracking-wide text-white/50">
                Serverless AI Infrastructure
              </span>
              <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Deploy AI at Scale
                <br />
                Without the Complexity
              </h1>
              <p className="max-w-lg text-sm leading-normal text-pretty text-white/60 md:text-base">
                Access 1000+ AI models for image, video, and text generation.
                Pay per second, scale instantly, no infrastructure management.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Link
                  href="/models"
                  className="flex cursor-pointer items-center gap-2.5 rounded-xs border border-transparent bg-white px-6 py-3 text-black transition-colors duration-150 hover:bg-white/90"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    Explore Models
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/enterprise"
                  className="flex cursor-pointer items-center gap-2.5 rounded-xs border border-white/20 bg-transparent px-6 py-3 text-white transition-colors duration-150 hover:bg-white/10"
                >
                  <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                    Contact Sales
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-3 px-6 text-center${i < stats.length - 1 ? "border-r border-current/10 max-lg:nth-2:border-r-0" : ""}${i < 2 ? "max-lg:border-b max-lg:border-current/10 max-lg:pb-6" : ""}${i >= 2 ? "max-lg:pt-6" : ""}`}
              >
                <stat.icon
                  className="text-foreground/30 size-5"
                  strokeWidth={1.5}
                />
                <span className="font-display text-heading text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <span className="text-foreground/50 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose WaveSpeed AI */}
      <section className="bg-surface px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Why Choose WaveSpeed AI
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Built for performance, reliability, and cost-efficiency.
              Experience the WaveSpeed difference.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-background flex flex-col gap-4 overflow-hidden rounded-xs"
              >
                <div className="relative h-1.5 w-full">
                  <Image
                    src={item.bg}
                    alt=""
                    fill
                    sizes="400px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-4 px-6 pt-2 pb-6">
                  <item.icon
                    className="text-foreground/40 size-6"
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-heading text-base font-medium">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-current/5 pt-4">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-foreground/50 flex items-center gap-2 text-sm"
                      >
                        <span className="bg-foreground/20 size-1 shrink-0 rounded-full" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One API, Infinite Possibilities */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              One API, Infinite Possibilities
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Access cutting-edge AI models for any use case, all through a
              single unified API.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Row 1: Image & Video + Language Models */}
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Image & Video */}
              <div className="bg-surface relative h-95 w-full overflow-hidden rounded-xs lg:h-105 lg:w-[55%] lg:shrink-0">
                <div className="absolute right-0 bottom-2.5 h-55 w-150 sm:h-65 md:h-70 lg:h-72">
                  <Image
                    src={logosImg}
                    alt=""
                    fill
                    sizes="600px"
                    className="object-contain object-top-right"
                  />
                </div>
                <div className="absolute top-6 right-6 left-6 z-10">
                  <h3 className="text-ink font-display mb-2 text-2xl leading-7 font-medium">
                    Image & Video Models
                  </h3>
                  <p className="text-foreground/60 text-base text-pretty">
                    State-of-the-art image and video generation with models like
                    Kling O3, Seedream v4.5, Veo 3.1, and Wan 2.6.
                  </p>
                </div>
                <div className="absolute right-6 bottom-6 left-6 z-10">
                  <Link
                    href="/models"
                    className="bg-foreground text-background hover:bg-foreground/80 inline-flex w-fit items-center gap-2 rounded-xs px-4 py-2 font-mono text-sm font-bold transition-colors"
                  >
                    Try for free
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Language Models */}
              <div className="bg-surface relative h-95 w-full overflow-hidden rounded-xs lg:h-105 lg:flex-1">
                <div className="absolute top-6 right-6 left-6 z-10">
                  <h3 className="text-ink font-display mb-2 text-2xl leading-7 font-medium">
                    Language Models
                  </h3>
                  <p className="text-foreground/60 mb-4 text-base text-pretty">
                    Access leading LLMs including GPT-5.4, Claude Opus 4.6,
                    Gemini 3.1 Pro, and Qwen3 Max with up to 200K context
                    windows.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {llmBadges.map((item) => (
                      <span
                        key={item.name}
                        className="text-foreground/50 dark:bg-foreground/10 flex items-center gap-2 rounded-xs bg-white px-2.5 py-1 font-mono text-sm font-medium"
                      >
                        {item.icon ? (
                          <Image
                            src={item.icon}
                            alt=""
                            width={14}
                            height={14}
                            className="size-3.5 shrink-0"
                          />
                        ) : item.svg ? (
                          <item.svg className="size-3.5 shrink-0" />
                        ) : null}
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute right-6 bottom-6 left-6 z-10 flex flex-col gap-4">
                  <Link
                    href="/models"
                    className="bg-foreground text-background hover:bg-foreground/80 inline-flex w-fit items-center gap-2 rounded-xs px-4 py-2 font-mono text-sm font-bold transition-colors"
                  >
                    Try for free
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 2: Serverless GPU Infrastructure */}
            <div className="bg-surface relative h-95 w-full overflow-hidden rounded-xs lg:h-105">
              <div className="absolute top-0 right-8 h-full w-72 lg:w-96">
                <Image
                  src={securityImg}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 384px, 288px"
                  className="object-contain object-bottom dark:mix-blend-screen dark:filter-[invert(1)_contrast(1.2)_hue-rotate(180deg)]"
                />
              </div>
              <div className="absolute top-6 right-6 left-6 z-10 lg:w-150">
                <h3 className="text-ink font-display mb-2 text-2xl leading-7 font-medium">
                  Serverless GPU Infrastructure
                </h3>
                <p className="text-foreground/60 max-w-md text-base text-pretty">
                  Run your own models on enterprise-grade GPUs with
                  auto-scaling, pay-per-second billing, and zero cold starts. No
                  infrastructure management required.
                </p>
              </div>
              <div className="absolute right-6 bottom-6 left-6 z-10 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    "SOC 2 Type II",
                    "End-to-end encryption",
                    "Auto-scaling",
                    "Pay-per-second",
                    "Zero cold starts",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-foreground/5 text-foreground/60 rounded-xs px-3 py-1.5 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/models"
                  className="bg-foreground text-background hover:bg-foreground/80 inline-flex w-fit items-center gap-2 rounded-xs px-4 py-2 font-mono text-sm font-bold transition-colors"
                >
                  Try for free
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise-Grade Infrastructure */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Built for reliability, security, and scale. Focus on building, we
              handle the rest.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infraFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface flex flex-col gap-4 rounded-xs p-6"
              >
                <feature.icon
                  className="text-foreground/40 size-6"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-heading text-base font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Every Industry */}
      <section className="px-6 pt-16 pb-16 md:px-12 md:pt-20 md:pb-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Built for Every Industry
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              From startups to enterprises, our API powers AI applications
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group relative flex h-28 flex-col justify-between overflow-hidden rounded-xs p-5 md:h-36"
              >
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={industry.bg}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="rotate-180 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <industry.icon
                  className="relative size-5 shrink-0 text-black/50"
                  strokeWidth={1.5}
                />
                <span className="font-display relative text-sm font-medium tracking-tight text-black md:text-base">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        ref={formRef}
        id="contact-us"
        className="scroll-mt-20 px-6 pt-16 pb-16 md:px-12 md:pt-20 md:pb-24 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-4 lg:w-96 lg:shrink-0 lg:pt-2">
              <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl lg:text-5xl">
                Get in touch
              </h2>
              <p className="text-foreground/60 mt-2 max-w-sm text-sm leading-relaxed md:text-base">
                Our team is ready to help you prototype, develop, and scale your
                AI solutions. Contact our enterprise team to learn more about
                custom pricing and dedicated support.
              </p>
            </div>

            <div className="max-w-xl min-w-0 flex-1">
              {submitted ? (
                <div className="bg-surface flex flex-col items-center justify-center gap-4 rounded-xs px-6 py-16 text-center">
                  <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-full">
                    <svg
                      className="size-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-heading font-display text-xl font-bold">
                    Thank you!
                  </h3>
                  <p className="text-foreground/60 max-w-sm text-sm">
                    We&apos;ve received your inquiry and will get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-heading font-mono text-xs font-medium">
                        Your country{" "}
                        <span className="text-foreground/40">*</span>
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(v) => updateField("country", v)}
                      >
                        <SelectTrigger className="bg-background h-10 w-full rounded-xs text-sm">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="sl-company"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        Company Name{" "}
                        <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="sl-company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="sl-first"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        First Name <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="sl-first"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="sl-last"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        Last Name <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="sl-last"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="sl-email"
                      className="text-heading font-mono text-xs font-medium"
                    >
                      Email <span className="text-foreground/40">*</span>
                    </label>
                    <input
                      id="sl-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-heading font-mono text-xs font-medium">
                      Inquiry Reason
                    </label>
                    <Select
                      value={formData.reason}
                      onValueChange={(v) => updateField("reason", v)}
                    >
                      <SelectTrigger className="bg-background h-10 w-full rounded-xs text-sm">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryReasons.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <button
                    type="submit"
                    className="bg-foreground text-background hover:bg-foreground/80 mt-2 flex h-11 w-full cursor-pointer items-center justify-center rounded-xs font-mono text-sm font-bold transition-colors duration-150"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

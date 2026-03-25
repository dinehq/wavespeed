"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Gauge,
  Headphones,
  Scale,
  Shield,
  Sparkles,
  UserCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AnthropicLogo from "@/images/anthropic.svg";
import OpenAILogo from "@/images/openai.svg";
import EnterpriseLogos from "@/images/enterprise-logos.svg";
import ArrowRight from "@/images/arrow-right.svg";
import heroBg from "@/images/slide-1.webp";
import logosImg from "@/images/logos.webp";
import securityImg from "@/images/security.webp";
import googleModelsIcon from "@/images/Google Models.png";
import qwenModelsIcon from "@/images/Qwen Image 2 Models.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const llmBadges = [
  { name: "GPT-5.4", icon: null, svg: OpenAILogo },
  { name: "Claude Opus 4.6", icon: null, svg: AnthropicLogo },
  { name: "Gemini 3.1 Pro", icon: googleModelsIcon },
  { name: "Qwen3 Max", icon: qwenModelsIcon },
];

const moreFeatures = [
  {
    icon: Headphones,
    title: "Priority support when you need it",
    description:
      "Fast-track your requests with priority access to our engineering team.",
  },
  {
    icon: Gauge,
    title: "Higher GPU limits for bigger workloads",
    description:
      "Scale without constraints with increased GPU allocation and concurrent processing.",
  },
  {
    icon: Scale,
    title: "SLAs that meet your requirements",
    description:
      "Guaranteed uptime and performance with enterprise-grade service level agreements.",
  },
  {
    icon: Sparkles,
    title: "Help with custom models",
    description:
      "Expert guidance to help you deploy custom models and optimize performance.",
  },
  {
    icon: UserCheck,
    title: "Dedicated account manager",
    description:
      "Get personalized support from a dedicated team member who understands your needs.",
  },
  {
    icon: Wallet,
    title: "Volume discounts",
    description:
      "We've got volume discounts for large amounts of spend. Contact us to learn more.",
  },
];

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

export default function EnterprisePage() {
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
              <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Ultimate AI Media
                <br />
                Generation Platform
                <br />
                for Enterprise
              </h1>
              <p className="max-w-lg text-sm leading-normal text-pretty text-white/60 md:text-base">
                WaveSpeed accelerates AI Image and Video generation for you to
                build, create, and scale faster.
              </p>
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-xs border border-transparent bg-white px-6 py-3 text-black transition-colors duration-150 hover:bg-white/90"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Talk to us
                </span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <EnterpriseLogos className="text-foreground h-6 w-full sm:h-8 md:h-10" />
        </div>
      </section>

      {/* Models */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Access State-of-the-Art AI Models
            </h2>
            <p className="text-foreground/60 max-w-2xl text-sm text-pretty md:text-base">
              Ready-to-use REST inference API with the latest image, video, and
              language models. Best performance, no cold starts, affordable
              pricing.
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

      {/* More Features */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex max-w-xl flex-col gap-4">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
              There is plenty more&hellip;
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moreFeatures.map((feature) => (
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

      {/* Contact Form */}
      <section
        ref={formRef}
        id="contact-us"
        className="scroll-mt-20 px-6 pt-16 pb-16 md:px-12 md:pt-20 md:pb-24 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            {/* Left: info */}
            <div className="flex flex-col gap-4 lg:w-96 lg:shrink-0 lg:pt-2">
              <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl lg:text-5xl">
                Get in touch
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  {
                    icon: Clock,
                    text: "Typical response within 24 hours",
                  },
                  {
                    icon: Shield,
                    text: "SOC 2 Type 2 certified",
                  },
                  {
                    icon: Zap,
                    text: "Priority onboarding for enterprise",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="text-foreground/50 flex items-center gap-3"
                  >
                    <item.icon className="size-4 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
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
                  {/* Country + Company */}
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
                        htmlFor="ent-company"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        Company Name{" "}
                        <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="ent-company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="ent-first"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        First Name <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="ent-first"
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
                        htmlFor="ent-last"
                        className="text-heading font-mono text-xs font-medium"
                      >
                        Last Name <span className="text-foreground/40">*</span>
                      </label>
                      <input
                        id="ent-last"
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

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="ent-email"
                      className="text-heading font-mono text-xs font-medium"
                    >
                      Email <span className="text-foreground/40">*</span>
                    </label>
                    <input
                      id="ent-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="border-input bg-background focus:border-ring focus:ring-ring/50 h-10 rounded-xs border px-3 font-mono text-sm transition-shadow outline-none focus:ring-2"
                    />
                  </div>

                  {/* Inquiry reason */}
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

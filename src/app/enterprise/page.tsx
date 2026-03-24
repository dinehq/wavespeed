"use client";

import { type FormEvent, useRef, useState } from "react";
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
import ArrowRight from "@/images/arrow-right.svg";
import heroBg from "@/images/slide-1.webp";
import securityImg from "@/images/security.webp";
import enterpriseLogos from "@/images/enterprise-logos.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const modelBadges = ["Nano Banana Pro", "Seedream V4.5", "Sora 2", "Wan 2.6"];

const llmBadges = ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro", "Qwen3 Max"];

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

  const handleSubmit = (e: FormEvent) => {
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
      <section className="relative -mt-16 flex min-h-[520px] w-full items-end overflow-hidden sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px]">
        <Image
          src={heroBg}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 sm:pb-16 md:px-12 md:pb-20 lg:px-20">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <span className="bg-brand rounded-xs px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase">
              Enterprise
            </span>
            <h1 className="font-display text-3xl leading-none font-bold tracking-tighter text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ultimate AI Media
              <br />
              Generation Platform
              <br />
              for Enterprise
            </h1>
            <p className="max-w-lg font-mono text-sm leading-normal text-pretty text-white/60 md:text-base">
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
      </section>

      {/* Logo Wall */}
      <section className="px-6 pt-10 md:px-12 md:pt-14 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative mx-auto h-16 w-full max-w-4xl sm:h-20 md:h-24">
            <Image
              src={enterpriseLogos}
              alt="Trusted by leading companies"
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-contain grayscale dark:invert"
            />
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="px-6 pt-10 pb-16 md:px-12 md:pt-14 md:pb-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Access State-of-the-Art AI Models
            </h2>
            <p className="text-foreground/60 max-w-2xl font-mono text-sm text-pretty md:text-base">
              Ready-to-use REST inference API with the latest image, video, and
              language models. Best performance, no cold starts, affordable
              pricing.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Image & Video */}
            <div className="bg-surface flex flex-col justify-between gap-6 rounded-xs p-6 md:p-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-heading font-display text-xl font-bold">
                  Image & Video Models
                </h3>
                <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                  State-of-the-art image and video generation with models like
                  Seedream 4.5, Flux 2 Pro, Sora 2, and Veo 3.1.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {modelBadges.map((name) => (
                  <span
                    key={name}
                    className="bg-foreground/5 text-foreground/60 rounded-xs px-2.5 py-1 font-mono text-xs"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <Link
                href="/models"
                className="text-heading group flex items-center gap-2 font-mono text-sm font-medium"
              >
                Try for free
                <ArrowRight className="text-foreground/30 size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Language Models */}
            <div className="bg-surface flex flex-col justify-between gap-6 rounded-xs p-6 md:p-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-heading font-display text-xl font-bold">
                  Language Models
                </h3>
                <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                  Access leading LLMs including GPT-5.2, Claude Opus 4.5, Gemini
                  3 Pro, and Qwen3 Max with up to 200K context windows.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {llmBadges.map((name) => (
                  <span
                    key={name}
                    className="bg-foreground/5 text-foreground/60 rounded-xs px-2.5 py-1 font-mono text-xs"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <Link
                href="/models"
                className="text-heading group flex items-center gap-2 font-mono text-sm font-medium"
              >
                Try for free
                <ArrowRight className="text-foreground/30 size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Infrastructure */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Enterprise-Grade Security and Compliance
            </h2>
            <p className="text-foreground/60 max-w-2xl font-mono text-sm text-pretty md:text-base">
              SOC 2 Type 2 certified. Privacy Shield compliant. BAA negotiable.
              Data stays within your chosen infrastructure region.
            </p>
          </div>

          <div className="from-surface to-accent-light relative overflow-hidden rounded-xs bg-linear-to-b">
            <div className="flex flex-col gap-8 p-6 md:flex-row md:items-end md:gap-12 md:p-10 lg:p-12">
              <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-5">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-heading font-display text-lg font-bold">
                      Serverless GPU Infrastructure
                    </h3>
                    <p className="text-foreground/60 max-w-md font-mono text-sm leading-relaxed">
                      Run your own models on enterprise-grade GPUs with
                      auto-scaling, pay-per-second billing, and zero cold
                      starts.
                    </p>
                  </div>
                </div>
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
                  className="text-heading group flex items-center gap-2 font-mono text-sm font-medium"
                >
                  Try for free
                  <ArrowRight className="text-foreground/30 size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="relative h-56 w-full shrink-0 sm:h-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
                <Image
                  src={securityImg}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, 288px"
                  className="object-contain dark:mix-blend-screen dark:filter-[invert(1)_contrast(1.2)_hue-rotate(180deg)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
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
                className="bg-surface group hover:bg-surface/80 flex flex-col gap-4 rounded-xs p-6 transition-colors duration-150"
              >
                <feature.icon
                  className="text-foreground/40 size-6"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-heading font-display text-base font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Talk to us */}
      <section className="relative h-76 overflow-hidden">
        <div className="absolute inset-0 scale-[1.05]">
          <video
            src="/videos/get-started-bg.mp4"
            poster="/videos/get-started-bg_poster.webp"
            autoPlay
            loop
            muted
            playsInline
            className="size-full scale-105 object-cover blur-sm"
          />
        </div>
        <div className="absolute inset-0 dark:bg-black/50" />
        <div className="relative mx-auto flex h-full max-w-360 flex-col items-center justify-center gap-6 px-6 py-12 md:flex-row md:justify-between md:px-12 md:py-0 lg:px-20">
          <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
            Want to Talk Through
            <br />
            Your Needs?
          </h2>
          <button
            type="button"
            onClick={scrollToForm}
            className="flex shrink-0 cursor-pointer items-center gap-3 rounded-xs bg-black px-8 py-4 text-white transition-colors duration-150 hover:bg-black/80"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              Talk to us
            </span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section
        ref={formRef}
        id="contact-us"
        className="scroll-mt-20 px-6 py-16 md:px-12 md:py-24 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            {/* Left: info */}
            <div className="flex flex-col gap-4 lg:w-96 lg:shrink-0 lg:pt-2">
              <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl lg:text-5xl">
                Get in touch
              </h2>
              <p className="text-foreground/60 font-mono text-sm text-pretty">
                Whatever you need, we are delighted to chat.
              </p>
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
                    <span className="font-mono text-sm">{item.text}</span>
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
                  <p className="text-foreground/60 max-w-sm font-mono text-sm">
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

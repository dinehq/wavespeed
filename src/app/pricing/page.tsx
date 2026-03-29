"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Gauge,
  Headphones,
  Scale,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ArrowRight from "@/images/arrow-right.svg";

const imageVideoModels = [
  {
    model: "Nano Banana Pro",
    unit: "image",
    price: "$0.14",
    output: "7 images",
  },
  {
    model: "Seedream V4.5",
    unit: "image",
    price: "$0.04",
    output: "25 images",
    badge: "15% OFF",
  },
  {
    model: "Flux Dev Ultra Fast",
    unit: "image",
    price: "$0.005",
    output: "200 images",
  },
  {
    model: "FLUX.2 [Pro]",
    unit: "image",
    price: "$0.055",
    output: "18 images",
  },
  {
    model: "Midjourney",
    unit: "image",
    price: "$0.08",
    output: "12 images",
  },
  {
    model: "Kling O3",
    unit: "second",
    price: "$0.15",
    output: "6.6 seconds",
  },
  {
    model: "Veo 3.1",
    unit: "second",
    price: "$0.12",
    output: "8.3 seconds",
  },
  {
    model: "Wan 2.6",
    unit: "second",
    price: "$0.08",
    output: "12.5 seconds",
  },
  {
    model: "Seedance 2.0",
    unit: "second",
    price: "$0.10",
    output: "10 seconds",
  },
  {
    model: "Hailuo Minimax",
    unit: "second",
    price: "$0.01",
    output: "100 seconds",
  },
];

const languageModels = [
  {
    model: "Claude Opus 4.6",
    context: "200K",
    input: "$0.015",
    output: "$0.075",
  },
  {
    model: "Claude Sonnet 4.6",
    context: "200K",
    input: "$0.003",
    output: "$0.015",
  },
  {
    model: "GPT-5.4",
    context: "128K",
    input: "$0.010",
    output: "$0.030",
  },
  {
    model: "GPT-5.4 Mini",
    context: "128K",
    input: "$0.0004",
    output: "$0.0016",
  },
  {
    model: "Gemini 3.1 Pro",
    context: "2M",
    input: "$0.00125",
    output: "$0.005",
  },
  {
    model: "Qwen3 Max",
    context: "128K",
    input: "$0.0012",
    output: "$0.0048",
  },
  {
    model: "DeepSeek V4",
    context: "128K",
    input: "$0.0007",
    output: "$0.0028",
  },
];

const serverlessGpu = [
  {
    tier: "B2",
    gpu: "B200",
    vram: "141 GB",
    hourly: "$5.98",
    perSecond: "$0.00166",
  },
  {
    tier: "A1",
    gpu: "A100",
    vram: "80 GB",
    hourly: "$1.89",
    perSecond: "$0.00053",
  },
  {
    tier: "A1",
    gpu: "A100",
    vram: "48 GB",
    hourly: "$1.39",
    perSecond: "$0.00039",
  },
  {
    tier: "H1",
    gpu: "H100",
    vram: "80 GB",
    hourly: "$3.49",
    perSecond: "$0.00097",
  },
  {
    tier: "50",
    gpu: "RTX 5090",
    vram: "24 GB",
    hourly: "$0.69",
    perSecond: "$0.00019",
  },
  {
    tier: "40",
    gpu: "RTX 4090",
    vram: "24 GB",
    hourly: "$0.49",
    perSecond: "$0.00014",
  },
];

const enterpriseFeatures = [
  {
    icon: UserCheck,
    title: "Dedicated account manager",
    description:
      "Get personalized support from a dedicated team member who understands your needs.",
  },
  {
    icon: Headphones,
    title: "Priority support",
    description:
      "Fast-track your requests with priority access to our engineering team.",
  },
  {
    icon: Gauge,
    title: "Higher GPU limits",
    description:
      "Scale without constraints with increased GPU allocation and concurrent processing.",
  },
  {
    icon: Scale,
    title: "Performance SLAs",
    description:
      "Guaranteed uptime and performance with enterprise-grade service level agreements.",
  },
  {
    icon: Sparkles,
    title: "Custom model deployment",
    description:
      "Expert guidance to help you deploy custom models and optimize performance.",
  },
  {
    icon: Wallet,
    title: "Volume discounts",
    description:
      "We've got volume discounts for large amounts of spend. Contact us to learn more.",
  },
];

const faqItems = [
  {
    question: "How does pricing work?",
    answer:
      "WaveSpeed uses a pay-per-use model. You only pay for what you generate. There are no monthly fees or commitments. Simply add credits to your account and start creating.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for enterprise customers. Cryptocurrency payments are also supported.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! New accounts receive $1 in free credits to try out our platform. No credit card required to sign up. Some premium models may not be available with trial credits.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Unused credits can be refunded within 30 days of purchase. Once credits are used for generation, they cannot be refunded. Please see our refund policy for details.",
  },
  {
    question: "What are account levels?",
    answer:
      "WaveSpeed offers four account levels: Bronze (default), Silver ($100 top-up), Gold ($1,000 top-up), and Ultra ($10,000 top-up). Higher levels unlock increased rate limits and concurrent task allowances.",
  },
  {
    question: "Do you offer enterprise pricing?",
    answer:
      "Yes! For high-volume usage, we offer custom enterprise plans with volume discounts, dedicated support, and SLAs. Contact our sales team to learn more.",
  },
];

function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-foreground/10 border-b">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-heading font-display text-base font-medium">
          {question}
        </span>
        <svg
          className={`text-foreground/40 size-5 shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="10" y1="4" x2="10" y2="16" />
          <line x1="4" y1="10" x2="16" y2="10" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="text-foreground/60 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-display text-heading text-3xl leading-none font-bold tracking-tighter text-balance md:text-5xl lg:text-6xl">
              Simple and transparent pricing
            </h1>
            <p className="text-foreground/60 max-w-xl text-base text-pretty md:text-lg">
              Pay only for what you use. No hidden fees, no surprises. Scale
              from prototype to production with predictable costs.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/sign-in"
                className="bg-foreground text-background hover:bg-foreground/80 flex items-center gap-2.5 rounded-xs px-6 py-3 transition-colors duration-150"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Start building for free
                </span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/enterprise"
                className="border-foreground/20 text-foreground hover:bg-foreground/5 flex items-center gap-2.5 rounded-xs border px-6 py-3 transition-colors duration-150"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Contact Sales
                </span>
              </Link>
            </div>
            <p className="text-foreground/40 mt-2 text-sm">
              No credit card required &bull; Start with $1 free credits
            </p>
          </div>
        </div>
      </section>

      {/* Image & Video Models */}
      <section className="px-6 pt-12 md:px-12 md:pt-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="font-display text-heading text-xl leading-none font-bold tracking-tight md:text-2xl">
              Image & Video Models
            </h2>
            <p className="text-foreground/60 text-sm md:text-base">
              State-of-the-art generation with models from WaveSpeed, ByteDance,
              Google, and more.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-foreground/10 border-b">
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Model
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Unit
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Price
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 text-left text-xs font-medium uppercase">
                    Output per $1
                  </th>
                </tr>
              </thead>
              <tbody>
                {imageVideoModels.map((row, i) => (
                  <tr
                    key={i}
                    className="border-foreground/6 hover:bg-foreground/2 border-b transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <span className="text-heading flex items-center gap-2 font-medium">
                        {row.model}
                        {row.badge && (
                          <span className="bg-brand/10 text-brand rounded-xs px-1.5 py-0.5 text-xs font-medium">
                            {row.badge}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="text-foreground/60 py-4 pr-4 font-mono text-xs">
                      {row.unit}
                    </td>
                    <td className="text-heading py-4 pr-4 font-mono">
                      {row.price}
                      <span className="text-foreground/40">/{row.unit}</span>
                    </td>
                    <td className="text-foreground/60 py-4 font-mono text-xs">
                      {row.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-foreground/40 mt-4 text-xs">
            Prices may vary based on resolution and generation parameters.{" "}
            <Link href="/docs" className="text-brand hover:underline">
              See full pricing documentation
            </Link>
          </p>
        </div>
      </section>

      {/* Language Models */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="font-display text-heading text-xl leading-none font-bold tracking-tight md:text-2xl">
              Language Models
            </h2>
            <p className="text-foreground/60 text-sm md:text-base">
              Access leading LLMs with OpenAI-compatible API. 1K tokens{" "}
              <span className="text-foreground/40">&asymp;</span> 750 words.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-foreground/10 border-b">
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Model
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Context Window
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Input Price
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 text-left text-xs font-medium uppercase">
                    Output Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {languageModels.map((row, i) => (
                  <tr
                    key={i}
                    className="border-foreground/6 hover:bg-foreground/2 border-b transition-colors"
                  >
                    <td className="text-heading py-4 pr-4 font-medium">
                      {row.model}
                    </td>
                    <td className="text-foreground/60 py-4 pr-4 font-mono text-xs">
                      {row.context}
                    </td>
                    <td className="text-heading py-4 pr-4 font-mono">
                      {row.input}
                      <span className="text-foreground/40">/1K</span>
                    </td>
                    <td className="text-heading py-4 font-mono">
                      {row.output}
                      <span className="text-foreground/40">/1K</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Serverless GPU */}
      <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="font-display text-heading text-xl leading-none font-bold tracking-tight md:text-2xl">
              Serverless GPU
            </h2>
            <p className="text-foreground/60 text-sm md:text-base">
              Run your own models on enterprise-grade GPUs with pay-per-second
              billing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-foreground/10 border-b">
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Tier
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    GPU
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    VRAM
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 pr-4 text-left text-xs font-medium uppercase">
                    Hourly
                  </th>
                  <th className="text-foreground/60 tracking-lg py-3 text-left text-xs font-medium uppercase">
                    Per Second
                  </th>
                </tr>
              </thead>
              <tbody>
                {serverlessGpu.map((row, i) => (
                  <tr
                    key={i}
                    className="border-foreground/6 hover:bg-foreground/2 border-b transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <span className="bg-foreground/5 text-foreground/70 rounded-xs px-2 py-1 font-mono text-xs font-medium">
                        {row.tier}
                      </span>
                    </td>
                    <td className="text-heading py-4 pr-4 font-medium">
                      {row.gpu}
                    </td>
                    <td className="text-foreground/60 py-4 pr-4 font-mono text-xs">
                      {row.vram}
                    </td>
                    <td className="text-heading py-4 pr-4 font-mono">
                      {row.hourly}
                      <span className="text-foreground/40">/hr</span>
                    </td>
                    <td className="text-foreground/60 py-4 font-mono text-xs">
                      {row.perSecond}/s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Zero cold starts",
              "Auto-scaling",
              "Pay-per-second",
              "SOC 2 Type II",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-foreground/5 text-foreground/60 rounded-xs px-3 py-1.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="px-6 pt-20 md:px-12 md:pt-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-surface rounded-xs p-8 md:p-12">
            <div className="mb-10 flex flex-col items-center gap-4 text-center">
              <span className="bg-brand/10 text-brand rounded-xs px-3 py-1 font-mono text-xs font-medium uppercase">
                Enterprise
              </span>
              <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl">
                Built for scale
              </h2>
              <p className="text-foreground/60 max-w-lg text-sm text-pretty md:text-base">
                For teams that need more power, security, and support. Custom
                pricing based on your usage requirements.
              </p>
              <Link
                href="/enterprise"
                className="bg-foreground text-background hover:bg-foreground/80 mt-2 flex items-center gap-2.5 rounded-xs px-6 py-3 transition-colors duration-150"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Contact Sales
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enterpriseFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background flex flex-col gap-3 rounded-xs p-5"
                >
                  <feature.icon
                    className="text-foreground/40 size-5"
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-heading text-sm font-medium">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
            <div className="lg:w-80 lg:shrink-0">
              <h2 className="text-heading font-display text-2xl leading-none font-bold tracking-tight md:text-4xl">
                Frequently asked
                <br />
                questions
              </h2>
              <p className="text-foreground/60 mt-4 text-sm">
                Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/contact" className="text-brand hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
            <div className="border-foreground/10 min-w-0 border-t lg:flex-1">
              {faqItems.map((item) => (
                <FaqAccordion
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-foreground flex flex-col items-center gap-6 rounded-xs px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="font-display text-background text-2xl leading-none font-bold tracking-tight text-balance md:text-4xl">
              Ready to start building?
            </h2>
            <p className="text-background/60 max-w-md text-sm text-pretty md:text-base">
              Join thousands of developers and creators using WaveSpeed to power
              their AI applications.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/sign-in"
                className="text-foreground bg-background hover:bg-background/90 flex items-center gap-2.5 rounded-xs px-6 py-3 transition-colors duration-150"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Get started free
                </span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs"
                className="border-background/20 text-background hover:bg-background/10 flex items-center rounded-xs border px-6 py-3 transition-colors duration-150"
              >
                <span className="tracking-xl font-mono text-sm leading-4 font-bold uppercase">
                  Read the docs
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

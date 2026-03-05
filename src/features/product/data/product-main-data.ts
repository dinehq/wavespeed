import { Activity, DollarSign, Layers } from "lucide-react";

import type { DashboardIntent } from "@/features/product/types/product-main";
import thumb1 from "@/images/thumb-1.webp";
import thumb2 from "@/images/thumb-2.webp";
import thumb3 from "@/images/thumb-3.webp";
import thumb4 from "@/images/thumb-4.webp";
import thumb5 from "@/images/thumb-5.webp";
import thumb6 from "@/images/thumb-6.webp";

export const setupTasks = [
  {
    label: "Create an account",
    action: "Add now",
    tone: "primary",
    done: true,
    href: "/settings",
  },
  {
    label: "Add credits",
    action: "Add credits",
    tone: "primary",
    done: false,
    href: "/billing",
  },
  {
    label: "Generate your first media",
    action: "Start",
    tone: "secondary",
    done: false,
    href: "/explore",
  },
];

export const apiTasks = [
  { label: "Get an API key", action: "Get", href: "/api-keys" },
  {
    label: "Quick start guide",
    action: "Check",
    href: "/serverless",
  },
  {
    label: "How to use in Python SDK",
    action: "Check",
    href: "/llm",
  },
  {
    label: "Check documentation",
    action: "Check",
    href: "/settings",
  },
];

export const createWithAiTasks = [
  { label: "Desktop app", action: "Download", href: "/explore" },
  { label: "Studio", action: "Open", href: "/explore" },
  {
    label: "Affiliate program",
    action: "Join",
    href: "/settings",
  },
  {
    label: "Become a collaborator",
    action: "Apply",
    href: "/settings",
  },
  {
    label: "Get inspiration",
    action: "Explore",
    href: "/explore",
  },
  { label: "API Keys", action: "Manage", href: "/api-keys" },
];

export const gettingStartedContentByIntent: Record<
  DashboardIntent,
  {
    title: string;
    description: string;
    showIndex: boolean;
    tasks: Array<{ label: string; action: string; href: string }>;
  }
> = {
  "create-with-ai": {
    title: "Quick start",
    description: "Quick access to essential features and resources.",
    showIndex: false,
    tasks: createWithAiTasks,
  },
  "build-with-api": {
    title: "Create Something with API",
    description: "Follow these steps to get the most out of your experience.",
    showIndex: true,
    tasks: apiTasks,
  },
};

export const modelCards = [
  { name: "flux-pro/kontext", type: "Text to image", image: thumb1 },
  { name: "wan-2.6/t2v", type: "Text to video", image: thumb2 },
  { name: "veo-3.1", type: "Video generation", image: thumb3 },
  { name: "gpt-image-1", type: "Image generation", image: thumb4 },
  { name: "kling-v2.6", type: "Text to video", image: thumb5 },
  { name: "pixverse-v5.6", type: "Video tools", image: thumb6 },
  { name: "runway/gen4", type: "Video generation", image: thumb3 },
  { name: "stable-diffusion-xl", type: "Image generation", image: thumb4 },
  { name: "luma/dream-machine", type: "Text to video", image: thumb2 },
  { name: "minimax/hailuo-02", type: "Video generation", image: thumb5 },
  { name: "ideogram-v3", type: "Image generation", image: thumb1 },
  { name: "pika-2.2", type: "Video tools", image: thumb6 },
];

export const favoriteModelCards = [modelCards[0], modelCards[2], modelCards[3]];

export const requests = [
  {
    id: "1d3636433f4c40d1865659ebad739a53",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb1,
    createdAt: "2026-03-03 19:30",
  },
  {
    id: "f94b29c15d4a4677b0f4a128ec7d8a6e",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Processing",
    outputPreview: thumb2,
    createdAt: "2026-03-03 19:27",
  },
  {
    id: "08ac31bf8d5c4b9f943a2d6e7f10c4d2",
    model: "veo-3.1",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb3,
    createdAt: "2026-03-03 18:54",
  },
  {
    id: "a2f78d49b81e4c6fa57d230e91cb6f34",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "4 images",
    outputPreview: thumb4,
    createdAt: "2026-03-03 18:32",
  },
  {
    id: "6b9e20fd4c7a4135a8d1f26e90bc34a1",
    model: "kling-v2.6",
    status: "Running",
    output: "Queued",
    outputPreview: thumb5,
    createdAt: "2026-03-03 18:10",
  },
  {
    id: "de39a741b8f24c96a17e3c5d0b2f8a64",
    model: "pixverse-v5.6",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb6,
    createdAt: "2026-03-03 17:45",
  },
  {
    id: "73ce5f2a9b104dd48f61a3e27c9d5b80",
    model: "flux-pro/kontext",
    status: "Succeeded",
    output: "2 images",
    outputPreview: thumb1,
    createdAt: "2026-03-03 17:21",
  },
  {
    id: "c4519e2d7a8f4b36b2d90f17ec6a3d85",
    model: "wan-2.6/t2v",
    status: "Running",
    output: "Rendering",
    outputPreview: thumb2,
    createdAt: "2026-03-03 16:58",
  },
  {
    id: "4ea2d0c98f7b4631ab56d3e71f2c84a9",
    model: "gpt-image-1",
    status: "Succeeded",
    output: "1 image",
    outputPreview: thumb4,
    createdAt: "2026-03-03 16:42",
  },
  {
    id: "9bf81c34d2a64e77bc0591f8e3a6d420",
    model: "veo-3.1",
    status: "Succeeded",
    output: "1 video",
    outputPreview: thumb3,
    createdAt: "2026-03-03 16:15",
  },
];

export const dashboardSummaryCards = [
  {
    label: "Current credit balance",
    value: "$6.186",
    icon: DollarSign,
    actions: [
      {
        label: "Manage credits",
        href: "/billing?billingTab=top-up",
        variant: "default",
      },
      {
        label: "Billing",
        href: "/billing?billingTab=billing&scrollTo=billing-records",
        variant: "outline",
      },
    ],
  },
  {
    label: "Requests in last 7 days",
    value: "2",
    icon: Activity,
    actions: [{ label: "Check history", href: "/history", variant: "outline" }],
  },
  {
    label: "Models Used",
    value: "2",
    icon: Layers,
    actions: [{ label: "Check usage", href: "/usage", variant: "outline" }],
  },
] as const;

export const usageTabSummaryCards = [
  {
    label: "Current credit balance",
    value: "$6.186",
    actions: [
      {
        label: "Manage credits",
        href: "/billing?billingTab=top-up",
        variant: "default",
      },
    ],
  },
  {
    label: "Total Cost",
    value: "$7.8450",
    actions: [],
  },
  {
    label: "Total Requests",
    value: "130",
    actions: [],
  },
  {
    label: "Models Used",
    value: "8",
    actions: [],
  },
] as const;

export const usageTabPerModel = [
  {
    model: "google/nano-banana-2/text-to-image",
    requestCount: 34,
    avgCost: 0.064,
    cost: 2.176,
  },
  {
    model: "wavespeed-ai/qwen-image-2.0/edit",
    requestCount: 26,
    avgCost: 0.03,
    cost: 0.78,
  },
  {
    model: "black-forest-labs/flux-pro/kontext",
    requestCount: 18,
    avgCost: 0.045,
    cost: 0.81,
  },
  {
    model: "openai/gpt-image-1",
    requestCount: 22,
    avgCost: 0.052,
    cost: 1.144,
  },
  {
    model: "google/veo-3.1",
    requestCount: 8,
    avgCost: 0.11,
    cost: 0.88,
  },
  {
    model: "kling/kling-v2.6",
    requestCount: 6,
    avgCost: 0.09,
    cost: 0.54,
  },
  {
    model: "pixverse/pixverse-v5.6",
    requestCount: 9,
    avgCost: 0.075,
    cost: 0.675,
  },
  {
    model: "wan/wan-2.6/t2v",
    requestCount: 7,
    avgCost: 0.12,
    cost: 0.84,
  },
];

export const usageTabDailyUsage = [
  { date: "2026-03-10", cost: 0.742, requestCount: 12, modelsUsed: 4 },
  { date: "2026-03-09", cost: 0.836, requestCount: 14, modelsUsed: 5 },
  { date: "2026-03-08", cost: 0.691, requestCount: 11, modelsUsed: 4 },
  { date: "2026-03-07", cost: 0.924, requestCount: 15, modelsUsed: 6 },
  { date: "2026-03-06", cost: 0.768, requestCount: 13, modelsUsed: 5 },
  { date: "2026-03-05", cost: 0.653, requestCount: 10, modelsUsed: 4 },
  { date: "2026-03-04", cost: 0.911, requestCount: 16, modelsUsed: 6 },
  { date: "2026-03-03", cost: 1.104, requestCount: 18, modelsUsed: 7 },
  { date: "2026-03-02", cost: 0.702, requestCount: 11, modelsUsed: 4 },
  { date: "2026-03-01", cost: 0.514, requestCount: 10, modelsUsed: 3 },
];

export const usageTabBreakdown = [
  { date: "03/01", nanoBanana: 0.028, qwenEdit: 0.01 },
  { date: "03/03", nanoBanana: 0.064, qwenEdit: 0.02 },
  { date: "03/04", nanoBanana: 0.052, qwenEdit: 0.018 },
  { date: "03/05", nanoBanana: 0.041, qwenEdit: 0.012 },
  { date: "03/07", nanoBanana: 0.071, qwenEdit: 0.024 },
  { date: "03/09", nanoBanana: 0.076, qwenEdit: 0.028 },
  { date: "03/11", nanoBanana: 0.048, qwenEdit: 0.015 },
  { date: "03/13", nanoBanana: 0.069, qwenEdit: 0.022 },
  { date: "03/15", nanoBanana: 0.055, qwenEdit: 0.016 },
  { date: "03/17", nanoBanana: 0.043, qwenEdit: 0.012 },
  { date: "03/19", nanoBanana: 0.058, qwenEdit: 0.019 },
  { date: "03/21", nanoBanana: 0.072, qwenEdit: 0.025 },
  { date: "03/23", nanoBanana: 0.066, qwenEdit: 0.021 },
  { date: "03/25", nanoBanana: 0.053, qwenEdit: 0.017 },
  { date: "03/27", nanoBanana: 0.047, qwenEdit: 0.014 },
  { date: "03/29", nanoBanana: 0.039, qwenEdit: 0.011 },
  { date: "03/31", nanoBanana: 0.031, qwenEdit: 0.009 },
];

export const usageTabBreakdownChartConfig = {
  nanoBanana: {
    label: "google/nano-banana-2/text-to-image",
    color: "#5a56d6",
  },
  qwenEdit: {
    label: "wavespeed-ai/qwen-image-2.0/edit",
    color: "#3f74ff",
  },
} as const;

export const topUpAmountOptions = [
  { amount: "$5", throughput: "50 images or 5 videos per minute", benefit: "No concurrent tasks" },
  { amount: "$10", throughput: "50 images or 5 videos per minute", benefit: "Gain 3 concurrent tasks" },
  { amount: "$20", throughput: "100 images or 10 videos per minute", benefit: "Gain 6 concurrent tasks" },
  { amount: "$50", throughput: "200 images or 20 videos per minute", benefit: "Gain 12 concurrent tasks" },
  { amount: "$100", throughput: "500 images or 60 videos per minute", benefit: "Gain 100 concurrent tasks" },
  { amount: "$1,000", throughput: "3,000 images or 600 videos per minute", benefit: "Gain 2,000 concurrent tasks" },
  { amount: "$10,000", throughput: "VIP plan with custom throughput", benefit: "Contact us for concurrency setup" },
  { amount: "Custom", throughput: "Tailored usage package", benefit: "Minimum $5" },
];

export const billingTopUpRecords = [
  { description: "Credit Card", date: "03/03/2026, 10:56 PM", amount: "+$5.25" },
];

export const billingUsageRecords = [
  {
    accessKey: "--",
    predictionId: "1d3636433f4c40d1865659ebad739a53",
    model: "wavespeed-ai/qwen-image-2.0/edit",
    date: "03/04/2026, 2:48:16 PM",
    amount: "-$0.03",
  },
  {
    accessKey: "--",
    predictionId: "d383c32be0b046d9a07e98d45b7ca851",
    model: "google/nano-banana-2/text-to-image",
    date: "03/03/2026, 3:48:59 PM",
    amount: "-$0.064",
  },
];

export const apiKeyRecords = [
  {
    id: "key-1",
    name: "Test",
    key: "81931fbd464c3c57190d0d1484bc4a013ffd054f1ae538d5d70dda85adfa0ef",
    createdAt: "03/05/2026",
    status: "Active",
  },
];

export const settingsBasicInfo = {
  email: "mangmorchang@gmail.com",
  username: "Mangmor",
  loginMethods: ["Google"],
};

export const settingsTeamMembers = [{ name: "Mangmor", role: "Personal" }];

export const accountLevels = [
  { level: "Bronze", imagesPerMin: 10, videosPerMin: 5, maxConcurrent: 3, activation: "-" },
  {
    level: "Silver",
    imagesPerMin: 500,
    videosPerMin: 60,
    maxConcurrent: 100,
    activation: "One-time top-up of $100",
  },
  {
    level: "Gold",
    imagesPerMin: 3000,
    videosPerMin: 600,
    maxConcurrent: 2000,
    activation: "One-time top-up of $1,000",
  },
  {
    level: "Ultra",
    imagesPerMin: 5000,
    videosPerMin: 5000,
    maxConcurrent: 5000,
    activation: "One-time top-up of $10,000",
  },
];

export const currentAccountLevel = "Silver";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import ArrowRight from "@/images/arrow-right.svg";
import { posts, formatDate } from "../../data";
import { TableOfContents, type TOCItem } from "./toc";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | WaveSpeedAI Blog`,
    description: post.description,
  };
}

/* ------------------------------------------------------------------ */
/*  TOC definitions                                                    */
/* ------------------------------------------------------------------ */

const tocMap: Record<string, TOCItem[]> = {
  "wan-2-7-first-last-frame-guide": [
    { id: "what-flf-does", label: "What First & Last Frame Control Does" },
    { id: "input-preparation", label: "Input Preparation" },
    { id: "api-implementation", label: "API Implementation" },
    { id: "production-workflow", label: "Production Workflow" },
    { id: "where-it-fits", label: "Where It Fits" },
    { id: "failure-patterns", label: "Failure Patterns & Fixes" },
    { id: "faq", label: "FAQ" },
    { id: "conclusion", label: "Conclusion" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Article content                                                    */
/* ------------------------------------------------------------------ */

function Wan27Content() {
  return (
    <>
      {/* Intro */}
      <p className="text-foreground/80 mb-5 text-lg leading-8">
        I kept seeing teams describe first/last frame control as &ldquo;you just
        upload two images.&rdquo; That&rsquo;s like describing async job queues
        as &ldquo;you just wait.&rdquo; The mechanics aren&rsquo;t hard — but
        the input design decisions are where most production workflows quietly
        fall apart.
      </p>
      <p className="text-foreground/80 mb-10 text-lg leading-8">
        This guide is for builders who need repeatable output, not just a demo
        that worked once.
      </p>

      {/* Section 1 */}
      <h2
        id="what-flf-does"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight first:mt-0 md:text-2xl"
      >
        What First-Frame &amp; Last-Frame Control Actually Does
      </h2>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        The Problem It Solves vs Standard I2V
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Standard image-to-video (I2V) anchors the opening frame and then the
        model improvises. The result is what the community often calls
        &ldquo;drift&rdquo; — the subject, camera position, or lighting
        gradually diverges from any target state you had in mind. For product
        demos or narrative sequences with a required endpoint, this is expensive
        to fix in post.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <a
          href="https://www.wan2-7.org/"
          className="text-brand decoration-brand/30 hover:decoration-brand underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WAN&rsquo;s FLF2V approach
        </a>{" "}
        uses an additional control adjustment mechanism: first and last frames
        are treated as control conditions, and semantic features from both
        images are injected into the generation process. This keeps style,
        content, and structure consistent while the model dynamically transforms
        between them.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        How Both Frames Are Used During Generation
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        The model doesn&rsquo;t simply interpolate pixel values. It uses CLIP
        semantic features and cross-attention mechanisms to keep the video
        stable — this design has been shown to reduce video jitter compared to
        single-anchor approaches. Your first frame defines the initial state;
        your last frame constrains the destination. The motion path between them
        is inferred, not specified, which is both the power and the main failure
        mode.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        What the Model Infers About the Path Between Them
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Your text prompt guides how the transition happens — not just that it
        happens. If your prompt says &ldquo;the product rotates slowly and
        reveals its front face,&rdquo; that motion description shapes the
        inferred path. Without a prompt, the model will still attempt a
        plausible transition, but you&rsquo;ll have far less control over
        direction changes, camera movement, or pacing.
      </p>

      {/* Section 2 */}
      <h2
        id="input-preparation"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        Input Preparation
      </h2>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Image Spec Requirements
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        The model uses your first frame&rsquo;s aspect ratio as close as
        possible to your target output. For a 3:4 input (750×1000), a 720P
        output setting will produce something around 816×1104 — not exactly 3:4.
        If you need exact ratios, plan to crop or letterbox in post. For the WAN
        series generally, 720p (1280×720 or portrait equivalent) is the
        recommended resolution for quality output; running smaller resolutions
        is a valid strategy for test iterations but not finals.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        Format: PNG or high-quality JPEG. Avoid compressed thumbnails as
        first/last frames — compression artifacts introduce noise the model has
        to interpret as intentional visual information.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Frame Pairing Strategies That Work
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        The strongest pairs share three things: consistent light source
        direction, matching depth of field characteristics, and a subject
        that&rsquo;s spatially plausible in both positions. A product shot in
        diffuse studio light paired with an end frame showing the same product
        at a slightly different angle works well. A packshot to a lifestyle hero
        shot works if the lighting setup is similar.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        For narrative sequences, think about the pair as defining a{" "}
        <strong className="text-foreground font-medium">verb</strong>: open →
        closed, before → after, assembling → complete. The cleaner the semantic
        relationship, the more coherent the inferred path.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        What Makes a Bad Frame Pair
      </h3>
      <p className="text-foreground/80 mb-3 leading-7">
        Three common culprits:
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Inconsistent lighting direction.
        </strong>{" "}
        If your first frame has the key light at 45° left and your last frame
        was shot with overhead light, the model will attempt to transition
        between two different shadow environments. The result is usually a
        mid-clip light-source jump that looks like a render error.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Spatial mismatch.
        </strong>{" "}
        A wide establishing shot paired with a tight close-up forces the model
        to invent a camera move. Sometimes that&rsquo;s intentional; usually it
        isn&rsquo;t. Keep focal distance roughly consistent unless you&rsquo;re
        explicitly prompting for a zoom or pull.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Conflicting depth cues.
        </strong>{" "}
        Bokeh in the first frame, everything in focus in the last — the model
        will interpret this as a depth-of-field change and try to animate it.
        That&rsquo;s not always wrong, but it&rsquo;s rarely what you intended.
      </p>

      {/* Section 3 */}
      <h2
        id="api-implementation"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        API Implementation
      </h2>
      <p className="text-foreground/80 mb-5 leading-7">
        The following reflects the documented FLF2V pattern for the WAN series.
        Verify current parameter names and endpoint paths in the{" "}
        <a
          href="https://www.alibabacloud.com/help/en/model-studio/image-to-video-by-first-and-last-frame-api-reference"
          className="text-brand decoration-brand/30 hover:decoration-brand underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alibaba Cloud Model Studio documentation
        </a>{" "}
        before production use. WAN 2.7 API specifics should be confirmed at
        launch.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Payload Structure
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        The core pattern involves two image inputs — one via public URL or local
        file path — passed as{" "}
        <code className="bg-surface rounded px-1.5 py-0.5 font-mono text-sm">
          first_frame_url
        </code>{" "}
        and{" "}
        <code className="bg-surface rounded px-1.5 py-0.5 font-mono text-sm">
          last_frame_url
        </code>
        , alongside a text prompt and resolution setting.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Python Request Pattern (Pseudocode)
      </h3>
      <pre className="border-foreground/5 bg-surface/80 mb-5 overflow-x-auto rounded-xs border p-5 font-mono text-sm leading-6">
        <code>{`# Verify model name and endpoint at launch — names change across versions
import os
from dashscope import VideoSynthesis

response = VideoSynthesis.async_call(
    model="wan2.x-flf2v-<verify-at-launch>",  # confirm exact model string
    first_frame_url="https://your-cdn.com/start.png",
    last_frame_url="https://your-cdn.com/end.png",
    prompt="Fixed camera. Begin from first image, end at last image. [describe motion]",
    negative_prompt="flicker, warping, blur",
    resolution="720P",  # verify accepted values
    # seed parameter: lock this once you have a good run
)
task_id = response.output.task_id`}</code>
      </pre>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Async Handling for Longer Jobs
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Image-to-video generation tasks typically run 1–5 minutes. The API uses
        a two-step async pattern: submit the task, get a task ID, then poll for
        the result. Build polling into your pipeline from the start. Don&rsquo;t
        assume synchronous behavior even for test calls — timeouts will silently
        drop results in naive implementations.
      </p>

      {/* Section 4 */}
      <h2
        id="production-workflow"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        Production Workflow: Draft-to-Final Method
      </h2>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Step 1 — Build a Reference Pair and Run a Test
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Start with a single pair. Don&rsquo;t batch until you&rsquo;ve seen one
        output end-to-end. Use your target content — not placeholder stock
        images — because spatial and lighting characteristics need to represent
        your actual asset library.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Step 2 — Validate the Motion Path Before Batch
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Watch the full clip once at 0.5x speed. Look for: mid-clip jitter,
        subject identity drift around frame 50–70% through the clip (this is
        where most artifacts concentrate), and lighting discontinuity. If you
        see any of these, fix the input pair before touching the prompt.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Step 3 — Lock Your Best Seed for Consistency
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Once you have a clean output, record the seed value. The FLF2V model
        accepts an optional prompt to guide in-between action and transformation
        logic. A locked seed plus a locked prompt gives you a reproducible
        generation unit you can apply across similar input pairs. This is what
        makes batch production predictable rather than probabilistic.
      </p>

      <h3 className="text-heading mt-8 mb-3 text-lg font-semibold">
        Step 4 — Scale to Batch Generation
      </h3>
      <p className="text-foreground/80 mb-5 leading-7">
        Structure your batch as: one canonical &ldquo;test pair&rdquo; that
        serves as your quality anchor, then variant pairs generated from the
        same controlled shooting setup. The{" "}
        <a
          href="https://huggingface.co/Wan-AI/Wan2.1-FLF2V-14B-720P"
          className="text-brand decoration-brand/30 hover:decoration-brand underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hugging Face model page for WAN FLF2V
        </a>{" "}
        documents the open-weight version for teams running local inference
        alongside API calls.
      </p>

      {/* Section 5 */}
      <h2
        id="where-it-fits"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        Where This Feature Fits (and Where It Doesn&rsquo;t)
      </h2>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">Best for:</strong>{" "}
        product demo sequences where the endpoint matters (packshot → feature
        reveal), narrative continuity shots with a defined before/after,
        controlled camera paths where you need spatial stability across multiple
        clips in a series.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">Not ideal for:</strong>{" "}
        highly dynamic motion with sharp direction changes (the model will
        smooth them out, often losing the drama), ambiguous spatial transitions
        where the first and last frames don&rsquo;t share a clear semantic
        relationship, or scenarios requiring frame-accurate timing — the model
        controls pacing, not you.
      </p>

      {/* Section 6 */}
      <h2
        id="failure-patterns"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        Common Failure Patterns &amp; Fixes
      </h2>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Motion artifact at mid-clip.
        </strong>{" "}
        Usually caused by a spatial mismatch in the input pair. The model
        &ldquo;commits&rdquo; to an interpolation path early, and the
        inconsistency surfaces around the midpoint. Fix: tighten the
        relationship between frames before changing the prompt.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Frame style inconsistency.
        </strong>{" "}
        If your first frame is a stylized render and your last is a photograph,{" "}
        <a
          href="https://huggingface.co/Wan-AI"
          className="text-brand decoration-brand/30 hover:decoration-brand underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          the model
        </a>{" "}
        will try to blend the visual styles. This rarely produces clean output.
        Match the image treatment — both renders, both photos, both
        illustrations.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        <strong className="text-foreground font-medium">
          Model ignoring the last frame.
        </strong>{" "}
        This happens when the prompt describes a motion that can&rsquo;t
        logically terminate at your last frame. The model prioritizes prompt
        coherence over frame adherence when they conflict. Write your prompt to
        arrive at the last frame, not just depart from the first.
      </p>

      {/* Section 7 — FAQ */}
      <h2
        id="faq"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        FAQ
      </h2>
      <div className="divide-foreground/5 divide-y">
        {[
          {
            q: "Can I use first/last frame with text-to-video or only I2V?",
            a: "The FLF2V mode is an extension of I2V. Both frame inputs are required. Standard T2V doesn't accept end-frame constraints by design.",
          },
          {
            q: "What image format works best for frame inputs?",
            a: "PNG for anything requiring clean edges or transparency handling. High-quality JPEG (>90 quality) is fine for photography. Avoid WebP if your platform hasn't confirmed support.",
          },
          {
            q: "Does this cost more than standard I2V?",
            a: "Pricing is resolution-dependent — 720p costs roughly twice 480p per generation. FLF2V itself doesn't carry a separate premium in the documented pricing, but confirm with your specific platform.",
          },
          {
            q: "How do I handle motion that requires sharp direction changes?",
            a: "Break the sequence into multiple clips with intermediate frames as endpoints. Chain them in post rather than trying to get a single generation to handle discontinuous motion.",
          },
          {
            q: "Can I combine this with the 9-grid input mode?",
            a: "These are separate input modes. WAN 2.7 supports first/last frame control and 9-grid image-to-video as distinct features. They're not currently combined in a single call — verify at launch if this changes.",
          },
        ].map((item) => (
          <div key={item.q} className="py-5">
            <h3 className="text-heading mb-2 font-semibold">{item.q}</h3>
            <p className="text-foreground/80 leading-7">{item.a}</p>
          </div>
        ))}
      </div>

      {/* Section 8 — Conclusion */}
      <h2
        id="conclusion"
        className="text-heading mt-14 mb-5 text-xl font-bold tracking-tight md:text-2xl"
      >
        Conclusion
      </h2>
      <p className="text-foreground/80 mb-5 leading-7">
        The interesting design space with first/last frame control isn&rsquo;t
        the API call — it&rsquo;s the input pair. That&rsquo;s where the real
        production leverage is, and it&rsquo;s where most teams underinvest. A
        well-designed frame pair with a clear semantic relationship will
        consistently outperform a perfect prompt paired with a mismatched input.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        For teams building batch pipelines: treat your input pair library as a
        first-class asset, not an afterthought. Once you have a locked seed and
        a validated pair format, the generation side becomes routine. The
        ComfyUI community has documented{" "}
        <a
          href="https://docs.comfy.org/tutorials/video/wan/wan-flf"
          className="text-brand decoration-brand/30 hover:decoration-brand underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WAN FLF2V workflow configurations
        </a>{" "}
        in detail if you&rsquo;re also running local inference alongside API
        calls — worth reading for the node-level insight into how frame
        conditioning actually works.
      </p>
      <p className="text-foreground/80 mb-5 leading-7">
        I keep coming back to something quiet here: the constraint is the
        feature. Giving the model a destination forces you to be precise about
        what you actually want. That&rsquo;s not a limitation — it&rsquo;s a
        discipline that tends to produce better output than open-ended
        generation ever does.
      </p>
    </>
  );
}

const contentMap: Record<string, () => React.ReactNode> = {
  "wan-2-7-first-last-frame-guide": Wan27Content,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const toc = tocMap[slug] ?? [];
  const Content = contentMap[slug];
  const related = posts.filter((p) => p.slug !== slug).slice(0, 6);

  return (
    <main>
      <Navbar sticky />

      {/* Three-column content area */}
      <section className="px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-24 lg:px-16">
        <div className="mx-auto flex max-w-7xl gap-8">
          {/* Left: TOC */}
          {toc.length > 0 && (
            <aside className="hidden w-44 shrink-0 xl:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          {/* Center: Header + Article */}
          <div className="mx-auto max-w-3xl min-w-0 flex-1">
            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Link
                  href="/blog"
                  className="text-foreground/50 hover:text-foreground/70 rounded-xs px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors duration-150"
                >
                  Blog
                </Link>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface text-foreground/50 rounded-xs px-2.5 py-1 font-mono text-[11px] font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-heading text-3xl leading-tight font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <p className="text-foreground/60 mt-5 text-lg leading-relaxed text-pretty">
                {post.description}
              </p>

              <div className="text-foreground/40 mt-6 flex items-center gap-3 font-mono text-xs">
                <time>{formatDate(post.date)}</time>
                <span className="bg-foreground/20 size-1 rounded-full" />
                <span>{post.readTime}</span>
              </div>

              {post.relatedModel && (
                <Link
                  href={post.relatedModel.href}
                  className="border-foreground/10 bg-background hover:bg-foreground/[0.02] mt-6 flex items-center justify-between gap-4 rounded-xs border py-2 pr-4 pl-2 transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={post.relatedModel.image}
                        alt={post.relatedModel.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-heading block truncate text-sm font-medium">
                        {post.relatedModel.name}
                      </span>
                      <span className="text-foreground/50 block truncate text-xs">
                        {post.relatedModel.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-foreground flex shrink-0 items-center gap-1.5 font-mono text-xs">
                    Try it
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              )}
            </header>

            <div className="relative mb-10 aspect-video overflow-hidden rounded-xs">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1280px) 720px, (min-width: 768px) 70vw, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <article>
              {Content ? (
                <Content />
              ) : (
                <p className="text-foreground/60 leading-7">
                  {post.description}
                </p>
              )}
            </article>
          </div>

          {/* Right: Promo sidebar */}
          <aside className="hidden w-52 shrink-0 xl:block">
            <div className="sticky top-24 space-y-8">
              {/* Desktop App */}
              <Link
                href="/landing/desktop"
                className="group border-foreground/5 bg-foreground/[0.03] hover:border-foreground/10 hover:bg-foreground/[0.05] block rounded-xs border p-4 transition-colors duration-150"
              >
                <p className="text-heading mb-3 text-sm font-bold">
                  WaveSpeed Desktop
                </p>
                <p className="text-foreground/40 text-xs leading-relaxed">
                  Face Swapper, Image Eraser, Image Enhancer, Image Generator,
                  Video Enhancer
                </p>
                <span className="text-foreground/50 group-hover:text-foreground/70 mt-4 flex items-center gap-1.5 text-xs transition-colors duration-150">
                  Free download
                  <ArrowRight className="size-3.5 shrink-0 -translate-y-px transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </Link>

              <div className="border-foreground/10 border-t" />

              {/* Latest Models */}
              <div>
                <p className="text-foreground/40 mb-4 font-mono text-xs font-bold tracking-widest uppercase">
                  Latest Models
                </p>
                <ul className="space-y-1">
                  {[
                    { name: "Qwen Image 2", href: "/models/qwen-image-2" },
                    {
                      name: "Seedance 1.5 Pro",
                      href: "/models/seedance-1-5-pro",
                    },
                    { name: "Wan 2.6", href: "/models/wan-2-6" },
                    { name: "Kling O3", href: "/models/kling-o3" },
                    { name: "Seedream AI", href: "/models/seedream" },
                  ].map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className="text-foreground/50 hover:text-foreground text-sm transition-colors duration-150"
                      >
                        {m.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/models"
                  className="text-foreground/60 hover:text-foreground mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150"
                >
                  View all models
                  <ArrowRight className="size-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-surface px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-heading mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            Related Articles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/posts/${r.slug}`}
                className="group bg-background flex flex-col overflow-hidden rounded-xs"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4">
                    {r.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-xs bg-white/20 px-2 py-0.5 font-mono text-[11px] font-bold text-white uppercase backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-heading group-hover:text-foreground/70 text-lg leading-snug font-medium transition-colors duration-150">
                    {r.title}
                  </h3>
                  <p className="text-foreground/60 line-clamp-2 text-sm">
                    {r.description}
                  </p>
                  <div className="text-foreground/40 mt-auto flex items-center gap-3 pt-2 font-mono text-xs">
                    <time>{formatDate(r.date)}</time>
                    <span className="bg-foreground/20 size-1 rounded-full" />
                    <span>{r.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-heading text-2xl leading-none font-bold tracking-tight md:text-4xl">
            Subscribe to Our Blog
          </h2>
          <p className="text-foreground/60 max-w-md font-mono text-sm text-pretty">
            Weekly AI insights, tutorials, and model updates delivered to your
            inbox.
          </p>
          <div className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="border-foreground/10 bg-background text-foreground placeholder:text-foreground/30 focus:border-foreground/30 h-11 flex-1 rounded-xs border px-4 font-mono text-sm transition-colors duration-150 outline-none"
            />
            <button className="bg-foreground text-background hover:bg-foreground/80 tracking-xl shrink-0 cursor-pointer rounded-xs px-6 py-2.5 font-mono text-sm font-bold uppercase transition-colors duration-150">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner>
        <h2 className="font-display text-center text-2xl leading-none font-bold tracking-tight text-balance text-black md:text-left md:text-5xl dark:text-white">
          Ready to Build with AI?
        </h2>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            href="/models"
            className="flex items-center gap-3 rounded-xs bg-black px-8 py-4 whitespace-nowrap text-white transition-colors duration-150 hover:bg-black/80"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              Explore Models
            </span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center rounded-xs border border-black/20 px-8 py-4 whitespace-nowrap text-black transition-colors duration-150 hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <span className="tracking-xl font-mono text-sm leading-4 font-medium uppercase">
              View Docs
            </span>
          </Link>
        </div>
      </CTABanner>

      <Footer />
    </main>
  );
}

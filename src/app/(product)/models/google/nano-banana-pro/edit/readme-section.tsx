"use client";

import { useEffect, useState } from "react";

const tocItems = [
  { id: "intro", label: "Google Nano Banana 2 Edit", featured: true },
  { id: "why-choose-this", label: "Why Choose This?" },
  { id: "parameters", label: "Parameters" },
  { id: "how-to-use", label: "How to Use" },
  { id: "pricing", label: "Pricing" },
  { id: "best-use-cases", label: "Best Use Cases" },
  { id: "pro-tips", label: "Pro Tips" },
  { id: "notes", label: "Notes" },
  { id: "related-models", label: "Related Models" },
] as const;

const parameterRows = [
  {
    parameter: "images",
    required: "Yes",
    description:
      "Reference images to edit (max: 14, click Add Item to add more)",
  },
  {
    parameter: "prompt",
    required: "Yes",
    description: "Text description of the desired edit",
  },
  {
    parameter: "aspect_ratio",
    required: "No",
    description:
      "Aspect ratio: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, 1:4, 4:1, 1:8, 8:1",
  },
  {
    parameter: "resolution",
    required: "No",
    description: "Output resolution: 0.5k, 1k (default), 2k, 4k",
  },
  {
    parameter: "enable_web_search",
    required: "No",
    description:
      "Enable web search to enhance generation with real-time info (default: false)",
  },
  {
    parameter: "output_format",
    required: "No",
    description: "Output format: png (default), jpeg",
  },
] as const;

export function ReadmeSection() {
  const [activeId, setActiveId] = useState<string>(tocItems[0].id);

  useEffect(() => {
    const sectionElements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        // Track the section that is currently nearest to top viewport.
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.3, 0.6],
      },
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-foreground font-display text-xl font-semibold">
        README
      </h2>

      <div className="grid items-start gap-4 md:grid-cols-4">
        <aside className="border-foreground/10 sticky top-14 hidden rounded-xs border p-3 md:col-span-1 md:block">
          <nav aria-label="README table of contents" className="-mx-3 space-y-1">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`block border-l-2 py-1.5 pr-2 pl-3 text-sm transition-colors ${
                  activeId === item.id
                    ? "text-foreground border-foreground"
                    : "text-foreground/70 border-transparent hover:text-foreground hover:bg-foreground/5 rounded-xs"
                }`}
              >
                <span className="block">{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <article className="border-foreground/10 space-y-8 rounded-xs border p-6 md:col-span-3">
          <section id="intro" className="scroll-mt-28 space-y-3">
            <h3 className="text-foreground text-2xl font-semibold">
              Google Nano Banana 2 Edit
            </h3>
            <p className="text-foreground/80 leading-7">
              Nano Banana 2 Edit (Gemini 3.1 Flash Image) is Google&apos;s
              advanced AI-powered image editing and generation model, designed
              to make visual transformation as intuitive as describing it in
              words. Built on Google&apos;s cutting-edge computer vision and
              generative research, it combines precision, flexibility, and
              semantic awareness for professional-grade editing.
            </p>
          </section>

          <section id="why-choose-this" className="scroll-mt-28 space-y-3">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Why Choose This?
            </h4>
            <ul className="text-foreground/90 list-disc space-y-2 pl-6 leading-7">
              <li>
                <span className="font-semibold">Natural language editing</span>{" "}
                Modify images using simple text instructions and preserve
                context.
              </li>
              <li>
                <span className="font-semibold">Multi-image reference</span>{" "}
                Upload
                up to 14 reference images for complex edits and compositions.
              </li>
              <li>
                <span className="font-semibold">Multi-resolution support</span>{" "}
                Output in 1k, 2k, or 4k resolution based on your needs.
              </li>
              <li>
                <span className="font-semibold">Flexible aspect ratios</span>{" "}
                Multiple options including 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4,
                9:16, 16:9, 21:9, 1:4, 4:1, 1:8, and 8:1.
              </li>
              <li>
                <span className="font-semibold">Prompt Enhancer</span> Built-in
                tool to automatically improve your edit descriptions.
              </li>
              <li>
                <span className="font-semibold">Format choice</span> Export in
                PNG or JPEG format.
              </li>
            </ul>
          </section>

          <section id="parameters" className="scroll-mt-28 space-y-3">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Parameters
            </h4>
            <div className="border-foreground/10 overflow-hidden rounded-xs border">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-foreground/5 text-foreground">
                  <tr>
                    <th className="border-foreground/10 border-b px-3 py-2 text-left font-semibold">
                      Parameter
                    </th>
                    <th className="border-foreground/10 border-b px-3 py-2 text-left font-semibold">
                      Required
                    </th>
                    <th className="border-foreground/10 border-b px-3 py-2 text-left font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parameterRows.map((row) => (
                    <tr key={row.parameter}>
                      <td className="border-foreground/10 border-b px-3 py-2 align-top font-mono text-xs">
                        {row.parameter}
                      </td>
                      <td className="border-foreground/10 border-b px-3 py-2 align-top">
                        {row.required}
                      </td>
                      <td className="border-foreground/10 border-b px-3 py-2 align-top">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="how-to-use" className="scroll-mt-28 space-y-3">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              How to Use
            </h4>
            <ol className="text-foreground/90 list-decimal space-y-2 pl-6 leading-7">
              <li>
                <span className="font-semibold">Upload reference images</span>{" "}
                add the images you want to edit (up to 14 images).
              </li>
              <li>
                <span className="font-semibold">Write your prompt</span>{" "}
                describe the edit clearly.
              </li>
              <li>
                <span className="font-semibold">
                  Choose aspect ratio (optional)
                </span>{" "}
                select a preset or leave empty for default.
              </li>
              <li>
                <span className="font-semibold">Select resolution</span> choose
                1k, 2k, or 4k based on your needs.
              </li>
              <li>
                <span className="font-semibold">Choose output format</span> PNG
                for transparency support, JPEG for smaller file size.
              </li>
              <li>
                <span className="font-semibold">
                  Use Prompt Enhancer (optional)
                </span>{" "}
                click to automatically refine your description.
              </li>
              <li>
                <span className="font-semibold">Run</span> submit and download
                your edited image.
              </li>
            </ol>
          </section>

          <section id="pricing" className="scroll-mt-28 space-y-2">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Pricing
            </h4>
            <p className="text-foreground/80 leading-7">
              Pay per run with transparent metering. Final cost varies by
              selected resolution, reference image count, and advanced
              enhancement options.
            </p>
          </section>

          <section id="best-use-cases" className="scroll-mt-28 space-y-2">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Best Use Cases
            </h4>
            <ul className="text-foreground/90 list-disc space-y-2 pl-6 leading-7">
              <li>Product image touch-up and background replacement.</li>
              <li>
                Style transfer for campaign assets and social media content.
              </li>
              <li>Iterative concept exploration for designers and creators.</li>
            </ul>
          </section>

          <section id="pro-tips" className="scroll-mt-28 space-y-2">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Pro Tips
            </h4>
            <ul className="text-foreground/90 list-disc space-y-2 pl-6 leading-7">
              <li>
                Keep prompts explicit about subject, background, and target
                style.
              </li>
              <li>
                Use multiple references when preserving identity is important.
              </li>
              <li>
                Start with 1k for fast iteration, then scale to higher
                resolution.
              </li>
            </ul>
          </section>

          <section id="notes" className="scroll-mt-28 space-y-2">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Notes
            </h4>
            <p className="text-foreground/80 leading-7">
              Model behavior may vary by prompt wording and source image
              quality. Test with a small batch first when running production
              workflows.
            </p>
          </section>

          <section id="related-models" className="scroll-mt-28 space-y-2">
            <h4 className="text-foreground border-foreground/10 border-b pb-2 text-xl font-semibold">
              Related Models
            </h4>
            <ul className="text-foreground/80 list-disc space-y-2 pl-6 leading-7">
              <li>google/nano-banana-2/text-to-image</li>
              <li>google/nano-banana-pro/edit-multi</li>
              <li>google/nano-banana-pro/retouch</li>
            </ul>
          </section>
        </article>
      </div>
    </section>
  );
}

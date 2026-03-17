"use client";

import { useId } from "react";

const SHAPE =
  "M72.6041 55.1768L95.6748 12.202C99.7086 4.68812 107.546 0 116.075 0H142.622C146.936 0 150.433 3.49701 150.433 7.8108V55.1768L173.504 12.202C177.538 4.68812 185.375 0 193.904 0H220.451C224.765 0 228.262 3.49701 228.262 7.8108V49.0964C228.262 52.794 225.265 55.7914 221.567 55.7914H213.426L192.44 94.8827C187.599 103.899 176.261 107.126 167.398 102.009L144.157 88.5908C138.633 85.4017 135.23 79.5078 135.23 73.1295V56.4744L114.611 94.8827C109.77 103.899 98.4316 107.126 89.5689 102.009L66.3276 88.5908C60.8038 85.4017 57.401 79.5078 57.401 73.1295V56.4744L49.6172 70.9734C47.83 74.3026 43.6434 75.494 40.3711 73.6047L2.93004 51.9884C0.189187 50.4059 -0.799263 46.9327 0.697701 44.1442L17.8458 12.202C21.8795 4.6881 29.7173 0 38.2454 0H64.7933C69.1071 0 72.6041 3.49701 72.6041 7.8108V55.1768Z";

// Skeleton: center spine of the W with flat peak tops
const SKELETON =
  "M 10,48 L 48,3 H 68 L 60,78 L 125,3 H 146 L 138,78 L 202,3 H 222 L 225,48";

export function AnimatedLogo({
  className,
  duration = 1.5,
  loop = false,
}: {
  className?: string;
  duration?: number;
  loop?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const clipId = `logo-clip-${id}`;

  const totalDur = loop ? `${duration * 1.667}s` : `${duration}s`;

  return (
    <svg
      width="229"
      height="105"
      viewBox="0 0 229 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPE} />
        </clipPath>
      </defs>
      <path
        d={SKELETON}
        fill="none"
        stroke="currentColor"
        strokeWidth={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${clipId})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      >
        <animate
          attributeName="stroke-dashoffset"
          values={loop ? "1;0;0" : "1;0"}
          dur={totalDur}
          fill="freeze"
          calcMode={loop ? "spline" : "spline"}
          keySplines={loop ? "0.4 0 0.2 1; 0 0 1 1" : "0.4 0 0.2 1"}
          keyTimes={loop ? "0;0.6;1" : "0;1"}
          repeatCount={loop ? "indefinite" : undefined}
        />
        <animate
          attributeName="stroke-width"
          values={loop ? "0;40;150;150" : "0;40;150"}
          dur={totalDur}
          fill="freeze"
          calcMode="spline"
          keySplines={
            loop
              ? "0.0 0 1.0 1; 0.0 0 0.15 1; 0 0 1 1"
              : "0.0 0 1.0 1; 0.0 0 0.15 1"
          }
          keyTimes={loop ? "0;0.03;0.6;1" : "0;0.05;1"}
          repeatCount={loop ? "indefinite" : undefined}
        />
      </path>
    </svg>
  );
}

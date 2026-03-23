import type { StaticImageData } from "next/image";

import slide1 from "@/images/slide-1.webp";
import slide2 from "@/images/slide-2.webp";
import slide3 from "@/images/slide-3.webp";
import slide4 from "@/images/slide-4.webp";
import slide5 from "@/images/slide-5.webp";

const SLIDES: StaticImageData[] = [slide1, slide2, slide3, slide4, slide5];

export function slideImageForFavouriteId(id: string): StaticImageData {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h + id.charCodeAt(i) * (i + 1)) % 2147483647;
  }
  return SLIDES[Math.abs(h) % SLIDES.length]!;
}

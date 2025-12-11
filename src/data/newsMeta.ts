export type NewsHotspot = {
  x: number; // percentage from left (0–100)
  y: number; // percentage from top (0–100)
  size?: number;
  label: string;
};

export type NewsMetaItem = {
  hotspots?: NewsHotspot[];
  reason?: string;
};

export const newsMeta: NewsMetaItem[] = [
  {
    // Card 1
    hotspots: [
      { x: 15, y: 11, size: 25, label: "Usage of numbers in author name" },
      {
        x: 75,
        y: 50,
        size: 200,
        label: "Different quality for second half logo",
      },
      { x: 22, y: 91, size: 70, label: "Use of capitalized text" },
    ],
    reason:
      "Inconsistent branding quality and sensationalized capitalization indicate a fabricated post from an unreliable source.",
  },
  {
    // Card 2
    hotspots: [
      { x: 15, y: 11, size: 25, label: "Usage of numbers in author name" },
      { x: 60, y: 55, size: 300, label: "Poor attempt at PhotoShop" },
    ],
    reason:
      "Manipulated imagery and low-quality edits reveal the content is doctored and not credible.",
  },
  {
    // Card 3
    // True article — no hotspots, no reason
  },
  {
    // Card 4
    hotspots: [
      { x: 24, y: 11, size: 100, label: "Unknown news platform" },
      { x: 12, y: 83, size: 100, label: "Unknown news platform" },
    ],
    reason:
      "Source lacks verifiable reputation and uses ambiguous branding, undermining the credibility of the claim.",
  },
  {
    // Card 5
    hotspots: [
      { x: 24, y: 11, size: 100, label: "Unknown news platform" },
      { x: 12, y: 83, size: 100, label: "Unknown news platform" },
    ],
    reason:
      "Unverified outlet and sensational framing suggest misinformation rather than a trustworthy report.",
  },
  {
    // Card 6
    hotspots: [
      { x: 16, y: 11, size: 25, label: "Usage of numbers in author name" },
      { x: 67, y: 70, size: 60, label: "AI generation mistake" },
      { x: 45, y: 50, size: 250, label: "Poor attempt at PhotoShop" },
    ],
    reason:
      "AI artifacts and obvious compositing errors indicate the content is generated or altered.",
  },
  {
    // Card 7
    // True article — no hotspots, no reason
  },
  {
    // Card 8
    hotspots: [
      { x: 24, y: 11, size: 100, label: "Unknown news platform" },
      { x: 12, y: 85, size: 100, label: "Unknown news platform" },
      { x: 37, y: 88, size: 125, label: "Generic or missing source details (Rumours)" },
      { x: 50, y: 60, size: 250, label: "Poor attempt at PhotoShop" },
    ],
    reason:
      "Lack of concrete sourcing and vague details point to low credibility.",
  },
  {
    // Card 9
    // True article — no hotspots, no reason
  },
  {
    // Card 10
    // True article — no hotspots, no reason
  },
];

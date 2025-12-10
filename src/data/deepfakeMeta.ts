export type DeepfakeHotspot = {
  x: number; // percentage from left (0–100)
  y: number; // percentage from top (0–100)
  size?: number | string;
  label?: string;
};

export type DeepfakeMetaItem = {
  fakeIndex: number; // 0 = left image, 1 = right image
  reason: string;
  hotspots?: DeepfakeHotspot[];
};

export const deepfakeMeta: DeepfakeMetaItem[] = [
  {
    // Pair 1
    fakeIndex: 0,
    reason:
      "Notice how the hairline starts in an unnatural place, there are lots of hairs floating around that don't seem to come from anywhere, and her neck is quite unnaturally long.",
    hotspots: [
      { x: 50, y: 18, size: 56, label: "Hairline" },
      { x: 52, y: 70, size: 100, label: "Neck" },
      { x: 90, y: 60, size: 200, label: "Floating hairs" },
    ],
  },
  {
    // Pair 2
    fakeIndex: 0,
    reason:
      "Notice how the image on the left has two colors of eyebrows, among other things.",
    hotspots: [
      { x: 35, y: 30, size: 56, label: "Eyebrow left" },
      { x: 63, y: 30, size: 56, label: "Eyebrow right" },
    ],
  },
  {
    // Pair 3
    fakeIndex: 0,
    reason:
      "Notice how the nose piercing of the woman on the right does not go into her nose; an earring is missing.",
    hotspots: [
      { x: 70, y: 65, size: 70, label: "Earring" },
      { x: 45, y: 55, size: 50, label: "Nose piercing" },
    ],
  },
  {
    // Pair 4
    fakeIndex: 0,
    reason:
      "Notice how the earring of the woman on the left is positioned in a very unusual manner in her earlobe.",
    hotspots: [
      { x: 53, y: 49, size: 40, label: "Piercing" }
    ],
  },
  {
    // Pair 5
    fakeIndex: 0,
    reason:
      "Notice how the woman's shoulder is unnaturally high and very asymmetrical, her arm does not extend properly behind her leg. Her leg stops abruptly. A thumb is growing out of her wrist.",
    hotspots: [
      { x: 75, y: 45, size: 100, label: "Shoulder" },
      { x: 50, y: 75, size: 120, label: "Arm" },
      { x: 35, y: 94, size: 50, label: "Thumb" },
    ],
  },
  {
    // Pair 6
    fakeIndex: 0,
    reason: "Notice how the skin is very plastic-like, the face looks too symmetrical and weirdly placed upon the head, the logo on the chest does not exist and the background is very colourfully distorted.",
    hotspots: [
      { x: 36, y: 35, size: 50, label: "Skin" },
      { x: 48, y: 20, size: 110, label: "Face" },
      { x: 85, y: 80, size: 120, label: "Background" },
      { x: 65, y: 58, size: 40, label: "Logo" },
    ],
  },
];

import { QualityPrioritization, StabilizationMode } from "react-native-vision-camera";

export const PHOTO_QUALITY: QualityPrioritization[] = [
  'speed',
  'balanced',
  'quality',
];

export const VIDEO_STABILIZATION: StabilizationMode[] = [
  "standard",
  "cinematic",
  "cinematic-extended",
  "preview-optimized",
  "cinematic-extended-enhanced",
  "low-latency"
]
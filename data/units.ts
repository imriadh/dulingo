import type { Unit } from "@/types/learning";

export const units = [
  {
    id: "spanish-basics-1",
    languageId: "spanish",
    title: "Spanish Basics 1",
    description: "Learn greetings and introduce yourself.",
    emoji: "🌮",
    accentColor: "#F97316",
    estimatedMinutes: 12,
    order: 1,
    lessonIds: ["spanish-hello", "spanish-introduce-yourself"],
  },
  {
    id: "french-basics-1",
    languageId: "french",
    title: "French Basics 1",
    description: "Practice polite greetings and first conversations.",
    emoji: "🥐",
    accentColor: "#3B82F6",
    estimatedMinutes: 12,
    order: 1,
    lessonIds: ["french-hello", "french-meet-you"],
  },
  {
    id: "japanese-basics-1",
    languageId: "japanese",
    title: "Japanese Basics 1",
    description: "Practice easy first phrases with helpful pronunciation.",
    emoji: "🎌",
    accentColor: "#EF4444",
    estimatedMinutes: 12,
    order: 1,
    lessonIds: ["japanese-hello", "japanese-thanks"],
  },
] as const satisfies ReadonlyArray<Unit>;

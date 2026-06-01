import type { SupportedLanguage } from "@/types/learning";

export const languages = [
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    shortCode: "es",
    emoji: "🇪🇸",
    description: "Start speaking with simple greetings and everyday phrases.",
    starterPhrase: "Hola",
    order: 1,
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    shortCode: "fr",
    emoji: "🇫🇷",
    description: "Learn friendly greetings and short introduction phrases.",
    starterPhrase: "Bonjour",
    order: 2,
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    shortCode: "ja",
    emoji: "🇯🇵",
    description:
      "Practice useful first phrases with simple pronunciation help.",
    starterPhrase: "こんにちは",
    order: 3,
  },
] as const satisfies ReadonlyArray<SupportedLanguage>;

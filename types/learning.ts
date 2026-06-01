export type SupportedLanguageId = "spanish" | "french" | "japanese";

export type UnitId =
  | "spanish-basics-1"
  | "french-basics-1"
  | "japanese-basics-1";

export type LessonId =
  | "spanish-hello"
  | "spanish-introduce-yourself"
  | "french-hello"
  | "french-meet-you"
  | "japanese-hello"
  | "japanese-thanks";

export type LessonKind =
  | "greetings"
  | "introductions"
  | "listening"
  | "speaking"
  | "review";

export type LessonActivityType = "listen" | "say" | "translate" | "match";

export interface SupportedLanguage {
  id: SupportedLanguageId;
  name: string;
  nativeName: string;
  shortCode: string;
  emoji: string;
  description: string;
  starterPhrase: string;
  order: number;
}

export interface Unit {
  id: UnitId;
  languageId: SupportedLanguageId;
  title: string;
  description: string;
  emoji: string;
  accentColor: string;
  estimatedMinutes: number;
  order: number;
  lessonIds: ReadonlyArray<LessonId>;
}

export interface LessonGoal {
  title: string;
  description: string;
  successCriteria: ReadonlyArray<string>;
}

export interface VocabularyItem {
  id: string;
  term: string;
  translation: string;
  transliteration?: string;
  partOfSpeech?: string;
  example?: string;
}

export interface PhraseItem {
  id: string;
  source: string;
  translation: string;
  transliteration?: string;
  note?: string;
}

export interface VisionTeacherPrompt {
  systemPrompt: string;
  lessonContext: string;
  openingLine: string;
  coachingNotes: ReadonlyArray<string>;
  encouragementLines: ReadonlyArray<string>;
  closingLine: string;
}

interface BaseLessonActivity {
  id: string;
  type: LessonActivityType;
  title: string;
  instruction: string;
}

export interface ListenActivity extends BaseLessonActivity {
  type: "listen";
  prompt: string;
  answer: string;
  hint?: string;
}

export interface SayActivity extends BaseLessonActivity {
  type: "say";
  prompt: string;
  targetPhrase: string;
  pronunciationHint?: string;
}

export interface TranslateActivity extends BaseLessonActivity {
  type: "translate";
  prompt: string;
  answer: string;
  options?: ReadonlyArray<string>;
}

export interface MatchActivity extends BaseLessonActivity {
  type: "match";
  prompt: string;
  pairs: ReadonlyArray<{
    left: string;
    right: string;
  }>;
}

export type LessonActivity =
  | ListenActivity
  | SayActivity
  | TranslateActivity
  | MatchActivity;

export interface Lesson {
  id: LessonId;
  languageId: SupportedLanguageId;
  unitId: UnitId;
  title: string;
  subtitle: string;
  kind: LessonKind;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  goal: LessonGoal;
  vocabulary: ReadonlyArray<VocabularyItem>;
  phrases: ReadonlyArray<PhraseItem>;
  activities: ReadonlyArray<LessonActivity>;
  aiTeacherPrompt: VisionTeacherPrompt;
}

export type TranslationLanguage =
  | "en"
  | "ru"
  | "zh"
  | "ko"
  | "ja"
  | "uz"
  | "tg"
  | "ky"
  | "kk"
  | "fa-AF"
  | "ps"
  | "tk"
  | "az"
  | "tr"
  | "hi"
  | "ur"
  | "ar"
  | "be"
  | "uk"
  | "de"
  | "th"
  | "sw"
  | "am"
  | "af"
  | "hy";

export type TranslationParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type LocaleTree = Record<string, unknown>;

export const FALLBACK_LANGUAGE: TranslationLanguage = "en";

const SUPPORTED_LANGUAGES: TranslationLanguage[] = [
  "en",
  "ru",
  "zh",
  "ko",
  "ja",
  "uz",
  "tg",
  "ky",
  "kk",
  "fa-AF",
  "ps",
  "tk",
  "az",
  "tr",
  "hi",
  "ur",
  "ar",
  "be",
  "uk",
  "de",
  "th",
  "sw",
  "am",
  "af",
  "hy",
];

let currentLanguage: TranslationLanguage = FALLBACK_LANGUAGE;
const listeners = new Set<() => void>();

function normalizeLanguageCode(input?: string | null): string {
  return String(input || "")
    .trim()
    .replace(/_/g, "-")
    .toLowerCase();
}

export function resolveAppLanguage(input?: string | null): TranslationLanguage {
  const normalized = normalizeLanguageCode(input);
  if (!normalized) return FALLBACK_LANGUAGE;

  const exact = SUPPORTED_LANGUAGES.find(
    (code) => normalizeLanguageCode(code) === normalized,
  );
  if (exact) return exact;

  const base = normalized.split("-")[0];
  const baseMatch = SUPPORTED_LANGUAGES.find(
    (code) => normalizeLanguageCode(code) === base,
  );

  return baseMatch ?? FALLBACK_LANGUAGE;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!isObject(acc)) return undefined;
    return acc[key];
  }, source);
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;

  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const value = params[key.trim()];
    return value === null || value === undefined ? "" : String(value);
  });
}

const SERVER_TRANSLATIONS: Record<TranslationLanguage, LocaleTree> = {
  en: {
    common: {
      ok: "OK",
      error: "Error",
      pending: "Pending",
      processing: "Processing",
      securityCheck: "Security check",
    },
    ai: {
      name: "Sabi AI",
      unavailable: "AI service is unavailable.",
    },
  },
  ru: {
    common: {
      ok: "OK",
      error: "Ошибка",
      pending: "Ожидание",
      processing: "В обработке",
      securityCheck: "Проверка безопасности",
    },
    ai: {
      name: "Sabi AI",
      unavailable: "AI сервис недоступен.",
    },
  },
  zh: {},
  ko: {},
  ja: {},
  uz: {},
  tg: {},
  ky: {},
  kk: {},
  "fa-AF": {},
  ps: {},
  tk: {},
  az: {},
  tr: {},
  hi: {},
  ur: {},
  ar: {},
  be: {},
  uk: {},
  de: {},
  th: {},
  sw: {},
  am: {},
  af: {},
  hy: {},
};

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

export function getAppLanguage(): TranslationLanguage {
  return currentLanguage;
}

export async function setAppLanguage(language: string): Promise<TranslationLanguage> {
  const nextLanguage = resolveAppLanguage(language);
  if (nextLanguage !== currentLanguage) {
    currentLanguage = nextLanguage;
    emitChange();
  }
  return nextLanguage;
}

export function subscribeAppLanguage(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function t(key: string, params?: TranslationParams): string {
  const activeLocale = SERVER_TRANSLATIONS[currentLanguage] ?? SERVER_TRANSLATIONS.en;
  const activeValue = getByPath(activeLocale, key);
  if (typeof activeValue === "string") {
    return interpolate(activeValue, params);
  }

  const fallbackValue = getByPath(SERVER_TRANSLATIONS.en, key);
  if (typeof fallbackValue === "string") {
    return interpolate(fallbackValue, params);
  }

  return key;
}

export function useI18n() {
  const language = getAppLanguage();
  return {
    language,
    direction: ["ar", "ur", "ps", "fa-AF"].includes(language) ? "rtl" : "ltr",
    isRTL: ["ar", "ur", "ps", "fa-AF"].includes(language),
    t,
    setLanguage: setAppLanguage,
    languages: SUPPORTED_LANGUAGES,
  };
}

export default useI18n;

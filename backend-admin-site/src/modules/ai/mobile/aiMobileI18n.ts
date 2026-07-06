const SABI_AI_123_EXTRA_TEXT: Record<string, Record<string, string>> = {
  en: {
    "chat.aiReportTitle": "Report AI response",
    "chat.aiReportAction": "Report",
    "chat.aiReportDescription": "Flag this AI response for safety, quality, privacy, or financial-payment concern review.",
    "chat.aiReportReasonsTitle": "Available report reasons",
    "chat.aiReportReason.offensive": "Offensive or abusive",
    "chat.aiReportReason.unsafe": "Unsafe advice",
    "chat.aiReportReason.incorrect": "Incorrect or misleading",
    "chat.aiReportReason.privacy": "Privacy concern",
    "chat.aiReportReason.financial": "Financial or payment concern",
    "chat.aiReportReason.other": "Other",
    "chat.aiReportReviewerNote": "Mobile UI-only: no report is submitted in this patch. Backend/admin intake must be connected in a later approved stage.",
    "chat.providerNotConfiguredTitle": "Provider not configured",
    "chat.providerNotConfiguredBody": "Sabi AI provider-dependent answers stay safe-disabled until the server-side provider is configured. No fake AI provider success is shown.",
    "chat.providerNotConfiguredReviewer": "Reviewer evidence: provider_not_configured is shown honestly and does not call the AI provider.",
  },
  ru: {
    "chat.aiReportTitle": "Пожаловаться на ответ AI",
    "chat.aiReportAction": "Жалоба",
    "chat.aiReportDescription": "Отметить этот ответ AI для проверки безопасности, качества, приватности или финансово-платёжного риска.",
    "chat.aiReportReasonsTitle": "Доступные причины жалобы",
    "chat.aiReportReason.offensive": "Оскорбительный или грубый ответ",
    "chat.aiReportReason.unsafe": "Небезопасный совет",
    "chat.aiReportReason.incorrect": "Неверный или вводящий в заблуждение ответ",
    "chat.aiReportReason.privacy": "Риск приватности",
    "chat.aiReportReason.financial": "Финансовый или платёжный риск",
    "chat.aiReportReason.other": "Другое",
    "chat.aiReportReviewerNote": "Только mobile UI: в этом патче жалоба не отправляется. Backend/admin intake подключается отдельным подтверждённым этапом.",
    "chat.providerNotConfiguredTitle": "Provider не подключён",
    "chat.providerNotConfiguredBody": "Ответы Sabi AI, зависящие от provider, остаются safe-disabled, пока server-side provider не настроен. Fake AI provider success не показывается.",
    "chat.providerNotConfiguredReviewer": "Reviewer evidence: provider_not_configured показывается честно и не вызывает AI provider.",
  },
  uz: {
    "chat.aiReportTitle": "AI javobiga shikoyat qilish",
    "chat.aiReportAction": "Shikoyat",
    "chat.aiReportDescription": "Bu AI javobini xavfsizlik, sifat, maxfiylik yoki moliyaviy-to‘lov xavfi bo‘yicha tekshiruvga belgilang.",
    "chat.aiReportReasonsTitle": "Shikoyat sabablari",
    "chat.aiReportReason.offensive": "Haqoratli yoki qo‘pol javob",
    "chat.aiReportReason.unsafe": "Xavfsiz bo‘lmagan maslahat",
    "chat.aiReportReason.incorrect": "Noto‘g‘ri yoki chalg‘ituvchi javob",
    "chat.aiReportReason.privacy": "Maxfiylik xavfi",
    "chat.aiReportReason.financial": "Moliyaviy yoki to‘lov xavfi",
    "chat.aiReportReason.other": "Boshqa",
    "chat.aiReportReviewerNote": "Faqat mobile UI: bu patch hisobot yubormaydi. Backend/admin qabul qilish keyingi tasdiqlangan bosqichda ulanadi.",
    "chat.providerNotConfiguredTitle": "Provider sozlanmagan",
    "chat.providerNotConfiguredBody": "Sabi AI providerga bog‘liq javoblar server-side provider sozlanmaguncha safe-disabled holatda qoladi. Soxta AI provider success ko‘rsatilmaydi.",
    "chat.providerNotConfiguredReviewer": "Reviewer evidence: provider_not_configured halol ko‘rsatiladi va AI provider chaqirilmaydi.",
  },
};


import {
  t as translateApp,
  type TranslationLanguage,
  type TranslationParams,
} from "../../../shared/i18n";
import type { AiMobileApiError } from "./aiMobileTypes";

export function normalizeAiMobileKey(key: string): string {
  return key.startsWith("ai.mobile.") ? key : `ai.mobile.${key}`;
}

export function denormalizeAiMobileKey(key: string): string {
  return key.startsWith("ai.mobile.") ? key.slice("ai.mobile.".length) : key;
}

export function isMissingAiMobileText(value: string, key: string): boolean {
  const normalizedKey = normalizeAiMobileKey(key);
  const localKey = denormalizeAiMobileKey(key);

  return value === normalizedKey || value === key || value === localKey;
}

function aiMobileTextBase(
  _language: TranslationLanguage | string | null | undefined,
  key: string,
  params?: TranslationParams,
): string {
  const normalizedKey = normalizeAiMobileKey(key);
  const value = translateApp(normalizedKey, params);

  if (!isMissingAiMobileText(value, key)) {
    return value;
  }

  return denormalizeAiMobileKey(key);
}

export function aiMobileTextOrFallback(
  language: TranslationLanguage | string | null | undefined,
  key: string,
  fallback: string,
  params?: TranslationParams,
): string {
  const value = aiMobileText(language, key, params);
  return isMissingAiMobileText(value, key) ? fallback : value;
}

export function aiMobileErrorText(
  language: TranslationLanguage | string | null | undefined,
  error: AiMobileApiError | string | null | undefined,
  fallbackKey = "common.requestFailed",
): string {
  if (typeof error === "object" && error?.code) {
    const codeText = aiMobileText(language, `error.${error.code}`);

    if (!isMissingAiMobileText(codeText, `error.${error.code}`)) {
      return codeText;
    }
  }

  if (typeof error === "string" && error.trim()) {
    const codeText = aiMobileText(language, `error.${error}`);

    if (!isMissingAiMobileText(codeText, `error.${error}`)) {
      return codeText;
    }
  }

  return aiMobileText(language, fallbackKey);
}

export function aiMobileText(...args: Parameters<typeof aiMobileTextBase>): ReturnType<typeof aiMobileTextBase> {
  const language = String(args[0] ?? "en").toLowerCase();
  const key = String(args[1] ?? "");
  const shortLanguage = language.split("-")[0] || "en";
  const extra =
    SABI_AI_123_EXTRA_TEXT[language]?.[key] ??
    SABI_AI_123_EXTRA_TEXT[shortLanguage]?.[key] ??
    (shortLanguage === "en" ? SABI_AI_123_EXTRA_TEXT.en?.[key] : undefined);

  if (extra) {
    return extra as ReturnType<typeof aiMobileTextBase>;
  }

  return aiMobileTextBase(...args);
}

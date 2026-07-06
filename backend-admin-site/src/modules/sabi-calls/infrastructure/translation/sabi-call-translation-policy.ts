export function normalizeSabiCallLanguage(value: string | null | undefined, fallback: string): string {
  const normalized = (value ?? "").trim().toLowerCase();
  return normalized.length > 0 ? normalized : fallback;
}

export function assertSabiCallTranslationText(text: string): string {
  const normalized = text.trim();

  if (!normalized) {
    throw new Error("sabi_call_translation_text_required");
  }

  if (normalized.length > 8000) {
    throw new Error("sabi_call_translation_text_too_long");
  }

  return normalized;
}

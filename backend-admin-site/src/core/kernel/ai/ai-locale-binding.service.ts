import { AiPersistenceService } from "./ai-persistence.service"
import { type AiLocaleBindingState, type AiLocaleUpdateInput } from "./ai.types"

function parseSupportedLocales(): string[] {
  const raw = process.env.APP_SUPPORTED_LOCALES?.trim()
  if (!raw) {
    return ["en", "ru", "uz"]
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function getDefaultLocale() {
  return process.env.DEFAULT_APP_LOCALE?.trim() || "en"
}

export class AiLocaleBindingService {
  private readonly locales = new Map<string, AiLocaleBindingState>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  getSupportedLocales() {
    return parseSupportedLocales()
  }

  private ensureLoaded(userId: string) {
    if (this.locales.has(userId)) {
      return
    }
    const loaded = this.persistence?.getLocaleBinding(userId)
    if (loaded) {
      this.locales.set(userId, loaded)
    }
  }

  getLocale(userId: string): AiLocaleBindingState {
    this.ensureLoaded(userId)
    const existing = this.locales.get(userId)
    if (existing) {
      return existing
    }

    const defaultLocale = getDefaultLocale()
    const next: AiLocaleBindingState = {
      userId,
      locale: defaultLocale,
      source: "default",
      supportedLocales: this.getSupportedLocales(),
      updatedAt: new Date().toISOString(),
    }
    this.locales.set(userId, next)
    this.persistence?.saveLocaleBinding(userId, next)
    return next
  }

  updateLocale(input: AiLocaleUpdateInput): AiLocaleBindingState {
    const supported = this.getSupportedLocales()
    const locale = supported.includes(input.locale) ? input.locale : getDefaultLocale()
    const next: AiLocaleBindingState = {
      userId: input.userId,
      locale,
      source: input.source ?? "user",
      supportedLocales: supported,
      updatedAt: new Date().toISOString(),
    }
    this.locales.set(input.userId, next)
    this.persistence?.saveLocaleBinding(input.userId, next)
    return next
  }
}

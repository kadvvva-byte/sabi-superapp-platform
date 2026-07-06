import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

import {
  type AiAssistantMode,
  type AiProviderKey,
  type AiProviderSettings,
  type AiProviderSettingsUpdateInput,
} from "./ai.types"

const VALID_PROVIDERS: AiProviderKey[] = ["internal", "google", "yandex", "openai"]
const VALID_MODES: AiAssistantMode[] = ["general", "business", "education", "student", "abiturient", "teacher", "translation", "search"]

function normalizeLegacyProvider(provider: AiProviderKey): AiProviderKey {
  return provider === "yandex" ? "google" : provider
}

function isProviderKey(value: unknown): value is AiProviderKey {
  return typeof value === "string" && VALID_PROVIDERS.includes(value as AiProviderKey)
}

function isModeKey(value: unknown): value is AiAssistantMode {
  return typeof value === "string" && VALID_MODES.includes(value as AiAssistantMode)
}

export class AiProviderSettingsService {
  private readonly dir: string
  private readonly cache = new Map<string, AiProviderSettings>()

  constructor(dir = process.env.AI_PROVIDER_SETTINGS_DIR || join(process.cwd(), "var", "ai-provider-settings")) {
    this.dir = dir
  }

  getSettings(userId: string): AiProviderSettings {
    const cached = this.cache.get(userId)
    if (cached) return cached
    const loaded = this.load(userId)
    this.cache.set(userId, loaded)
    return loaded
  }

  updateSettings(input: AiProviderSettingsUpdateInput): AiProviderSettings {
    const current = this.getSettings(input.userId)
    const next: AiProviderSettings = {
      ...current,
      searchProvider: isProviderKey(input.searchProvider) ? normalizeLegacyProvider(input.searchProvider) : current.searchProvider,
      translationProvider: isProviderKey(input.translationProvider) ? normalizeLegacyProvider(input.translationProvider) : current.translationProvider,
      modeProviders: {
        ...current.modeProviders,
        ...this.normalizeModeProviders(input.modeProviders),
      },
      updatedAt: new Date().toISOString(),
    }
    this.persist(next)
    return next
  }

  resetSettings(userId: string): AiProviderSettings {
    const now = new Date().toISOString()
    const next: AiProviderSettings = {
      userId,
      searchProvider: "google",
      translationProvider: "google",
      modeProviders: {
        general: "openai",
        business: "openai",
        education: "openai",
        student: "openai",
        abiturient: "openai",
        teacher: "openai",
      },
      createdAt: now,
      updatedAt: now,
    }
    this.persist(next)
    return next
  }

  resolveSearchProvider(input: { userId: string; preferredProvider?: AiProviderKey; mode?: AiAssistantMode }): AiProviderKey {
    if (isProviderKey(input.preferredProvider)) return input.preferredProvider
    const settings = this.getSettings(input.userId)
    const modeProvider = input.mode ? settings.modeProviders[input.mode] : undefined
    return isProviderKey(modeProvider) ? modeProvider : settings.searchProvider
  }

  resolveTranslationProvider(input: { userId: string; preferredProvider?: AiProviderKey; mode?: AiAssistantMode }): AiProviderKey {
    if (isProviderKey(input.preferredProvider)) return input.preferredProvider
    const settings = this.getSettings(input.userId)
    const modeProvider = input.mode ? settings.modeProviders[input.mode] : undefined
    return isProviderKey(modeProvider) ? modeProvider : settings.translationProvider
  }

  private filePath(userId: string) {
    return join(this.dir, `${userId}.json`)
  }

  private ensureDir() {
    if (!existsSync(this.dir)) mkdirSync(this.dir, { recursive: true })
  }

  private load(userId: string): AiProviderSettings {
    const fallback = this.buildDefault(userId)
    const file = this.filePath(userId)
    if (!existsSync(file)) return fallback

    try {
      const parsed = JSON.parse(readFileSync(file, "utf8")) as Partial<AiProviderSettings>
      return {
        ...fallback,
        searchProvider: isProviderKey(parsed.searchProvider) ? normalizeLegacyProvider(parsed.searchProvider) : fallback.searchProvider,
        translationProvider: isProviderKey(parsed.translationProvider) ? normalizeLegacyProvider(parsed.translationProvider) : fallback.translationProvider,
        modeProviders: this.normalizeModeProviders(parsed.modeProviders),
        createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : fallback.createdAt,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : fallback.updatedAt,
      }
    } catch {
      return fallback
    }
  }

  private persist(settings: AiProviderSettings) {
    this.ensureDir()
    writeFileSync(this.filePath(settings.userId), JSON.stringify(settings, null, 2), "utf8")
    this.cache.set(settings.userId, settings)
  }

  private buildDefault(userId: string): AiProviderSettings {
    const now = new Date().toISOString()
    return {
      userId,
      searchProvider: "google",
      translationProvider: "google",
      modeProviders: {
        general: "openai",
        business: "openai",
        education: "openai",
        student: "openai",
        abiturient: "openai",
        teacher: "openai",
      },
      createdAt: now,
      updatedAt: now,
    }
  }

  private normalizeModeProviders(value: unknown): Partial<Record<AiAssistantMode, AiProviderKey>> {
    if (!value || typeof value !== "object") return {}
    const normalized: Partial<Record<AiAssistantMode, AiProviderKey>> = {}
    for (const [mode, provider] of Object.entries(value as Record<string, unknown>)) {
      if (isModeKey(mode) && isProviderKey(provider)) normalized[mode] = normalizeLegacyProvider(provider)
    }
    return normalized
  }
}

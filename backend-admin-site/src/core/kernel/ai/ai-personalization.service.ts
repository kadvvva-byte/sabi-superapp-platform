import { AiConsentService } from "./ai-consent.service"
import { AiHistoryService } from "./ai-history.service"
import { AiLocaleBindingService } from "./ai-locale-binding.service"
import { AiMemoryService } from "./ai-memory.service"
import { AiPersistenceService } from "./ai-persistence.service"
import { AiPremiumCoinAccessService } from "./ai-premium-coin-access.service"
import { AiProviderSettingsService } from "./ai-provider-settings.service"
import type { AiAssistantMode, AiMemoryEntry, AiProviderKey } from "./ai.types"
import type {
  AiPersonalizationContext,
  AiPersonalizationContextInput,
  AiPersonalizationInstructionInput,
  AiPersonalizationManifest,
  AiPersonalizationPreference,
  AiPersonalizationPreferenceKey,
  AiPersonalizationPreferenceUpdateInput,
  AiPersonalizationPrivacyMode,
  AiPersonalizationProfile,
  AiPersonalizationRankedMemory,
  AiPersonalizationSignal,
  AiPersonalizationSignalInput,
  AiPersonalizationSnapshot,
  AiPersonalizationSummary,
} from "./ai-personalization.types"

const SUPPORTED_PREFERENCES: AiPersonalizationPreferenceKey[] = [
  "assistant_tone",
  "default_language",
  "translation_target_language",
  "search_provider",
  "translation_provider",
  "preferred_mode",
  "favorite_module",
  "learning_level",
  "business_mode",
  "voice_enabled",
  "safe_action_level",
]

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function nowIso() {
  return new Date().toISOString()
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

function clampConfidence(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0.8
  return Math.min(1, Math.max(0, value))
}

function clampWeight(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return 1
  return Math.min(10, Math.max(0, value))
}

function createDefaultProfile(userId: string): AiPersonalizationProfile {
  const createdAt = nowIso()
  return {
    version: "AI-23",
    userId,
    privacyMode: "balanced",
    preferences: [],
    signals: [],
    createdAt,
    updatedAt: createdAt,
  }
}

function tokens(value: string) {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-zа-яё0-9_]+/i)
      .map((item) => item.trim())
      .filter((item) => item.length >= 3),
  )
}

export class AiPersonalizationRuntimeService {
  private readonly profilesByUser = new Map<string, AiPersonalizationProfile>()

  constructor(
    private readonly memoryService: AiMemoryService,
    private readonly consentService: AiConsentService,
    private readonly historyService: AiHistoryService,
    private readonly providerSettingsService: AiProviderSettingsService,
    private readonly localeBindingService: AiLocaleBindingService,
    private readonly premiumService: AiPremiumCoinAccessService,
    private readonly persistence?: AiPersistenceService,
  ) {}

  getManifest(): AiPersonalizationManifest {
    return {
      area: "personalization_runtime",
      status: "ready",
      version: "AI-23",
      persistence: "ai_persistence",
      privacyModes: ["strict", "balanced", "adaptive"],
      supportedPreferenceKeys: SUPPORTED_PREFERENCES,
      supportedSignalKinds: [
        "assistant_prompt",
        "assistant_response",
        "app_action",
        "translation",
        "search",
        "voice",
        "settings",
        "memory",
        "task",
      ],
      capabilities: [
        {
          key: "persistent_personal_profile",
          title: "Persistent AI personalization profile",
          enabled: true,
          requiresConsent: true,
        },
        {
          key: "ranked_memory_context",
          title: "Ranked memory context for assistant answers",
          enabled: true,
          requiresConsent: true,
        },
        {
          key: "user_saved_instructions",
          title: "User-saved assistant instructions",
          enabled: true,
          requiresConsent: true,
        },
        {
          key: "behavior_signals",
          title: "Privacy-controlled behavior signals",
          enabled: true,
          requiresConsent: true,
        },
        {
          key: "adaptive_prompt_hints",
          title: "Adaptive prompt hints for mobile AI UI",
          enabled: true,
          requiresConsent: false,
        },
      ],
    }
  }

  getProfile(userId: string): AiPersonalizationProfile {
    return this.clone(this.ensureProfile(userId))
  }

  getSnapshot(userId: string, prompt?: string): AiPersonalizationSnapshot {
    const context = this.getContext({ userId, prompt })
    return {
      manifest: this.getManifest(),
      profile: this.getProfile(userId),
      context,
      summary: this.getSummary(userId),
    }
  }

  getSummary(userId: string): AiPersonalizationSummary {
    const profile = this.ensureProfile(userId)
    const consent = this.consentService.getConsent(userId)
    const instructionsCount = this.memoryService
      .listMemory(userId, { kind: "saved_instruction" })
      .filter((entry) => entry.tags.includes("personalization") || entry.tags.includes("instruction")).length
    const context = this.getContext({ userId, limit: 8 })

    return {
      userId,
      status: consent.readAccessAllowed ? "ready" : "blocked",
      privacyMode: profile.privacyMode,
      personalizationAllowed: consent.readAccessAllowed,
      memoryWriteAllowed: consent.memoryWriteAllowed,
      preferencesCount: profile.preferences.length,
      signalsCount: profile.signals.length,
      instructionsCount,
      rankedMemoryCount: context.rankedMemory.length,
      topPreferenceKeys: profile.preferences.slice(0, 5).map((item) => item.key),
      updatedAt: profile.updatedAt,
    }
  }

  getContext(input: AiPersonalizationContextInput): AiPersonalizationContext {
    const profile = this.ensureProfile(input.userId)
    const consent = this.consentService.getConsent(input.userId)
    const locale = this.localeBindingService.getLocale(input.userId)
    const providerSettings = this.providerSettingsService.getSettings(input.userId)
    const premium = this.premiumService.getUserAccess(input.userId)
    const preferredMode = input.mode ?? profile.preferredMode ?? this.resolvePreferredMode(profile) ?? "general"
    const provider = input.provider ?? profile.preferredProvider ?? providerSettings.searchProvider

    if (!consent.readAccessAllowed) {
      return {
        userId: input.userId,
        available: false,
        privacyMode: profile.privacyMode,
        locale: locale.locale,
        provider,
        preferredMode,
        premium: {
          enabled: premium.premiumEnabled,
          planKey: premium.planKey,
          activeFeatures: premium.activeFeatures,
        },
        consent,
        preferences: [],
        instructions: [],
        rankedMemory: [],
        recentSignals: [],
        promptHints: ["AI personalization is paused until read access consent is enabled."],
        blockedReason: "ai_personalization_requires_read_consent",
      }
    }

    const instructions = this.memoryService
      .listMemory(input.userId, { kind: "saved_instruction" })
      .filter((entry) => entry.tags.includes("personalization") || entry.tags.includes("instruction"))
      .slice(0, 12)
    const rankedMemory = this.rankMemory(input.userId, input.prompt, input.limit ?? 12)
    const recentSignals = profile.signals.slice(0, 12)

    return {
      userId: input.userId,
      available: true,
      privacyMode: profile.privacyMode,
      locale: profile.preferredLocale ?? locale.locale,
      provider,
      preferredMode,
      premium: {
        enabled: premium.premiumEnabled,
        planKey: premium.planKey,
        activeFeatures: premium.activeFeatures,
      },
      consent,
      preferences: profile.preferences.slice(0, 20),
      instructions,
      rankedMemory,
      recentSignals,
      promptHints: this.buildPromptHints(profile, instructions, rankedMemory),
    }
  }

  updatePrivacyMode(userId: string, privacyMode: AiPersonalizationPrivacyMode) {
    const profile = this.ensureProfile(userId)
    const next: AiPersonalizationProfile = {
      ...profile,
      privacyMode,
      updatedAt: nowIso(),
      signals: privacyMode === "strict" ? profile.signals.filter((item) => item.source === "user") : profile.signals,
    }
    this.saveProfile(next)
    return this.getSummary(userId)
  }

  updatePreferences(input: AiPersonalizationPreferenceUpdateInput) {
    const profile = this.ensureProfile(input.userId)
    const updatedAt = nowIso()
    const incoming = input.preferences
      .map<AiPersonalizationPreference>((item) => ({
        key: item.key,
        value: normalizeText(item.value),
        source: item.source ?? "user",
        confidence: clampConfidence(item.confidence),
        updatedAt,
        metadata: item.metadata,
      }))
      .filter((item) => item.value.length > 0)

    const byKey = new Map<AiPersonalizationPreferenceKey, AiPersonalizationPreference>()
    for (const preference of profile.preferences) {
      byKey.set(preference.key, preference)
    }
    for (const preference of incoming) {
      byKey.set(preference.key, preference)
    }

    const next: AiPersonalizationProfile = {
      ...profile,
      preferences: [...byKey.values()].sort((a, b) => b.confidence - a.confidence),
      preferredLocale: byKey.get("default_language")?.value ?? profile.preferredLocale,
      preferredProvider: this.asProvider(byKey.get("search_provider")?.value) ?? profile.preferredProvider,
      preferredMode: this.asMode(byKey.get("preferred_mode")?.value) ?? profile.preferredMode,
      updatedAt,
    }
    this.saveProfile(next)
    return this.getProfile(input.userId)
  }

  recordSignal(input: AiPersonalizationSignalInput) {
    const consent = this.consentService.getConsent(input.userId)
    const profile = this.ensureProfile(input.userId)
    if (!consent.readAccessAllowed) {
      return { saved: false, reason: "ai_personalization_requires_read_consent", profile: this.getProfile(input.userId) }
    }
    if (profile.privacyMode === "strict" && input.source !== "user") {
      return { saved: false, reason: "ai_personalization_strict_mode_blocks_behavior_signals", profile: this.getProfile(input.userId) }
    }

    const summary = normalizeText(input.summary)
    if (!summary) {
      throw new Error("ai_personalization_signal_summary_required")
    }

    const signal: AiPersonalizationSignal = {
      id: createId("ai_personalization_signal"),
      userId: input.userId,
      kind: input.kind,
      source: input.source ?? "assistant",
      summary,
      weight: clampWeight(input.weight),
      createdAt: nowIso(),
      metadata: input.metadata,
    }

    const next: AiPersonalizationProfile = {
      ...profile,
      signals: [signal, ...profile.signals].slice(0, 120),
      updatedAt: signal.createdAt,
    }
    this.saveProfile(next)
    return { saved: true, signal, profile: this.getProfile(input.userId) }
  }

  addInstruction(input: AiPersonalizationInstructionInput) {
    const entry = this.memoryService.saveMemory({
      userId: input.userId,
      kind: input.kind ?? "saved_instruction",
      label: input.title,
      value: input.instruction,
      source: "user",
      visibility: "private",
      tags: Array.from(new Set(["personalization", "instruction", ...(input.tags ?? [])])),
    })
    this.recordSignal({
      userId: input.userId,
      kind: "memory",
      source: "user",
      summary: `Saved AI instruction: ${entry.label}`,
      weight: 5,
      metadata: { memoryId: entry.id },
    })
    return entry
  }

  clearSignals(userId: string) {
    const profile = this.ensureProfile(userId)
    const removed = profile.signals.length
    this.saveProfile({ ...profile, signals: [], updatedAt: nowIso() })
    return { removed, profile: this.getProfile(userId) }
  }

  rebuildProfile(userId: string) {
    const profile = this.ensureProfile(userId)
    const locale = this.localeBindingService.getLocale(userId)
    const providerSettings = this.providerSettingsService.getSettings(userId)
    const memoryPreferences = this.memoryService.listMemory(userId, { kind: "preference" })
    const preferences: AiPersonalizationPreference[] = [...profile.preferences]

    for (const memory of memoryPreferences) {
      const key = this.inferPreferenceKey(memory)
      if (!key || preferences.some((item) => item.key === key)) continue
      preferences.push({
        key,
        value: memory.value,
        source: "memory",
        confidence: 0.65,
        updatedAt: nowIso(),
        metadata: { memoryId: memory.id },
      })
    }

    const next: AiPersonalizationProfile = {
      ...profile,
      preferredLocale: profile.preferredLocale ?? locale.locale,
      preferredProvider: profile.preferredProvider ?? providerSettings.searchProvider,
      preferredMode: profile.preferredMode ?? this.resolvePreferredMode({ ...profile, preferences }),
      preferences: preferences.sort((a, b) => b.confidence - a.confidence),
      updatedAt: nowIso(),
    }
    this.saveProfile(next)
    return this.getSnapshot(userId)
  }

  private ensureProfile(userId: string): AiPersonalizationProfile {
    const cached = this.profilesByUser.get(userId)
    if (cached) return cached

    const loaded = this.persistence?.getPersonalizationProfile(userId)
    const profile = loaded ?? createDefaultProfile(userId)
    this.profilesByUser.set(userId, profile)
    if (!loaded) this.persistence?.savePersonalizationProfile(userId, profile)
    return profile
  }

  private saveProfile(profile: AiPersonalizationProfile) {
    this.profilesByUser.set(profile.userId, profile)
    this.persistence?.savePersonalizationProfile(profile.userId, profile)
  }

  private rankMemory(userId: string, prompt: string | undefined, limit: number): AiPersonalizationRankedMemory[] {
    const promptTokens = tokens(prompt ?? "")
    const history = this.historyService.list(userId, 8)
    const recentHistoryTokens = tokens(history.map((item) => item.title).join(" "))
    const entries = this.memoryService.listMemory(userId)

    return entries
      .map((entry) => {
        let score = 10
        const reasons: string[] = []
        if (entry.kind === "saved_instruction") {
          score += 70
          reasons.push("saved_instruction")
        }
        if (entry.kind === "preference") {
          score += 50
          reasons.push("preference")
        }
        if (entry.kind === "profile_fact") {
          score += 25
          reasons.push("profile_fact")
        }
        for (const token of tokens(`${entry.label} ${entry.value} ${entry.tags.join(" ")}`)) {
          if (promptTokens.has(token)) {
            score += 15
            reasons.push("prompt_match")
          }
          if (recentHistoryTokens.has(token)) {
            score += 5
            reasons.push("recent_history_match")
          }
        }
        return {
          ...entry,
          score,
          reason: reasons.length ? Array.from(new Set(reasons)).join("+") : "general_memory",
        }
      })
      .sort((a, b) => b.score - a.score || b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, Math.max(1, Math.min(30, limit)))
  }

  private buildPromptHints(
    profile: AiPersonalizationProfile,
    instructions: AiMemoryEntry[],
    rankedMemory: AiPersonalizationRankedMemory[],
  ) {
    const hints: string[] = []
    const tone = profile.preferences.find((item) => item.key === "assistant_tone")?.value
    if (tone) hints.push(`Use ${tone} tone.`)
    const targetLanguage = profile.preferences.find((item) => item.key === "translation_target_language")?.value
    if (targetLanguage) hints.push(`Prefer ${targetLanguage} for translation targets when not specified.`)
    if (instructions[0]) hints.push(`Follow saved instruction: ${instructions[0].label}.`)
    if (rankedMemory[0]) hints.push(`Relevant memory: ${rankedMemory[0].label}.`)
    if (!hints.length) hints.push("Use current locale, consent, and safety settings.")
    return hints.slice(0, 6)
  }

  private resolvePreferredMode(profile: Pick<AiPersonalizationProfile, "preferences" | "signals">): AiAssistantMode | undefined {
    const preference = profile.preferences.find((item) => item.key === "preferred_mode")?.value
    const preferred = this.asMode(preference)
    if (preferred) return preferred

    const weighted = new Map<AiAssistantMode, number>()
    for (const signal of profile.signals) {
      const mode = this.asMode(String(signal.metadata?.mode ?? ""))
      if (!mode) continue
      weighted.set(mode, (weighted.get(mode) ?? 0) + signal.weight)
    }
    return [...weighted.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  }

  private inferPreferenceKey(memory: AiMemoryEntry): AiPersonalizationPreferenceKey | undefined {
    const label = memory.label.toLowerCase()
    const tags = memory.tags.join(" ").toLowerCase()
    if (label.includes("tone") || tags.includes("tone")) return "assistant_tone"
    if (label.includes("language") || tags.includes("language")) return "default_language"
    if (label.includes("translation") || tags.includes("translation")) return "translation_target_language"
    if (label.includes("provider") || tags.includes("provider")) return "search_provider"
    if (label.includes("mode") || tags.includes("mode")) return "preferred_mode"
    if (label.includes("voice") || tags.includes("voice")) return "voice_enabled"
    return undefined
  }

  private asProvider(value: string | undefined): AiProviderKey | undefined {
    return value === "internal" || value === "google" || value === "yandex" ? value : undefined
  }

  private asMode(value: string | undefined): AiAssistantMode | undefined {
    return value === "general" || value === "business" || value === "education" || value === "translation" || value === "search"
      ? value
      : undefined
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T
  }
}

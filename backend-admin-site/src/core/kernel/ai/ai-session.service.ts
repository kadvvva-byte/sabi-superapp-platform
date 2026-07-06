import {
  type AiAssistantMode,
  type AiPremiumFeature,
  type AiPremiumPlanKey,
  type AiProviderKey,
  type AiSessionConsentState,
  type AiSessionContext,
} from "./ai.types"
import { AiPersistenceService } from "./ai-persistence.service"

const DEFAULT_CONSENT: AiSessionConsentState = {
  readAccessAllowed: true,
  memoryWriteAllowed: false,
  toolExecutionAllowed: false,
  internetSearchAllowed: true,
}

export class AiSessionService {
  private readonly sessions = new Map<string, AiSessionContext>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  private ensureLoaded(userId: string) {
    if (this.sessions.has(userId)) {
      return
    }
    const loaded = this.persistence?.getSession(userId)
    if (loaded) {
      this.sessions.set(userId, loaded)
    }
  }

  getOrCreateSession(input: {
    userId: string
    locale?: string
    mode?: AiAssistantMode
    provider?: AiProviderKey
    premiumEnabled?: boolean
    premiumPlanKey?: AiPremiumPlanKey
    activePremiumFeatures?: AiPremiumFeature[]
    coinBalance?: number
    consent?: AiSessionConsentState
  }): AiSessionContext {
    this.ensureLoaded(input.userId)
    const existing = this.sessions.get(input.userId)
    const now = new Date().toISOString()

    if (existing) {
      const next: AiSessionContext = {
        ...existing,
        locale: input.locale ?? existing.locale,
        mode: input.mode ?? existing.mode,
        defaultProvider: input.provider ?? existing.defaultProvider,
        premiumEnabled: input.premiumEnabled ?? existing.premiumEnabled,
        premiumPlanKey: input.premiumPlanKey ?? existing.premiumPlanKey,
        activePremiumFeatures: input.activePremiumFeatures ?? existing.activePremiumFeatures,
        coinBalance: input.coinBalance ?? existing.coinBalance,
        consent: input.consent ?? existing.consent,
        updatedAt: now,
      }

      this.sessions.set(input.userId, next)
      this.persistence?.saveSession(input.userId, next)
      return next
    }

    const created: AiSessionContext = {
      userId: input.userId,
      programId: "sabi_ai",
      locale: input.locale ?? "en",
      mode: input.mode ?? "general",
      defaultProvider: input.provider ?? "internal",
      premiumEnabled: Boolean(input.premiumEnabled),
      premiumPlanKey: input.premiumPlanKey ?? "free",
      activePremiumFeatures: input.activePremiumFeatures ?? [],
      coinBalance: input.coinBalance,
      consent: input.consent ?? { ...DEFAULT_CONSENT },
      createdAt: now,
      updatedAt: now,
    }

    this.sessions.set(input.userId, created)
    this.persistence?.saveSession(input.userId, created)
    return created
  }

  getSession(userId: string) {
    this.ensureLoaded(userId)
    return this.sessions.get(userId) ?? null
  }

  updateConsent(userId: string, consent: Partial<AiSessionConsentState>) {
    const session = this.getSession(userId)

    if (!session) {
      throw new Error(`AI session not found for user ${userId}`)
    }

    const next: AiSessionContext = {
      ...session,
      consent: {
        ...session.consent,
        ...consent,
      },
      updatedAt: new Date().toISOString(),
    }

    this.sessions.set(userId, next)
    this.persistence?.saveSession(userId, next)
    return next
  }

  updateSession(userId: string, input: { locale?: string; mode?: AiAssistantMode; provider?: AiProviderKey }) {
    const session = this.getSession(userId)

    if (!session) {
      throw new Error(`AI session not found for user ${userId}`)
    }

    const next: AiSessionContext = {
      ...session,
      locale: input.locale ?? session.locale,
      mode: input.mode ?? session.mode,
      defaultProvider: input.provider ?? session.defaultProvider,
      updatedAt: new Date().toISOString(),
    }

    this.sessions.set(userId, next)
    this.persistence?.saveSession(userId, next)
    return next
  }

  clearSession(userId: string) {
    this.sessions.delete(userId)
    this.persistence?.saveSession(userId, null)
  }
}

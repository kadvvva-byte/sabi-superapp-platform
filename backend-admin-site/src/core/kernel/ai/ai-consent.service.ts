import {
  type AiConsentActorType,
  type AiConsentAuditEvent,
  type AiConsentScope,
  type AiConsentUpdateInput,
  type AiSessionConsentState,
} from "./ai.types"
import { AiPersistenceService } from "./ai-persistence.service"

const DEFAULT_CONSENT: AiSessionConsentState = {
  readAccessAllowed: true,
  memoryWriteAllowed: false,
  toolExecutionAllowed: false,
  internetSearchAllowed: true,
}

const CONSENT_SCOPE_MAP: Record<keyof AiSessionConsentState, AiConsentScope> = {
  readAccessAllowed: "read_access",
  memoryWriteAllowed: "memory_write",
  toolExecutionAllowed: "tool_execution",
  internetSearchAllowed: "internet_search",
}

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

export class AiConsentService {
  private readonly stateByUser = new Map<string, AiSessionConsentState>()
  private readonly auditByUser = new Map<string, AiConsentAuditEvent[]>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  private ensureLoaded(userId: string) {
    if (!this.stateByUser.has(userId)) {
      const loaded = this.persistence?.getConsent(userId)
      this.stateByUser.set(userId, loaded ? { ...DEFAULT_CONSENT, ...loaded } : { ...DEFAULT_CONSENT })
    }
    if (!this.auditByUser.has(userId)) {
      this.auditByUser.set(userId, this.persistence?.getConsentAudit(userId) ?? [])
    }
  }

  getConsent(userId: string): AiSessionConsentState {
    this.ensureLoaded(userId)
    return { ...(this.stateByUser.get(userId) ?? DEFAULT_CONSENT) }
  }

  updateConsent(input: AiConsentUpdateInput): AiSessionConsentState {
    this.ensureLoaded(input.userId)
    const current = this.getConsent(input.userId)
    const next: AiSessionConsentState = {
      ...current,
      ...input.consent,
    }

    const events: AiConsentAuditEvent[] = []
    ;(Object.keys(input.consent) as Array<keyof AiSessionConsentState>).forEach((key) => {
      const nextValue = input.consent[key]
      if (typeof nextValue !== "boolean") {
        return
      }

      if (current[key] === nextValue) {
        return
      }

      events.push({
        id: createId("ai_consent"),
        userId: input.userId,
        scope: CONSENT_SCOPE_MAP[key],
        decision: nextValue ? "granted" : "revoked",
        actorType: input.actorType ?? "user",
        actorId: input.actorId,
        reason: input.reason,
        createdAt: new Date().toISOString(),
      })
    })

    this.stateByUser.set(input.userId, next)
    this.persistence?.saveConsent(input.userId, next)

    if (events.length > 0) {
      const currentAudit = this.auditByUser.get(input.userId) ?? []
      const nextAudit = [...events, ...currentAudit]
      this.auditByUser.set(input.userId, nextAudit)
      this.persistence?.saveConsentAudit(input.userId, nextAudit)
    }

    return { ...next }
  }

  getAuditTrail(userId: string) {
    this.ensureLoaded(userId)
    return [...(this.auditByUser.get(userId) ?? [])]
  }

  resetConsent(userId: string, actorType: AiConsentActorType = "user") {
    this.ensureLoaded(userId)
    const resetEvents: AiConsentAuditEvent[] = []
    const current = this.getConsent(userId)
    ;(Object.keys(DEFAULT_CONSENT) as Array<keyof AiSessionConsentState>).forEach((key) => {
      if (current[key] === DEFAULT_CONSENT[key]) {
        return
      }
      resetEvents.push({
        id: createId("ai_consent"),
        userId,
        scope: CONSENT_SCOPE_MAP[key],
        decision: DEFAULT_CONSENT[key] ? "granted" : "revoked",
        actorType,
        reason: "Consent reset to default state",
        createdAt: new Date().toISOString(),
      })
    })

    const next = { ...DEFAULT_CONSENT }
    this.stateByUser.set(userId, next)
    this.persistence?.saveConsent(userId, next)

    const currentAudit = this.auditByUser.get(userId) ?? []
    const nextAudit = resetEvents.length > 0 ? [...resetEvents, ...currentAudit] : currentAudit
    this.auditByUser.set(userId, nextAudit)
    this.persistence?.saveConsentAudit(userId, nextAudit)

    return { ...next }
  }
}

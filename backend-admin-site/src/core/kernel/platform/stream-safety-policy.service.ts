import {
  platformSafetyPolicyService,
  type PlatformSafetyDecision,
  type PlatformSafetySignal,
  type PlatformStreamViolationState,
} from "./safety-policy.service"

export type PlatformStreamRestrictionStatus =
  | "allowed"
  | "restricted"
  | "blocked_until_admin_review"

export type PlatformStreamAdultSignalInput = {
  userId: string
  streamId?: string | null
  operationId?: string | null
  confidence?: number | null
  source?: "ai" | "rules" | "provider" | "admin" | "user_report" | "system"
  reason?: string | null
  metadata?: Record<string, unknown> | null
}

export type PlatformStreamSafetyState = PlatformStreamViolationState & {
  status: PlatformStreamRestrictionStatus
  lastDecision?: PlatformSafetyDecision | null
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown> | null
}

export type PlatformStreamSafetyResult = {
  allowed: boolean
  status: PlatformStreamRestrictionStatus
  userId: string
  streamId?: string | null
  violationCount: number
  restrictedUntil?: string | null
  requiresAdminUnlock: boolean
  neutralUserMessage: string
  internalReason: string
  decision: PlatformSafetyDecision
  state: PlatformStreamSafetyState
}

export type PlatformStreamSafetySnapshot = {
  userId?: string | null
  states: PlatformStreamSafetyState[]
  activeRestrictions: PlatformStreamSafetyState[]
  adminUnlockRequired: PlatformStreamSafetyState[]
}

function nowIso() {
  return new Date().toISOString()
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeUserId(userId: string) {
  const value = userId.trim()

  if (!value) {
    throw new Error("platform_stream_user_id_required")
  }

  return value
}

function normalizeStreamId(streamId?: string | null) {
  const value = streamId?.trim()
  return value || null
}

function makeKey(userId: string, streamId?: string | null) {
  return `${normalizeUserId(userId)}:${normalizeStreamId(streamId) ?? "global"}`
}

function isFuture(value?: string | null) {
  if (!value) return false

  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return false

  return time > Date.now()
}

function isStateRestricted(state: PlatformStreamSafetyState) {
  if (state.requiresAdminUnlock) return true
  if (state.status === "blocked_until_admin_review") return true
  if (state.status === "restricted" && isFuture(state.restrictedUntil)) return true

  return false
}

function buildAdultSignal(input: PlatformStreamAdultSignalInput): PlatformSafetySignal {
  return {
    kind: "adult_18_plus",
    riskLevel: input.confidence && input.confidence >= 0.9 ? "high" : "medium",
    source: input.source ?? "ai",
    confidence: input.confidence ?? null,
    reason: input.reason ?? "Possible 18+ stream scenario detected.",
    metadata: input.metadata ?? null,
  }
}

export class PlatformStreamSafetyPolicyService {
  private readonly states = new Map<string, PlatformStreamSafetyState>()

  recordAdultSignal(input: PlatformStreamAdultSignalInput): PlatformStreamSafetyResult {
    const userId = normalizeUserId(input.userId)
    const streamId = normalizeStreamId(input.streamId)
    const key = makeKey(userId, streamId)
    const previous = this.states.get(key)

    const existingState: PlatformStreamViolationState = previous
      ? {
          userId,
          streamId,
          violationCount: previous.violationCount,
          lastViolationAt: previous.lastViolationAt ?? null,
          restrictedUntil: previous.restrictedUntil ?? null,
          requiresAdminUnlock: previous.requiresAdminUnlock,
        }
      : {
          userId,
          streamId,
          violationCount: 0,
          lastViolationAt: null,
          restrictedUntil: null,
          requiresAdminUnlock: false,
        }

    const decision = platformSafetyPolicyService.evaluate({
      operationId: input.operationId ?? createId("stream_adult_signal"),
      module: "stream",
      operationKind: "stream_live_signal",
      userId,
      streamId,
      signals: [buildAdultSignal(input)],
      streamViolationState: existingState,
      metadata: {
        ...(input.metadata ?? {}),
        policy: "stream_18_plus_escalation",
      },
    })

    const nextViolationCount = Math.max(1, existingState.violationCount + 1)
    const now = nowIso()

    const state: PlatformStreamSafetyState = {
      userId,
      streamId,
      violationCount: nextViolationCount,
      lastViolationAt: now,
      restrictedUntil: decision.blockedUntil ?? null,
      requiresAdminUnlock: decision.requiresAdminUnlock,
      status: decision.requiresAdminUnlock
        ? "blocked_until_admin_review"
        : decision.allowed
          ? "allowed"
          : "restricted",
      lastDecision: decision,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      metadata: {
        ...(previous?.metadata ?? {}),
        ...(input.metadata ?? {}),
        lastSignalSource: input.source ?? "ai",
        lastConfidence: input.confidence ?? null,
      },
    }

    this.states.set(key, state)

    return {
      allowed: decision.allowed,
      status: state.status,
      userId,
      streamId,
      violationCount: state.violationCount,
      restrictedUntil: state.restrictedUntil,
      requiresAdminUnlock: state.requiresAdminUnlock,
      neutralUserMessage: decision.neutralUserMessage,
      internalReason: decision.internalReason,
      decision,
      state,
    }
  }

  assertCanStartStream(input: {
    userId: string
    streamId?: string | null
  }): void {
    const state = this.getState(input.userId, input.streamId)

    if (!state) return
    if (!isStateRestricted(state)) return

    const error = new Error(
      state.requiresAdminUnlock
        ? "platform_stream_admin_unlock_required"
        : "platform_stream_temporarily_restricted",
    )

    ;(
      error as Error & {
        streamSafetyState?: PlatformStreamSafetyState
      }
    ).streamSafetyState = state

    throw error
  }

  canStartStream(input: {
    userId: string
    streamId?: string | null
  }): boolean {
    const state = this.getState(input.userId, input.streamId)
    if (!state) return true

    return !isStateRestricted(state)
  }

  getState(userId: string, streamId?: string | null): PlatformStreamSafetyState | null {
    return this.states.get(makeKey(userId, streamId)) ?? null
  }

  getUserSnapshot(userId: string): PlatformStreamSafetySnapshot {
    const normalizedUserId = normalizeUserId(userId)
    const states = Array.from(this.states.values()).filter(
      (state) => state.userId === normalizedUserId,
    )

    return {
      userId: normalizedUserId,
      states,
      activeRestrictions: states.filter(isStateRestricted),
      adminUnlockRequired: states.filter((state) => state.requiresAdminUnlock),
    }
  }

  getGlobalSnapshot(): PlatformStreamSafetySnapshot {
    const states = Array.from(this.states.values())

    return {
      userId: null,
      states,
      activeRestrictions: states.filter(isStateRestricted),
      adminUnlockRequired: states.filter((state) => state.requiresAdminUnlock),
    }
  }

  releaseAfterAdminReview(input: {
    userId: string
    streamId?: string | null
    reviewerId: string
    reason: string
  }): PlatformStreamSafetyState {
    const userId = normalizeUserId(input.userId)
    const streamId = normalizeStreamId(input.streamId)
    const key = makeKey(userId, streamId)
    const previous = this.states.get(key)
    const now = nowIso()

    const released: PlatformStreamSafetyState = {
      userId,
      streamId,
      violationCount: 0,
      lastViolationAt: previous?.lastViolationAt ?? null,
      restrictedUntil: null,
      requiresAdminUnlock: false,
      status: "allowed",
      lastDecision: previous?.lastDecision ?? null,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      metadata: {
        ...(previous?.metadata ?? {}),
        releasedBy: input.reviewerId,
        releaseReason: input.reason,
        releasedAt: now,
      },
    }

    this.states.set(key, released)

    return released
  }

  clearExpiredRestriction(input: {
    userId: string
    streamId?: string | null
  }): PlatformStreamSafetyState | null {
    const state = this.getState(input.userId, input.streamId)

    if (!state) return null
    if (state.requiresAdminUnlock) return state
    if (!state.restrictedUntil) return state
    if (isFuture(state.restrictedUntil)) return state

    const updated: PlatformStreamSafetyState = {
      ...state,
      status: "allowed",
      restrictedUntil: null,
      updatedAt: nowIso(),
      metadata: {
        ...(state.metadata ?? {}),
        autoReleasedAfterRestrictionExpired: true,
      },
    }

    this.states.set(makeKey(updated.userId, updated.streamId), updated)

    return updated
  }

  resetUser(input: {
    userId: string
    reviewerId?: string | null
    reason?: string | null
  }): PlatformStreamSafetySnapshot {
    const userId = normalizeUserId(input.userId)
    const states = Array.from(this.states.values()).filter((state) => state.userId === userId)

    for (const state of states) {
      this.states.set(makeKey(state.userId, state.streamId), {
        ...state,
        violationCount: 0,
        restrictedUntil: null,
        requiresAdminUnlock: false,
        status: "allowed",
        updatedAt: nowIso(),
        metadata: {
          ...(state.metadata ?? {}),
          resetBy: input.reviewerId ?? null,
          resetReason: input.reason ?? null,
        },
      })
    }

    return this.getUserSnapshot(userId)
  }
}

export const platformStreamSafetyPolicyService = new PlatformStreamSafetyPolicyService()
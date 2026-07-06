import {
  platformSafetyPolicyService,
  type PlatformSafetyDecision,
  type PlatformSafetyModule,
  type PlatformSafetyOperationKind,
  type PlatformSafetySignal,
} from "./safety-policy.service"

export type TaxiDeliverySafetyRole =
  | "driver"
  | "courier"
  | "passenger"
  | "customer"
  | "client"
  | "merchant"
  | "unknown"

export type TaxiDeliveryComplaintSource =
  | "customer_about_driver"
  | "customer_about_courier"
  | "driver_about_customer"
  | "courier_about_customer"
  | "merchant_about_courier"
  | "system"
  | "ai"
  | "admin"
  | "user_report"

export type TaxiDeliveryRestrictionStatus =
  | "allowed"
  | "restricted"
  | "pending_admin_review"
  | "blocked_until_review"

export type TaxiDeliveryViolationSeverity =
  | "normal"
  | "serious"
  | "critical"

export type TaxiDeliverySafetyModule =
  | "taxi"
  | "delivery_food"
  | "delivery_products"

export type TaxiDeliveryComplaintInput = {
  subjectUserId: string
  subjectRole: TaxiDeliverySafetyRole
  module: TaxiDeliverySafetyModule
  source: TaxiDeliveryComplaintSource
  reporterUserId?: string | null
  orderId?: string | null
  rideId?: string | null
  operationId?: string | null
  severity?: TaxiDeliveryViolationSeverity
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}

export type TaxiDeliverySafetyState = {
  subjectUserId: string
  subjectRole: TaxiDeliverySafetyRole
  module: TaxiDeliverySafetyModule
  complaintCount: number
  lastComplaintAt?: string | null
  restrictedUntil?: string | null
  status: TaxiDeliveryRestrictionStatus
  requiresAdminReview: boolean
  seriousViolationActive: boolean
  lastDecision?: PlatformSafetyDecision | null
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown> | null
}

export type TaxiDeliveryComplaintResult = {
  allowed: boolean
  status: TaxiDeliveryRestrictionStatus
  subjectUserId: string
  subjectRole: TaxiDeliverySafetyRole
  module: TaxiDeliverySafetyModule
  complaintCount: number
  restrictedUntil?: string | null
  requiresAdminReview: boolean
  neutralUserMessage: string
  internalReason: string
  decision: PlatformSafetyDecision
  state: TaxiDeliverySafetyState
}

export type TaxiDeliverySafetySnapshot = {
  subjectUserId?: string | null
  states: TaxiDeliverySafetyState[]
  activeRestrictions: TaxiDeliverySafetyState[]
  adminReviewRequired: TaxiDeliverySafetyState[]
}

function nowIso() {
  return new Date().toISOString()
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeUserId(userId: string) {
  const value = userId.trim()

  if (!value) {
    throw new Error("taxi_delivery_subject_user_id_required")
  }

  return value
}

function makeKey(input: {
  subjectUserId: string
  module: TaxiDeliverySafetyModule
  subjectRole: TaxiDeliverySafetyRole
}) {
  return `${normalizeUserId(input.subjectUserId)}:${input.module}:${input.subjectRole}`
}

function isFuture(value?: string | null) {
  if (!value) return false

  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return false

  return time > Date.now()
}

function isStateRestricted(state: TaxiDeliverySafetyState) {
  if (state.requiresAdminReview) return true
  if (state.status === "blocked_until_review") return true
  if (state.status === "pending_admin_review") return true
  if (state.status === "restricted" && isFuture(state.restrictedUntil)) return true

  return false
}

function restrictionMinutesForComplaint(complaintCount: number) {
  if (complaintCount <= 1) return 15
  if (complaintCount === 2) return 60
  if (complaintCount === 3) return 180
  return 720
}

function roleLabel(role: TaxiDeliverySafetyRole) {
  if (role === "driver") return "driver"
  if (role === "courier") return "courier"
  if (role === "passenger" || role === "customer" || role === "client") return "customer"
  if (role === "merchant") return "merchant"
  return "participant"
}

function moduleOperation(module: TaxiDeliverySafetyModule): PlatformSafetyOperationKind {
  if (module === "taxi") return "taxi_ride_complete"
  return "delivery_complete"
}

function buildNormalComplaintSignal(input: TaxiDeliveryComplaintInput): PlatformSafetySignal {
  return {
    kind: input.module === "taxi" ? "taxi_safety_risk" : "delivery_dispute",
    riskLevel: "medium",
    source: input.source === "ai" ? "ai" : input.source === "system" ? "system" : "user_report",
    confidence: input.confidence ?? null,
    reason:
      input.reason ??
      `Complaint recorded for ${roleLabel(input.subjectRole)} in ${input.module}.`,
    metadata: {
      ...(input.metadata ?? {}),
      complaintSource: input.source,
      subjectRole: input.subjectRole,
      orderId: input.orderId ?? null,
      rideId: input.rideId ?? null,
    },
  }
}

function buildSeriousComplaintSignal(input: TaxiDeliveryComplaintInput): PlatformSafetySignal {
  return {
    kind: input.module === "taxi" ? "taxi_safety_risk" : "delivery_dispute",
    riskLevel: input.severity === "critical" ? "critical" : "high",
    source: input.source === "ai" ? "ai" : input.source === "system" ? "system" : "user_report",
    confidence: input.confidence ?? null,
    reason:
      input.reason ??
      `Serious ${input.module} violation signal for ${roleLabel(input.subjectRole)}.`,
    metadata: {
      ...(input.metadata ?? {}),
      complaintSource: input.source,
      subjectRole: input.subjectRole,
      orderId: input.orderId ?? null,
      rideId: input.rideId ?? null,
      seriousViolation: true,
    },
  }
}

function neutralMessage(module: TaxiDeliverySafetyModule) {
  if (module === "taxi") {
    return "Taxi access is temporarily restricted for safety review."
  }

  return "Delivery access is temporarily restricted for safety review."
}

export class TaxiDeliverySafetyPolicyService {
  private readonly states = new Map<string, TaxiDeliverySafetyState>()

  recordComplaint(input: TaxiDeliveryComplaintInput): TaxiDeliveryComplaintResult {
    const subjectUserId = normalizeUserId(input.subjectUserId)
    const key = makeKey({
      subjectUserId,
      module: input.module,
      subjectRole: input.subjectRole,
    })

    const previous = this.states.get(key)
    const severity = input.severity ?? "normal"
    const nextComplaintCount = Math.max(1, (previous?.complaintCount ?? 0) + 1)
    const now = nowIso()

    if (severity === "serious" || severity === "critical") {
      return this.applySeriousRestriction(input, previous, nextComplaintCount, now)
    }

    const restrictionMinutes = restrictionMinutesForComplaint(nextComplaintCount)
    const restrictedUntil = addMinutes(new Date(), restrictionMinutes).toISOString()

    const decision = platformSafetyPolicyService.evaluate({
      operationId: input.operationId ?? createId("taxi_delivery_complaint"),
      module: input.module as PlatformSafetyModule,
      operationKind: moduleOperation(input.module),
      userId: subjectUserId,
      targetUserId: input.reporterUserId ?? null,
      orderId: input.orderId ?? input.rideId ?? null,
      signals: [buildNormalComplaintSignal(input)],
      metadata: {
        ...(input.metadata ?? {}),
        policy: "taxi_delivery_complaint_escalation",
        complaintCount: nextComplaintCount,
        restrictionMinutes,
        subjectRole: input.subjectRole,
        reporterUserId: input.reporterUserId ?? null,
      },
    })

    const state: TaxiDeliverySafetyState = {
      subjectUserId,
      subjectRole: input.subjectRole,
      module: input.module,
      complaintCount: nextComplaintCount,
      lastComplaintAt: now,
      restrictedUntil,
      status: "restricted",
      requiresAdminReview: false,
      seriousViolationActive: false,
      lastDecision: decision,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      metadata: {
        ...(previous?.metadata ?? {}),
        ...(input.metadata ?? {}),
        lastComplaintSource: input.source,
        lastReporterUserId: input.reporterUserId ?? null,
        lastRestrictionMinutes: restrictionMinutes,
      },
    }

    this.states.set(key, state)

    return {
      allowed: false,
      status: state.status,
      subjectUserId,
      subjectRole: input.subjectRole,
      module: input.module,
      complaintCount: state.complaintCount,
      restrictedUntil: state.restrictedUntil,
      requiresAdminReview: false,
      neutralUserMessage: neutralMessage(input.module),
      internalReason: `${roleLabel(input.subjectRole)} complaint ${nextComplaintCount}; temporary restriction applied for ${restrictionMinutes} minute(s).`,
      decision,
      state,
    }
  }

  assertCanUseTaxiDelivery(input: {
    subjectUserId: string
    module: TaxiDeliverySafetyModule
    subjectRole: TaxiDeliverySafetyRole
  }): void {
    const state = this.getState(input)

    if (!state) return
    if (!isStateRestricted(state)) return

    const error = new Error(
      state.requiresAdminReview
        ? "taxi_delivery_admin_review_required"
        : "taxi_delivery_temporarily_restricted",
    )

    ;(
      error as Error & {
        taxiDeliverySafetyState?: TaxiDeliverySafetyState
      }
    ).taxiDeliverySafetyState = state

    throw error
  }

  canUseTaxiDelivery(input: {
    subjectUserId: string
    module: TaxiDeliverySafetyModule
    subjectRole: TaxiDeliverySafetyRole
  }): boolean {
    const state = this.getState(input)
    if (!state) return true

    return !isStateRestricted(state)
  }

  getState(input: {
    subjectUserId: string
    module: TaxiDeliverySafetyModule
    subjectRole: TaxiDeliverySafetyRole
  }): TaxiDeliverySafetyState | null {
    return this.states.get(makeKey(input)) ?? null
  }

  getUserSnapshot(subjectUserId: string): TaxiDeliverySafetySnapshot {
    const normalizedUserId = normalizeUserId(subjectUserId)
    const states = Array.from(this.states.values()).filter(
      (state) => state.subjectUserId === normalizedUserId,
    )

    return {
      subjectUserId: normalizedUserId,
      states,
      activeRestrictions: states.filter(isStateRestricted),
      adminReviewRequired: states.filter((state) => state.requiresAdminReview),
    }
  }

  getGlobalSnapshot(): TaxiDeliverySafetySnapshot {
    const states = Array.from(this.states.values())

    return {
      subjectUserId: null,
      states,
      activeRestrictions: states.filter(isStateRestricted),
      adminReviewRequired: states.filter((state) => state.requiresAdminReview),
    }
  }

  clearExpiredRestriction(input: {
    subjectUserId: string
    module: TaxiDeliverySafetyModule
    subjectRole: TaxiDeliverySafetyRole
  }): TaxiDeliverySafetyState | null {
    const state = this.getState(input)

    if (!state) return null
    if (state.requiresAdminReview) return state
    if (!state.restrictedUntil) return state
    if (isFuture(state.restrictedUntil)) return state

    const updated: TaxiDeliverySafetyState = {
      ...state,
      status: "allowed",
      restrictedUntil: null,
      updatedAt: nowIso(),
      metadata: {
        ...(state.metadata ?? {}),
        autoReleasedAfterRestrictionExpired: true,
      },
    }

    this.states.set(makeKey(updated), updated)

    return updated
  }

  releaseAfterAdminReview(input: {
    subjectUserId: string
    module: TaxiDeliverySafetyModule
    subjectRole: TaxiDeliverySafetyRole
    reviewerId: string
    reason: string
    resetComplaintCount?: boolean
  }): TaxiDeliverySafetyState {
    const key = makeKey(input)
    const previous = this.states.get(key)
    const now = nowIso()

    const released: TaxiDeliverySafetyState = {
      subjectUserId: normalizeUserId(input.subjectUserId),
      subjectRole: input.subjectRole,
      module: input.module,
      complaintCount: input.resetComplaintCount ? 0 : previous?.complaintCount ?? 0,
      lastComplaintAt: previous?.lastComplaintAt ?? null,
      restrictedUntil: null,
      status: "allowed",
      requiresAdminReview: false,
      seriousViolationActive: false,
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

  resetUser(input: {
    subjectUserId: string
    reviewerId?: string | null
    reason?: string | null
  }): TaxiDeliverySafetySnapshot {
    const subjectUserId = normalizeUserId(input.subjectUserId)
    const states = Array.from(this.states.values()).filter(
      (state) => state.subjectUserId === subjectUserId,
    )

    for (const state of states) {
      this.states.set(makeKey(state), {
        ...state,
        complaintCount: 0,
        restrictedUntil: null,
        status: "allowed",
        requiresAdminReview: false,
        seriousViolationActive: false,
        updatedAt: nowIso(),
        metadata: {
          ...(state.metadata ?? {}),
          resetBy: input.reviewerId ?? null,
          resetReason: input.reason ?? null,
        },
      })
    }

    return this.getUserSnapshot(subjectUserId)
  }

  private applySeriousRestriction(
    input: TaxiDeliveryComplaintInput,
    previous: TaxiDeliverySafetyState | undefined,
    nextComplaintCount: number,
    now: string,
  ): TaxiDeliveryComplaintResult {
    const subjectUserId = normalizeUserId(input.subjectUserId)
    const key = makeKey({
      subjectUserId,
      module: input.module,
      subjectRole: input.subjectRole,
    })

    const decision = platformSafetyPolicyService.evaluate({
      operationId: input.operationId ?? createId("taxi_delivery_serious_violation"),
      module: input.module as PlatformSafetyModule,
      operationKind: moduleOperation(input.module),
      userId: subjectUserId,
      targetUserId: input.reporterUserId ?? null,
      orderId: input.orderId ?? input.rideId ?? null,
      signals: [buildSeriousComplaintSignal(input)],
      metadata: {
        ...(input.metadata ?? {}),
        policy: "taxi_delivery_serious_violation_review",
        complaintCount: nextComplaintCount,
        subjectRole: input.subjectRole,
        reporterUserId: input.reporterUserId ?? null,
        seriousViolation: true,
      },
    })

    const state: TaxiDeliverySafetyState = {
      subjectUserId,
      subjectRole: input.subjectRole,
      module: input.module,
      complaintCount: nextComplaintCount,
      lastComplaintAt: now,
      restrictedUntil: null,
      status: "pending_admin_review",
      requiresAdminReview: true,
      seriousViolationActive: true,
      lastDecision: decision,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      metadata: {
        ...(previous?.metadata ?? {}),
        ...(input.metadata ?? {}),
        lastComplaintSource: input.source,
        lastReporterUserId: input.reporterUserId ?? null,
        seriousViolation: true,
      },
    }

    this.states.set(key, state)

    return {
      allowed: false,
      status: state.status,
      subjectUserId,
      subjectRole: input.subjectRole,
      module: input.module,
      complaintCount: state.complaintCount,
      restrictedUntil: null,
      requiresAdminReview: true,
      neutralUserMessage: neutralMessage(input.module),
      internalReason: `${roleLabel(input.subjectRole)} serious violation signal; restricted until admin review.`,
      decision,
      state,
    }
  }
}

export const taxiDeliverySafetyPolicyService = new TaxiDeliverySafetyPolicyService()
import {
  platformSafetyPolicyService,
  type PlatformSafetyDecision,
  type PlatformSafetySignal,
} from "./safety-policy.service"

export type MarketplaceSafetyRole =
  | "buyer"
  | "seller"
  | "merchant"
  | "platform"
  | "unknown"

export type MarketplaceOperationStatus =
  | "allowed"
  | "escrow_hold"
  | "refund_review"
  | "pending_admin_review"
  | "restricted"
  | "blocked"

export type MarketplaceRiskSeverity =
  | "normal"
  | "serious"
  | "critical"

export type MarketplaceRiskKind =
  | "seller_not_verified"
  | "buyer_protection_required"
  | "escrow_required"
  | "fake_product"
  | "counterfeit"
  | "fraud"
  | "scam"
  | "payment_risk"
  | "refund_dispute"
  | "delivery_dispute"
  | "merchant_risk"

export type MarketplaceSafetyInput = {
  operationId?: string | null
  orderId?: string | null
  productId?: string | null
  buyerUserId: string
  sellerUserId: string
  merchantId?: string | null
  amount?: number | null
  currency?: string | null
  sellerVerified?: boolean | null
  buyerProtectionEnabled?: boolean | null
  walletSecurityChecked?: boolean | null
  escrowRequired?: boolean | null
  severity?: MarketplaceRiskSeverity
  riskKind?: MarketplaceRiskKind | null
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}

export type MarketplaceDisputeInput = {
  operationId?: string | null
  orderId: string
  productId?: string | null
  reporterUserId: string
  buyerUserId: string
  sellerUserId: string
  merchantId?: string | null
  riskKind: MarketplaceRiskKind
  severity?: MarketplaceRiskSeverity
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}

export type MarketplaceSafetyState = {
  orderId: string
  productId?: string | null
  buyerUserId: string
  sellerUserId: string
  merchantId?: string | null
  status: MarketplaceOperationStatus
  escrowActive: boolean
  buyerProtectionActive: boolean
  refundReviewRequired: boolean
  adminReviewRequired: boolean
  sellerRestricted: boolean
  lastDecision?: PlatformSafetyDecision | null
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown> | null
}

export type MarketplaceSafetyResult = {
  allowed: boolean
  canContinueWithEscrow: boolean
  status: MarketplaceOperationStatus
  orderId: string
  buyerUserId: string
  sellerUserId: string
  neutralUserMessage: string
  internalReason: string
  decision: PlatformSafetyDecision
  state: MarketplaceSafetyState
}

export type MarketplaceSafetySnapshot = {
  userId?: string | null
  states: MarketplaceSafetyState[]
  activeEscrows: MarketplaceSafetyState[]
  refundReviews: MarketplaceSafetyState[]
  adminReviews: MarketplaceSafetyState[]
  restrictedSellers: MarketplaceSafetyState[]
}

function nowIso() {
  return new Date().toISOString()
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeUserId(userId: string, code: string) {
  const value = userId.trim()

  if (!value) {
    throw new Error(code)
  }

  return value
}

function normalizeOrderId(orderId?: string | null) {
  return orderId?.trim() || createId("marketplace_order")
}

function makeOrderKey(orderId: string) {
  return orderId.trim()
}

function isHighRisk(kind?: MarketplaceRiskKind | null) {
  return (
    kind === "fake_product" ||
    kind === "counterfeit" ||
    kind === "fraud" ||
    kind === "scam" ||
    kind === "payment_risk" ||
    kind === "merchant_risk"
  )
}

function signalForRisk(input: {
  riskKind?: MarketplaceRiskKind | null
  severity?: MarketplaceRiskSeverity
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}): PlatformSafetySignal {
  const severity = input.severity ?? "normal"

  if (input.riskKind === "fake_product") {
    return {
      kind: "marketplace_fake_product",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "user_report",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace fake product risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "counterfeit") {
    return {
      kind: "marketplace_counterfeit",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "user_report",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace counterfeit product risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "fraud") {
    return {
      kind: "fraud",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "user_report",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace fraud risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "scam") {
    return {
      kind: "scam",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "user_report",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace scam risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "payment_risk") {
    return {
      kind: "payment_risk",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace payment risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "merchant_risk") {
    return {
      kind: "merchant_risk",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Marketplace merchant risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  return {
    kind: "payment_risk",
    riskLevel: "low",
    source: "rules",
    confidence: input.confidence ?? null,
    reason: input.reason ?? "Marketplace escrow/buyer protection required.",
    metadata: input.metadata ?? null,
  }
}

function neutralMessage(status: MarketplaceOperationStatus) {
  if (status === "escrow_hold") {
    return "Marketplace payment is safely held until order completion."
  }

  if (status === "refund_review") {
    return "Marketplace order is temporarily held for refund review."
  }

  if (status === "pending_admin_review") {
    return "Marketplace order is temporarily held for safety review."
  }

  if (status === "restricted" || status === "blocked") {
    return "Marketplace access is temporarily restricted for safety review."
  }

  return "Marketplace operation can continue."
}

export class MarketplaceSafetyPolicyService {
  private readonly states = new Map<string, MarketplaceSafetyState>()

  preparePurchaseEscrow(input: MarketplaceSafetyInput): MarketplaceSafetyResult {
    const buyerUserId = normalizeUserId(input.buyerUserId, "marketplace_buyer_user_id_required")
    const sellerUserId = normalizeUserId(input.sellerUserId, "marketplace_seller_user_id_required")
    const orderId = normalizeOrderId(input.orderId)
    const now = nowIso()

    const riskSignals: PlatformSafetySignal[] = []

    if (!input.sellerVerified) {
      riskSignals.push({
        kind: "merchant_risk",
        riskLevel: "medium",
        source: "rules",
        confidence: null,
        reason: "Marketplace seller is not verified.",
        metadata: {
          sellerUserId,
          merchantId: input.merchantId ?? null,
        },
      })
    }

    if (!input.walletSecurityChecked) {
      riskSignals.push({
        kind: "payment_risk",
        riskLevel: "medium",
        source: "rules",
        confidence: null,
        reason: "Marketplace payment must pass wallet security layer.",
        metadata: {
          walletSecurityChecked: false,
        },
      })
    }

    riskSignals.push(
      signalForRisk({
        riskKind: input.riskKind ?? "escrow_required",
        severity: input.severity ?? "normal",
        reason: input.reason ?? "Marketplace payment uses escrow/safe-hold until completion.",
        confidence: input.confidence ?? null,
        metadata: input.metadata ?? null,
      }),
    )

    const decision = platformSafetyPolicyService.evaluate({
      operationId: input.operationId ?? createId("marketplace_purchase"),
      module: "marketplace",
      operationKind: "marketplace_purchase",
      userId: buyerUserId,
      targetUserId: sellerUserId,
      merchantId: input.merchantId ?? null,
      orderId,
      amount: input.amount ?? null,
      currency: input.currency ?? null,
      signals: riskSignals,
      metadata: {
        ...(input.metadata ?? {}),
        policy: "marketplace_escrow_buyer_protection",
        sellerVerified: input.sellerVerified ?? false,
        buyerProtectionEnabled: input.buyerProtectionEnabled ?? true,
        walletSecurityChecked: input.walletSecurityChecked ?? false,
        escrowRequired: input.escrowRequired ?? true,
      },
    })

    const highRisk = riskSignals.some((signal) => signal.riskLevel === "high" || signal.riskLevel === "critical")
    const status: MarketplaceOperationStatus =
      highRisk || isHighRisk(input.riskKind)
        ? "pending_admin_review"
        : "escrow_hold"

    const state: MarketplaceSafetyState = {
      orderId,
      productId: input.productId ?? null,
      buyerUserId,
      sellerUserId,
      merchantId: input.merchantId ?? null,
      status,
      escrowActive: true,
      buyerProtectionActive: input.buyerProtectionEnabled ?? true,
      refundReviewRequired: false,
      adminReviewRequired: status === "pending_admin_review",
      sellerRestricted: status === "pending_admin_review" && isHighRisk(input.riskKind),
      lastDecision: decision,
      createdAt: now,
      updatedAt: now,
      metadata: {
        ...(input.metadata ?? {}),
        sellerVerified: input.sellerVerified ?? false,
        walletSecurityChecked: input.walletSecurityChecked ?? false,
        escrowRequired: input.escrowRequired ?? true,
      },
    }

    this.states.set(makeOrderKey(orderId), state)

    return {
      allowed: status === "escrow_hold",
      canContinueWithEscrow: status === "escrow_hold",
      status,
      orderId,
      buyerUserId,
      sellerUserId,
      neutralUserMessage: neutralMessage(status),
      internalReason:
        status === "escrow_hold"
          ? "Marketplace purchase is allowed with escrow/safe-hold until order completion."
          : "Marketplace purchase requires admin/safety review before release.",
      decision,
      state,
    }
  }

  recordDispute(input: MarketplaceDisputeInput): MarketplaceSafetyResult {
    const buyerUserId = normalizeUserId(input.buyerUserId, "marketplace_buyer_user_id_required")
    const sellerUserId = normalizeUserId(input.sellerUserId, "marketplace_seller_user_id_required")
    const reporterUserId = normalizeUserId(input.reporterUserId, "marketplace_reporter_user_id_required")
    const orderId = normalizeOrderId(input.orderId)
    const previous = this.states.get(makeOrderKey(orderId))
    const now = nowIso()

    const signal = signalForRisk({
      riskKind: input.riskKind,
      severity: input.severity ?? "serious",
      reason: input.reason ?? "Marketplace dispute requires refund/admin review.",
      confidence: input.confidence ?? null,
      metadata: {
        ...(input.metadata ?? {}),
        reporterUserId,
      },
    })

    const decision = platformSafetyPolicyService.evaluate({
      operationId: input.operationId ?? createId("marketplace_dispute"),
      module: "marketplace",
      operationKind: "refund",
      userId: reporterUserId,
      targetUserId: reporterUserId === buyerUserId ? sellerUserId : buyerUserId,
      merchantId: input.merchantId ?? previous?.merchantId ?? null,
      orderId,
      signals: [signal],
      metadata: {
        ...(input.metadata ?? {}),
        policy: "marketplace_dispute_refund_review",
        reporterUserId,
        riskKind: input.riskKind,
      },
    })

    const critical = signal.riskLevel === "critical"
    const status: MarketplaceOperationStatus = critical ? "blocked" : "refund_review"

    const state: MarketplaceSafetyState = {
      orderId,
      productId: input.productId ?? previous?.productId ?? null,
      buyerUserId,
      sellerUserId,
      merchantId: input.merchantId ?? previous?.merchantId ?? null,
      status,
      escrowActive: true,
      buyerProtectionActive: true,
      refundReviewRequired: true,
      adminReviewRequired: true,
      sellerRestricted:
        input.riskKind === "fake_product" ||
        input.riskKind === "counterfeit" ||
        input.riskKind === "fraud" ||
        input.riskKind === "scam",
      lastDecision: decision,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      metadata: {
        ...(previous?.metadata ?? {}),
        ...(input.metadata ?? {}),
        reporterUserId,
        disputeRiskKind: input.riskKind,
        disputeReason: input.reason ?? null,
      },
    }

    this.states.set(makeOrderKey(orderId), state)

    return {
      allowed: false,
      canContinueWithEscrow: false,
      status,
      orderId,
      buyerUserId,
      sellerUserId,
      neutralUserMessage: neutralMessage(status),
      internalReason: "Marketplace dispute recorded. Funds remain in escrow/refund review until admin decision.",
      decision,
      state,
    }
  }

  completeOrder(input: {
    orderId: string
    actorUserId: string
    releaseFunds?: boolean
    metadata?: Record<string, unknown> | null
  }): MarketplaceSafetyState {
    const orderId = normalizeOrderId(input.orderId)
    const state = this.states.get(makeOrderKey(orderId))

    if (!state) {
      throw new Error("marketplace_order_safety_state_not_found")
    }

    if (state.adminReviewRequired || state.refundReviewRequired || state.status === "blocked") {
      throw new Error("marketplace_order_requires_review_before_completion")
    }

    const updated: MarketplaceSafetyState = {
      ...state,
      status: "allowed",
      escrowActive: input.releaseFunds === false,
      updatedAt: nowIso(),
      metadata: {
        ...(state.metadata ?? {}),
        ...(input.metadata ?? {}),
        completedBy: input.actorUserId,
        releaseFunds: input.releaseFunds ?? true,
      },
    }

    this.states.set(makeOrderKey(orderId), updated)

    return updated
  }

  releaseAfterAdminReview(input: {
    orderId: string
    reviewerId: string
    reason: string
    releaseFunds?: boolean
  }): MarketplaceSafetyState {
    const orderId = normalizeOrderId(input.orderId)
    const state = this.states.get(makeOrderKey(orderId))

    if (!state) {
      throw new Error("marketplace_order_safety_state_not_found")
    }

    const updated: MarketplaceSafetyState = {
      ...state,
      status: "allowed",
      escrowActive: input.releaseFunds === false,
      refundReviewRequired: false,
      adminReviewRequired: false,
      sellerRestricted: false,
      updatedAt: nowIso(),
      metadata: {
        ...(state.metadata ?? {}),
        releasedBy: input.reviewerId,
        releaseReason: input.reason,
        releaseFunds: input.releaseFunds ?? true,
      },
    }

    this.states.set(makeOrderKey(orderId), updated)

    return updated
  }

  assertOrderCanContinue(orderId: string): void {
    const state = this.states.get(makeOrderKey(orderId))

    if (!state) return
    if (state.status === "allowed" || state.status === "escrow_hold") return

    const error = new Error(
      state.status === "blocked"
        ? "marketplace_order_blocked_until_review"
        : "marketplace_order_pending_review",
    )

    ;(
      error as Error & {
        marketplaceSafetyState?: MarketplaceSafetyState
      }
    ).marketplaceSafetyState = state

    throw error
  }

  getOrderState(orderId: string): MarketplaceSafetyState | null {
    return this.states.get(makeOrderKey(orderId)) ?? null
  }

  getUserSnapshot(userId: string): MarketplaceSafetySnapshot {
    const normalized = normalizeUserId(userId, "marketplace_user_id_required")
    const states = Array.from(this.states.values()).filter(
      (state) => state.buyerUserId === normalized || state.sellerUserId === normalized,
    )

    return this.buildSnapshot(normalized, states)
  }

  getGlobalSnapshot(): MarketplaceSafetySnapshot {
    return this.buildSnapshot(null, Array.from(this.states.values()))
  }

  private buildSnapshot(userId: string | null, states: MarketplaceSafetyState[]): MarketplaceSafetySnapshot {
    return {
      userId,
      states,
      activeEscrows: states.filter((state) => state.escrowActive),
      refundReviews: states.filter((state) => state.refundReviewRequired),
      adminReviews: states.filter((state) => state.adminReviewRequired),
      restrictedSellers: states.filter((state) => state.sellerRestricted),
    }
  }
}

export const marketplaceSafetyPolicyService = new MarketplaceSafetyPolicyService()
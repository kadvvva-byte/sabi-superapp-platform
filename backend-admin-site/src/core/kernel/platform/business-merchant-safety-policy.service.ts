import {
  platformSafetyPolicyService,
  type PlatformSafetyDecision,
  type PlatformSafetyModule,
  type PlatformSafetyOperationKind,
  type PlatformSafetySignal,
} from "./safety-policy.service"

export type BusinessMerchantModule =
  | "business"
  | "merchant"

export type BusinessMerchantIncomeSource =
  | "business_account"
  | "merchant_account"
  | "business_bot"
  | "commerce_bot"
  | "marketplace_seller"
  | "stream_shop"
  | "qr_business_payment"
  | "unknown"

export type BusinessMerchantRoutingTarget =
  | "business_wallet"
  | "merchant_wallet"
  | "business_routing_layer"
  | "merchant_routing_layer"
  | "sabi_personal_wallet"
  | "external_provider"
  | "unknown"

export type BusinessMerchantOperationStatus =
  | "allowed"
  | "routing_required"
  | "safe_hold"
  | "pending_compliance_review"
  | "restricted"
  | "blocked"

export type BusinessMerchantRiskKind =
  | "none"
  | "business_wallet_missing"
  | "merchant_wallet_missing"
  | "personal_wallet_mixing"
  | "bot_payment_risk"
  | "merchant_risk"
  | "business_risk"
  | "aml"
  | "fraud"
  | "scam"
  | "kyc_bypass"
  | "settlement_risk"
  | "provider_mismatch"

export type BusinessMerchantRiskSeverity =
  | "normal"
  | "serious"
  | "critical"

export type BusinessMerchantRoutingInput = {
  operationId?: string | null
  module: BusinessMerchantModule
  businessId?: string | null
  merchantId?: string | null
  userId: string
  unifiedUserId?: string | null
  walletId?: string | null
  incomeSource: BusinessMerchantIncomeSource
  requestedTarget: BusinessMerchantRoutingTarget
  businessWalletAvailable?: boolean | null
  merchantWalletAvailable?: boolean | null
  amount?: number | null
  currency?: string | null
  riskKind?: BusinessMerchantRiskKind | null
  severity?: BusinessMerchantRiskSeverity | null
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}

export type BusinessMerchantSettlementInput = {
  operationId?: string | null
  module: BusinessMerchantModule
  businessId?: string | null
  merchantId?: string | null
  userId: string
  unifiedUserId?: string | null
  sourceWalletId?: string | null
  targetWalletId?: string | null
  amount?: number | null
  currency?: string | null
  providerId?: string | null
  riskKind?: BusinessMerchantRiskKind | null
  severity?: BusinessMerchantRiskSeverity | null
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}

export type BusinessMerchantSafetyState = {
  operationId: string
  module: BusinessMerchantModule
  businessId?: string | null
  merchantId?: string | null
  userId: string
  walletId?: string | null
  status: BusinessMerchantOperationStatus
  incomeSource?: BusinessMerchantIncomeSource | null
  requestedTarget?: BusinessMerchantRoutingTarget | null
  approvedTarget?: BusinessMerchantRoutingTarget | null
  safeHoldActive: boolean
  complianceReviewRequired: boolean
  personalWalletMixingBlocked: boolean
  businessWalletFuturePathRequired: boolean
  merchantWalletFuturePathRequired: boolean
  lastDecision?: PlatformSafetyDecision | null
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown> | null
}

export type BusinessMerchantSafetyResult = {
  allowed: boolean
  status: BusinessMerchantOperationStatus
  operationId: string
  module: BusinessMerchantModule
  approvedTarget?: BusinessMerchantRoutingTarget | null
  neutralUserMessage: string
  internalReason: string
  decision: PlatformSafetyDecision
  state: BusinessMerchantSafetyState
}

export type BusinessMerchantSafetySnapshot = {
  userId?: string | null
  states: BusinessMerchantSafetyState[]
  safeHolds: BusinessMerchantSafetyState[]
  complianceReviews: BusinessMerchantSafetyState[]
  personalWalletMixingBlocks: BusinessMerchantSafetyState[]
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
    throw new Error("business_merchant_user_id_required")
  }

  return value
}

function normalizeOperationId(operationId?: string | null) {
  return operationId?.trim() || createId("business_merchant_operation")
}

function makeOperationKey(operationId: string) {
  return operationId.trim()
}

function isPersonalWalletTarget(target: BusinessMerchantRoutingTarget) {
  return target === "sabi_personal_wallet"
}

function isBusinessSource(source: BusinessMerchantIncomeSource) {
  return (
    source === "business_account" ||
    source === "business_bot" ||
    source === "commerce_bot" ||
    source === "qr_business_payment"
  )
}

function isMerchantSource(source: BusinessMerchantIncomeSource) {
  return (
    source === "merchant_account" ||
    source === "marketplace_seller" ||
    source === "stream_shop"
  )
}

function signalForRisk(input: {
  riskKind?: BusinessMerchantRiskKind | null
  severity?: BusinessMerchantRiskSeverity | null
  reason?: string | null
  confidence?: number | null
  metadata?: Record<string, unknown> | null
}): PlatformSafetySignal {
  const severity = input.severity ?? "normal"

  if (input.riskKind === "aml") {
    return {
      kind: "aml",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/Merchant AML risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "fraud") {
    return {
      kind: "fraud",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/Merchant fraud risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "scam") {
    return {
      kind: "scam",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/Merchant scam risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "kyc_bypass") {
    return {
      kind: "kyc_bypass",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/Merchant KYC bypass risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "bot_payment_risk") {
    return {
      kind: "bot_payment_risk",
      riskLevel: severity === "critical" ? "critical" : "high",
      source: "system",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/commerce bot payment risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "merchant_risk" || input.riskKind === "merchant_wallet_missing") {
    return {
      kind: "merchant_risk",
      riskLevel: severity === "critical" ? "critical" : "medium",
      source: "rules",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Merchant routing risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "business_risk" || input.riskKind === "business_wallet_missing") {
    return {
      kind: "business_risk",
      riskLevel: severity === "critical" ? "critical" : "medium",
      source: "rules",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business routing risk signal.",
      metadata: input.metadata ?? null,
    }
  }

  if (input.riskKind === "personal_wallet_mixing") {
    return {
      kind: "business_risk",
      riskLevel: "high",
      source: "rules",
      confidence: input.confidence ?? null,
      reason: input.reason ?? "Business/Merchant income attempted to route into personal SABI Wallet.",
      metadata: input.metadata ?? null,
    }
  }

  return {
    kind: "business_risk",
    riskLevel: "low",
    source: "rules",
    confidence: input.confidence ?? null,
    reason: input.reason ?? "Business/Merchant routing policy check.",
    metadata: input.metadata ?? null,
  }
}

function neutralMessage(status: BusinessMerchantOperationStatus) {
  if (status === "routing_required") {
    return "Business payment is routed through the business security layer."
  }

  if (status === "safe_hold") {
    return "Business payment is temporarily held for compliance review."
  }

  if (status === "pending_compliance_review") {
    return "Business operation is temporarily held for compliance review."
  }

  if (status === "restricted" || status === "blocked") {
    return "Business access is temporarily restricted for compliance review."
  }

  return "Business operation can continue."
}

function operationKindForModule(module: BusinessMerchantModule, settlement = false): PlatformSafetyOperationKind {
  if (settlement) return "merchant_settlement"
  return module === "merchant" ? "merchant_income" : "business_income"
}

export class BusinessMerchantSafetyPolicyService {
  private readonly states = new Map<string, BusinessMerchantSafetyState>()

  routeIncome(input: BusinessMerchantRoutingInput): BusinessMerchantSafetyResult {
    const userId = normalizeUserId(input.userId)
    const operationId = normalizeOperationId(input.operationId)
    const now = nowIso()
    const signals: PlatformSafetySignal[] = []

    const requestedTarget = input.requestedTarget
    let approvedTarget: BusinessMerchantRoutingTarget | null = requestedTarget

    const personalWalletMixingBlocked = isPersonalWalletTarget(requestedTarget)

    if (personalWalletMixingBlocked) {
      signals.push(
        signalForRisk({
          riskKind: "personal_wallet_mixing",
          severity: "serious",
          reason: "Business/Merchant income cannot be routed into personal SABI Wallet.",
          confidence: 1,
          metadata: input.metadata ?? null,
        }),
      )
      approvedTarget = null
    }

    const businessWalletMissing =
      input.module === "business" &&
      isBusinessSource(input.incomeSource) &&
      input.businessWalletAvailable === false

    const merchantWalletMissing =
      input.module === "merchant" &&
      isMerchantSource(input.incomeSource) &&
      input.merchantWalletAvailable === false

    if (businessWalletMissing) {
      signals.push(
        signalForRisk({
          riskKind: "business_wallet_missing",
          severity: "normal",
          reason:
            "Business Wallet is not live yet; route through Business Routing Layer instead of personal wallet.",
          metadata: input.metadata ?? null,
        }),
      )
      approvedTarget = "business_routing_layer"
    }

    if (merchantWalletMissing) {
      signals.push(
        signalForRisk({
          riskKind: "merchant_wallet_missing",
          severity: "normal",
          reason:
            "Merchant Wallet is not live yet; route through Merchant Routing Layer instead of personal wallet.",
          metadata: input.metadata ?? null,
        }),
      )
      approvedTarget = "merchant_routing_layer"
    }

    if (input.riskKind && input.riskKind !== "none") {
      signals.push(
        signalForRisk({
          riskKind: input.riskKind,
          severity: input.severity ?? "normal",
          reason: input.reason ?? null,
          confidence: input.confidence ?? null,
          metadata: input.metadata ?? null,
        }),
      )
    }

    const decision = platformSafetyPolicyService.evaluate({
      operationId,
      module: input.module as PlatformSafetyModule,
      operationKind: operationKindForModule(input.module),
      userId,
      unifiedUserId: input.unifiedUserId ?? userId,
      businessId: input.businessId ?? null,
      merchantId: input.merchantId ?? null,
      walletId: input.walletId ?? null,
      amount: input.amount ?? null,
      currency: input.currency ?? null,
      signals,
      metadata: {
        ...(input.metadata ?? {}),
        policy: "business_merchant_income_routing",
        incomeSource: input.incomeSource,
        requestedTarget: input.requestedTarget,
        approvedTarget,
        businessWalletAvailable: input.businessWalletAvailable ?? null,
        merchantWalletAvailable: input.merchantWalletAvailable ?? null,
        personalWalletMixingBlocked,
      },
    })

    const highRisk = signals.some((signal) => signal.riskLevel === "high" || signal.riskLevel === "critical")

    const status: BusinessMerchantOperationStatus =
      personalWalletMixingBlocked
        ? "blocked"
        : highRisk
          ? "safe_hold"
          : approvedTarget === "business_routing_layer" || approvedTarget === "merchant_routing_layer"
            ? "routing_required"
            : "allowed"

    const state: BusinessMerchantSafetyState = {
      operationId,
      module: input.module,
      businessId: input.businessId ?? null,
      merchantId: input.merchantId ?? null,
      userId,
      walletId: input.walletId ?? null,
      status,
      incomeSource: input.incomeSource,
      requestedTarget,
      approvedTarget,
      safeHoldActive: status === "safe_hold",
      complianceReviewRequired: status === "safe_hold" || status === "blocked",
      personalWalletMixingBlocked,
      businessWalletFuturePathRequired: businessWalletMissing,
      merchantWalletFuturePathRequired: merchantWalletMissing,
      lastDecision: decision,
      createdAt: now,
      updatedAt: now,
      metadata: {
        ...(input.metadata ?? {}),
        incomeSource: input.incomeSource,
        requestedTarget,
        approvedTarget,
      },
    }

    this.states.set(makeOperationKey(operationId), state)

    return {
      allowed: status === "allowed" || status === "routing_required",
      status,
      operationId,
      module: input.module,
      approvedTarget,
      neutralUserMessage: neutralMessage(status),
      internalReason:
        status === "blocked"
          ? "Business/Merchant income attempted to route into personal wallet. Operation blocked."
          : status === "safe_hold"
            ? "Business/Merchant income requires compliance safe hold."
            : status === "routing_required"
              ? "Business/Merchant income routed through future-ready routing layer."
              : "Business/Merchant income route is allowed.",
      decision,
      state,
    }
  }

  evaluateSettlement(input: BusinessMerchantSettlementInput): BusinessMerchantSafetyResult {
    const userId = normalizeUserId(input.userId)
    const operationId = normalizeOperationId(input.operationId)
    const now = nowIso()

    const signals: PlatformSafetySignal[] = []

    if (input.riskKind && input.riskKind !== "none") {
      signals.push(
        signalForRisk({
          riskKind: input.riskKind,
          severity: input.severity ?? "normal",
          reason: input.reason ?? null,
          confidence: input.confidence ?? null,
          metadata: input.metadata ?? null,
        }),
      )
    }

    const decision = platformSafetyPolicyService.evaluate({
      operationId,
      module: input.module as PlatformSafetyModule,
      operationKind: operationKindForModule(input.module, true),
      userId,
      unifiedUserId: input.unifiedUserId ?? userId,
      businessId: input.businessId ?? null,
      merchantId: input.merchantId ?? null,
      walletId: input.sourceWalletId ?? input.targetWalletId ?? null,
      amount: input.amount ?? null,
      currency: input.currency ?? null,
      signals,
      metadata: {
        ...(input.metadata ?? {}),
        policy: "business_merchant_settlement_review",
        sourceWalletId: input.sourceWalletId ?? null,
        targetWalletId: input.targetWalletId ?? null,
        providerId: input.providerId ?? null,
      },
    })

    const highRisk = signals.some((signal) => signal.riskLevel === "high" || signal.riskLevel === "critical")
    const status: BusinessMerchantOperationStatus = highRisk ? "pending_compliance_review" : "allowed"

    const state: BusinessMerchantSafetyState = {
      operationId,
      module: input.module,
      businessId: input.businessId ?? null,
      merchantId: input.merchantId ?? null,
      userId,
      walletId: input.sourceWalletId ?? input.targetWalletId ?? null,
      status,
      incomeSource: null,
      requestedTarget: null,
      approvedTarget: input.module === "merchant" ? "merchant_wallet" : "business_wallet",
      safeHoldActive: status === "pending_compliance_review",
      complianceReviewRequired: status === "pending_compliance_review",
      personalWalletMixingBlocked: false,
      businessWalletFuturePathRequired: false,
      merchantWalletFuturePathRequired: false,
      lastDecision: decision,
      createdAt: now,
      updatedAt: now,
      metadata: {
        ...(input.metadata ?? {}),
        sourceWalletId: input.sourceWalletId ?? null,
        targetWalletId: input.targetWalletId ?? null,
        providerId: input.providerId ?? null,
      },
    }

    this.states.set(makeOperationKey(operationId), state)

    return {
      allowed: status === "allowed",
      status,
      operationId,
      module: input.module,
      approvedTarget: state.approvedTarget,
      neutralUserMessage: neutralMessage(status),
      internalReason:
        status === "pending_compliance_review"
          ? "Business/Merchant settlement requires compliance review."
          : "Business/Merchant settlement route is allowed.",
      decision,
      state,
    }
  }

  assertOperationCanContinue(operationId: string): void {
    const state = this.states.get(makeOperationKey(operationId))

    if (!state) return

    if (state.status === "allowed" || state.status === "routing_required") return

    const error = new Error(
      state.status === "blocked"
        ? "business_merchant_operation_blocked"
        : "business_merchant_operation_pending_review",
    )

    ;(
      error as Error & {
        businessMerchantSafetyState?: BusinessMerchantSafetyState
      }
    ).businessMerchantSafetyState = state

    throw error
  }

  releaseAfterComplianceReview(input: {
    operationId: string
    reviewerId: string
    reason: string
    approvedTarget?: BusinessMerchantRoutingTarget | null
  }): BusinessMerchantSafetyState {
    const operationId = normalizeOperationId(input.operationId)
    const state = this.states.get(makeOperationKey(operationId))

    if (!state) {
      throw new Error("business_merchant_safety_state_not_found")
    }

    const updated: BusinessMerchantSafetyState = {
      ...state,
      status: "allowed",
      approvedTarget: input.approvedTarget ?? state.approvedTarget,
      safeHoldActive: false,
      complianceReviewRequired: false,
      personalWalletMixingBlocked: false,
      updatedAt: nowIso(),
      metadata: {
        ...(state.metadata ?? {}),
        releasedBy: input.reviewerId,
        releaseReason: input.reason,
        approvedTarget: input.approvedTarget ?? state.approvedTarget,
      },
    }

    this.states.set(makeOperationKey(operationId), updated)

    return updated
  }

  getState(operationId: string): BusinessMerchantSafetyState | null {
    return this.states.get(makeOperationKey(operationId)) ?? null
  }

  getUserSnapshot(userId: string): BusinessMerchantSafetySnapshot {
    const normalized = normalizeUserId(userId)
    const states = Array.from(this.states.values()).filter((state) => state.userId === normalized)

    return this.buildSnapshot(normalized, states)
  }

  getGlobalSnapshot(): BusinessMerchantSafetySnapshot {
    return this.buildSnapshot(null, Array.from(this.states.values()))
  }

  private buildSnapshot(
    userId: string | null,
    states: BusinessMerchantSafetyState[],
  ): BusinessMerchantSafetySnapshot {
    return {
      userId,
      states,
      safeHolds: states.filter((state) => state.safeHoldActive),
      complianceReviews: states.filter((state) => state.complianceReviewRequired),
      personalWalletMixingBlocks: states.filter((state) => state.personalWalletMixingBlocked),
    }
  }
}

export const businessMerchantSafetyPolicyService = new BusinessMerchantSafetyPolicyService()
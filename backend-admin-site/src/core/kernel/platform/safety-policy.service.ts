export type PlatformSafetyModule =
  | "wallet"
  | "taxi"
  | "delivery_food"
  | "delivery_products"
  | "marketplace"
  | "business"
  | "merchant"
  | "stream"
  | "ai"
  | "messenger"
  | "unknown"

export type PlatformSafetyOperationKind =
  | "payment"
  | "payout"
  | "settlement"
  | "refund"
  | "order_create"
  | "order_accept"
  | "order_complete"
  | "order_cancel"
  | "delivery_assign"
  | "delivery_complete"
  | "taxi_ride_create"
  | "taxi_ride_accept"
  | "taxi_ride_complete"
  | "marketplace_purchase"
  | "marketplace_sale"
  | "business_income"
  | "merchant_income"
  | "merchant_settlement"
  | "stream_start"
  | "stream_live_signal"
  | "stream_monetization"
  | "content_publish"
  | "wallet_sensitive_operation"
  | "unknown"

export type PlatformSafetyStatus =
  | "allowed"
  | "restricted"
  | "safe_hold"
  | "pending_admin_review"
  | "blocked"

export type PlatformSafetyRiskLevel =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "critical"

export type PlatformSafetySignalKind =
  | "none"
  | "adult_18_plus"
  | "fraud"
  | "scam"
  | "aml"
  | "kyc_bypass"
  | "payment_risk"
  | "device_risk"
  | "user_mismatch"
  | "merchant_risk"
  | "business_risk"
  | "delivery_dispute"
  | "taxi_safety_risk"
  | "marketplace_fake_product"
  | "marketplace_counterfeit"
  | "stream_policy_violation"
  | "bot_payment_risk"
  | "wallet_tokenization_violation"
  | "wallet_pci_violation"
  | "unknown"

export type PlatformSafetyReviewAction =
  | "none"
  | "create_internal_report"
  | "admin_review_required"
  | "compliance_review_required"
  | "release_after_review"
  | "escalate_to_safety_team"

export type PlatformSafetyRestrictionScope =
  | "none"
  | "operation"
  | "wallet"
  | "account"
  | "module"
  | "stream"
  | "merchant"
  | "business"
  | "order"
  | "funds"

export type PlatformSafetyFundsAction =
  | "none"
  | "hold"
  | "restrict_movement"
  | "escrow"
  | "refund_review"
  | "manual_release_only"

export type PlatformSafetySignal = {
  kind: PlatformSafetySignalKind
  riskLevel: PlatformSafetyRiskLevel
  source: "ai" | "rules" | "provider" | "admin" | "user_report" | "system"
  confidence?: number | null
  reason?: string | null
  metadata?: Record<string, unknown> | null
}

export type PlatformStreamViolationState = {
  userId: string
  streamId?: string | null
  violationCount: number
  lastViolationAt?: string | null
  restrictedUntil?: string | null
  requiresAdminUnlock: boolean
}

export type PlatformSafetyInput = {
  operationId: string
  module: PlatformSafetyModule
  operationKind: PlatformSafetyOperationKind
  userId: string
  unifiedUserId?: string | null
  targetUserId?: string | null
  walletId?: string | null
  businessId?: string | null
  merchantId?: string | null
  orderId?: string | null
  streamId?: string | null
  amount?: number | null
  currency?: string | null
  signals?: PlatformSafetySignal[]
  streamViolationState?: PlatformStreamViolationState | null
  metadata?: Record<string, unknown> | null
}

export type PlatformSafetyDecision = {
  allowed: boolean
  status: PlatformSafetyStatus
  riskLevel: PlatformSafetyRiskLevel
  module: PlatformSafetyModule
  operationKind: PlatformSafetyOperationKind
  operationId: string
  userId: string
  restrictionScope: PlatformSafetyRestrictionScope
  fundsAction: PlatformSafetyFundsAction
  reviewActions: PlatformSafetyReviewAction[]
  neutralUserMessage: string
  internalReason: string
  signals: PlatformSafetySignal[]
  blockedUntil?: string | null
  requiresAdminUnlock: boolean
  createdAt: string
  metadata?: Record<string, unknown> | null
}

export type PlatformSafetyPolicySnapshot = {
  version: "PLATFORM-SAFETY-1.1"
  modules: PlatformSafetyModule[]
  statuses: PlatformSafetyStatus[]
  streamAdultPolicy: {
    firstViolationBlockHours: 1
    secondViolationBlockHours: 12
    thirdViolationBlockHours: 72
    fourthViolationRequiresAdminUnlock: true
  }
  moneyPolicy: {
    walletSecurityRequired: true
    tokenOnlyCardStorageRequired: true
    escrowForTaxiDeliveryMarketplace: true
    businessMerchantSeparationRequired: true
    adminReviewForHighRisk: true
  }
  aiPolicy: {
    aiCreatesRiskSignalsOnly: true
    aiDoesNotDecideGuilt: true
    neutralUserMessagesOnly: true
  }
}

function nowIso() {
  return new Date().toISOString()
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

function riskWeight(level: PlatformSafetyRiskLevel) {
  if (level === "critical") return 5
  if (level === "high") return 4
  if (level === "medium") return 3
  if (level === "low") return 2
  return 1
}

function highestRisk(signals: PlatformSafetySignal[]): PlatformSafetyRiskLevel {
  if (!signals.length) return "none"

  return signals
    .map((signal) => signal.riskLevel)
    .sort((a, b) => riskWeight(b) - riskWeight(a))[0]
}

function hasSignal(signals: PlatformSafetySignal[], kinds: PlatformSafetySignalKind[]) {
  return signals.some((signal) => kinds.includes(signal.kind))
}

function neutralRestrictionMessage(module: PlatformSafetyModule) {
  if (module === "stream") {
    return "Stream access is temporarily restricted for safety review."
  }

  if (module === "wallet") {
    return "Wallet is temporarily restricted for security review."
  }

  if (module === "marketplace") {
    return "Marketplace operation is temporarily held for safety review."
  }

  if (module === "taxi") {
    return "Taxi operation is temporarily held for safety review."
  }

  if (module === "delivery_food" || module === "delivery_products") {
    return "Delivery operation is temporarily held for safety review."
  }

  if (module === "business" || module === "merchant") {
    return "Business operation is temporarily held for compliance review."
  }

  return "Operation is temporarily restricted for safety review."
}

function allowedDecision(input: PlatformSafetyInput): PlatformSafetyDecision {
  return {
    allowed: true,
    status: "allowed",
    riskLevel: "none",
    module: input.module,
    operationKind: input.operationKind,
    operationId: input.operationId,
    userId: input.userId,
    restrictionScope: "none",
    fundsAction: "none",
    reviewActions: ["none"],
    neutralUserMessage: "Operation can continue.",
    internalReason: "No platform safety restriction detected.",
    signals: input.signals ?? [],
    blockedUntil: null,
    requiresAdminUnlock: false,
    createdAt: nowIso(),
    metadata: input.metadata ?? null,
  }
}

function restrictedDecision(
  input: PlatformSafetyInput,
  override: {
    status: PlatformSafetyStatus
    riskLevel: PlatformSafetyRiskLevel
    restrictionScope: PlatformSafetyRestrictionScope
    fundsAction: PlatformSafetyFundsAction
    reviewActions: PlatformSafetyReviewAction[]
    internalReason: string
    blockedUntil?: string | null
    requiresAdminUnlock?: boolean
  },
): PlatformSafetyDecision {
  return {
    allowed: false,
    status: override.status,
    riskLevel: override.riskLevel,
    module: input.module,
    operationKind: input.operationKind,
    operationId: input.operationId,
    userId: input.userId,
    restrictionScope: override.restrictionScope,
    fundsAction: override.fundsAction,
    reviewActions: override.reviewActions,
    neutralUserMessage: neutralRestrictionMessage(input.module),
    internalReason: override.internalReason,
    signals: input.signals ?? [],
    blockedUntil: override.blockedUntil ?? null,
    requiresAdminUnlock: override.requiresAdminUnlock ?? false,
    createdAt: nowIso(),
    metadata: input.metadata ?? null,
  }
}

export class PlatformSafetyPolicyService {
  getSnapshot(): PlatformSafetyPolicySnapshot {
    return {
      version: "PLATFORM-SAFETY-1.1",
      modules: [
        "wallet",
        "taxi",
        "delivery_food",
        "delivery_products",
        "marketplace",
        "business",
        "merchant",
        "stream",
        "ai",
        "messenger",
        "unknown",
      ],
      statuses: ["allowed", "restricted", "safe_hold", "pending_admin_review", "blocked"],
      streamAdultPolicy: {
        firstViolationBlockHours: 1,
        secondViolationBlockHours: 12,
        thirdViolationBlockHours: 72,
        fourthViolationRequiresAdminUnlock: true,
      },
      moneyPolicy: {
        walletSecurityRequired: true,
        tokenOnlyCardStorageRequired: true,
        escrowForTaxiDeliveryMarketplace: true,
        businessMerchantSeparationRequired: true,
        adminReviewForHighRisk: true,
      },
      aiPolicy: {
        aiCreatesRiskSignalsOnly: true,
        aiDoesNotDecideGuilt: true,
        neutralUserMessagesOnly: true,
      },
    }
  }

  evaluate(input: PlatformSafetyInput): PlatformSafetyDecision {
    const signals = input.signals ?? []
    const riskLevel = highestRisk(signals)

    if (input.unifiedUserId && input.userId !== input.unifiedUserId) {
      return restrictedDecision(
        {
          ...input,
          signals: [
            ...signals,
            {
              kind: "user_mismatch",
              riskLevel: "critical",
              source: "rules",
              reason: "Unified userId mismatch.",
            },
          ],
        },
        {
          status: "safe_hold",
          riskLevel: "critical",
          restrictionScope: "account",
          fundsAction: "hold",
          reviewActions: ["create_internal_report", "admin_review_required"],
          internalReason: "Unified userId mismatch in platform operation.",
          requiresAdminUnlock: true,
        },
      )
    }

    if (input.module === "stream") {
      const streamDecision = this.evaluateStreamPolicy(input)
      if (!streamDecision.allowed) return streamDecision
    }

    if (this.isMoneyModule(input.module) || this.isMoneyOperation(input.operationKind)) {
      const moneyDecision = this.evaluateMoneyPolicy(input, riskLevel)
      if (!moneyDecision.allowed) return moneyDecision
    }

    if (this.isTaxiOrDelivery(input.module)) {
      const deliveryDecision = this.evaluateTaxiDeliveryPolicy(input, riskLevel)
      if (!deliveryDecision.allowed) return deliveryDecision
    }

    if (input.module === "marketplace") {
      const marketplaceDecision = this.evaluateMarketplacePolicy(input, riskLevel)
      if (!marketplaceDecision.allowed) return marketplaceDecision
    }

    if (input.module === "business" || input.module === "merchant") {
      const businessDecision = this.evaluateBusinessMerchantPolicy(input, riskLevel)
      if (!businessDecision.allowed) return businessDecision
    }

    if (riskLevel === "critical" || riskLevel === "high") {
      return restrictedDecision(input, {
        status: "pending_admin_review",
        riskLevel,
        restrictionScope: "operation",
        fundsAction: "restrict_movement",
        reviewActions: ["create_internal_report", "admin_review_required"],
        internalReason: "High or critical platform safety risk signal detected.",
      })
    }

    return allowedDecision(input)
  }

  evaluateStreamPolicy(input: PlatformSafetyInput): PlatformSafetyDecision {
    const signals = input.signals ?? []
    const hasAdultSignal = hasSignal(signals, ["adult_18_plus", "stream_policy_violation"])

    if (!hasAdultSignal) {
      return allowedDecision(input)
    }

    const state = input.streamViolationState
    const nextViolationCount = Math.max(1, (state?.violationCount ?? 0) + 1)
    const now = new Date()

    if (nextViolationCount >= 4) {
      return restrictedDecision(input, {
        status: "blocked",
        riskLevel: "critical",
        restrictionScope: "stream",
        fundsAction: "restrict_movement",
        reviewActions: ["create_internal_report", "admin_review_required", "release_after_review"],
        internalReason: "Stream 18+ policy reached fourth violation. Admin unlock required.",
        blockedUntil: null,
        requiresAdminUnlock: true,
      })
    }

    const blockHours = nextViolationCount === 1 ? 1 : nextViolationCount === 2 ? 12 : 72

    return restrictedDecision(input, {
      status: "restricted",
      riskLevel: nextViolationCount === 3 ? "high" : "medium",
      restrictionScope: "stream",
      fundsAction: "restrict_movement",
      reviewActions: ["create_internal_report"],
      internalReason: `Stream 18+ policy violation ${nextViolationCount}. Temporary stream restriction applied for ${blockHours} hour(s).`,
      blockedUntil: addHours(now, blockHours).toISOString(),
      requiresAdminUnlock: false,
    })
  }

  private evaluateMoneyPolicy(
    input: PlatformSafetyInput,
    riskLevel: PlatformSafetyRiskLevel,
  ): PlatformSafetyDecision {
    const signals = input.signals ?? []

    if (
      hasSignal(signals, [
        "wallet_pci_violation",
        "wallet_tokenization_violation",
        "aml",
        "fraud",
        "scam",
        "kyc_bypass",
        "payment_risk",
        "bot_payment_risk",
      ])
    ) {
      return restrictedDecision(input, {
        status: "safe_hold",
        riskLevel: riskLevel === "none" ? "high" : riskLevel,
        restrictionScope: "funds",
        fundsAction: "hold",
        reviewActions: ["create_internal_report", "compliance_review_required"],
        internalReason: "Money-related platform operation requires safe hold/compliance review.",
        requiresAdminUnlock: riskLevel === "critical",
      })
    }

    if (input.module === "taxi" || this.isTaxiOrDelivery(input.module) || input.module === "marketplace") {
      return restrictedDecision(input, {
        status: "safe_hold",
        riskLevel: "low",
        restrictionScope: "funds",
        fundsAction: "escrow",
        reviewActions: ["none"],
        internalReason: "Order-based payment must use escrow/safe-hold until completion.",
        requiresAdminUnlock: false,
      })
    }

    return allowedDecision(input)
  }

  private evaluateTaxiDeliveryPolicy(
    input: PlatformSafetyInput,
    riskLevel: PlatformSafetyRiskLevel,
  ): PlatformSafetyDecision {
    const signals = input.signals ?? []

    if (hasSignal(signals, ["taxi_safety_risk", "delivery_dispute", "fraud", "scam"])) {
      return restrictedDecision(input, {
        status: "pending_admin_review",
        riskLevel: riskLevel === "none" ? "high" : riskLevel,
        restrictionScope: "order",
        fundsAction: "refund_review",
        reviewActions: ["create_internal_report", "admin_review_required"],
        internalReason: "Taxi/delivery safety or dispute signal detected.",
      })
    }

    return allowedDecision(input)
  }

  private evaluateMarketplacePolicy(
    input: PlatformSafetyInput,
    riskLevel: PlatformSafetyRiskLevel,
  ): PlatformSafetyDecision {
    const signals = input.signals ?? []

    if (hasSignal(signals, ["marketplace_fake_product", "marketplace_counterfeit", "fraud", "scam"])) {
      return restrictedDecision(input, {
        status: "pending_admin_review",
        riskLevel: riskLevel === "none" ? "high" : riskLevel,
        restrictionScope: "order",
        fundsAction: "refund_review",
        reviewActions: ["create_internal_report", "admin_review_required"],
        internalReason: "Marketplace fraud/fake/counterfeit risk signal detected.",
      })
    }

    return allowedDecision(input)
  }

  private evaluateBusinessMerchantPolicy(
    input: PlatformSafetyInput,
    riskLevel: PlatformSafetyRiskLevel,
  ): PlatformSafetyDecision {
    const signals = input.signals ?? []

    if (hasSignal(signals, ["merchant_risk", "business_risk", "aml", "fraud", "scam", "bot_payment_risk"])) {
      return restrictedDecision(input, {
        status: "safe_hold",
        riskLevel: riskLevel === "none" ? "high" : riskLevel,
        restrictionScope: input.module === "merchant" ? "merchant" : "business",
        fundsAction: "hold",
        reviewActions: ["create_internal_report", "compliance_review_required"],
        internalReason: "Business/Merchant risk signal detected. Funds must not be mixed with personal wallet flow.",
        requiresAdminUnlock: riskLevel === "critical",
      })
    }

    return allowedDecision(input)
  }

  private isMoneyModule(module: PlatformSafetyModule) {
    return (
      module === "wallet" ||
      module === "taxi" ||
      module === "delivery_food" ||
      module === "delivery_products" ||
      module === "marketplace" ||
      module === "business" ||
      module === "merchant"
    )
  }

  private isMoneyOperation(operationKind: PlatformSafetyOperationKind) {
    return (
      operationKind === "payment" ||
      operationKind === "payout" ||
      operationKind === "settlement" ||
      operationKind === "refund" ||
      operationKind === "marketplace_purchase" ||
      operationKind === "marketplace_sale" ||
      operationKind === "business_income" ||
      operationKind === "merchant_income" ||
      operationKind === "merchant_settlement" ||
      operationKind === "stream_monetization" ||
      operationKind === "wallet_sensitive_operation"
    )
  }

  private isTaxiOrDelivery(module: PlatformSafetyModule) {
    return module === "taxi" || module === "delivery_food" || module === "delivery_products"
  }
}

export const platformSafetyPolicyService = new PlatformSafetyPolicyService()
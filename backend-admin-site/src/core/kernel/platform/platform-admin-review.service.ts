import {
  platformStreamSafetyPolicyService,
  type PlatformStreamSafetyState,
} from "./stream-safety-policy.service"
import {
  taxiDeliverySafetyPolicyService,
  type TaxiDeliverySafetyModule,
  type TaxiDeliverySafetyRole,
  type TaxiDeliverySafetyState,
} from "./taxi-delivery-safety-policy.service"
import {
  marketplaceSafetyPolicyService,
  type MarketplaceSafetyState,
} from "./marketplace-safety-policy.service"
import {
  businessMerchantSafetyPolicyService,
  type BusinessMerchantRoutingTarget,
  type BusinessMerchantSafetyState,
} from "./business-merchant-safety-policy.service"
import type { PlatformSafetyDecision, PlatformSafetyRiskLevel } from "./safety-policy.service"

export type PlatformAdminReviewTarget =
  | "wallet"
  | "stream"
  | "taxi_delivery"
  | "marketplace"
  | "business_merchant"
  | "platform_operation"

export type PlatformAdminReviewStatus =
  | "created"
  | "under_review"
  | "resolved"
  | "rejected"
  | "escalated"

export type PlatformAdminReviewPriority =
  | "low"
  | "medium"
  | "high"
  | "critical"

export type PlatformAdminReviewAction =
  | "release"
  | "reject"
  | "hold"
  | "escalate"

export type PlatformAdminStreamTarget = {
  userId: string
  streamId?: string | null
}

export type PlatformAdminTaxiDeliveryTarget = {
  subjectUserId: string
  module: TaxiDeliverySafetyModule
  subjectRole: TaxiDeliverySafetyRole
}

export type PlatformAdminMarketplaceTarget = {
  orderId: string
}

export type PlatformAdminBusinessMerchantTarget = {
  operationId: string
  approvedTarget?: BusinessMerchantRoutingTarget | null
}

export type PlatformAdminWalletTarget = {
  walletId: string
  userId?: string | null
}

export type PlatformWalletAdminReleaseHandler = (input: {
  walletId: string
  reviewerId: string
  reason: string
}) => unknown | Promise<unknown>

export type PlatformAdminReviewOpenInput = {
  target: PlatformAdminReviewTarget
  targetRef?: string | null
  userId?: string | null
  reason: string
  internalReason?: string | null
  priority?: PlatformAdminReviewPriority | null
  riskLevel?: PlatformSafetyRiskLevel | null
  decision?: PlatformSafetyDecision | null
  stream?: PlatformAdminStreamTarget | null
  taxiDelivery?: PlatformAdminTaxiDeliveryTarget | null
  marketplace?: PlatformAdminMarketplaceTarget | null
  businessMerchant?: PlatformAdminBusinessMerchantTarget | null
  wallet?: PlatformAdminWalletTarget | null
  metadata?: Record<string, unknown> | null
}

export type PlatformAdminReviewResolveInput = {
  reviewId: string
  reviewerId: string
  action: PlatformAdminReviewAction
  resolutionNote: string
  releaseWallet?: boolean
  releaseFunds?: boolean
  resetComplaintCount?: boolean
  approvedTarget?: BusinessMerchantRoutingTarget | null
  metadata?: Record<string, unknown> | null
}

export type PlatformAdminReviewCase = {
  reviewId: string
  target: PlatformAdminReviewTarget
  targetRef: string
  userId?: string | null
  status: PlatformAdminReviewStatus
  priority: PlatformAdminReviewPriority
  riskLevel: PlatformSafetyRiskLevel
  reason: string
  internalReason: string
  neutralUserMessage: string
  decision?: PlatformSafetyDecision | null
  stream?: PlatformAdminStreamTarget | null
  taxiDelivery?: PlatformAdminTaxiDeliveryTarget | null
  marketplace?: PlatformAdminMarketplaceTarget | null
  businessMerchant?: PlatformAdminBusinessMerchantTarget | null
  wallet?: PlatformAdminWalletTarget | null
  createdAt: string
  updatedAt: string
  assignedTo?: string | null
  resolvedAt?: string | null
  reviewerId?: string | null
  resolutionAction?: PlatformAdminReviewAction | null
  resolutionNote?: string | null
  targetReleaseResult?: unknown
  metadata?: Record<string, unknown> | null
}

export type PlatformAdminReviewSnapshot = {
  total: number
  created: PlatformAdminReviewCase[]
  underReview: PlatformAdminReviewCase[]
  escalated: PlatformAdminReviewCase[]
  resolved: PlatformAdminReviewCase[]
  rejected: PlatformAdminReviewCase[]
  open: PlatformAdminReviewCase[]
  all: PlatformAdminReviewCase[]
}

function nowIso() {
  return new Date().toISOString()
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeText(value: string | null | undefined, errorCode: string) {
  const text = value?.trim()

  if (!text) {
    throw new Error(errorCode)
  }

  return text
}

function riskToPriority(riskLevel?: PlatformSafetyRiskLevel | null): PlatformAdminReviewPriority {
  if (riskLevel === "critical") return "critical"
  if (riskLevel === "high") return "high"
  if (riskLevel === "medium") return "medium"
  return "low"
}

function neutralMessage(target: PlatformAdminReviewTarget) {
  if (target === "wallet") return "Wallet is under security review."
  if (target === "stream") return "Stream access is under safety review."
  if (target === "taxi_delivery") return "Taxi or delivery access is under safety review."
  if (target === "marketplace") return "Marketplace operation is under safety review."
  if (target === "business_merchant") return "Business operation is under compliance review."
  return "Operation is under safety review."
}

function buildTargetRef(input: PlatformAdminReviewOpenInput) {
  if (input.targetRef?.trim()) return input.targetRef.trim()

  if (input.target === "wallet" && input.wallet?.walletId) return input.wallet.walletId
  if (input.target === "stream" && input.stream?.userId) {
    return `${input.stream.userId}:${input.stream.streamId ?? "global"}`
  }
  if (input.target === "taxi_delivery" && input.taxiDelivery?.subjectUserId) {
    return `${input.taxiDelivery.subjectUserId}:${input.taxiDelivery.module}:${input.taxiDelivery.subjectRole}`
  }
  if (input.target === "marketplace" && input.marketplace?.orderId) return input.marketplace.orderId
  if (input.target === "business_merchant" && input.businessMerchant?.operationId) {
    return input.businessMerchant.operationId
  }

  return createId(`${input.target}_target`)
}

function isOpen(reviewCase: PlatformAdminReviewCase) {
  return (
    reviewCase.status === "created" ||
    reviewCase.status === "under_review" ||
    reviewCase.status === "escalated"
  )
}

export class PlatformAdminReviewService {
  private readonly cases = new Map<string, PlatformAdminReviewCase>()
  private walletReleaseHandler?: PlatformWalletAdminReleaseHandler

  registerWalletReleaseHandler(handler: PlatformWalletAdminReleaseHandler): void {
    this.walletReleaseHandler = handler
  }

  openCase(input: PlatformAdminReviewOpenInput): PlatformAdminReviewCase {
    const reviewId = createId("platform_admin_review")
    const now = nowIso()
    const riskLevel = input.riskLevel ?? input.decision?.riskLevel ?? "medium"

    const reviewCase: PlatformAdminReviewCase = {
      reviewId,
      target: input.target,
      targetRef: buildTargetRef(input),
      userId:
        input.userId ??
        input.wallet?.userId ??
        input.stream?.userId ??
        input.taxiDelivery?.subjectUserId ??
        input.decision?.userId ??
        null,
      status: "created",
      priority: input.priority ?? riskToPriority(riskLevel),
      riskLevel,
      reason: normalizeText(input.reason, "platform_admin_review_reason_required"),
      internalReason:
        input.internalReason ??
        input.decision?.internalReason ??
        "Admin review case created from platform safety signal.",
      neutralUserMessage: input.decision?.neutralUserMessage ?? neutralMessage(input.target),
      decision: input.decision ?? null,
      stream: input.stream ?? null,
      taxiDelivery: input.taxiDelivery ?? null,
      marketplace: input.marketplace ?? null,
      businessMerchant: input.businessMerchant ?? null,
      wallet: input.wallet ?? null,
      createdAt: now,
      updatedAt: now,
      assignedTo: null,
      resolvedAt: null,
      reviewerId: null,
      resolutionAction: null,
      resolutionNote: null,
      targetReleaseResult: null,
      metadata: input.metadata ?? null,
    }

    this.cases.set(reviewId, reviewCase)

    return reviewCase
  }

  assignCase(input: {
    reviewId: string
    adminId: string
  }): PlatformAdminReviewCase {
    const reviewCase = this.getRequiredCase(input.reviewId)

    const updated: PlatformAdminReviewCase = {
      ...reviewCase,
      status: "under_review",
      assignedTo: normalizeText(input.adminId, "platform_admin_reviewer_id_required"),
      updatedAt: nowIso(),
    }

    this.cases.set(updated.reviewId, updated)

    return updated
  }

  async resolveCase(input: PlatformAdminReviewResolveInput): Promise<PlatformAdminReviewCase> {
    const reviewCase = this.getRequiredCase(input.reviewId)
    const reviewerId = normalizeText(input.reviewerId, "platform_admin_reviewer_id_required")
    const resolutionNote = normalizeText(input.resolutionNote, "platform_admin_resolution_note_required")

    let targetReleaseResult: unknown = null
    let status: PlatformAdminReviewStatus = "resolved"

    if (input.action === "release") {
      targetReleaseResult = await this.releaseTargetAfterReview(reviewCase, {
        reviewerId,
        reason: resolutionNote,
        releaseWallet: input.releaseWallet,
        releaseFunds: input.releaseFunds,
        resetComplaintCount: input.resetComplaintCount,
        approvedTarget: input.approvedTarget,
      })
      status = "resolved"
    }

    if (input.action === "reject") {
      status = "rejected"
    }

    if (input.action === "hold") {
      status = "under_review"
    }

    if (input.action === "escalate") {
      status = "escalated"
    }

    const updated: PlatformAdminReviewCase = {
      ...reviewCase,
      status,
      updatedAt: nowIso(),
      resolvedAt: status === "resolved" || status === "rejected" ? nowIso() : null,
      reviewerId,
      resolutionAction: input.action,
      resolutionNote,
      targetReleaseResult,
      metadata: {
        ...(reviewCase.metadata ?? {}),
        ...(input.metadata ?? {}),
      },
    }

    this.cases.set(updated.reviewId, updated)

    return updated
  }

  rejectCase(input: {
    reviewId: string
    reviewerId: string
    resolutionNote: string
    metadata?: Record<string, unknown> | null
  }): Promise<PlatformAdminReviewCase> {
    return this.resolveCase({
      reviewId: input.reviewId,
      reviewerId: input.reviewerId,
      action: "reject",
      resolutionNote: input.resolutionNote,
      metadata: input.metadata,
    })
  }

  escalateCase(input: {
    reviewId: string
    reviewerId: string
    resolutionNote: string
    metadata?: Record<string, unknown> | null
  }): Promise<PlatformAdminReviewCase> {
    return this.resolveCase({
      reviewId: input.reviewId,
      reviewerId: input.reviewerId,
      action: "escalate",
      resolutionNote: input.resolutionNote,
      metadata: input.metadata,
    })
  }

  getCase(reviewId: string): PlatformAdminReviewCase | null {
    return this.cases.get(reviewId) ?? null
  }

  getRequiredCase(reviewId: string): PlatformAdminReviewCase {
    const id = normalizeText(reviewId, "platform_admin_review_id_required")
    const reviewCase = this.cases.get(id)

    if (!reviewCase) {
      throw new Error("platform_admin_review_case_not_found")
    }

    return reviewCase
  }

  listCases(filter?: {
    target?: PlatformAdminReviewTarget
    userId?: string
    status?: PlatformAdminReviewStatus
    openOnly?: boolean
  }): PlatformAdminReviewCase[] {
    let cases = Array.from(this.cases.values())

    if (filter?.target) {
      cases = cases.filter((item) => item.target === filter.target)
    }

    if (filter?.userId) {
      cases = cases.filter((item) => item.userId === filter.userId)
    }

    if (filter?.status) {
      cases = cases.filter((item) => item.status === filter.status)
    }

    if (filter?.openOnly) {
      cases = cases.filter(isOpen)
    }

    return cases.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  getSnapshot(filter?: {
    userId?: string
    target?: PlatformAdminReviewTarget
  }): PlatformAdminReviewSnapshot {
    const all = this.listCases({
      userId: filter?.userId,
      target: filter?.target,
    })

    return {
      total: all.length,
      created: all.filter((item) => item.status === "created"),
      underReview: all.filter((item) => item.status === "under_review"),
      escalated: all.filter((item) => item.status === "escalated"),
      resolved: all.filter((item) => item.status === "resolved"),
      rejected: all.filter((item) => item.status === "rejected"),
      open: all.filter(isOpen),
      all,
    }
  }

  private async releaseTargetAfterReview(
    reviewCase: PlatformAdminReviewCase,
    input: {
      reviewerId: string
      reason: string
      releaseWallet?: boolean
      releaseFunds?: boolean
      resetComplaintCount?: boolean
      approvedTarget?: BusinessMerchantRoutingTarget | null
    },
  ): Promise<unknown> {
    if (reviewCase.target === "stream") {
      if (!reviewCase.stream?.userId) {
        throw new Error("platform_admin_stream_target_missing")
      }

      const released: PlatformStreamSafetyState =
        platformStreamSafetyPolicyService.releaseAfterAdminReview({
          userId: reviewCase.stream.userId,
          streamId: reviewCase.stream.streamId,
          reviewerId: input.reviewerId,
          reason: input.reason,
        })

      return released
    }

    if (reviewCase.target === "taxi_delivery") {
      if (!reviewCase.taxiDelivery?.subjectUserId) {
        throw new Error("platform_admin_taxi_delivery_target_missing")
      }

      const released: TaxiDeliverySafetyState =
        taxiDeliverySafetyPolicyService.releaseAfterAdminReview({
          subjectUserId: reviewCase.taxiDelivery.subjectUserId,
          module: reviewCase.taxiDelivery.module,
          subjectRole: reviewCase.taxiDelivery.subjectRole,
          reviewerId: input.reviewerId,
          reason: input.reason,
          resetComplaintCount: input.resetComplaintCount ?? false,
        })

      return released
    }

    if (reviewCase.target === "marketplace") {
      if (!reviewCase.marketplace?.orderId) {
        throw new Error("platform_admin_marketplace_target_missing")
      }

      const released: MarketplaceSafetyState =
        marketplaceSafetyPolicyService.releaseAfterAdminReview({
          orderId: reviewCase.marketplace.orderId,
          reviewerId: input.reviewerId,
          reason: input.reason,
          releaseFunds: input.releaseFunds ?? false,
        })

      return released
    }

    if (reviewCase.target === "business_merchant") {
      if (!reviewCase.businessMerchant?.operationId) {
        throw new Error("platform_admin_business_merchant_target_missing")
      }

      const released: BusinessMerchantSafetyState =
        businessMerchantSafetyPolicyService.releaseAfterComplianceReview({
          operationId: reviewCase.businessMerchant.operationId,
          reviewerId: input.reviewerId,
          reason: input.reason,
          approvedTarget: input.approvedTarget ?? reviewCase.businessMerchant.approvedTarget ?? null,
        })

      return released
    }

    if (reviewCase.target === "wallet") {
      if (!reviewCase.wallet?.walletId) {
        throw new Error("platform_admin_wallet_target_missing")
      }

      if (!this.walletReleaseHandler) {
        return {
          walletId: reviewCase.wallet.walletId,
          releaseWallet: input.releaseWallet ?? false,
          releaseHandlerRegistered: false,
          note: "Wallet release handler is not registered yet.",
        }
      }

      return this.walletReleaseHandler({
        walletId: reviewCase.wallet.walletId,
        reviewerId: input.reviewerId,
        reason: input.reason,
      })
    }

    return {
      target: reviewCase.target,
      targetRef: reviewCase.targetRef,
      released: true,
      note: "Generic platform operation review resolved.",
    }
  }
}

export const platformAdminReviewService = new PlatformAdminReviewService()
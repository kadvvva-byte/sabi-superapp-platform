import {
  walletAiRiskGuard,
  type WalletAiRiskCheckContract,
  type WalletBiometricConfirmationContract,
  type WalletCardTokenContract,
  type WalletDeviceTrustContract,
  type WalletSecurityDecision,
  type WalletSecurityHoldInstruction,
  type WalletSecurityOperationKind,
  type WalletSecurityRiskLevel,
  type WalletSecurityStatus,
  type WalletSensitiveOperationApprovalContract,
  type WalletTokenizationProviderStatus,
} from "./wallet-ai-risk-guard.service"

export type WalletComplianceReportStatus =
  | "created"
  | "assigned"
  | "under_review"
  | "resolved"
  | "rejected"
  | "escalated"

export type WalletComplianceReportPriority =
  | "low"
  | "medium"
  | "high"
  | "critical"

export type WalletComplianceReport = {
  reportId: string
  walletId?: string | null
  userId: string
  operationId: string
  operationKind: WalletSecurityOperationKind
  category: WalletSecurityDecision["adminReportCategory"]
  priority: WalletComplianceReportPriority
  status: WalletComplianceReportStatus
  riskLevel: WalletSecurityRiskLevel
  walletStatus: WalletSecurityStatus
  internalReason: string
  neutralUserMessage: string
  signals: string[]
  blockedFields: string[]
  createdAt: string
  updatedAt: string
  resolvedAt?: string | null
  reviewerId?: string | null
  resolutionNote?: string | null
  rawDecision: WalletSecurityDecision
}

export type WalletRestrictedState = {
  walletId: string
  userId: string
  status: WalletSecurityStatus
  reasonCode: WalletSecurityDecision["code"]
  internalReason: string
  neutralUserMessage: string
  reportId?: string | null
  operationId?: string | null
  operationKind?: WalletSecurityOperationKind | null
  fundsAction: WalletSecurityHoldInstruction["fundsAction"]
  createdAt: string
  updatedAt: string
  expiresAt?: string | null
  metadata?: Record<string, unknown> | null
}

export type WalletSecurityApplyInput = {
  operationId: string
  userId: string
  unifiedUserId?: string | null
  walletId?: string | null
  operationKind: WalletSecurityOperationKind
  amount?: number | null
  currency?: string | null
  providerId?: string | null
  providerTokenId?: string | null
  providerStatus?: WalletTokenizationProviderStatus | null
  payerName?: string | null
  accountHolderName?: string | null
  biometric?: WalletBiometricConfirmationContract | null
  deviceTrust?: WalletDeviceTrustContract | null
  aiRisk?: WalletAiRiskCheckContract | null
  rawPayload?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
}

export type WalletTokenRegistrationInput = {
  userId: string
  walletId?: string | null
  operationId?: string | null
  token: WalletCardTokenContract
  biometric?: WalletBiometricConfirmationContract | null
  deviceTrust?: WalletDeviceTrustContract | null
  aiRisk?: WalletAiRiskCheckContract | null
  rawPayload?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
}

export type WalletComplianceApplyResult = {
  allowed: boolean
  walletStatus: WalletSecurityStatus
  holdInstruction: WalletSecurityHoldInstruction
  decision: WalletSecurityDecision
  report?: WalletComplianceReport | null
  restrictedState?: WalletRestrictedState | null
  sanitizedToken?: WalletCardTokenContract | null
}

export type WalletComplianceSnapshot = {
  walletId: string
  userId?: string | null
  status: WalletSecurityStatus
  restrictedState?: WalletRestrictedState | null
  openReports: WalletComplianceReport[]
  allReports: WalletComplianceReport[]
}

export type WalletCompliancePersistencePort = {
  persistReport(report: WalletComplianceReport): Promise<void>
  persistRestrictedState(state: WalletRestrictedState): Promise<void>
}

let walletCompliancePersistencePort: WalletCompliancePersistencePort | null = null

export function connectWalletCompliancePersistence(
  port: WalletCompliancePersistencePort | null,
): void {
  walletCompliancePersistencePort = port
}

function nowIso() {
  return new Date().toISOString()
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function priorityFromRisk(riskLevel: WalletSecurityRiskLevel): WalletComplianceReportPriority {
  if (riskLevel === "critical") return "critical"
  if (riskLevel === "high") return "high"
  if (riskLevel === "medium") return "medium"
  return "low"
}

function defaultWalletId(input: { walletId?: string | null; userId: string }) {
  return input.walletId?.trim() || `wallet_user_${input.userId}`
}

function buildApprovalInput(input: WalletSecurityApplyInput): WalletSensitiveOperationApprovalContract {
  return {
    operationId: input.operationId,
    userId: input.userId,
    unifiedUserId: input.unifiedUserId ?? null,
    walletId: input.walletId ?? null,
    operationKind: input.operationKind,
    amount: input.amount ?? null,
    currency: input.currency ?? null,
    providerId: input.providerId ?? null,
    providerTokenId: input.providerTokenId ?? null,
    providerStatus: input.providerStatus ?? null,
    payerName: input.payerName ?? null,
    accountHolderName: input.accountHolderName ?? null,
    biometric: input.biometric ?? null,
    deviceTrust: input.deviceTrust ?? null,
    aiRisk: input.aiRisk ?? null,
    rawPayload: input.rawPayload ?? null,
    metadata: input.metadata ?? null,
  }
}

export class WalletSecurityComplianceService {
  private readonly restrictedWallets = new Map<string, WalletRestrictedState>()
  private readonly reports = new Map<string, WalletComplianceReport>()

  async evaluateAndApply(input: WalletSecurityApplyInput): Promise<WalletComplianceApplyResult> {
    const approval = buildApprovalInput(input)
    const decision = await walletAiRiskGuard.evaluateSensitiveOperation(approval)
    const holdInstruction = walletAiRiskGuard.buildHoldInstruction(decision)

    if (decision.allowed && !decision.shouldRestrictWallet) {
      return {
        allowed: true,
        walletStatus: "active",
        holdInstruction,
        decision,
        report: null,
        restrictedState: null,
        sanitizedToken: null,
      }
    }

    const report = decision.shouldCreateInternalReport
      ? this.createInternalReport(input, decision)
      : null

    const restrictedState = this.applyWalletRestriction(input, holdInstruction, report)

    return {
      allowed: false,
      walletStatus: restrictedState.status,
      holdInstruction,
      decision,
      report,
      restrictedState,
      sanitizedToken: null,
    }
  }

  async evaluateCardTokenAndApply(
    input: WalletTokenRegistrationInput,
  ): Promise<WalletComplianceApplyResult> {
    const sanitizedToken = walletAiRiskGuard.sanitizeProviderToken(input.token)
    const tokenDecision = walletAiRiskGuard.evaluateCardToken(sanitizedToken)

    const operationInput: WalletSecurityApplyInput = {
      operationId: input.operationId ?? createId("wallet_card_tokenize"),
      userId: input.userId,
      walletId: input.walletId,
      operationKind: "card_tokenize",
      providerId: sanitizedToken.providerId,
      providerTokenId: sanitizedToken.tokenId,
      providerStatus: sanitizedToken.status,
      biometric: input.biometric ?? null,
      deviceTrust: input.deviceTrust ?? null,
      aiRisk: input.aiRisk ?? null,
      rawPayload: input.rawPayload ?? sanitizedToken.rawProviderMetadata ?? null,
      metadata: {
        ...(input.metadata ?? {}),
        providerId: sanitizedToken.providerId,
        providerTokenId: sanitizedToken.tokenId,
        providerStatus: sanitizedToken.status,
        maskedLabel: sanitizedToken.maskedLabel,
        last4: sanitizedToken.last4,
        cardBrand: sanitizedToken.cardBrand,
        cardCategory: sanitizedToken.cardCategory,
        pciModel: "token_only",
      },
    }

    if (tokenDecision.shouldRestrictWallet) {
      const holdInstruction = walletAiRiskGuard.buildHoldInstruction(tokenDecision)
      const report = this.createInternalReport(operationInput, tokenDecision)
      const restrictedState = this.applyWalletRestriction(operationInput, holdInstruction, report)

      return {
        allowed: false,
        walletStatus: restrictedState.status,
        holdInstruction,
        decision: tokenDecision,
        report,
        restrictedState,
        sanitizedToken,
      }
    }

    const applied = await this.evaluateAndApply(operationInput)

    return {
      ...applied,
      sanitizedToken,
    }
  }

  assertWalletCanOperate(walletId: string) {
    const state = this.restrictedWallets.get(walletId)

    if (!state) return

    if (state.status === "active") return

    const error = new Error(state.reasonCode)
    ;(
      error as Error & {
        walletRestrictedState?: WalletRestrictedState
      }
    ).walletRestrictedState = state
    throw error
  }

  getWalletStatus(walletId: string): WalletSecurityStatus {
    return this.restrictedWallets.get(walletId)?.status ?? "active"
  }

  getRestrictedState(walletId: string): WalletRestrictedState | null {
    return this.restrictedWallets.get(walletId) ?? null
  }

  getSnapshot(walletId: string): WalletComplianceSnapshot {
    const restrictedState = this.getRestrictedState(walletId)
    const allReports = Array.from(this.reports.values()).filter(
      (report) => report.walletId === walletId,
    )

    return {
      walletId,
      userId: restrictedState?.userId ?? allReports[0]?.userId ?? null,
      status: restrictedState?.status ?? "active",
      restrictedState,
      openReports: allReports.filter(
        (report) => report.status !== "resolved" && report.status !== "rejected",
      ),
      allReports,
    }
  }

  listReports(userId?: string): WalletComplianceReport[] {
    const reports = Array.from(this.reports.values())
    if (!userId) return reports
    return reports.filter((report) => report.userId === userId)
  }

  resolveReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
    releaseWallet?: boolean
  }): WalletComplianceReport {
    const report = this.reports.get(input.reportId)

    if (!report) {
      throw new Error("wallet_compliance_report_not_found")
    }

    const updated: WalletComplianceReport = {
      ...report,
      status: "resolved",
      reviewerId: input.reviewerId,
      resolutionNote: input.resolutionNote,
      resolvedAt: nowIso(),
      updatedAt: nowIso(),
    }

    this.reports.set(updated.reportId, updated)

    if (input.releaseWallet && updated.walletId) {
      this.releaseWallet({
        walletId: updated.walletId,
        reviewerId: input.reviewerId,
        reason: input.resolutionNote,
      })
    }

    return updated
  }

  rejectReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
  }): WalletComplianceReport {
    const report = this.reports.get(input.reportId)

    if (!report) {
      throw new Error("wallet_compliance_report_not_found")
    }

    const updated: WalletComplianceReport = {
      ...report,
      status: "rejected",
      reviewerId: input.reviewerId,
      resolutionNote: input.resolutionNote,
      resolvedAt: nowIso(),
      updatedAt: nowIso(),
    }

    this.reports.set(updated.reportId, updated)

    return updated
  }

  releaseWallet(input: {
    walletId: string
    reviewerId?: string | null
    reason?: string | null
  }): WalletRestrictedState {
    const existing = this.restrictedWallets.get(input.walletId)

    const released: WalletRestrictedState = {
      walletId: input.walletId,
      userId: existing?.userId ?? "unknown",
      status: "active",
      reasonCode: "wallet_security_allowed",
      internalReason: input.reason ?? "Wallet restriction released after review.",
      neutralUserMessage: "Wallet is active.",
      reportId: existing?.reportId ?? null,
      operationId: existing?.operationId ?? null,
      operationKind: existing?.operationKind ?? null,
      fundsAction: "none",
      createdAt: existing?.createdAt ?? nowIso(),
      updatedAt: nowIso(),
      metadata: {
        ...(existing?.metadata ?? {}),
        releasedBy: input.reviewerId ?? null,
        releaseReason: input.reason ?? null,
      },
    }

    this.restrictedWallets.set(input.walletId, released)

    return released
  }

  private createInternalReport(
    input: WalletSecurityApplyInput,
    decision: WalletSecurityDecision,
  ): WalletComplianceReport {
    const reportId = createId("wallet_compliance_report")
    const walletId = defaultWalletId(input)
    const timestamp = nowIso()

    const report: WalletComplianceReport = {
      reportId,
      walletId,
      userId: input.userId,
      operationId: input.operationId,
      operationKind: input.operationKind,
      category: decision.adminReportCategory,
      priority: priorityFromRisk(decision.riskLevel),
      status: "created",
      riskLevel: decision.riskLevel,
      walletStatus: decision.walletStatus,
      internalReason: decision.internalReason,
      neutralUserMessage: decision.neutralUserMessage,
      signals: decision.signals,
      blockedFields: decision.blockedFields,
      createdAt: timestamp,
      updatedAt: timestamp,
      resolvedAt: null,
      rawDecision: decision,
    }

    this.reports.set(report.reportId, report)

    void walletCompliancePersistencePort
      ?.persistReport(report)
      .catch(() => undefined)

    return report
  }

  private applyWalletRestriction(
    input: WalletSecurityApplyInput,
    holdInstruction: WalletSecurityHoldInstruction,
    report: WalletComplianceReport | null,
  ): WalletRestrictedState {
    const walletId = defaultWalletId(input)
    const timestamp = nowIso()

    const restrictedState: WalletRestrictedState = {
      walletId,
      userId: input.userId,
      status: holdInstruction.walletStatus,
      reasonCode: holdInstruction.decision.code,
      internalReason: holdInstruction.internalReason,
      neutralUserMessage: holdInstruction.userVisibleMessage,
      reportId: report?.reportId ?? null,
      operationId: input.operationId,
      operationKind: input.operationKind,
      fundsAction: holdInstruction.fundsAction,
      createdAt: timestamp,
      updatedAt: timestamp,
      expiresAt: null,
      metadata: {
        amount: input.amount ?? null,
        currency: input.currency ?? null,
        providerId: input.providerId ?? null,
        providerStatus: input.providerStatus ?? null,
        safeHoldScope: holdInstruction.decision.safeHoldScope,
        adminReportCategory: holdInstruction.decision.adminReportCategory,
      },
    }

    this.restrictedWallets.set(walletId, restrictedState)

    void walletCompliancePersistencePort
      ?.persistRestrictedState(restrictedState)
      .catch(() => undefined)

    return restrictedState
  }
}

export const walletSecurityComplianceService = new WalletSecurityComplianceService()
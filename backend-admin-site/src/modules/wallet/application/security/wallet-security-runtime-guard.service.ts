import {
  walletSecurityComplianceService,
  type WalletComplianceApplyResult,
  type WalletComplianceReport,
  type WalletComplianceSnapshot,
  type WalletRestrictedState,
  type WalletSecurityApplyInput,
  type WalletTokenRegistrationInput,
} from "./wallet-security-compliance.service"
import type {
  WalletAiRiskCheckContract,
  WalletBiometricConfirmationContract,
  WalletDeviceTrustContract,
  WalletSecurityDecision,
  WalletSecurityOperationKind,
  WalletSecurityStatus,
  WalletTokenizationProviderStatus,
} from "./wallet-ai-risk-guard.service"

export type WalletRuntimeGuardSource =
  | "wallet_core"
  | "wallet_runtime"
  | "wallet_route"
  | "wallet_mobile"
  | "wallet_admin"
  | "payment_provider"
  | "qr"
  | "coin"
  | "merchant"
  | "business"
  | "bot"
  | "unknown"

export type WalletRuntimeGuardInput = {
  operationId?: string | null
  userId: string
  unifiedUserId?: string | null
  walletId?: string | null
  operationKind: WalletSecurityOperationKind
  source?: WalletRuntimeGuardSource
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

export type WalletRuntimeGuardResult = WalletComplianceApplyResult & {
  operationId: string
  source: WalletRuntimeGuardSource
  canContinue: boolean
  shouldStopOperation: boolean
  userVisibleMessage: string
  adminReport?: WalletComplianceReport | null
  restrictedState?: WalletRestrictedState | null
}

export type WalletRuntimeGuardError = Error & {
  walletSecurityDecision?: WalletSecurityDecision
  walletRestrictedState?: WalletRestrictedState | null
  walletSecurityResult?: WalletRuntimeGuardResult
}

function nowId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function safeOperationId(input: WalletRuntimeGuardInput) {
  return input.operationId?.trim() || nowId(`wallet_${input.operationKind}`)
}

function safeSource(input: WalletRuntimeGuardInput): WalletRuntimeGuardSource {
  return input.source ?? "unknown"
}

function normalizeMetadata(input: WalletRuntimeGuardInput): Record<string, unknown> {
  return {
    ...(input.metadata ?? {}),
    guardSource: safeSource(input),
    pciModel: "pci_dss_service_provider_token_only",
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    biometricOnDeviceOnly: true,
    aiFinalDecisionAllowed: false,
  }
}

function toApplyInput(input: WalletRuntimeGuardInput): WalletSecurityApplyInput {
  return {
    operationId: safeOperationId(input),
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
    metadata: normalizeMetadata(input),
  }
}

function toRuntimeResult(
  input: WalletRuntimeGuardInput,
  applied: WalletComplianceApplyResult,
): WalletRuntimeGuardResult {
  const operationId = safeOperationId(input)

  return {
    ...applied,
    operationId,
    source: safeSource(input),
    canContinue: applied.allowed && !applied.decision.shouldRestrictWallet,
    shouldStopOperation: !applied.allowed || applied.decision.shouldRestrictWallet,
    userVisibleMessage: applied.holdInstruction.userVisibleMessage,
    adminReport: applied.report ?? null,
    restrictedState: applied.restrictedState ?? null,
  }
}

function makeGuardError(result: WalletRuntimeGuardResult): WalletRuntimeGuardError {
  const error = new Error(result.decision.code) as WalletRuntimeGuardError
  error.walletSecurityDecision = result.decision
  error.walletRestrictedState = result.restrictedState ?? null
  error.walletSecurityResult = result
  return error
}

export class WalletSecurityRuntimeGuardService {
  async evaluateOperation(input: WalletRuntimeGuardInput): Promise<WalletRuntimeGuardResult> {
    const applied = await walletSecurityComplianceService.evaluateAndApply(toApplyInput(input))
    return toRuntimeResult(input, applied)
  }

  async assertOperationAllowed(input: WalletRuntimeGuardInput): Promise<WalletRuntimeGuardResult> {
    const result = await this.evaluateOperation(input)

    if (result.shouldStopOperation) {
      throw makeGuardError(result)
    }

    return result
  }

  async evaluateCardToken(input: WalletTokenRegistrationInput): Promise<WalletRuntimeGuardResult> {
    const applied = await walletSecurityComplianceService.evaluateCardTokenAndApply(input)

    return {
      ...applied,
      operationId: input.operationId ?? "wallet_card_tokenize",
      source: "payment_provider",
      canContinue: applied.allowed && !applied.decision.shouldRestrictWallet,
      shouldStopOperation: !applied.allowed || applied.decision.shouldRestrictWallet,
      userVisibleMessage: applied.holdInstruction.userVisibleMessage,
      adminReport: applied.report ?? null,
      restrictedState: applied.restrictedState ?? null,
    }
  }

  async assertCardTokenAllowed(input: WalletTokenRegistrationInput): Promise<WalletRuntimeGuardResult> {
    const result = await this.evaluateCardToken(input)

    if (result.shouldStopOperation) {
      throw makeGuardError(result)
    }

    return result
  }

  assertWalletCanOperate(walletId: string) {
    walletSecurityComplianceService.assertWalletCanOperate(walletId)
  }

  getWalletStatus(walletId: string): WalletSecurityStatus {
    return walletSecurityComplianceService.getWalletStatus(walletId)
  }

  getRestrictedState(walletId: string): WalletRestrictedState | null {
    return walletSecurityComplianceService.getRestrictedState(walletId)
  }

  getSnapshot(walletId: string): WalletComplianceSnapshot {
    return walletSecurityComplianceService.getSnapshot(walletId)
  }

  listReports(userId?: string): WalletComplianceReport[] {
    return walletSecurityComplianceService.listReports(userId)
  }

  releaseWallet(input: {
    walletId: string
    reviewerId?: string | null
    reason?: string | null
  }): WalletRestrictedState {
    return walletSecurityComplianceService.releaseWallet(input)
  }

  resolveReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
    releaseWallet?: boolean
  }): WalletComplianceReport {
    return walletSecurityComplianceService.resolveReport(input)
  }

  rejectReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
  }): WalletComplianceReport {
    return walletSecurityComplianceService.rejectReport(input)
  }
}

export const walletSecurityRuntimeGuard = new WalletSecurityRuntimeGuardService()
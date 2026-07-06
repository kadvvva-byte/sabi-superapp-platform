export type SabiComplianceProviderId = "kyc_provider" | "aml_provider"

export type SabiComplianceProviderMode = "provider_not_configured" | "sandbox" | "production"

export type SabiKycDecision =
  | "verification_pending"
  | "verification_verified"
  | "verification_rejected"
  | "verification_requires_manual_review"
  | "verification_provider_unavailable"

export type SabiAmlDecision =
  | "screening_pending"
  | "screening_clear"
  | "screening_alert"
  | "screening_requires_manual_review"
  | "screening_provider_unavailable"

export type SabiComplianceSubject = {
  userId: string
  unifiedUserId: string
  walletId?: string
  countryIso2?: string
  documentCountryIso2?: string
  riskTier?: "low" | "medium" | "high" | "restricted"
}

export type SabiKycVerificationStartInput = {
  subject: SabiComplianceSubject
  providerCustomerReference?: string
  returnUrl?: string
  metadata?: Record<string, unknown>
}

export type SabiKycVerificationStartResult = {
  providerId: "kyc_provider"
  providerReference: string
  verificationUrl?: string
  decision: SabiKycDecision
  manualReviewRequired: boolean
  safeToContinueWalletFlow: boolean
}

export type SabiKycWebhookEvent = {
  providerId: "kyc_provider"
  providerReference: string
  eventType:
    | "verification_started"
    | "verification_verified"
    | "verification_rejected"
    | "verification_manual_review"
    | "verification_expired"
  subject?: SabiComplianceSubject
  occurredAt: string
  metadata?: Record<string, unknown>
}

export type SabiAmlScreeningInput = {
  subject: SabiComplianceSubject
  transaction?: {
    transactionId: string
    walletRoute: string
    amount: string
    currency: string
    counterpartyReference?: string
  }
  metadata?: Record<string, unknown>
}

export type SabiAmlScreeningResult = {
  providerId: "aml_provider"
  providerReference: string
  decision: SabiAmlDecision
  safeHoldRequired: boolean
  adminReviewRequired: boolean
  safeToContinueWalletFlow: boolean
}

export type SabiAmlWebhookEvent = {
  providerId: "aml_provider"
  providerReference: string
  eventType:
    | "screening_clear"
    | "screening_alert"
    | "screening_manual_review"
    | "transaction_risk_status"
    | "case_closed"
  subject?: SabiComplianceSubject
  occurredAt: string
  metadata?: Record<string, unknown>
}

export interface SabiKycProviderBinding {
  readonly providerId: "kyc_provider"
  readonly mode: SabiComplianceProviderMode
  startVerification(input: SabiKycVerificationStartInput): Promise<SabiKycVerificationStartResult>
  consumeWebhook(event: SabiKycWebhookEvent): Promise<SabiKycVerificationStartResult>
}

export interface SabiAmlProviderBinding {
  readonly providerId: "aml_provider"
  readonly mode: SabiComplianceProviderMode
  screen(input: SabiAmlScreeningInput): Promise<SabiAmlScreeningResult>
  consumeWebhook(event: SabiAmlWebhookEvent): Promise<SabiAmlScreeningResult>
}

export class SabiComplianceProviderNotConfiguredError extends Error {
  constructor(providerId: SabiComplianceProviderId, action: string) {
    super(`${providerId}:${action}:real_provider_binding_required`)
    this.name = "SabiComplianceProviderNotConfiguredError"
  }
}

export const disabledKycProviderBinding: SabiKycProviderBinding = {
  providerId: "kyc_provider",
  mode: "provider_not_configured",
  async startVerification() {
    throw new SabiComplianceProviderNotConfiguredError("kyc_provider", "startVerification")
  },
  async consumeWebhook() {
    throw new SabiComplianceProviderNotConfiguredError("kyc_provider", "consumeWebhook")
  },
}

export const disabledAmlProviderBinding: SabiAmlProviderBinding = {
  providerId: "aml_provider",
  mode: "provider_not_configured",
  async screen() {
    throw new SabiComplianceProviderNotConfiguredError("aml_provider", "screen")
  },
  async consumeWebhook() {
    throw new SabiComplianceProviderNotConfiguredError("aml_provider", "consumeWebhook")
  },
}

export function assertComplianceProviderBindingIsReal(params: {
  providerId: SabiComplianceProviderId
  mode: SabiComplianceProviderMode
  adapterBound: boolean
  executionAvailable: boolean
}) {
  if (params.mode === "provider_not_configured" || !params.adapterBound || !params.executionAvailable) {
    throw new SabiComplianceProviderNotConfiguredError(params.providerId, "assertBinding")
  }
}

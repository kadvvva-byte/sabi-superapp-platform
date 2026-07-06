import {
  assertNoForbiddenWalletCardData,
  type WalletProviderFamily,
  type WalletProviderReadinessStatus,
} from "./wallet-provider-domain.policy"

export type WalletLedgerProviderStatus =
  | "provider_not_configured"
  | "provider_pending"
  | "provider_confirmed"
  | "provider_failed"
  | "provider_restricted"
  | "provider_not_required"

export type WalletLedgerRiskStatus =
  | "not_checked"
  | "passed"
  | "review_required"
  | "safe_hold"
  | "restricted"
  | "blocked"

export type WalletLedgerComplianceStatus =
  | "not_required"
  | "pending"
  | "kyc_required"
  | "aml_review_required"
  | "admin_review_required"
  | "safe_hold"
  | "restricted"
  | "blocked"
  | "cleared"

export type WalletProviderPersistenceInput = {
  walletRoute: string
  providerFamily?: WalletProviderFamily | null
  providerId?: string | null
  providerPaymentId?: string | null
  providerTokenId?: string | null
  providerReference?: string | null
  ledgerReference?: string | null
  transactionId?: string | null
  walletId?: string | null
  sourceModule?: string | null
  operationKind?: string | null
  providerStatus?: string | null
  riskStatus?: WalletLedgerRiskStatus | string | null
  complianceStatus?: WalletLedgerComplianceStatus | string | null
  kycStatus?: string | null
  amlStatus?: string | null
  adminReviewStatus?: string | null
  safeHoldReason?: string | null
  restrictedReason?: string | null
  idempotencyKey?: string | null
  metadata?: Record<string, unknown> | null
}

export type WalletProviderPersistenceMetadata = {
  walletRoute: string
  providerFamily: WalletProviderFamily
  providerId: string | null
  providerPaymentId: string | null
  providerTokenId: string | null
  providerReference: string | null
  ledgerReference: string | null
  transactionId: string | null
  walletId: string | null
  sourceModule: string | null
  operationKind: string | null
  providerStatus: WalletLedgerProviderStatus
  riskStatus: WalletLedgerRiskStatus
  complianceStatus: WalletLedgerComplianceStatus
  kycStatus: string | null
  amlStatus: string | null
  adminReviewStatus: string | null
  safeHoldReason: string | null
  restrictedReason: string | null
  idempotencyKey: string | null
  tokenOnly: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  rawCardDataBlocked: true
  cardDataLiability: "provider_only"
  createdAt: string
}

function asCleanString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function normalizeProviderFamily(value: unknown): WalletProviderFamily {
  const normalized = asCleanString(value)?.toLowerCase()

  if (
    normalized === "bank" ||
    normalized === "card_issuer" ||
    normalized === "payment_provider" ||
    normalized === "merchant_acquirer" ||
    normalized === "coin_provider" ||
    normalized === "crypto_provider" ||
    normalized === "unknown"
  ) {
    return normalized
  }

  return "unknown"
}

export function normalizeLedgerProviderStatus(value: unknown): WalletLedgerProviderStatus {
  const normalized = asCleanString(value)?.toLowerCase()

  if (
    normalized === "provider_not_configured" ||
    normalized === "provider_pending" ||
    normalized === "provider_confirmed" ||
    normalized === "provider_failed" ||
    normalized === "provider_restricted" ||
    normalized === "provider_not_required"
  ) {
    return normalized
  }

  if (normalized === "created" || normalized === "authorized" || normalized === "pending") {
    return "provider_pending"
  }

  if (normalized === "captured" || normalized === "success" || normalized === "succeeded") {
    return "provider_confirmed"
  }

  if (normalized === "failed" || normalized === "cancelled" || normalized === "canceled") {
    return "provider_failed"
  }

  if (normalized === "restricted" || normalized === "blocked") {
    return "provider_restricted"
  }

  return "provider_not_configured"
}

export function normalizeProviderReadinessForLedger(
  value: WalletProviderReadinessStatus | string | null | undefined,
): WalletLedgerProviderStatus {
  if (value === "provider_verified") return "provider_confirmed"
  if (value === "provider_pending") return "provider_pending"
  if (value === "provider_failed") return "provider_failed"
  if (value === "provider_restricted") return "provider_restricted"
  return normalizeLedgerProviderStatus(value)
}

function normalizeRiskStatus(value: unknown): WalletLedgerRiskStatus {
  const normalized = asCleanString(value)?.toLowerCase()

  if (
    normalized === "not_checked" ||
    normalized === "passed" ||
    normalized === "review_required" ||
    normalized === "safe_hold" ||
    normalized === "restricted" ||
    normalized === "blocked"
  ) {
    return normalized
  }

  return "not_checked"
}

function normalizeComplianceStatus(value: unknown): WalletLedgerComplianceStatus {
  const normalized = asCleanString(value)?.toLowerCase()

  if (
    normalized === "not_required" ||
    normalized === "pending" ||
    normalized === "kyc_required" ||
    normalized === "aml_review_required" ||
    normalized === "admin_review_required" ||
    normalized === "safe_hold" ||
    normalized === "restricted" ||
    normalized === "blocked" ||
    normalized === "cleared"
  ) {
    return normalized
  }

  return "pending"
}

function sanitizeMetadata(value: Record<string, unknown> | null | undefined) {
  if (!value) return {}
  assertNoForbiddenWalletCardData(value)
  return { ...value }
}

export function buildWalletProviderPersistenceMetadata(
  input: WalletProviderPersistenceInput,
): WalletProviderPersistenceMetadata {
  assertNoForbiddenWalletCardData(input.metadata ?? null)

  const metadata = sanitizeMetadata(input.metadata)
  const providerStatus = normalizeLedgerProviderStatus(
    input.providerStatus ?? metadata.providerStatus,
  )

  return {
    walletRoute:
      asCleanString(input.walletRoute) ??
      asCleanString(metadata.walletRoute) ??
      "wallet_route_not_configured",
    providerFamily: normalizeProviderFamily(input.providerFamily ?? metadata.providerFamily),
    providerId: asCleanString(input.providerId) ?? asCleanString(metadata.providerId),
    providerPaymentId:
      asCleanString(input.providerPaymentId) ?? asCleanString(metadata.providerPaymentId),
    providerTokenId: asCleanString(input.providerTokenId) ?? asCleanString(metadata.providerTokenId),
    providerReference:
      asCleanString(input.providerReference) ??
      asCleanString(metadata.providerReference) ??
      asCleanString(input.providerPaymentId),
    ledgerReference:
      asCleanString(input.ledgerReference) ??
      asCleanString(metadata.ledgerReference) ??
      asCleanString(input.transactionId) ??
      asCleanString(input.idempotencyKey),
    transactionId: asCleanString(input.transactionId) ?? asCleanString(metadata.transactionId),
    walletId: asCleanString(input.walletId) ?? asCleanString(metadata.walletId),
    sourceModule: asCleanString(input.sourceModule) ?? asCleanString(metadata.sourceModule),
    operationKind: asCleanString(input.operationKind) ?? asCleanString(metadata.operationKind),
    providerStatus,
    riskStatus: normalizeRiskStatus(input.riskStatus ?? metadata.riskStatus),
    complianceStatus: normalizeComplianceStatus(
      input.complianceStatus ?? metadata.complianceStatus,
    ),
    kycStatus: asCleanString(input.kycStatus) ?? asCleanString(metadata.kycStatus),
    amlStatus: asCleanString(input.amlStatus) ?? asCleanString(metadata.amlStatus),
    adminReviewStatus:
      asCleanString(input.adminReviewStatus) ?? asCleanString(metadata.adminReviewStatus),
    safeHoldReason: asCleanString(input.safeHoldReason) ?? asCleanString(metadata.safeHoldReason),
    restrictedReason:
      asCleanString(input.restrictedReason) ?? asCleanString(metadata.restrictedReason),
    idempotencyKey: asCleanString(input.idempotencyKey) ?? asCleanString(metadata.idempotencyKey),
    tokenOnly: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    rawCardDataBlocked: true,
    cardDataLiability: "provider_only",
    createdAt: new Date().toISOString(),
  }
}

export function mergeWalletProviderPersistenceMetadata(
  existing: Record<string, unknown> | null | undefined,
  input: WalletProviderPersistenceInput,
): Record<string, unknown> {
  const base = sanitizeMetadata(existing ?? null)
  const persistence = buildWalletProviderPersistenceMetadata(input)

  return {
    ...base,
    walletProviderPersistence: persistence,
    walletRoute: persistence.walletRoute,
    providerFamily: persistence.providerFamily,
    providerId: persistence.providerId,
    providerPaymentId: persistence.providerPaymentId,
    providerTokenId: persistence.providerTokenId,
    providerReference: persistence.providerReference,
    ledgerReference: persistence.ledgerReference,
    providerStatus: persistence.providerStatus,
    riskStatus: persistence.riskStatus,
    complianceStatus: persistence.complianceStatus,
    kycStatus: persistence.kycStatus,
    amlStatus: persistence.amlStatus,
    adminReviewStatus: persistence.adminReviewStatus,
    safeHoldReason: persistence.safeHoldReason,
    restrictedReason: persistence.restrictedReason,
    tokenOnly: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    cardDataLiability: "provider_only",
  }
}

export function assertWalletPersistencePayloadIsTokenOnly(payload: unknown): void {
  assertNoForbiddenWalletCardData(payload)
}

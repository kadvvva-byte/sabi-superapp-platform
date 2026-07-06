import { DomainError } from "@/core/kernel"

export type WalletProviderFamily =
  | "bank"
  | "card_issuer"
  | "payment_provider"
  | "merchant_acquirer"
  | "coin_provider"
  | "crypto_provider"
  | "unknown"

export type WalletProviderReadinessStatus =
  | "provider_not_configured"
  | "provider_pending"
  | "provider_verified"
  | "provider_failed"
  | "provider_restricted"

export type WalletProviderTokenStatus =
  | "PENDING"
  | "VERIFIED"
  | "FAILED"
  | "REVOKED"
  | "EXPIRED"
  | "UNKNOWN"

export type WalletProviderTokenContract = {
  providerId: string
  providerFamily: WalletProviderFamily
  providerTokenId: string
  providerTokenStatus: WalletProviderTokenStatus
  providerCustomerId?: string | null
  providerAccountId?: string | null
  providerReference?: string | null
  maskedLabel?: string | null
  last4?: string | null
  currency?: string | null
  createdAt?: Date | string | null
  expiresAt?: Date | string | null
  metadata?: Record<string, unknown> | null
}

export type WalletProviderDomainDecision = {
  allowed: boolean
  status: WalletProviderReadinessStatus
  reasonCode:
    | "wallet_provider_ready"
    | "wallet_provider_not_configured"
    | "wallet_provider_token_required"
    | "wallet_provider_token_not_verified"
    | "wallet_provider_restricted"
    | "wallet_provider_raw_card_data_blocked"
  providerId?: string | null
  providerTokenId?: string | null
  providerFamily: WalletProviderFamily
  tokenOnly: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  blockedFields: string[]
}

const RAW_PAN_KEY_PATTERNS = [
  "pan",
  "cardnumber",
  "card_number",
  "card-number",
  "primaryaccountnumber",
  "primary_account_number",
  "fullcard",
  "full_card",
  "cardnum",
  "card_num",
]

const RAW_CVV_KEY_PATTERNS = [
  "cvv",
  "cvc",
  "cvv2",
  "cvc2",
  "securitycode",
  "security_code",
  "cardsecuritycode",
  "card_security_code",
]

const SAFE_MASKED_KEY_PATTERNS = [
  "masked",
  "maskedpan",
  "masked_pan",
  "mask",
  "last4",
  "last_four",
  "brand",
  "cardbrand",
  "card_brand",
  "token",
  "tokenid",
  "token_id",
  "provider",
  "providerid",
  "provider_id",
  "status",
  "currency",
  "country",
  "expiry",
  "expirymonth",
  "expiry_month",
  "expiryyear",
  "expiry_year",
]

function normalizeKey(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function flattenPayload(
  value: unknown,
  prefix = "",
  result: Array<{ path: string; key: string; value: unknown }> = [],
) {
  if (!isPlainObject(value)) return result

  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key
    result.push({ path, key, value: child })

    if (isPlainObject(child)) {
      flattenPayload(child, path, result)
    } else if (Array.isArray(child)) {
      child.forEach((item, index) => flattenPayload(item, `${path}[${index}]`, result))
    }
  }

  return result
}

export function isLikelyRawPan(value: unknown): boolean {
  const text = String(value ?? "").replace(/[\s-]/g, "")
  return /^\d{12,19}$/.test(text)
}

export function isLikelyCvv(value: unknown): boolean {
  const text = String(value ?? "").trim()
  return /^\d{3,4}$/.test(text)
}

export function detectForbiddenWalletCardData(payload: unknown): string[] {
  const blocked = new Set<string>()

  for (const item of flattenPayload(payload)) {
    const key = normalizeKey(item.key)
    const rawValue = item.value
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue
    const safeMaskedKey = SAFE_MASKED_KEY_PATTERNS.some((pattern) => key.includes(normalizeKey(pattern)))

    if (safeMaskedKey) {
      if (isLikelyRawPan(value)) {
        blocked.add(item.path)
      }
      continue
    }

    if (RAW_PAN_KEY_PATTERNS.some((pattern) => key.includes(normalizeKey(pattern)))) {
      blocked.add(item.path)
      continue
    }

    if (RAW_CVV_KEY_PATTERNS.some((pattern) => key.includes(normalizeKey(pattern)))) {
      blocked.add(item.path)
      continue
    }

    if (isLikelyRawPan(value)) {
      blocked.add(item.path)
      continue
    }
  }

  return Array.from(blocked)
}

export function assertNoForbiddenWalletCardData(payload: unknown): void {
  const blockedFields = detectForbiddenWalletCardData(payload)

  if (blockedFields.length > 0) {
    throw new DomainError("Raw card data is blocked. Use bank/provider tokenization only.", {
      blockedFields,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      tokenOnly: true,
    })
  }
}

export function assertWebhookPayloadDoesNotContainCardData(payload: unknown): void {
  assertNoForbiddenWalletCardData(payload)
}

export function sanitizeProviderTokenContract(
  input: WalletProviderTokenContract,
): WalletProviderTokenContract {
  assertNoForbiddenWalletCardData(input.metadata ?? null)

  return {
    providerId: input.providerId.trim(),
    providerFamily: input.providerFamily,
    providerTokenId: input.providerTokenId.trim(),
    providerTokenStatus: input.providerTokenStatus,
    providerCustomerId: input.providerCustomerId?.trim() || null,
    providerAccountId: input.providerAccountId?.trim() || null,
    providerReference: input.providerReference?.trim() || null,
    maskedLabel: input.maskedLabel?.trim() || null,
    last4: input.last4?.trim() || null,
    currency: input.currency?.trim().toUpperCase() || null,
    createdAt: input.createdAt ?? null,
    expiresAt: input.expiresAt ?? null,
    metadata: input.metadata ?? null,
  }
}

export function evaluateWalletProviderDomainReadiness(input: {
  providerId?: string | null
  providerTokenId?: string | null
  providerTokenStatus?: WalletProviderTokenStatus | null
  providerFamily?: WalletProviderFamily | null
  providerRestricted?: boolean | null
  payload?: unknown
}): WalletProviderDomainDecision {
  const blockedFields = detectForbiddenWalletCardData(input.payload ?? null)
  const providerFamily = input.providerFamily ?? "unknown"

  if (blockedFields.length > 0) {
    return {
      allowed: false,
      status: "provider_restricted",
      reasonCode: "wallet_provider_raw_card_data_blocked",
      providerId: input.providerId ?? null,
      providerTokenId: null,
      providerFamily,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      blockedFields,
    }
  }

  if (input.providerRestricted) {
    return {
      allowed: false,
      status: "provider_restricted",
      reasonCode: "wallet_provider_restricted",
      providerId: input.providerId ?? null,
      providerTokenId: input.providerTokenId ?? null,
      providerFamily,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      blockedFields: [],
    }
  }

  if (!input.providerId?.trim()) {
    return {
      allowed: false,
      status: "provider_not_configured",
      reasonCode: "wallet_provider_not_configured",
      providerId: null,
      providerTokenId: null,
      providerFamily,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      blockedFields: [],
    }
  }

  if (!input.providerTokenId?.trim()) {
    return {
      allowed: false,
      status: "provider_pending",
      reasonCode: "wallet_provider_token_required",
      providerId: input.providerId.trim(),
      providerTokenId: null,
      providerFamily,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      blockedFields: [],
    }
  }

  if (input.providerTokenStatus !== "VERIFIED") {
    return {
      allowed: false,
      status: input.providerTokenStatus === "FAILED" ? "provider_failed" : "provider_pending",
      reasonCode: "wallet_provider_token_not_verified",
      providerId: input.providerId.trim(),
      providerTokenId: input.providerTokenId.trim(),
      providerFamily,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      blockedFields: [],
    }
  }

  return {
    allowed: true,
    status: "provider_verified",
    reasonCode: "wallet_provider_ready",
    providerId: input.providerId.trim(),
    providerTokenId: input.providerTokenId.trim(),
    providerFamily,
    tokenOnly: true,
    panStorageAllowed: false,
    cvvStorageAllowed: false,
    blockedFields: [],
  }
}

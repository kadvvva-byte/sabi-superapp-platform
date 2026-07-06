export type WalletSecurityOperationKind =
  | "card_bind"
  | "card_tokenize"
  | "top_up"
  | "withdraw"
  | "transfer"
  | "coin_conversion"
  | "premium_purchase"
  | "merchant_payment"
  | "business_payment"
  | "qr_payment"
  | "bot_payment"
  | "unknown"

export type WalletSecurityStatus =
  | "active"
  | "restricted"
  | "safe_hold"
  | "pending_review"
  | "blocked"

export type WalletSecurityRiskLevel =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "critical"

export type WalletSecurityDecisionCode =
  | "wallet_security_allowed"
  | "wallet_security_confirmation_required"
  | "wallet_security_safe_hold"
  | "wallet_security_restricted"
  | "wallet_security_blocked"
  | "wallet_security_provider_token_required"
  | "wallet_security_provider_success_required"
  | "wallet_security_raw_pan_detected"
  | "wallet_security_cvv_detected"
  | "wallet_security_raw_card_payload_detected"
  | "wallet_security_biometric_failed"
  | "wallet_security_device_mismatch"
  | "wallet_security_user_mismatch"
  | "wallet_security_payer_name_mismatch"
  | "wallet_security_kyc_risk"
  | "wallet_security_aml_risk"
  | "wallet_security_fraud_risk"
  | "wallet_security_bot_or_merchant_risk"
  | "wallet_security_ai_risk_provider_restricted"

export type WalletTokenizationProviderStatus =
  | "success"
  | "failed"
  | "pending"
  | "cancelled"
  | "unknown"

export type WalletCardTokenContract = {
  tokenId: string
  providerId: string
  providerCustomerId?: string | null
  providerCardId?: string | null
  status: WalletTokenizationProviderStatus
  cardBrand?: string | null
  cardCategory?: "local" | "international" | "local_global" | "virtual" | "unknown" | null
  maskedLabel?: string | null
  last4?: string | null
  expiryMonth?: string | null
  expiryYear?: string | null
  currency?: string | null
  country?: string | null
  createdAt?: string | null
  rawProviderMetadata?: Record<string, unknown> | null
}

export type WalletBiometricConfirmationContract = {
  required: boolean
  passed: boolean
  method?: "face_id" | "touch_id" | "device_biometric" | "pin" | "unknown" | null
  deviceId?: string | null
  challengeId?: string | null
  confirmedAt?: string | null
  failedReason?: string | null
}

export type WalletDeviceTrustContract = {
  deviceId?: string | null
  expectedDeviceId?: string | null
  sameDevice?: boolean | null
  trustedDevice?: boolean | null
  newDevice?: boolean | null
  sessionId?: string | null
  ipCountry?: string | null
  geoVelocityRisk?: boolean | null
  emulatorRisk?: boolean | null
  rootedOrJailbrokenRisk?: boolean | null
}

export type WalletAiRiskCheckContract = {
  enabled: boolean
  provider?: "sabi_ai" | "ai_premium" | "internal_rules" | "admin_review" | string
  riskLevel: WalletSecurityRiskLevel
  score?: number | null
  sameUser?: boolean | null
  sameDevice?: boolean | null
  normalBehavior?: boolean | null
  suspiciousSignals: string[]
  adminReportRequired: boolean
  safeHoldRequired: boolean
  reason?: string | null
  raw?: Record<string, unknown> | null
}

export type WalletSensitiveOperationApprovalContract = {
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

export type WalletSecurityDecision = {
  allowed: boolean
  requiresUserConfirmation: boolean
  requiresAdminReview: boolean
  shouldCreateInternalReport: boolean
  shouldRestrictWallet: boolean
  walletStatus: WalletSecurityStatus
  riskLevel: WalletSecurityRiskLevel
  code: WalletSecurityDecisionCode
  neutralUserMessage: string
  internalReason: string
  blockedFields: string[]
  signals: string[]
  safeHoldScope: "operation" | "wallet" | "account" | "funds" | "none"
  adminReportCategory:
    | "none"
    | "pci_violation"
    | "tokenization_violation"
    | "biometric_failed"
    | "device_risk"
    | "user_mismatch"
    | "payer_name_mismatch"
    | "aml_risk"
    | "fraud_risk"
    | "merchant_or_bot_risk"
    | "ai_risk"
  createdAt: string
}

export type WalletSecurityHoldInstruction = {
  walletStatus: WalletSecurityStatus
  operationStatus: "cancelled" | "paused" | "held" | "blocked" | "allowed"
  fundsAction: "none" | "hold" | "restrict_movement"
  userVisibleMessage: string
  adminReviewRequired: boolean
  internalReportRequired: boolean
  internalReason: string
  decision: WalletSecurityDecision
}

export type WalletAiRiskProviderPort = {
  evaluateWalletOperationRisk(
    input: WalletSensitiveOperationApprovalContract,
  ): Promise<WalletAiRiskCheckContract> | WalletAiRiskCheckContract
}

const PCI_FORBIDDEN_KEY_PATTERNS = [
  "pan",
  "cardnumber",
  "card_number",
  "card-number",
  "fullcard",
  "full_card",
  "primaryaccountnumber",
  "primary_account_number",
  "number",
]

const CVV_FORBIDDEN_KEY_PATTERNS = [
  "cvv",
  "cvc",
  "cvv2",
  "cvc2",
  "securitycode",
  "security_code",
  "cardsecuritycode",
  "card_security_code",
]

const ALLOWED_MASKED_KEY_PATTERNS = [
  "masked",
  "mask",
  "last4",
  "last_four",
  "cardbrand",
  "card_brand",
  "cardtype",
  "card_type",
  "token",
  "tokenid",
  "token_id",
  "provider",
  "status",
  "expiry",
  "expirymonth",
  "expiryyear",
]

function nowIso() {
  return new Date().toISOString()
}

function normalizeKey(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function normalizeName(value: string | null | undefined) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function flattenPayloadKeys(
  value: unknown,
  prefix = "",
  result: Array<{ path: string; key: string; value: unknown }> = [],
) {
  if (!isObject(value)) return result

  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key
    result.push({ path, key, value: child })

    if (isObject(child)) {
      flattenPayloadKeys(child, path, result)
    }

    if (Array.isArray(child)) {
      child.forEach((item, index) => {
        if (isObject(item)) {
          flattenPayloadKeys(item, `${path}[${index}]`, result)
        }
      })
    }
  }

  return result
}

function luhnCheck(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

function hasRawCardNumberLikeValue(value: unknown) {
  const text = normalizeText(value)
  if (!text) return false

  if (text.includes("*") || text.toLowerCase().includes("masked")) {
    return false
  }

  const digits = text.replace(/\D/g, "")
  return luhnCheck(digits)
}

function hasCvvLikeValue(key: string, value: unknown) {
  const text = normalizeText(value)
  const normalizedKey = normalizeKey(key)

  if (!CVV_FORBIDDEN_KEY_PATTERNS.some((pattern) => normalizedKey.includes(pattern))) {
    return false
  }

  return /^\d{3,4}$/.test(text)
}

function isAllowedMaskedOrTokenKey(key: string) {
  const normalizedKey = normalizeKey(key)
  return ALLOWED_MASKED_KEY_PATTERNS.some((pattern) => normalizedKey.includes(normalizeKey(pattern)))
}

function detectForbiddenCardPayload(payload?: Record<string, unknown> | null) {
  const blockedFields: string[] = []
  const signals: string[] = []

  if (!payload) {
    return { blockedFields, signals }
  }

  const flat = flattenPayloadKeys(payload)

  for (const item of flat) {
    const normalizedKey = normalizeKey(item.key)

    const keyLooksLikePan =
      PCI_FORBIDDEN_KEY_PATTERNS.some((pattern) => normalizedKey.includes(normalizeKey(pattern))) &&
      !isAllowedMaskedOrTokenKey(item.key)

    const keyLooksLikeCvv = CVV_FORBIDDEN_KEY_PATTERNS.some((pattern) =>
      normalizedKey.includes(normalizeKey(pattern)),
    )

    if (keyLooksLikeCvv || hasCvvLikeValue(item.key, item.value)) {
      blockedFields.push(item.path)
      signals.push("cvv_detected")
      continue
    }

    if (keyLooksLikePan || hasRawCardNumberLikeValue(item.value)) {
      blockedFields.push(item.path)
      signals.push("raw_pan_detected")
    }
  }

  return {
    blockedFields: Array.from(new Set(blockedFields)),
    signals: Array.from(new Set(signals)),
  }
}

function highestRiskLevel(levels: WalletSecurityRiskLevel[]): WalletSecurityRiskLevel {
  if (levels.includes("critical")) return "critical"
  if (levels.includes("high")) return "high"
  if (levels.includes("medium")) return "medium"
  if (levels.includes("low")) return "low"
  return "none"
}

function neutralRestrictedMessage() {
  return "Wallet is temporarily restricted for security review."
}

function allowedDecision(): WalletSecurityDecision {
  return {
    allowed: true,
    requiresUserConfirmation: false,
    requiresAdminReview: false,
    shouldCreateInternalReport: false,
    shouldRestrictWallet: false,
    walletStatus: "active",
    riskLevel: "none",
    code: "wallet_security_allowed",
    neutralUserMessage: "Wallet operation can continue.",
    internalReason: "No wallet security violation detected.",
    blockedFields: [],
    signals: [],
    safeHoldScope: "none",
    adminReportCategory: "none",
    createdAt: nowIso(),
  }
}

function restrictedDecision(input: {
  code: WalletSecurityDecisionCode
  riskLevel: WalletSecurityRiskLevel
  internalReason: string
  blockedFields?: string[]
  signals?: string[]
  walletStatus?: WalletSecurityStatus
  safeHoldScope?: WalletSecurityDecision["safeHoldScope"]
  adminReportCategory?: WalletSecurityDecision["adminReportCategory"]
}): WalletSecurityDecision {
  return {
    allowed: false,
    requiresUserConfirmation: false,
    requiresAdminReview: true,
    shouldCreateInternalReport: true,
    shouldRestrictWallet: true,
    walletStatus: input.walletStatus ?? "safe_hold",
    riskLevel: input.riskLevel,
    code: input.code,
    neutralUserMessage: neutralRestrictedMessage(),
    internalReason: input.internalReason,
    blockedFields: input.blockedFields ?? [],
    signals: input.signals ?? [],
    safeHoldScope: input.safeHoldScope ?? "wallet",
    adminReportCategory: input.adminReportCategory ?? "ai_risk",
    createdAt: nowIso(),
  }
}

export class WalletAiRiskGuardService {
  constructor(private readonly aiRiskProvider?: WalletAiRiskProviderPort) {}

  sanitizeProviderToken(input: WalletCardTokenContract): WalletCardTokenContract {
    const forbidden = detectForbiddenCardPayload(input.rawProviderMetadata)

    if (forbidden.blockedFields.length > 0) {
      return {
        tokenId: input.tokenId,
        providerId: input.providerId,
        providerCustomerId: input.providerCustomerId ?? null,
        providerCardId: input.providerCardId ?? null,
        status: input.status,
        cardBrand: input.cardBrand ?? null,
        cardCategory: input.cardCategory ?? "unknown",
        maskedLabel: input.maskedLabel ?? null,
        last4: input.last4 ?? null,
        expiryMonth: input.expiryMonth ?? null,
        expiryYear: input.expiryYear ?? null,
        currency: input.currency ?? null,
        country: input.country ?? null,
        createdAt: input.createdAt ?? nowIso(),
        rawProviderMetadata: {
          sanitized: true,
          reason: "raw_card_data_removed",
          removedFields: forbidden.blockedFields,
        },
      }
    }

    return {
      ...input,
      rawProviderMetadata: input.rawProviderMetadata ?? null,
    }
  }

  evaluateCardToken(input: WalletCardTokenContract): WalletSecurityDecision {
    const forbidden = detectForbiddenCardPayload(input.rawProviderMetadata)

    if (!input.tokenId || !input.providerId) {
      return restrictedDecision({
        code: "wallet_security_provider_token_required",
        riskLevel: "critical",
        internalReason: "Provider tokenId/providerId is missing. Sabi must never store or operate on raw card data.",
        signals: ["provider_token_missing"],
        adminReportCategory: "tokenization_violation",
      })
    }

    if (input.status !== "success") {
      return restrictedDecision({
        code: "wallet_security_provider_success_required",
        riskLevel: "high",
        internalReason: "Provider token was not returned with success status.",
        signals: ["provider_token_status_not_success"],
        safeHoldScope: "operation",
        adminReportCategory: "tokenization_violation",
      })
    }

    if (forbidden.signals.includes("cvv_detected")) {
      return restrictedDecision({
        code: "wallet_security_cvv_detected",
        riskLevel: "critical",
        internalReason: "CVV-like field/value detected in provider metadata.",
        blockedFields: forbidden.blockedFields,
        signals: forbidden.signals,
        adminReportCategory: "pci_violation",
      })
    }

    if (forbidden.signals.includes("raw_pan_detected")) {
      return restrictedDecision({
        code: "wallet_security_raw_pan_detected",
        riskLevel: "critical",
        internalReason: "PAN-like raw card number detected in provider metadata.",
        blockedFields: forbidden.blockedFields,
        signals: forbidden.signals,
        adminReportCategory: "pci_violation",
      })
    }

    return allowedDecision()
  }

  async evaluateSensitiveOperation(
    input: WalletSensitiveOperationApprovalContract,
  ): Promise<WalletSecurityDecision> {
    const localDecision = this.evaluateLocalRules(input)

    if (localDecision.shouldRestrictWallet) {
      return localDecision
    }

    if (!this.aiRiskProvider) {
      return localDecision
    }

    const aiRisk = await this.aiRiskProvider.evaluateWalletOperationRisk(input)
    const riskLevels = [localDecision.riskLevel, aiRisk.riskLevel]
    const riskLevel = highestRiskLevel(riskLevels)

    if (
      aiRisk.safeHoldRequired ||
      aiRisk.riskLevel === "critical" ||
      aiRisk.riskLevel === "high" ||
      aiRisk.sameUser === false ||
      aiRisk.sameDevice === false ||
      aiRisk.normalBehavior === false
    ) {
      return restrictedDecision({
        code: "wallet_security_ai_risk_provider_restricted",
        riskLevel,
        internalReason: aiRisk.reason ?? "AI wallet risk provider requested safe hold/restriction.",
        signals: aiRisk.suspiciousSignals,
        safeHoldScope: aiRisk.safeHoldRequired ? "wallet" : "operation",
        adminReportCategory: "ai_risk",
      })
    }

    if (aiRisk.adminReportRequired) {
      return {
        ...localDecision,
        requiresAdminReview: true,
        shouldCreateInternalReport: true,
        riskLevel,
        signals: Array.from(new Set([...localDecision.signals, ...aiRisk.suspiciousSignals])),
        adminReportCategory: "ai_risk",
        internalReason: aiRisk.reason ?? localDecision.internalReason,
      }
    }

    return localDecision
  }

  evaluateLocalRules(input: WalletSensitiveOperationApprovalContract): WalletSecurityDecision {
    const rawPayloadRisk = detectForbiddenCardPayload(input.rawPayload)
    const metadataRisk = detectForbiddenCardPayload(input.metadata)

    const blockedFields = Array.from(
      new Set([...rawPayloadRisk.blockedFields, ...metadataRisk.blockedFields]),
    )

    const signals = Array.from(new Set([...rawPayloadRisk.signals, ...metadataRisk.signals]))

    if (signals.includes("cvv_detected")) {
      return restrictedDecision({
        code: "wallet_security_cvv_detected",
        riskLevel: "critical",
        internalReason: "CVV detected in wallet operation payload/metadata.",
        blockedFields,
        signals,
        adminReportCategory: "pci_violation",
      })
    }

    if (signals.includes("raw_pan_detected")) {
      return restrictedDecision({
        code: "wallet_security_raw_pan_detected",
        riskLevel: "critical",
        internalReason: "PAN/raw card number detected in wallet operation payload/metadata.",
        blockedFields,
        signals,
        adminReportCategory: "pci_violation",
      })
    }

    if (
      (input.operationKind === "card_bind" || input.operationKind === "card_tokenize") &&
      (!input.providerTokenId || !input.providerId)
    ) {
      return restrictedDecision({
        code: "wallet_security_provider_token_required",
        riskLevel: "critical",
        internalReason: "Card binding/tokenization operation does not contain provider token/providerId.",
        signals: ["provider_token_missing"],
        adminReportCategory: "tokenization_violation",
      })
    }

    if (
      (input.operationKind === "card_bind" || input.operationKind === "card_tokenize") &&
      input.providerStatus !== "success"
    ) {
      return restrictedDecision({
        code: "wallet_security_provider_success_required",
        riskLevel: "high",
        internalReason: "Card tokenization provider status is not success.",
        signals: ["provider_status_not_success"],
        safeHoldScope: "operation",
        adminReportCategory: "tokenization_violation",
      })
    }

    if (input.biometric?.required && !input.biometric.passed) {
      return restrictedDecision({
        code: "wallet_security_biometric_failed",
        riskLevel: "high",
        internalReason: input.biometric.failedReason ?? "Required biometric confirmation failed.",
        signals: ["biometric_failed"],
        safeHoldScope: "operation",
        adminReportCategory: "biometric_failed",
      })
    }

    if (input.deviceTrust?.sameDevice === false || input.deviceTrust?.trustedDevice === false) {
      return restrictedDecision({
        code: "wallet_security_device_mismatch",
        riskLevel: "high",
        internalReason: "Device trust check failed for sensitive wallet operation.",
        signals: ["device_mismatch"],
        safeHoldScope: "wallet",
        adminReportCategory: "device_risk",
      })
    }

    if (
      input.deviceTrust?.newDevice ||
      input.deviceTrust?.geoVelocityRisk ||
      input.deviceTrust?.emulatorRisk ||
      input.deviceTrust?.rootedOrJailbrokenRisk
    ) {
      return restrictedDecision({
        code: "wallet_security_device_mismatch",
        riskLevel: "high",
        internalReason: "Suspicious device/session signal detected.",
        signals: [
          input.deviceTrust.newDevice ? "new_device" : "",
          input.deviceTrust.geoVelocityRisk ? "geo_velocity_risk" : "",
          input.deviceTrust.emulatorRisk ? "emulator_risk" : "",
          input.deviceTrust.rootedOrJailbrokenRisk ? "root_or_jailbreak_risk" : "",
        ].filter(Boolean),
        safeHoldScope: "wallet",
        adminReportCategory: "device_risk",
      })
    }

    if (input.unifiedUserId && input.userId !== input.unifiedUserId) {
      return restrictedDecision({
        code: "wallet_security_user_mismatch",
        riskLevel: "critical",
        internalReason: "Unified userId mismatch in wallet operation.",
        signals: ["unified_user_id_mismatch"],
        adminReportCategory: "user_mismatch",
      })
    }

    const payerName = normalizeName(input.payerName)
    const holderName = normalizeName(input.accountHolderName)

    if (input.operationKind === "top_up" && payerName && holderName && payerName !== holderName) {
      return restrictedDecision({
        code: "wallet_security_payer_name_mismatch",
        riskLevel: "high",
        internalReason: "Top-up payer name does not match account holder name.",
        signals: ["payer_name_mismatch"],
        adminReportCategory: "payer_name_mismatch",
      })
    }

    if (input.aiRisk?.safeHoldRequired || input.aiRisk?.riskLevel === "critical" || input.aiRisk?.riskLevel === "high") {
      return restrictedDecision({
        code: "wallet_security_ai_risk_provider_restricted",
        riskLevel: input.aiRisk.riskLevel,
        internalReason: input.aiRisk.reason ?? "AI risk check requested wallet restriction/safe hold.",
        signals: input.aiRisk.suspiciousSignals,
        adminReportCategory: "ai_risk",
      })
    }

    if (input.aiRisk?.sameUser === false) {
      return restrictedDecision({
        code: "wallet_security_user_mismatch",
        riskLevel: "critical",
        internalReason: "AI risk check reported that this may not be the same user.",
        signals: ["ai_same_user_failed", ...input.aiRisk.suspiciousSignals],
        adminReportCategory: "user_mismatch",
      })
    }

    if (input.aiRisk?.sameDevice === false || input.aiRisk?.normalBehavior === false) {
      return restrictedDecision({
        code: "wallet_security_device_mismatch",
        riskLevel: "high",
        internalReason: "AI risk check reported device or behavior mismatch.",
        signals: ["ai_device_or_behavior_mismatch", ...input.aiRisk.suspiciousSignals],
        adminReportCategory: "device_risk",
      })
    }

    if (input.aiRisk?.adminReportRequired) {
      return {
        ...allowedDecision(),
        requiresAdminReview: true,
        shouldCreateInternalReport: true,
        riskLevel: input.aiRisk.riskLevel,
        signals: input.aiRisk.suspiciousSignals,
        internalReason: input.aiRisk.reason ?? "AI risk check requested admin report.",
        adminReportCategory: "ai_risk",
      }
    }

    return allowedDecision()
  }

  buildHoldInstruction(decision: WalletSecurityDecision): WalletSecurityHoldInstruction {
    if (decision.allowed && !decision.shouldRestrictWallet) {
      return {
        walletStatus: "active",
        operationStatus: "allowed",
        fundsAction: "none",
        userVisibleMessage: "Wallet operation can continue.",
        adminReviewRequired: false,
        internalReportRequired: false,
        internalReason: decision.internalReason,
        decision,
      }
    }

    return {
      walletStatus: decision.walletStatus,
      operationStatus:
        decision.walletStatus === "blocked"
          ? "blocked"
          : decision.safeHoldScope === "operation"
            ? "paused"
            : "held",
      fundsAction:
        decision.safeHoldScope === "funds" || decision.safeHoldScope === "wallet" || decision.safeHoldScope === "account"
          ? "hold"
          : "restrict_movement",
      userVisibleMessage: decision.neutralUserMessage,
      adminReviewRequired: decision.requiresAdminReview,
      internalReportRequired: decision.shouldCreateInternalReport,
      internalReason: decision.internalReason,
      decision,
    }
  }

  assertAllowed(decision: WalletSecurityDecision) {
    if (decision.allowed && !decision.shouldRestrictWallet) return

    const error = new Error(decision.code)
    ;(error as Error & { walletSecurityDecision?: WalletSecurityDecision }).walletSecurityDecision = decision
    throw error
  }
}

export const walletAiRiskGuard = new WalletAiRiskGuardService()
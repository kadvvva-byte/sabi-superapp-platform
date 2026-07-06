import {
  STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS,
  type StreamFoundationAdminMonetizationApiOperation,
  type StreamFoundationAdminMonetizationApiProviderConfigInput,
  type StreamFoundationAdminMonetizationApiRequest,
  type StreamFoundationAdminMonetizationApiResponse,
  type StreamFoundationAdminMonetizationApiSafeConfigSnapshot,
} from "./streamFoundationAdminSecureMonetizationApiContracts";
import {
  createStreamFoundationAdminMonetizationConfigDraft,
  type StreamFoundationAdminMonetizationConfigInput,
} from "./streamFoundationAdminMonetizationConfigContracts";
import { validateStreamFoundationAdminMonetizationConfig } from "./streamFoundationAdminMonetizationConfigValidator";

const WRITE_OPERATIONS: readonly StreamFoundationAdminMonetizationApiOperation[] = [
  "save_accept_payment_provider_ref",
  "save_monetization_payout_provider_ref",
  "save_wallet_coin_ledger_provider_ref",
  "save_platform_settlement_provider_ref",
  "save_compliance_risk_provider_ref",
  "save_monthly_payout_policy",
  "disable_provider_config",
  "rotate_provider_secret_ref",
];

const SECRET_OPERATIONS: readonly StreamFoundationAdminMonetizationApiOperation[] = [
  "save_accept_payment_provider_ref",
  "save_monetization_payout_provider_ref",
  "save_wallet_coin_ledger_provider_ref",
  "save_platform_settlement_provider_ref",
  "save_compliance_risk_provider_ref",
  "rotate_provider_secret_ref",
];

function hasPermission(request: StreamFoundationAdminMonetizationApiRequest, permission: string): boolean {
  return request.actor.permissions.includes(permission);
}

function nonEmpty(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function providerInputToDraftInput(provider: StreamFoundationAdminMonetizationApiProviderConfigInput): StreamFoundationAdminMonetizationConfigInput {
  const base = {
    [`${provider.target}Configured`]: provider.configured,
    [`${provider.target}Enabled`]: provider.enabled,
    [`${provider.target}LiveTestPassed`]: provider.liveTestPassed,
    [`${provider.target}Environment`]: provider.environment,
    [`${provider.target}KeyRef`]: provider.secretRef.providerKeyRef,
  } as Record<string, unknown>;

  return {
    acceptPaymentProviderConfigured: base.accept_payment_providerConfigured as boolean | undefined,
    acceptPaymentProviderEnabled: base.accept_payment_providerEnabled as boolean | undefined,
    acceptPaymentProviderLiveTestPassed: base.accept_payment_providerLiveTestPassed as boolean | undefined,
    acceptPaymentProviderEnvironment: base.accept_payment_providerEnvironment as StreamFoundationAdminMonetizationConfigInput["acceptPaymentProviderEnvironment"],
    acceptPaymentProviderKeyRef: base.accept_payment_providerKeyRef as string | undefined,
    monetizationPayoutProviderConfigured: base.monetization_payout_providerConfigured as boolean | undefined,
    monetizationPayoutProviderEnabled: base.monetization_payout_providerEnabled as boolean | undefined,
    monetizationPayoutProviderLiveTestPassed: base.monetization_payout_providerLiveTestPassed as boolean | undefined,
    monetizationPayoutProviderEnvironment: base.monetization_payout_providerEnvironment as StreamFoundationAdminMonetizationConfigInput["monetizationPayoutProviderEnvironment"],
    monetizationPayoutProviderKeyRef: base.monetization_payout_providerKeyRef as string | undefined,
    walletCoinLedgerProviderConfigured: base.wallet_coin_ledger_providerConfigured as boolean | undefined,
    walletCoinLedgerProviderEnabled: base.wallet_coin_ledger_providerEnabled as boolean | undefined,
    walletCoinLedgerProviderLiveTestPassed: base.wallet_coin_ledger_providerLiveTestPassed as boolean | undefined,
    walletCoinLedgerProviderEnvironment: base.wallet_coin_ledger_providerEnvironment as StreamFoundationAdminMonetizationConfigInput["walletCoinLedgerProviderEnvironment"],
    walletCoinLedgerProviderKeyRef: base.wallet_coin_ledger_providerKeyRef as string | undefined,
    platformSettlementProviderConfigured: base.platform_settlement_providerConfigured as boolean | undefined,
    platformSettlementProviderEnabled: base.platform_settlement_providerEnabled as boolean | undefined,
    platformSettlementProviderLiveTestPassed: base.platform_settlement_providerLiveTestPassed as boolean | undefined,
    platformSettlementProviderEnvironment: base.platform_settlement_providerEnvironment as StreamFoundationAdminMonetizationConfigInput["platformSettlementProviderEnvironment"],
    platformSettlementProviderKeyRef: base.platform_settlement_providerKeyRef as string | undefined,
    complianceRiskProviderConfigured: base.compliance_risk_providerConfigured as boolean | undefined,
    complianceRiskProviderEnabled: base.compliance_risk_providerEnabled as boolean | undefined,
    complianceRiskProviderLiveTestPassed: base.compliance_risk_providerLiveTestPassed as boolean | undefined,
    complianceRiskProviderEnvironment: base.compliance_risk_providerEnvironment as StreamFoundationAdminMonetizationConfigInput["complianceRiskProviderEnvironment"],
    complianceRiskProviderKeyRef: base.compliance_risk_providerKeyRef as string | undefined,
  };
}

function mergeRequestConfigInput(request: StreamFoundationAdminMonetizationApiRequest): StreamFoundationAdminMonetizationConfigInput {
  const providerInput = request.providerConfig ? providerInputToDraftInput(request.providerConfig) : {};
  const policyInput = request.policy
    ? {
        platformFeeBps: request.policy.platformFeeBps,
        monthlyPayoutDayOfMonth: request.policy.monthlyPayoutDayOfMonth,
        minPayoutCoinAmount: request.policy.minPayoutCoinAmount,
        complianceHoldDays: request.policy.complianceHoldDays,
        supportedGiftPaymentRails: request.policy.supportedGiftPaymentRails,
      }
    : {};
  return {
    ...(request.draftConfig ?? {}),
    ...providerInput,
    ...policyInput,
  };
}

function toSafeSnapshot(input: StreamFoundationAdminMonetizationConfigInput): StreamFoundationAdminMonetizationApiSafeConfigSnapshot {
  const config = createStreamFoundationAdminMonetizationConfigDraft(input);
  return {
    stage: STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE,
    acceptPaymentProviderConfigured: config.acceptPaymentProvider.configured,
    monetizationPayoutProviderConfigured: config.monetizationPayoutProvider.configured,
    walletCoinLedgerProviderConfigured: config.walletCoinLedgerProvider.configured,
    platformSettlementProviderConfigured: config.platformSettlementProvider.configured,
    complianceRiskProviderConfigured: config.complianceRiskProvider.configured,
    acceptPaymentProviderKeyRef: config.acceptPaymentProvider.providerKeyRef,
    monetizationPayoutProviderKeyRef: config.monetizationPayoutProvider.providerKeyRef,
    walletCoinLedgerProviderKeyRef: config.walletCoinLedgerProvider.providerKeyRef,
    platformSettlementProviderKeyRef: config.platformSettlementProvider.providerKeyRef,
    complianceRiskProviderKeyRef: config.complianceRiskProvider.providerKeyRef,
    platformFeeBps: config.policy.platformFeeBps,
    monthlyPayoutDayOfMonth: config.policy.monthlyPayoutDayOfMonth,
    minPayoutCoinAmount: config.policy.minPayoutCoinAmount,
    complianceHoldDays: config.policy.complianceHoldDays,
    payoutOncePerMonth: true,
    providerKeysServerSideOnly: true,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
  };
}

function baseResponse(
  request: StreamFoundationAdminMonetizationApiRequest,
  ok: boolean,
  decisionCode: StreamFoundationAdminMonetizationApiResponse["decisionCode"],
  safeMessageKey: string,
  input: StreamFoundationAdminMonetizationConfigInput = {},
): StreamFoundationAdminMonetizationApiResponse {
  const validation = validateStreamFoundationAdminMonetizationConfig(createStreamFoundationAdminMonetizationConfigDraft(input));
  return {
    stage: STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE,
    ok,
    decisionCode,
    safeMessageKey,
    operation: request.operation,
    safeConfigSnapshot: toSafeSnapshot(input),
    validationBlockedGates: validation.blockedGates,
    validationReviewRequiredGates: validation.reviewRequiredGates,
    auditRequired: true,
    idempotencyRequired: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}

function hasForbiddenRawSecret(providerConfig: StreamFoundationAdminMonetizationApiProviderConfigInput | undefined): boolean {
  if (!providerConfig) return false;
  return "rawSecretValue" in providerConfig.secretRef;
}

function validateProviderRequest(providerConfig: StreamFoundationAdminMonetizationApiProviderConfigInput | undefined): boolean {
  if (!providerConfig) return false;
  return (
    providerConfig.secretRef.serverSideOnly === true &&
    providerConfig.secretRef.returnRawSecret === false &&
    providerConfig.secretRef.mobileSecretAllowed === false &&
    nonEmpty(providerConfig.secretRef.providerKeyRef) &&
    nonEmpty(providerConfig.secretRef.serverSideSecretVaultRef)
  );
}

function validatePolicyRequest(request: StreamFoundationAdminMonetizationApiRequest): boolean {
  if (request.operation !== "save_monthly_payout_policy") return true;
  const policy = request.policy;
  if (!policy) return false;
  return (
    policy.payoutOncePerMonth === true &&
    policy.immediatePayoutAllowed === false &&
    Number.isFinite(policy.platformFeeBps) &&
    policy.platformFeeBps >= 0 &&
    policy.platformFeeBps <= 10000 &&
    Number.isFinite(policy.monthlyPayoutDayOfMonth) &&
    policy.monthlyPayoutDayOfMonth >= 1 &&
    policy.monthlyPayoutDayOfMonth <= 28 &&
    Number.isFinite(policy.minPayoutCoinAmount) &&
    policy.minPayoutCoinAmount >= 0 &&
    Number.isFinite(policy.complianceHoldDays) &&
    policy.complianceHoldDays >= 0
  );
}

export function previewStreamFoundationAdminSecureMonetizationApiRequest(
  request: StreamFoundationAdminMonetizationApiRequest,
): StreamFoundationAdminMonetizationApiResponse {
  const input = mergeRequestConfigInput(request);
  const requiresWrite = WRITE_OPERATIONS.includes(request.operation);
  const requiresSecretPermission = SECRET_OPERATIONS.includes(request.operation);
  const requiresLiveTestPermission = request.operation === "request_provider_live_test_gate";

  if (!nonEmpty(request.requestId) || !nonEmpty(request.idempotencyKey) || !nonEmpty(request.actor.adminUserId)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_invalid_request", "stream.admin.monetization.api.invalid_request", input);
  }

  if (!hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_permission_required", "stream.admin.monetization.api.read_permission_required", input);
  }

  if (requiresWrite && !hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_permission_required", "stream.admin.monetization.api.write_permission_required", input);
  }

  if (requiresSecretPermission && !hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_permission_required", "stream.admin.monetization.api.secret_permission_required", input);
  }

  if (requiresLiveTestPermission && !hasPermission(request, STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.liveTest)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_permission_required", "stream.admin.monetization.api.live_test_permission_required", input);
  }

  if (hasForbiddenRawSecret(request.providerConfig)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_raw_secret_forbidden", "stream.admin.monetization.api.raw_secret_forbidden", input);
  }

  if (SECRET_OPERATIONS.includes(request.operation) && !validateProviderRequest(request.providerConfig)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_provider_target_required", "stream.admin.monetization.api.provider_target_required", input);
  }

  if (!validatePolicyRequest(request)) {
    return baseResponse(request, false, "admin_monetization_api_blocked_policy_invalid", "stream.admin.monetization.api.policy_invalid", input);
  }

  if (requiresWrite || requiresLiveTestPermission) {
    return baseResponse(request, false, "admin_monetization_api_blocked_route_mount_required", "stream.admin.monetization.api.route_mount_required", input);
  }

  return baseResponse(request, true, "admin_monetization_api_preview_ready", "stream.admin.monetization.api.preview_ready", input);
}

export function getStreamFoundationAdminSecureMonetizationApiSafePreview(): StreamFoundationAdminMonetizationApiResponse {
  return previewStreamFoundationAdminSecureMonetizationApiRequest({
    requestId: "stream-admin-monetization-api-preview",
    idempotencyKey: "stream-admin-monetization-api-preview-key",
    operation: "read_redacted_config_snapshot",
    actor: {
      adminUserId: "admin-preview",
      role: "owner",
      permissions: [
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets,
        STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.liveTest,
      ],
    },
    draftConfig: {
      acceptPaymentProviderConfigured: true,
      acceptPaymentProviderEnabled: true,
      acceptPaymentProviderLiveTestPassed: true,
      acceptPaymentProviderKeyRef: "admin.stream.payment.accept.provider.secret_ref",
      monetizationPayoutProviderConfigured: true,
      monetizationPayoutProviderEnabled: true,
      monetizationPayoutProviderLiveTestPassed: true,
      monetizationPayoutProviderKeyRef: "admin.stream.monetization.payout.provider.secret_ref",
      walletCoinLedgerProviderConfigured: true,
      walletCoinLedgerProviderEnabled: true,
      walletCoinLedgerProviderLiveTestPassed: true,
      walletCoinLedgerProviderKeyRef: "admin.wallet.coin.ledger.provider.secret_ref",
      platformFeeBps: 2000,
      monthlyPayoutDayOfMonth: 1,
      minPayoutCoinAmount: 100,
      complianceHoldDays: 7,
    },
  });
}

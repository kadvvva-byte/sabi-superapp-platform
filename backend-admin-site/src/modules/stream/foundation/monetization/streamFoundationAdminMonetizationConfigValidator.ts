import type {
  StreamFoundationAdminMonetizationConfigDraft,
  StreamFoundationAdminProviderConfigDraft,
} from "./streamFoundationAdminMonetizationConfigContracts";
import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG,
} from "./streamFoundationAdminMonetizationConfigContracts";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_VALIDATOR_STAGE = "BACKEND_STREAM_FOUNDATION_136R_ADMIN_CONFIG_VALIDATOR_STAGING" as const;

export type StreamFoundationAdminMonetizationConfigGateSeverity = "passed" | "blocked" | "review_required";

export type StreamFoundationAdminMonetizationConfigGateCode =
  | "accept_payment_provider_configured"
  | "accept_payment_provider_enabled"
  | "accept_payment_provider_live_tested"
  | "monetization_payout_provider_configured"
  | "monetization_payout_provider_enabled"
  | "monetization_payout_provider_live_tested"
  | "wallet_coin_ledger_provider_configured"
  | "wallet_coin_ledger_provider_enabled"
  | "wallet_coin_ledger_live_tested"
  | "accept_and_payout_config_separated"
  | "platform_fee_configured"
  | "monthly_payout_policy_configured"
  | "creator_compliance_policy_required"
  | "provider_keys_server_side_only"
  | "secret_values_not_returned"
  | "mobile_provider_keys_blocked"
  | "fake_payment_gift_payout_blocked"
  | "execution_blocked_until_route_mount_approval";

export type StreamFoundationAdminMonetizationConfigGate = Readonly<{
  code: StreamFoundationAdminMonetizationConfigGateCode;
  severity: StreamFoundationAdminMonetizationConfigGateSeverity;
  passed: boolean;
  safeMessageKey: string;
  adminActionRequired: boolean;
  blocksGiftExecutionNow: boolean;
}>;

export type StreamFoundationAdminMonetizationConfigValidation = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_VALIDATOR_STAGE;
  gates: readonly StreamFoundationAdminMonetizationConfigGate[];
  passedGates: number;
  blockedGates: number;
  reviewRequiredGates: number;
  readyForGiftPaymentExecutionAfterRouteMountApproval: boolean;
  readyForMonthlyPayoutExecutionAfterRouteMountApproval: boolean;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  secretValuesReturned: false;
  mobileReceivesProviderKeys: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

function gate(
  code: StreamFoundationAdminMonetizationConfigGateCode,
  passed: boolean,
  safeMessageKey: string,
  adminActionRequired = !passed,
  blocksGiftExecutionNow = !passed,
): StreamFoundationAdminMonetizationConfigGate {
  return {
    code,
    severity: passed ? "passed" : "blocked",
    passed,
    safeMessageKey,
    adminActionRequired,
    blocksGiftExecutionNow,
  };
}

function providerConfiguredGates(
  provider: StreamFoundationAdminProviderConfigDraft,
  configuredCode: StreamFoundationAdminMonetizationConfigGateCode,
  enabledCode: StreamFoundationAdminMonetizationConfigGateCode,
  liveTestCode: StreamFoundationAdminMonetizationConfigGateCode,
): readonly StreamFoundationAdminMonetizationConfigGate[] {
  return [
    gate(configuredCode, provider.configured, `stream.admin.monetization.${configuredCode}`),
    gate(enabledCode, provider.enabled, `stream.admin.monetization.${enabledCode}`),
    gate(liveTestCode, provider.liveTestPassed, `stream.admin.monetization.${liveTestCode}`),
  ];
}

export function validateStreamFoundationAdminMonetizationConfig(
  config: StreamFoundationAdminMonetizationConfigDraft,
): StreamFoundationAdminMonetizationConfigValidation {
  const separatedProviderRefs = config.acceptPaymentProvider.providerKeyRef !== config.monetizationPayoutProvider.providerKeyRef;
  const gates: StreamFoundationAdminMonetizationConfigGate[] = [
    ...providerConfiguredGates(
      config.acceptPaymentProvider,
      "accept_payment_provider_configured",
      "accept_payment_provider_enabled",
      "accept_payment_provider_live_tested",
    ),
    ...providerConfiguredGates(
      config.monetizationPayoutProvider,
      "monetization_payout_provider_configured",
      "monetization_payout_provider_enabled",
      "monetization_payout_provider_live_tested",
    ),
    ...providerConfiguredGates(
      config.walletCoinLedgerProvider,
      "wallet_coin_ledger_provider_configured",
      "wallet_coin_ledger_provider_enabled",
      "wallet_coin_ledger_live_tested",
    ),
    gate(
      "accept_and_payout_config_separated",
      separatedProviderRefs && config.separateAcceptPaymentAndPayoutConfig,
      "stream.admin.monetization.accept_and_payout_config_separated",
    ),
    gate(
      "platform_fee_configured",
      config.policy.platformFeeConfigured,
      "stream.admin.monetization.platform_fee_configured",
    ),
    gate(
      "monthly_payout_policy_configured",
      config.policy.payoutOncePerMonth && config.policy.monthlyPayoutDayOfMonth >= 1 && config.policy.monthlyPayoutDayOfMonth <= 28,
      "stream.admin.monetization.monthly_payout_policy_configured",
    ),
    gate(
      "creator_compliance_policy_required",
      config.policy.creatorKycRequired && config.policy.creatorMonetizationApprovalRequired,
      "stream.admin.monetization.creator_compliance_policy_required",
      false,
      false,
    ),
    gate(
      "provider_keys_server_side_only",
      config.providerKeysServerSideOnly,
      "stream.admin.monetization.provider_keys_server_side_only",
      false,
      false,
    ),
    gate(
      "secret_values_not_returned",
      config.secretValuesReturned === false,
      "stream.admin.monetization.secret_values_not_returned",
      false,
      false,
    ),
    gate(
      "mobile_provider_keys_blocked",
      config.mobileReceivesProviderKeys === false,
      "stream.admin.monetization.mobile_provider_keys_blocked",
      false,
      false,
    ),
    gate(
      "fake_payment_gift_payout_blocked",
      !config.fakePaymentSuccessAllowed && !config.fakeGiftSuccessAllowed && !config.fakePayoutSuccessAllowed,
      "stream.admin.monetization.fake_payment_gift_payout_blocked",
      false,
      false,
    ),
    {
      code: "execution_blocked_until_route_mount_approval",
      severity: "review_required",
      passed: false,
      safeMessageKey: "stream.admin.monetization.execution_blocked_until_route_mount_approval",
      adminActionRequired: true,
      blocksGiftExecutionNow: true,
    },
  ];

  const passedGates = gates.filter((item) => item.passed).length;
  const blockedGates = gates.filter((item) => item.severity === "blocked").length;
  const reviewRequiredGates = gates.filter((item) => item.severity === "review_required").length;
  const providerGatesReady = gates
    .filter((item) => item.code !== "execution_blocked_until_route_mount_approval")
    .every((item) => item.passed || item.blocksGiftExecutionNow === false);

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_VALIDATOR_STAGE,
    gates,
    passedGates,
    blockedGates,
    reviewRequiredGates,
    readyForGiftPaymentExecutionAfterRouteMountApproval: providerGatesReady,
    readyForMonthlyPayoutExecutionAfterRouteMountApproval: providerGatesReady,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    secretValuesReturned: false,
    mobileReceivesProviderKeys: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}

export function getStreamFoundationAdminMonetizationSafeDisabledValidation(): StreamFoundationAdminMonetizationConfigValidation {
  return validateStreamFoundationAdminMonetizationConfig(STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG);
}

export function getStreamFoundationAdminMonetizationReadyProviderReviewValidation(): StreamFoundationAdminMonetizationConfigValidation {
  return validateStreamFoundationAdminMonetizationConfig(STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG);
}

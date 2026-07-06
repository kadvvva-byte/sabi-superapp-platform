import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type { StreamFoundationPaymentRail, StreamFoundationPaymentProviderPurpose } from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE = "BACKEND_STREAM_FOUNDATION_136R_ADMIN_MONETIZATION_CONFIG_STAGING" as const;

export type StreamFoundationAdminMonetizationConfigStage = typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE;

export type StreamFoundationAdminPaymentProviderConfigKind =
  | "accept_payment_provider"
  | "monetization_payout_provider"
  | "wallet_coin_ledger_provider"
  | "platform_settlement_provider"
  | "compliance_risk_provider";

export type StreamFoundationAdminProviderEnvironment = "sandbox" | "production" | "disabled";

export type StreamFoundationAdminProviderReadiness =
  | "safe_disabled"
  | "configured_not_enabled"
  | "enabled_live_test_required"
  | "ready_after_route_mount_approval";

export type StreamFoundationAdminProviderConfigDraft = Readonly<{
  configKey: string;
  kind: StreamFoundationAdminPaymentProviderConfigKind;
  purpose: StreamFoundationPaymentProviderPurpose;
  providerKeyRef: string;
  environment: StreamFoundationAdminProviderEnvironment;
  configured: boolean;
  enabled: boolean;
  liveTestPassed: boolean;
  readiness: StreamFoundationAdminProviderReadiness;
  serverSideOnly: true;
  adminSecureSecretFormAllowed: true;
  rawSecretValueAcceptedByContract: false;
  rawSecretValueReturnedToAdmin: false;
  rawSecretValueReturnedToMobile: false;
  mobileSecretAllowed: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationAdminMonetizationPolicyDraft = Readonly<{
  platformFeeBps: number;
  platformFeeConfigured: boolean;
  monthlyPayoutDayOfMonth: number;
  payoutOncePerMonth: true;
  minPayoutCoinAmount: number;
  complianceHoldDays: number;
  creatorKycRequired: true;
  creatorMonetizationApprovalRequired: true;
  receiverEarningsLedgerRequired: true;
  senderChargeLedgerRequired: true;
  supportedGiftPaymentRails: readonly StreamFoundationPaymentRail[];
  immediatePayoutAllowed: false;
  payoutBeforeMonthlyCycleAllowed: false;
  fakeEarningCreditAllowed: false;
}>;

export type StreamFoundationAdminMonetizationConfigDraft = Readonly<{
  stage: StreamFoundationAdminMonetizationConfigStage;
  acceptPaymentProvider: StreamFoundationAdminProviderConfigDraft;
  monetizationPayoutProvider: StreamFoundationAdminProviderConfigDraft;
  walletCoinLedgerProvider: StreamFoundationAdminProviderConfigDraft;
  platformSettlementProvider: StreamFoundationAdminProviderConfigDraft;
  complianceRiskProvider: StreamFoundationAdminProviderConfigDraft;
  policy: StreamFoundationAdminMonetizationPolicyDraft;
  separateAcceptPaymentAndPayoutConfig: true;
  providerKeysServerSideOnly: true;
  secretValuesReturned: false;
  mobileReceivesProviderKeys: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export type StreamFoundationAdminMonetizationConfigInput = Partial<Readonly<{
  acceptPaymentProviderConfigured: boolean;
  acceptPaymentProviderEnabled: boolean;
  acceptPaymentProviderLiveTestPassed: boolean;
  acceptPaymentProviderEnvironment: StreamFoundationAdminProviderEnvironment;
  acceptPaymentProviderKeyRef: string;
  monetizationPayoutProviderConfigured: boolean;
  monetizationPayoutProviderEnabled: boolean;
  monetizationPayoutProviderLiveTestPassed: boolean;
  monetizationPayoutProviderEnvironment: StreamFoundationAdminProviderEnvironment;
  monetizationPayoutProviderKeyRef: string;
  walletCoinLedgerProviderConfigured: boolean;
  walletCoinLedgerProviderEnabled: boolean;
  walletCoinLedgerProviderLiveTestPassed: boolean;
  walletCoinLedgerProviderEnvironment: StreamFoundationAdminProviderEnvironment;
  walletCoinLedgerProviderKeyRef: string;
  platformSettlementProviderConfigured: boolean;
  platformSettlementProviderEnabled: boolean;
  platformSettlementProviderLiveTestPassed: boolean;
  platformSettlementProviderEnvironment: StreamFoundationAdminProviderEnvironment;
  platformSettlementProviderKeyRef: string;
  complianceRiskProviderConfigured: boolean;
  complianceRiskProviderEnabled: boolean;
  complianceRiskProviderLiveTestPassed: boolean;
  complianceRiskProviderEnvironment: StreamFoundationAdminProviderEnvironment;
  complianceRiskProviderKeyRef: string;
  platformFeeBps: number;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  complianceHoldDays: number;
  supportedGiftPaymentRails: readonly StreamFoundationPaymentRail[];
}>>;

const DEFAULT_GIFT_PAYMENT_RAILS: readonly StreamFoundationPaymentRail[] = [
  "sabi_coin_wallet",
  "external_card_acquirer",
  "alipay_plus_provider",
  "bank_provider",
];

function normalizeKeyRef(value: string | undefined, fallback: string): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length > 0 ? trimmed : fallback;
}

function clampBps(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(10000, Math.floor(value)));
}

function clampDay(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(28, Math.floor(value)));
}

function clampNonNegative(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function resolveProviderReadiness(configured: boolean, enabled: boolean, liveTestPassed: boolean): StreamFoundationAdminProviderReadiness {
  if (!configured) return "safe_disabled";
  if (!enabled) return "configured_not_enabled";
  if (!liveTestPassed) return "enabled_live_test_required";
  return "ready_after_route_mount_approval";
}

function createProviderConfigDraft(args: Readonly<{
  configKey: string;
  kind: StreamFoundationAdminPaymentProviderConfigKind;
  purpose: StreamFoundationPaymentProviderPurpose;
  providerKeyRef: string;
  environment: StreamFoundationAdminProviderEnvironment | undefined;
  configured: boolean | undefined;
  enabled: boolean | undefined;
  liveTestPassed: boolean | undefined;
}>): StreamFoundationAdminProviderConfigDraft {
  const configured = args.configured === true;
  const enabled = args.enabled === true;
  const liveTestPassed = args.liveTestPassed === true;
  return {
    configKey: args.configKey,
    kind: args.kind,
    purpose: args.purpose,
    providerKeyRef: normalizeKeyRef(args.providerKeyRef, `admin.stream.${args.configKey}.secret_ref`),
    environment: args.environment ?? "disabled",
    configured,
    enabled,
    liveTestPassed,
    readiness: resolveProviderReadiness(configured, enabled, liveTestPassed),
    serverSideOnly: true,
    adminSecureSecretFormAllowed: true,
    rawSecretValueAcceptedByContract: false,
    rawSecretValueReturnedToAdmin: false,
    rawSecretValueReturnedToMobile: false,
    mobileSecretAllowed: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}

function normalizeRails(rails: readonly StreamFoundationPaymentRail[] | undefined): readonly StreamFoundationPaymentRail[] {
  if (!rails || rails.length === 0) return DEFAULT_GIFT_PAYMENT_RAILS;
  const known = new Set<StreamFoundationPaymentRail>([
    "sabi_coin_wallet",
    "external_card_acquirer",
    "alipay_plus_provider",
    "bank_provider",
    "manual_provider_review",
  ]);
  const deduped: StreamFoundationPaymentRail[] = [];
  for (const rail of rails) {
    if (known.has(rail) && !deduped.includes(rail)) deduped.push(rail);
  }
  return deduped.length > 0 ? deduped : DEFAULT_GIFT_PAYMENT_RAILS;
}

export function createStreamFoundationAdminMonetizationConfigDraft(
  input: StreamFoundationAdminMonetizationConfigInput = {},
): StreamFoundationAdminMonetizationConfigDraft {
  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_CONFIG_STAGE,
    acceptPaymentProvider: createProviderConfigDraft({
      configKey: "accept_payment_provider",
      kind: "accept_payment_provider",
      purpose: "accept_stream_gift_payment",
      providerKeyRef: normalizeKeyRef(input.acceptPaymentProviderKeyRef, "admin.stream.payment.accept.provider.secret_ref"),
      environment: input.acceptPaymentProviderEnvironment,
      configured: input.acceptPaymentProviderConfigured,
      enabled: input.acceptPaymentProviderEnabled,
      liveTestPassed: input.acceptPaymentProviderLiveTestPassed,
    }),
    monetizationPayoutProvider: createProviderConfigDraft({
      configKey: "monetization_payout_provider",
      kind: "monetization_payout_provider",
      purpose: "creator_monetization_payout",
      providerKeyRef: normalizeKeyRef(input.monetizationPayoutProviderKeyRef, "admin.stream.monetization.payout.provider.secret_ref"),
      environment: input.monetizationPayoutProviderEnvironment,
      configured: input.monetizationPayoutProviderConfigured,
      enabled: input.monetizationPayoutProviderEnabled,
      liveTestPassed: input.monetizationPayoutProviderLiveTestPassed,
    }),
    walletCoinLedgerProvider: createProviderConfigDraft({
      configKey: "wallet_coin_ledger_provider",
      kind: "wallet_coin_ledger_provider",
      purpose: "wallet_coin_ledger",
      providerKeyRef: normalizeKeyRef(input.walletCoinLedgerProviderKeyRef, "admin.wallet.coin.ledger.provider.secret_ref"),
      environment: input.walletCoinLedgerProviderEnvironment,
      configured: input.walletCoinLedgerProviderConfigured,
      enabled: input.walletCoinLedgerProviderEnabled,
      liveTestPassed: input.walletCoinLedgerProviderLiveTestPassed,
    }),
    platformSettlementProvider: createProviderConfigDraft({
      configKey: "platform_settlement_provider",
      kind: "platform_settlement_provider",
      purpose: "merchant_admin_settlement",
      providerKeyRef: normalizeKeyRef(input.platformSettlementProviderKeyRef, "admin.stream.platform.settlement.provider.secret_ref"),
      environment: input.platformSettlementProviderEnvironment,
      configured: input.platformSettlementProviderConfigured,
      enabled: input.platformSettlementProviderEnabled,
      liveTestPassed: input.platformSettlementProviderLiveTestPassed,
    }),
    complianceRiskProvider: createProviderConfigDraft({
      configKey: "compliance_risk_provider",
      kind: "compliance_risk_provider",
      purpose: "merchant_admin_settlement",
      providerKeyRef: normalizeKeyRef(input.complianceRiskProviderKeyRef, "admin.stream.compliance.risk.provider.secret_ref"),
      environment: input.complianceRiskProviderEnvironment,
      configured: input.complianceRiskProviderConfigured,
      enabled: input.complianceRiskProviderEnabled,
      liveTestPassed: input.complianceRiskProviderLiveTestPassed,
    }),
    policy: {
      platformFeeBps: clampBps(input.platformFeeBps),
      platformFeeConfigured: typeof input.platformFeeBps === "number" && Number.isFinite(input.platformFeeBps),
      monthlyPayoutDayOfMonth: clampDay(input.monthlyPayoutDayOfMonth),
      payoutOncePerMonth: true,
      minPayoutCoinAmount: clampNonNegative(input.minPayoutCoinAmount),
      complianceHoldDays: clampNonNegative(input.complianceHoldDays),
      creatorKycRequired: true,
      creatorMonetizationApprovalRequired: true,
      receiverEarningsLedgerRequired: true,
      senderChargeLedgerRequired: true,
      supportedGiftPaymentRails: normalizeRails(input.supportedGiftPaymentRails),
      immediatePayoutAllowed: false,
      payoutBeforeMonthlyCycleAllowed: false,
      fakeEarningCreditAllowed: false,
    },
    separateAcceptPaymentAndPayoutConfig: true,
    providerKeysServerSideOnly: true,
    secretValuesReturned: false,
    mobileReceivesProviderKeys: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG = createStreamFoundationAdminMonetizationConfigDraft();

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG = createStreamFoundationAdminMonetizationConfigDraft({
  acceptPaymentProviderConfigured: true,
  acceptPaymentProviderEnabled: true,
  acceptPaymentProviderLiveTestPassed: true,
  acceptPaymentProviderEnvironment: "production",
  acceptPaymentProviderKeyRef: "admin.stream.payment.accept.production.secret_ref",
  monetizationPayoutProviderConfigured: true,
  monetizationPayoutProviderEnabled: true,
  monetizationPayoutProviderLiveTestPassed: true,
  monetizationPayoutProviderEnvironment: "production",
  monetizationPayoutProviderKeyRef: "admin.stream.monetization.payout.production.secret_ref",
  walletCoinLedgerProviderConfigured: true,
  walletCoinLedgerProviderEnabled: true,
  walletCoinLedgerProviderLiveTestPassed: true,
  walletCoinLedgerProviderEnvironment: "production",
  walletCoinLedgerProviderKeyRef: "admin.wallet.coin.ledger.production.secret_ref",
  platformSettlementProviderConfigured: true,
  platformSettlementProviderEnabled: true,
  platformSettlementProviderLiveTestPassed: true,
  platformSettlementProviderEnvironment: "production",
  platformSettlementProviderKeyRef: "admin.stream.platform.settlement.production.secret_ref",
  complianceRiskProviderConfigured: true,
  complianceRiskProviderEnabled: true,
  complianceRiskProviderLiveTestPassed: true,
  complianceRiskProviderEnvironment: "production",
  complianceRiskProviderKeyRef: "admin.stream.compliance.risk.production.secret_ref",
  platformFeeBps: 1500,
  monthlyPayoutDayOfMonth: 1,
  minPayoutCoinAmount: 1000,
  complianceHoldDays: 7,
});

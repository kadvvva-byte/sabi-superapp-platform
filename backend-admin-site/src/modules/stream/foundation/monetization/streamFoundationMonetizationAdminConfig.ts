import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type {
  StreamFoundationMonetizationAdminConfigSnapshot,
  StreamFoundationMonetizationConfigStatus,
  StreamFoundationPaymentProviderPurpose,
  StreamFoundationServerSecretReference,
} from "./streamFoundationMonetizationTypes";

type AdminConfigInput = Partial<Readonly<{
  acceptPaymentProviderConfigured: boolean;
  acceptPaymentProviderEnabled: boolean;
  monetizationPayoutProviderConfigured: boolean;
  monetizationPayoutProviderEnabled: boolean;
  walletCoinLedgerConfigured: boolean;
  walletCoinLedgerEnabled: boolean;
  merchantSettlementProviderConfigured: boolean;
  merchantSettlementProviderEnabled: boolean;
  platformFeeBps: number;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  receiverEarningsLedgerEnabled: boolean;
  senderChargeLedgerEnabled: boolean;
  complianceHoldDays: number;
  complianceReviewRequired: boolean;
}>>;

function secretRef(
  providerKeyRef: string,
  purpose: StreamFoundationPaymentProviderPurpose,
  configured: boolean,
  enabled: boolean,
): StreamFoundationServerSecretReference {
  return {
    providerKeyRef,
    purpose,
    configured,
    enabled,
    serverSideOnly: true,
    rawSecretReturned: false,
    mobileSecretAllowed: false,
  };
}

function clampDay(day: number | undefined): number {
  if (typeof day !== "number" || !Number.isFinite(day)) return 1;
  return Math.max(1, Math.min(28, Math.floor(day)));
}

function clampBps(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(10000, Math.floor(value)));
}

function resolveStatus(input: Required<Pick<AdminConfigInput,
  | "acceptPaymentProviderConfigured"
  | "acceptPaymentProviderEnabled"
  | "monetizationPayoutProviderConfigured"
  | "monetizationPayoutProviderEnabled"
  | "walletCoinLedgerConfigured"
  | "walletCoinLedgerEnabled"
  | "receiverEarningsLedgerEnabled"
  | "senderChargeLedgerEnabled"
  | "complianceReviewRequired"
>> & { platformFeeBpsConfigured: boolean }): StreamFoundationMonetizationConfigStatus {
  if (input.complianceReviewRequired) return "compliance_review_required";
  if (!input.walletCoinLedgerConfigured || !input.walletCoinLedgerEnabled || !input.receiverEarningsLedgerEnabled || !input.senderChargeLedgerEnabled) {
    return "wallet_ledger_not_configured";
  }
  if (!input.acceptPaymentProviderConfigured || !input.acceptPaymentProviderEnabled) return "provider_not_configured";
  if (!input.monetizationPayoutProviderConfigured || !input.monetizationPayoutProviderEnabled) return "monetization_not_configured";
  if (!input.platformFeeBpsConfigured) return "monetization_not_configured";
  return "ready";
}

export function createStreamFoundationMonetizationAdminConfigSnapshot(
  input: AdminConfigInput = {},
): StreamFoundationMonetizationAdminConfigSnapshot {
  const platformFeeBpsConfigured = typeof input.platformFeeBps === "number" && Number.isFinite(input.platformFeeBps);
  const normalized = {
    acceptPaymentProviderConfigured: input.acceptPaymentProviderConfigured === true,
    acceptPaymentProviderEnabled: input.acceptPaymentProviderEnabled === true,
    monetizationPayoutProviderConfigured: input.monetizationPayoutProviderConfigured === true,
    monetizationPayoutProviderEnabled: input.monetizationPayoutProviderEnabled === true,
    walletCoinLedgerConfigured: input.walletCoinLedgerConfigured === true,
    walletCoinLedgerEnabled: input.walletCoinLedgerEnabled === true,
    merchantSettlementProviderConfigured: input.merchantSettlementProviderConfigured === true,
    merchantSettlementProviderEnabled: input.merchantSettlementProviderEnabled === true,
    platformFeeBps: clampBps(input.platformFeeBps),
    monthlyPayoutDayOfMonth: clampDay(input.monthlyPayoutDayOfMonth),
    minPayoutCoinAmount: Math.max(0, Math.floor(input.minPayoutCoinAmount ?? 0)),
    receiverEarningsLedgerEnabled: input.receiverEarningsLedgerEnabled === true,
    senderChargeLedgerEnabled: input.senderChargeLedgerEnabled === true,
    complianceHoldDays: Math.max(0, Math.floor(input.complianceHoldDays ?? 0)),
    complianceReviewRequired: input.complianceReviewRequired === true,
  };

  const status = resolveStatus({
    ...normalized,
    platformFeeBpsConfigured,
  });

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
    acceptPaymentProvider: secretRef(
      "admin.stream.payment.accept.provider.secret_ref",
      "accept_stream_gift_payment",
      normalized.acceptPaymentProviderConfigured,
      normalized.acceptPaymentProviderEnabled,
    ),
    monetizationPayoutProvider: secretRef(
      "admin.stream.monetization.payout.provider.secret_ref",
      "creator_monetization_payout",
      normalized.monetizationPayoutProviderConfigured,
      normalized.monetizationPayoutProviderEnabled,
    ),
    walletCoinLedgerProvider: secretRef(
      "admin.wallet.coin.ledger.provider.secret_ref",
      "wallet_coin_ledger",
      normalized.walletCoinLedgerConfigured,
      normalized.walletCoinLedgerEnabled,
    ),
    merchantSettlementProvider: secretRef(
      "admin.stream.merchant.settlement.provider.secret_ref",
      "merchant_admin_settlement",
      normalized.merchantSettlementProviderConfigured,
      normalized.merchantSettlementProviderEnabled,
    ),
    platformFeeBpsConfigured,
    platformFeeBps: normalized.platformFeeBps,
    monthlyPayoutDayOfMonth: normalized.monthlyPayoutDayOfMonth,
    payoutOncePerMonth: true,
    minPayoutCoinAmount: normalized.minPayoutCoinAmount,
    receiverEarningsLedgerEnabled: normalized.receiverEarningsLedgerEnabled,
    senderChargeLedgerEnabled: normalized.senderChargeLedgerEnabled,
    complianceHoldDays: normalized.complianceHoldDays,
    status,
    adminConfigRequiredBeforeExecution: status !== "ready",
    providerLiveTestRequiredBeforeExecution: true,
    secretValuesReturned: false,
    mobileReceivesProviderKeys: false,
  };
}

export const STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG = createStreamFoundationMonetizationAdminConfigSnapshot();

export const STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG = createStreamFoundationMonetizationAdminConfigSnapshot({
  acceptPaymentProviderConfigured: true,
  acceptPaymentProviderEnabled: true,
  monetizationPayoutProviderConfigured: true,
  monetizationPayoutProviderEnabled: true,
  walletCoinLedgerConfigured: true,
  walletCoinLedgerEnabled: true,
  merchantSettlementProviderConfigured: true,
  merchantSettlementProviderEnabled: true,
  platformFeeBps: 0,
  monthlyPayoutDayOfMonth: 1,
  minPayoutCoinAmount: 0,
  receiverEarningsLedgerEnabled: true,
  senderChargeLedgerEnabled: true,
  complianceHoldDays: 0,
});

export function getStreamFoundationMonetizationConfigSafety() {
  return {
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
    providerKeysServerSideOnly: true,
    rawSecretValuesReturned: false,
    mobileSecretAllowed: false,
    separateAcceptPaymentAndMonetizationConfig: true,
    payoutOncePerMonth: true,
  } as const;
}

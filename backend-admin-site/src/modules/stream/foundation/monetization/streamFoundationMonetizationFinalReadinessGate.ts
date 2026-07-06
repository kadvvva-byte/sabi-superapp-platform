import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminMonetizationReadinessSnapshot } from "./streamFoundationAdminMonetizationReadiness";
import { getStreamFoundationAdminMonetizationRouteReadinessSnapshot } from "./streamFoundationAdminMonetizationRouteReadiness";
import { getStreamFoundationAdminMonetizationUiHandoffReadiness } from "./streamFoundationAdminMonetizationUiHandoffReadiness";
import { getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot } from "./streamFoundationAdminSecureMonetizationApiReadiness";
import { getStreamFoundationGiftPurchaseExecutionGateReadinessSnapshot } from "./streamFoundationGiftPurchaseExecutionGateReadiness";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./streamFoundationGiftTransactionFlowReadiness";
import { getStreamFoundationMonetizationLedgerReadinessSnapshot } from "./streamFoundationMonetizationLedgerReadiness";
import { getStreamFoundationMonthlyPayoutExecutionGateReadinessSnapshot } from "./streamFoundationMonthlyPayoutExecutionGateReadiness";
import {
  STREAM_FOUNDATION_MONETIZATION_FINAL_READINESS_STAGE,
  type StreamFoundationMonetizationFinalReadinessItem,
  type StreamFoundationMonetizationFinalReadinessSnapshot,
} from "./streamFoundationMonetizationFinalReadinessTypes";

const FINAL_READINESS_ITEMS: readonly StreamFoundationMonetizationFinalReadinessItem[] = [
  {
    area: "admin_config",
    status: "ready_for_staging",
    title: "Admin has separate payment and monetization configuration contracts",
    rule: "accept-payment provider and payout/monetization provider must be configured separately on the server side",
    requiredBeforeLive: ["real encrypted storage", "admin RBAC", "owner approval", "redacted responses only"],
  },
  {
    area: "accept_payment_provider",
    status: "blocked_until_real_execution_stage",
    title: "Accept-payment provider is required before paid gifts can execute",
    rule: "gift payment cannot become successful until the real provider or Wallet ledger authorizes sender charge",
    requiredBeforeLive: ["provider credentials", "provider live test", "idempotency", "audit log"],
  },
  {
    area: "payout_provider",
    status: "blocked_until_real_execution_stage",
    title: "Payout provider is required before creator monthly payout can execute",
    rule: "creator payout provider is separate from payment acceptance provider and cannot be faked",
    requiredBeforeLive: ["payout provider config", "creator KYC", "monthly payout batch", "reconciliation"],
  },
  {
    area: "wallet_ledger",
    status: "blocked_until_real_execution_stage",
    title: "Wallet/COIN ledger is mandatory for debit, fee reserve and recipient earning records",
    rule: "no gift transaction may bypass Wallet ledger and no ledger mutation is allowed in staging",
    requiredBeforeLive: ["ledger repository", "atomic transaction", "double-spend guard", "idempotency key"],
  },
  {
    area: "gift_purchase",
    status: "ready_for_staging",
    title: "Gift purchase gate is fully modeled",
    rule: "sender payment authorization, wallet debit, recipient pending earning and monthly reserve are checked in one gate",
    requiredBeforeLive: ["route mount", "DB repository", "provider adapter", "owner approval"],
  },
  {
    area: "recipient_earnings",
    status: "locked_safety_rule",
    title: "Recipient earning is pending first",
    rule: "recipient earnings must be counted as pending after authorized gift payment and cannot be available immediately",
    requiredBeforeLive: ["monthly payout policy", "creator monetization approval", "earnings ledger snapshot"],
  },
  {
    area: "monthly_payout",
    status: "locked_safety_rule",
    title: "Creator payout is monthly only",
    rule: "direct user withdrawal and payout before monthly cycle are blocked",
    requiredBeforeLive: ["monthly batch", "KYC", "provider payout config", "reconciliation"],
  },
  {
    area: "admin_ui_handoff",
    status: "ready_for_staging",
    title: "Admin UI can consume redacted monetization view models",
    rule: "Admin UI must display provider status and secret refs without raw secrets",
    requiredBeforeLive: ["real Admin UI patch", "protected route", "no raw secret render"],
  },
  {
    area: "audit_reconciliation",
    status: "blocked_until_real_execution_stage",
    title: "Audit and reconciliation are required for every payment, gift and payout",
    rule: "every gift/payout command must create an audit/reconciliation trail before live money movement",
    requiredBeforeLive: ["audit repository", "ledger reconciliation job", "admin review panel"],
  },
  {
    area: "route_mount",
    status: "blocked_until_real_execution_stage",
    title: "Routes remain unmounted until owner-approved backend install stage",
    rule: "staging foundation must not mount routes or execute money movement by itself",
    requiredBeforeLive: ["owner approval", "server backup", "route auth", "rate limit", "production smoke"],
  },
] as const;

function countByStatus(status: StreamFoundationMonetizationFinalReadinessItem["status"]): number {
  return FINAL_READINESS_ITEMS.filter((item) => item.status === status).length;
}

export function getStreamFoundationMonetizationFinalReadinessSnapshot(): StreamFoundationMonetizationFinalReadinessSnapshot {
  const adminConfig = getStreamFoundationAdminMonetizationReadinessSnapshot();
  const secureApi = getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot();
  const route = getStreamFoundationAdminMonetizationRouteReadinessSnapshot();
  const uiHandoff = getStreamFoundationAdminMonetizationUiHandoffReadiness();
  const ledger = getStreamFoundationMonetizationLedgerReadinessSnapshot();
  const giftFlow = getStreamFoundationGiftTransactionFlowReadinessSnapshot();
  const giftExecution = getStreamFoundationGiftPurchaseExecutionGateReadinessSnapshot();
  const payoutExecution = getStreamFoundationMonthlyPayoutExecutionGateReadinessSnapshot();
  const readyForServerInstallAfterOwnerApproval =
    adminConfig.readyForRealProviderBindingAfterOwnerApproval &&
    secureApi.readyForServerRouteMountAfterOwnerApproval &&
    route.readyForRealRouteMountAfterOwnerApproval &&
    uiHandoff.readyForBackendRouteMountAfterOwnerApproval &&
    (ledger.giftLedgerPreviewRecorded && ledger.receiverPendingEarningsCounted && ledger.monthlyPayoutBatchPlanned) &&
    giftFlow.readyForRouteMountApprovalPlanning &&
    giftExecution.readyForRealExecutionAfterRouteMountProviderApproval &&
    payoutExecution.readyForRealExecutionAfterRouteMountProviderApproval;

  return {
    stage: STREAM_FOUNDATION_MONETIZATION_FINAL_READINESS_STAGE,
    status: readyForServerInstallAfterOwnerApproval
      ? "foundation_ready_for_local_staging"
      : "blocked_until_real_provider_wallet_db_and_route_mount",
    dependsOn: [
      adminConfig.stage,
      secureApi.stage,
      route.stage,
      uiHandoff.stage,
      ledger.stage,
      giftFlow.stage,
      giftExecution.stage,
      payoutExecution.stage,
    ],
    readinessItems: FINAL_READINESS_ITEMS,
    readyForStagingItems: countByStatus("ready_for_staging"),
    blockedUntilExecutionItems: countByStatus("blocked_until_real_execution_stage"),
    lockedSafetyRules: countByStatus("locked_safety_rule"),
    coveragePercentForStagingFoundation: 100,
    giftFlow: {
      senderPaymentAuthorizationRequired: true,
      walletLedgerDebitRequired: true,
      recipientPendingEarningCreatedOnlyAfterAuthorizedPayment: true,
      recipientAvailableEarningCreatedNow: false,
      giftVisibleAsPaidOnlyAfterLedgerCommit: true,
      fakeGiftSuccessAllowed: false,
    },
    payoutFlow: {
      payoutFrequency: "monthly_only",
      directUserWithdrawalAllowedNow: false,
      payoutBeforeMonthlyCycleAllowedNow: false,
      pendingToAvailableRequiresMonthlyBatch: true,
      creatorKycRequired: true,
      creatorMonetizationApprovalRequired: true,
      fakePayoutSuccessAllowed: false,
    },
    adminProviderConfig: {
      acceptPaymentProviderConfiguredSeparately: true,
      monetizationPayoutProviderConfiguredSeparately: true,
      walletCoinLedgerProviderRequired: true,
      secretsServerSideOnly: true,
      rawSecretsReturnedToAdmin: false,
      providerKeysReturnedToMobile: false,
    },
    executionGates: {
      routeMountAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletLedgerMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      readyForServerInstallAfterOwnerApproval,
      readyForRealMoneyExecutionNow: false,
    },
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_MONETIZATION_FINAL_READINESS_SNAPSHOT = getStreamFoundationMonetizationFinalReadinessSnapshot();

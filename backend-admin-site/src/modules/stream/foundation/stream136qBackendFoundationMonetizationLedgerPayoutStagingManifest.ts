import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import {
  getStreamFoundationMonetizationLedgerReadinessSnapshot,
  getStreamFoundationMonetizationLedgerRepositorySafety,
  getStreamFoundationMonthlyPayoutBatchSafety,
} from "./monetization";

export const STREAM_136Q_BACKEND_FOUNDATION_MONETIZATION_LEDGER_PAYOUT_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136Q" as const;

export function getStream136QBackendFoundationMonetizationLedgerPayoutStagingManifest() {
  const readiness = getStreamFoundationMonetizationLedgerReadinessSnapshot();

  return {
    version: STREAM_136Q_BACKEND_FOUNDATION_MONETIZATION_LEDGER_PAYOUT_STAGING_VERSION,
    stage: "local_staging_only",
    purpose: "Add Stream monetization ledger repository contracts and monthly payout batch contracts so gifts count receiver earnings correctly while payouts stay monthly and provider-safe.",
    architecture: [
      "Gift payment decision from 136P",
      "Ledger repository preview contract",
      "Sender charge/debit entry required before success",
      "Platform fee reserve entry",
      "Recipient pending earning credit entry",
      "Recipient monthly payout reserve entry",
      "Creator earnings snapshot",
      "Monthly payout batch plan",
      "KYC/creator approval/provider/wallet gates",
      "No fake money movement",
    ] as const,
    readiness,
    repositorySafety: getStreamFoundationMonetizationLedgerRepositorySafety(),
    payoutSafety: getStreamFoundationMonthlyPayoutBatchSafety(),
    safety: {
      ...STREAM_FOUNDATION_SAFE_SNAPSHOT,
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakePaymentAllowed: false,
      fakeGiftAllowed: false,
      secretMaterialAllowedInResponse: false,
    },
    changedRuntime: {
      appServerTouched: false,
      routeMounted: false,
      prismaSchemaChanged: false,
      migrationCreated: false,
      databaseWrite: false,
      providerCall: false,
      walletMutation: false,
      payoutExecuted: false,
      rawProviderSecretReturned: false,
    },
  } as const;
}

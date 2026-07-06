import type { PrismaClient } from "@prisma/client";
import {
  normalizeStreamGiftLedgerProviderPayoutContractInput198W,
  verifyStreamGiftLedgerProviderPayoutContract198W,
} from "../gift-ledger-provider-payout-contract-198w";
import {
  STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
  type StreamGiftLedgerPayoutExecutionGuardBlocked198X,
  type StreamGiftLedgerPayoutExecutionGuardGate198X,
  type StreamGiftLedgerPayoutExecutionGuardInput198X,
  type StreamGiftLedgerPayoutExecutionGuardResult198X,
  type StreamGiftLedgerPayoutExecutionGuardSafety198X,
} from "./streamGiftLedgerPayoutExecutionGuard198X.types";

const EXECUTION_APPROVAL_PHRASE_198X = "STREAM_GIFT_LEDGER_198X_PAYOUT_EXECUTION_GUARD_APPROVED" as const;
const PROVIDER_CONTRACT_APPROVAL_PHRASE_198W = "STREAM_GIFT_LEDGER_198W_PROVIDER_PAYOUT_APPROVED" as const;

export const STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY: StreamGiftLedgerPayoutExecutionGuardSafety198X = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  payoutExecutionAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  providerAdapterBindingAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  availableBalanceMutationAllowedNow: false,
  realtimeEmitAllowedNow: false,
  adminApprovalRequired: true,
  providerPayoutReferenceHashRequired: true,
  payoutDestinationReferenceHashRequired: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderReferenceOutputAllowed: false,
  fakeCashOutAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked198X(
  code: StreamGiftLedgerPayoutExecutionGuardBlocked198X["code"],
  blockedReason: string,
): StreamGiftLedgerPayoutExecutionGuardBlocked198X {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    status: "payout_execution_guard_blocked",
    code,
    blockedReason,
    payoutExecutionAllowed: false,
    providerPayoutCallAllowed: false,
    providerAdapterBindingAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  };
}

function normalizePayoutProvider198X(value: unknown): StreamGiftLedgerPayoutExecutionGuardInput198X["payoutProvider"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "airwallex" || normalized === "bank" || normalized === "manual_review" || normalized === "other") return normalized;
  return "manual_review";
}

function normalizeAdapterMode198X(value: unknown): StreamGiftLedgerPayoutExecutionGuardInput198X["providerAdapterMode"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "server_verified_reference" || normalized === "manual_review" || normalized === "disabled") return normalized;
  return "disabled";
}

function hasRawProviderReferenceShape198X(raw: Record<string, unknown>): boolean {
  const forbiddenKeys = [
    "providerReference",
    "providerPayoutReference",
    "providerToken",
    "payoutToken",
    "rawProviderReference",
    "rawProviderToken",
    "bankAccountNumber",
    "iban",
    "cardNumber",
    "walletPrivateKey",
  ];
  return forbiddenKeys.some((key) => clean(raw[key]));
}

export function normalizeStreamGiftLedgerPayoutExecutionGuardInput198X(raw: Record<string, unknown>): StreamGiftLedgerPayoutExecutionGuardInput198X {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
    payoutProvider: normalizePayoutProvider198X(raw.payoutProvider),
    providerPayoutReferenceHash: clean(raw.providerPayoutReferenceHash),
    payoutDestinationReferenceHash: clean(raw.payoutDestinationReferenceHash),
    payoutApproval: clean(raw.payoutApproval),
    executionApproval: clean(raw.executionApproval),
    providerAdapterMode: normalizeAdapterMode198X(raw.providerAdapterMode),
  };
}

export async function verifyStreamGiftLedgerPayoutExecutionGuard198X(
  prisma: PrismaClient,
  input: StreamGiftLedgerPayoutExecutionGuardInput198X,
  raw: Record<string, unknown> = {},
): Promise<StreamGiftLedgerPayoutExecutionGuardResult198X> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198X("send_intent_id_required", "sendIntentId is required for payout execution guard");

  if (hasRawProviderReferenceShape198X(raw)) {
    return blocked198X("raw_provider_reference_rejected", "Raw provider payout references/tokens/bank identifiers are rejected; use hash-only server-side references");
  }

  const contract198W = await verifyStreamGiftLedgerProviderPayoutContract198W(
    prisma,
    normalizeStreamGiftLedgerProviderPayoutContractInput198W({
      sendIntentId,
      creatorUserId: input.creatorUserId,
      payoutProvider: input.payoutProvider,
      providerPayoutReferenceHash: input.providerPayoutReferenceHash,
      payoutDestinationReferenceHash: input.payoutDestinationReferenceHash,
      payoutApproval: input.payoutApproval || PROVIDER_CONTRACT_APPROVAL_PHRASE_198W,
    }),
    raw,
  );

  if (!contract198W.ok) {
    return blocked198X("provider_payout_contract_not_ready", `198W provider payout contract not ready: ${contract198W.blockedReason}`);
  }

  if (input.executionApproval !== EXECUTION_APPROVAL_PHRASE_198X) {
    return blocked198X("execution_approval_required", `executionApproval must equal ${EXECUTION_APPROVAL_PHRASE_198X}`);
  }

  const adapterMode = input.providerAdapterMode || "disabled";
  if (adapterMode !== "server_verified_reference" && adapterMode !== "manual_review") {
    return blocked198X("provider_adapter_mode_invalid", "providerAdapterMode must be server_verified_reference or manual_review; disabled mode cannot advance to adapter binding");
  }

  const envExecutionEnabled = String(process.env.STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_ENABLED || "").toLowerCase() === "true";
  const envAdapterMode = String(process.env.STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_MODE || "").trim();
  if (envExecutionEnabled || envAdapterMode) {
    return blocked198X(
      envExecutionEnabled ? "payout_execution_runtime_disabled" : "provider_adapter_binding_disabled",
      "198X is a guard/boundary only; payout execution/provider adapter binding is intentionally disabled until 198Y owner-local smoke",
    );
  }

  const gates: readonly StreamGiftLedgerPayoutExecutionGuardGate198X[] = [
    { name: "198W_provider_payout_contract", passed: true, evidence: contract198W.status },
    { name: "execution_approval_phrase", passed: true, evidence: EXECUTION_APPROVAL_PHRASE_198X },
    { name: "provider_adapter_mode_selected", passed: true, evidence: adapterMode },
    { name: "execution_runtime_disabled", passed: true, evidence: "no_provider_payout_call_in_198x" },
    { name: "raw_provider_reference_rejected", passed: true, evidence: "hash_presence_booleans_only" },
  ] as const;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    status: "payout_execution_guard_ready_for_future_adapter_binding_only",
    sendIntentId,
    creatorUserId: contract198W.creatorUserId,
    payoutProvider: contract198W.payoutProvider,
    providerPayoutReferenceHashPresent: true,
    payoutDestinationReferenceHashPresent: contract198W.payoutDestinationReferenceHashPresent,
    adminApprovalAccepted: true,
    executionApprovalAccepted: true,
    providerAdapterMode: adapterMode,
    payoutExecutionAllowed: false,
    providerPayoutCallAllowed: false,
    providerAdapterBindingAllowed: false,
    nextExecutionStage: "198Y_owner_local_provider_payout_adapter_smoke_required",
    gates,
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  };
}

export function getStreamGiftLedgerPayoutExecutionGuardReadiness198X() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    stage: "provider_payout_execution_guard_boundary",
    status: "ready_safe_disabled",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198x/readiness",
      "GET /api/admin/stream/gifts/ledger/198x/execution-guard-contract",
      "POST /api/admin/stream/gifts/ledger/198x/guard-check",
      "GET /api/admin/stream/gifts/ledger/198x/runbook",
      "POST /api/admin/stream/gifts/ledger/198x/next-owner-local-provider-payout-smoke-request",
    ] as const,
    currentBoundary: [
      "198W provider payout contract required",
      "198X execution approval phrase required",
      "provider adapter mode selected but not bound",
      "no provider payout call in 198X",
      "no payout execution in 198X",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  } as const;
}

export function getStreamGiftLedgerPayoutExecutionGuardContract198X() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    contract: "stream.gift.creator.payout.execution_guard.v1",
    requiredInputs: [
      "sendIntentId",
      "providerPayoutReferenceHash 64hex from server-side provider verification",
      "payoutApproval 198W phrase",
      "executionApproval 198X phrase",
      "providerAdapterMode server_verified_reference or manual_review",
    ] as const,
    rejectedInputs: [
      "raw provider token",
      "raw provider payout reference",
      "raw bank/card/IBAN identifiers",
      "client supplied payout success",
      "client supplied available balance",
    ] as const,
    outputPolicy: [
      "hash presence booleans only",
      "no raw provider reference output",
      "no provider payout call result",
      "no payout execution success flag",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  } as const;
}

export function getStreamGiftLedgerPayoutExecutionGuardRunbook198X() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    adminApprovalPhrases: {
      providerPayoutContract198W: PROVIDER_CONTRACT_APPROVAL_PHRASE_198W,
      payoutExecutionGuard198X: EXECUTION_APPROVAL_PHRASE_198X,
    },
    localContractCheckCommand: "node ./tools/stream-gifts-ledger-198x-payout-execution-guard-contract-check.js --i-approve-198x-payout-execution-guard-check",
    nextStage: "198Y owner-local provider payout adapter smoke, still explicit approval only",
    warning: "198X never executes payout and never calls provider payout APIs",
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  } as const;
}

export function createStreamGiftLedgerOwnerLocalProviderPayoutSmokeRequest198X() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
    status: "next_stage_requires_separate_owner_approval",
    nextStage: "BACKEND-STREAM-GIFTS-LEDGER-198Y",
    requestedScope: "owner_local_provider_payout_adapter_smoke_with_hash_only_references",
    forbiddenNow: [
      "automatic_payout_execution",
      "provider_payout_call_without_owner_local_runner",
      "Wallet_mutation",
      "raw_provider_token_or_reference",
      "fake_cash_out_success",
      "fake_payout_success",
      "fake_available_balance",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY,
  } as const;
}

export function assertStreamGiftLedgerPayoutExecutionGuard198XRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.providerAdapterBindingAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.availableBalanceMutationAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderReferenceOutputAllowed,
    safety.fakeCashOutAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_UNSAFE_FLAG");
}

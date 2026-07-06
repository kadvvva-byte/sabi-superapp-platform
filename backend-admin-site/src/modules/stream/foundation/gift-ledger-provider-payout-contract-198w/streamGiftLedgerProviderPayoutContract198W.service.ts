import type { PrismaClient } from "@prisma/client";
import {
  inspectStreamGiftLedgerCreatorPayoutReadiness198V,
  normalizeStreamGiftLedgerCreatorPayoutReadinessInput198V,
} from "../gift-ledger-creator-payout-readiness-198v";
import {
  STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
  type StreamGiftLedgerProviderPayoutContractBlocked198W,
  type StreamGiftLedgerProviderPayoutContractGate198W,
  type StreamGiftLedgerProviderPayoutContractInput198W,
  type StreamGiftLedgerProviderPayoutContractResult198W,
  type StreamGiftLedgerProviderPayoutContractSafety198W,
} from "./streamGiftLedgerProviderPayoutContract198W.types";

const APPROVAL_PHRASE_198W = "STREAM_GIFT_LEDGER_198W_PROVIDER_PAYOUT_APPROVED" as const;
const HASH_64_HEX_198W = /^[a-f0-9]{64}$/i;

export const STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY: StreamGiftLedgerProviderPayoutContractSafety198W = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  payoutExecutionAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  availableBalanceMutationAllowedNow: false,
  realtimeEmitAllowedNow: false,
  officialCreatorVerificationRequired: true,
  creatorAgreementRequired: true,
  kycKybAmlRequired: true,
  taxWithholdingRequired: true,
  adminPayoutApprovalRequired: true,
  providerPayoutReferenceHashRequired: true,
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

function blocked198W(
  code: StreamGiftLedgerProviderPayoutContractBlocked198W["code"],
  blockedReason: string,
): StreamGiftLedgerProviderPayoutContractBlocked198W {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    status: "provider_payout_contract_blocked",
    code,
    blockedReason,
    payoutExecutionAllowed: false,
    providerPayoutCallAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  };
}

function normalizePayoutProvider198W(value: unknown): StreamGiftLedgerProviderPayoutContractInput198W["payoutProvider"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "airwallex" || normalized === "bank" || normalized === "manual_review" || normalized === "other") return normalized;
  return "manual_review";
}

function hasRawProviderReferenceShape198W(raw: Record<string, unknown>): boolean {
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
  ];
  return forbiddenKeys.some((key) => clean(raw[key]));
}

export function normalizeStreamGiftLedgerProviderPayoutContractInput198W(raw: Record<string, unknown>): StreamGiftLedgerProviderPayoutContractInput198W {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
    payoutProvider: normalizePayoutProvider198W(raw.payoutProvider),
    providerPayoutReferenceHash: clean(raw.providerPayoutReferenceHash),
    payoutDestinationReferenceHash: clean(raw.payoutDestinationReferenceHash),
    payoutApproval: clean(raw.payoutApproval),
  };
}

export async function verifyStreamGiftLedgerProviderPayoutContract198W(
  prisma: PrismaClient,
  input: StreamGiftLedgerProviderPayoutContractInput198W,
  raw: Record<string, unknown> = {},
): Promise<StreamGiftLedgerProviderPayoutContractResult198W> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198W("send_intent_id_required", "sendIntentId is required for provider payout contract approval gate");

  if (hasRawProviderReferenceShape198W(raw)) {
    return blocked198W("raw_provider_reference_rejected", "Raw provider payout references/tokens/bank identifiers are rejected; submit hash-only references from server-side provider verification");
  }

  const providerPayoutReferenceHash = clean(input.providerPayoutReferenceHash);
  if (!providerPayoutReferenceHash) return blocked198W("provider_payout_reference_hash_required", "providerPayoutReferenceHash is required and must be hash-only");
  if (!HASH_64_HEX_198W.test(providerPayoutReferenceHash)) return blocked198W("provider_payout_reference_hash_invalid", "providerPayoutReferenceHash must be a 64-character hex hash");

  const payoutDestinationReferenceHash = clean(input.payoutDestinationReferenceHash);
  if (payoutDestinationReferenceHash && !HASH_64_HEX_198W.test(payoutDestinationReferenceHash)) {
    return blocked198W("provider_payout_reference_hash_invalid", "payoutDestinationReferenceHash must be a 64-character hex hash when provided");
  }

  if (input.payoutApproval !== APPROVAL_PHRASE_198W) {
    return blocked198W("admin_payout_approval_required", `payoutApproval must equal ${APPROVAL_PHRASE_198W}`);
  }

  const readiness = await inspectStreamGiftLedgerCreatorPayoutReadiness198V(prisma, normalizeStreamGiftLedgerCreatorPayoutReadinessInput198V({
    sendIntentId,
    creatorUserId: input.creatorUserId,
  }));

  if (!readiness.ok || readiness.payoutReadinessStatus !== "ready_for_admin_review_only") {
    return blocked198W("creator_payout_not_ready", "198V creator payout readiness must be ready_for_admin_review_only before provider payout contract approval");
  }

  const gates: readonly StreamGiftLedgerProviderPayoutContractGate198W[] = [
    { name: "198V_creator_payout_readiness", passed: true, evidence: readiness.payoutReadinessStatus },
    { name: "provider_payout_reference_hash_only", passed: true, evidence: "64_hex_hash_present" },
    { name: "admin_approval_phrase", passed: true, evidence: APPROVAL_PHRASE_198W },
    { name: "payout_execution_disabled", passed: true, evidence: "contract_only_no_provider_call" },
    { name: "raw_provider_reference_rejected", passed: true, evidence: "raw_reference_not_returned_or_accepted" },
  ] as const;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    status: "provider_payout_contract_ready_for_future_execution_only",
    sendIntentId,
    creatorUserId: readiness.creatorUserId,
    payoutProvider: input.payoutProvider || "manual_review",
    providerPayoutReferenceHashPresent: true,
    payoutDestinationReferenceHashPresent: Boolean(payoutDestinationReferenceHash),
    adminApprovalAccepted: true,
    creatorPayoutReadinessStatus: readiness.payoutReadinessStatus,
    availableDiamondMicros: readiness.availableDiamondMicros,
    payoutExecutionAllowed: false,
    providerPayoutCallAllowed: false,
    nextExecutionStage: "198X_provider_payout_execution_guard_required",
    gates,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  };
}

export function getStreamGiftLedgerProviderPayoutContractReadiness198W() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    stage: "provider_payout_contract_admin_approval_gate",
    status: "ready_safe_disabled",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198w/readiness",
      "GET /api/admin/stream/gifts/ledger/198w/provider-payout-contract",
      "POST /api/admin/stream/gifts/ledger/198w/admin-approval-gate",
      "GET /api/admin/stream/gifts/ledger/198w/runbook",
      "POST /api/admin/stream/gifts/ledger/198w/next-payout-execution-guard-request",
    ] as const,
    requiresBeforeFuturePayoutExecution: [
      "198V ready_for_admin_review_only",
      "providerPayoutReferenceHash 64 hex hash-only",
      "optional payoutDestinationReferenceHash hash-only",
      `admin payout approval phrase ${APPROVAL_PHRASE_198W}`,
      "future 198X execution guard with provider payout adapter still required",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  } as const;
}

export function getStreamGiftLedgerProviderPayoutContract198W() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    contract: "stream.gift.creator.payout.provider_contract.v1",
    allowedInputs: [
      "sendIntentId",
      "creatorUserId optional",
      "payoutProvider enum",
      "providerPayoutReferenceHash 64hex",
      "payoutDestinationReferenceHash optional 64hex",
      "payoutApproval exact phrase",
    ] as const,
    rejectedInputs: [
      "raw provider token",
      "raw provider payout reference",
      "bank/card/IBAN raw identifiers",
      "client supplied available balance",
      "client supplied payout success",
    ] as const,
    outputPolicy: [
      "hash presence booleans only",
      "no raw provider reference output",
      "no payout execution status success",
      "no provider payout call result",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  } as const;
}

export function getStreamGiftLedgerProviderPayoutRunbook198W() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    adminApprovalPhrase: APPROVAL_PHRASE_198W,
    localContractCheckCommand: "node ./tools/stream-gifts-ledger-198w-provider-payout-contract-check.js --i-approve-198w-provider-payout-contract-check",
    nextStage: "198X provider payout execution guard, still no fake payout",
    warning: "198W never executes payout and never calls provider payout APIs",
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  } as const;
}

export function createStreamGiftLedgerPayoutExecutionGuardRequest198W() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
    status: "next_stage_requires_separate_owner_approval",
    nextStage: "BACKEND-STREAM-GIFTS-LEDGER-198X",
    requestedScope: "provider_payout_execution_guard_provider_adapter_boundary_only",
    forbiddenNow: [
      "payout_execution",
      "provider_payout_call",
      "Wallet_mutation",
      "raw_provider_token_or_reference",
      "fake_cash_out_success",
      "fake_payout_success",
      "fake_available_balance",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY,
  } as const;
}

export function assertStreamGiftLedgerProviderPayoutContract198WRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.providerPayoutCallAllowedNow,
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
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_UNSAFE_FLAG");
}

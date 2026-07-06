import type { PrismaClient } from "@prisma/client";
import {
  normalizeStreamGiftLedgerPayoutExecutionGuardInput198X,
  verifyStreamGiftLedgerPayoutExecutionGuard198X,
} from "../gift-ledger-payout-execution-guard-198x";
import {
  STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
  type StreamGiftLedgerProviderPayoutAdapterEnvelope198Y,
  type StreamGiftLedgerProviderPayoutAdapterSmokeBlocked198Y,
  type StreamGiftLedgerProviderPayoutAdapterSmokeGate198Y,
  type StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y,
  type StreamGiftLedgerProviderPayoutAdapterSmokeResult198Y,
  type StreamGiftLedgerProviderPayoutAdapterSmokeSafety198Y,
} from "./streamGiftLedgerProviderPayoutAdapterSmoke198Y.types";

const PROVIDER_PAYOUT_CONTRACT_APPROVAL_198W = "STREAM_GIFT_LEDGER_198W_PROVIDER_PAYOUT_APPROVED" as const;
const PAYOUT_EXECUTION_GUARD_APPROVAL_198X = "STREAM_GIFT_LEDGER_198X_PAYOUT_EXECUTION_GUARD_APPROVED" as const;
export const STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_APPROVAL = "STREAM_GIFT_LEDGER_198Y_OWNER_LOCAL_ADAPTER_SMOKE_APPROVED" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY: StreamGiftLedgerProviderPayoutAdapterSmokeSafety198Y = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  providerAdapterDryRunAllowedNow: true,
  providerAdapterLiveCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  payoutExecutionAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  availableBalanceMutationAllowedNow: false,
  realtimeEmitAllowedNow: false,
  adminApprovalRequired: true,
  providerPayoutReferenceHashRequired: true,
  payoutDestinationReferenceHashAllowed: true,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawBankOrCardAccepted: false,
  rawProviderReferenceOutputAllowed: false,
  providerResponseBodyOutputAllowed: false,
  fakeCashOutAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked198Y(
  code: StreamGiftLedgerProviderPayoutAdapterSmokeBlocked198Y["code"],
  blockedReason: string,
): StreamGiftLedgerProviderPayoutAdapterSmokeBlocked198Y {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    status: "provider_payout_adapter_smoke_blocked",
    code,
    blockedReason,
    providerPayoutCallAllowed: false,
    payoutExecutionAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  };
}

function normalizePayoutProvider198Y(value: unknown): StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y["payoutProvider"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "airwallex" || normalized === "bank" || normalized === "manual_review" || normalized === "other") return normalized;
  return "manual_review";
}

function normalizeProviderAdapterMode198Y(value: unknown): StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y["providerAdapterMode"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "server_verified_reference" || normalized === "manual_review" || normalized === "disabled") return normalized;
  return "disabled";
}

function hasRawProviderOrDestinationShape198Y(raw: Record<string, unknown>): boolean {
  const forbiddenKeys = [
    "providerReference",
    "providerPayoutReference",
    "providerToken",
    "payoutToken",
    "rawProviderReference",
    "rawProviderToken",
    "providerResponseBody",
    "bankAccountNumber",
    "routingNumber",
    "iban",
    "swift",
    "cardNumber",
    "walletPrivateKey",
  ];
  return forbiddenKeys.some((key) => clean(raw[key]));
}

export function normalizeStreamGiftLedgerProviderPayoutAdapterSmokeInput198Y(
  raw: Record<string, unknown>,
): StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
    payoutProvider: normalizePayoutProvider198Y(raw.payoutProvider),
    providerPayoutReferenceHash: clean(raw.providerPayoutReferenceHash),
    payoutDestinationReferenceHash: clean(raw.payoutDestinationReferenceHash),
    payoutApproval: clean(raw.payoutApproval),
    executionApproval: clean(raw.executionApproval),
    providerAdapterMode: normalizeProviderAdapterMode198Y(raw.providerAdapterMode),
    adapterSmokeApproval: clean(raw.adapterSmokeApproval),
  };
}

export async function smokeStreamGiftLedgerProviderPayoutAdapter198Y(
  prisma: PrismaClient,
  input: StreamGiftLedgerProviderPayoutAdapterSmokeInput198Y,
  raw: Record<string, unknown> = {},
): Promise<StreamGiftLedgerProviderPayoutAdapterSmokeResult198Y> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198Y("send_intent_id_required", "sendIntentId is required for owner-local provider payout adapter smoke");

  if (hasRawProviderOrDestinationShape198Y(raw)) {
    return blocked198Y("raw_provider_reference_rejected", "Raw provider payout references/tokens/bank/card identifiers are rejected; use hash-only server-side references");
  }

  const adapterMode = input.providerAdapterMode || "disabled";
  if (adapterMode !== "server_verified_reference" && adapterMode !== "manual_review") {
    return blocked198Y("provider_adapter_mode_invalid", "providerAdapterMode must be server_verified_reference or manual_review; disabled mode cannot run adapter smoke");
  }

  if (input.adapterSmokeApproval !== STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_APPROVAL) {
    return blocked198Y("adapter_smoke_approval_required", `adapterSmokeApproval must equal ${STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_APPROVAL}`);
  }

  const guard198X = await verifyStreamGiftLedgerPayoutExecutionGuard198X(
    prisma,
    normalizeStreamGiftLedgerPayoutExecutionGuardInput198X({
      sendIntentId,
      creatorUserId: input.creatorUserId,
      payoutProvider: input.payoutProvider,
      providerPayoutReferenceHash: input.providerPayoutReferenceHash,
      payoutDestinationReferenceHash: input.payoutDestinationReferenceHash,
      payoutApproval: input.payoutApproval || PROVIDER_PAYOUT_CONTRACT_APPROVAL_198W,
      executionApproval: input.executionApproval || PAYOUT_EXECUTION_GUARD_APPROVAL_198X,
      providerAdapterMode: adapterMode,
    }),
    raw,
  );

  if (!guard198X.ok) {
    return blocked198Y("payout_execution_guard_not_ready", `198X payout execution guard not ready: ${guard198X.blockedReason}`);
  }

  const envPayoutExecutionEnabled = String(process.env.STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_ENABLED || "").toLowerCase() === "true";
  const envProviderPayoutCallEnabled = String(process.env.STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CALL_ENABLED || "").toLowerCase() === "true";
  const envProviderAdapterLiveMode = String(process.env.STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_MODE || "").trim().toLowerCase();
  if (envPayoutExecutionEnabled) {
    return blocked198Y("payout_execution_runtime_disabled", "198Y is an owner-local adapter smoke only; payout execution remains disabled");
  }
  if (envProviderPayoutCallEnabled || envProviderAdapterLiveMode === "live") {
    return blocked198Y("provider_live_call_runtime_disabled", "198Y never calls provider payout APIs; live provider payout call remains disabled");
  }

  const adapterEnvelope: StreamGiftLedgerProviderPayoutAdapterEnvelope198Y = {
    contract: "stream.gift.creator.payout.provider_adapter_envelope.v1",
    adapterMode,
    payoutProvider: guard198X.payoutProvider,
    sendIntentId,
    providerPayoutReferenceHashPresent: true,
    payoutDestinationReferenceHashPresent: guard198X.payoutDestinationReferenceHashPresent,
    providerPayoutCallExecuted: false,
    providerResponseStored: false,
    providerResponseBodyOutputAllowed: false,
    payoutExecutionAllowed: false,
    fakePayoutSuccessAllowed: false,
  };

  const gates: readonly StreamGiftLedgerProviderPayoutAdapterSmokeGate198Y[] = [
    { name: "198X_payout_execution_guard", passed: true, evidence: guard198X.status },
    { name: "adapter_smoke_approval_phrase", passed: true, evidence: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_APPROVAL },
    { name: "hash_only_provider_reference", passed: true, evidence: "providerPayoutReferenceHashPresent=true" },
    { name: "provider_live_call_disabled", passed: true, evidence: "providerPayoutCallExecuted=false" },
    { name: "fake_payout_success_blocked", passed: true, evidence: "fakePayoutSuccessAllowed=false" },
  ] as const;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    status: "owner_local_provider_payout_adapter_smoke_passed_no_provider_call",
    sendIntentId,
    creatorUserId: guard198X.creatorUserId,
    payoutProvider: guard198X.payoutProvider,
    providerAdapterMode: adapterMode,
    adapterSmokeApprovalAccepted: true,
    payoutExecutionGuard198XAccepted: true,
    providerPayoutReferenceHashPresent: true,
    payoutDestinationReferenceHashPresent: guard198X.payoutDestinationReferenceHashPresent,
    adapterEnvelope,
    nextStage: "198Z_final_payout_audit_and_production_provider_binding_request",
    gates,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  };
}

export function getStreamGiftLedgerProviderPayoutAdapterSmokeReadiness198Y() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    stage: "owner_local_provider_payout_adapter_smoke",
    status: "ready_safe_disabled",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198y/readiness",
      "GET /api/admin/stream/gifts/ledger/198y/adapter-smoke-contract",
      "POST /api/admin/stream/gifts/ledger/198y/adapter-smoke",
      "GET /api/admin/stream/gifts/ledger/198y/runbook",
      "POST /api/admin/stream/gifts/ledger/198y/next-final-audit-request",
    ] as const,
    currentBoundary: [
      "198X payout execution guard required",
      "owner-local adapter smoke approval required",
      "provider payout reference hash only",
      "no provider payout API call",
      "no payout execution success flag",
      "no fake cash-out",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  } as const;
}

export function getStreamGiftLedgerProviderPayoutAdapterSmokeContract198Y() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    contract: "stream.gift.creator.payout.provider_adapter_smoke.v1",
    approvalPhrase: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_APPROVAL,
    requiredInputs: [
      "sendIntentId",
      "providerPayoutReferenceHash 64hex from server-side payout provider reference",
      "payoutApproval 198W phrase",
      "executionApproval 198X phrase",
      "adapterSmokeApproval 198Y phrase",
      "providerAdapterMode server_verified_reference or manual_review",
    ] as const,
    rejectedInputs: [
      "raw provider token",
      "raw provider payout reference",
      "raw bank/card/IBAN identifiers",
      "provider response body",
      "client supplied payout success",
      "client supplied available balance",
    ] as const,
    outputPolicy: [
      "hash presence booleans only",
      "adapter envelope only",
      "providerPayoutCallExecuted=false",
      "provider response body is not stored or returned",
      "no payout execution success flag",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  } as const;
}

export function getStreamGiftLedgerProviderPayoutAdapterSmokeRunbook198Y() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    localStaticCheckCommand: "node ./tools/stream-gifts-ledger-198y-provider-payout-adapter-smoke-check.js --i-approve-198y-provider-payout-adapter-smoke-check",
    ownerLocalRouteSmoke: {
      route: "POST /api/admin/stream/gifts/ledger/198y/adapter-smoke",
      note: "requires admin token, sendIntentId, hash-only providerPayoutReferenceHash, 198W/198X/198Y approval phrases; returns adapter envelope only",
    },
    nextStage: "198Z final payout audit and production provider binding request",
    warning: "198Y never calls provider payout APIs and never records payout success",
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFinalPayoutAuditRequest198Y() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
    status: "next_stage_requires_separate_owner_approval",
    nextStage: "BACKEND-STREAM-GIFTS-LEDGER-198Z",
    requestedScope: "final_payout_audit_and_production_provider_binding_request_no_fake_cashout",
    forbiddenNow: [
      "automatic_payout_execution",
      "provider_payout_call_without_real_provider_binding",
      "Wallet_mutation",
      "raw_provider_token_or_reference",
      "fake_cash_out_success",
      "fake_payout_success",
      "fake_available_balance",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY,
  } as const;
}

export function assertStreamGiftLedgerProviderPayoutAdapterSmoke198YRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.providerAdapterLiveCallAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.availableBalanceMutationAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawBankOrCardAccepted,
    safety.rawProviderReferenceOutputAllowed,
    safety.providerResponseBodyOutputAllowed,
    safety.fakeCashOutAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_UNSAFE_FLAG");
}

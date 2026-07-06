import type { PrismaClient } from "@prisma/client";
import {
  inspectStreamGiftLedgerPostCommit198P,
  normalizeStreamGiftLedgerPostCommitInspectionInput198P,
} from "../gift-ledger-post-commit-event-contract-198p/streamGiftLedgerPostCommitEventContract198P.service";
import {
  previewStreamGiftLedgerRealtimeDelivery198Q,
  normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
} from "../gift-ledger-realtime-delivery-adapter-198q/streamGiftLedgerRealtimeDeliveryAdapter198Q.service";
import { buildStreamGiftLedgerRealtimeRuntimeChannels198R } from "../gift-ledger-realtime-runtime-binding-198r/streamGiftLedgerRealtimeRuntimeBinding198R.service";
import {
  STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
  type StreamGiftLedgerPostCommitRuntimeSmokeBlocked199F,
  type StreamGiftLedgerPostCommitRuntimeSmokeInput199F,
  type StreamGiftLedgerPostCommitRuntimeSmokeNextRequest199F,
  type StreamGiftLedgerPostCommitRuntimeSmokeReadiness199F,
  type StreamGiftLedgerPostCommitRuntimeSmokeResult199F,
  type StreamGiftLedgerPostCommitRuntimeSmokeSafety199F,
} from "./streamGiftLedgerPostCommitRuntimeSmoke199F.types";

export const STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_APPROVAL =
  "STREAM_GIFT_LEDGER_199F_POST_COMMIT_RUNTIME_SMOKE_APPROVED" as const;

export const STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY: StreamGiftLedgerPostCommitRuntimeSmokeSafety199F = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  realtimeEmitAllowedNow: false,
  mobileDeliveryReceiptWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerAuthorizationCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutExecutionAllowedNow: false,
  availableBalanceReleaseAllowedNow: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderReferenceOutputAllowed: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeRealtimeDeliveryAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

const FORBIDDEN_PAYLOAD_KEYS_199F = [
  "providerReferenceHash",
  "rawProviderReference",
  "providerToken",
  "paymentToken",
  "purchaseToken",
  "authorizationCode",
  "availableBalanceDiamondMicros",
  "payoutExecutionAllowed",
  "fakeDelivered",
] as const;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked199F(
  code: StreamGiftLedgerPostCommitRuntimeSmokeBlocked199F["code"],
  blockedReason: string,
): StreamGiftLedgerPostCommitRuntimeSmokeBlocked199F {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    status: "post_commit_runtime_smoke_blocked_without_fake_success",
    code,
    blockedReason,
    realtimeEmitExecuted: false,
    mobileDeliveryConfirmed: false,
    giftSendSuccessFaked: false,
    availableBalanceReleased: false,
    providerLiveCallExecuted: false,
    walletMutationExecuted: false,
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY,
  };
}

function payloadHasForbiddenField199F(value: unknown): boolean {
  const json = JSON.stringify(value ?? {});
  return FORBIDDEN_PAYLOAD_KEYS_199F.some((field) => json.includes(field));
}

export function normalizeStreamGiftLedgerPostCommitRuntimeSmokeInput199F(
  raw: Record<string, unknown>,
): StreamGiftLedgerPostCommitRuntimeSmokeInput199F {
  return {
    sendIntentId: clean(raw.sendIntentId),
    idempotencyKeyHash: clean(raw.idempotencyKeyHash),
    smokeApproval: clean(raw.smokeApproval),
    smokeMode: clean(raw.smokeMode) === "post_commit_runtime_read_only_verification"
      ? "post_commit_runtime_read_only_verification"
      : "disabled",
  };
}

export function getStreamGiftLedgerPostCommitRuntimeSmokeReadiness199F(): StreamGiftLedgerPostCommitRuntimeSmokeReadiness199F {
  assertStreamGiftLedgerPostCommitRuntimeSmoke199FRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    status: "ready_for_post_commit_runtime_smoke_read_only_verification",
    requiredPreviousStages: [
      "199E_provider_authorized_gift_send_ledger_commit_clean",
      "198P_post_commit_inspection_clean",
      "198Q_realtime_delivery_preview_clean",
      "198R_guarded_realtime_runtime_binding_clean",
    ],
    eventName: "stream.gift.ledger.committed.v1",
    currentMode: "read_only_verification_no_emit",
    nextStage: "199G_admin_controls_and_production_gates",
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY,
  };
}

export function getStreamGiftLedgerPostCommitRuntimeSmokeContract199F(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    contract: "stream.gift.post_commit.runtime_smoke.read_only.v1",
    approvalField: "smokeApproval",
    approvalValue: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_APPROVAL,
    smokeMode: "post_commit_runtime_read_only_verification",
    verifies: [
      "199E ledger commit exists",
      "198P post-commit inspection passes",
      "198Q realtime delivery payload preview passes",
      "198R realtime channels resolve",
      "mobile payload has no raw provider/payment fields",
    ],
    noEmit: true,
    noDbWrite: true,
    noProviderCall: true,
    noFakeSuccess: true,
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY,
  };
}

export async function verifyStreamGiftLedgerPostCommitRuntimeSmoke199F(
  prisma: PrismaClient,
  input: StreamGiftLedgerPostCommitRuntimeSmokeInput199F,
): Promise<StreamGiftLedgerPostCommitRuntimeSmokeResult199F> {
  assertStreamGiftLedgerPostCommitRuntimeSmoke199FRemainsSafe();

  if (input.smokeApproval !== STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_APPROVAL) {
    return blocked199F("smoke_approval_required", "smokeApproval must exactly match STREAM_GIFT_LEDGER_199F_POST_COMMIT_RUNTIME_SMOKE_APPROVED");
  }

  if (input.smokeMode !== "post_commit_runtime_read_only_verification") {
    return blocked199F("smoke_mode_disabled", "smokeMode must be post_commit_runtime_read_only_verification");
  }

  if (!input.sendIntentId && !input.idempotencyKeyHash) {
    return blocked199F("selector_required", "sendIntentId or idempotencyKeyHash is required for post-commit runtime smoke");
  }

  const inspection = await inspectStreamGiftLedgerPostCommit198P(
    prisma,
    normalizeStreamGiftLedgerPostCommitInspectionInput198P({
      sendIntentId: input.sendIntentId,
      idempotencyKeyHash: input.idempotencyKeyHash,
      includeEventContract: true,
    }),
  );

  if (!inspection.ok) {
    return blocked199F("post_commit_inspection_failed", `198P inspection failed: ${inspection.code}`);
  }

  const preview = await previewStreamGiftLedgerRealtimeDelivery198Q(
    prisma,
    normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q({
      sendIntentId: input.sendIntentId ?? inspection.sendIntentId,
      idempotencyKeyHash: input.idempotencyKeyHash,
    }),
  );

  if (!preview.ok) {
    return blocked199F("realtime_delivery_preview_failed", preview.blockedReason);
  }

  const channels = buildStreamGiftLedgerRealtimeRuntimeChannels198R(preview.payload);
  if (channels.length === 0) {
    return blocked199F("realtime_channels_missing", "198R channel resolution returned no Stream/Messenger/user delivery channels");
  }

  if (payloadHasForbiddenField199F(preview.payload)) {
    return blocked199F("unsafe_payload_field_detected", "Realtime payload contains a forbidden provider/payment/balance field");
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    status: "post_commit_runtime_smoke_verified_read_only_no_emit",
    sendIntentId: preview.sendIntentId,
    eventName: "stream.gift.ledger.committed.v1",
    postCommitInspectionPassed: true,
    realtimeDeliveryPreviewPassed: true,
    realtimeChannelsResolved: channels.length,
    realtimeEmitExecuted: false,
    mobileDeliveryConfirmed: false,
    deliveryReceiptRequired: true,
    availableBalanceReleased: false,
    payoutExecuted: false,
    providerLiveCallExecuted: false,
    walletMutationExecuted: false,
    giftSendSuccessFaked: false,
    payloadSafeForMobile: true,
    nextStage: "199G_admin_controls_and_production_gates",
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY,
  };
}

export function getStreamGiftLedgerPostCommitRuntimeSmokeRunbook199F(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "POST /api/admin/stream/gifts/ledger/199f/runtime-smoke with smokeApproval=STREAM_GIFT_LEDGER_199F_POST_COMMIT_RUNTIME_SMOKE_APPROVED and smokeMode=post_commit_runtime_read_only_verification",
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    ],
    note: "199F verifies 199E commit + 198P inspection + 198Q delivery preview + 198R channel resolution. It never emits realtime and never fakes mobile delivery.",
  };
}

export function createStreamGiftLedgerAdminControlsRequest199F(): StreamGiftLedgerPostCommitRuntimeSmokeNextRequest199F {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION,
    nextStage: "199G_admin_controls_and_production_gates",
    allowedNext: [
      "Admin production gate visibility",
      "gift send enable switch remains off by default",
      "provider/payment/payout flags remain separated",
      "operator audit contract for production launch",
    ],
    stillForbidden: [
      "provider live call without separate owner approval",
      "Wallet mutation from Stream gifts",
      "payment capture in smoke route",
      "payout execution",
      "fake realtime delivered receipt",
      "fake gift success",
      "fake available balance",
      "raw provider token/reference output",
    ],
  };
}

export function assertStreamGiftLedgerPostCommitRuntimeSmoke199FRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.mobileDeliveryReceiptWriteAllowedNow,
    safety.walletMutationAllowedNow,
    safety.providerLiveCallAllowedNow,
    safety.providerAuthorizationCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.availableBalanceReleaseAllowedNow,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderReferenceOutputAllowed,
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeRealtimeDeliveryAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (unsafe.some(Boolean)) {
    throw new Error("STREAM_GIFT_LEDGER_199F_UNSAFE_RUNTIME_FLAG_ENABLED");
  }
}

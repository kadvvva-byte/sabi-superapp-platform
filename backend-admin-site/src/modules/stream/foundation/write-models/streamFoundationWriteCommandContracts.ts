import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import { STREAM_FOUNDATION_SAFE_SNAPSHOT, type StreamFoundationSafetySnapshot } from "../core";

export type StreamFoundationWriteModelStage = "BACKEND_STREAM_FOUNDATION_136I_WRITE_MODELS_STAGING";
export type StreamFoundationWriteCommandStage = StreamFoundationWriteModelStage;

export type StreamFoundationWriteCommandId =
  | "stream_start_live_session_command"
  | "stream_stop_live_session_command"
  | "stream_live_heartbeat_command"
  | "stream_short_media_upload_command"
  | "stream_short_publish_command"
  | "stream_content_report_command"
  | "stream_business_product_attach_command"
  | "stream_creator_verification_request_command"
  | "stream_gift_send_boundary_command";

export type StreamFoundationWriteCommandKind =
  | "live_lifecycle"
  | "live_presence"
  | "media_upload"
  | "short_publish"
  | "moderation_report"
  | "business_catalog_attach"
  | "creator_verification"
  | "wallet_gift_boundary";

export type StreamFoundationWriteCommandStatus =
  | "blocked_backend_common_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_wallet_gift_last_stage";

export type StreamFoundationWriteCommandFieldKind = "string" | "number" | "boolean" | "string_array" | "object_reference";

export type StreamFoundationWriteCommandField = Readonly<{
  name: string;
  kind: StreamFoundationWriteCommandFieldKind;
  requiredLater: boolean;
  piiAllowedInStagingNow: false;
  secretMaterialAllowedNow: false;
}>;

export type StreamFoundationWriteCommandContract = Readonly<{
  commandId: StreamFoundationWriteCommandId;
  kind: StreamFoundationWriteCommandKind;
  targetSurfaces: readonly StreamFoundationSurface[];
  action: StreamFoundationAction;
  status: StreamFoundationWriteCommandStatus;
  safeCode: StreamFoundationSafeCode;
  severity: StreamFoundationSeverity;
  safeMessageKey: string;
  idempotencyKeyRequiredLater: boolean;
  userSessionRequiredLater: true;
  adminGateRequiredLater: boolean;
  providerGateRequiredLater: boolean;
  walletGiftLastStageRequiredLater: boolean;
  requiredGates: readonly StreamFoundationGateId[];
  payloadFields: readonly StreamFoundationWriteCommandField[];
  acceptsCommandNow: false;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  realtimePublishAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeLiveAllowed: false;
  fakeUploadAllowed: false;
  fakePublishAllowed: false;
  fakeModerationAllowed: false;
  fakeGiftAllowed: false;
  fakeSuccessAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;

const backendGates: readonly StreamFoundationGateId[] = [
  "identity_session_gate",
  "locale_error_gate",
  "stream_kernel_gateway_gate",
  "observability_audit_gate",
];

const liveGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "realtime_room_gate",
  "live_lifecycle_gate",
  "media_storage_cdn_gate",
];

const mediaGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "provider_secret_gate",
  "media_storage_cdn_gate",
  "shorts_moderation_feed_gate",
];

const adminGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "moderation_admin_gate",
  "launch_readiness_gate",
];

const businessGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "business_merchant_catalog_gate",
  "creator_business_verification_gate",
  "moderation_admin_gate",
];

const giftMonetizationGates: readonly StreamFoundationGateId[] = [
  ...backendGates,
  "wallet_coin_gift_last_stage_gate",
  "provider_secret_gate",
  "launch_readiness_gate",
];

const field = (
  name: string,
  kind: StreamFoundationWriteCommandFieldKind,
  requiredLater: boolean,
): StreamFoundationWriteCommandField => ({
  name,
  kind,
  requiredLater,
  piiAllowedInStagingNow: false,
  secretMaterialAllowedNow: false,
});

function contract(input: Omit<StreamFoundationWriteCommandContract,
  | "acceptsCommandNow"
  | "routeMountAllowedNow"
  | "runtimeExecutionAllowedNow"
  | "databaseWriteAllowedNow"
  | "providerCallAllowedNow"
  | "mediaStorageWriteAllowedNow"
  | "realtimePublishAllowedNow"
  | "walletRuntimeMutationAllowedNow"
  | "messengerRuntimeMutationAllowedNow"
  | "giftsPaymentsRuntimeMutationAllowedNow"
  | "fakeLiveAllowed"
  | "fakeUploadAllowed"
  | "fakePublishAllowed"
  | "fakeModerationAllowed"
  | "fakeGiftAllowed"
  | "fakeSuccessAllowed"
  | "safety"
>): StreamFoundationWriteCommandContract {
  return {
    ...input,
    acceptsCommandNow: false,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    realtimePublishAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeLiveAllowed: false,
    fakeUploadAllowed: false,
    fakePublishAllowed: false,
    fakeModerationAllowed: false,
    fakeGiftAllowed: false,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export const STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS: readonly StreamFoundationWriteCommandContract[] = [
  contract({
    commandId: "stream_start_live_session_command",
    kind: "live_lifecycle",
    targetSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    action: "start_live",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.start_live.backend_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: false,
    providerGateRequiredLater: true,
    walletGiftLastStageRequiredLater: false,
    requiredGates: liveGates,
    payloadFields: [
      field("mode", "string", true),
      field("title", "string", false),
      field("visibility", "string", true),
      field("mediaProfile", "object_reference", true),
    ],
  }),
  contract({
    commandId: "stream_stop_live_session_command",
    kind: "live_lifecycle",
    targetSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    action: "stop_live",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.stop_live.backend_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: false,
    providerGateRequiredLater: false,
    walletGiftLastStageRequiredLater: false,
    requiredGates: liveGates,
    payloadFields: [field("roomId", "string", true), field("endedBy", "string", true)],
  }),
  contract({
    commandId: "stream_live_heartbeat_command",
    kind: "live_presence",
    targetSurfaces: ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file"],
    action: "send_live_heartbeat",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.live_heartbeat.backend_required",
    idempotencyKeyRequiredLater: false,
    userSessionRequiredLater: true,
    adminGateRequiredLater: false,
    providerGateRequiredLater: false,
    walletGiftLastStageRequiredLater: false,
    requiredGates: ["identity_session_gate", "realtime_room_gate", "live_lifecycle_gate", "observability_audit_gate"],
    payloadFields: [field("roomId", "string", true), field("clientSequence", "number", true)],
  }),
  contract({
    commandId: "stream_short_media_upload_command",
    kind: "media_upload",
    targetSurfaces: ["shorts_creator"],
    action: "upload_short_media",
    status: "blocked_provider_not_configured",
    safeCode: "STREAM_PROVIDER_NOT_CONFIGURED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.short_media_upload.provider_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: false,
    providerGateRequiredLater: true,
    walletGiftLastStageRequiredLater: false,
    requiredGates: mediaGates,
    payloadFields: [
      field("draftId", "string", true),
      field("assetReference", "object_reference", true),
      field("durationMs", "number", true),
      field("effectRefs", "string_array", false),
    ],
  }),
  contract({
    commandId: "stream_short_publish_command",
    kind: "short_publish",
    targetSurfaces: ["shorts_creator"],
    action: "publish_short",
    status: "blocked_backend_common_missing",
    safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.short_publish.backend_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: true,
    providerGateRequiredLater: true,
    walletGiftLastStageRequiredLater: false,
    requiredGates: [...mediaGates, "moderation_admin_gate"],
    payloadFields: [
      field("draftId", "string", true),
      field("caption", "string", false),
      field("musicReference", "object_reference", false),
      field("privacy", "string", true),
    ],
  }),
  contract({
    commandId: "stream_content_report_command",
    kind: "moderation_report",
    targetSurfaces: ["moderation_admin", "shorts_feed", "live_single", "business_stream"],
    action: "report_content",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.write.report_content.admin_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: true,
    providerGateRequiredLater: false,
    walletGiftLastStageRequiredLater: false,
    requiredGates: adminGates,
    payloadFields: [field("contentId", "string", true), field("reasonCode", "string", true), field("evidenceReference", "object_reference", false)],
  }),
  contract({
    commandId: "stream_business_product_attach_command",
    kind: "business_catalog_attach",
    targetSurfaces: ["business_stream"],
    action: "request_business_product_attach",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.write.business_product_attach.admin_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: true,
    providerGateRequiredLater: false,
    walletGiftLastStageRequiredLater: false,
    requiredGates: businessGates,
    payloadFields: [field("businessAccountId", "string", true), field("productId", "string", true), field("roomDraftId", "string", true)],
  }),
  contract({
    commandId: "stream_creator_verification_request_command",
    kind: "creator_verification",
    targetSurfaces: ["creator_profile"],
    action: "request_creator_verification",
    status: "blocked_admin_gate_missing",
    safeCode: "STREAM_ADMIN_GATE_REQUIRED",
    severity: "review_required",
    safeMessageKey: "stream.foundation.write.creator_verification.admin_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: true,
    providerGateRequiredLater: false,
    walletGiftLastStageRequiredLater: false,
    requiredGates: ["identity_session_gate", "creator_business_verification_gate", "moderation_admin_gate", "observability_audit_gate"],
    payloadFields: [field("creatorId", "string", true), field("verificationKind", "string", true), field("documentReference", "object_reference", false)],
  }),
  contract({
    commandId: "stream_gift_send_boundary_command",
    kind: "wallet_gift_boundary",
    targetSurfaces: ["wallet_gift_boundary", "live_single", "business_stream"],
    action: "request_gift_send",
    status: "blocked_provider_not_configured",
    safeCode: "STREAM_PROVIDER_NOT_CONFIGURED",
    severity: "blocked",
    safeMessageKey: "stream.foundation.write.gift_send.payment_monetization_provider_required",
    idempotencyKeyRequiredLater: true,
    userSessionRequiredLater: true,
    adminGateRequiredLater: true,
    providerGateRequiredLater: true,
    walletGiftLastStageRequiredLater: false,
    requiredGates: giftMonetizationGates,
    payloadFields: [
      field("roomId", "string", true),
      field("giftId", "string", true),
      field("coinAmount", "number", true),
      field("recipientUserId", "string", true),
      field("paymentRail", "string", true),
      field("monthlyPayoutPolicy", "object_reference", true),
    ],
  }),
] as const;

export function getStreamFoundationWriteCommandContracts(): readonly StreamFoundationWriteCommandContract[] {
  return STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS;
}

export function getStreamFoundationWriteCommandContract(commandId: StreamFoundationWriteCommandId): StreamFoundationWriteCommandContract | undefined {
  return STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS.find((entry) => entry.commandId === commandId);
}

export function getStreamFoundationWriteCommandContractForSurfaceAction(
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
): StreamFoundationWriteCommandContract | undefined {
  return STREAM_FOUNDATION_WRITE_COMMAND_CONTRACTS.find((entry) => entry.action === action && entry.targetSurfaces.includes(surface));
}

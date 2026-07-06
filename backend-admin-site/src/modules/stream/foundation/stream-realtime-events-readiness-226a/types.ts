export const STREAM_REALTIME_EVENTS_READINESS_226A_VERSION = "BACKEND-STREAM-REALTIME-EVENTS-226A" as const;

export const STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL =
  "I_APPROVE_226A_STREAM_REALTIME_EVENTS_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export type StreamRealtimeEventsArtifact226A =
  | "225b_rooms_lifecycle_final_handoff_clean"
  | "host_event_boundary_visible"
  | "viewer_event_boundary_visible"
  | "cohost_event_boundary_visible"
  | "battle_event_boundary_visible"
  | "chat_reaction_event_boundary_visible"
  | "moderation_event_boundary_visible"
  | "admin_realtime_evidence_visible";

export type StreamRealtimeEventsSurface226A =
  | "host_room_events"
  | "viewer_room_events"
  | "cohost_room_events"
  | "battle_room_events"
  | "chat_reaction_events"
  | "moderation_events"
  | "admin_realtime_evidence"
  | "future_exact_approval_reference";

export type StreamRealtimeEventsSafety226A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous225BRequired: true;
  realtimeEmitExecuted: false;
  socketRuntimeBindingExecuted: false;
  socketNamespaceRuntimeMounted: false;
  roomRuntimeStateMutationExecuted: false;
  roomRuntimeCreateExecuted: false;
  roomRuntimeJoinExecuted: false;
  roomRuntimeLeaveExecuted: false;
  roomRuntimeEndExecuted: false;
  mediaRuntimeStarted: false;
  providerRealtimeCallExecuted: false;
  providerRoomCallExecuted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  adminRuntimeToggleExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  giftSendExecutionExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  fakeEventSuccessAllowed: false;
  fakeLiveSuccessAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureRealtimeEmitRequiresSeparateApproval: true;
  futureSocketRuntimeBindingRequiresSeparateApproval: true;
  futureRoomStateMutationRequiresSeparateApproval: true;
  futureProviderRealtimeCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamRealtimeEventsInput226A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "realtime_events_readiness_index_only" | "disabled";
  acknowledged225BStage?: "225B_rooms_lifecycle_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226A[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226A[];
  operatorNote?: string;
}>;

export type StreamRealtimeEventsBlockedCode226A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_225b_required"
  | "evidence_references_required"
  | "required_artifacts_required"
  | "required_surfaces_required"
  | "missing_required_artifact"
  | "missing_required_surface"
  | "raw_secret_or_runtime_value_rejected";

export type StreamRealtimeEventsBlocked226A = Readonly<{
  ok: false;
  version: typeof STREAM_REALTIME_EVENTS_READINESS_226A_VERSION;
  status: "stream_realtime_events_readiness_blocked_without_runtime_enablement";
  code: StreamRealtimeEventsBlockedCode226A;
  blockedReason: string;
  readinessPrepared: false;
  providerNotConfiguredVisible: true;
  realtimeEmitExecuted: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  providerRuntimeEnabled: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamRealtimeEventsSafety226A;
}>;

export type StreamRealtimeEventsEnvelope226A = Readonly<{
  contract: "stream.realtime.events-readiness.safe_disabled.v1";
  version: typeof STREAM_REALTIME_EVENTS_READINESS_226A_VERSION;
  previousStageRequired: "225B_rooms_lifecycle_final_handoff_clean";
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226A[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226A[];
  evidenceReferences: readonly string[];
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  hostEventBoundaryVisible: true;
  viewerEventBoundaryVisible: true;
  cohostEventBoundaryVisible: true;
  battleEventBoundaryVisible: true;
  chatReactionEventBoundaryVisible: true;
  moderationEventBoundaryVisible: true;
  adminRealtimeEvidenceVisible: true;
  socketRuntimeBindingBlockedUntilExactApproval: true;
  realtimeEmitBlockedUntilExactApproval: true;
  roomStateMutationBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureRealtimeEmitRequiresSeparateApproval: true;
  futureSocketRuntimeBindingRequiresSeparateApproval: true;
  futureRoomStateMutationRequiresSeparateApproval: true;
  futureProviderRealtimeCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
  safety: StreamRealtimeEventsSafety226A;
}>;

export type StreamRealtimeEventsPrepared226A = Readonly<{
  ok: true;
  status: "stream_realtime_events_readiness_ready_without_runtime_enablement";
  envelope: StreamRealtimeEventsEnvelope226A;
}>;

export type StreamRealtimeEventsResult226A =
  | StreamRealtimeEventsPrepared226A
  | StreamRealtimeEventsBlocked226A;

export type StreamRealtimeEventsSnapshot226A = Readonly<{
  version: typeof STREAM_REALTIME_EVENTS_READINESS_226A_VERSION;
  type: "stream_realtime_events_readiness_index";
  previousStageRequired: "225B rooms lifecycle final handoff clean plus TypeScript clean on owner machine";
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  hostEventBoundaryVisible: true;
  viewerEventBoundaryVisible: true;
  cohostEventBoundaryVisible: true;
  battleEventBoundaryVisible: true;
  chatReactionEventBoundaryVisible: true;
  moderationEventBoundaryVisible: true;
  adminRealtimeEvidenceVisible: true;
  socketRuntimeBindingBlockedUntilExactApproval: true;
  realtimeEmitBlockedUntilExactApproval: true;
  roomStateMutationBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226A[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226A[];
  safety: StreamRealtimeEventsSafety226A;
}>;

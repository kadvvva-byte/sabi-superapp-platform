export const STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION = "BACKEND-STREAM-REALTIME-EVENTS-226B" as const;

export const STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL =
  "I_APPROVE_226B_STREAM_REALTIME_EVENTS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export type StreamRealtimeEventsArtifact226B =
  | "226a_realtime_events_readiness_clean"
  | "225b_rooms_lifecycle_final_handoff_locked"
  | "host_event_boundary_locked"
  | "viewer_event_boundary_locked"
  | "cohost_event_boundary_locked"
  | "battle_event_boundary_locked"
  | "chat_reaction_event_boundary_locked"
  | "moderation_event_boundary_locked"
  | "admin_realtime_evidence_locked";

export type StreamRealtimeEventsSurface226B =
  | "host_room_events"
  | "viewer_room_events"
  | "cohost_room_events"
  | "battle_room_events"
  | "chat_reaction_events"
  | "moderation_events"
  | "admin_realtime_evidence"
  | "future_exact_approval_reference";

export type StreamRealtimeEventsSafety226B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous226ARequired: true;
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

export type StreamRealtimeEventsInput226B = Readonly<{
  ownerApproval?: string;
  handoffMode?: "realtime_events_final_handoff_only" | "disabled";
  acknowledged226AStage?: "226A_realtime_events_readiness_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226B[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226B[];
  operatorNote?: string;
}>;

export type StreamRealtimeEventsBlockedCode226B =
  | "owner_approval_required"
  | "handoff_mode_disabled"
  | "previous_226a_required"
  | "evidence_references_required"
  | "required_artifacts_required"
  | "required_surfaces_required"
  | "missing_required_artifact"
  | "missing_required_surface"
  | "raw_secret_or_runtime_value_rejected";

export type StreamRealtimeEventsBlocked226B = Readonly<{
  ok: false;
  version: typeof STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION;
  status: "stream_realtime_events_final_handoff_blocked_without_runtime_enablement";
  code: StreamRealtimeEventsBlockedCode226B;
  blockedReason: string;
  handoffPrepared: false;
  providerNotConfiguredVisible: true;
  realtimeEmitExecuted: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  providerRuntimeEnabled: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamRealtimeEventsSafety226B;
}>;

export type StreamRealtimeEventsEnvelope226B = Readonly<{
  contract: "stream.realtime.events-final-handoff.safe_disabled.v1";
  version: typeof STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION;
  previousStageRequired: "226A_realtime_events_readiness_clean";
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226B[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226B[];
  evidenceReferences: readonly string[];
  handoffPrepared: true;
  providerNotConfiguredVisible: true;
  realtimeEventsReadiness226ALocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  hostEventBoundaryLocked: true;
  viewerEventBoundaryLocked: true;
  cohostEventBoundaryLocked: true;
  battleEventBoundaryLocked: true;
  chatReactionEventBoundaryLocked: true;
  moderationEventBoundaryLocked: true;
  adminRealtimeEvidenceLocked: true;
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
  safety: StreamRealtimeEventsSafety226B;
}>;

export type StreamRealtimeEventsPrepared226B = Readonly<{
  ok: true;
  status: "stream_realtime_events_final_handoff_ready_without_runtime_enablement";
  envelope: StreamRealtimeEventsEnvelope226B;
}>;

export type StreamRealtimeEventsResult226B =
  | StreamRealtimeEventsPrepared226B
  | StreamRealtimeEventsBlocked226B;

export type StreamRealtimeEventsSnapshot226B = Readonly<{
  version: typeof STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION;
  type: "stream_realtime_events_final_handoff";
  previousStageRequired: "226A realtime events readiness clean plus TypeScript clean on owner machine";
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  realtimeEventsReadiness226ALocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  hostEventBoundaryLocked: true;
  viewerEventBoundaryLocked: true;
  cohostEventBoundaryLocked: true;
  battleEventBoundaryLocked: true;
  chatReactionEventBoundaryLocked: true;
  moderationEventBoundaryLocked: true;
  adminRealtimeEvidenceLocked: true;
  socketRuntimeBindingBlockedUntilExactApproval: true;
  realtimeEmitBlockedUntilExactApproval: true;
  roomStateMutationBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  requiredArtifacts: readonly StreamRealtimeEventsArtifact226B[];
  requiredSurfaces: readonly StreamRealtimeEventsSurface226B[];
  safety: StreamRealtimeEventsSafety226B;
}>;

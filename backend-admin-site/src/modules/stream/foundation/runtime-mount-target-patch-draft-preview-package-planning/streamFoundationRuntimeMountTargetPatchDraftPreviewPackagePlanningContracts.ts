export const STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION =
  "BACKEND-STREAM-FOUNDATION-144B" as const;

export type StreamFoundation144BPreviewPlanningContractId =
  | "target_patch_draft_preview_package"
  | "proposed_target_file_snapshot"
  | "proposed_diff_preview_text"
  | "insertion_marker_evidence"
  | "duplicate_mount_evidence"
  | "auth_boundary_evidence"
  | "blocked_route_evidence"
  | "rollback_preview"
  | "compile_gate"
  | "owner_approval_gate";

export type StreamFoundation144BTargetCandidateId =
  | "src_app_ts"
  | "src_server_ts"
  | "stream_index_ts"
  | "admin_routes_ts"
  | "stream_routes_ts"
  | "stream_live_routes_ts";

export interface StreamFoundation144BProposedTargetFileSnapshotItem {
  readonly id: StreamFoundation144BTargetCandidateId;
  readonly path: string;
  readonly role: string;
  readonly snapshotStatus: "planned_source_only_not_read_now";
  readonly futureSnapshotEvidenceRequired: readonly string[];
  readonly selectedForPatchNow: false;
  readonly targetFileReadNow: false;
  readonly sourceTargetWriteAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
}

export interface StreamFoundation144BTargetPatchDraftPreviewPackageContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "target_patch_draft_preview_package";
  readonly sourceOnlyContract: true;
  readonly status: "target_patch_draft_preview_package_planned_source_only";
  readonly previewPackageSections: readonly [
    "proposed_target_file_snapshot",
    "proposed_diff_preview_text",
    "insertion_marker_evidence",
    "duplicate_mount_evidence",
    "auth_boundary_evidence",
    "blocked_route_evidence",
    "rollback_preview",
    "compile_gate",
    "owner_approval_gate"
  ];
  readonly previewPackageCreatedNow: false;
  readonly previewPackageRenderedNow: false;
  readonly proposedDiffAppliedNow: false;
  readonly sourceTargetWriteAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation144BProposedTargetFileSnapshotContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "proposed_target_file_snapshot";
  readonly sourceOnlyContract: true;
  readonly status: "proposed_target_file_snapshot_planned_source_only";
  readonly snapshotItems: readonly StreamFoundation144BProposedTargetFileSnapshotItem[];
  readonly targetSnapshotReadNow: false;
  readonly finalSelectedTargetNow: null;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
}

export interface StreamFoundation144BProposedDiffPreviewTextContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "proposed_diff_preview_text";
  readonly sourceOnlyContract: true;
  readonly status: "proposed_diff_preview_text_planned_source_only";
  readonly requiredDiffPreviewEvidence: readonly [
    "target_file_hash_before_diff",
    "target_file_snapshot_excerpt",
    "selected_anchor",
    "before_context",
    "after_context",
    "proposed_diff_text",
    "no_applied_diff"
  ];
  readonly diffPreviewTextGeneratedNow: false;
  readonly proposedDiffAppliedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
}

export interface StreamFoundation144BInsertionMarkerEvidenceContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "insertion_marker_evidence";
  readonly sourceOnlyContract: true;
  readonly status: "insertion_marker_evidence_planned_source_only";
  readonly requiredMarkerEvidence: readonly [
    "exact_anchor",
    "line_number_or_unique_marker",
    "before_context",
    "after_context",
    "route_order_context",
    "auth_boundary_context",
    "blocked_route_context"
  ];
  readonly insertionMarkerEvidenceCapturedNow: false;
  readonly markerWriteAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
}

export interface StreamFoundation144BDuplicateMountEvidenceContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "duplicate_mount_evidence";
  readonly sourceOnlyContract: true;
  readonly status: "duplicate_mount_evidence_planned_source_only";
  readonly requiredDuplicateMountEvidence: readonly [
    "existing_stream_mount_inventory",
    "existing_live_start_route_inventory",
    "existing_live_stop_route_inventory",
    "existing_live_heartbeat_route_inventory",
    "duplicate_mount_signature_result"
  ];
  readonly duplicateMountEvidenceCapturedNow: false;
  readonly duplicateMountAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation144BAuthBoundaryEvidenceContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "auth_boundary_evidence";
  readonly sourceOnlyContract: true;
  readonly status: "auth_boundary_evidence_planned_source_only";
  readonly requiredAuthBoundaryEvidence: readonly [
    "auth_middleware_anchor",
    "protected_route_group",
    "admin_token_required",
    "unauthorized_expected_block",
    "no_auth_bypass"
  ];
  readonly authBoundaryEvidenceCapturedNow: false;
  readonly authBypassAllowedNow: false;
  readonly authRouteOrderChangeAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
}

export interface StreamFoundation144BBlockedRouteEvidenceContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "blocked_route_evidence";
  readonly sourceOnlyContract: true;
  readonly status: "blocked_route_evidence_planned_source_only";
  readonly routeIds: readonly ["stream_live_start", "stream_live_stop", "stream_live_heartbeat"];
  readonly expectedStatusCodeBeforeRuntimeMount: 423;
  readonly controlledJsonEnvelopeRequired: true;
  readonly providerNotConfiguredOrSafeDisabledRequired: true;
  readonly liveWriteRoutesMustRemain423Blocked: true;
  readonly blockedRouteEvidenceCapturedNow: false;
  readonly liveSuccessAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly targetRouteWriteAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation144BRollbackPreviewContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "rollback_preview";
  readonly sourceOnlyContract: true;
  readonly status: "rollback_preview_planned_source_only";
  readonly requiredRollbackPreviewEvidence: readonly [
    "target_file_hashes_before_preview",
    "reverse_diff_preview_text",
    "post_rollback_compile_expectation",
    "post_rollback_blocked_route_expectation",
    "no_rollback_execution_now"
  ];
  readonly rollbackPreviewTextGeneratedNow: false;
  readonly rollbackExecutionAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly backendRestartAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
}

export interface StreamFoundation144BCompileGateContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "compile_gate";
  readonly sourceOnlyContract: true;
  readonly status: "compile_gate_planned_source_only";
  readonly requiredCompileChecks: readonly [
    "tsc_no_emit",
    "scope_verification",
    "target_reference_verification",
    "migration_verification",
    "safety_fragment_scan",
    "forbidden_runtime_scan"
  ];
  readonly compileRunBy144BNow: false;
  readonly sourceModificationAllowedNow: false;
  readonly runtimeHttpAllowedNow: false;
  readonly runtimePostAllowedNow: false;
  readonly backendRestartAllowedNow: false;
}

export interface StreamFoundation144BOwnerApprovalGateContract {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly contractId: "owner_approval_gate";
  readonly sourceOnlyContract: true;
  readonly status: "owner_approval_gate_planned_source_only";
  readonly exactOwnerApprovalRequiredBeforePreviewPackageBuild: true;
  readonly exactOwnerApprovalRequiredBeforeTargetPatchWrite: true;
  readonly exactOwnerApprovalRequiredBeforeRuntimeMount: true;
  readonly exactOwnerApprovalRequiredBeforePostMountSmoke: true;
  readonly previewPackageBuildAllowedNow: false;
  readonly targetPatchAllowedNow: false;
  readonly runtimeMountAllowedNow: false;
  readonly routeBehaviorChangeAllowedNow: false;
  readonly postMountSmokeAllowedNow: false;
  readonly fakeSuccessAllowedNow: false;
}

export interface StreamFoundation144BRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot {
  readonly version: typeof STREAM_FOUNDATION_144B_RUNTIME_MOUNT_TARGET_PATCH_DRAFT_PREVIEW_PACKAGE_PLANNING_VERSION;
  readonly stage: "controlled_runtime_mount_target_patch_draft_preview_package_planning_source_only";
  readonly status: "runtime_mount_target_patch_draft_preview_package_planning_ready";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-144A";
  readonly ownerApprovalAccepted: true;
  readonly ownerApprovalText: string;
  readonly postVerificationHandoffEvidence144A: {
    readonly targetPatchPackageDraftPlanningClosed: true;
    readonly closedDraftPlanningArtifacts: 2;
    readonly targetPatchDraftPreviewPackagePlanningAllowedNext: true;
    readonly tscExitCode: 0;
    readonly sourceModificationPerformed: 0;
    readonly sourceTargetWritePerformed: 0;
    readonly runtimeHttpPerformed: 0;
    readonly runtimePostPerformed: 0;
    readonly runtimeDbReadPerformed: 0;
    readonly runtimeDbWritePerformed: 0;
    readonly providerCallPerformed: 0;
    readonly providerSecretReadPerformed: 0;
    readonly realtimeSocketOpenPerformed: 0;
    readonly realtimeBroadcastPerformed: 0;
    readonly moderationBypassPerformed: 0;
    readonly runtimeMountPerformed: 0;
    readonly routeBehaviorChangePerformed: 0;
    readonly targetRouteWritePerformed: 0;
    readonly rollbackExecutionPerformed: 0;
    readonly postMountSmokePerformed: 0;
    readonly walletMutationPerformed: 0;
    readonly paymentAuthorizationPerformed: 0;
    readonly monthlyPayoutPerformed: 0;
    readonly moneyMovementPerformed: 0;
    readonly fakeSuccessAllowed: false;
  };
  readonly previewPackage: StreamFoundation144BTargetPatchDraftPreviewPackageContract;
  readonly proposedTargetFileSnapshot: StreamFoundation144BProposedTargetFileSnapshotContract;
  readonly proposedDiffPreviewText: StreamFoundation144BProposedDiffPreviewTextContract;
  readonly insertionMarkerEvidence: StreamFoundation144BInsertionMarkerEvidenceContract;
  readonly duplicateMountEvidence: StreamFoundation144BDuplicateMountEvidenceContract;
  readonly authBoundaryEvidence: StreamFoundation144BAuthBoundaryEvidenceContract;
  readonly blockedRouteEvidence: StreamFoundation144BBlockedRouteEvidenceContract;
  readonly rollbackPreview: StreamFoundation144BRollbackPreviewContract;
  readonly compileGate: StreamFoundation144BCompileGateContract;
  readonly ownerApprovalGate: StreamFoundation144BOwnerApprovalGateContract;
  readonly requiredExactApprovalTextFor144C: string;
  readonly nextApprovalPolicy: {
    readonly exactApprovalRequiredBefore144C: true;
    readonly nextStageIsOpsOnlyCompileAndSafetyVerification: true;
    readonly sourceModificationAllowedFor144C: false;
    readonly appTsWriteAllowedFor144C: false;
    readonly serverTsWriteAllowedFor144C: false;
    readonly streamIndexWriteAllowedFor144C: false;
    readonly prismaSchemaWriteAllowedFor144C: false;
    readonly migrationAllowedFor144C: false;
    readonly backendRestartAllowedFor144C: false;
    readonly runtimeHttpAllowedFor144C: false;
    readonly runtimePostAllowedFor144C: false;
    readonly runtimeDbReadAllowedFor144C: false;
    readonly runtimeDbWriteAllowedFor144C: false;
    readonly providerCallAllowedFor144C: false;
    readonly providerSecretReadAllowedFor144C: false;
    readonly realtimeSocketOpenAllowedFor144C: false;
    readonly realtimeBroadcastAllowedFor144C: false;
    readonly moderationBypassAllowedFor144C: false;
    readonly runtimeMountAllowedFor144C: false;
    readonly routeBehaviorChangeAllowedFor144C: false;
    readonly targetRouteWriteAllowedFor144C: false;
    readonly rollbackExecutionAllowedFor144C: false;
    readonly postMountSmokeAllowedFor144C: false;
    readonly walletMutationAllowedFor144C: false;
    readonly paymentAuthorizationAllowedFor144C: false;
    readonly monthlyPayoutAllowedFor144C: false;
    readonly moneyMovementAllowedFor144C: false;
    readonly fakeSuccessAllowedFor144C: false;
  };
  readonly safety: {
    readonly sourceOnly144B: true;
    readonly targetWriteBy144B: false;
    readonly appTsChangeBy144B: false;
    readonly serverTsChangeBy144B: false;
    readonly streamIndexChangeBy144B: false;
    readonly prismaSchemaChangeBy144B: false;
    readonly migrationCreatedBy144B: false;
    readonly routeBehaviorChangeBy144B: false;
    readonly backendRestartBy144B: false;
    readonly runtimeHttpBy144B: false;
    readonly runtimePostBy144B: false;
    readonly runtimeDbReadBy144B: false;
    readonly runtimeDbWriteBy144B: false;
    readonly databaseReadBy144B: false;
    readonly databaseWriteBy144B: false;
    readonly providerCallBy144B: false;
    readonly providerSecretReadBy144B: false;
    readonly realtimeSocketOpenBy144B: false;
    readonly realtimeBroadcastBy144B: false;
    readonly moderationBypassBy144B: false;
    readonly runtimeMountBy144B: false;
    readonly targetRouteWriteBy144B: false;
    readonly rollbackExecutionBy144B: false;
    readonly postMountSmokeBy144B: false;
    readonly walletMutationBy144B: false;
    readonly paymentAuthorizationBy144B: false;
    readonly monthlyPayoutBy144B: false;
    readonly moneyMovementBy144B: false;
    readonly fakeSuccessBy144B: false;
  };
}

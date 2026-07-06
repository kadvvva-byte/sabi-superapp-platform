import type { StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus } from "../kernel-diagnostics-route-mount-source-patch-approval-package";

export const STREAM_FOUNDATION_139D_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_DRAFT_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-139D" as const;

export type StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStatus =
  | "route_mount_source_patch_draft_package_ready"
  | "route_mount_source_patch_draft_package_blocked";

export type StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageTargetKind =
  | "admin_diagnostics_route_source"
  | "admin_diagnostics_route_handler"
  | "admin_diagnostics_route_response_contract"
  | "admin_diagnostics_route_scope_guard"
  | "admin_diagnostics_route_redaction_guard"
  | "admin_diagnostics_route_mount_note";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageTargetFile {
  readonly targetKind: StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageTargetKind;
  readonly futureFilePath: string;
  readonly filePurpose: string;
  readonly allowedScope: "future controlled source patch only";
  readonly sourceWriteAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly appServerTouchAllowedNow: false;
  readonly databaseExecutionAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageCheck {
  readonly checkId: string;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStep {
  readonly stepId: string;
  readonly order: number;
  readonly description: string;
  readonly requiredBeforeFutureSourcePatch: true;
  readonly readyNow: boolean;
  readonly executionAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSafety {
  readonly sourcePatchDraftPackageBuiltNow: true;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousApprovalPackageRequired: true;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly generatedSourceTextReturned: false;
  readonly diagnosticsRouteRuntimeMountAllowedNow: false;
  readonly diagnosticsRouteRuntimeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
  readonly runtimeHttpRequestPerformedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageDecision {
  readonly decisionCode:
    | "route_mount_source_patch_draft_package_ready_for_future_final_review"
    | "route_mount_source_patch_draft_package_blocked_by_approval_package"
    | "route_mount_source_patch_draft_package_blocked_by_safety_check";
  readonly readyForFutureFinalReview: boolean;
  readonly sourcePatchAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139D_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PATCH_DRAFT_PACKAGE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousApprovalPackageStatus: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus;
  readonly sourcePatchDraftPackageBuiltNow: true;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly totalTargetFiles: number;
  readonly targetFilesReady: number;
  readonly totalSteps: number;
  readonly readySteps: number;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly generatedSourceTextReturned: false;
  readonly diagnosticsRouteRuntimeMountAllowedNow: false;
  readonly diagnosticsRouteRuntimeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly targetFiles: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageTargetFile[];
  readonly steps: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageStep[];
  readonly checks: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageDecision;
  readonly safety: StreamFoundationKernelDiagnosticsRouteMountSourcePatchDraftPackageSafety;
}

import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus } from "../kernel-diagnostics-route-mount-source-package-assembly";

export const STREAM_FOUNDATION_139G_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_PLAN_VERSION = "BACKEND-STREAM-FOUNDATION-139G" as const;

export type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus =
  | "route_mount_source_package_write_plan_ready"
  | "route_mount_source_package_write_plan_blocked";

export type StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTargetKind =
  | "diagnostics_admin_route_contract"
  | "diagnostics_admin_route_factory"
  | "diagnostics_admin_route_unmounted_smoke"
  | "diagnostics_admin_route_mount_readiness"
  | "diagnostics_admin_route_manifest";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTarget {
  readonly targetKind: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTargetKind;
  readonly targetId: string;
  readonly futureTargetPath: string;
  readonly writeAllowedNow: false;
  readonly includedInThisPatch: false;
  readonly sourceTextReturned: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCommand {
  readonly commandId: string;
  readonly commandKind:
    | "verify_foundation_scope"
    | "verify_no_stream_index_patch"
    | "verify_no_app_server_patch"
    | "verify_no_runtime_execution"
    | "prepare_future_source_write";
  readonly executableNow: false;
  readonly writesFilesNow: false;
  readonly mountsRouteNow: false;
  readonly requiresOwnerApproval: true;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCheck {
  readonly checkId: string;
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSafety {
  readonly writePlanBuiltNow: true;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousAssemblyRequired: true;
  readonly futureTargetPathsReturnedAsMetadataOnly: true;
  readonly commandsExecutableNow: false;
  readonly sourcePackageWriteAllowedNow: false;
  readonly sourcePackageWriteExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly sourceTextReturned: false;
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

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanDecision {
  readonly decisionCode:
    | "route_mount_source_package_write_plan_ready_for_future_owner_review"
    | "route_mount_source_package_write_plan_blocked_by_assembly"
    | "route_mount_source_package_write_plan_blocked_by_safety_check";
  readonly readyForFutureOwnerReview: boolean;
  readonly commandsExecutableNow: false;
  readonly sourcePackageWriteAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139G_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_SOURCE_PACKAGE_WRITE_PLAN_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly previousAssemblyStatus: StreamFoundationKernelDiagnosticsRouteMountSourcePackageAssemblyStatus;
  readonly writePlanBuiltNow: true;
  readonly totalTargets: number;
  readonly writeAllowedTargets: 0;
  readonly includedTargetsInThisPatch: 0;
  readonly sourceTextReturnedTargets: 0;
  readonly totalCommands: number;
  readonly executableCommands: 0;
  readonly commandsWritingFilesNow: 0;
  readonly commandsMountingRouteNow: 0;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly sourcePackageWriteAllowedNow: false;
  readonly sourcePackageWriteExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
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
  readonly targets: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanTarget[];
  readonly commands: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCommand[];
  readonly checks: readonly StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanCheck[];
  readonly decision: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanDecision;
  readonly safety: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWritePlanSafety;
}

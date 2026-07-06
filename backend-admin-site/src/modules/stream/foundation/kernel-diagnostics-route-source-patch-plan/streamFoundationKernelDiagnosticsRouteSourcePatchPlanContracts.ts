import type {
  StreamFoundationKernelDiagnosticsAdminRouteDefinition,
  StreamFoundationKernelDiagnosticsAdminRouteId,
  StreamFoundationKernelDiagnosticsAdminRoutePath,
} from "../kernel-diagnostics-admin-route";
import type { StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety } from "../kernel-diagnostics-route-mount-readiness-gate";

export const STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION = "BACKEND-STREAM-FOUNDATION-138N" as const;

export type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanId =
  | "stream_kernel_diagnostics_route_source_patch_plan"
  | "stream_kernel_diagnostics_route_source_scope_plan"
  | "stream_kernel_diagnostics_route_source_redaction_plan"
  | "stream_kernel_diagnostics_route_source_mount_boundary_plan";

export type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStatus =
  | "route_source_patch_plan_ready_review_required_later"
  | "route_source_patch_plan_blocked_by_mount_readiness_gate"
  | "route_source_patch_plan_blocked_by_safety_boundary"
  | "route_source_patch_plan_blocked_by_forbidden_target";

export type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetKind =
  | "foundation_contract"
  | "future_protected_admin_route_source"
  | "future_route_mount_entrypoint"
  | "forbidden_in_this_patch";

export type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath =
  | "src/modules/stream/foundation/**"
  | "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts"
  | "src/modules/stream/stream.module.ts"
  | "stream_module_index_entrypoint"
  | "application_server_entrypoint"
  | "admin_ui_source"
  | "wallet_runtime_source"
  | "messenger_runtime_source"
  | "prisma_schema_or_migration"
  | "environment_secret_file";

export type StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStepId =
  | "reuse_unmounted_factory_handlers"
  | "wrap_handlers_with_admin_auth"
  | "wrap_handlers_with_scope_guard"
  | "wrap_response_with_redaction_envelope"
  | "keep_provider_wallet_money_disabled"
  | "require_separate_mount_approval"
  | "keep_stream_module_index_out_of_this_patch"
  | "keep_app_server_out_of_this_patch";

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety extends StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety {
  readonly routeSourcePatchPlanOnly: true;
  readonly routeSourcePatchCreatedNow: false;
  readonly futureProtectedRouteSourceCreatedNow: false;
  readonly futureRouteMountEntrypointCreatedNow: false;
  readonly sourcePatchForStreamIndexCreatedNow: false;
  readonly appServerPatchCreatedNow: false;
  readonly adminUiPatchCreatedNow: false;
  readonly walletRuntimePatchCreatedNow: false;
  readonly messengerRuntimePatchCreatedNow: false;
  readonly prismaPatchCreatedNow: false;
  readonly envPatchCreatedNow: false;
  readonly routeModuleImportedExpressNow: false;
  readonly protectedAdminMiddlewareBoundNow: false;
  readonly rawSecretRedactionRequiredLater: true;
  readonly separateOwnerApprovalRequiredForActualMount: true;
}

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTarget {
  readonly targetPath: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetPath;
  readonly targetKind: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTargetKind;
  readonly includedInThisPatch: boolean;
  readonly allowedInThisPatch: boolean;
  readonly requiresSeparateApprovalLater: boolean;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStep {
  readonly stepId: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStepId;
  readonly ordered: number;
  readonly requiredForFutureMount: true;
  readonly completedInThisPatch: false;
  readonly plannedOnlyNow: true;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly path: StreamFoundationKernelDiagnosticsAdminRoutePath;
  readonly definition: StreamFoundationKernelDiagnosticsAdminRouteDefinition;
  readonly futureSourceHandlerName: string;
  readonly futureProtectedRouteMountAllowedAfterApproval: boolean;
  readonly mountedNow: false;
  readonly sourceCreatedNow: false;
  readonly returnsRawSecrets: false;
  readonly performsProviderCall: false;
  readonly performsDatabaseExecution: false;
  readonly performsWalletMutation: false;
  readonly performsMoneyMovement: false;
}

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION;
  readonly planId: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanId;
  readonly status: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly streamIndexPatchIncluded: false;
  readonly sourcePatchCreatedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly futureSourcePatchReviewReady: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly routeItems: readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanRouteItem[];
  readonly routeItemCount: number;
  readonly targets: readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanTarget[];
  readonly forbiddenTargetsIncluded: 0;
  readonly steps: readonly StreamFoundationKernelDiagnosticsRouteSourcePatchPlanStep[];
  readonly plannedStepCount: number;
  readonly completedStepCount: 0;
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
  readonly safety: StreamFoundationKernelDiagnosticsRouteSourcePatchPlanSafety;
}

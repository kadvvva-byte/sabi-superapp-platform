import {
  getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_SAFETY,
} from "../kernel-diagnostics-route-source-draft-package";
import {
  STREAM_FOUNDATION_138Q_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_VERSION,
  type StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem,
  type StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSafety,
  type StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot,
  type StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSourceReview,
} from "./streamFoundationKernelDiagnosticsRouteSourceImplementationChecklistContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_SAFETY: StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_SAFETY,
  implementationChecklistOnly: true,
  routeSourceImplementationExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

function item(input: Omit<StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem, "safeMessageKey"> & { safeMessageKey?: string }): StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem {
  return { ...input, safeMessageKey: input.safeMessageKey ?? `stream.foundation.138q.${input.itemId}` };
}

function buildChecklistItems(): readonly StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem[] {
  const draft = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot();
  return [
    item({ itemId: "verify_draft_package_ready", passed: draft.readyForDraftPackageReview === true, blocking: draft.readyForDraftPackageReview !== true, expected: "draft package ready for review", observed: String(draft.readyForDraftPackageReview), safeCode: "draft_package_ready" }),
    item({ itemId: "verify_foundation_scope_only", passed: draft.patchScope === "src/modules/stream/foundation/** only", blocking: draft.patchScope !== "src/modules/stream/foundation/** only", expected: "foundation-only scope", observed: draft.patchScope, safeCode: "foundation_scope_only" }),
    item({ itemId: "verify_no_stream_index_patch", passed: draft.streamIndexPatchIncluded === false, blocking: draft.streamIndexPatchIncluded, expected: "no stream index patch", observed: String(draft.streamIndexPatchIncluded), safeCode: "no_stream_index_patch" }),
    item({ itemId: "verify_no_app_server_patch", passed: draft.appServerPatchIncluded === false, blocking: draft.appServerPatchIncluded, expected: "no app/server patch", observed: String(draft.appServerPatchIncluded), safeCode: "no_app_server_patch" }),
    item({ itemId: "verify_no_route_mount", passed: draft.routeMountPerformed === false && draft.protectedRouteRegisteredNow === false, blocking: draft.routeMountPerformed || draft.protectedRouteRegisteredNow, expected: "no route mount", observed: `${String(draft.routeMountPerformed)}:${String(draft.protectedRouteRegisteredNow)}`, safeCode: "no_route_mount" }),
    item({ itemId: "verify_no_runtime_http", passed: draft.runtimeHttpRequestsPerformed === 0, blocking: draft.runtimeHttpRequestsPerformed !== 0, expected: "no runtime HTTP", observed: String(draft.runtimeHttpRequestsPerformed), safeCode: "no_runtime_http" }),
    item({ itemId: "verify_no_database_execution", passed: draft.databaseExecutionPerformed === 0, blocking: draft.databaseExecutionPerformed !== 0, expected: "no database execution", observed: String(draft.databaseExecutionPerformed), safeCode: "no_database_execution" }),
    item({ itemId: "verify_no_provider_call", passed: draft.providerCallsPerformed === 0, blocking: draft.providerCallsPerformed !== 0, expected: "no provider calls", observed: String(draft.providerCallsPerformed), safeCode: "no_provider_call" }),
    item({ itemId: "verify_no_wallet_mutation", passed: draft.walletMutationPerformed === 0, blocking: draft.walletMutationPerformed !== 0, expected: "no Wallet mutation", observed: String(draft.walletMutationPerformed), safeCode: "no_wallet_mutation" }),
    item({ itemId: "verify_no_money_movement", passed: draft.moneyMovementPerformed === 0 && draft.paymentAuthorizationPerformed === 0 && draft.monthlyPayoutPerformed === 0, blocking: draft.moneyMovementPerformed !== 0 || draft.paymentAuthorizationPerformed !== 0 || draft.monthlyPayoutPerformed !== 0, expected: "no money movement", observed: `${draft.moneyMovementPerformed}:${draft.paymentAuthorizationPerformed}:${draft.monthlyPayoutPerformed}`, safeCode: "no_money_movement" }),
    item({ itemId: "verify_no_raw_secrets", passed: draft.rawSecretsReturned === 0 && draft.mobileProviderKeysAllowed === false, blocking: draft.rawSecretsReturned !== 0 || draft.mobileProviderKeysAllowed, expected: "no raw secrets/mobile provider keys", observed: `${draft.rawSecretsReturned}:${String(draft.mobileProviderKeysAllowed)}`, safeCode: "no_raw_secrets" }),
    item({ itemId: "verify_no_fake_success", passed: draft.fakeSuccessAllowed === false, blocking: draft.fakeSuccessAllowed, expected: "no fake success", observed: String(draft.fakeSuccessAllowed), safeCode: "no_fake_success" }),
  ] as const;
}

function buildSourceReviews(checklistItems: readonly StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem[]): readonly StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSourceReview[] {
  const draft = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot();
  return draft.draftFiles.map((draftFile) => ({
    draftFile,
    futureTargetPath: draftFile.targetPath,
    checklistItems,
    includedInThisPatch: false,
    generatedNow: false,
    writtenNow: false,
    routeMountedNow: false,
    safeCode: `stream_kernel_diagnostics_route_source_implementation_checklist_${draftFile.fileId}_review_only`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceImplementationChecklist.${draftFile.fileId}.reviewOnly`,
  }));
}

export function getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot {
  const draft = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot();
  const checklistItems = buildChecklistItems();
  const sourceReviews = buildSourceReviews(checklistItems);
  const blockingChecklistItemCount = checklistItems.filter((check) => check.blocking).length;
  const readyForImplementationChecklistReview =
    blockingChecklistItemCount === 0 &&
    draft.readyForDraftPackageReview === true &&
    draft.draftFileCount === 5 &&
    draft.generatedDraftFileCount === 0 &&
    draft.readyForRouteSourcePatchNow === false;

  return {
    version: STREAM_FOUNDATION_138Q_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_VERSION,
    status: readyForImplementationChecklistReview ? "route_source_implementation_checklist_ready_for_review" : "route_source_implementation_checklist_blocked",
    patchScope: "src/modules/stream/foundation/** only",
    draftPackageVersion: draft.version,
    readyForImplementationChecklistReview,
    readyForRouteSourceImplementationNow: false,
    routeSourceImplementationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    checklistItems,
    checklistItemCount: checklistItems.length,
    passedChecklistItemCount: checklistItems.filter((check) => check.passed).length,
    blockingChecklistItemCount,
    sourceReviews,
    sourceReviewCount: sourceReviews.length,
    generatedSourceReviewCount: 0,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_SAFETY,
  };
}

import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifacts } from "./kernel-diagnostics-controlled-non-foundation-source-write-staged-package";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness } from "./kernel-diagnostics-controlled-non-foundation-source-write-staged-package";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSmokeReport } from "./kernel-diagnostics-controlled-non-foundation-source-write-staged-package";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot } from "./kernel-diagnostics-controlled-non-foundation-source-write-staged-package";

export const stream140hStagedBackendFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageManifest = {
  version: "BACKEND-STREAM-FOUNDATION-140H-STAGED",
  stage: "controlled_non_foundation_source_write_staged_package_source_only",
  patchScope: "src/modules/stream/foundation/** only",
  sourceOnly: true,
  exactOwnerApprovalPhraseRequired: true,
  exactOwnerApprovalPhraseReceivedNow: false,
  genericNextAcceptedForStagingOnly: true,
  sourceWriteBlockedUntilExactApproval: true,
  nonFoundationFilesWrittenNow: false,
  streamIndexWrittenNow: false,
  appTsWrittenNow: false,
  serverTsWrittenNow: false,
  routeMountSourceWrittenNow: false,
  routeMountRuntimePerformedNow: false,
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
  readyForRuntimeMount: false,
  readyForRuntimeSmoke: false,
  readyForProductionBackend: false,
  getArtifacts: getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifacts,
  getSnapshot: getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot,
  getReadiness: getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness,
  getSmokeReport: getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSmokeReport,
} as const;

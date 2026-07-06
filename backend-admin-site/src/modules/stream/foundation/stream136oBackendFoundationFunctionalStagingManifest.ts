import { getStreamFoundationFunctionalCoverageSnapshot } from "./services";

export const STREAM_136O_BACKEND_FOUNDATION_FUNCTIONAL_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136O" as const;

export type Stream136OBackendFoundationFunctionalStagingManifest = Readonly<{
  stage: typeof STREAM_136O_BACKEND_FOUNDATION_FUNCTIONAL_STAGING_VERSION;
  mode: "local_staging_functional_foundation";
  foundationGoal: "all_known_stream_mobile_actions_are_handled_by_backend_foundation_service";
  functionCoveragePercent: 100;
  routeMountNow: false;
  appServerTouchedNow: false;
  databaseWriteNow: false;
  providerCallsNow: false;
  fakeSuccessNow: false;
  walletMessengerMutationNow: false;
  files: readonly string[];
  nextStage: "BACKEND-STREAM-FOUNDATION-136P auth_rate_limit_audit_guards_functional_staging";
}>;

export function getStream136OBackendFoundationFunctionalStagingManifest(): Stream136OBackendFoundationFunctionalStagingManifest {
  const coverage = getStreamFoundationFunctionalCoverageSnapshot();
  return {
    stage: STREAM_136O_BACKEND_FOUNDATION_FUNCTIONAL_STAGING_VERSION,
    mode: "local_staging_functional_foundation",
    foundationGoal: "all_known_stream_mobile_actions_are_handled_by_backend_foundation_service",
    functionCoveragePercent: coverage.coveragePercent,
    routeMountNow: coverage.safety.routeMountedNow,
    appServerTouchedNow: false,
    databaseWriteNow: coverage.safety.databaseWriteAllowedNow,
    providerCallsNow: coverage.safety.providerCallAllowedNow,
    fakeSuccessNow: coverage.safety.fakeLiveAllowed,
    walletMessengerMutationNow: coverage.safety.walletRuntimeMutationAllowedNow || coverage.safety.messengerRuntimeMutationAllowedNow,
    files: [
      "src/modules/stream/foundation/services/streamFoundationFunctionalServiceTypes.ts",
      "src/modules/stream/foundation/services/streamFoundationFunctionalRuntimeStore.ts",
      "src/modules/stream/foundation/services/streamFoundationFunctionalService.ts",
      "src/modules/stream/foundation/services/streamFoundationFunctionalApiPreview.ts",
      "src/modules/stream/foundation/services/index.ts",
    ],
    nextStage: "BACKEND-STREAM-FOUNDATION-136P auth_rate_limit_audit_guards_functional_staging",
  };
}

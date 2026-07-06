import { getStreamFoundationPostSmokeHandoffSnapshot } from "./kernel-diagnostics-post-smoke-handoff";

export const STREAM_140S_POST_SMOKE_HANDOFF_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140S",
  stage: "post_smoke_handoff_and_next_backend_route_foundation_batch_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousRuntimeEvidence: {
    stage: "BACKEND-STREAM-FOUNDATION-140R",
    typescriptExitCode: 0,
    readinessAuthenticatedGetStatus: 200,
    previewAuthenticatedGetStatus: 200,
  },
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    backendRestart: false,
    runtimeHttpBy140S: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationPostSmokeHandoffSnapshot(),
} as const;

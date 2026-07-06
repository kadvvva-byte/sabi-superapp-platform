import { getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot } from "./kernel-diagnostics-controlled-runtime-smoke-post-smoke-verification";

export const STREAM_140L_BACKEND_FOUNDATION_CONTROLLED_RUNTIME_SMOKE_POST_SMOKE_VERIFICATION_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140L",
  stage: "post_runtime_smoke_verification_source_only_handoff",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    backendRestart: false,
    runtimeHttpSmokeByThisStage: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot(),
} as const;

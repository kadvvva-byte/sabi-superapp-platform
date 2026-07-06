import { getStreamFoundationPostRuntimeVerificationHandoffSnapshot } from "./post-runtime-verification-handoff";

export const STREAM_141L_POST_RUNTIME_VERIFICATION_HANDOFF_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141L",
  stage: "post_runtime_verification_handoff_and_source_safety_freeze",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141K",
  freezeRouteBindingAsBlockedOnly: true,
  forbidden: {
    appTsChangeBy141L: false,
    serverTsChangeBy141L: false,
    streamIndexChangeBy141L: false,
    backendRestartBy141L: false,
    runtimeHttpBy141L: false,
    runtimePostBy141L: false,
    databaseWriteBy141L: false,
    providerCallBy141L: false,
    walletMutationBy141L: false,
    paymentAuthorizationBy141L: false,
    monthlyPayoutBy141L: false,
    moneyMovementBy141L: false,
    fakeSuccessBy141L: false,
  },
  snapshot: getStreamFoundationPostRuntimeVerificationHandoffSnapshot(),
} as const;

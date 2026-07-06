import { getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot } from "./live-write-binding-registry-verification";

export const STREAM_141B_LIVE_WRITE_BINDING_REGISTRY_VERIFICATION_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141B",
  stage: "source_only_binding_registry_verification",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141A",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141B: false,
    runtimePostBy141B: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot(),
} as const;

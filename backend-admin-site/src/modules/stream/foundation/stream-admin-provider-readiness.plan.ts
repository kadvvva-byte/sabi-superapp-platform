import {
  STREAM_ADMIN_PROVIDER_READINESS_VERSION,
  STREAM_ADMIN_READINESS_SURFACES,
  STREAM_PROVIDER_READINESS_GATES,
  buildStreamAdminProviderReadinessSnapshot,
  type StreamAdminProviderReadinessSnapshot,
} from "./stream-admin-provider-readiness.contracts";

export type StreamAdminProviderReadinessSourcePlan = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_READINESS_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141H";
  runtimeUseAllowedNow: false;
  adminUiTouchAllowedNow: false;
  routeMountAllowedNow: false;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  externalProviderCallAllowedNow: false;
  payoutProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretValuesReturned: false;
  providerGateCount: number;
  adminSurfaceCount: number;
  snapshot: StreamAdminProviderReadinessSnapshot;
  requiredBeforeAdminRuntime: readonly string[];
}>;

export const STREAM_ADMIN_PROVIDER_READINESS_SOURCE_PLAN: StreamAdminProviderReadinessSourcePlan = {
  version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141H",
  runtimeUseAllowedNow: false,
  adminUiTouchAllowedNow: false,
  routeMountAllowedNow: false,
  liveBillingEnabledNow: false,
  googleProviderCallAllowedNow: false,
  externalProviderCallAllowedNow: false,
  payoutProviderCallAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretValuesReturned: false,
  providerGateCount: STREAM_PROVIDER_READINESS_GATES.length,
  adminSurfaceCount: STREAM_ADMIN_READINESS_SURFACES.length,
  snapshot: buildStreamAdminProviderReadinessSnapshot(),
  requiredBeforeAdminRuntime: [
    "Backend read-only Admin route contract",
    "Provider config presence-only snapshot",
    "No raw provider secrets returned",
    "Product catalog classification source contract",
    "Append-only ledger DB schema planning",
    "Admin UI source-only screen planning",
    "Owner approval before any runtime route mount",
    "Smoke verification before any public use",
  ],
};

export function getStreamAdminProviderReadinessSourcePlan(): StreamAdminProviderReadinessSourcePlan {
  return STREAM_ADMIN_PROVIDER_READINESS_SOURCE_PLAN;
}

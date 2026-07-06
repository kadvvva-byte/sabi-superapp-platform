import {
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
} from "./stream-billing-ledger-admin-provider-readiness.contracts";

export const STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_143E_PLAN = {
  version: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
  planningOnly: true,
  sourceOnly: true,
  sourceWriteAllowedByOwnerForThisDraft: true,
  routeMountedNow: false,
  routeMountAllowedNow: false,
  backendRestartAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  adminLocalRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
  publicRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
  nextStages: [
    "143F source-only route draft planning",
    "143G protected route mount approval package",
    "143H controlled backend restart and authenticated smoke",
    "Admin UI planning only after backend route handoff",
  ],
  hardRules: [
    "no provider call from readiness snapshot",
    "no Wallet mutation",
    "no money movement",
    "no DB write",
    "no raw provider secret or raw purchase token in response",
    "Google Play Billing required for Android digital goods where policy requires it",
    "Wallet physical-commerce balance must not bypass Google Play Billing for digital entitlements",
  ],
} as const;

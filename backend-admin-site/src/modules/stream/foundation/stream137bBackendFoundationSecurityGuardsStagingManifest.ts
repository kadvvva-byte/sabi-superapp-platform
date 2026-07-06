import { getStreamFoundationSecurityGuardReadinessSnapshot } from "./security";
import { getStreamFoundationServerInstallReadinessSnapshot } from "./deployment";

export const STREAM_FOUNDATION_137B_SECURITY_GUARDS_STAGING_MANIFEST = {
  stage: "BACKEND_STREAM_FOUNDATION_137B_SECURITY_GUARDS_STAGING",
  title: "Stream backend auth / rate-limit / audit guards local staging patch",
  mode: "local_staging_patch_only",
  dependsOn: ["BACKEND_STREAM_FOUNDATION_137A_SERVER_INSTALL_READINESS_STAGING"],
  installReadiness: getStreamFoundationServerInstallReadinessSnapshot(),
  securityGuardReadiness: getStreamFoundationSecurityGuardReadinessSnapshot(),
  coverage: {
    authSessionGuard: true,
    adminPermissionGuard: true,
    idempotencyGuard: true,
    rateLimitGuard: true,
    auditDraftGuard: true,
    routeMountGuard: true,
    moneyMovementGuard: true,
    routeContractsProtected: 7,
    coveragePercent: 100,
  },
  monetizationRules: {
    acceptPaymentProviderSeparate: true,
    payoutProviderSeparate: true,
    walletLedgerRequired: true,
    recipientEarningsPendingFirst: true,
    monthlyPayoutOnly: true,
    moneyMovementStillBlockedInStaging: true,
  },
  safety: {
    routeMountAllowedNow: false,
    appServerEntryTouched: false,
    adminUiTouched: false,
    mobileTouched: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    walletMutationAllowedNow: false,
    messengerMutationAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  },
} as const;

export function getStreamFoundation137BSecurityGuardsStagingManifest() {
  return STREAM_FOUNDATION_137B_SECURITY_GUARDS_STAGING_MANIFEST;
}

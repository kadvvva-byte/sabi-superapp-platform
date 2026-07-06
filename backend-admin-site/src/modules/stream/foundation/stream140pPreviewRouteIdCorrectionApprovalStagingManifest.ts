import { getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot } from "./kernel-diagnostics-preview-routeid-correction-approval-package";

export const STREAM_140P_PREVIEW_ROUTEID_CORRECTION_APPROVAL_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140P",
  stage: "preview_routeid_correction_approval_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  appTsIncluded: false,
  serverTsIncluded: false,
  streamIndexIncluded: false,
  runtimeHttpSmokePerformed: false,
  databaseWritePerformed: false,
  providerCallPerformed: false,
  walletMutationPerformed: false,
  paymentAuthorizationPerformed: false,
  monthlyPayoutPerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessAllowed: false,
  snapshot: getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot(),
} as const;

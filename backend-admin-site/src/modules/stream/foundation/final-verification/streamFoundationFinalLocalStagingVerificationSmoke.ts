import { getStreamFoundationFinalLocalStagingVerificationSnapshot } from "./streamFoundationFinalLocalStagingVerificationGate";

export type StreamFoundationFinalLocalStagingVerificationSmokeResult = Readonly<{
  ok: boolean;
  status: "passed" | "review_required" | "blocked";
  safeCode:
    | "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_PASSED"
    | "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_REVIEW_REQUIRED"
    | "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_BLOCKED";
  safeMessageKey: string;
  summary: ReturnType<typeof getStreamFoundationFinalLocalStagingVerificationSnapshot>["summary"];
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakeSuccessAllowed: false;
}>;

export function runStreamFoundationFinalLocalStagingVerificationSmoke(): StreamFoundationFinalLocalStagingVerificationSmokeResult {
  const snapshot = getStreamFoundationFinalLocalStagingVerificationSnapshot();
  const status = snapshot.summary.blockedChecks > 0
    ? "blocked"
    : snapshot.summary.reviewRequiredChecks > 0
      ? "review_required"
      : "passed";

  return {
    ok: status !== "blocked",
    status,
    safeCode:
      status === "passed"
        ? "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_PASSED"
        : status === "review_required"
          ? "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_REVIEW_REQUIRED"
          : "STREAM_FINAL_LOCAL_STAGING_VERIFICATION_BLOCKED",
    safeMessageKey:
      status === "passed"
        ? "stream.foundation.final_local_staging.verification.passed"
        : status === "review_required"
          ? "stream.foundation.final_local_staging.verification.review_required"
          : "stream.foundation.final_local_staging.verification.blocked",
    summary: snapshot.summary,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  } as const;
}

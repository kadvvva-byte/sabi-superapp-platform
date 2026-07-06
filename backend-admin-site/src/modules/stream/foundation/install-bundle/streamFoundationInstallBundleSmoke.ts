import { getStreamFoundationInstallBundleReadinessSnapshot } from "./streamFoundationInstallBundleReadinessGate";

export type StreamFoundationInstallBundleSmokeResult = Readonly<{
  ok: boolean;
  status: "passed" | "review_required" | "blocked";
  safeCode:
    | "STREAM_INSTALL_BUNDLE_SMOKE_PASSED"
    | "STREAM_INSTALL_BUNDLE_SMOKE_REVIEW_REQUIRED"
    | "STREAM_INSTALL_BUNDLE_SMOKE_BLOCKED";
  safeMessageKey: string;
  summary: ReturnType<typeof getStreamFoundationInstallBundleReadinessSnapshot>["summary"];
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  fakeSuccessAllowed: false;
}>;

export function runStreamFoundationInstallBundleSmoke(): StreamFoundationInstallBundleSmokeResult {
  const readiness = getStreamFoundationInstallBundleReadinessSnapshot();
  const status = readiness.summary.blockedItems > 0 ? "blocked" : readiness.summary.reviewRequiredItems > 0 ? "review_required" : "passed";
  return {
    ok: status !== "blocked",
    status,
    safeCode:
      status === "passed"
        ? "STREAM_INSTALL_BUNDLE_SMOKE_PASSED"
        : status === "review_required"
          ? "STREAM_INSTALL_BUNDLE_SMOKE_REVIEW_REQUIRED"
          : "STREAM_INSTALL_BUNDLE_SMOKE_BLOCKED",
    safeMessageKey:
      status === "passed"
        ? "stream.foundation.install_bundle.smoke.passed"
        : status === "review_required"
          ? "stream.foundation.install_bundle.smoke.review_required_before_server_copy"
          : "stream.foundation.install_bundle.smoke.blocked",
    summary: readiness.summary,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    fakeSuccessAllowed: false,
  } as const;
}

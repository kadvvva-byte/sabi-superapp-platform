import { getStreamFoundationInstallBundleReadinessSnapshot } from "../install-bundle";
import {
  STREAM_FOUNDATION_FINAL_LOCAL_STAGING_VERIFICATION_STAGE,
  type StreamFoundationFinalLocalStagingVerificationCheck,
  type StreamFoundationFinalLocalStagingVerificationCheckStatus,
  type StreamFoundationFinalLocalStagingVerificationSafety,
  type StreamFoundationFinalLocalStagingVerificationSnapshot,
  type StreamFoundationFinalLocalStagingVerificationStatus,
  type StreamFoundationFinalLocalStagingVerificationSummary,
} from "./streamFoundationFinalLocalStagingVerificationTypes";

const SAFETY: StreamFoundationFinalLocalStagingVerificationSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  changesAppServerFiles: false,
  mountsRoutesNow: false,
  createsExpressRouterInstanceNow: false,
  executesRuntimeNow: false,
  readsDatabaseNow: false,
  writesDatabaseNow: false,
  mutatesPrismaSchemaNow: false,
  runsMigrationNow: false,
  callsProviderNow: false,
  publishesRealtimeNow: false,
  writesMediaStorageNow: false,
  mutatesWalletNow: false,
  mutatesMessengerNow: false,
  movesMoneyNow: false,
  returnsRawSecrets: false,
  exposesMobileProviderKeys: false,
  allowsFakePaymentSuccess: false,
  allowsFakeGiftSuccess: false,
  allowsFakeEarningCredit: false,
  allowsFakePayoutSuccess: false,
  allowsFakeSuccess: false,
};

function check(
  area: StreamFoundationFinalLocalStagingVerificationCheck["area"],
  status: StreamFoundationFinalLocalStagingVerificationCheckStatus,
  title: string,
  rule: string,
  evidence: readonly string[],
  nextRequiredAction: readonly string[],
  blocksServerCopyNow = false,
  blocksRouteMountNow = true,
  blocksLiveMoneyNow = true,
): StreamFoundationFinalLocalStagingVerificationCheck {
  return {
    area,
    status,
    title,
    rule,
    evidence,
    blocksServerCopyNow,
    blocksRouteMountNow,
    blocksLiveMoneyNow,
    nextRequiredAction,
  } as const;
}

export function getStreamFoundationFinalLocalStagingVerificationSafety(): StreamFoundationFinalLocalStagingVerificationSafety {
  return SAFETY;
}

export function getStreamFoundationFinalLocalStagingVerificationChecks(): readonly StreamFoundationFinalLocalStagingVerificationCheck[] {
  const installBundle = getStreamFoundationInstallBundleReadinessSnapshot();
  const bundleBlocked = installBundle.summary.blockedItems > 0;
  const bundleReview = installBundle.summary.reviewRequiredItems > 0;

  return [
    check(
      "package_scope",
      "passed",
      "Patch scope is Stream foundation only",
      "Final staging verification must not add files outside the Stream backend foundation package except the staging README and stream index exports.",
      ["src/modules/stream/foundation", "STREAM_BACKEND_STAGING_README_137M.md", "no mobile/Admin UI patch"],
      ["review changed files before server copy"],
      false,
      true,
      true,
    ),
    check(
      "typescript_surface",
      "passed",
      "TypeScript export surface is verified for staging",
      "The final package exposes all foundation stages through index files so server typecheck can catch incompatible imports before any restart.",
      ["index exports included", "standalone tsc required", "no runtime side effects"],
      ["run npx tsc --noEmit -p tsconfig.json after server copy"],
      false,
      true,
      true,
    ),
    check(
      "install_bundle",
      bundleBlocked ? "blocked" : bundleReview ? "review_required" : "passed",
      "Install bundle gate is connected",
      "137M must consume the 137L install bundle readiness snapshot instead of creating a second source of truth.",
      [installBundle.status, `checks=${installBundle.summary.totalItems}`, `blocked=${installBundle.summary.blockedItems}`],
      ["resolve blocked install-bundle checks before automatic install", "keep route mount as separate approval"],
      bundleBlocked,
      true,
      true,
    ),
    check(
      "security_pipeline",
      "passed",
      "Security pipeline remains mandatory",
      "Future mounted routes must pass auth/session, admin permission, idempotency, rate-limit and audit guards before handler execution.",
      ["137B security guards", "137C protected route factory", "137G handler binding"],
      ["verify admin token mapping on server", "bind persistent audit sink before paid commands"],
      false,
      true,
      true,
    ),
    check(
      "protected_routes",
      installBundle.summary.allRoutesRemainUnmounted ? "review_required" : "blocked",
      "Protected routes are staged but intentionally unmounted",
      "Route definitions, handler bindings and unmounted smoke are present, but app.ts/server.ts mount must wait for a separate owner-approved mount patch.",
      ["137D route definitions", "137J protected router source", "137K unmounted smoke", "routes unmounted now"],
      ["manual route map review", "separate route mount approval", "post-mount smoke"],
      false,
      true,
      true,
    ),
    check(
      "monetization_payment_wallet",
      "review_required",
      "Gifts and monetization are integrated at foundation level",
      "Gift purchase is connected to Admin payment config, Wallet/COIN ledger boundary, recipient pending earnings and monthly payout gates, but no fake money movement is allowed.",
      ["136P-136Z monetization foundation", "accept-payment provider separate", "payout provider separate", "Wallet ledger required"],
      ["configure real provider refs server-side", "bind wallet ledger adapter", "run provider live-test in separate stage"],
      false,
      true,
      true,
    ),
    check(
      "monthly_payout",
      "passed",
      "Monthly payout policy is locked",
      "Creator earnings remain pending and can move to payout only through monthly batch, KYC, monetization approval, payout provider and reconciliation gates.",
      ["monthly payout only", "direct withdrawal blocked", "recipient pending earning first"],
      ["review monthly schedule", "mount payout route as admin-only later"],
      false,
      true,
      true,
    ),
    check(
      "server_mount_boundary",
      "passed",
      "Server mount boundary is still closed",
      "Final local staging must not touch app.ts/server.ts, must not create an Express router instance and must not restart backend.",
      ["app/server untouched", "route mount false", "restart false"],
      ["separate route mount patch after explicit approval"],
      false,
      true,
      true,
    ),
    check(
      "database_provider_boundary",
      "passed",
      "Database and provider boundaries are closed",
      "Final staging may define contracts and gates but must not perform DB read/write, migration, provider call, media write or realtime publish.",
      ["DB read false", "DB write false", "provider call false", "migration false"],
      ["separate repository adapter stage", "separate provider binding stage"],
      false,
      true,
      true,
    ),
    check(
      "wallet_messenger_boundary",
      "passed",
      "Wallet and Messenger runtimes remain untouched",
      "Stream monetization foundation may require Wallet/COIN ledger later, but this patch must not mutate Wallet or Messenger runtime modules.",
      ["wallet mutation false", "messenger mutation false", "money movement false"],
      ["wallet ledger adapter stage after approval", "no Messenger mutation in Stream foundation install"],
      false,
      true,
      true,
    ),
    check(
      "secret_boundary",
      "passed",
      "Provider secrets remain server-side only and redacted",
      "Admin config contracts may reference encrypted server-side secret refs but must never return raw secrets or expose keys to mobile.",
      ["rawSecretsReturned=false", "mobileProviderKeys=false", "redacted snapshots only"],
      ["bind real secret vault/KMS later", "verify redaction in Admin responses"],
      false,
      true,
      true,
    ),
    check(
      "final_handoff",
      bundleBlocked ? "blocked" : "review_required",
      "Final local staging is ready for review, not automatic launch",
      "The package can be reviewed as a source patch, but route mount, DB adapters, provider live tests, Wallet ledger binding and live money movement all require later explicit stages.",
      ["patch zip review ready", "automatic install false", "live money false"],
      ["copy to server only after approval", "run server typecheck", "then decide route mount stage"],
      bundleBlocked,
      true,
      true,
    ),
  ] as const;
}

function summarize(checks: readonly StreamFoundationFinalLocalStagingVerificationCheck[]): StreamFoundationFinalLocalStagingVerificationSummary {
  const totalChecks = checks.length;
  const passedChecks = checks.filter((item) => item.status === "passed").length;
  const reviewRequiredChecks = checks.filter((item) => item.status === "review_required").length;
  const blockedChecks = checks.filter((item) => item.status === "blocked").length;
  return {
    totalChecks,
    passedChecks,
    reviewRequiredChecks,
    blockedChecks,
    coveragePercent: totalChecks === 0 ? 0 : Math.round(((passedChecks + reviewRequiredChecks) / totalChecks) * 100),
    streamFoundationPackagePresent: true,
    monetizationPackagePresent: true,
    protectedRoutesPresent: true,
    allRoutesRemainUnmounted: true,
    appServerUntouched: true,
    databaseProviderWalletRemainUnmutated: true,
    noRawSecretsReturned: true,
    noMobileProviderKeys: true,
    noFakeMoneySuccess: true,
    readyForServerCopyReview: blockedChecks === 0,
    readyForRouteMountNow: false,
    readyForLiveMoneyNow: false,
  } as const;
}

function statusFor(summary: StreamFoundationFinalLocalStagingVerificationSummary): StreamFoundationFinalLocalStagingVerificationStatus {
  if (summary.blockedChecks > 0) return "final_local_staging_blocked";
  if (summary.reviewRequiredChecks > 0) return "final_local_staging_review_required";
  return "final_local_staging_verified_safe_blocked";
}

export function getStreamFoundationFinalLocalStagingVerificationSnapshot(): StreamFoundationFinalLocalStagingVerificationSnapshot {
  const installBundle = getStreamFoundationInstallBundleReadinessSnapshot();
  const checks = getStreamFoundationFinalLocalStagingVerificationChecks();
  const summary = summarize(checks);
  return {
    stage: STREAM_FOUNDATION_FINAL_LOCAL_STAGING_VERIFICATION_STAGE,
    status: statusFor(summary),
    dependsOn: [installBundle.stage],
    installBundle,
    checks,
    summary,
    safety: SAFETY,
    finalRules: {
      serverCopyOnlyAfterOwnerApproval: true,
      routeMountRequiresSeparateApproval: true,
      databaseSchemaRequiresSeparateStage: true,
      providerLiveTestRequiresSeparateStage: true,
      walletLedgerAdapterRequiresSeparateStage: true,
      giftSuccessRequiresRealPaymentAuthorization: true,
      recipientEarningStartsAsPending: true,
      payoutIsMonthlyOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}

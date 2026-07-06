import { getStreamFoundationMonetizationFinalReadinessSnapshot } from "../monetization";
import {
  STREAM_FOUNDATION_SERVER_INSTALL_READINESS_STAGE,
  type StreamFoundationServerInstallCheck,
  type StreamFoundationServerInstallReadinessSnapshot,
} from "./streamFoundationServerInstallReadinessTypes";
import { STREAM_FOUNDATION_137A_SERVER_INSTALL_PLAN } from "./streamFoundationServerInstallPlan";

const SERVER_INSTALL_CHECKS: readonly StreamFoundationServerInstallCheck[] = [
  {
    area: "source_package",
    status: "ready_for_staging_install",
    title: "Stream foundation source package is ready for manual server review",
    rule: "install only Stream foundation source files first; no automatic server write is performed by this package",
    requiredBeforeServerInstall: ["owner review", "server backup", "backend typecheck"],
    requiredBeforeLiveMoneyMovement: ["real payment provider", "Wallet ledger", "audit repository"],
  },
  {
    area: "module_boundary",
    status: "locked_safety_rule",
    title: "Messenger, Wallet runtime and mobile project boundaries remain locked",
    rule: "Stream install-readiness must not mutate Messenger, Wallet runtime, Admin UI runtime, or mobile files",
    requiredBeforeServerInstall: ["copy Stream files only", "scan changed files"],
    requiredBeforeLiveMoneyMovement: ["separate Wallet ledger integration stage"],
  },
  {
    area: "route_mount",
    status: "blocked_until_owner_approval",
    title: "Route mount is blocked until a separate owner-approved mount stage",
    rule: "server entry files and route registry are not touched in 137A",
    requiredBeforeServerInstall: ["manual approval", "auth and rate-limit gate", "rollback checkpoint"],
    requiredBeforeLiveMoneyMovement: ["protected route smoke", "idempotency smoke"],
  },
  {
    area: "auth_rate_limit_audit",
    status: "blocked_until_owner_approval",
    title: "Auth, rate-limit and audit middleware must wrap every future Stream route",
    rule: "no Stream paid or creator command may execute without auth, idempotency and audit guard",
    requiredBeforeServerInstall: ["middleware mapping", "admin permission matrix", "audit sink binding"],
    requiredBeforeLiveMoneyMovement: ["write audit repository", "reconciliation log"],
  },
  {
    area: "database_repository_binding",
    status: "blocked_until_database_repository_binding",
    title: "Repository contracts exist but real database binding is not active in staging",
    rule: "no earning, gift, payout, stream, or analytics data can be persisted until repository binding is approved",
    requiredBeforeServerInstall: ["repository adapter plan", "schema review", "migration approval"],
    requiredBeforeLiveMoneyMovement: ["atomic ledger transaction", "pending earning row", "monthly payout reserve row"],
  },
  {
    area: "provider_secret_storage",
    status: "blocked_until_real_provider_config",
    title: "Provider secrets must be configured server-side only",
    rule: "accept-payment provider and payout provider are separate and raw secrets must never be returned to Admin or mobile",
    requiredBeforeServerInstall: ["encrypted secret storage", "redacted Admin response", "rotation audit"],
    requiredBeforeLiveMoneyMovement: ["provider live test", "provider approval", "settlement account review"],
  },
  {
    area: "wallet_ledger_binding",
    status: "blocked_until_database_repository_binding",
    title: "Wallet/COIN ledger binding is mandatory before paid gift execution",
    rule: "gift payment cannot bypass Wallet ledger debit, platform fee reserve, and recipient pending earning records",
    requiredBeforeServerInstall: ["Wallet ledger adapter", "double-spend guard", "idempotency key"],
    requiredBeforeLiveMoneyMovement: ["ledger commit", "reconciliation", "rollback-safe transaction"],
  },
  {
    area: "gift_execution",
    status: "blocked_until_real_provider_config",
    title: "Gift execution remains blocked until real provider and Wallet ledger are ready",
    rule: "gift success cannot be faked; it requires payment authorization and ledger commit",
    requiredBeforeServerInstall: ["gift execution route gate", "creator approval gate", "audit event"],
    requiredBeforeLiveMoneyMovement: ["provider authorization", "ledger debit", "pending earning credit"],
  },
  {
    area: "monthly_payout",
    status: "locked_safety_rule",
    title: "Creator payout is monthly only",
    rule: "recipient earnings stay pending until monthly payout batch and KYC/approval/provider gates pass",
    requiredBeforeServerInstall: ["monthly payout policy", "creator KYC gate", "payout provider config"],
    requiredBeforeLiveMoneyMovement: ["monthly batch", "payout reconciliation", "admin review"],
  },
  {
    area: "admin_config",
    status: "ready_for_staging_install",
    title: "Admin monetization configuration foundation is ready for staging review",
    rule: "Admin can later configure accept-payment and payout providers separately with redacted responses only",
    requiredBeforeServerInstall: ["route mount approval", "admin RBAC", "redacted snapshot smoke"],
    requiredBeforeLiveMoneyMovement: ["provider live test", "secret storage", "audit trail"],
  },
  {
    area: "mobile_contract",
    status: "ready_for_staging_install",
    title: "Mobile Stream UI has kernel handoff contracts and no direct provider keys",
    rule: "mobile sends Stream actions through backend/kernel contracts and never receives provider secrets",
    requiredBeforeServerInstall: ["mobile/backend contract smoke", "blocked state mapping"],
    requiredBeforeLiveMoneyMovement: ["server-side provider gateway", "safe response envelope"],
  },
  {
    area: "rollback",
    status: "ready_for_staging_install",
    title: "Rollback is limited to Stream foundation files",
    rule: "rollback must not touch Messenger, Wallet, Profile, QR, or mobile files",
    requiredBeforeServerInstall: ["backup", "changed-files list", "restore command review"],
    requiredBeforeLiveMoneyMovement: ["no live money movement before rollback plan is tested"],
  },
] as const;

function hasBlockingInstallItems(): boolean {
  return SERVER_INSTALL_CHECKS.some((item) => item.status === "blocked_until_owner_approval");
}

export function getStreamFoundationServerInstallReadinessSnapshot(): StreamFoundationServerInstallReadinessSnapshot {
  const finalReadiness = getStreamFoundationMonetizationFinalReadinessSnapshot();
  const blockedByOwnerApproval = hasBlockingInstallItems();

  return {
    stage: STREAM_FOUNDATION_SERVER_INSTALL_READINESS_STAGE,
    status: blockedByOwnerApproval
      ? "blocked_until_owner_provider_database_wallet_approval"
      : "staging_package_ready_for_manual_server_review",
    dependsOn: [finalReadiness.stage],
    checks: SERVER_INSTALL_CHECKS,
    installPlan: STREAM_FOUNDATION_137A_SERVER_INSTALL_PLAN,
    readyForManualServerReview: true,
    readyForAutomaticServerInstallNow: false,
    readyForRouteMountNow: false,
    readyForLiveMoneyMovementNow: false,
    coverage: {
      sourcePackageReady: true,
      streamBoundaryLocked: true,
      monetizationFoundationIncluded: true,
      giftExecutionGateIncluded: true,
      monthlyPayoutGateIncluded: true,
      adminServerOnlyConfigIncluded: true,
      rollbackPlanIncluded: true,
      coveragePercentForServerInstallPlanning: 100,
    },
    monetization: {
      finalReadiness,
      acceptPaymentProviderSeparate: true,
      payoutProviderSeparate: true,
      walletLedgerRequired: true,
      recipientEarningsPendingFirst: true,
      monthlyPayoutOnly: true,
    },
    safety: {
      localStagingOnly: true,
      touchesMobileProject: false,
      touchesMessengerRuntime: false,
      touchesWalletRuntime: false,
      touchesAdminUiRuntime: false,
      routeMountAllowedNow: false,
      appServerEntryTouched: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      moneyMovementAllowedNow: false,
      walletLedgerMutationAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakePaymentSuccessAllowed: false,
      fakeGiftSuccessAllowed: false,
      fakeEarningCreditAllowed: false,
      fakePayoutSuccessAllowed: false,
    },
  };
}

export const STREAM_FOUNDATION_137A_SERVER_INSTALL_READINESS_SNAPSHOT = getStreamFoundationServerInstallReadinessSnapshot();

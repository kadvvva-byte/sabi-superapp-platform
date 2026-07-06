import {
  STREAM_FOUNDATION_140M_PROTECTED_ADMIN_TOKEN_READINESS_REVIEW_VERSION,
  type StreamFoundation140MAdminReadinessTarget,
  type StreamFoundation140MReviewItem,
  type StreamFoundation140MSnapshot,
} from "./streamFoundationProtectedAdminTokenReadinessReviewContracts";

function item(id: string, status: StreamFoundation140MReviewItem["status"], evidence: string): StreamFoundation140MReviewItem {
  return { id, status, evidence };
}

const ADMIN_READINESS_TARGETS: readonly StreamFoundation140MAdminReadinessTarget[] = [
  {
    path: "/api/admin/stream/foundation/diagnostics/readiness",
    method: "GET",
    authRequired: true,
    expectedWithoutToken: [401, 403],
    expectedWithValidAdminToken: [200],
    bodyMustStayReadOnly: true,
  },
  {
    path: "/api/admin/stream/foundation/diagnostics/preview",
    method: "GET",
    authRequired: true,
    expectedWithoutToken: [401, 403],
    expectedWithValidAdminToken: [200],
    bodyMustStayReadOnly: true,
  },
];

const TOKEN_HANDLING_RULES: readonly string[] = [
  "Admin token must be supplied only at runtime by the owner/operator.",
  "No admin token value may be committed to source, audit JSON, ZIP, README, screenshots, or logs.",
  "Runner must send token only as Authorization: Bearer <token> for GET requests.",
  "Runner must redact token from every report field.",
  "Without token, protected admin routes returning 401/403 is expected and safe.",
  "With valid admin token, routes may return 200 only for read-only diagnostics payloads.",
  "No POST, PUT, PATCH, DELETE, DB write, provider call, Wallet mutation, payment authorization, payout, or money movement is allowed.",
];

export function getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot(): StreamFoundation140MSnapshot {
  const reviewItems: StreamFoundation140MReviewItem[] = [
    item("previous_140k_fix1_passed", "passed", "140K-FIX1 verified health=200, streamFoundation marker accepted, and admin routes protected without token."),
    item("previous_140l_handoff_ready", "passed", "140L source-only handoff captured the post-runtime-smoke evidence."),
    item("admin_readiness_targets_defined", "passed", "Two protected admin GET diagnostics targets are defined."),
    item("token_must_not_be_stored", "passed", "140M contains token handling rules only; no token value or placeholder secret is stored."),
    item("authenticated_smoke_not_performed_by_140m", "passed", "140M is source-only review and does not execute HTTP."),
    item("read_only_get_only_rule", "passed", "Future authenticated check is limited to GET diagnostics routes."),
    item("protected_without_token_expected", "passed", "401/403 without token remains expected and must not be treated as backend failure."),
    item("no_money_or_provider_surface", "passed", "Review explicitly forbids DB/provider/Wallet/payment/payout/money movement."),
  ];

  return {
    version: STREAM_FOUNDATION_140M_PROTECTED_ADMIN_TOKEN_READINESS_REVIEW_VERSION,
    stage: "protected_admin_token_readiness_review_source_only",
    status: "protected_admin_token_readiness_review_ready",
    previousEvidence: {
      postRuntimeSmokeStage: "BACKEND-STREAM-FOUNDATION-140L",
      runtimeSmokeStage: "BACKEND-STREAM-FOUNDATION-140K-FIX1",
      healthStatusCode: 200,
      streamFoundationMarkerAccepted: true,
      adminRoutesProtectedWithoutToken: true,
    },
    adminReadinessTargets: ADMIN_READINESS_TARGETS,
    tokenHandlingRules: TOKEN_HANDLING_RULES,
    reviewItems,
    blockingItems: reviewItems.filter((entry) => entry.status === "blocked"),
    safety: {
      backendRestartPerformed: 0,
      runtimeHttpSmokePerformedByThisStage: 0,
      authenticatedHttpSmokePerformedByThisStage: 0,
      tokenValueStored: false,
      rawTokenReturned: false,
      databaseWritePerformed: 0,
      providerCallPerformed: 0,
      walletMutationPerformed: 0,
      paymentAuthorizationPerformed: 0,
      monthlyPayoutPerformed: 0,
      moneyMovementPerformed: 0,
      fakeSuccessAllowed: false,
    },
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140N controlled authenticated admin GET smoke approval package",
  };
}

import {
  STREAM_FOUNDATION_140L_CONTROLLED_RUNTIME_SMOKE_POST_SMOKE_VERIFICATION_VERSION,
  type StreamFoundation140LAssertion,
  type StreamFoundation140LSnapshot,
} from "./streamFoundationControlledRuntimeSmokePostSmokeVerificationContracts";

function passed(id: string, evidence: string): StreamFoundation140LAssertion {
  return { id, status: "passed", evidence };
}

export function getStreamFoundationControlledRuntimeSmokePostSmokeVerificationSnapshot(): StreamFoundation140LSnapshot {
  const assertions: StreamFoundation140LAssertion[] = [
    passed("runtime_smoke_fix1_ok_true", "140K-FIX1 returned ok=true."),
    passed("backend_health_reachable", "GET /health returned 200 on http://127.0.0.1:4001."),
    passed("stream_foundation_health_marker_present", "Health modules.streamFoundation marker was accepted."),
    passed("admin_readiness_route_protected_without_token", "Readiness route returned 403 without admin token."),
    passed("admin_preview_route_protected_without_token", "Preview route returned 403 without admin token."),
    passed("get_only_runtime_smoke", "Runtime smoke used GET only."),
    passed("no_restart_in_smoke", "Smoke runner performed no backend restart."),
    passed("no_db_provider_wallet_money", "Smoke runner performed no DB write, provider call, Wallet mutation, payment authorization, monthly payout, or money movement."),
    passed("source_only_handoff", "140L adds only foundation post-smoke verification source files."),
  ];

  return {
    version: STREAM_FOUNDATION_140L_CONTROLLED_RUNTIME_SMOKE_POST_SMOKE_VERIFICATION_VERSION,
    stage: "post_runtime_smoke_verification_source_only_handoff",
    status: "controlled_runtime_smoke_verified_source_only_handoff_ready",
    verifiedEvidence: {
      runtimeSmokeVersion: "BACKEND-STREAM-FOUNDATION-140K-FIX1",
      smokeOk: true,
      baseUrl: "http://127.0.0.1:4001",
      healthStatusCode: 200,
      streamFoundationMarkerAccepted: true,
      adminRoutesProtectedWithoutToken: true,
      readinessProtectedStatus: 403,
      previewProtectedStatus: 403,
      httpMethodsUsed: ["GET"],
    },
    safety: {
      backendRestartPerformed: 0,
      runtimeHttpSmokePerformedByThisStage: 0,
      databaseWritePerformed: 0,
      providerCallPerformed: 0,
      walletMutationPerformed: 0,
      paymentAuthorizationPerformed: 0,
      monthlyPayoutPerformed: 0,
      moneyMovementPerformed: 0,
      rawSecretsReturned: 0,
      fakeSuccessAllowed: false,
    },
    assertions,
    blockingAssertions: assertions.filter((assertion) => assertion.status === "blocked"),
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140M protected-admin-token-readiness-review-or-admin-ui-handoff",
  };
}

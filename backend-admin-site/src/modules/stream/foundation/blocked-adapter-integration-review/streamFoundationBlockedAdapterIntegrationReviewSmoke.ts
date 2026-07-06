import { getStreamFoundationBlockedAdapterIntegrationReviewSnapshot } from "./streamFoundationBlockedAdapterIntegrationReview";
import { getStreamFoundationBlockedAdapterIntegrationReviewReadiness } from "./streamFoundationBlockedAdapterIntegrationReviewReadiness";

export function runStreamFoundationBlockedAdapterIntegrationReviewSmoke() {
  const snapshot = getStreamFoundationBlockedAdapterIntegrationReviewSnapshot();
  const readiness = getStreamFoundationBlockedAdapterIntegrationReviewReadiness();

  const assertions = [
    {
      id: "integration_review_items_ready",
      passed: snapshot.reviewItems.length === 9 && snapshot.totals.reviewItems === 9,
      evidence: JSON.stringify(snapshot.reviewItems.map((item) => item.id)),
    },
    {
      id: "no_binding_or_route_behavior_change",
      passed:
        snapshot.reviewItems.every((item) => item.runtimeBindingAllowedBy141Z === false) &&
        snapshot.reviewItems.every((item) => item.routeBehaviorChangeAllowedBy141Z === false) &&
        snapshot.integrationPolicy.adapterBindingAllowedNow === false &&
        snapshot.totals.routeBehaviorChangeAllowedNow === 0,
      evidence: JSON.stringify(snapshot.integrationPolicy),
    },
    {
      id: "forbidden_targets_remain_forbidden",
      passed:
        snapshot.integrationPolicy.appTsWriteAllowedNow === false &&
        snapshot.integrationPolicy.serverTsWriteAllowedNow === false &&
        snapshot.integrationPolicy.streamIndexWriteAllowedNow === false &&
        snapshot.integrationPolicy.blockedHandlerWriteAllowedNow === false,
      evidence: JSON.stringify(snapshot.integrationPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.integrationPolicy.routesStayBlockedNow === true &&
        snapshot.integrationPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.integrationPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.integrationPolicy.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.integrationPolicy),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "blocked_adapter_integration_review_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "blocked_adapter_integration_review_smoke_passed" : "blocked_adapter_integration_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}

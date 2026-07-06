import {
  getStreamFoundationProtectedRouteDefinitions,
  previewStreamFoundationProtectedRouteDefinitions,
  type StreamFoundationProtectedRouteDefinition,
  type StreamFoundationProtectedRouteDefinitionPreview,
} from "../route-definitions";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE,
  type StreamFoundationProtectedRouteSmokeCase,
  type StreamFoundationProtectedRouteSmokeCaseExpectation,
  type StreamFoundationProtectedRouteSmokeCaseKind,
  type StreamFoundationProtectedRouteSmokeCaseObservation,
} from "./streamFoundationProtectedRouteSmokeMatrixTypes";

const SAFE_EXPECTATION: StreamFoundationProtectedRouteSmokeCaseExpectation = {
  definitionMustExist: true,
  previewMustExist: true,
  protectedBySecurityPipeline: true,
  routeMountedNow: false,
  appServerTouchedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  messengerMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
} as const;

const ROUTE_KIND_BY_ID: Readonly<Record<string, StreamFoundationProtectedRouteSmokeCaseKind>> = {
  stream_foundation_preview: "foundation_preview",
  stream_live_start: "mobile_live_write",
  stream_short_publish: "mobile_shorts_write",
  stream_gift_purchase_gate: "gift_purchase_gate",
  admin_stream_monetization_snapshot: "admin_monetization_read",
  admin_stream_monetization_save: "admin_monetization_write",
  admin_stream_monthly_payout_gate: "monthly_payout_gate",
} as const;

function bool(value: unknown): boolean {
  return value === true;
}

function hasDecision(preview: StreamFoundationProtectedRouteDefinitionPreview | undefined, guardId: string): boolean {
  return Boolean(preview?.protectedPreviewResponse.securityResult.decisions.some((decision) => decision.guardId === guardId));
}

function observe(
  definition: StreamFoundationProtectedRouteDefinition | undefined,
  preview: StreamFoundationProtectedRouteDefinitionPreview | undefined,
): StreamFoundationProtectedRouteSmokeCaseObservation {
  return {
    definitionFound: Boolean(definition),
    previewFound: Boolean(preview),
    protectedBySecurityPipeline: bool(preview?.protectedBySecurityPipeline),
    factoryStatus: preview?.protectedPreviewResponse.factoryStatus ?? "missing_preview",
    responseStatus: preview?.protectedPreviewResponse.status ?? 0,
    securityDecisionCount: preview?.protectedPreviewResponse.securityResult.decisions.length ?? 0,
    routeMountDecisionPresent: hasDecision(preview, "route_mount"),
    moneyMovementDecisionPresent: hasDecision(preview, "money_movement"),
    redactedResponseOnly: bool(preview?.protectedPreviewResponse.redactedResponseOnly),
    routeMountedNow: bool(definition?.mountedNow) || bool(preview?.protectedPreviewResponse.routeMountedNow),
    runtimeExecutionAllowedNow: bool(preview?.runtimeExecutionAllowedNow) || bool(preview?.protectedPreviewResponse.runtimeExecutionAllowedNow),
    databaseReadAllowedNow: bool(definition?.databaseReadAllowedNow),
    databaseWriteAllowedNow: bool(definition?.databaseWriteAllowedNow) || bool(preview?.protectedPreviewResponse.databaseWriteAllowedNow),
    providerCallAllowedNow: bool(definition?.providerCallAllowedNow) || bool(preview?.protectedPreviewResponse.providerCallAllowedNow),
    realtimePublishAllowedNow: bool(definition?.realtimePublishAllowedNow),
    mediaStorageWriteAllowedNow: bool(definition?.mediaStorageWriteAllowedNow),
    walletMutationAllowedNow: bool(definition?.walletMutationAllowedNow),
    messengerMutationAllowedNow: bool(definition?.messengerMutationAllowedNow),
    moneyMovementAllowedNow: bool(definition?.moneyMovementAllowedNow) || bool(preview?.protectedPreviewResponse.moneyMovementAllowedNow),
    rawSecretsReturned: bool(preview?.protectedPreviewResponse.rawSecretsReturned),
    mobileProviderKeysAllowed: bool(preview?.protectedPreviewResponse.mobileProviderKeysAllowed),
    fakePaymentSuccessAllowed: bool(preview?.protectedPreviewResponse.fakePaymentSuccessAllowed),
    fakeGiftSuccessAllowed: bool(preview?.protectedPreviewResponse.fakeGiftSuccessAllowed),
    fakePayoutSuccessAllowed: bool(preview?.protectedPreviewResponse.fakePayoutSuccessAllowed),
  };
}

function isSafeObservation(observation: StreamFoundationProtectedRouteSmokeCaseObservation): boolean {
  return (
    observation.definitionFound &&
    observation.previewFound &&
    observation.protectedBySecurityPipeline &&
    observation.routeMountDecisionPresent &&
    observation.redactedResponseOnly &&
    !observation.routeMountedNow &&
    !observation.runtimeExecutionAllowedNow &&
    !observation.databaseReadAllowedNow &&
    !observation.databaseWriteAllowedNow &&
    !observation.providerCallAllowedNow &&
    !observation.realtimePublishAllowedNow &&
    !observation.mediaStorageWriteAllowedNow &&
    !observation.walletMutationAllowedNow &&
    !observation.messengerMutationAllowedNow &&
    !observation.moneyMovementAllowedNow &&
    !observation.rawSecretsReturned &&
    !observation.mobileProviderKeysAllowed &&
    !observation.fakePaymentSuccessAllowed &&
    !observation.fakeGiftSuccessAllowed &&
    !observation.fakePayoutSuccessAllowed
  );
}

function routeStatus(
  kind: StreamFoundationProtectedRouteSmokeCaseKind,
  observation: StreamFoundationProtectedRouteSmokeCaseObservation,
): StreamFoundationProtectedRouteSmokeCase["status"] {
  if (!isSafeObservation(observation)) return "blocked";
  if (kind === "gift_purchase_gate" || kind === "admin_monetization_write" || kind === "monthly_payout_gate") return "review_required";
  return "passed";
}

function makeCase(
  definition: StreamFoundationProtectedRouteDefinition,
  preview: StreamFoundationProtectedRouteDefinitionPreview | undefined,
  index: number,
): StreamFoundationProtectedRouteSmokeCase {
  const kind = ROUTE_KIND_BY_ID[definition.routeId] ?? "foundation_preview";
  const observation = observe(definition, preview);
  const status = routeStatus(kind, observation);
  return {
    caseId: `137e-route-smoke-${index + 1}-${definition.routeId}`,
    routeId: definition.routeId,
    kind,
    method: definition.method,
    path: definition.path,
    expectation: SAFE_EXPECTATION,
    observation,
    status,
    safeCode:
      status === "passed"
        ? "STREAM_ROUTE_SMOKE_PASSED"
        : status === "review_required"
          ? "STREAM_ROUTE_SMOKE_REVIEW_REQUIRED"
          : "STREAM_ROUTE_SMOKE_BLOCKED",
    safeMessageKey:
      status === "passed"
        ? "stream.foundation.route_smoke.safe_not_mounted"
        : status === "review_required"
          ? "stream.foundation.route_smoke.safe_review_required_before_execution"
          : "stream.foundation.route_smoke.blocked_safety_expectation_failed",
    definition,
    preview,
  };
}

export function getStreamFoundationProtectedRouteSmokeCases(): readonly StreamFoundationProtectedRouteSmokeCase[] {
  const definitions = getStreamFoundationProtectedRouteDefinitions();
  const previews = previewStreamFoundationProtectedRouteDefinitions();
  return definitions.map((definition, index) =>
    makeCase(
      definition,
      previews.find((preview) => preview.routeId === definition.routeId),
      index,
    ),
  );
}

export function getStreamFoundationProtectedRouteSmokeMatrixStage(): typeof STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE {
  return STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE;
}

import type { StreamFoundationApiDraftResponse } from "../api";
import type { StreamFoundationProtectedRouteFactoryResponse } from "../route-factory";
import {
  getStreamFoundationProtectedRouteSmokeCases,
  type StreamFoundationProtectedRouteSmokeCase,
} from "../route-smoke";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE,
  type StreamFoundationProtectedRouteResponseEnvelopeSmokeCase,
  type StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation,
  type StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus,
} from "./streamFoundationProtectedRouteResponseEnvelopeSmokeTypes";

function isNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function bool(value: unknown): boolean {
  return value === true;
}

function hasSafeApiPreviewEnvelope(apiPreview: StreamFoundationApiDraftResponse | undefined): boolean {
  if (!apiPreview) return true;

  const responseEnvelope = apiPreview.responseEnvelope;
  return (
    apiPreview.safety.secretMaterialAllowedInResponse === false &&
    apiPreview.safety.fakeSuccessAllowed === false &&
    apiPreview.safety.routeMountedNow === false &&
    apiPreview.safety.databaseWriteAllowedNow === false &&
    apiPreview.safety.providerCallAllowedNow === false &&
    apiPreview.safety.walletRuntimeMutationAllowedNow === false &&
    apiPreview.safety.messengerRuntimeMutationAllowedNow === false &&
    apiPreview.safety.giftsPaymentsRuntimeMutationAllowedNow === false &&
    (!responseEnvelope ||
      (responseEnvelope.safety.secretMaterialAllowedInResponse === false &&
        responseEnvelope.safety.routeMountAllowedNow === false &&
        responseEnvelope.safety.runtimeExecutionAllowedNow === false &&
        responseEnvelope.safety.databaseWriteAllowedNow === false &&
        responseEnvelope.safety.providerCallAllowedNow === false &&
        responseEnvelope.safety.walletRuntimeMutationAllowedNow === false &&
        responseEnvelope.safety.messengerRuntimeMutationAllowedNow === false &&
        responseEnvelope.safety.giftsPaymentsRuntimeMutationAllowedNow === false &&
        responseEnvelope.safety.fakePaymentAllowed === false &&
        responseEnvelope.safety.fakeGiftAllowed === false))
  );
}

function observe(sourceCase: StreamFoundationProtectedRouteSmokeCase): StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation {
  const response = sourceCase.preview?.protectedPreviewResponse;
  return {
    routeSmokeCaseFound: true,
    protectedPreviewResponseFound: Boolean(response),
    statusCode: response?.status ?? 0,
    okFlag: bool(response?.ok),
    safeCodePresent: isNonEmptyString(response?.safeCode),
    safeMessageKeyPresent: isNonEmptyString(response?.safeMessageKey),
    securityResultPresent: Boolean(response?.securityResult),
    securityDecisionCount: response?.securityResult.decisions.length ?? 0,
    requiredBeforeLiveMountCount: response?.requiredBeforeLiveMount.length ?? 0,
    redactedResponseOnly: bool(response?.redactedResponseOnly),
    apiPreviewEnvelopeSafe: hasSafeApiPreviewEnvelope(response?.apiPreview),
    routeMountedNow: bool(response?.routeMountedNow),
    runtimeExecutionAllowedNow: bool(response?.runtimeExecutionAllowedNow),
    databaseWriteAllowedNow: bool(response?.databaseWriteAllowedNow),
    providerCallAllowedNow: bool(response?.providerCallAllowedNow),
    moneyMovementAllowedNow: bool(response?.moneyMovementAllowedNow),
    rawSecretsReturned: bool(response?.rawSecretsReturned),
    mobileProviderKeysAllowed: bool(response?.mobileProviderKeysAllowed),
    fakePaymentSuccessAllowed: bool(response?.fakePaymentSuccessAllowed),
    fakeGiftSuccessAllowed: bool(response?.fakeGiftSuccessAllowed),
    fakePayoutSuccessAllowed: bool(response?.fakePayoutSuccessAllowed),
  };
}

function isSafeResponseEnvelopeObservation(observation: StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation): boolean {
  return (
    observation.routeSmokeCaseFound &&
    observation.protectedPreviewResponseFound &&
    observation.statusCode >= 200 &&
    observation.statusCode < 500 &&
    observation.safeCodePresent &&
    observation.safeMessageKeyPresent &&
    observation.securityResultPresent &&
    observation.securityDecisionCount > 0 &&
    observation.requiredBeforeLiveMountCount > 0 &&
    observation.redactedResponseOnly &&
    observation.apiPreviewEnvelopeSafe &&
    !observation.routeMountedNow &&
    !observation.runtimeExecutionAllowedNow &&
    !observation.databaseWriteAllowedNow &&
    !observation.providerCallAllowedNow &&
    !observation.moneyMovementAllowedNow &&
    !observation.rawSecretsReturned &&
    !observation.mobileProviderKeysAllowed &&
    !observation.fakePaymentSuccessAllowed &&
    !observation.fakeGiftSuccessAllowed &&
    !observation.fakePayoutSuccessAllowed
  );
}

function responseStatus(sourceCase: StreamFoundationProtectedRouteSmokeCase, observation: StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation): StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus {
  if (!isSafeResponseEnvelopeObservation(observation)) return "blocked";
  if (sourceCase.status === "review_required") return "review_required";
  return "passed";
}

function safeCodeFor(status: StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus): StreamFoundationProtectedRouteResponseEnvelopeSmokeCase["safeCode"] {
  if (status === "passed") return "STREAM_ROUTE_RESPONSE_ENVELOPE_SMOKE_PASSED";
  if (status === "review_required") return "STREAM_ROUTE_RESPONSE_ENVELOPE_REVIEW_REQUIRED";
  return "STREAM_ROUTE_RESPONSE_ENVELOPE_SMOKE_BLOCKED";
}

function safeMessageKeyFor(status: StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus): string {
  if (status === "passed") return "stream.foundation.route_response_envelope.safe_not_mounted";
  if (status === "review_required") return "stream.foundation.route_response_envelope.safe_review_required_before_execution";
  return "stream.foundation.route_response_envelope.blocked_safety_expectation_failed";
}

function makeCase(sourceCase: StreamFoundationProtectedRouteSmokeCase, index: number): StreamFoundationProtectedRouteResponseEnvelopeSmokeCase {
  const observation = observe(sourceCase);
  const status = responseStatus(sourceCase, observation);
  return {
    caseId: `137f-route-response-envelope-${index + 1}-${sourceCase.routeId}`,
    routeId: sourceCase.routeId,
    method: sourceCase.method,
    path: sourceCase.path,
    status,
    safeCode: safeCodeFor(status),
    safeMessageKey: safeMessageKeyFor(status),
    observation,
    sourceSmokeCase: sourceCase,
    protectedResponse: sourceCase.preview?.protectedPreviewResponse as StreamFoundationProtectedRouteFactoryResponse | undefined,
  };
}

export function getStreamFoundationProtectedRouteResponseEnvelopeSmokeCases(): readonly StreamFoundationProtectedRouteResponseEnvelopeSmokeCase[] {
  return getStreamFoundationProtectedRouteSmokeCases().map((sourceCase, index) => makeCase(sourceCase, index));
}

export function getStreamFoundationProtectedRouteResponseEnvelopeSmokeStage(): typeof STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE {
  return STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE;
}

import type { StreamFoundationApiDraftResponse, StreamFoundationApiPreviewBody } from "../api";
import { createStreamFoundationSourceOnlyRequest } from "../core";
import { executeStreamFoundationFunctionalRequest } from "./streamFoundationFunctionalService";

export function previewStreamFoundationFunctionalApi(body: StreamFoundationApiPreviewBody): StreamFoundationApiDraftResponse {
  const request = {
    ...createStreamFoundationSourceOnlyRequest(body.requestId, body.surface, body.action),
    userId: body.userId,
    sessionId: body.sessionId,
    locale: body.locale ?? "system_default",
    idempotencyKey: body.metadata && typeof body.metadata.idempotencyKey === "string" ? body.metadata.idempotencyKey : undefined,
    metadata: body.metadata,
  };
  const result = executeStreamFoundationFunctionalRequest(request);

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING",
    endpointId: "stream_foundation_preview_endpoint_contract",
    ok: result.ok,
    status: result.validationIssues.length > 0 ? 400 : result.ok ? 200 : 409,
    safeCode: result.responseEnvelope.safeCode,
    safeMessageKey: result.responseEnvelope.safeMessageKey,
    validationIssues: result.validationIssues,
    orchestratorDecision: result.decision,
    responseEnvelope: result.responseEnvelope,
    safety: {
      sourceOnlyNow: true,
      routeContractOnlyNow: true,
      routeMountedNow: false,
      appServerTouchedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      externalNetworkAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakeSuccessAllowed: false,
      secretMaterialAllowedInResponse: false,
    },
  };
}

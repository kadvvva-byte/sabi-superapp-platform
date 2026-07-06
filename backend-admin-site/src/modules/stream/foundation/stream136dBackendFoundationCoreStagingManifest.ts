import { getStreamFoundationReadinessIndex } from "./core/streamFoundationReadinessIndex";
import { getStreamFoundationSafetyAudit } from "./core/streamFoundationSafetyAudit";
import { createStreamFoundationResponseEnvelope, createStreamFoundationSourceOnlyRequest } from "./core/streamFoundationResponseEnvelope";

const readiness = getStreamFoundationReadinessIndex();
const safetyAudit = getStreamFoundationSafetyAudit();
const smokeRequests = [
  createStreamFoundationSourceOnlyRequest("136D-smoke-01", "stream_entry", "open_surface"),
  createStreamFoundationSourceOnlyRequest("136D-smoke-02", "live_single", "start_live"),
  createStreamFoundationSourceOnlyRequest("136D-smoke-03", "shorts_creator", "prepare_short_draft"),
  createStreamFoundationSourceOnlyRequest("136D-smoke-04", "shorts_creator", "upload_short_media"),
  createStreamFoundationSourceOnlyRequest("136D-smoke-05", "business_stream", "request_business_product_attach"),
  createStreamFoundationSourceOnlyRequest("136D-smoke-06", "wallet_gift_boundary", "request_gift_send"),
] as const;

const smokeResponses = smokeRequests.map((request) => createStreamFoundationResponseEnvelope(request));

export type Stream136dBackendFoundationCoreStagingManifest = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136D";
  mode: "backend_foundation_core_contracts_local_staging_only";
  assembledHereFirst: true;
  directServerWriteAllowed: false;
  mobileProjectTouched: false;
  sourceOnly: true;
  coreFiles: readonly string[];
  readiness: typeof readiness;
  safetyAudit: typeof safetyAudit;
  smoke: Readonly<{
    total: number;
    localPreviewOnly: number;
    blocked: number;
    reviewRequired: number;
    locked: number;
    providerNotConfigured: number;
  }>;
}>;

export const stream136dBackendFoundationCoreStagingManifest: Stream136dBackendFoundationCoreStagingManifest = {
  stage: "BACKEND_STREAM_FOUNDATION_136D",
  mode: "backend_foundation_core_contracts_local_staging_only",
  assembledHereFirst: true,
  directServerWriteAllowed: false,
  mobileProjectTouched: false,
  sourceOnly: true,
  coreFiles: [
    "src/modules/stream/foundation/core/streamFoundationCoreTypes.ts",
    "src/modules/stream/foundation/core/streamFoundationGatePolicy.ts",
    "src/modules/stream/foundation/core/streamFoundationResponseEnvelope.ts",
    "src/modules/stream/foundation/core/streamFoundationReadinessIndex.ts",
    "src/modules/stream/foundation/core/streamFoundationSafetyAudit.ts",
    "src/modules/stream/foundation/core/index.ts",
  ],
  readiness,
  safetyAudit,
  smoke: {
    total: smokeResponses.length,
    localPreviewOnly: smokeResponses.filter((entry) => entry.ok).length,
    blocked: smokeResponses.filter((entry) => entry.severity === "blocked").length,
    reviewRequired: smokeResponses.filter((entry) => entry.severity === "review_required").length,
    locked: smokeResponses.filter((entry) => entry.severity === "locked").length,
    providerNotConfigured: smokeResponses.filter((entry) => entry.safeCode === "STREAM_PROVIDER_NOT_CONFIGURED").length,
  },
};

export function getStream136dBackendFoundationCoreStagingManifest(): Stream136dBackendFoundationCoreStagingManifest {
  return stream136dBackendFoundationCoreStagingManifest;
}

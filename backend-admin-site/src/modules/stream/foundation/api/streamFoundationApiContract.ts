import type {
  StreamFoundationAction,
  StreamFoundationResponseEnvelope,
  StreamFoundationSafetySnapshot,
  StreamFoundationSurface,
} from "../core";
import type { StreamFoundationOrchestratorDecision } from "../orchestrator";

export type StreamFoundationApiDraftStage = "BACKEND_STREAM_FOUNDATION_136G_API_CONTRACT_STAGING";

export type StreamFoundationApiMethod = "POST";

export type StreamFoundationApiPath =
  | "/api/stream/foundation/preview"
  | "/api/stream/foundation/readiness"
  | "/api/stream/foundation/safety";

export type StreamFoundationApiEndpointId =
  | "stream_foundation_preview_endpoint_contract"
  | "stream_foundation_readiness_endpoint_contract"
  | "stream_foundation_safety_endpoint_contract";

export type StreamFoundationApiEndpointDescriptor = Readonly<{
  endpointId: StreamFoundationApiEndpointId;
  method: StreamFoundationApiMethod;
  path: StreamFoundationApiPath;
  descriptionKey: string;
  acceptsMobileKernelEnvelope: boolean;
  returnsSafeEnvelope: true;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationApiPreviewBody = Readonly<{
  requestId: string;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  userId?: string;
  sessionId?: string;
  locale?: string;
  correlationId?: string;
  metadata?: Readonly<Record<string, string | number | boolean | null>>;
}>;

export type StreamFoundationApiValidationIssue = Readonly<{
  field: string;
  safeMessageKey: string;
}>;

export type StreamFoundationApiDraftResponse = Readonly<{
  stage: StreamFoundationApiDraftStage;
  endpointId: StreamFoundationApiEndpointId;
  ok: boolean;
  status: 200 | 400 | 409;
  safeCode: string;
  safeMessageKey: string;
  validationIssues: readonly StreamFoundationApiValidationIssue[];
  orchestratorDecision?: StreamFoundationOrchestratorDecision;
  responseEnvelope?: StreamFoundationResponseEnvelope;
  safety: StreamFoundationApiSafety;
}>;

export type StreamFoundationApiSafety = Readonly<{
  sourceOnlyNow: true;
  routeContractOnlyNow: true;
  routeMountedNow: false;
  appServerTouchedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  externalNetworkAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInResponse: false;
}>;

export type StreamFoundationApiContractSnapshot = Readonly<{
  stage: StreamFoundationApiDraftStage;
  endpointContracts: readonly StreamFoundationApiEndpointDescriptor[];
  mountedEndpointsNow: 0;
  runtimeExecutionReadyNow: false;
  databaseWriteReadyNow: false;
  providerCallReadyNow: false;
  samplePreviewCases: number;
  samplePreviewPassed: number;
  safety: StreamFoundationApiSafety;
  coreSafety: StreamFoundationSafetySnapshot;
}>;

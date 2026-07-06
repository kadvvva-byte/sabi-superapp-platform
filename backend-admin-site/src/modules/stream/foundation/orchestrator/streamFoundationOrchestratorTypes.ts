import type {
  StreamFoundationAction,
  StreamFoundationMobileAction,
  StreamFoundationRequestEnvelope,
  StreamFoundationResponseEnvelope,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import type { StreamFoundationPortDecision, StreamFoundationPortId, StreamFoundationPortSafety } from "../ports";

export type StreamFoundationOrchestratorStage = "BACKEND_STREAM_FOUNDATION_136F_ORCHESTRATOR_STAGING";

export type StreamFoundationOrchestratorMode =
  | "source_only_preview"
  | "blocked_backend_common_missing"
  | "blocked_admin_gate_missing"
  | "blocked_provider_not_configured"
  | "locked_wallet_gift_last_stage"
  | "blocked_unknown_request";

export type StreamFoundationOrchestratorRequest = Readonly<{
  request: StreamFoundationRequestEnvelope;
  source: "mobile_kernel_handoff" | "backend_staging_smoke";
  correlationId: string;
}>;

export type StreamFoundationOrchestratorDecision = Readonly<{
  stage: StreamFoundationOrchestratorStage;
  mode: StreamFoundationOrchestratorMode;
  ok: boolean;
  safeCode: StreamFoundationSafeCode;
  safeMessageKey: string;
  severity: StreamFoundationSeverity;
  mobileAction: StreamFoundationMobileAction;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  expectedPorts: readonly StreamFoundationPortId[];
  portDecisions: readonly StreamFoundationPortDecision[];
  responseEnvelope: StreamFoundationResponseEnvelope;
  safety: StreamFoundationPortSafety;
}>;

export type StreamFoundationOrchestratorSampleCase = Readonly<{
  requestId: string;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  expectedMode: StreamFoundationOrchestratorMode;
  expectedOk: boolean;
}>;

export type StreamFoundationOrchestratorSnapshot = Readonly<{
  stage: StreamFoundationOrchestratorStage;
  totalCases: number;
  passedCases: number;
  failedCases: number;
  sourceOnlyPreviewCases: number;
  backendBlockedCases: number;
  adminBlockedCases: number;
  providerBlockedCases: number;
  lastStageLockedCases: number;
  runtimeExecutionReadyCases: 0;
  routeMountReadyNow: false;
  databaseWriteReadyNow: false;
  providerCallReadyNow: false;
  samples: readonly StreamFoundationOrchestratorDecision[];
  safety: StreamFoundationPortSafety;
}>;

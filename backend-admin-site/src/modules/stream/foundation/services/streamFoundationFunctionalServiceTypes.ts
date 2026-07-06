import type {
  StreamFoundationAction,
  StreamFoundationRequestEnvelope,
  StreamFoundationResponseEnvelope,
  StreamFoundationSafetySnapshot,
  StreamFoundationSurface,
} from "../core";
import type { StreamFoundationOrchestratorDecision } from "../orchestrator";

export type StreamFoundationFunctionalServiceStage = "BACKEND_STREAM_FOUNDATION_136O_FUNCTIONAL_STAGING";

export type StreamFoundationFunctionalStatus =
  | "completed_local_preview"
  | "blocked_by_gate"
  | "locked_last_stage"
  | "validation_failed";

export type StreamFoundationLocalEntityKind =
  | "surface_preview"
  | "live_draft"
  | "short_draft"
  | "creator_verification_review_draft";

export type StreamFoundationLocalEntity = Readonly<{
  entityKind: StreamFoundationLocalEntityKind;
  entityId: string;
  requestId: string;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  ownerScope: StreamFoundationRequestEnvelope["ownerScope"];
  locale: string;
  status: "local_preview_only" | "review_required_local_draft";
  persistedToDatabaseNow: false;
  providerSyncedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationFunctionalValidationIssue = Readonly<{
  field: string;
  safeMessageKey: string;
}>;

export type StreamFoundationFunctionalAuditEntry = Readonly<{
  auditId: string;
  requestId: string;
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  status: StreamFoundationFunctionalStatus;
  safeCode: string;
  persistedToDatabaseNow: false;
  externalAuditSinkCalledNow: false;
  secretMaterialStoredNow: false;
}>;

export type StreamFoundationFunctionalResult = Readonly<{
  stage: StreamFoundationFunctionalServiceStage;
  handled: true;
  ok: boolean;
  status: StreamFoundationFunctionalStatus;
  request: Readonly<{
    requestId: string;
    surface: StreamFoundationSurface;
    action: StreamFoundationAction;
  }>;
  validationIssues: readonly StreamFoundationFunctionalValidationIssue[];
  localEntity?: StreamFoundationLocalEntity;
  decision: StreamFoundationOrchestratorDecision;
  responseEnvelope: StreamFoundationResponseEnvelope;
  auditEntry: StreamFoundationFunctionalAuditEntry;
  safety: StreamFoundationFunctionalSafety;
}>;

export type StreamFoundationFunctionalSafety = StreamFoundationSafetySnapshot & Readonly<{
  localInMemoryPreviewAllowedNow: true;
  allKnownActionsHandledByFunctionalService: true;
  routeMountedNow: false;
  externalNetworkAllowedNow: false;
  dataStoreClientUsedNow: false;
  schemaMutationAllowedNow: false;
  migrationAllowedNow: false;
  eventBusPublishAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
}>;

export type StreamFoundationFunctionalStoreSnapshot = Readonly<{
  stage: StreamFoundationFunctionalServiceStage;
  surfacePreviews: number;
  liveDrafts: number;
  shortDrafts: number;
  creatorVerificationReviewDrafts: number;
  auditEntries: number;
  databaseRowsWrittenNow: 0;
  providerCallsNow: 0;
  fakeRowsNow: 0;
}>;

export type StreamFoundationFunctionalCoverageItem = Readonly<{
  surface: StreamFoundationSurface;
  action: StreamFoundationAction;
  status: StreamFoundationFunctionalStatus;
  handled: true;
  ok: boolean;
  safeCode: string;
}>;

export type StreamFoundationFunctionalCoverageSnapshot = Readonly<{
  stage: StreamFoundationFunctionalServiceStage;
  totalSurfaceActionPairs: number;
  handledSurfaceActionPairs: number;
  unhandledSurfaceActionPairs: 0;
  localPreviewCompleted: number;
  blockedByGate: number;
  lockedLastStage: number;
  validationFailed: 0;
  coveragePercent: 100;
  items: readonly StreamFoundationFunctionalCoverageItem[];
  storeSnapshot: StreamFoundationFunctionalStoreSnapshot;
  safety: StreamFoundationFunctionalSafety;
}>;

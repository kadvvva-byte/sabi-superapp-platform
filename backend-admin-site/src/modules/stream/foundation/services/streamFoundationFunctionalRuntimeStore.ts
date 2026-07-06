import type {
  StreamFoundationFunctionalAuditEntry,
  StreamFoundationFunctionalServiceStage,
  StreamFoundationFunctionalStoreSnapshot,
  StreamFoundationLocalEntity,
  StreamFoundationLocalEntityKind,
} from "./streamFoundationFunctionalServiceTypes";
import type { StreamFoundationRequestEnvelope } from "../core";

const STAGE: StreamFoundationFunctionalServiceStage = "BACKEND_STREAM_FOUNDATION_136O_FUNCTIONAL_STAGING";

export class StreamFoundationFunctionalRuntimeStore {
  private readonly surfacePreviews = new Map<string, StreamFoundationLocalEntity>();
  private readonly liveDrafts = new Map<string, StreamFoundationLocalEntity>();
  private readonly shortDrafts = new Map<string, StreamFoundationLocalEntity>();
  private readonly creatorVerificationReviewDrafts = new Map<string, StreamFoundationLocalEntity>();
  private readonly auditEntries: StreamFoundationFunctionalAuditEntry[] = [];

  createLocalEntity(request: StreamFoundationRequestEnvelope, entityKind: StreamFoundationLocalEntityKind): StreamFoundationLocalEntity {
    const entity: StreamFoundationLocalEntity = {
      entityKind,
      entityId: `stream-local-${entityKind}-${request.requestId}`,
      requestId: request.requestId,
      surface: request.surface,
      action: request.action,
      ownerScope: request.ownerScope,
      locale: request.locale ?? "system_default",
      status: entityKind === "creator_verification_review_draft" ? "review_required_local_draft" : "local_preview_only",
      persistedToDatabaseNow: false,
      providerSyncedNow: false,
      fakeSuccessAllowed: false,
    };

    if (entityKind === "surface_preview") this.surfacePreviews.set(entity.entityId, entity);
    if (entityKind === "live_draft") this.liveDrafts.set(entity.entityId, entity);
    if (entityKind === "short_draft") this.shortDrafts.set(entity.entityId, entity);
    if (entityKind === "creator_verification_review_draft") this.creatorVerificationReviewDrafts.set(entity.entityId, entity);

    return entity;
  }

  appendAuditEntry(entry: StreamFoundationFunctionalAuditEntry): StreamFoundationFunctionalAuditEntry {
    this.auditEntries.push(entry);
    return entry;
  }

  snapshot(): StreamFoundationFunctionalStoreSnapshot {
    return {
      stage: STAGE,
      surfacePreviews: this.surfacePreviews.size,
      liveDrafts: this.liveDrafts.size,
      shortDrafts: this.shortDrafts.size,
      creatorVerificationReviewDrafts: this.creatorVerificationReviewDrafts.size,
      auditEntries: this.auditEntries.length,
      databaseRowsWrittenNow: 0,
      providerCallsNow: 0,
      fakeRowsNow: 0,
    };
  }
}

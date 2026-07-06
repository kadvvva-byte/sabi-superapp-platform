export type OwnerSabiAiReportSeverity251D = 'green' | 'yellow' | 'red' | 'critical';
export type OwnerSabiAiReportState251D = 'draft' | 'owner_review_required' | 'owner_approved' | 'archived';

export interface OwnerSabiAiDailyReportCard251D {
  key: string;
  labelRu: string;
  readinessField: string;
  currentReadiness: number;
}

export interface OwnerSabiAiDailyReportSection251D {
  key: string;
  order: number;
  severity: OwnerSabiAiReportSeverity251D;
  titleRu: string;
  titleEn: string;
  purpose: string;
  cards: OwnerSabiAiDailyReportCard251D[];
}

export interface OwnerSabiAiDailyReportShell251D {
  version: string;
  code: string;
  status: string;
  mountedNow: false;
  adminRouteConnectedNow: false;
  runtimeDataConnectedNow: false;
  ownerOnlyFinalVisibility: true;
  title: Record<'ru' | 'en', string>;
  visibilityModel: Record<string, unknown>;
  sections: OwnerSabiAiDailyReportSection251D[];
  reportStates: OwnerSabiAiReportState251D[];
  allowedActionsIn251D: string[];
  forbiddenActionsIn251D: string[];
}

export interface OwnerSabiAiAdminPreviewModel251D {
  version: string;
  code: string;
  status: string;
  routeSuggestionNotMounted: string;
  componentSuggestionNotConnected: string;
  visibleBlocks: Array<Record<string, unknown>>;
  emptyState: Record<'ru' | 'en', string>;
  ownerDecisionBanner: Record<'ru' | 'en', string>;
}

export interface OwnerSabiAiDailyReportSample251D {
  version: string;
  code: string;
  status: string;
  generatedAt: string;
  reportId: string;
  riskLevel: OwnerSabiAiReportSeverity251D;
  finalActionsExecuted: false;
  ownerActionRequired: true;
  summaryRu: string;
  readiness: Record<string, number>;
  blockers: string[];
  evidencePrepared: string[];
}

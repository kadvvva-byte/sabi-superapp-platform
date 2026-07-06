export type TaxiOrdersLostPropertyAuditTimelineReadiness010F = Readonly<{
  version: string;
  servicePurpose: string;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  auditModel: 'TaxiAuditLog';
  supportCaseModel: 'TaxiSupportCase';
  caseType: 'lost_property';
  readOnlyTimeline: true;
  createsCase: false;
  updatesCase: false;
  deletesCase: false;
  rawPassengerPiiBlocked: true;
  rawDriverPiiBlocked: true;
  adminNoteRedacted: true;
  itemDescriptionRedacted: true;
  passengerMessageRedacted: true;
  passengerDriverDirectContactBlocked: true;
  adminMediatedContactOnly: true;
  noFakeTripCreate: true;
  noFakeCaseCreate: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersLostPropertyAuditPayloadSummary010F = Readonly<Record<string, string | number | boolean>>;

export type TaxiOrdersLostPropertyAuditTimelineItem010F = Readonly<{
  auditId: string;
  supportCaseId: string;
  tripId: string;
  actorType: string;
  actorIdMasked: string;
  action: string;
  targetType: string;
  createdAt: string;
  payloadSummary: TaxiOrdersLostPropertyAuditPayloadSummary010F;
  rawPiiBlocked: true;
  adminNoteRedacted: true;
  itemDescriptionRedacted: true;
  passengerMessageRedacted: true;
  contactMediatedByAdmin: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersLostPropertyAuditTimelineResult010F = Readonly<{
  ok: true;
  version: string;
  code: string;
  supportCaseId: string;
  tripId: string;
  limit: number;
  caseVerified: boolean;
  timeline: TaxiOrdersLostPropertyAuditTimelineItem010F[];
  readOnlyTimeline: true;
  safeRedaction: true;
  rawPiiBlocked: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

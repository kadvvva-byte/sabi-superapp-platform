export type TaxiOrdersLostPropertySupportStatus010B = 'open' | 'waiting_for_user' | 'under_review' | 'resolved' | 'rejected' | 'escalated';

export type TaxiOrdersLostPropertyCounts010B = Readonly<{
  taxiTrips: number;
  lostPropertyCases: number;
  openLostPropertyCases: number;
  underReviewLostPropertyCases: number;
  resolvedLostPropertyCases: number;
  auditLogs: number;
}>;

export type TaxiOrdersLostPropertyReadiness010B = Readonly<{
  version: string;
  servicePurpose: string;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  supportCaseModel: 'TaxiSupportCase';
  auditModel: 'TaxiAuditLog';
  tripModel: 'TaxiTrip';
  createsFromExistingTaxiTripOnly: true;
  rawPassengerPiiBlockedInList: true;
  rawDriverPiiBlockedInList: true;
  adminMediatedContactOnly: true;
  passengerDriverDirectContactBlocked: true;
  protectedCreateRequiresExactHeader: true;
  protectedUpdateRequiresExactHeader: true;
  noFakeTripCreate: true;
  noFakeCaseCreate: true;
  noLocalArchive: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteOnlyThroughProtectedBackend: true;
}>;

export type TaxiOrdersLostPropertyCaseSummary010B = Readonly<{
  supportCaseId: string;
  tripId: string;
  status: string;
  caseType: string;
  priority: number;
  assignedAdminIdMasked: string;
  createdAt: string;
  updatedAt: string;
  safeTripRef: Readonly<{
    tripId: string;
    driverProfileIdMasked: string;
    vehicleIdMasked: string;
    tripStatus: string;
    completedAt: string;
  }>;
  rawPiiBlocked: true;
  contactMediatedByAdmin: true;
}>;

export type TaxiOrdersLostPropertyStatus010B = Readonly<{
  ok: true;
  version: string;
  code: string;
  counts: TaxiOrdersLostPropertyCounts010B;
  canCreateLostPropertyCaseFromTrip: boolean;
  nextAdminAction: string;
  noFakeRows: true;
  noFakeCreate: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersLostPropertyList010B = Readonly<{
  ok: true;
  version: string;
  code: string;
  counts: TaxiOrdersLostPropertyCounts010B;
  cases: TaxiOrdersLostPropertyCaseSummary010B[];
  readOnlyList: true;
  safeRedaction: true;
  rawPiiBlocked: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersLostPropertyCreateInput010B = Readonly<{
  tripId?: unknown;
  itemDescription?: unknown;
  passengerMessage?: unknown;
  lastSeenHint?: unknown;
  priority?: unknown;
  assignedAdminId?: unknown;
  idempotencyKey?: unknown;
  reason?: unknown;
}>;

export type TaxiOrdersLostPropertyUpdateInput010B = Readonly<{
  supportCaseId?: unknown;
  status?: unknown;
  workflowStage?: unknown;
  adminNote?: unknown;
  idempotencyKey?: unknown;
  reason?: unknown;
}>;

export type TaxiOrdersLostPropertyWriteResult010B = Readonly<{
  ok: boolean;
  statusCode: number;
  version: string;
  code: string;
  supportCaseId: string;
  tripId: string;
  status: string;
  workflowStage: string;
  idempotencyKey: string;
  message?: string;
  existingTaxiTripVerified: boolean;
  fakeTripCreateBlocked: true;
  fakeCaseCreateBlocked: true;
  rawPiiExposedToList: false;
  passengerDriverDirectContactBlocked: true;
  adminMediatedContactOnly: true;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  providerDispatch: false;
  walletMutation: false;
}>;

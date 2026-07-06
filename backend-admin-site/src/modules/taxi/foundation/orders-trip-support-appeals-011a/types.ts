export type TaxiOrdersTripSupportStatus011A = 'open' | 'waiting_for_user' | 'under_review' | 'resolved' | 'rejected' | 'escalated';
export type TaxiOrdersTripSupportCategory011A = 'trip_issue' | 'driver_behavior' | 'passenger_behavior' | 'route_dispute' | 'fare_dispute' | 'safety_concern' | 'service_quality' | 'other';

export type TaxiOrdersTripSupportCounts011A = Readonly<{
  taxiTrips: number;
  tripSupportCases: number;
  openTripSupportCases: number;
  underReviewTripSupportCases: number;
  escalatedTripSupportCases: number;
  resolvedTripSupportCases: number;
  auditLogs: number;
}>;

export type TaxiOrdersTripSupportReadiness011A = Readonly<{
  version: string;
  servicePurpose: string;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  supportCaseModel: 'TaxiSupportCase';
  auditModel: 'TaxiAuditLog';
  tripModel: 'TaxiTrip';
  createsFromExistingTaxiTripOnly: true;
  supportsPassengerAppeals: true;
  supportsDriverAppeals: true;
  supportsTripDisputes: true;
  rawPassengerPiiBlockedInList: true;
  rawDriverPiiBlockedInList: true;
  adminMediatedContactOnly: true;
  passengerDriverDirectContactBlocked: true;
  protectedCreateRequiresExactHeader: true;
  protectedUpdateRequiresExactHeader: true;
  noFakeTripCreate: true;
  noFakeCaseCreate: true;
  noLocalPenalty: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteOnlyThroughProtectedBackend: true;
}>;

export type TaxiOrdersTripSupportCaseSummary011A = Readonly<{
  supportCaseId: string;
  tripId: string;
  status: string;
  caseType: string;
  category: string;
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

export type TaxiOrdersTripSupportStatusResponse011A = Readonly<{
  ok: true;
  version: string;
  code: string;
  counts: TaxiOrdersTripSupportCounts011A;
  canCreateSupportCaseFromTrip: boolean;
  nextAdminAction: string;
  noFakeRows: true;
  noFakeCreate: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersTripSupportList011A = Readonly<{
  ok: true;
  version: string;
  code: string;
  counts: TaxiOrdersTripSupportCounts011A;
  cases: TaxiOrdersTripSupportCaseSummary011A[];
  readOnlyList: true;
  safeRedaction: true;
  rawPiiBlocked: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersTripSupportCreateInput011A = Readonly<{
  tripId?: unknown;
  category?: unknown;
  issueSummary?: unknown;
  passengerMessage?: unknown;
  driverMessage?: unknown;
  evidenceHint?: unknown;
  priority?: unknown;
  assignedAdminId?: unknown;
  idempotencyKey?: unknown;
  reason?: unknown;
}>;

export type TaxiOrdersTripSupportUpdateInput011A = Readonly<{
  supportCaseId?: unknown;
  status?: unknown;
  workflowStage?: unknown;
  adminNote?: unknown;
  idempotencyKey?: unknown;
  reason?: unknown;
}>;

export type TaxiOrdersTripSupportWriteResult011A = Readonly<{
  ok: boolean;
  statusCode: number;
  version: string;
  code: string;
  supportCaseId: string;
  tripId: string;
  status: string;
  category: string;
  workflowStage: string;
  idempotencyKey: string;
  message?: string;
  existingTaxiTripVerified: boolean;
  fakeTripCreateBlocked: true;
  fakeCaseCreateBlocked: true;
  rawPiiExposedToList: false;
  passengerDriverDirectContactBlocked: true;
  adminMediatedContactOnly: true;
  noLocalPenalty: true;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  providerDispatch: false;
  walletMutation: false;
}>;

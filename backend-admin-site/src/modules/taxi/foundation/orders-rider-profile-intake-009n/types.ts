export type TaxiOrdersRiderProfileIntakeReadiness009N = Readonly<{
  version: string;
  createsFromExistingUserOnly: true;
  fakeUserCreateBlocked: true;
  fakeRiderCreateBlocked: true;
  protectedCreateRequiresExactHeader: true;
  idempotencyRequired: true;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  userDelegateCandidates: readonly string[];
  dbWriteOnlyForExistingUserProfileCreate: true;
  auditStorage: 'TaxiAuditLog';
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersRiderProfileIntakeStatus009N = Readonly<{
  ok: true;
  version: string;
  code: 'taxi_orders_009n_rider_profile_intake_status_loaded';
  counts: Readonly<{
    riderProfiles: number;
    auditLogs: number;
  }>;
  userDelegateAvailable: boolean;
  availableUserDelegateNames: readonly string[];
  canCreateRiderProfileFromExistingUser: boolean;
  nextOwnerAction: string;
  noFakeRows: true;
  noFakeCreate: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersRiderProfileCreateInput009N = Readonly<{
  userId?: string;
  countryCode?: string;
  cityId?: string;
  trustStatus?: string;
  idempotencyKey?: string;
  reason?: string;
}>;

export type TaxiOrdersRiderProfileCreateResult009N = Readonly<{
  ok: boolean;
  statusCode: number;
  code: string;
  riderProfileId: string;
  idempotent: boolean;
  existingUserVerified: boolean;
  fakeUserCreateBlocked: true;
  fakeRiderCreateBlocked: true;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  providerDispatch: false;
  walletMutation: false;
  message?: string;
}>;

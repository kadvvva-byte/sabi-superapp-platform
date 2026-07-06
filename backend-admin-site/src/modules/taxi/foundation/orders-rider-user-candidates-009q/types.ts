export type TaxiOrdersRiderUserCandidatesReadiness009Q = Readonly<{
  version: string;
  queuePurpose: 'show_existing_real_users_for_009n_rider_profile_intake';
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  userDelegateCandidates: readonly string[];
  readOnlyList: true;
  safeRedaction: true;
  fullRawPiiBlocked: true;
  fakeUserCreateBlocked: true;
  fakeRiderCreateBlocked: true;
  noAutofill: true;
  noFakePayload: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteExecuted: false;
}>;

export type TaxiOrdersRiderUserCandidate009Q = Readonly<{
  userId: string;
  userDelegateName: string;
  safeDisplayName: string;
  maskedEmail: string;
  maskedPhone: string;
  createdAt: string;
  riderProfileExists: boolean;
  canUseFor009N: boolean;
  redacted: true;
  rawPiiBlocked: true;
}>;

export type TaxiOrdersRiderUserCandidatesList009Q = Readonly<{
  ok: true;
  version: string;
  code: 'taxi_orders_009q_rider_user_candidates_loaded';
  counts: Readonly<{
    users: number;
    riderProfiles: number;
    candidates: number;
  }>;
  selectedUserDelegateName: string;
  availableUserDelegateNames: readonly string[];
  candidates: readonly TaxiOrdersRiderUserCandidate009Q[];
  nextOwnerAction: string;
  readOnlyList: true;
  safeRedaction: true;
  fullRawPiiBlocked: true;
  fakeUserCreateBlocked: true;
  fakeRiderCreateBlocked: true;
  noAutofill: true;
  noFakePayload: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

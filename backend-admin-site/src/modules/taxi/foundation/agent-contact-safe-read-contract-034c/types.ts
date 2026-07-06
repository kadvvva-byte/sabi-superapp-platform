import type {
  TAXI_AGENT_CONTACT_SAFE_READ_ALLOWED_FIELDS_034C,
  TAXI_AGENT_CONTACT_SAFE_READ_BLOCKED_RAW_FIELDS_034C,
  TAXI_AGENT_CONTACT_SAFE_READ_CONTACT_CHANNELS_034C,
  TAXI_AGENT_CONTACT_SAFE_READ_ENDPOINTS_034C,
  TAXI_AGENT_CONTACT_SAFE_READ_PERMISSION_GATES_034C,
  TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION,
} from './constants';

export type TaxiAgentContactSafeReadEndpoint034C = typeof TAXI_AGENT_CONTACT_SAFE_READ_ENDPOINTS_034C[number];
export type TaxiAgentContactSafeReadAllowedField034C = typeof TAXI_AGENT_CONTACT_SAFE_READ_ALLOWED_FIELDS_034C[number];
export type TaxiAgentContactSafeReadBlockedRawField034C = typeof TAXI_AGENT_CONTACT_SAFE_READ_BLOCKED_RAW_FIELDS_034C[number];
export type TaxiAgentContactSafeReadPermissionGate034C = typeof TAXI_AGENT_CONTACT_SAFE_READ_PERMISSION_GATES_034C[number];
export type TaxiAgentContactSafeReadContactChannel034C = typeof TAXI_AGENT_CONTACT_SAFE_READ_CONTACT_CHANNELS_034C[number];

export type TaxiAgentContactSafeReadSafety034C = Readonly<{
  envFileReadOrDumped: false;
  dbReadPerformedBy034C: false;
  dbWritePerformedBy034C: false;
  walletMutationPerformedBy034C: false;
  providerCallPerformedBy034C: false;
  paymentExecutedBy034C: false;
  payoutExecutedBy034C: false;
  moneyMovementPerformedBy034C: false;
  rawPersonalDataReturned: false;
  fakeSuccessIntroduced: false;
}>;

export type TaxiAgentContactSafeReadReadiness034C = Readonly<{
  version: typeof TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION;
  status: 'mounted_safe_read_contract_no_execution_until_034d_db_read_binding';
  mobile034BFix1Compatible: true;
  backendAgentContactSafeReadContract: 100;
  approvedAgentDirectoryContractReady: 100;
  approvedAgentProfileReadModelReady: 100;
  driverBalanceEligibilityReadModelReady: 100;
  topupHandoffContractReady: 100;
  receiptProofIntakeContractReady: 100;
  ownerSabiAiReviewContractReady: 100;
  existingAgentFinanceBridge030AAcknowledged: true;
  realDbReadExecution: 'not_executed_here_next_034d';
  walletPaymentPayoutTopupExecution: 'locked_until_owner_approval_wallet_chain';
  endpoints: readonly TaxiAgentContactSafeReadEndpoint034C[];
  allowedFields: readonly TaxiAgentContactSafeReadAllowedField034C[];
  blockedRawFields: readonly TaxiAgentContactSafeReadBlockedRawField034C[];
  permissionGates: readonly TaxiAgentContactSafeReadPermissionGate034C[];
  contactChannels: readonly TaxiAgentContactSafeReadContactChannel034C[];
  safety: TaxiAgentContactSafeReadSafety034C;
}>;

export type TaxiAgentContactSafeReadContract034C = Readonly<{
  version: typeof TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION;
  purpose: 'mobile_agent_contact_backend_contract_for_034b_fix1';
  mobileScreen: 'TaxiAgentContactRuntimeContract034BFix1';
  dataPolicy: 'redacted_safe_read_contract_only_no_raw_personal_rows';
  approvedAgentDirectory: 'contract_ready_safe_empty_until_034d_db_read_binding';
  driverBalanceEligibility: 'contract_ready_safe_empty_until_wallet_ledger_chain';
  contactRequest: 'safe_disabled_until_mobile_auth_db_messenger_owner_review';
  ownerSabiAi: 'review_contract_ready_report_only_no_mutation';
  endpoints: readonly TaxiAgentContactSafeReadEndpoint034C[];
  allowedFields: readonly TaxiAgentContactSafeReadAllowedField034C[];
  blockedRawFields: readonly TaxiAgentContactSafeReadBlockedRawField034C[];
  permissionGates: readonly TaxiAgentContactSafeReadPermissionGate034C[];
  contactChannels: readonly TaxiAgentContactSafeReadContactChannel034C[];
  safety: TaxiAgentContactSafeReadSafety034C;
}>;

export type TaxiAgentContactSafeReadDirectory034C = Readonly<{
  version: typeof TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION;
  directoryStatus: 'safe_empty_until_approved_agent_db_read_binding_034d';
  records: readonly [];
  allowedFields: readonly TaxiAgentContactSafeReadAllowedField034C[];
  rawPersonalDataReturned: false;
  dbReadPerformedBy034C: false;
}>;

export type TaxiAgentContactSafeReadBlockedResponse034C = Readonly<{
  ok: false;
  error: 'taxi_agent_contact_request_safe_disabled_until_runtime_binding';
  code: string;
  version: typeof TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION;
  safeDisabled: true;
  mobile034BFix1Compatible: true;
  ownerSabiAiReviewRequired: true;
  dbReadPerformedBy034C: false;
  dbWritePerformedBy034C: false;
  walletMutationPerformedBy034C: false;
  providerCallPerformedBy034C: false;
  paymentExecutedBy034C: false;
  payoutExecutedBy034C: false;
  moneyMovementPerformedBy034C: false;
  fakeSuccessBlocked: true;
}>;

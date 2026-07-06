import type {
  TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_PERMISSION_GATES_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_ENDPOINTS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
} from './constants';

export type TaxiApprovedAgentDirectoryEndpoint034D = typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_ENDPOINTS_034D[number];
export type TaxiApprovedAgentDirectorySafeField034D = typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D[number];
export type TaxiApprovedAgentDirectoryBlockedRawField034D = typeof TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D[number];
export type TaxiApprovedAgentDirectoryFilter034D = typeof TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D[number];
export type TaxiApprovedAgentDirectoryPermissionGate034D = typeof TAXI_APPROVED_AGENT_DIRECTORY_PERMISSION_GATES_034D[number];

export type TaxiApprovedAgentDirectorySafety034D = Readonly<{
  envFileReadOrDumped: false;
  dbWritePerformedBy034D: false;
  walletMutationPerformedBy034D: false;
  providerCallPerformedBy034D: false;
  paymentExecutedBy034D: false;
  payoutExecutedBy034D: false;
  moneyMovementPerformedBy034D: false;
  rawPersonalDataReturned: false;
  fakeSuccessIntroduced: false;
}>;

export type TaxiApprovedAgentDirectorySafeRecord034D = Readonly<{
  agentPublicId: string;
  countryCode: string;
  cityCode: string;
  serviceRegion: string;
  displayName: string;
  verificationBadge: 'approved_agent';
  contactChannels: readonly string[];
  balanceTopupHelpEnabled: boolean;
  receiptProofRequired: boolean;
  ownerSabiAiReviewRequired: boolean;
  runtimeStatus: 'safe_read_runtime_record';
}>;

export type TaxiApprovedAgentDirectoryReadiness034D = Readonly<{
  version: typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION;
  status: 'approved_agent_directory_safe_read_runtime_mounted_no_money_execution';
  mobile034BFix1Compatible: true;
  backend034CSafeReadContractRequired: true;
  approvedAgentDirectorySafeReadRuntime: 100;
  redactedDirectoryRecordShape: 100;
  directoryFilterContract: 100;
  ownerSabiAiReviewBoundary: 100;
  walletPaymentPayoutTopupExecution: 'locked_until_owner_approval_wallet_chain';
  dbWriteExecution: 'blocked';
  endpoints: readonly TaxiApprovedAgentDirectoryEndpoint034D[];
  safeFields: readonly TaxiApprovedAgentDirectorySafeField034D[];
  blockedRawFields: readonly TaxiApprovedAgentDirectoryBlockedRawField034D[];
  filters: readonly TaxiApprovedAgentDirectoryFilter034D[];
  permissionGates: readonly TaxiApprovedAgentDirectoryPermissionGate034D[];
  safety: TaxiApprovedAgentDirectorySafety034D;
}>;

export type TaxiApprovedAgentDirectoryResponse034D = Readonly<{
  version: typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION;
  directoryStatus: 'safe_read_runtime_ready_redacted_records_only';
  records: readonly TaxiApprovedAgentDirectorySafeRecord034D[];
  safeFields: readonly TaxiApprovedAgentDirectorySafeField034D[];
  blockedRawFields: readonly TaxiApprovedAgentDirectoryBlockedRawField034D[];
  filters: readonly TaxiApprovedAgentDirectoryFilter034D[];
  rawPersonalDataReturned: false;
  dbWritePerformedBy034D: false;
}>;

export type TaxiApprovedAgentDirectoryAudit034D = Readonly<{
  version: typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION;
  auditStatus: 'admin_safe_read_audit_ready_no_raw_personal_data';
  mobile034B: 'compatible';
  backend034C: 'required_before_034d';
  directoryRecordCount: number;
  redactionPolicy: 'safe_fields_only';
  ownerSabiAiPrivateReportRequired: true;
  walletPaymentPayoutExecution: 'locked';
  safety: TaxiApprovedAgentDirectorySafety034D;
}>;

export type TaxiApprovedAgentDirectoryBlockedResponse034D = Readonly<{
  ok: false;
  error: 'taxi_approved_agent_directory_action_safe_disabled';
  code: string;
  version: typeof TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION;
  safeDisabled: true;
  ownerSabiAiReviewRequired: true;
  dbWritePerformedBy034D: false;
  walletMutationPerformedBy034D: false;
  providerCallPerformedBy034D: false;
  paymentExecutedBy034D: false;
  payoutExecutedBy034D: false;
  moneyMovementPerformedBy034D: false;
  fakeSuccessBlocked: true;
}>;

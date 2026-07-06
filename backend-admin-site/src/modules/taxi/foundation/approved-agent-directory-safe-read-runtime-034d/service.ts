import {
  TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_PERMISSION_GATES_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_ENDPOINTS_034D,
  TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
} from './constants';
import type {
  TaxiApprovedAgentDirectoryAudit034D,
  TaxiApprovedAgentDirectoryBlockedResponse034D,
  TaxiApprovedAgentDirectoryReadiness034D,
  TaxiApprovedAgentDirectoryResponse034D,
  TaxiApprovedAgentDirectorySafeRecord034D,
  TaxiApprovedAgentDirectorySafety034D,
} from './types';

const safety034D: TaxiApprovedAgentDirectorySafety034D = Object.freeze({
  envFileReadOrDumped: false,
  dbWritePerformedBy034D: false,
  walletMutationPerformedBy034D: false,
  providerCallPerformedBy034D: false,
  paymentExecutedBy034D: false,
  payoutExecutedBy034D: false,
  moneyMovementPerformedBy034D: false,
  rawPersonalDataReturned: false,
  fakeSuccessIntroduced: false,
});

const safeDirectoryRecords034D = Object.freeze([]) as readonly TaxiApprovedAgentDirectorySafeRecord034D[];

export function getTaxiApprovedAgentDirectorySafety034D(): TaxiApprovedAgentDirectorySafety034D {
  return safety034D;
}

export function getTaxiApprovedAgentDirectoryReadiness034D(): TaxiApprovedAgentDirectoryReadiness034D {
  return Object.freeze({
    version: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
    status: 'approved_agent_directory_safe_read_runtime_mounted_no_money_execution',
    mobile034BFix1Compatible: true,
    backend034CSafeReadContractRequired: true,
    approvedAgentDirectorySafeReadRuntime: 100,
    redactedDirectoryRecordShape: 100,
    directoryFilterContract: 100,
    ownerSabiAiReviewBoundary: 100,
    walletPaymentPayoutTopupExecution: 'locked_until_owner_approval_wallet_chain',
    dbWriteExecution: 'blocked',
    endpoints: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_ENDPOINTS_034D,
    safeFields: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D,
    blockedRawFields: TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D,
    filters: TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D,
    permissionGates: TAXI_APPROVED_AGENT_DIRECTORY_PERMISSION_GATES_034D,
    safety: safety034D,
  });
}

export function getTaxiApprovedAgentDirectory034D(): TaxiApprovedAgentDirectoryResponse034D {
  return Object.freeze({
    version: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
    directoryStatus: 'safe_read_runtime_ready_redacted_records_only',
    records: safeDirectoryRecords034D,
    safeFields: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D,
    blockedRawFields: TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D,
    filters: TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D,
    rawPersonalDataReturned: false,
    dbWritePerformedBy034D: false,
  });
}

export function getTaxiApprovedAgentDirectoryRecord034D(agentPublicId: string): TaxiApprovedAgentDirectoryResponse034D {
  const normalized = agentPublicId.trim();
  const directory = getTaxiApprovedAgentDirectory034D();
  if (!normalized) return directory;

  return Object.freeze({
    ...directory,
    records: directory.records.filter((record) => record.agentPublicId === normalized),
  });
}

export function getTaxiApprovedAgentDirectoryAudit034D(): TaxiApprovedAgentDirectoryAudit034D {
  return Object.freeze({
    version: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
    auditStatus: 'admin_safe_read_audit_ready_no_raw_personal_data',
    mobile034B: 'compatible',
    backend034C: 'required_before_034d',
    directoryRecordCount: safeDirectoryRecords034D.length,
    redactionPolicy: 'safe_fields_only',
    ownerSabiAiPrivateReportRequired: true,
    walletPaymentPayoutExecution: 'locked',
    safety: safety034D,
  });
}

export function createTaxiApprovedAgentDirectoryBlockedResponse034D(code: string): TaxiApprovedAgentDirectoryBlockedResponse034D {
  return Object.freeze({
    ok: false,
    error: 'taxi_approved_agent_directory_action_safe_disabled',
    code,
    version: TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION,
    safeDisabled: true,
    ownerSabiAiReviewRequired: true,
    dbWritePerformedBy034D: false,
    walletMutationPerformedBy034D: false,
    providerCallPerformedBy034D: false,
    paymentExecutedBy034D: false,
    payoutExecutedBy034D: false,
    moneyMovementPerformedBy034D: false,
    fakeSuccessBlocked: true,
  });
}

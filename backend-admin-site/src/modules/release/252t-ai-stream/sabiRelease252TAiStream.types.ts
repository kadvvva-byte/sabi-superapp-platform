export type SabiRelease252TAiStreamStatus = Readonly<{
  version: string;
  status: 'owner_approval_intake_no_execution';
  ownerApprovalIntakeReadiness: 100;
  approvalScopeContractReadiness: 100;
  preExecutionLocksReadiness: 100;
  nextStage252UReadinessContract: 100;
  ownerApprovalCapturedNow: 0;
  actualMountExecutedNow: 0;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

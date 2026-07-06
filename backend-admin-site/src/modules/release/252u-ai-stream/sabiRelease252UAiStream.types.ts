export type SabiRelease252UAiStreamStatus = Readonly<{
  version: string;
  status: 'owner_approved_mount_candidate_no_execution';
  ownerApprovalCapturedReadiness: 100;
  ownerApprovedMountCandidateReadiness: 100;
  safeReadResponseCandidateReadiness: 100;
  rollbackPlanReadiness: 100;
  ownerApprovalCapturedNow: 1;
  actualMountExecutedNow: 0;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

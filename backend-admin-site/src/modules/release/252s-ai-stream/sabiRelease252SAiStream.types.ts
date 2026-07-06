export type SabiRelease252SAiStreamStatus = Readonly<{
  version: string;
  status: 'runtime_mount_final_gate_contract_local_only';
  finalGateContractReadiness: 100;
  finalGateChecklistReadiness: 100;
  ownerApprovalGateContractReadiness: 100;
  rollbackRuntimeSafetyGateReadiness: 100;
  mountAllowedNow: 0;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

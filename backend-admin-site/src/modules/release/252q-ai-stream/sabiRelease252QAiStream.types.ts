export type SabiRelease252QAiStreamStatus = Readonly<{
  version: string;
  status: 'safe_read_route_candidate_code_local_only';
  candidateCodeContractReadiness: 100;
  routeCandidateDescriptorReadiness: 100;
  responseBuilderContractReadiness: 100;
  accessGuardDescriptorReadiness: 100;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

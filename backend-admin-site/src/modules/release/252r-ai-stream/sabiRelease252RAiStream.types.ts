export type SabiRelease252RAiStreamStatus = Readonly<{
  version: string;
  status: 'candidate_code_static_smoke_local_only';
  candidateCodeStaticSmokeReadiness: 100;
  builderStaticValidationReadiness: 100;
  staticSmokeResultContractReadiness: 100;
  nextStageFinalGateContractReadiness: 100;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

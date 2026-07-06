export type SabiRelease252OAiStreamStatus = Readonly<{
  version: string;
  status: 'safe_read_runtime_smoke_candidate_local_only';
  safeReadRuntimeSmokeCandidateReadiness: 100;
  localSmokeResultContractReadiness: 100;
  smokeResponseFixtureReadiness: 100;
  nextRuntimeReadinessContractReadiness: 100;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

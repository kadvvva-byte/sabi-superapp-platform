export type SabiRelease252NAiStreamStatus = Readonly<{
  version: string;
  status: 'safe_read_route_candidate_local_only';
  safeReadRouteCandidateReadiness: 100;
  safeReadResponseSnapshotReadiness: 100;
  safeReadAccessContractReadiness: 100;
  safeReadCandidateFixtureReadiness: 100;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

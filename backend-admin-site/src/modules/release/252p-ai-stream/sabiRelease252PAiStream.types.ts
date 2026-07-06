export type SabiRelease252PAiStreamStatus = Readonly<{
  version: string;
  status: 'route_mount_plan_contract_local_only';
  routeMountPlanContractReadiness: 100;
  futureHandlerShapeContractReadiness: 100;
  authRateLimitAuditPlanReadiness: 100;
  rollbackPreflightPlanReadiness: 100;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  routeMountedNow: 0;
  dbReadNow: 0;
  providerCallNow: 0;
  gatesClosed: true;
}>;

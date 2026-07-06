import type { TaxiRouteControllerImplementation002L } from '../route-controller-implementation-002l';

export type TaxiRouteMountApprovalGateKey002M =
  | 'route_controller_002l_passed'
  | 'runtime_service_002k_passed'
  | 'post_migration_db_verify_002i_passed'
  | 'taxi_schema_tables_verified'
  | 'generated_prisma_client_ready'
  | 'app_ts_mount_absent_now'
  | 'admin_auth_boundary_required'
  | 'idempotency_boundary_required'
  | 'wallet_provider_runtime_blocked'
  | 'db_runtime_limited_to_future_routes'
  | 'no_fake_success'
  | 'rollback_plan_required'
  | 'runtime_smoke_required_after_mount'
  | 'exact_owner_approval_required';

export interface TaxiRouteMountApprovalGate002M {
  readonly key: TaxiRouteMountApprovalGateKey002M;
  readonly label: string;
  readonly required: true;
  readonly expectedPassedBeforeMount: boolean;
  readonly evidenceKey: string;
}

export interface TaxiRouteMountStep002M {
  readonly step: number;
  readonly key: string;
  readonly label: string;
  readonly allowedIn002M: false;
  readonly requires002N: true;
}

export interface TaxiRouteMountApprovalSafety002M {
  readonly sourceOnlyApprovalPack: true;
  readonly envValueRead: false;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly prismaValidate: false;
  readonly prismaGenerate: false;
  readonly prismaMigration: false;
  readonly routeRuntimeMounted: false;
  readonly appRuntimeMounted: false;
  readonly adminUiRuntimeMounted: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRouteMountApproval002M {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002M-CONTROLLED-ROUTE-MOUNT-APPROVAL';
  readonly status: 'approval_pack_ready';
  readonly mountBasePath: '/api/taxi';
  readonly targetAppFile: 'src/app.ts';
  readonly routeController002L: TaxiRouteControllerImplementation002L;
  readonly routeContractCount: number;
  readonly controllerGroupCount: number;
  readonly adminRouteContractCount: number;
  readonly idempotentWriteRouteCount: number;
  readonly walletBoundaryRouteCount: number;
  readonly providerReadinessRouteCount: number;
  readonly approvalGateCount: number;
  readonly mountPlanStepCount: number;
  readonly approvalGates: readonly TaxiRouteMountApprovalGate002M[];
  readonly mountPlanSteps: readonly TaxiRouteMountStep002M[];
  readonly requiresSeparateExactOwnerApproval: true;
  readonly routeMountApprovedNow: false;
  readonly appMountApprovedNow: false;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly nextStep: '002N controlled app route mount patch';
  readonly safety: TaxiRouteMountApprovalSafety002M;
}

export interface TaxiRouteMountApprovalEvaluation002M {
  readonly version: TaxiRouteMountApproval002M['version'];
  readonly status: TaxiRouteMountApproval002M['status'];
  readonly routeContractCountReady: boolean;
  readonly controllerGroupCountReady: boolean;
  readonly adminRouteContractCountReady: boolean;
  readonly idempotentWriteRouteCountReady: boolean;
  readonly approvalGateCountReady: boolean;
  readonly mountPlanStepCountReady: boolean;
  readonly requiresSeparateExactOwnerApproval: true;
  readonly routeMountApprovedNow: false;
  readonly appMountApprovedNow: false;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly safety: TaxiRouteMountApprovalSafety002M;
}

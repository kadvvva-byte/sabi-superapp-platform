import type { TaxiRuntimeServiceWorkflowImplementation002K } from '../runtime-service-implementation-002k';

export type TaxiHttpMethod002L = 'GET' | 'POST' | 'PATCH';

export type TaxiControllerArea002L =
  | 'rider'
  | 'driver'
  | 'driver_application'
  | 'vehicle'
  | 'tariff'
  | 'quote_request'
  | 'dispatch_trip'
  | 'payment_settlement'
  | 'support_safety'
  | 'provider_readiness'
  | 'admin_control'
  | 'audit_realtime';

export interface TaxiControllerRouteContract002L {
  readonly key: string;
  readonly operationKey: string;
  readonly method: TaxiHttpMethod002L;
  readonly path: string;
  readonly controllerName: string;
  readonly area: TaxiControllerArea002L;
  readonly workflow: TaxiRuntimeServiceWorkflowImplementation002K;
  readonly requiresAuth: true;
  readonly requiresAdmin: boolean;
  readonly requiresIdempotencyForWrite: boolean;
  readonly requiresProviderReadiness: boolean;
  readonly requiresWalletBoundary: boolean;
  readonly requestValidatorKey: string;
  readonly responseContractKey: string;
  readonly routeMounted: false;
  readonly appMounted: false;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiControllerGroup002L {
  readonly key: TaxiControllerArea002L;
  readonly label: string;
  readonly routePrefix: string;
  readonly adminOnly: boolean;
  readonly routeMounted: false;
  readonly appMounted: false;
}

export interface TaxiControllerSafety002L {
  readonly sourceOnly: true;
  readonly envRead: false;
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
}

export interface TaxiRouteControllerReadiness002L {
  readonly runtimeService002KRequired: true;
  readonly repositoryContracts002JRequired: true;
  readonly postMigrationVerified002IRequired: true;
  readonly routeMountApprovedNow: false;
  readonly appMountApprovedNow: false;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly nextStep: '002M controlled route mount approval';
}

export interface TaxiRouteControllerImplementation002L {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002L-ROUTE-CONTROLLER-IMPLEMENTATION';
  readonly status: 'source_only_route_controller_ready';
  readonly controllerGroupCount: number;
  readonly routeContractCount: number;
  readonly adminRouteContractCount: number;
  readonly idempotentWriteRouteCount: number;
  readonly walletBoundaryRouteCount: number;
  readonly providerReadinessRouteCount: number;
  readonly controllerGroups: readonly TaxiControllerGroup002L[];
  readonly routeContracts: readonly TaxiControllerRouteContract002L[];
  readonly safety: TaxiControllerSafety002L;
  readonly readiness: TaxiRouteControllerReadiness002L;
}

export interface TaxiControllerExecutionPlanInput002L {
  readonly routeKey: string;
  readonly actorId: string;
  readonly idempotencyKey?: string;
  readonly adminApproved?: boolean;
}

export interface TaxiControllerExecutionPlan002L {
  readonly routeKey: string;
  readonly canExecuteNow: false;
  readonly blockedReason: 'app_route_mount_not_approved';
  readonly routeMounted: false;
  readonly appMounted: false;
  readonly dbExecutedInThisStage: false;
  readonly requiredNextApproval: '002M controlled route mount approval';
}

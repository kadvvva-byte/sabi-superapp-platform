import type { TaxiRepositoryOperationContract002J } from '../repository-service-contracts-002j';

export type TaxiRuntimeServiceExecutionMode002K =
  | 'source_only_not_mounted'
  | 'read_runtime_pending_route_mount'
  | 'write_runtime_pending_route_mount'
  | 'transaction_runtime_pending_route_mount';

export type TaxiRuntimeServiceOperationFamily002K =
  | 'rider_profile'
  | 'driver_profile'
  | 'driver_application'
  | 'vehicle_review'
  | 'tariff_region'
  | 'quote'
  | 'rider_request'
  | 'dispatch_offer'
  | 'trip_lifecycle'
  | 'payment_hold_reference'
  | 'driver_settlement_reference'
  | 'support_case'
  | 'dispute_evidence'
  | 'safety_event'
  | 'audit_log'
  | 'provider_readiness'
  | 'idempotency'
  | 'trip_rating_ledger'
  | 'realtime_shadow';

export type TaxiRuntimeServiceMethodKind002K =
  | 'count_ready'
  | 'list_ready'
  | 'get_ready'
  | 'create_guarded_ready'
  | 'update_guarded_ready'
  | 'audit_read_ready'
  | 'workflow_guarded_ready';

export interface TaxiRuntimeServiceDelegateBinding002K {
  readonly modelName: string;
  readonly delegateName: string;
  readonly tableName: string;
  readonly family: TaxiRuntimeServiceOperationFamily002K;
  readonly methodsReady: readonly TaxiRuntimeServiceMethodKind002K[];
  readonly routeMounted: false;
  readonly dbExecutedInThisStage: false;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}

export interface TaxiRuntimeServiceWorkflowImplementation002K {
  readonly key: string;
  readonly operation: TaxiRepositoryOperationContract002J;
  readonly implementationName: string;
  readonly executionMode: TaxiRuntimeServiceExecutionMode002K;
  readonly requiresAuth: true;
  readonly requiresAdminForWrite: boolean;
  readonly requiresIdempotencyForWrite: boolean;
  readonly requiresProviderReadiness: boolean;
  readonly requiresWalletBoundary: boolean;
  readonly routeMounted: false;
  readonly dbExecutedInThisStage: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeServiceSafety002K {
  readonly sourceOnly: true;
  readonly envRead: false;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly prismaValidate: false;
  readonly prismaGenerate: false;
  readonly prismaMigration: false;
  readonly routeRuntimeMounted: false;
  readonly adminUiRuntimeMounted: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
}

export interface TaxiRuntimeServiceImplementationReadiness002K {
  readonly postMigrationVerified002IRequired: true;
  readonly repositoryContracts002JRequired: true;
  readonly routeMountApprovedNow: false;
  readonly dbRuntimeExecutionApprovedNow: false;
  readonly providerRuntimeApprovedNow: false;
  readonly walletRuntimeApprovedNow: false;
  readonly nextStep: '002L route/controller implementation approval';
}

export interface TaxiRuntimeServiceImplementation002K {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002K-RUNTIME-SERVICE-IMPLEMENTATION';
  readonly status: 'source_only_runtime_service_ready';
  readonly delegateBindingCount: number;
  readonly workflowImplementationCount: number;
  readonly repositoryMethodCount: number;
  readonly delegateBindings: readonly TaxiRuntimeServiceDelegateBinding002K[];
  readonly workflowImplementations: readonly TaxiRuntimeServiceWorkflowImplementation002K[];
  readonly safety: TaxiRuntimeServiceSafety002K;
  readonly readiness: TaxiRuntimeServiceImplementationReadiness002K;
}

export interface TaxiRuntimeServiceExecutionPlanInput002K {
  readonly operationKey: string;
  readonly actorId: string;
  readonly idempotencyKey?: string;
  readonly adminApproved?: boolean;
}

export interface TaxiRuntimeServiceExecutionPlan002K {
  readonly operationKey: string;
  readonly canExecuteNow: false;
  readonly blockedReason: 'route_not_mounted' | 'db_runtime_not_approved' | 'provider_not_configured' | 'wallet_boundary_not_approved';
  readonly routeMounted: false;
  readonly dbExecutedInThisStage: false;
  readonly requiredNextApproval: '002L route/controller implementation approval';
}

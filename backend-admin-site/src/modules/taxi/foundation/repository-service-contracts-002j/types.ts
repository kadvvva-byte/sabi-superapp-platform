export type TaxiRepositoryAccessMode002J = 'read_only' | 'write_guarded' | 'transaction_guarded' | 'admin_guarded' | 'provider_readiness_read_only';

export type TaxiRepositoryOperationKind002J =
  | 'count'
  | 'find_many'
  | 'find_unique'
  | 'create_guarded'
  | 'update_guarded'
  | 'audit_read'
  | 'workflow_guarded';

export interface TaxiRepositoryDelegateContract002J {
  readonly modelName: string;
  readonly tableName: string;
  readonly delegateName: string;
  readonly domain: string;
  readonly accessMode: TaxiRepositoryAccessMode002J;
  readonly runtimeMounted: false;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}

export interface TaxiRepositoryOperationContract002J {
  readonly key: string;
  readonly delegateName: string;
  readonly modelName: string;
  readonly operationKind: TaxiRepositoryOperationKind002J;
  readonly accessMode: TaxiRepositoryAccessMode002J;
  readonly requiresAuth: true;
  readonly requiresAdminForWrite: boolean;
  readonly requiresIdempotencyForWrite: boolean;
  readonly routeMounted: false;
  readonly dbExecutedInThisStage: false;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly paymentExecution: false;
  readonly payoutExecution: false;
  readonly fakeSuccessBlocked: true;
  readonly description: string;
}

export interface TaxiRepositoryServiceSafety002J {
  readonly sourceOnly: true;
  readonly envRead: false;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly prismaMigration: false;
  readonly prismaGenerate: false;
  readonly routeRuntimeMounted: false;
  readonly adminUiRuntimeMounted: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
}

export interface TaxiRepositoryServiceContracts002J {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002J-REPOSITORY-SERVICE-CONTRACTS';
  readonly status: 'source_only_ready';
  readonly delegateCount: number;
  readonly operationCount: number;
  readonly workflowOperationCount: number;
  readonly delegates: readonly TaxiRepositoryDelegateContract002J[];
  readonly operations: readonly TaxiRepositoryOperationContract002J[];
  readonly safety: TaxiRepositoryServiceSafety002J;
  readonly readiness: {
    readonly postMigrationVerified002IRequired: true;
    readonly prismaClientGenerated002ERequired: true;
    readonly routeMountApprovedNow: false;
    readonly providerRuntimeApprovedNow: false;
    readonly walletRuntimeApprovedNow: false;
  };
  readonly nextStep: '002K runtime service implementation approval';
}

import {
  TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J,
  TAXI_REPOSITORY_SERVICE_CONTRACTS_VERSION_002J,
  TAXI_REPOSITORY_SERVICE_SAFETY_002J,
  TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J,
} from './constants';
import type {
  TaxiRepositoryDelegateContract002J,
  TaxiRepositoryOperationContract002J,
  TaxiRepositoryOperationKind002J,
  TaxiRepositoryServiceContracts002J,
} from './types';

const BASE_OPERATION_KINDS_002J = [
  'count',
  'find_many',
  'find_unique',
  'create_guarded',
  'update_guarded',
  'audit_read',
] as const satisfies readonly TaxiRepositoryOperationKind002J[];

const isWriteLikeOperation002J = (operationKind: TaxiRepositoryOperationKind002J): boolean =>
  operationKind === 'create_guarded' ||
  operationKind === 'update_guarded' ||
  operationKind === 'workflow_guarded';

const toDelegateOperationContracts002J = (
  delegate: TaxiRepositoryDelegateContract002J,
): readonly TaxiRepositoryOperationContract002J[] =>
  BASE_OPERATION_KINDS_002J.map((operationKind) => ({
    key: `${delegate.delegateName}.${operationKind}`,
    delegateName: delegate.delegateName,
    modelName: delegate.modelName,
    operationKind,
    accessMode: delegate.accessMode,
    requiresAuth: true,
    requiresAdminForWrite: isWriteLikeOperation002J(operationKind),
    requiresIdempotencyForWrite: operationKind === 'create_guarded' || operationKind === 'update_guarded',
    routeMounted: false,
    dbExecutedInThisStage: false,
    providerDispatch: false,
    walletMutation: false,
    paymentExecution: false,
    payoutExecution: false,
    fakeSuccessBlocked: true,
    description: `${delegate.modelName} repository ${operationKind} contract is defined for the future runtime service layer, but this stage does not execute DB calls.`,
  }));

const toWorkflowOperationContracts002J = (): readonly TaxiRepositoryOperationContract002J[] =>
  TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J.map((key) => ({
    key,
    delegateName: 'workflow_guarded',
    modelName: 'TaxiWorkflowBoundary',
    operationKind: 'workflow_guarded',
    accessMode: 'transaction_guarded',
    requiresAuth: true,
    requiresAdminForWrite: key.startsWith('admin.'),
    requiresIdempotencyForWrite: true,
    routeMounted: false,
    dbExecutedInThisStage: false,
    providerDispatch: false,
    walletMutation: false,
    paymentExecution: false,
    payoutExecution: false,
    fakeSuccessBlocked: true,
    description: `${key} is a future transaction boundary; this source-only stage only declares the contract.`,
  }));

export const buildTaxiRepositoryServiceContracts002J = (): TaxiRepositoryServiceContracts002J => {
  const delegateOperations = TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J.flatMap((delegate) =>
    toDelegateOperationContracts002J(delegate),
  );
  const workflowOperations = toWorkflowOperationContracts002J();
  const operations = [...delegateOperations, ...workflowOperations] as const;

  return {
    version: TAXI_REPOSITORY_SERVICE_CONTRACTS_VERSION_002J,
    status: 'source_only_ready',
    delegateCount: TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J.length,
    operationCount: operations.length,
    workflowOperationCount: workflowOperations.length,
    delegates: TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J,
    operations,
    safety: TAXI_REPOSITORY_SERVICE_SAFETY_002J,
    readiness: {
      postMigrationVerified002IRequired: true,
      prismaClientGenerated002ERequired: true,
      routeMountApprovedNow: false,
      providerRuntimeApprovedNow: false,
      walletRuntimeApprovedNow: false,
    },
    nextStep: '002K runtime service implementation approval',
  };
};

export const evaluateTaxiRepositoryServiceContracts002J = () => {
  const contracts = buildTaxiRepositoryServiceContracts002J();
  const delegateNames = new Set(contracts.delegates.map((delegate) => delegate.delegateName));
  const duplicateDelegateNames = contracts.delegates
    .map((delegate) => delegate.delegateName)
    .filter((delegateName, index, allDelegateNames) => allDelegateNames.indexOf(delegateName) !== index);

  return {
    version: contracts.version,
    status: contracts.status,
    delegateCountReady: contracts.delegateCount === 20,
    operationCountReady: contracts.operationCount >= 120,
    workflowOperationCountReady: contracts.workflowOperationCount === TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J.length,
    uniqueDelegateCountReady: delegateNames.size === contracts.delegateCount,
    duplicateDelegateNames,
    routeMountApprovedNow: contracts.readiness.routeMountApprovedNow,
    providerRuntimeApprovedNow: contracts.readiness.providerRuntimeApprovedNow,
    walletRuntimeApprovedNow: contracts.readiness.walletRuntimeApprovedNow,
    safety: contracts.safety,
  };
};

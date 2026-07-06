import { buildTaxiRepositoryServiceContracts002J } from '../repository-service-contracts-002j';
import {
  TAXI_RUNTIME_SERVICE_DELEGATE_BINDINGS_002K,
  TAXI_RUNTIME_SERVICE_IMPLEMENTATION_VERSION_002K,
  TAXI_RUNTIME_SERVICE_SAFETY_002K,
  TAXI_RUNTIME_SERVICE_WORKFLOW_IMPLEMENTATION_KEYS_002K,
} from './constants';
import type {
  TaxiRuntimeServiceExecutionPlan002K,
  TaxiRuntimeServiceExecutionPlanInput002K,
  TaxiRuntimeServiceImplementation002K,
  TaxiRuntimeServiceWorkflowImplementation002K,
} from './types';

const toImplementationName002K = (operationKey: string): string =>
  `taxi.${operationKey.replace(/[^a-zA-Z0-9]+/g, '.')}.implementation002K`;

const toWorkflowImplementations002K = (): readonly TaxiRuntimeServiceWorkflowImplementation002K[] => {
  const repositoryContracts = buildTaxiRepositoryServiceContracts002J();
  const repositoryOperationByKey = new Map(repositoryContracts.operations.map((operation) => [operation.key, operation]));
  const fallbackWorkflow = repositoryContracts.operations.find((operation) => operation.operationKind === 'workflow_guarded');

  return TAXI_RUNTIME_SERVICE_WORKFLOW_IMPLEMENTATION_KEYS_002K.map((key) => {
    const operation = repositoryOperationByKey.get(key) ?? fallbackWorkflow;
    if (!operation) {
      throw new Error(`Taxi runtime service implementation ${key} has no repository operation contract`);
    }

    return {
      key,
      operation,
      implementationName: toImplementationName002K(key),
      executionMode: 'source_only_not_mounted',
      requiresAuth: true,
      requiresAdminForWrite: key.startsWith('admin.'),
      requiresIdempotencyForWrite: true,
      requiresProviderReadiness: key.includes('provider.') || key.includes('dispatch.') || key.includes('trip.'),
      requiresWalletBoundary: key.includes('payment.') || key.includes('settlement.'),
      routeMounted: false,
      dbExecutedInThisStage: false,
      fakeSuccessBlocked: true,
    } satisfies TaxiRuntimeServiceWorkflowImplementation002K;
  });
};

export const buildTaxiRuntimeServiceImplementation002K = (): TaxiRuntimeServiceImplementation002K => {
  const workflows = toWorkflowImplementations002K();
  return {
    version: TAXI_RUNTIME_SERVICE_IMPLEMENTATION_VERSION_002K,
    status: 'source_only_runtime_service_ready',
    delegateBindingCount: TAXI_RUNTIME_SERVICE_DELEGATE_BINDINGS_002K.length,
    workflowImplementationCount: workflows.length,
    repositoryMethodCount: TAXI_RUNTIME_SERVICE_DELEGATE_BINDINGS_002K.reduce(
      (total, binding) => total + binding.methodsReady.length,
      0,
    ),
    delegateBindings: TAXI_RUNTIME_SERVICE_DELEGATE_BINDINGS_002K,
    workflowImplementations: workflows,
    safety: TAXI_RUNTIME_SERVICE_SAFETY_002K,
    readiness: {
      postMigrationVerified002IRequired: true,
      repositoryContracts002JRequired: true,
      routeMountApprovedNow: false,
      dbRuntimeExecutionApprovedNow: false,
      providerRuntimeApprovedNow: false,
      walletRuntimeApprovedNow: false,
      nextStep: '002L route/controller implementation approval',
    },
  };
};

export const createTaxiRuntimeServiceExecutionPlan002K = (
  input: TaxiRuntimeServiceExecutionPlanInput002K,
): TaxiRuntimeServiceExecutionPlan002K => ({
  operationKey: input.operationKey,
  canExecuteNow: false,
  blockedReason: 'route_not_mounted',
  routeMounted: false,
  dbExecutedInThisStage: false,
  requiredNextApproval: '002L route/controller implementation approval',
});

export const evaluateTaxiRuntimeServiceImplementation002K = () => {
  const implementation = buildTaxiRuntimeServiceImplementation002K();
  const delegateNames = implementation.delegateBindings.map((binding) => binding.delegateName);
  const duplicateDelegateNames = delegateNames.filter((delegateName, index, all) => all.indexOf(delegateName) !== index);

  return {
    version: implementation.version,
    status: implementation.status,
    delegateBindingCountReady: implementation.delegateBindingCount === 20,
    workflowImplementationCountReady: implementation.workflowImplementationCount >= 39,
    repositoryMethodCountReady: implementation.repositoryMethodCount >= 120,
    duplicateDelegateNames,
    routeMountApprovedNow: implementation.readiness.routeMountApprovedNow,
    dbRuntimeExecutionApprovedNow: implementation.readiness.dbRuntimeExecutionApprovedNow,
    providerRuntimeApprovedNow: implementation.readiness.providerRuntimeApprovedNow,
    walletRuntimeApprovedNow: implementation.readiness.walletRuntimeApprovedNow,
    safety: implementation.safety,
  };
};
